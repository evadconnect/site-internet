// Landing, Ecosystem constellation section

const TOOLS = [
  {
    id: 'carte',
    name: "Carte de l'écosystème",
    icon: '🗺',
    tint: '#cfeee7',
    desc: 'Tous les profils géolocalisés : pilotes, bâtisseurs, semeurs, avec leur fiche de présentation.',
    apport: 'Le territoire avant l\'outil : on commence toujours par un lieu réel.',
    roleDesc: {
      pilote:    "Rendez votre lieu visible des bâtisseurs et financeurs de votre biorégion. Une fiche, des photos, vos quêtes ouvertes.",
      batisseur: "Trouvez les lieux durables près de chez vous, filtrez par activité (permaculture, low-tech, hébergement) et engagez-vous.",
      semeur:    "Cartographiez les projets à soutenir, filtrez par biorégion, Vadité ou thématique avant d'engager vos fonds.",
    },
  },
  {
    id: 'reseau',
    name: 'Réseau social',
    icon: '💬',
    tint: '#fde6d8',
    desc: 'Un réseau pensé pour l\'action collective. Des fils centrés sur les quêtes et les rencontres concrètes entre membres.',
    apport: 'Les liens humains comme infrastructure : sans relations, pas de durabilité.',
    roleDesc: {
      pilote:    "Animez votre communauté locale : publiez vos quêtes, partagez l'avancée des chantiers, fédérez vos bâtisseurs réguliers.",
      batisseur: "Discutez avec les porteurs de lieu, posez vos questions avant de partir, retrouvez d'autres bâtisseurs de votre coin.",
      semeur:    "Suivez l'actualité concrète des projets que vous financez : avancées, photos, témoignages des bâtisseurs.",
    },
  },
  {
    id: 'bdd',
    name: 'Bibliothèque de solutions',
    icon: '📚',
    tint: '#e5e0f0',
    desc: 'Une bibliothèque vivante où chaque solution trouvée par un lieu devient un savoir partagé pour tous.',
    apport: 'La mémoire commune : ce qui marche quelque part peut servir partout.',
    roleDesc: {
      pilote:    "Puisez dans les fiches techniques éprouvées (permaculture, low-tech, gouvernance) et documentez vos propres réussites pour les autres lieux.",
      batisseur: "Apprenez gratuitement les techniques régénératives, fiche par fiche, et formez-vous avant ou pendant vos quêtes.",
      semeur:    "Identifiez les solutions à fort impact qui méritent d'être financées et essaimées sur d'autres territoires.",
    },
  },
  {
    id: 'marketplace',
    name: 'Reconnaissance',
    icon: '🤝',
    tint: '#fce8d8',
    desc: "Un espace où votre engagement est reconnu. En contribuant sur le terrain, vous débloquez des ateliers, des formations, des nuits en écolieu et des savoir-faire partagés par les lieux du réseau. Ici, on n'achète rien : on ouvre des portes grâce à ce que l'on a apporté au commun. La valeur reste sur le territoire.",
    apport: 'On ne paie pas, on reconnaît : ce que vous apportez au commun vous ouvre le réseau.',
    roleDesc: {
      pilote:    "Proposez vos ateliers, hébergements et formations contre des contributions. Une nouvelle ressource, ancrée localement.",
      batisseur: "Gagnez des contributions en accomplissant des quêtes, échangez-les contre des ateliers, nuits en yourte ou formations dans le réseau.",
      semeur:    "Soutenez la circulation locale en abondant les pots de contributions : votre euro reste sur le territoire au lieu de fuir.",
    },
  },
  {
    id: 'mesure',
    name: "Mesure d'impact",
    icon: '📊',
    tint: '#e0eef6',
    desc: 'Chaque lieu affiche sa Vadance, sa promesse d\'impact, et sa Vadité, ce qui est déjà prouvé. L\'indice de confiance mesure l\'écart entre les deux : chaque preuve documentée rapproche la promesse de la réalité.',
    apport: 'Mesurer pour rendre crédible : promesse affichée, preuves vérifiées.',
    roleDesc: {
      pilote:    "Affichez la Vadance de votre lieu et faites-la monter en Vadité : chaque preuve documentée rend vos progrès crédibles auprès des financeurs et des bâtisseurs.",
      batisseur: "Voyez la Vadité réelle des lieux où vous allez agir : ce qui est déjà prouvé, leur indice de confiance, leur trajectoire.",
      semeur:    "Financez les lieux qui transforment leur Vadance en Vadité, et suivez l'indice de confiance de votre portefeuille.",
    },
  },
  {
    id: 'cockpit',
    name: 'Tableau de bord',
    icon: '📈',
    tint: '#f4e8d8',
    desc: "Un cockpit pour chaque rôle : contributions, quêtes en cours, financements, indicateurs d'impact. Voir son impact en un coup d'œil et le partager.",
    apport: 'Piloter à hauteur d\'humain : votre lieu, votre rôle, votre trajectoire.',
    roleDesc: {
      pilote:    "Pilotez votre lieu en un coup d'œil : quêtes ouvertes, preuves en attente, financements reçus, Vadité en évolution.",
      batisseur: "Suivez vos contributions, vos quêtes en cours, vos preuves validées et vos apports à la bibliothèque commune.",
      semeur:    "Visualisez votre portefeuille d'impact : fonds engagés, preuves reçues, Vadité agrégée de vos projets soutenus.",
    },
  },
  {
    id: 'compte',
    name: 'Gestion de projet',
    icon: '👤',
    tint: '#dcefe7',
    desc: 'Un compte unique propulsé par Nextcloud : fichiers, agenda, contacts, visio, tâches. Chiffré de bout en bout, hébergé en France, conforme RGPD : vos données et celles de votre projet sont protégées.',
    apport: 'Souveraineté numérique : vos données restent les vôtres, sur une infrastructure libre.',
    roleDesc: {
      pilote:    "Gérez tout votre lieu sur un compte souverain : agenda, contacts bâtisseurs, fichiers chantier, visios, tâches d'équipe.",
      batisseur: "Stockez vos preuves, photos et notes de chantier sur un compte chiffré et libre, en France.",
      semeur:    "Centralisez vos dossiers de financement, conventions et reportings sur une infrastructure souveraine et conforme RGPD.",
    },
  },
  {
    id: 'modelisation',
    name: 'Modélisation',
    icon: '⛏',
    tint: '#d8e8d8',
    desc: 'Modéliser un lieu dans Minecraft Java avant de poser la première pierre. Co-construire les futurs possibles avec la communauté, bloc par bloc.',
    apport: 'Projeter avant d\'agir : un jeu sérieux pour rêver le lieu ensemble.',
    roleDesc: {
      pilote:    "Maquettez votre lieu en voxel avec votre communauté avant les travaux : teste d'aménagements, validation collective, économie d'erreurs.",
      batisseur: "Plongez dans les futurs possibles, contribuez aux maquettes des lieux que vous rejoindrez, apprenez le design solarpunk.",
      semeur:    "Visualisez en 3D les projets avant d'investir : comprenez l'ambition, le contexte et l'usage prévu d'un lieu avant de financer.",
    },
  },
];

