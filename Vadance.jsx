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

// ─────────── Exemple concret : la Spirale VADE de bout en bout ───────────
const EXAMPLE_STEPS = [
  {
    L: 'V', name: 'Valoriser', color: '#018262', tint: '#dcefe7',
    body: <>Léa, la pilote, inscrit le lieu, établit la base <b style={{ color: '#0d2b22' }}>T0</b> et projette le futur du site en 3D. Elle formule sa promesse d'impact.</>,
    tools: [{ e: '🏡', l: 'Création de fiche' }, { e: '⛏️', l: 'Modélisation' }],
    badge: { label: 'Vadance', value: '58', unit: '/ 100' },
  },
  {
    L: 'A', name: 'Activer', color: '#3a6e8c', tint: '#e0eef6',
    body: <>Elle publie le projet et ouvre des quêtes concrètes. <b style={{ color: '#0d2b22' }}>Karim</b>, bâtisseur, y répond et gagne du Vade. Le financeur <b style={{ color: '#0d2b22' }}>Sud Atlantique</b> engage <b style={{ color: '#0d2b22' }}>25 000 €</b>, débloqués par paliers signés.</>,
    tools: [{ e: '📚', l: 'Bibliothèque de solutions' }, { e: '💬', l: 'Réseau social' }, { e: '👤', l: 'Gestion de projet' }],
  },
  {
    L: 'D', name: 'Développer', color: '#c8732a', tint: '#fce8d8',
    body: "Les solutions sont mises en œuvre, puis mesurées. Trois indicateurs, un par capital :",
    tools: [{ e: '📊', l: 'Mesure d\u2019impact' }],
    indicators: [
      { e: '🌿', cap: 'Écologie', c: '#018262', metric: 'haies replantées', from: '0', to: '+420 m' },
      { e: '👥', cap: 'Social', c: '#3a6e8c', metric: 'personnes en insertion accompagnées', from: '3', to: '18 / an' },
      { e: '🪙', cap: 'Économie locale', c: '#c8732a', metric: 'part des achats au territoire', from: '22 %', to: '64 %' },
    ],
  },
  {
    L: 'E', name: 'Essaimer', color: '#7a6ea8', tint: '#ece9f6',
    body: <>La preuve est vérifiée par les pairs, puis par un audit. Le passeport du lieu est publié. Le semeur reçoit sa <b style={{ color: '#0d2b22' }}>Vadité</b>, et un dividende d'impact.</>,
    tools: [{ e: '📈', l: 'Tableau de bord' }],
    badge: { label: 'Indice de confiance', value: '93', unit: '%', note: 'la promesse est tenue' },
  },
];

