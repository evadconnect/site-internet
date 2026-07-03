// Floating Deva chat, onboarding + open chat. Persists chosen role.

const ROLE_PROFILES = {
  pilote:    { emoji: '🏡', label: "Porteur de lieu", impactName: "Pilote d'impact",    short: 'Porteur de lieu', accent: '#018262', tagline: "Vous portez un lieu (tiers-lieu, écolieu, ferme, association…) et cherchez à le faire rayonner.", section: 'roles', nextCue: 'Découvrez votre profil et les outils EVAD →' },
  batisseur: { emoji: '🌿', label: "Citoyen",         impactName: "Bâtisseur d'impact", short: 'Citoyen',          accent: '#c8732a', tagline: "Vous voulez agir sur des quêtes concrètes et gagner des graines à utiliser dans le réseau.",                section: 'roles', nextCue: 'Voyez les quêtes qui vous attendent →' },
  semeur:    { emoji: '🌾', label: "Financeur",       impactName: "Semeur d'impact",    short: 'Financeur',        accent: '#3a6e8c', tagline: "Vous soutenez des projets durables (fondation, financeur, collectivité, investisseur).",         section: 'roles', nextCue: 'Découvrez comment financer contre des preuves →' },
};

const LS_KEY = 'evad.deva.persona';
const LS_DISMISSED = 'evad.deva.onboarding.dismissed';
const LS_FEEDBACK = 'evad.deva.feedback';
const LS_USAGE = 'evad.deva.usage';

// ─────────── Supabase : retours & questions Deva ───────────
// Mêmes identifiants que Hero.jsx (la clé "anon" est PUBLIQUE par conception ;
// la sécurité vient des règles RLS « insert seul » côté Supabase).
// → Voir INSTALLATION-deva-supabase.md pour créer les 2 tables (deva_feedback, deva_questions).
const SUPABASE_URL      = 'https://lmhhrccmgebztioesmik.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGhyY2NtZ2VienRpb2VzbWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjIyOTgsImV4cCI6MjA4MDg5ODI5OH0.epfoBIsZJHLqj96dYE7AvImK_EgjMW9PFtvLk4VwlDc';
const SB_CONFIGURED = !SUPABASE_URL.includes('VOTRE-PROJET') && !SUPABASE_ANON_KEY.includes('COLLEZ');

const curPage = () => (typeof window !== 'undefined' ? window.location.pathname : '');

// Enregistrement « best-effort » : on n'attend pas la réponse et on n'interrompt
// JAMAIS l'expérience visiteur si Supabase est indisponible.
function devaLog(table, rows) {
  if (!SB_CONFIGURED || !rows || (Array.isArray(rows) && rows.length === 0)) return;
  try {
    fetch(SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(rows),
    }).catch(() => {});
  } catch (e) { /* silencieux */ }
}

// Empreinte estimée d'UNE question à l'IA (ordre de grandeur, modèle frugal type
// Mistral + réponses courtes). Affiché comme estimation, pour sensibiliser.
const ECO_PER_MSG = { wh: 1.5, water: 18, co2: 0.9 }; // Wh, mL d'eau, g CO₂e

const fmtWater = (ml) => ml >= 1000 ? (ml / 1000).toFixed(ml >= 10000 ? 1 : 2).replace('.', ',') + ' L' : Math.round(ml) + ' mL';
const fmtCo2 = (g) => g >= 1000 ? (g / 1000).toFixed(2).replace('.', ',') + ' kg' : (g < 10 ? g.toFixed(1).replace('.', ',') : Math.round(g)) + ' g';
const fmtWh = (wh) => wh >= 1000 ? (wh / 1000).toFixed(2).replace('.', ',') + ' kWh' : (wh < 10 ? wh.toFixed(1).replace('.', ',') : Math.round(wh)) + ' Wh';

