// Landing, middle sections

const Roles = ({ onChoose, persona }) => (
  <Section id="roles" eyebrow="Pour commencer, quel est votre rôle ?" title={<>Chacun joue un rôle dans le passage <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>de l'imagination à l'action.</span></>} sub="L'écosystème EVAD relie ceux qui coordonnent un lieu, ceux qui contribuent par leurs mains, et ceux qui financent contre des preuves d'impact mesurables.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
      {Object.entries(ROLES).map(([id, r]) => {
        const isActive = persona === id;
        return (
        <div key={id} style={{
          background: '#fff', border: isActive ? '1.5px solid ' + r.accent : '1px solid rgba(46,102,66,.1)', borderRadius: 24,
          overflow: 'hidden', boxShadow: isActive ? '0 16px 40px ' + r.accent + '22' : '0 2px 16px rgba(1,130,98,.06)',
          display: 'flex', flexDirection: 'column',
          transition: 'transform .25s, box-shadow .25s',
        }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(1,130,98,.14)'; }}
           onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isActive ? '0 16px 40px ' + r.accent + '22' : '0 2px 16px rgba(1,130,98,.06)'; }}>
          {r.image && (
            <div style={{ height: 200, overflow: 'hidden', background: r.tint }}>
              <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          )}
          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div role="img" aria-label={r.name} style={{ width: 56, height: 56, borderRadius: 16, background: r.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{r.emoji}</div>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
                padding: '6px 12px', borderRadius: 100,
                background: r.tint, color: r.accent,
              }}>{r.short}</span>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: r.accent, marginBottom: 6 }}>{r.verb}</div>
              <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.15, color: '#0d2b22', margin: 0 }}>{r.name}</h3>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{r.desc}</p>
            {r.perks && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                {r.perks.map((perk, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, lineHeight: 1.45, color: '#0d2b22' }}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={r.accent} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1.5 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            )}
            {onChoose && (
              <button
                onClick={() => onChoose(isActive ? null : id)}
                aria-pressed={isActive}
                style={{
                  marginTop: 18, width: '100%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 18px', borderRadius: 100, cursor: 'pointer',
                  fontFamily: "'Satoshi',sans-serif", fontSize: 14, fontWeight: 700,
                  border: isActive ? '1.5px solid ' + r.accent : 'none',
                  background: isActive ? r.tint : r.accent,
                  color: isActive ? r.accent : '#fff',
                  boxShadow: isActive ? 'none' : '0 6px 18px ' + r.accent + '33',
                  transition: 'transform .15s, box-shadow .15s, background .15s',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 9px 24px ' + r.accent + '4d'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isActive ? 'none' : '0 6px 18px ' + r.accent + '33'; }}
              >
                {isActive ? (
                  <><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg> <span>Site personnalisé pour les {r.short.toLowerCase()}</span></>
                ) : (
                  <span>Personnaliser le site pour les {r.short.toLowerCase()}</span>
                )}
              </button>
            )}
          </div>
        </div>
        );
      })}
    </div>
    {onChoose && persona && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
        <button
          onClick={() => onChoose(null)}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 100, cursor: 'pointer',
            fontFamily: "'Satoshi',sans-serif", fontSize: 13.5, fontWeight: 700,
            background: 'transparent', border: '1.5px solid rgba(46,102,66,.22)', color: '#3d6b5a',
            transition: 'border-color .15s, color .15s, background .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#018262'; e.currentTarget.style.color = '#018262'; e.currentTarget.style.background = 'rgba(1,130,98,.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(46,102,66,.22)'; e.currentTarget.style.color = '#3d6b5a'; e.currentTarget.style.background = 'transparent'; }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9z"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>
          Revenir à la vue générale
        </button>
      </div>
    )}
  </Section>
);

