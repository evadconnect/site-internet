<?php
/* ============================================================
   deva.php — Backend du chatbot Deva pour EVAD (SÉCURISÉ)
   Version Mistral
   ------------------------------------------------------------
   • CORS restreint à evad.org (refuse les autres sites)
   • Limite de débit par IP (anti-abus de crédits IA)
   • Clé API côté serveur uniquement (jamais dans le navigateur)

   À déposer à la RACINE de evad.org, à côté de
   "documentation-evad.txt".
   ============================================================ */

/* ─── 1. Configuration ───────────────────────────────────── */
const MISTRAL_API_KEY = "UMY06qVLONgcAvjgqGhd2UgH02iDbVHd";   // ← votre clé (console.mistral.ai)
const MISTRAL_MODEL   = 'mistral-small-latest';            // gratuit. 'mistral-large-latest' = + puissant
const DOC_FILE        = __DIR__ . '/documentation-evad.txt';

// Origines autorisées
const ALLOWED_ORIGINS = ['https://evad.org', 'https://www.evad.org'];

// Limite de débit : 20 messages / 10 minutes / IP
const RATE_LIMIT  = 20;
const RATE_WINDOW = 600; // secondes

/* ─── 2. En-têtes + contrôle d'origine (CORS) ────────────── */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
}
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405); echo json_encode(['error' => 'Méthode non autorisée']); exit;
}
if (!in_array($origin, ALLOWED_ORIGINS, true)) {
  http_response_code(403); echo json_encode(['reply' => 'Origine non autorisée.']); exit;
}

/* ─── 2b. Limite de débit par IP ─────────────────────────── */
$ip     = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip     = trim(explode(',', $ip)[0]);
$rlFile = sys_get_temp_dir() . '/deva_rl_' . md5($ip) . '.json';
$now    = time();
$hits   = is_readable($rlFile) ? (json_decode((string)file_get_contents($rlFile), true) ?: []) : [];
$hits   = array_values(array_filter($hits, fn($t) => $t > $now - RATE_WINDOW));
if (count($hits) >= RATE_LIMIT) {
  http_response_code(429);
  echo json_encode(['reply' => "Trop de questions d'un coup 🌿 Réessayez dans quelques minutes."]);
  exit;
}
$hits[] = $now;
@file_put_contents($rlFile, json_encode($hits), LOCK_EX);

/* ─── 3. Lecture de la requête ───────────────────────────── */
$input    = json_decode(file_get_contents('php://input'), true);
$messages = $input['messages'] ?? [];
$persona  = $input['persona']  ?? null;
if (!is_array($messages) || count($messages) === 0) {
  http_response_code(400); echo json_encode(['error' => 'Aucun message reçu']); exit;
}

/* ─── 4. Documentation EVAD ──────────────────────────────── */
$doc = is_readable(DOC_FILE) ? file_get_contents(DOC_FILE) : '';

/* ─── 5. Prompt système ──────────────────────────────────── */
$profils = [
  'pilote'    => "Pilote d'impact (porteur d'un lieu durable)",
  'batisseur' => "Bâtisseur d'impact (citoyen qui agit via des quêtes)",
  'semeur'    => "Semeur d'impact (financeur)",
];
$personaNote = isset($profils[$persona])
  ? "Le visiteur est : {$profils[$persona]}. Adapte tes réponses à ce profil. " : '';

$system =
    "Tu es Deva, le compagnon IA de l'écosystème EVAD (Écosystème Vivant Autonome & Décentralisé). "
  . "Réponds en français, au vouvoiement, avec chaleur et concision (2 à 4 phrases maximum). "
  . "N'utilise pas d'emojis, sauf 🌿 de manière occasionnelle. "
  . $personaNote
  . "Appuie-toi UNIQUEMENT sur la documentation ci-dessous pour répondre. "
  . "Si l'information ne s'y trouve pas, dis-le honnêtement et invite à écrire à contact@evad.org. "
  . "N'invente jamais de chiffres ni de faits.\n\n"
  . "=== DOCUMENTATION EVAD ===\n" . $doc . "\n=== FIN DE LA DOCUMENTATION ===";

/* ─── 6. Conversation ────────────────────────────────────── */
$convo = [];
foreach ($messages as $m) {
  $role = (($m['role'] ?? '') === 'user') ? 'user' : 'assistant';
  $text = trim((string)($m['text'] ?? ''));
  if ($text === '') continue;
  if (empty($convo) && $role === 'assistant') continue;
  if (!empty($convo) && end($convo)['role'] === $role) {
    $convo[count($convo) - 1]['content'] .= "\n" . $text;
  } else {
    $convo[] = ['role' => $role, 'content' => $text];
  }
}
while (!empty($convo) && end($convo)['role'] !== 'user') array_pop($convo);
if (empty($convo)) {
  http_response_code(400); echo json_encode(['error' => 'Aucune question valide']); exit;
}

$mistralMessages = array_merge([['role' => 'system', 'content' => $system]], $convo);

/* ─── 7. Appel de l'API Mistral ──────────────────────────── */
$payload = json_encode([
  'model'       => MISTRAL_MODEL,
  'messages'    => $mistralMessages,
  'temperature' => 0.3,
  'max_tokens'  => 400,
]);

$ch = curl_init('https://api.mistral.ai/v1/chat/completions');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => $payload,
  CURLOPT_HTTPHEADER     => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . MISTRAL_API_KEY,
  ],
  CURLOPT_TIMEOUT => 30,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
  http_response_code(502);
  echo json_encode(['error' => 'Erreur lors de l’appel à Mistral', 'code' => $httpCode, 'detail' => $curlErr]);
  exit;
}

/* ─── 8. Réponse ─────────────────────────────────────────── */
$data  = json_decode($response, true);
$reply = $data['choices'][0]['message']['content'] ?? null;
if (!$reply) {
  http_response_code(502); echo json_encode(['error' => 'Réponse vide de Mistral']); exit;
}
echo json_encode(['reply' => trim($reply)]);