// Compensation : Deva propose des gestes concrets ancrés dans l'écosystème EVAD.
const OFFSET_THRESHOLD = 10; // questions avant la suggestion spontanée
const DON_URL = 'https://www.helloasso.com/associations/evad-connect/formulaires/1';
const MEMBER_URL = 'https://www.helloasso.com/associations/evad-connect/adhesions/devenir-membre-2026';
const OFFSET_TEXT = "🌿 On a bien échangé ! Si vous souhaitez équilibrer l'empreinte de notre conversation, voici quelques gestes concrets. Et côté sobriété, des questions précises suffisent souvent 🌱";
const OFFSET_CTAS = [
  { label: '🌳 Soutenir un lieu pilote', href: DON_URL },
  { label: '🌱 Devenir membre & agir', href: MEMBER_URL },
  { label: "☀️ D'autres façons d'agir", section: 'agir' },
];

// Endpoint du backend Deva en production : deva.php sur evad.org (Hostinger → Mistral).
// En aperçu/local, cet appel échoue → repli automatique sur le pont de prototype.
const DEVA_ENDPOINT = 'https://evad.org/deva.php';

// Prompt système utilisé UNIQUEMENT par le repli d'aperçu.
// En production, c'est deva.php qui construit le prompt + injecte la documentation.
function buildSystemPrompt(persona) {
  return `Tu es Deva, l'esprit régénératif et compagnon IA de l'écosystème EVAD (Écosystème Vivant Autonome & Décentralisé). EVAD relie trois rôles : Pilotes d'impact (porteurs de lieux durables), Bâtisseurs d'impact (citoyens qui agissent via des quêtes) et Semeurs d'impact (financeurs). Le mouvement s'appuie sur quatre piliers : Solarpunk (vision), Économie régénérative (boussole), Écocratie (gouvernance) et Gamification (engagement avec quêtes, preuves, Vadance et Vadité). EVAD est porté par l'association EVAD Connect. ${persona ? `Le visiteur est ${ROLE_PROFILES[persona].label}. Adapte tes réponses à ce profil.` : ''} Réponds en français, avec chaleur et concision (2-4 phrases max), au vouvoiement. Pas d'emojis sauf 🌿 occasionnel. Si la question dépasse EVAD, redirige gentiment.`;
}

// Appelle d'abord le backend réel (production) ; en cas d'absence (aperçu),
// repli transparent sur le pont de prototype window.claude.complete.
async function devaComplete(history, persona) {
  // 1) Backend Mistral sur evad.org
  try {
    const res = await fetch(DEVA_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        persona: persona || null,
        messages: history.map(m => ({ role: m.role, text: m.text })),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) return String(data.reply).trim();
    }
  } catch (e) { /* deva.php absent (aperçu) → repli ci-dessous */ }

  // 2) Repli aperçu (sandbox)
  if (window.claude && typeof window.claude.complete === 'function') {
    const conv = history
      .filter(m => m.role !== 'system')
      .map(h => (h.role === 'user' ? 'Visiteur: ' : 'Deva: ') + h.text)
      .join('\n');
    const reply = await window.claude.complete({
      messages: [
        { role: 'user', content: buildSystemPrompt(persona) + '\n\n--- Conversation ---\n' + conv + '\nDeva:' },
      ],
    });
    return String(reply).trim();
  }
  throw new Error('Aucun backend disponible');
}

