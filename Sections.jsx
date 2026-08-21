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
              <img loading="lazy" decoding="async" src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          )}
          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1, containerType: 'inline-size' }}>
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
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '13px 12px', borderRadius: 100, cursor: 'pointer',
                  fontFamily: "'Satoshi',sans-serif", fontSize: 'clamp(10px, 4.4cqi, 14px)', fontWeight: 700,
                  whiteSpace: 'nowrap',
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
                  <><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg> <span>Site personnalisé pour les {r.short.toLowerCase()}</span></>
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

const VADE_STEPS = [
  { L: 'V', name: 'Valoriser',  title: 'Valoriser le potentiel',        color: '#018262', desc: "Connaître la base : les ressources, les forces et les limites. Ce socle pose la Vadance, la promesse d'impact, ce que le projet s'engage à devenir." },
  { L: 'A', name: 'Activer',    title: 'Activer les solutions',         color: '#3a6e8c', desc: "Puiser dans la bibliothèque commune (low-tech, permaculture, gouvernance), générer fiche et tableau de bord. La promesse s'outille et se met en mouvement." },
  { L: 'D', name: 'Développer', title: "Développer l'écosystème",       color: '#c8732a', desc: 'Mettre les quêtes en ligne, mobiliser la communauté, sécuriser le financement et documenter chaque preuve. La Vadance se change en résultats mesurés sur le terrain.' },
  { L: 'E', name: 'Essaimer',   title: 'Essaimer preuves et pratiques', color: '#7a6ea8', desc: 'La promesse devient Vadité. Les apprentissages essaiment dans les communs et relancent la spirale un cran plus haut.' },
];