// ─────────────────── Visuals per tool ───────────────────
const ToolVisual = ({ id }) => {
  const common = { borderRadius: 24, border: '1px solid rgba(46,102,66,.12)', background: '#fff', height: 460, overflow: 'hidden', position: 'relative', boxShadow: '0 12px 32px rgba(1,130,98,.08)' };

  if (id === 'carte') return (
    <div style={{ ...common, padding: 0 }}>
      <img loading="lazy" decoding="async" src={(window.__resources && window.__resources.map) || "assets/map-evad.jpg"} alt="Carte EVAD, communauté autour de Bordeaux, pins lieux/bâtisseurs/semeurs, panneau de la communauté EVAD" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    </div>
  );

  if (id === 'reseau') return (
    <div style={{ ...common, padding: 0 }}>
      <img loading="lazy" decoding="async" src={(window.__resources && window.__resources.reseau) || "assets/reseau.jpg"} alt="Réseau social EVAD, fils de quêtes et conversations entre membres" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    </div>
  );

  if (id === 'bdd') return (
    <div style={{ ...common, padding: 0 }}>
      <img loading="lazy" decoding="async" src={(window.__resources && window.__resources.bibliotheque) || "assets/bibliotheque.jpg"} alt="Bibliothèque de solutions, fiches Récupération eau, Phytoépuration, filtres thématiques" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    </div>
  );

  if (id === 'marketplace') return (
    <div style={{ ...common, background: 'linear-gradient(160deg, #fdf8f0 0%, #f2ede1 100%)', display: 'flex', flexDirection: 'column', padding: 22 }}>
      {/* header + filtres sobres */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0d2b22', marginRight: 'auto' }}>Ressources du réseau</div>
        {['Par type', 'À proximité'].map(f => (
          <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#3d6b5a', background: '#fff', border: '1px solid rgba(46,102,66,.14)', borderRadius: 100, padding: '6px 11px' }}>
            {f}
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        ))}
      </div>
      {/* grille de cartes de ressources */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { e: '🛠️', t: 'Atelier réparation', lieu: "L'Atelier du Val",       c: '#018262', tint: '#dcefe7' },
          { e: '⛺',  t: 'Nuit en écolieu',    lieu: 'Ferme des Colibris',     c: '#c8732a', tint: '#fce8d8' },
          { e: '🧰', t: 'Outils partagés',    lieu: 'La Commune Verte',       c: '#3a6e8c', tint: '#e0eef6' },
          { e: '📚', t: 'Formation',          lieu: 'Le Champ des Possibles', c: '#7a6ea8', tint: '#ece8f5' },
          { e: '🍞', t: 'Four à pain',        lieu: 'Le Fournil Partagé',     c: '#b06a2e', tint: '#f6e7d6' },
          { e: '🪴', t: 'Serre & semences',   lieu: 'Les Serres du Coteau',   c: '#4aab8f', tint: '#dcf0e9' },
        ].map((r, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(46,102,66,.1)', boxShadow: '0 2px 10px rgba(1,130,98,.05)', padding: 12, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: r.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{r.e}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0d2b22', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.t}</div>
                <div style={{ fontSize: 10, color: '#3d6b5a', opacity: .8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.lieu}</div>
              </div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: r.c, background: r.tint, borderRadius: 100, padding: '4px 11px' }}>Découvrir</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (id === 'mesure') return (
    <div style={{ ...common, background: 'radial-gradient(120% 90% at 50% 12%, #17392c 0%, #0b201a 72%)', border: 'none' }}>
      <svg viewBox="0 0 500 460" width="100%" height="100%" style={{ fontFamily: "'Satoshi',sans-serif" }}>
        <defs>
          <linearGradient id="vaditeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fd6b8"/>
            <stop offset="1" stopColor="#4aab8f"/>
          </linearGradient>
        </defs>

        {/* badge · indice de confiance */}
        <g transform="translate(250,42)">
          <rect x="-120" y="-21" width="240" height="42" rx="21" fill="rgba(126,201,176,.1)" stroke="rgba(126,201,176,.35)"/>
          <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill="#e8f7f3">📈 Indice de confiance · 65%</text>
        </g>

        {/* axis + baseline */}
        {[['100',155],['50',270],['0',385]].map(([l,y]) => (
          <text key={l} x="62" y={Number(y)+4} textAnchor="end" fontSize="13" fontWeight="600" fill="#6f9184">{l}</text>
        ))}
        <line x1="82" y1="384" x2="470" y2="384" stroke="rgba(207,238,231,.28)" strokeWidth="1"/>

        {/* objectif (85) dashed guide line */}
        <line x1="138" y1="184" x2="470" y2="184" stroke="rgba(126,201,176,.4)" strokeWidth="1.5" strokeDasharray="5 5"/>

        {/* Vadance — objectif (ghost bar, 85) */}
        <rect x="138" y="184" width="96" height="200" rx="16" fill="rgba(122,201,176,.1)" stroke="#4aab8f" strokeWidth="1.8" strokeDasharray="6 5"/>
        <text x="186" y="168" textAnchor="middle" fontSize="42" fontWeight="900" fill="#5cbf9c">85</text>
        <text x="186" y="412" textAnchor="middle" fontSize="16" fontWeight="700" fill="#e8f7f3">Vadance</text>
        <text x="186" y="432" textAnchor="middle" fontSize="12" fill="#9bbcb0">ton objectif</text>

        {/* Vadité — déjà prouvé (solid bar, 55) */}
        <rect x="290" y="250" width="98" height="138" rx="18" fill="#5bb894" opacity=".3"/>
        <rect x="292" y="253" width="94" height="131" rx="14" fill="url(#vaditeGrad)"/>
        <text x="339" y="238" textAnchor="middle" fontSize="42" fontWeight="900" fill="#eafaf4">55</text>
        <text x="339" y="412" textAnchor="middle" fontSize="16" fontWeight="700" fill="#e8f7f3">Vadité</text>
        <text x="339" y="432" textAnchor="middle" fontSize="12" fill="#9bbcb0">déjà prouvé ✓</text>

        {/* +30 à prouver — flèche de Vadité vers l'objectif */}
        <g transform="translate(410,0)">
          <line x1="0" y1="253" x2="0" y2="192" stroke="#7ec9b0" strokeWidth="2.6"/>
          <polygon points="0,182 -8,196 8,196" fill="#7ec9b0"/>
          <text x="14" y="224" fontSize="18" fontWeight="800" fill="#7ec9b0">+30</text>
          <text x="14" y="242" fontSize="12" fill="#cfeee7">à prouver</text>
          <text x="-1" y="167" textAnchor="middle" fontSize="20">🎯</text>
        </g>

        {/* caption */}
        <text x="250" y="452" textAnchor="middle" fontSize="15" fontWeight="700" fill="#e8f7f3">Transforme tes promesses en preuves 🌱</text>
      </svg>
    </div>
  );

  if (id === 'cockpit') return (
    <div style={common}>
      <svg viewBox="0 0 500 460" width="100%" height="100%">
        {/* header */}
        <g transform="translate(28,24)">
          <text x="0" y="14" fontFamily="Satoshi" fontSize="11" fontWeight="700" letterSpacing="2" fill="#018262">TABLEAU DE BORD · SARA · BÂTISSEUSE</text>
          <text x="0" y="34" fontFamily="Satoshi" fontSize="22" fontWeight="900" fill="#0d2b22">Vue d'ensemble</text>
        </g>

        {/* KPI row */}
        {[
          ['#018262', '🌱', '128',  'contributions',    28],
          ['#c8732a', '⚡', '4',    'quêtes en cours',   144],
          ['#3a6e8c', '✓', '12',   'preuves validées',  260],
          ['#7a6ea8', '📚', '6',    'contributions BDD', 376],
        ].map(([c, e, v, l, x], i) => (
          <g key={i} transform={`translate(${x},74)`}>
            <rect x="0" y="0" width="100" height="84" rx="14" fill="#fff" stroke="rgba(46,102,66,.12)"/>
            <text x="12" y="22" fontSize="14">{e}</text>
            <text x="12" y="56" fontFamily="Satoshi" fontWeight="900" fontSize="26" fill={c}>{v}</text>
            <text x="12" y="72" fontFamily="Satoshi" fontSize="9" fontWeight="600" fill="#3d6b5a" opacity=".75">{l}</text>
          </g>
        ))}

        {/* chart card */}
        <g transform="translate(28,176)">
          <rect x="0" y="0" width="288" height="178" rx="14" fill="#fff" stroke="rgba(46,102,66,.12)"/>
          <text x="14" y="22" fontFamily="Satoshi" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#3d6b5a">CONTRIBUTIONS · 6 DERNIERS MOIS</text>
          <text x="14" y="44" fontFamily="Satoshi" fontWeight="900" fontSize="22" fill="#018262">+128 <tspan fontSize="11" fill="#3d6b5a" fontWeight="600">contributions</tspan></text>
          {/* sparkline area */}
          <g transform="translate(14,60)">
            <path d="M0,90 L0,70 L40,72 L80,56 L120,60 L160,40 L200,30 L240,16 L260,10 L260,90 Z" fill="rgba(1,130,98,.12)"/>
            <path d="M0,70 L40,72 L80,56 L120,60 L160,40 L200,30 L240,16 L260,10" fill="none" stroke="#018262" strokeWidth="2"/>
            {[0,40,80,120,160,200,240,260].map((x, i) => {
              const y = [70,72,56,60,40,30,16,10][i];
              return <circle key={i} cx={x} cy={y} r="2.5" fill="#018262"/>;
            })}
            {/* x labels */}
            {['Déc','Jan','Fév','Mar','Avr','Mai'].map((m, i) => (
              <text key={i} x={i*52} y="106" fontFamily="Satoshi" fontSize="8" fontWeight="600" fill="#3d6b5a" opacity=".6">{m}</text>
            ))}
          </g>
        </g>

        {/* Vadité gauge */}
        <g transform="translate(332,176)">
          <rect x="0" y="0" width="144" height="178" rx="14" fill="#018262"/>
          <text x="14" y="22" fontFamily="Satoshi" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#7ec9b0">VADITÉ</text>
          <g transform="translate(72,108)">
            <path d="M-50,0 A50,50 0 0,1 50,0" fill="none" stroke="rgba(207,238,231,.18)" strokeWidth="10" strokeLinecap="round"/>
            <path d="M-50,0 A50,50 0 0,1 39,-31" fill="none" stroke="#7ec9b0" strokeWidth="10" strokeLinecap="round"/>
            <text y="-12" fontFamily="Satoshi" fontSize="34" fontWeight="900" fill="#e8f7f3" textAnchor="middle">78</text>
            <text y="6" fontFamily="Satoshi" fontSize="9" fill="#7ec9b0" textAnchor="middle">/100</text>
          </g>
          <text x="72" y="160" fontFamily="Satoshi" fontSize="10" fontWeight="600" fill="#cfeee7" textAnchor="middle" opacity=".85">+12 sur 6 mois</text>
        </g>

        {/* upcoming quests */}
        <g transform="translate(28,374)">
          <rect x="0" y="0" width="448" height="64" rx="14" fill="#fff" stroke="rgba(46,102,66,.12)"/>
          <text x="14" y="20" fontFamily="Satoshi" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#3d6b5a">PROCHAINES QUÊTES</text>
          {[
            ['#018262', 'Phytoépuration · samedi', '12 G'],
            ['#c8732a', 'Atelier permaculture · 23 mai', '50 G'],
            ['#7a6ea8', 'Récolte miel · juin', '8 G'],
          ].map(([c, t, p], i) => (
            <g key={i} transform={`translate(${14 + i*146},34)`}>
              <circle cx="6" cy="10" r="4" fill={c}/>
              <text x="16" y="14" fontFamily="Satoshi" fontSize="10" fontWeight="600" fill="#0d2b22">{t}</text>
              <text x="16" y="26" fontFamily="Satoshi" fontSize="9" fontWeight="700" fill={c}>{p}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );

  if (id === 'compte') return (
    <div style={common}>
      <svg viewBox="0 0 500 460" width="100%" height="100%">
        {/* Nextcloud-style app grid */}
        <g transform="translate(40,40)">
          {/* header bar */}
          <rect x="0" y="0" width="420" height="48" rx="10" fill="#018262"/>
          <circle cx="24" cy="24" r="10" fill="#cfeee7"/>
          <path d="M19,24 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M14,38 a10,10 0 0,1 20,0" fill="none" stroke="#018262" strokeWidth="1.5"/>
          <text x="44" y="29" fontFamily="Satoshi" fontSize="13" fontWeight="700" fill="#e8f7f3">Sara · Bâtisseuse · 28 🌱</text>
          <text x="406" y="29" fontFamily="Satoshi" fontSize="10" fontWeight="600" fill="#cfeee7" textAnchor="end" opacity=".7">evad.cloud</text>
          {/* app tiles */}
          {[
            ['📁','Fichiers','#0082c9'],
            ['📅','Agenda','#c8732a'],
            ['👥','Contacts','#7a6ea8'],
            ['💬','Talk','#018262'],
            ['✉️','Mail','#3a6e8c'],
            ['📋','Deck','#b85e38'],
            ['📝','Notes','#4aab8f'],
            ['🗂','Office','#f0c84a'],
            ['🔐','Coffre','#016b52'],
            ['📊','Forms','#7ec9b0'],
            ['🗺','Maps','#c8732a'],
            ['⚙️','Réglages','#3d6b5a'],
          ].map((a, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            return (
              <g key={i} transform={`translate(${col * 100 + 14},${row * 100 + 72})`}>
                <rect x="0" y="0" width="86" height="86" rx="16" fill="#fff" stroke="rgba(1,130,98,.1)"/>
                <circle cx="43" cy="34" r="20" fill={a[2]} opacity=".14"/>
                <text x="43" y="42" fontSize="22" textAnchor="middle">{a[0]}</text>
                <text x="43" y="70" fontFamily="Satoshi" fontSize="10" fontWeight="600" fill="#0d2b22" textAnchor="middle">{a[1]}</text>
              </g>
            );
          })}
        </g>
        {/* nextcloud badge */}
        <g transform="translate(40,420)">
          <rect x="0" y="-22" width="170" height="26" rx="13" fill="#fff" stroke="rgba(1,130,98,.15)"/>
          <circle cx="14" cy="-9" r="6" fill="#0082c9"/>
          <text x="26" y="-5" fontFamily="Satoshi" fontSize="10" fontWeight="700" fill="#3d6b5a">Propulsé par </text>
          <text x="92" y="-5" fontFamily="Satoshi" fontSize="10" fontWeight="700" fill="#0082c9">Nextcloud</text>
        </g>
        <g transform="translate(290,420)">
          <rect x="0" y="-22" width="170" height="26" rx="13" fill="#fff" stroke="rgba(1,130,98,.15)"/>
          <text x="14" y="-5" fontFamily="Satoshi" fontSize="10" fontWeight="700" fill="#018262">🇫🇷 Hébergement souverain</text>
        </g>
      </svg>
    </div>
  );

  if (id === 'modelisation') return (
    <div style={{ ...common, padding: 0 }}>
      <img loading="lazy" decoding="async" src={(window.__resources && window.__resources.modelisation) || "assets/modelisation.jpg"} alt="Modélisation Minecraft Java, village solarpunk en voxel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    </div>
  );

  return <div style={common}/>;
};

// ─────────────────── Per-role tool priorities ───────────────────
// Higher = more relevant. Top 3 get a "Pour vous" badge and float to top.
const ROLE_PRIORITIES = {
  pilote:    { carte: 5, cockpit: 4, mesure: 4, modelisation: 3, compte: 3, bdd: 2, reseau: 1, marketplace: 1 },
  batisseur: { reseau: 5, marketplace: 5, bdd: 4, cockpit: 3, modelisation: 2, carte: 2, mesure: 1, compte: 1 },
  semeur:    { mesure: 5, carte: 4, cockpit: 4, bdd: 3, compte: 2, reseau: 1, marketplace: 1, modelisation: 1 },
};

const ROLE_META = {
  pilote:    { emoji: '🏡', short: 'Pilote',    color: '#018262', tint: '#dcefe7', focus: 'piloter votre lieu',     accent: 'Visualisez votre territoire, mesurez votre impact, suivez vos quêtes.' },
  batisseur: { emoji: '🌿', short: 'Bâtisseur', color: '#c8732a', tint: '#fce8d8', focus: 'agir sur le terrain',    accent: 'Trouvez vos quêtes, échangez vos contributions, apprenez du commun.' },
  semeur:    { emoji: '🌾', short: 'Semeur',    color: '#3a6e8c', tint: '#e0eef6', focus: 'financer avec preuves',   accent: 'Mesurez les impacts, cartographiez les projets, suivez votre portefeuille.' },
};

// ─────────────────── Section ───────────────────
const EcosystemSection = ({ role, onChoose }) => {
  const meta = role && ROLE_META[role];
  const priorities = role && ROLE_PRIORITIES[role];

  // Reorder tools by priority, default order if no role
  const orderedTools = React.useMemo(() => {
    if (!priorities) return TOOLS;
    return [...TOOLS].sort((a, b) => (priorities[b.id] || 0) - (priorities[a.id] || 0));
  }, [priorities]);

  // Top 3 tools get a "Pour vous" badge
  const topThreeIds = React.useMemo(() => orderedTools.slice(0, 3).map(t => t.id), [orderedTools]);

  const [open, setOpen] = React.useState(orderedTools[0].id);

  // When role changes, auto-open the top-priority tool
  React.useEffect(() => {
    setOpen(orderedTools[0].id);
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  const current = orderedTools.find(t => t.id === open) || orderedTools[0];

  return (
    <Section id="ecosystem" eyebrow="Concrètement, qu'est-ce que ça change ?"
      title={<>Un écosystème d'outils,<br/><span style={{ fontStyle: 'italic', fontWeight: 600, color: meta ? meta.color : '#018262' }}>connectés au même compte.</span></>}
      sub={meta ? meta.accent : "Huit solutions, un seul compte. Sélectionnez-en une dans la liste pour comprendre sa contribution au tissu vivant d'EVAD."}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }} className="eco-grid">
        {/* LEFT, accordion */}
        <div style={{
          background: '#fff', borderRadius: 24, border: '1px solid rgba(46,102,66,.1)',
          boxShadow: '0 12px 32px rgba(1,130,98,.06)', padding: '8px 24px',
        }}>
          {orderedTools.map(t => {
            const isOpen = open === t.id;
            const isTop = meta && topThreeIds.includes(t.id);
            return (
              <div key={t.id} style={{ borderBottom: '1px solid rgba(46,102,66,.15)' }}>
                <button onClick={() => setOpen(isOpen ? null : t.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 4px',
                  background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer',
                  fontFamily: "'Satoshi',sans-serif",
                }}>
                  <span role="img" aria-label={t.name} style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: t.tint,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {t.icon}
                  </span>
                  <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#0d2b22' }}>{t.name}</span>
                  </span>
                  <span style={{ fontSize: 13, color: '#3d6b5a', opacity: .6, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 260 : 0, overflow: 'hidden',
                  transition: 'max-height .35s ease, opacity .25s ease',
                  opacity: isOpen ? 1 : 0,
                }}>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: '#3d6b5a', margin: 0, padding: '0 4px 12px 56px' }}>
                    {t.desc}
                  </p>
                  {meta && t.roleDesc && t.roleDesc[role] && (
                    <div style={{
                      margin: '0 4px 18px 56px',
                      padding: '12px 14px',
                      background: meta.tint,
                      borderRadius: 12,
                      border: '1px solid ' + meta.color + '33',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 6,
                        background: '#fff', color: meta.color,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, flexShrink: 0,
                        boxShadow: '0 1px 4px ' + meta.color + '22',
                      }}>{meta.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: meta.color, marginBottom: 4, opacity: .85 }}>
                          Pour vous, {meta.short}
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: '#0d2b22', margin: 0, fontWeight: 500 }}>
                          {t.roleDesc[role]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT, visual + caption */}
        <div>
          <ToolVisual id={current.id}/>
          <div style={{ marginTop: 28, paddingLeft: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ width: 22, height: 1.5, background: meta ? meta.color : '#018262' }}/>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: meta ? meta.color : '#018262' }}>Apport à l'écosystème</span>
            </div>
            <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: '#0d2b22', maxWidth: 520 }}>
              {current.apport}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 880px) { .eco-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
};

window.EcosystemSection = EcosystemSection;