const REGEN_STEPS = [
  { L: 'R', name: 'Rêver',       title: 'Rêver le monde de demain',           subtitle: 'avec Luanti',                  color: '#018262', desc: 'Prototyper des lieux solarpunk dans un jeu en ligne collaboratif. Inventer, construire, tester des scénarios, l\'imagination est la première brique.' },
  { L: 'E', name: 'Explorer',    title: 'Explorer les solutions',             subtitle: 'avec la Bibliothèque',         color: '#3a6e8c', desc: 'Puiser dans la bibliothèque commune et open source de fiches low-tech, permaculture, gouvernance, autonomie… afin d\'adapter les techniques éprouvées à son lieu.' },
  { L: 'G', name: 'Générer',     title: 'Générer les fiches et tableaux de bord', subtitle: 'fiches & cockpits',        color: '#c8732a', desc: 'Chaque profil génère sa fiche de présentation et son tableau de bord. La mesure est outillée, transparente, exportable.' },
  { L: 'E', name: 'Entreprendre',title: 'Entreprendre les quêtes',            subtitle: 'mise en ligne · financement',  color: '#016b52', desc: 'Mettre les quêtes en ligne, mobiliser sa communauté, sécuriser le financement, documenter les preuves, créditer les graines.' },
  { L: 'N', name: 'Nourrir',     title: "Nourrir l'écosystème",               subtitle: "retours d'expérience",         color: '#7a6ea8', desc: 'Récolter les apprentissages, affiner les fiches, améliorer les outils. Les retours remontent dans les communs et nourrissent le parcours suivant.' },
];

const ROLE_ROWS = [
  {
    id: 'pilote', emoji: '🏡', name: "Pilote d'impact", short: 'Pilote', color: '#018262', tint: '#dcefe7',
    cells: [
      'Modélise son lieu en voxel, teste des aménagements avant les travaux réels.',
      'Consulte les fiches solutions, choisit les modules adaptés à sa biorégion.',
      'Génère la fiche d\'impact de son lieu, configure ses indicateurs et son cockpit.',
      'Met les quêtes en ligne, anime la communauté, sécurise le financement, valide les preuves.',
      'Partage les apprentissages, ajuste sa stratégie, contribue aux communs.',
    ],
  },
  {
    id: 'batisseur', emoji: '🌿', name: "Bâtisseur d'impact", short: 'Bâtisseur', color: '#c8732a', tint: '#fce8d8',
    cells: [
      'Co-construit dans Luanti, explore des designs solarpunk avec la communauté.',
      'Apprend la permaculture, le biomimétisme, les techniques low-tech.',
      'Crée son tableau de bord personnel : graines, quêtes, coopétiteurs, biorégions.',
      'Accomplit les quêtes, documente les preuves, encaisse ses graines.',
      'Rédige des retours, vote au Conseil régénératif, propose des améliorations.',
    ],
  },
  {
    id: 'semeur', emoji: '🌾', name: "Semeur d'impact", short: 'Semeur', color: '#3a6e8c', tint: '#e0eef6',
    cells: [
      "Visualise les projets à financer en immersion 3D avant d'engager des fonds.",
      'Étudie les solutions éprouvées pour cibler des investissements à fort impact.',
      'Construit son rapport de portefeuille, agrège les preuves de ses dons et fonds.',
      "Abonde les pots, finance les modules, suit l'allocation en temps réel.",
      'Diffuse les preuves, fait essaimer les bonnes pratiques entre lieux soutenus.',
    ],
  },
];

const ParcoursMatrix = () => (
  <div style={{
    marginTop: 56, background: '#fff', border: '1px solid rgba(46,102,66,.12)',
    borderRadius: 28, padding: '40px 44px',
    boxShadow: '0 2px 16px rgba(1,130,98,.06)',
  }}>
    {/* Header */}
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#018262', marginBottom: 10 }}>Qui fait quoi ?</div>
      <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.2, color: '#0d2b22', margin: 0, marginBottom: 16 }}>
        La boucle REGEN, vécue par les trois rôles :
      </h3>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {ROLE_ROWS.map(r => (
          <span key={r.id} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
            background: r.tint, color: r.color, borderRadius: 100,
            fontSize: 14, fontWeight: 700,
          }}>
            <span style={{ fontSize: 16 }}>{r.emoji}</span>{r.short}
          </span>
        ))}
      </div>
    </div>

    {/* Matrix */}
    <div style={{ overflowX: 'auto' }} className="parcours-scroll">
      <div style={{ minWidth: 920, display: 'grid', gridTemplateColumns: '.7fr repeat(5, 1fr)', gap: 10 }}>
        {/* corner */}
        <div/>
        {/* step headers */}
        {REGEN_STEPS.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
            background: '#fff', borderRadius: 14, border: '1px solid rgba(46,102,66,.08)',
          }}>
            <span style={{
              width: 30, height: 30, borderRadius: 8, background: s.color, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 16,
            }}>{s.L}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0d2b22' }}>{s.name}</span>
          </div>
        ))}

        {/* rows */}
        {ROLE_ROWS.map(r => (
          <React.Fragment key={r.id}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
              gap: 6, padding: '14px 16px', background: r.tint, borderRadius: 14,
            }}>
              <span style={{ fontSize: 22 }}>{r.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: r.color, lineHeight: 1.25 }}>{r.name}</span>
            </div>
            {r.cells.map((c, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 14, border: '1px solid rgba(46,102,66,.08)',
                borderLeft: '3px solid ' + r.color,
                padding: '16px 18px',
                fontSize: 13, lineHeight: 1.5, color: '#3d6b5a',
              }}>{c}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* footer note */}
    <div style={{
      marginTop: 22, padding: '16px 20px',
      background: '#fff', borderRadius: 14, border: '1px solid rgba(46,102,66,.1)', borderLeft: '3px solid #018262',
      display: 'flex', alignItems: 'flex-start', gap: 14,
    }}>
      <span style={{ fontSize: 20, color: '#018262' }}>⟲</span>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>
        Le même parcours pour les trois rôles. Personne ne capte la valeur seul : elle circule, elle nourrit le lieu, elle revient, et l'écosystème apprend.
      </p>
    </div>
  </div>
);

