// Landing, sections: Vadance & Vadité (cadre de mesure) + Exemple concret Spirale VADE

// ─────────── Vadance & Vadité : les principes du cadre de mesure ───────────
const VADITE_PRINCIPLES = [
  {
    id: 'changement',
    emoji: '↗',
    accent: '#018262',
    tint: '#dcefe7',
    title: 'Un changement, pas un état.',
    body: "L'impact, c'est la flèche entre deux moments (T0 → T1), pas la hauteur du point d'arrivée. On mesure ce qui bascule, pas ce qui était déjà là.",
  },
  {
    id: 'capitaux',
    emoji: '🌿',
    accent: '#3a6e8c',
    tint: '#e0eef6',
    title: 'Trois capitaux, jamais confondus.',
    body: "Écologie, social, économie locale : les trois sont mesurés séparément et présentés ensemble. Un capital brillant ne rachète jamais un capital sinistré.",
    capitals: [
      { e: '🌿', l: 'Écologie', c: '#018262' },
      { e: '👥', l: 'Social', c: '#3a6e8c' },
      { e: '🪙', l: 'Économie locale', c: '#c8732a' },
    ],
  },
  {
    id: 'graduee',
    emoji: '🎖',
    accent: '#c8732a',
    tint: '#fce8d8',
    title: 'Une preuve graduée.',
    body: "Du déclaratif à l'audit tiers indépendant. La crédibilité ne vient pas du chiffre, mais du niveau de vérification atteint.",
  },
  {
    id: 'referentiel',
    emoji: '📚',
    accent: '#018262',
    tint: '#dcefe7',
    title: 'Un référentiel ouvert.',
    body: "La méthode est un commun : publique, inspectable, amendable. Ce que nous gardons, ce n'est pas la formule, c'est la rigueur de la preuve.",
  },
  {
    id: 'gouvernance',
    emoji: '☀️',
    accent: '#7a6ea8',
    tint: '#ece9f6',
    title: 'Une gouvernance indépendante.',
    body: "Les indicateurs sont validés par un Conseil Régénératif, distinct de notre intérêt commercial, où siège même une voix pour le vivant et les générations futures.",
  },
];