// Rendu léger : convertit le Markdown **gras** renvoyé par l'IA en vrai gras.
function renderRich(text) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((p, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(p);
    return m
      ? <strong key={i} style={{ fontWeight: 700, color: '#fff' }}>{m[1]}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

const FEEDBACK_PROMPTS = [
  "Qu'est-ce qui vous a manqué sur cette page ?",
  "Si vous pouviez changer une chose, ce serait quoi ?",
  "Une dernière idée folle pour faire grandir EVAD ?",
];

const DevaChat = ({ role, setRole, onPersonaChange }) => {
  // ───── persisted persona ─────
  const [persona, setPersona] = React.useState(() => {
    try { const v = localStorage.getItem(LS_KEY); return (v && v !== 'null') ? v : null; } catch { return null; }
  });

  // ───── widget state ─────
  const [open, setOpen] = React.useState(false);
  const [teaser, setTeaser] = React.useState(false);
  const [unread, setUnread] = React.useState(true);
  const [stage, setStage] = React.useState(persona ? 'chat' : 'chat'); // onboard-ask | onboard-confirm | chat | feedback
  const [feedbackStep, setFeedbackStep] = React.useState(0);
  const [feedbackAnswers, setFeedbackAnswers] = React.useState([]);
  const [draft, setDraft] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  // Empreinte : repart de zéro à chaque ouverture de page (pas de cumul entre visites).
  const [queryCount, setQueryCount] = React.useState(0);
  const [ecoOpen, setEcoOpen] = React.useState(false);
  const offsetFiredRef = React.useRef(false);
  const scrollRef = React.useRef(null);

  // Bulle d'accroche : apparaît à chaque chargement de page (chat fermé).
  React.useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 1100);
    return () => clearTimeout(t);
  }, []);

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    setUnread(false);
  };

  // Ouverture déclenchée depuis d'autres blocs de la page (ex. maquette « Demandez à Deva »).
  React.useEffect(() => {
    const handler = (e) => {
      openChat();
      const text = e && e.detail && e.detail.text;
      if (text) {
        setStage('chat');
        setDraft(text);
      }
    };
    window.addEventListener('deva:open', handler);
    return () => window.removeEventListener('deva:open', handler);
  }, []);
  const dismissTeaser = (e) => {
    if (e) { e.stopPropagation(); }
    setTeaser(false);
  };

  const [messages, setMessages] = React.useState(() => {
    if (persona) {
      const p = ROLE_PROFILES[persona];
      return [
        { role: 'deva', text: `Ravi de vous revoir 🌿 Vous êtes ${p.label}. Une question sur l'écosystème ?` },
      ];
    }
    return [
      { role: 'deva', text: "Bonjour ! Je suis Deva, l'esprit régénératif d'EVAD. Explorez le site librement, je reste là pour répondre à vos questions." },
    ];
  });

  // ───── scroll messages on update ─────
  React.useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    }
  }, [open, messages.length, busy, stage]);

  // ───── propose compensation (manual + automatic after threshold) ─────
  const proposeOffset = () => {
    setEcoOpen(false);
    setStage(s => (s === 'onboard-ask' ? 'chat' : s));
    setMessages(m => {
      // évite un doublon si la proposition est déjà le dernier message Deva
      const last = m[m.length - 1];
      if (last && last.role === 'deva' && last.text === OFFSET_TEXT) return m;
      return [...m, { role: 'deva', text: OFFSET_TEXT, ctas: OFFSET_CTAS }];
    });
  };

  React.useEffect(() => {
    if (queryCount < OFFSET_THRESHOLD || offsetFiredRef.current || busy) return;
    offsetFiredRef.current = true;
    setMessages(m => [...m, { role: 'deva', text: OFFSET_TEXT, ctas: OFFSET_CTAS }]);
  }, [queryCount, busy]);

  // ───── pick a role ─────
  const pickRole = (id) => {
    const p = ROLE_PROFILES[id];
    setPersona(id);
    try { localStorage.setItem(LS_KEY, id); } catch {}
    if (typeof setRole === 'function') setRole(id);
    if (typeof onPersonaChange === 'function') onPersonaChange(id);
    setMessages(m => [
      ...m,
      { role: 'user', text: `${p.emoji} Je suis ${p.short}` },
      { role: 'deva', text: `Parfait. ${p.tagline}\n\nJ'ai adapté la page pour vous : votre spirale VADE et vos outils EVAD sont déjà personnalisés.`, ctas: [
        { label: 'Voir ma spirale VADE', section: 'cycle' },
        { label: 'Voir les outils EVAD',    section: 'ecosystem' },
      ] },
    ]);
    setStage('onboard-confirm');
  };

  const skipOnboarding = () => {
    try { localStorage.setItem(LS_DISMISSED, '1'); } catch {}
    setStage('chat');
    setMessages(m => [...m, { role: 'deva', text: "Pas de souci. Posez-moi n'importe quelle question sur EVAD." }]);
  };

  // ───── feedback flow ─────
  const startFeedback = () => {
    setStage('feedback');
    setFeedbackStep(0);
    setFeedbackAnswers([]);
    setMessages(m => [
      ...m,
      { role: 'deva', text: "🌱 Aidez-nous à faire pousser ce site. Je vais vous poser 3 petites questions, répondez librement (ou tapez «passer» pour sauter).\n\n1️⃣ " + FEEDBACK_PROMPTS[0] },
    ]);
  };

  const submitFeedback = (answer) => {
    const newAnswers = [...feedbackAnswers, { q: FEEDBACK_PROMPTS[feedbackStep], a: answer }];
    setFeedbackAnswers(newAnswers);
    setMessages(m => [...m, { role: 'user', text: answer }]);

    const nextStep = feedbackStep + 1;
    if (nextStep < FEEDBACK_PROMPTS.length) {
      setFeedbackStep(nextStep);
      const numberEmoji = ['1️⃣', '2️⃣', '3️⃣'][nextStep] || (nextStep + 1);
      setMessages(m => [...m, { role: 'deva', text: `${numberEmoji} ${FEEDBACK_PROMPTS[nextStep]}` }]);
    } else {
      // persist locally
      try {
        const existing = JSON.parse(localStorage.getItem(LS_FEEDBACK) || '[]');
        existing.push({
          ts: new Date().toISOString(),
          persona,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          answers: newAnswers,
        });
        localStorage.setItem(LS_FEEDBACK, JSON.stringify(existing));
      } catch {}
      // Envoi centralisé vers Supabase (table deva_feedback) : 1 ligne par réponse,
      // en ignorant les « passer » / réponses vides.
      devaLog('deva_feedback', newAnswers
        .filter(a => a.a && a.a.trim() && a.a.trim().toLowerCase() !== 'passer')
        .map(a => ({ persona, page: curPage(), question: a.q, answer: a.a.trim() })));
      setMessages(m => [
        ...m,
        { role: 'deva', text: "🌿 Merci, vos graines sont plantées. Chaque retour nourrit la prochaine version d'EVAD. Vous pouvez continuer la conversation ou refermer la fenêtre." },
      ]);
      setStage('chat');
      setFeedbackStep(0);
    }
    setDraft('');
  };

  // ───── free chat ─────
  const ask = async (text) => {
    if (!text.trim() || busy) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(m => [...m, userMsg]);
    setDraft('');
    setQueryCount(c => c + 1);
    setBusy(true);
    try {
      const reply = await devaComplete([...messages, userMsg], persona);
      setMessages(m => [...m, { role: 'deva', text: reply }]);
      // Journalise la question + la réponse (table deva_questions) pour repérer
      // les sujets cherchés et combler les manques de documentation-evad.txt.
      devaLog('deva_questions', [{ persona, page: curPage(), question: userMsg.text, answer: reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'deva', text: "Je n'ai pas pu répondre, réessayez dans un instant." }]);
    } finally {
      setBusy(false);
    }
  };

  const suggestedAfter = persona ? [
    persona === 'pilote'    ? 'Comment référencer mon lieu ?' :
    persona === 'batisseur' ? 'Quelles quêtes me correspondent ?' :
                              'Comment financer un projet ?',
    'Comment fonctionne la Vadité ?',
    'Comment fonctionnent les graines ?',
  ] : [];

  const resetPersona = () => {
    try { localStorage.removeItem(LS_KEY); localStorage.removeItem(LS_DISMISSED); } catch {}
    setPersona(null);
    if (typeof onPersonaChange === 'function') onPersonaChange(null);
    setStage('onboard-ask');
    setMessages([{ role: 'deva', text: "On recommence : qui êtes-vous ?" }]);
  };

  return (
    <>
      {/* ─── Floating launcher ─── */}
      <button
        onClick={() => { if (open) { setOpen(false); } else { openChat(); } }}
        aria-label={open ? 'Fermer Deva' : 'Discuter avec Deva'}
        style={{
          position: 'fixed', bottom: 22, left: 24, zIndex: 80,
          width: 64, height: 78,
          background: 'transparent',
          color: '#e8f7f3', border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0, overflow: 'visible',
          transition: 'transform .2s',
          filter: 'drop-shadow(0 10px 18px rgba(13,43,34,.35)) drop-shadow(0 3px 6px rgba(1,130,98,.25))',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) rotate(-2deg)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
        {open ? (
          <span style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(160deg, #018262 0%, #016b52 100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(13,43,34,.3)',
          }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#e8f7f3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </span>
        ) : (
          <img
            src={window.__resources && window.__resources.deva}
            alt="Deva"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'bottom',
              display: 'block',
              background: 'transparent',
              transform: 'rotate(-10deg) scaleX(-1)',
            }}
          />
        )}
        {!open && unread && (
          <span aria-hidden="true" style={{
            position: 'absolute', bottom: 8, left: 4,
            width: 14, height: 14, borderRadius: '50%',
            background: '#c8732a',
            border: '2px solid #fff',
            animation: 'devapulse 2s ease-out infinite',
          }}/>
        )}
      </button>

      {/* ─── Bulle d'accroche (avatar fermé) ─── */}
      {!open && teaser && (
        <div
          role="button"
          tabIndex={0}
          onClick={openChat}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openChat(); } }}
          aria-label="Ouvrir la conversation avec Deva"
          style={{
            position: 'fixed', bottom: 112, left: 22, zIndex: 81,
            width: 252, maxWidth: 'calc(100vw - 44px)',
            background: 'linear-gradient(160deg, #0d2b22 0%, #013b2d 100%)',
            border: '1px solid rgba(126,201,176,.2)',
            color: '#e8f7f3',
            borderRadius: 18, borderBottomLeftRadius: 6,
            padding: '14px 16px 14px 15px',
            boxShadow: '0 18px 40px rgba(13,43,34,.32), 0 4px 12px rgba(1,130,98,.2)',
            cursor: 'pointer',
            fontFamily: "'Satoshi', sans-serif",
            animation: 'devateaser .4s cubic-bezier(.2,1.1,.4,1) both',
            transformOrigin: 'bottom left',
          }}>
          {/* Queue de bulle pointant vers l'avatar */}
          <span aria-hidden="true" style={{
            position: 'absolute', bottom: -7, left: 18,
            width: 16, height: 16,
            background: '#0c2c22',
            borderLeft: '1px solid rgba(126,201,176,.2)',
            borderBottom: '1px solid rgba(126,201,176,.2)',
            transform: 'rotate(45deg)',
            borderBottomLeftRadius: 4,
          }}/>
          {/* Bouton fermer */}
          <button
            onClick={dismissTeaser}
            aria-label="Masquer le message"
            style={{
              position: 'absolute', top: 6, right: 6,
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(207,238,231,.12)', border: 'none', cursor: 'pointer',
              color: '#cfeee7', fontSize: 13, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(207,238,231,.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(207,238,231,.12)'; }}>×</button>
          <div style={{ fontWeight: 800, fontSize: 13, color: '#7ec9b0', marginBottom: 4, paddingRight: 16 }}>Deva</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.45, fontWeight: 500, paddingRight: 8 }}>
            Bonjour&nbsp;! Une question sur EVAD&nbsp;? Cliquez ici, je vous réponds.
          </div>
        </div>
      )}

      {/* Persona badge removed, access reset via chat header */}

      {/* ─── Panel ─── */}
      {open && (
        <div role="dialog" aria-label="Conversation avec Deva" style={{
          position: 'fixed', bottom: 140, left: 28, zIndex: 79,
          width: 380, maxWidth: 'calc(100vw - 56px)',
          height: 580, maxHeight: 'calc(100vh - 160px)',
          background: 'linear-gradient(160deg, #0d2b22 0%, #013b2d 100%)',
          border: '1px solid rgba(126,201,176,.2)',
          borderRadius: 22,
          boxShadow: '0 24px 60px rgba(13,43,34,.45), 0 8px 24px rgba(0,0,0,.18)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          color: '#e8f7f3',
          fontFamily: "'Satoshi', sans-serif",
          animation: 'devaslide .22s ease-out',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: '1px solid rgba(126,201,176,.16)',
            background: 'rgba(13,43,34,.4)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, overflow: 'visible',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img src={window.__resources && window.__resources.deva} alt="Deva" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(-10deg) scaleX(-1)' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#e8f7f3', lineHeight: 1.2 }}>Deva</div>
              <div style={{ fontSize: 11, color: '#7ec9b0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7ec9b0', boxShadow: '0 0 8px #7ec9b0' }}/>
                En ligne · IA frugale
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Réduire"
              style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'rgba(207,238,231,.08)',
                border: 'none', color: '#cfeee7', cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>–</button>
          </div>

          {/* ─── Eco footprint counter ─── */}
          <div style={{
            borderBottom: '1px solid rgba(126,201,176,.2)',
            background: 'linear-gradient(90deg, rgba(126,201,176,.16), rgba(126,201,176,.07))',
            borderLeft: '3px solid #7ec9b0',
          }}>
            <button
              onClick={() => setEcoOpen(o => !o)}
              aria-expanded={ecoOpen}
              aria-label="Détails de l'empreinte de la conversation"
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 5,
                padding: '9px 14px 10px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#e8f7f3', fontFamily: "'Satoshi', sans-serif",
              }}>
              <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: '#a8e6cf', opacity: .85 }}>
                Empreinte de cette conversation
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <span aria-hidden="true" style={{ fontSize: 15 }}>🌍</span>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#a8e6cf', flexShrink: 0 }}>
                  {queryCount} question{queryCount > 1 ? 's' : ''}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(168,230,207,.6)', flexShrink: 0 }}/>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#e8f7f3', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  ≈ {fmtWh(queryCount * ECO_PER_MSG.wh)} · {fmtWater(queryCount * ECO_PER_MSG.water)} · {fmtCo2(queryCount * ECO_PER_MSG.co2)} CO₂
                </span>
                <span aria-hidden="true" style={{
                  fontSize: 10, color: '#a8e6cf', flexShrink: 0,
                  transform: ecoOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s',
                }}>▾</span>
              </span>
            </button>
            {ecoOpen && (
              <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[
                    { ic: '⚡', val: fmtWh(queryCount * ECO_PER_MSG.wh), lbl: 'Énergie' },
                    { ic: '💧', val: fmtWater(queryCount * ECO_PER_MSG.water), lbl: 'Eau' },
                    { ic: '🌫️', val: fmtCo2(queryCount * ECO_PER_MSG.co2), lbl: 'CO₂e' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      background: 'rgba(126,201,176,.07)',
                      border: '1px solid rgba(126,201,176,.16)',
                      borderRadius: 12, padding: '10px 8px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textAlign: 'center',
                    }}>
                      <span aria-hidden="true" style={{ fontSize: 15 }}>{s.ic}</span>
                      <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: 14, color: '#e8f7f3' }}>{s.val}</span>
                      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7ec9b0', opacity: .8 }}>{s.lbl}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11.5, lineHeight: 1.5, color: '#cfeee7', opacity: .8, margin: 0 }}>
                  Chaque question à une IA a un coût réel en énergie, en eau et en carbone. Deva s'appuie sur un modèle frugal et des réponses courtes pour le limiter. Privilégiez des questions précises 🌿
                </p>
                <button
                  onClick={proposeOffset}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    alignSelf: 'flex-start',
                    padding: '9px 16px', borderRadius: 100,
                    background: 'linear-gradient(135deg, #4aab8f, #018262)',
                    border: 'none', color: '#0d2b22', cursor: 'pointer',
                    fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700,
                    boxShadow: '0 6px 18px rgba(1,130,98,.3)',
                    transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(1,130,98,.42)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 18px rgba(1,130,98,.3)'; }}
                >
                  🌱 Compenser mon empreinte
                </button>
                <p style={{ fontSize: 10.5, lineHeight: 1.45, color: '#7ec9b0', opacity: .75, margin: 0, fontStyle: 'italic' }}>
                  Estimation indicative à titre de sensibilisation : ~{ECO_PER_MSG.wh} Wh, {ECO_PER_MSG.water} mL d'eau et {ECO_PER_MSG.co2} g CO₂e par question (ordre de grandeur, modèle d'IA frugal). Ne reflète pas une mesure réelle.
                </p>
              </div>
            )}
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {messages.map((m, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, #4aab8f, #018262)'
                      : 'rgba(126,201,176,.08)',
                    border: m.role === 'user'
                      ? '1px solid rgba(126,201,176,.3)'
                      : '1px solid rgba(126,201,176,.18)',
                    fontSize: 13.5, lineHeight: 1.5,
                    color: '#e8f7f3',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>{renderRich(m.text)}</div>
                </div>
                {m.ctas && m.ctas.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
                    {m.ctas.map((cta, j) => (
                      <button key={j} onClick={() => {
                        if (cta.href) {
                          window.open(cta.href, '_blank', 'noopener');
                          return;
                        }
                        const el = document.getElementById(cta.section);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setOpen(false);
                      }} style={{
                        background: 'linear-gradient(135deg, #4aab8f, #018262)',
                        color: '#0d2b22',
                        border: 'none',
                        padding: '10px 16px', borderRadius: 100,
                        fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 6px 18px rgba(1,130,98,.3)',
                        transition: 'transform .15s, box-shadow .15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(1,130,98,.42)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 18px rgba(1,130,98,.3)'; }}>
                        {cta.label} →
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            {busy && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: 14,
                  background: 'rgba(126,201,176,.08)',
                  border: '1px solid rgba(126,201,176,.18)',
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  <span className="devadot"/><span className="devadot"/><span className="devadot"/>
                </div>
              </div>
            )}

            {/* Onboarding chips */}
            {false && stage === 'onboard-ask' && !busy && (
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Object.entries(ROLE_PROFILES).map(([id, p]) => (
                  <button key={id} onClick={() => pickRole(id)} style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    background: 'rgba(126,201,176,.05)',
                    border: '1px solid ' + p.accent + '55',
                    borderLeft: '3px solid ' + p.accent,
                    borderRadius: 14,
                    color: '#e8f7f3',
                    fontSize: 13, fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Satoshi', sans-serif",
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    transition: 'background .15s, transform .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = p.accent + '22'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(126,201,176,.05)'; e.currentTarget.style.transform = ''; }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: p.accent + '33',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0,
                    }}>{p.emoji}</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#e8f7f3' }}>{p.label}</span>
                        {p.impactName && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
                            padding: '2px 8px', borderRadius: 100,
                            background: p.accent + '33', color: p.accent,
                          }}>{p.impactName}</span>
                        )}
                      </span>
                      <span style={{ display: 'block', fontSize: 12, color: '#cfeee7', opacity: .8, lineHeight: 1.4 }}>{p.tagline}</span>
                    </span>
                  </button>
                ))}
                <button onClick={skipOnboarding} style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  background: 'rgba(126,201,176,.05)',
                  border: '1px solid rgba(126,201,176,.28)',
                  borderLeft: '3px solid #7ec9b0',
                  borderRadius: 14,
                  color: '#e8f7f3',
                  fontSize: 13, fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: "'Satoshi', sans-serif",
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  transition: 'background .15s, transform .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(126,201,176,.16)'; e.currentTarget.style.transform = 'translateX(2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(126,201,176,.05)'; e.currentTarget.style.transform = ''; }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(126,201,176,.2)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>🧭</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#e8f7f3', marginBottom: 3 }}>Je préfère explorer librement</span>
                    <span style={{ display: 'block', fontSize: 12, color: '#cfeee7', opacity: .8, lineHeight: 1.4 }}>Parcourez le site à votre rythme, je reste disponible si vous avez une question.</span>
                  </span>
                </button>
              </div>
            )}

            {/* Post-onboarding suggested questions */}
            {stage !== 'onboard-ask' && messages.length <= 4 && !busy && suggestedAfter.length > 0 && (
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 2, opacity: .7 }}>Suggestions</div>
                {suggestedAfter.map(q => (
                  <button key={q} onClick={() => { setStage('chat'); ask(q); }} style={{
                    textAlign: 'left',
                    padding: '9px 12px',
                    background: 'transparent',
                    border: '1px solid rgba(126,201,176,.25)',
                    borderRadius: 100,
                    color: '#cfeee7',
                    fontSize: 12, fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: "'Satoshi', sans-serif",
                    transition: 'background .15s, border-color .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(126,201,176,.1)'; e.currentTarget.style.borderColor = 'rgba(126,201,176,.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(126,201,176,.25)'; }}>
                    {q}
                  </button>
                ))}
                {persona && (
                  <button onClick={resetPersona} style={{
                    display: 'none',
                  }}>Changer de profil</button>
                )}
              </div>
            )}
          </div>

          {/* ─── Footer action (above input) ─── */}
          {stage !== 'feedback' && stage !== 'onboard-ask' && (
            <div style={{
              padding: '8px 12px 0',
              display: 'flex', justifyContent: 'center',
            }}>
              <button
                onClick={startFeedback}
                aria-label="Suggérer une amélioration"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 16px', borderRadius: 100,
                  background: 'linear-gradient(135deg, #4aab8f, #018262)',
                  border: 'none',
                  color: '#0d2b22', cursor: 'pointer',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 12, fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 18px rgba(1,130,98,.3)',
                  transition: 'transform .15s, box-shadow .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(1,130,98,.42)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 18px rgba(1,130,98,.3)'; }}
              >
                💡 Suggérer une amélioration
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            if (stage === 'feedback') {
              submitFeedback(text);
            } else {
              // Pendant le choix de profil, on laisse les cartes visibles
              // (on ne bascule pas en 'chat') tout en répondant aux questions.
              if (stage !== 'onboard-ask') setStage('chat');
              ask(text);
            }
          }} style={{
            padding: 10,
            borderTop: '1px solid rgba(126,201,176,.16)',
            background: 'rgba(13,43,34,.4)',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={stage === 'onboard-ask' ? 'Choisissez un profil ou posez une question…' : stage === 'feedback' ? 'Votre réponse… (ou «passer»)' : 'Demandez à Deva…'}
              disabled={busy}
              style={{
                flex: 1,
                background: 'rgba(13,43,34,.5)',
                border: '1px solid rgba(126,201,176,.2)',
                borderRadius: 12,
                padding: '11px 14px',
                color: '#e8f7f3',
                fontFamily: "'Satoshi', sans-serif", fontSize: 14,
                outline: 'none',
                transition: 'border-color .15s, box-shadow .15s',
                opacity: 1,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(126,201,176,.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(126,201,176,.12)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(126,201,176,.2)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            <button type="submit" disabled={busy || !draft.trim()} aria-label="Envoyer" style={{
              width: 40, height: 40, borderRadius: 10,
              background: busy || !draft.trim() ? 'rgba(126,201,176,.18)' : '#4aab8f',
              border: 'none',
              color: '#0d2b22',
              fontSize: 18, fontWeight: 700,
              cursor: busy || !draft.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background .15s',
            }}>↑</button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes devaslide {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to { opacity: 1; transform: none; }
        }
        @keyframes devateaser {
          from { transform: translateY(10px) scale(.85); }
          to { transform: none; }
        }
        @keyframes devapulse {
          0%   { box-shadow: 0 0 0 0 rgba(200,115,42,.55); }
          70%  { box-shadow: 0 0 0 10px rgba(200,115,42,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,115,42,0); }
        }
        @keyframes devablink {
          0%, 80%, 100% { opacity: .25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
        .devadot {
          width: 6px; height: 6px; border-radius: 50%; background: #7ec9b0;
          display: inline-block;
          animation: devablink 1.2s infinite ease-in-out;
        }
        .devadot:nth-child(2) { animation-delay: .15s; }
        .devadot:nth-child(3) { animation-delay: .3s; }
        [role="dialog"] input::placeholder { color: rgba(207,238,231,.5); }

        /* Pulse the user's role card in the Roles section after pickRole */
        ${role && (role === 'pilote' || role === 'batisseur' || role === 'semeur') ? `
          /* Targeting handled via JS, see App for class application if needed */
        ` : ''}

        @media (max-width: 500px) {
          [role="dialog"][aria-label="Conversation avec Deva"] {
            right: 10px !important;
            left: 10px !important;
            width: auto !important;
            bottom: 108px !important;
            height: 560px !important;
            max-height: calc(100vh - 128px) !important;
          }
          button[aria-label="Discuter avec Deva"],
          button[aria-label="Fermer Deva"] {
            left: 12px !important;
            right: auto !important;
            bottom: 18px !important;
          }
          [aria-label="Ouvrir la conversation avec Deva"] {
            left: 12px !important;
            right: auto !important;
            bottom: 104px !important;
          }
        }
        @media (max-width: 380px) {
          [role="dialog"][aria-label="Conversation avec Deva"] {
            bottom: 100px !important;
            max-height: calc(100vh - 116px) !important;
          }
        }
      `}</style>
    </>
  );
};

window.DevaChat = DevaChat;