const RegenWheel = () => {
  const R = 140;
  const cx = 200, cy = 200;
  // 5 evenly distributed positions starting at top
  const pts = REGEN_STEPS.map((_, i) => {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, a };
  });
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: 560 }}>
      {/* arrow paths between consecutive points */}
      {pts.map((p, i) => {
        const next = pts[(i + 1) % pts.length];
        // curve outwards a bit
        const mx = (p.x + next.x) / 2;
        const my = (p.y + next.y) / 2;
        const dx = mx - cx, dy = my - cy;
        const len = Math.hypot(dx, dy) || 1;
        const k = 30;
        const c1x = mx + (dx / len) * k, c1y = my + (dy / len) * k;
        // shorten endpoints to clear circles
        const ang = Math.atan2(next.y - p.y, next.x - p.x);
        const r0 = 32;
        const sx = p.x + Math.cos(ang) * r0;
        const sy = p.y + Math.sin(ang) * r0;
        const ex = next.x - Math.cos(ang) * r0;
        const ey = next.y - Math.sin(ang) * r0;
        return (
          <g key={i}>
            <path d={`M${sx},${sy} Q${c1x},${c1y} ${ex},${ey}`} fill="none" stroke="#7ec9b0" strokeWidth="1.6" opacity=".75"/>
            {/* arrow head */}
            <polygon points={`${ex},${ey} ${ex - Math.cos(ang - 0.4) * 7},${ey - Math.sin(ang - 0.4) * 7} ${ex - Math.cos(ang + 0.4) * 7},${ey - Math.sin(ang + 0.4) * 7}`} fill="#7ec9b0"/>
          </g>
        );
      })}
      {/* center label */}
      <circle cx={cx} cy={cy} r="68" fill="#f5fbf8" stroke="rgba(1,130,98,.15)" strokeWidth="1"/>
      <text x={cx} y={cy - 14} fontFamily="Satoshi" fontSize="9" fontWeight="700" letterSpacing="2.5" fill="#018262" textAnchor="middle">BOUCLE</text>
      <text x={cx} y={cy + 6} fontFamily="Satoshi" fontSize="22" fontWeight="900" fill="#0d2b22" textAnchor="middle">REGEN</text>
      <g transform={`translate(${cx},${cy + 30})`}>
        {['🏡','🌿','🌾'].map((e, i) => (
          <g key={i} transform={`translate(${(i - 1) * 22},0)`}>
            <circle r="10" fill="#fff" stroke="rgba(1,130,98,.15)"/>
            <text y="4" fontSize="12" textAnchor="middle">{e}</text>
          </g>
        ))}
      </g>
      {/* nodes */}
      {pts.map((p, i) => {
        const s = REGEN_STEPS[i];
        return (
          <g key={i} transform={`translate(${p.x},${p.y})`}>
            <circle r="30" fill="#fff" stroke={s.color} strokeWidth="2"/>
            <text y="9" fontFamily="Satoshi" fontSize="26" fontWeight="900" fill={s.color} textAnchor="middle">{s.L}</text>
            <text y={p.y > cy ? 52 : -38} fontFamily="Satoshi" fontSize="12" fontWeight="700" fill="#0d2b22" textAnchor="middle">{s.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Cycle = ({ role, onChoose }) => {
  const activeRow = role && ROLE_ROWS.find(r => r.id === role);
  return (
  <Section id="cycle" eyebrow="Et comment ça fonctionne ?"
    title={<>La Boucle REGEN, <span style={{ fontStyle: 'italic', fontWeight: 600, color: activeRow ? activeRow.color : '#018262' }}>{activeRow ? <>vécue en <span style={{ whiteSpace: 'nowrap' }}>{activeRow.name}</span>.</> : 'une boucle partagée.'}</span></>}
    sub={activeRow ? (
      <>Voici les cinq étapes telles que vous, <b style={{ color: activeRow.color }}>{activeRow.name}</b>, les traversez. La même boucle nourrit aussi les autres profils, la valeur circule.</>
    ) : (
      <>REGEN est la boucle partagée par les <b style={{ color: '#0d2b22' }}>Pilotes</b>, les <b style={{ color: '#0d2b22' }}>Bâtisseurs</b> et les <b style={{ color: '#0d2b22' }}>Semeurs</b>. Cinq étapes pour passer de l'imagination à la régénération.</>
    )}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="regen-flow">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <RegenWheel/>
        <div style={{
          padding: '16px 20px',
          background: '#fff', borderRadius: 16, border: '1px solid rgba(46,102,66,.1)',
          borderLeft: '3px solid ' + (activeRow ? activeRow.color : '#018262'),
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 2px 16px rgba(1,130,98,.05)',
          maxWidth: 380,
        }}>
          <span style={{ fontSize: 20, color: activeRow ? activeRow.color : '#018262', flexShrink: 0 }}>{activeRow ? activeRow.emoji : '⟲'}</span>
          <p style={{ fontSize: 14, lineHeight: 1.5, color: '#3d6b5a', margin: 0 }}>
            {activeRow
              ? <>Vue adaptée à votre profil <b style={{ color: activeRow.color, whiteSpace: 'nowrap' }}>{activeRow.name}</b>. La boucle reste la même, vos actions changent. <b style={{ color: activeRow.color }}>Vous êtes libre d'y entrer à n'importe quelle étape</b>, selon là où vous en êtes.</>
              : <>Une même boucle pour les trois profils : la valeur circule entre eux et nourrit l'écosystème. <b style={{ color: '#018262' }}>Pas besoin de commencer au début</b> : on entre dans la boucle à l'étape qui nous correspond.</>}
          </p>
        </div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {REGEN_STEPS.map((s, i) => {
          const myCell = activeRow ? activeRow.cells[i] : null;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'flex-start',
              background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderRadius: 18,
              padding: '18px 22px',
              boxShadow: activeRow ? '0 6px 18px rgba(1,130,98,.08)' : '0 1px 6px rgba(1,130,98,.04)',
              transition: 'transform .2s, box-shadow .2s',
              borderLeft: activeRow ? '3px solid ' + activeRow.color : '1px solid rgba(46,102,66,.1)',
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(1,130,98,.1)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = activeRow ? '0 6px 18px rgba(1,130,98,.08)' : '0 1px 6px rgba(1,130,98,.04)'; }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                border: '2px solid ' + s.color, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 26,
              }}>{s.L}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 17, color: '#0d2b22' }}>{s.title}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{s.desc}</p>
                {myCell && (
                  <div style={{
                    marginTop: 12, padding: '12px 14px',
                    background: activeRow.tint,
                    borderRadius: 12,
                    border: '1px solid ' + activeRow.color + '33',
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: 8,
                      background: '#fff', color: activeRow.color,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, flexShrink: 0,
                      boxShadow: '0 1px 4px ' + activeRow.color + '22',
                    }}>→</span>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: '#0d2b22', margin: 0, fontWeight: 500 }}>{myCell}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <style>{`@media (max-width: 980px) { .regen-flow { grid-template-columns: 1fr !important; } }`}</style>
  </Section>
  );
};

const RegenSection = () => (
  <Section id="regen" dark eyebrow="Score REGEN" title="Quatre dimensions, une seule trajectoire.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="regen-grid">
      <div>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#cfeee7', opacity: .85, marginBottom: 28 }}>
          Chaque lieu mesure son impact sur quatre axes. Pas de greenwashing : seules les preuves vérifiées par le Conseil Régénératif font monter le score.
        </p>
        <div>
          {[
            ['Écologie', 78, '#4aab8f', 'biodiversité, sols, énergie, eau'],
            ['Social', 64, '#c8732a', 'accueil, inclusion, transmission'],
            ['Gouvernance', 52, '#7a6ea8', 'transparence, prise de décision'],
            ['Économie', 71, '#f0c84a', 'résilience, circuits courts, mutualisation'],
          ].map(([l, v, c, sub]) => (
            <div key={l} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#e8f7f3' }}>{l} <span style={{ opacity: .55, fontWeight: 400, fontSize: 12 }}>· {sub}</span></span>
                <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 22, color: c, fontFeatureSettings: "'tnum' 1" }}>{v}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(207,238,231,.1)', borderRadius: 100, overflow: 'hidden' }}>
                <div className="regen-bar" style={{ width: v + '%', height: '100%', background: c, borderRadius: 100, transition: 'width 1.2s cubic-bezier(.4,0,.2,1)' }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #016b52 0%, #018262 100%)',
        border: '1px solid rgba(207,238,231,.15)', borderRadius: 28, padding: 36,
        boxShadow: '0 24px 60px rgba(0,0,0,.3)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,201,176,.3), transparent 70%)' }}/>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 14, position: 'relative' }}>Ferme du Champ Vert</div>
        <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 96, lineHeight: 1, color: '#e8f7f3', fontFeatureSettings: "'tnum' 1", position: 'relative' }}>
          78<span style={{ fontSize: 36, opacity: .55, fontWeight: 600 }}>/100</span>
        </div>
        <div style={{ fontSize: 13, color: '#cfeee7', opacity: .75, marginTop: 8, position: 'relative' }}>+12 points sur les 6 derniers mois</div>
        <div style={{ marginTop: 24, padding: '14px 16px', background: 'rgba(13,43,34,.4)', border: '1px solid rgba(126,201,176,.2)', borderRadius: 12, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#7ec9b0', letterSpacing: '.1em' }}>✓ DERNIÈRE PREUVE</span>
            <span style={{ fontSize: 10, color: '#cfeee7', opacity: .55, marginLeft: 'auto' }}>il y a 3 jours</span>
          </div>
          <div style={{ fontSize: 13, color: '#e8f7f3' }}>Inventaire mare : 14 espèces recensées, +3 vs. 2025.</div>
        </div>
      </div>
    </div>
    <style>{`@media (max-width: 880px) { .regen-grid { grid-template-columns: 1fr !important; } }`}</style>
  </Section>
);

const DevaSection = () => (
  <Section id="deva" eyebrow="Enfin, qui vous accompagne ?" title={<>Deva accompagne, <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>vous prenez les décisions.</span></>}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 56, alignItems: 'center' }} className="deva-grid">
      <div>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#3d6b5a', marginBottom: 28 }}>
          Deva est l'esprit régénératif de l'écosystème. Il suggère des quêtes adaptées à votre lieu, repère les preuves manquantes, propose des solutions issues de la bibliothèque.
        </p>
        <div style={{
          position: 'relative',
          background: 'linear-gradient(160deg, #0d2b22 0%, #013b2d 100%)',
          border: '1px solid rgba(126,201,176,.18)', borderRadius: 20,
          padding: 22, marginBottom: 16,
          boxShadow: '0 20px 50px rgba(13,43,34,.25)',
        }}>
          {/* Speech bubble tail toward Deva avatar */}
          <span aria-hidden="true" style={{
            position: 'absolute', top: 44, right: -9,
            width: 18, height: 18,
            background: '#013b2d',
            borderTop: '1px solid rgba(126,201,176,.18)',
            borderRight: '1px solid rgba(126,201,176,.18)',
            transform: 'rotate(45deg)',
          }}/>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, overflow: 'hidden',
              background: 'rgba(126,201,176,.12)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={window.__resources.deva} alt="Deva" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 17, color: '#e8f7f3' }}>Deva</div>
              <div style={{ fontSize: 12, color: '#7ec9b0', opacity: .85 }}>IA frugale · Écosystème EVAD</div>
            </div>
            <button style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(207,238,231,.08)', border: 'none', color: '#cfeee7',
              fontSize: 16, cursor: 'pointer', flexShrink: 0,
            }}>×</button>
          </div>

          {/* Deva message */}
          <div style={{
            background: 'rgba(126,201,176,.06)',
            border: '1px solid rgba(126,201,176,.18)', borderRadius: 14,
            padding: '14px 16px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', color: '#7ec9b0', marginBottom: 6 }}>✦ DEVA</div>
            <p style={{ fontSize: 14, color: '#e8f7f3', margin: 0, lineHeight: 1.5 }}>
              Bonjour 🌿 Je suis Deva, votre compagnon régénératif dans l'écosystème EVAD. Que puis-je faire pour vous aujourd'hui ?
            </p>
          </div>

          {/* Input bar */}
          <div
            onClick={() => window.dispatchEvent(new CustomEvent('deva:open'))}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.dispatchEvent(new CustomEvent('deva:open')); } }}
            aria-label="Ouvrir la conversation avec Deva"
            style={{
            display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer',
            background: 'rgba(13,43,34,.6)', border: '1px solid rgba(126,201,176,.2)',
            borderRadius: 14, padding: 6,
          }}>
            <input type="text" placeholder="Demandez à Deva…" readOnly
              onFocus={() => window.dispatchEvent(new CustomEvent('deva:open'))}
              style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              padding: '10px 14px', color: '#e8f7f3', fontFamily: "'Satoshi',sans-serif", fontSize: 14,
              cursor: 'pointer',
            }}/>
            <button type="button" style={{
              width: 40, height: 40, borderRadius: 10, background: '#4aab8f',
              border: 'none', color: '#0d2b22', fontSize: 18, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }} aria-label="Envoyer">↑</button>
          </div>
        </div>
        <style>{`.deva-grid input::placeholder { color: rgba(207,238,231,.45); }`}</style>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['📚', 'Suggère des solutions'], ['⚡', 'Génère des quêtes'],
            ['✓', 'Vérifie les preuves'],   ['🤲', 'Met en relation'],
          ].map(([e, t]) => (
            <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: '#3d6b5a' }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: '#cfeee7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{e}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: 'relative', textAlign: 'center', padding: 32 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(126,201,176,.25) 0%, transparent 60%)' }}/>
        <img src={window.__resources.deva} alt="Deva" style={{ width: '70%', maxWidth: 260, position: 'relative', filter: 'drop-shadow(0 12px 32px rgba(46,102,66,.3))' }}/>
      </div>
    </div>
    <style>{`@media (max-width: 880px) { .deva-grid { grid-template-columns: 1fr !important; } }`}</style>
  </Section>
);

