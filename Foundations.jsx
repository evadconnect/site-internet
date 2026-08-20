// Landing, Foundations: Solarpunk / Économie régénérative / Écocratie

const PILLARS = [
  {
    id: 'solarpunk',
    eyebrow: '01 · Vision',
    title: 'Solarpunk',
    pitch: "Un mouvement visionnaire à la croisée de la culture, de la science et de l'art, imaginant un avenir positif où l'humanité, la nature et la technologie cohabitent dans une harmonie vivante.",
    bullets: [],
    bg: '#0d2b22',
    accent: '#c8732a',
    visual: () => (
      <img loading="lazy" decoding="async" src={window.__resources.solarpunk} alt="Solarpunk, maison en bois avec panneaux solaires et toit végétalisé" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    ),
  },
  {
    id: 'regen',
    eyebrow: '02 · Boussole',
    title: 'Économie régénérative',
    pitch: "Une économie qui va au-delà de la durabilité afin de restaurer, revitaliser et renforcer les systèmes écologiques, sociaux et économiques en créant des boucles vertueuses de valeur.",
    bullets: [],
    bg: '#0d2b22',
    accent: '#018262',
    visual: () => (
      <img loading="lazy" decoding="async" src={window.__resources.regen} alt="Économie régénérative, atelier collectif de réparation, jardin et ressources partagées" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    ),
  },
  {
    id: 'ecocratie',
    eyebrow: '03 · Gouvernance',
    title: 'Écocratie',
    pitch: "Une gouvernance au service du vivant : des décisions décentralisées, alignées sur les limites planétaires et nourries par l'intelligence collective.",
    bullets: [],
    bg: '#0d2b22',
    accent: '#7a6ea8',
    visual: () => (
      <img loading="lazy" decoding="async" src={window.__resources.ecocratie} alt="Écocratie, conseil de toutes les voix autour d'une table ronde dans un jardin" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
    ),
  },
  {
    id: 'gamification',
    eyebrow: '04 · Engagement',
    title: 'Gamification',
    pitch: "Des mécaniques de jeu au service de l'impact : quêtes, preuves, Vadance et Vadité transforment chaque action en progression collective tangible et célébrée.",
    bullets: [],
    bg: '#0d2b22',
    accent: '#3a6e8c',
    visual: () => (
      <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 30% 30%, rgba(58,110,140,.35), transparent 60%), radial-gradient(circle at 75% 70%, rgba(200,115,42,.28), transparent 55%), #0d2b22', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }}/>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 18, alignItems: 'center' }}>
          {[
            { e: '⚡', l: 'Quête', c: '#c8732a' },
            { e: '✓', l: 'Preuve', c: '#018262' },
            { e: '🌱', l: 'Contrib.', c: '#7fb069' },
            { e: '✦', l: 'Niveau', c: '#e6c068' },
            { e: '📊', l: 'Vadité', c: '#3a6e8c' },
            { e: '🫂', l: 'Guilde', c: '#b85e38' },
          ].map(t => (
            <div key={t.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.06)', border: `1px solid ${t.c}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: `0 0 24px ${t.c}33` }}>{t.e}</div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#e8f7f3aa' }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const FoundationsSection = () => (
  <Section id="foundations" eyebrow="Mais sur quoi ça repose ?"
    title={<>Quatre piliers pour <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>un nouveau futur.</span></>}
    sub="EVAD s'appuie sur quatre courants novateurs : une vision solarpunk, une boussole régénérative, une gouvernance écocratique, et une gamification au service de l'engagement.">
    <div style={{
      position: 'relative', left: '50%', right: '50%',
      marginLeft: '-50vw', marginRight: '-50vw', width: '100vw',
      padding: '0 32px',
    }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1440, margin: '0 auto' }}>
      {PILLARS.map((p, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={p.id} className="found-row" style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0,
            borderRadius: 24, overflow: 'hidden',
            border: '1px solid rgba(46,102,66,.1)',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(1,130,98,.06)',
            transition: 'transform .25s, box-shadow .25s',
            direction: reverse ? 'rtl' : 'ltr',
          }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(1,130,98,.12)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(1,130,98,.06)'; }}>
            <div style={{ background: p.bg, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'ltr', overflow: 'hidden' }}>
              <p.visual/>
            </div>
            <div style={{ padding: '22px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'ltr' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                <span style={{ width: 28, height: 1.5, background: p.accent }}/>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: p.accent }}>{p.eyebrow}</div>
              </div>
              <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.15, letterSpacing: '-.015em', color: '#0d2b22', margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: '#3d6b5a', margin: 0, marginBottom: 12, maxWidth: 520 }}>{p.pitch}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {p.bullets.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#0d2b22', fontWeight: 600 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.accent }}/>{b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
    </div>
    <style>{`
      @media (max-width: 880px) {
        .found-row { grid-template-columns: 1fr !important; direction: ltr !important; }
        .found-row > div:first-child { min-height: 220px !important; }
        .found-row > div:last-child { padding: 32px 28px !important; }
      }
    `}</style>
  </Section>
);

window.FoundationsSection = FoundationsSection;