const ROLE_ROWS = [
  {
    id: 'pilote', emoji: '🏡', name: "Pilote d'impact", short: 'Pilote', color: '#018262', tint: '#dcefe7',
    cells: [
      "Diagnostiquer les ressources, les forces et les limites de votre lieu. Ce socle pose votre Vadance : la promesse d'impact que votre lieu s'engage à tenir.",
      "Puiser dans la bibliothèque commune (low-tech, permaculture, gouvernance), générer la fiche de votre lieu et son tableau de bord. Votre promesse s'outille.",
      "Publier vos quêtes, mobiliser les Bâtisseurs, sécuriser les financements des Semeurs, documenter chaque preuve sur le terrain.",
      "Votre Vadance devient Vadité : un score vérifié, lisible par les financeurs. Vos apprentissages rejoignent les communs et votre lieu repart un cran plus haut.",
    ],
  },
  {
    id: 'batisseur', emoji: '🌿', name: "Bâtisseur d'impact", short: 'Bâtisseur', color: '#c8732a', tint: '#fce8d8',
    cells: [
      "Identifier vos compétences, vos envies, ce que vous voulez apporter aux lieux qui vous entourent. Votre profil devient votre promesse de contribution.",
      "Explorer la bibliothèque, découvrir les solutions et les cartes compétences, vous former aux pratiques régénératives éprouvées.",
      "Entreprendre les missions des lieux, contribuer sur le terrain, créditer vos contributions, documenter vos réalisations.",
      "Vos contributions vérifiées construisent votre parcours. Transmettre, devenir référent, porter les pratiques vers d'autres lieux, et reprendre la spirale un cran plus haut.",
    ],
  },
  {
    id: 'semeur', emoji: '🌾', name: "Semeur d'impact", short: 'Semeur', color: '#3a6e8c', tint: '#e0eef6',
    cells: [
      "Lire la Vadance des lieux : une promesse d'impact structurée, comparable, adossée à des indicateurs, pas une plaquette.",
      "Flécher votre financement vers des solutions et des quêtes précises, avec une visibilité directe sur ce que votre apport déclenche.",
      "Suivre en continu les résultats mesurés sur le terrain : chaque preuve documentée alimente le tableau de bord de votre portefeuille de lieux.",
      "La Vadité consolide ce qui a été tenu. Comparer promesse et réalisation, capitaliser les enseignements, réinvestir un cran plus haut.",
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
        La spirale VADE, vécue par les trois rôles :
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
        {VADE_STEPS.map((s, i) => (
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

const VadeWheel = () => {
  const cx = 300, cy = 320;
  const DEG = Math.PI / 180;
  // Archimedean spiral: t = rotation from V (deg), clockwise; radius grows outward.
  // V is the tightest turn, then A, D, E open wider, and the run escapes at the top.
  const R_STOPS = [[0, 138], [90, 193], [180, 216], [270, 236], [360, 288]];
  const rAt = (t) => {
    for (let i = 0; i < R_STOPS.length - 1; i++) {
      const [t0, r0] = R_STOPS[i], [t1, r1] = R_STOPS[i + 1];
      if (t <= t1) return r0 + (r1 - r0) * (t - t0) / (t1 - t0);
    }
    return R_STOPS[R_STOPS.length - 1][1];
  };
  const ptAt = (t) => {
    const phi = (-90 + t) * DEG, r = rAt(t);
    return [cx + r * Math.cos(phi), cy + r * Math.sin(phi)];
  };
  const segPath = (t0, t1) => {
    let d = '';
    for (let t = t0; t <= t1 + 0.001; t += 3) {
      const [x, y] = ptAt(t);
      d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    return d;
  };
  // nodes sit on the spiral at V=0°, A=90°, D=180°, E=270°
  const nodePos = [0, 90, 180, 270].map(ptAt);
  const nameOff = [-54, -54, 60, 60]; // V & A above, D & E below
  // arrowhead at the spiral's outer end (t = 360°)
  const [ex, ey] = ptAt(360);
  const [bx, by] = ptAt(355);
  const ang = Math.atan2(ey - by, ex - bx), AH = 17, AW = 9;
  const perp = ang + Math.PI / 2;
  const arrow = [
    [ex, ey],
    [ex - Math.cos(ang) * AH + Math.cos(perp) * AW, ey - Math.sin(ang) * AH + Math.sin(perp) * AW],
    [ex - Math.cos(ang) * AH - Math.cos(perp) * AW, ey - Math.sin(ang) * AH - Math.sin(perp) * AW],
  ].map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const segs = [
    { d: segPath(0, 90),   c: '#018262' }, // V → A
    { d: segPath(90, 180), c: '#3a6e8c' }, // A → D
    { d: segPath(180, 270), c: '#c8732a' }, // D → E
    { d: segPath(270, 360), c: '#7a6ea8' }, // E → sortie
  ];
  return (
    <svg viewBox="10 -26 560 640" width="100%" height="100%" style={{ maxWidth: 560 }}>
      {/* the spiral itself, one growing turn V→A→D→E and a cran plus haut */}
      {segs.map((s, i) => (
        <path key={i} d={s.d} fill="none" stroke={s.c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      ))}
      <polygon points={arrow} fill="#7a6ea8"/>
      <text x={ex - 46} y="0" fontFamily="Satoshi" fontSize="14" fontWeight="700" fill="#018262" textAnchor="middle">un cran plus haut</text>

      {/* center label */}
      <circle cx={cx} cy={cy} r="92" fill="#f5fbf8" stroke="rgba(1,130,98,.15)" strokeWidth="1"/>
      <text x={cx} y={cy - 22} fontFamily="Satoshi" fontSize="12" fontWeight="700" letterSpacing="3.5" fill="#018262" textAnchor="middle">SPIRALE</text>
      <text x={cx} y={cy + 10} fontFamily="Satoshi" fontSize="34" fontWeight="900" fill="#0d2b22" textAnchor="middle">VADE</text>
      <g transform={`translate(${cx},${cy + 44})`}>
        {['🏡','🌿','🌾'].map((e, i) => (
          <g key={i} transform={`translate(${(i - 1) * 28},0)`}>
            <circle r="13" fill="#fff" stroke="rgba(1,130,98,.15)"/>
            <text y="5" fontSize="15" textAnchor="middle">{e}</text>
          </g>
        ))}
      </g>

      {/* nodes */}
      {VADE_STEPS.map((s, i) => {
        const [x, y] = nodePos[i];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="36" fill="#fff" stroke={s.color} strokeWidth="2.4"/>
            <text x={x} y={y + 11} fontFamily="Satoshi" fontSize="32" fontWeight="900" fill={s.color} textAnchor="middle">{s.L}</text>
            <text x={x} y={y + nameOff[i]} fontFamily="Satoshi" fontSize="15" fontWeight="700" fill="#0d2b22" textAnchor="middle">{s.name}</text>
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
    title={<>Spirale VADE, <span style={{ fontStyle: 'italic', fontWeight: 600, color: activeRow ? activeRow.color : '#018262' }}>{activeRow ? <>vécue en <span style={{ whiteSpace: 'nowrap' }}>{activeRow.name}</span>.</> : 'la spirale partagée.'}</span></>}
    sub={activeRow ? (
      <>Voici les quatre étapes telles que vous, <b style={{ color: activeRow.color }}>{activeRow.name}</b>, les traversez. La même spirale nourrit aussi les autres profils, la valeur circule.</>
    ) : (
      <>VADE est la spirale partagée par les <b style={{ color: '#0d2b22' }}>Pilotes</b>, les <b style={{ color: '#0d2b22' }}>Bâtisseurs</b> et les <b style={{ color: '#0d2b22' }}>Semeurs</b> : <b style={{ color: '#0d2b22' }}>V</b>aloriser, <b style={{ color: '#0d2b22' }}>A</b>ctiver, <b style={{ color: '#0d2b22' }}>D</b>évelopper, <b style={{ color: '#0d2b22' }}>E</b>ssaimer.</>
    )}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="regen-flow">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <VadeWheel/>
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
              ? <>Vue adaptée à votre profil <b style={{ color: activeRow.color, whiteSpace: 'nowrap' }}>{activeRow.name}</b>. La spirale reste la même, vos actions changent. <b style={{ color: activeRow.color }}>Vous êtes libre d'y entrer à n'importe quelle étape</b>, selon là où vous en êtes.</>
              : <>Une même spirale pour les trois profils : la valeur circule entre eux et nourrit l'écosystème. <b style={{ color: '#018262' }}>Pas besoin de commencer au début</b> : on entre dans la spirale à l'étape qui nous correspond.</>}
          </p>
        </div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {VADE_STEPS.map((s, i) => {
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
                {!activeRow && <p style={{ fontSize: 13, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{s.desc}</p>}
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
              <img loading="lazy" decoding="async" src={window.__resources.deva} alt="Deva" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
        <img loading="lazy" decoding="async" src={window.__resources.deva} alt="Deva" style={{ width: '70%', maxWidth: 260, position: 'relative', filter: 'drop-shadow(0 12px 32px rgba(46,102,66,.3))' }}/>
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
    <Section id="marketplace" eyebrow="Reconnaissance" title="Votre engagement est reconnu." sub="Ici, on n'achète rien : on ouvre des portes grâce à ce que l'on a apporté au commun. Ateliers, formations, nuits en écolieu, savoir-faire partagés par les lieux du réseau. La valeur reste sur le territoire.">
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
window.DevaSection = DevaSection;
window.MarketplaceSection = MarketplaceSection;