const MarketplaceSection = () => {
  const items = [
    { e: '🌾', t: 'Permaculture · 2 jours', l: 'Ferme du Champ Vert · Drôme', p: '120 G', g: 'linear-gradient(135deg,#4aab8f,#016b52)', b: 'new' },
    { e: '🛖', t: 'Yourte 4 places',         l: 'Tiers-lieu Les Possibles', p: '85 G',  g: 'linear-gradient(135deg,#c8732a,#a85e20)', b: 'promo' },
    { e: '🧱', t: 'Construction terre crue', l: 'Écolieu La Source',         p: '450 G', g: 'linear-gradient(135deg,#7a6ea8,#3a6e8c)', b: 'premium' },
  ];
  const bcols = { new: '#4aab8f', promo: '#c8732a', premium: 'linear-gradient(135deg,#7a6ea8,#3a6e8c)' };
  return (
    <Section id="marketplace" eyebrow="Marketplace" title="Une économie en graines, pas en euros." sub="Les contributions deviennent des graines. Les graines deviennent des ateliers, des nuits en yourte, des formations. Une circulation locale, sans extraction.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {items.map(m => (
          <div key={m.t} style={{ background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderRadius: 28, overflow: 'hidden', boxShadow: '0 2px 16px rgba(1,130,98,.08)' }}>
            <div style={{ height: 140, background: m.g, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative' }}>
              {m.e}
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '.06em', textTransform: 'uppercase', background: bcols[m.b], color: '#fff' }}>{m.b}</span>
            </div>
            <div style={{ padding: '18px 20px' }}>
              <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 17, color: '#0d2b22', marginBottom: 4 }}>{m.t}</div>
              <div style={{ fontSize: 12, color: '#016b52', opacity: .7, marginBottom: 14 }}>{m.l}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 22, color: '#c8732a' }}>{m.p}</span>
                <button style={{ padding: '8px 14px', background: '#018262', color: '#e8f7f3', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Acheter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

window.Roles = Roles;
window.Cycle = Cycle;
window.RegenSection = RegenSection;
window.DevaSection = DevaSection;
window.MarketplaceSection = MarketplaceSection;