const ExampleSection = () => (
  <Section id="exemple" eyebrow="Un exemple, de bout en bout"
    title={<>Un tiers-lieu, <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>de la promesse à la preuve.</span></>}>

    {/* Avertissement : exemple fictif */}
    <div style={{
      background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderLeft: '3px solid #c8732a',
      borderRadius: 16, padding: '16px 20px', marginBottom: 22,
      display: 'flex', alignItems: 'flex-start', gap: 14,
    }}>
      <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💭</span>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>
        Aucun lieu réel n'est encore mesuré par EVAD. Voici un exemple volontairement <b style={{ color: '#c8732a' }}>fictif</b>, pour montrer comment la spirale VADE fonctionne, de bout en bout.
      </p>
    </div>

    {/* Fiche du lieu */}
    <div style={{
      background: 'linear-gradient(160deg, #0d2b22 0%, #1a4a2e 55%, #0e3a2a 100%)',
      borderRadius: 24, padding: '30px 34px', marginBottom: 30,
      display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap',
    }}>
      <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(126,201,176,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0 }}>🏡</div>
      <div style={{ flex: '1 1 260px', minWidth: 220 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 6 }}>Le lieu · exemple fictif</div>
        <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.6vw, 28px)', color: '#e8f7f3', lineHeight: 1.15 }}>La Fabrique des Coteaux</div>
        <div style={{ fontSize: 14, color: '#cfeee7', opacity: .85, marginTop: 4 }}>Un tiers-lieu nourricier imaginaire en Nouvelle-Aquitaine.</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['V','A','D','E'].map((l, i) => {
          const cs = ['#018262','#3a6e8c','#c8732a','#7a6ea8'];
          return (
            <span key={l} style={{ width: 38, height: 38, borderRadius: 10, background: cs[i], color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 18 }}>{l}</span>
          );
        })}
      </div>
    </div>

    {/* Étapes VADE */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {EXAMPLE_STEPS.map((s, i) => (
        <div key={s.L} style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 22, alignItems: 'flex-start',
          background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderLeft: '3px solid ' + s.color,
          borderRadius: 20, padding: '24px 26px',
          boxShadow: '0 2px 16px rgba(1,130,98,.06)',
        }}>
          {/* Colonne lettre + connecteur */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, border: '2px solid ' + s.color, color: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 26,
            }}>{s.L}</div>
            {i < EXAMPLE_STEPS.length - 1 && (
              <div style={{ width: 2, flex: 1, minHeight: 20, background: 'linear-gradient(' + s.color + '55, ' + EXAMPLE_STEPS[i + 1].color + '55)', borderRadius: 2 }}/>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: s.color }}>{s.L} · {s.name}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3d6b5a', margin: 0 }}>{s.body}</p>

            {/* Outils EVAD mobilisés */}
            {s.tools && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8aa79b' }}>Outils EVAD</span>
                {s.tools.map(t => (
                  <span key={t.l} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 100,
                    background: s.color + '12', border: '1px solid ' + s.color + '2e', color: s.color,
                    fontSize: 12.5, fontWeight: 700,
                  }}>
                    <span aria-hidden="true" style={{ fontSize: 13 }}>{t.e}</span>{t.l}
                  </span>
                ))}
              </div>
            )}

            {/* Indicateurs (étape D) */}
            {s.indicators && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 16 }}>
                {s.indicators.map(ind => (
                  <div key={ind.metric} style={{
                    background: ind.c + '0d', border: '1px solid ' + ind.c + '2a', borderRadius: 14,
                    padding: '14px 16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ fontSize: 16 }}>{ind.e}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: ind.c }}>{ind.cap}</span>
                    </div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.4, color: '#3d6b5a', marginBottom: 10 }}>{ind.metric}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 15, color: '#8aa79b' }}>{ind.from}</span>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={ind.c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                      <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 19, color: ind.c }}>{ind.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Badge score (étapes V et E) */}
            {s.badge && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 14, marginTop: 16,
                background: s.tint, border: '1px solid ' + s.color + '33', borderRadius: 100,
                padding: '10px 20px 10px 16px',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: s.color }}>{s.badge.label}</span>
                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 26, color: '#0d2b22', lineHeight: 1 }}>{s.badge.value}</span>
                  <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 14, color: s.color }}>{s.badge.unit}</span>
                </span>
                {s.badge.note && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: s.color }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {s.badge.note}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Clôture */}
    <div style={{
      marginTop: 26, background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderLeft: '3px solid #018262',
      borderRadius: 18, padding: '22px 24px',
    }}>
      <p style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.4, color: '#0d2b22', margin: 0 }}>
        Voilà ce qu'EVAD rend visible : non pas une intention, mais un changement <span style={{ color: '#018262' }}>prouvé, chiffré, vérifié.</span>
      </p>
    </div>
    <div style={{ marginTop: 12, fontSize: 12, fontStyle: 'italic', color: '#8aa79b' }}>
      Exemple fictif, à visée pédagogique. Les chiffres sont illustratifs.
    </div>
  </Section>
);

window.VaditeSection = VaditeSection;
window.ExampleSection = ExampleSection;