const VaditeSection = () => (
  <Section id="vadite" eyebrow="Vadance & Vadité"
    title={<>Nous ne vendons pas une promesse. <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>Nous prouvons un changement.</span></>}
    sub={<>EVAD mesure l'impact régénératif d'un territoire avec un cadre ouvert : la <b style={{ color: '#0d2b22' }}>Charte des ICI</b>. Chaque Indicateur de Changement d'Impact mesure une variation réelle, d'une base de départ (T0) vers une référence extérieure. Jamais un état absolu, jamais un chiffre sorti de nulle part.</>}>

    {/* La promesse et la preuve — carte pivot, mise en avant */}
    <div style={{
      background: 'linear-gradient(160deg, #0d2b22 0%, #013b2d 100%)',
      border: '1px solid rgba(126,201,176,.18)', borderRadius: 28,
      padding: '32px 34px', marginBottom: 20,
      boxShadow: '0 20px 50px rgba(13,43,34,.2)',
      display: 'grid', gridTemplateColumns: '1.35fr .95fr', gap: 40, alignItems: 'center',
    }} className="vadite-pivot">
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 12 }}>La promesse et la preuve</div>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#e8f7f3', margin: 0, marginBottom: 14 }}>
          La <b style={{ color: '#a8e6cf' }}>Vadance</b> projette ce qu'un lieu s'engage à faire advenir. La <b style={{ color: '#a8e6cf' }}>Vadité</b> prouve ce qui a réellement eu lieu, vérifié.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#cfeee7', margin: 0, opacity: .9 }}>
          L'<b style={{ color: '#e8f7f3' }}>indice de confiance</b> (Vadité ÷ Vadance) mesure la capacité d'un lieu à transformer ses promesses en preuves : notre indicateur anti-greenwashing.
        </p>
      </div>
      {/* Schéma Vadance vs Vadité → indice de confiance */}
      <div style={{
        background: 'rgba(126,201,176,.07)', border: '1px solid rgba(126,201,176,.2)',
        borderRadius: 20, padding: '20px 22px', fontFamily: "'Satoshi',sans-serif",
      }}>
        {/* pilule · indice de confiance */}
        <div style={{ textAlign: 'center', fontSize: 14, color: '#e8f7f3', background: 'rgba(126,201,176,.1)', border: '1px solid rgba(126,201,176,.2)', borderRadius: 100, padding: '6px 14px', width: 'fit-content', margin: '0 auto 18px' }}>
          📈 <b style={{ color: '#a8e6cf' }}>Indice de Confiance · 65%</b>
        </div>
        {/* graphique */}
        <div style={{ position: 'relative', height: 170, paddingLeft: 30 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 10, color: '#7ec9b0', opacity: .6, textAlign: 'right' }}>
            <span>100</span><span>50</span><span>0</span>
          </div>
          <div style={{ position: 'absolute', left: 30, right: 6, top: 0, bottom: 0, background: 'linear-gradient(rgba(130,184,148,.18),rgba(130,184,148,.18)) top/100% 1px no-repeat, linear-gradient(rgba(130,184,148,.14),rgba(130,184,148,.14)) center/100% 1px no-repeat, linear-gradient(rgba(130,184,148,.14),rgba(130,184,148,.14)) bottom/100% 1px no-repeat' }}/>
          <div style={{ position: 'absolute', left: 36, right: 30, top: 0, bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            {/* Vadance — ce que tu promets (85) */}
            <div style={{ position: 'relative', width: '42%', maxWidth: 88, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#a8e6cf', lineHeight: 1, marginBottom: 3 }}>85</div>
              <div style={{ width: '100%', height: '85%', borderRadius: '10px 10px 3px 3px', border: '2px dashed rgba(168,230,207,.5)', background: 'rgba(168,230,207,.06)' }}/>
            </div>
            {/* Vadité — déjà prouvé (55) */}
            <div style={{ position: 'relative', width: '42%', maxWidth: 88, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#e8f7f3', lineHeight: 1, marginBottom: 3 }}>55</div>
              <div style={{ width: '100%', height: '55%', borderRadius: '10px 10px 3px 3px', background: 'linear-gradient(180deg,#8ce0b0,#4aab8f)', boxShadow: '0 0 18px rgba(126,201,176,.4)' }}/>
              <div style={{ position: 'absolute', right: -6, top: '4%', transform: 'translateX(100%)', fontSize: 10, color: '#7ec9b0', lineHeight: 1.15, textAlign: 'left', whiteSpace: 'nowrap' }}>
                🚩<b style={{ display: 'block', fontSize: 16, color: '#a8e6cf' }}>+30</b><span>à prouver</span>
              </div>
            </div>
          </div>
        </div>
        {/* légende */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 8, paddingLeft: 30, paddingRight: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: '#e8f7f3' }}>Vadance</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: '#7ec9b0', opacity: .8, marginTop: 2 }}>ce que tu promets</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: '#a8e6cf' }}>Vadité</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: '#7ec9b0', opacity: .8, marginTop: 2 }}>déjà prouvé ✓</span>
          </div>
        </div>
        {/* cta */}
        <div style={{ textAlign: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(130,184,148,.14)', fontSize: 13.5, fontWeight: 700, color: '#e8f7f3' }}>
          Transforme tes promesses en preuves 🌱
        </div>
      </div>
    </div>

    {/* Manifeste de clôture */}
    <div style={{ textAlign: 'center', marginTop: 44 }}>
      <p style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 3.4vw, 34px)', letterSpacing: '-.02em', color: '#0d2b22', margin: 0 }}>
        Dire moins, et le <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>prouver.</span>
      </p>
    </div>

    <style>{`@media (max-width: 880px) { .vadite-pivot { grid-template-columns: 1fr !important; gap: 26px !important; } }`}</style>
  </Section>
);

window.VaditeSection = VaditeSection;
