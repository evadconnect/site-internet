// Landing, Association EVAD Connect

// ─── Equipe / Team ───
// REPLACE these placeholder names with real ones.
const TEAM_GROUPS = [
  {
    id: 'bureau',
    label: 'Bureau',
    role: 'Pilotage stratégique',
    desc: "Définit les orientations, vote les budgets, veille au respect de l'objet social.",
    accent: '#018262',
    tint: '#dcefe7',
    members: [
      { name: 'Romain Marie Froment', role: 'Président',  photo: window.__resources.teamRomain, photoPos: 'center 30%',    linkedin: 'https://www.linkedin.com/in/romain-mf/', email: 'romain.mf@evad.org', message: "Depuis le premier jour, je porte une conviction : on change le monde en faisant, pas en attendant. EVAD, c'est notre terrain de jeu pour imaginer et bâtir le monde de demain, ensemble." },
      { name: 'Arnaud Duvigneau',     role: 'Trésorier',  photo: window.__resources.teamArnaud,    linkedin: 'https://www.linkedin.com/in/arnaud-duvigneau-631492186/', message: "Je veille à ce que chaque euro serve un impact réel. La transparence, c'est la première graine de la confiance." },
      { name: 'Alexandre Letellier',  role: 'Secrétaire', photo: window.__resources.teamAlexandre, linkedin: 'https://www.linkedin.com/in/alexandre-letellier-38448173/', message: "Mon rôle, c'est de garder le cap collectif et de fluidifier nos décisions. Une association bien tenue, c'est une association qui dure." },
    ],
  },
  {
    id: 'compagnons',
    label: "Équipe",
    role: 'Tech & partenariats',
    desc: "Font vivre les outils, l'infrastructure et les partenariats au service de l'écosystème.",
    accent: '#3a6e8c',
    tint: '#e0eef6',
    members: [
      { name: 'Alexandra Cofano', role: 'Partenariats',         photo: window.__resources.teamAlexandra, linkedin: 'https://www.linkedin.com/in/alexandra-cofano-3784107/', email: 'alexandra.cofano@evad.org', message: "Je tisse les liens entre EVAD et celles et ceux qui partagent nos valeurs et conviction. C'est grâce à la confiance et l’audace collective que naissent les plus belles réussites." },
      { name: 'Pierre Gaignet',  role: 'Réseau & maintenance', photo: window.__resources.teamPierre,    linkedin: 'https://www.linkedin.com/in/pierre-gaignet/', message: "Je m'assure que les outils tournent et que le réseau tienne. La sobriété technique, c'est aussi de l'écologie." },
      { name: 'Ismail Belqi',    role: 'IA & data',            photo: window.__resources.teamIsmail,    linkedin: 'https://www.linkedin.com/in/ismail-belqi-1662b5156/', message: "Je mets l'IA et la donnée au service du vivant, pas l'inverse : frugales, utiles, au plus près du terrain." },
      { name: 'Jonas Chaurial',  role: 'Communication',        photo: window.__resources.teamJonas,     linkedin: 'https://www.linkedin.com/in/jonas-chaurial/', message: "Je raconte EVAD pour donner envie d'agir. Les belles histoires sont celles qu'on écrit à plusieurs." },
    ],
  },
  {
    id: 'conseil',
    label: 'Conseil Régénératif',
    role: 'Chercheur·es et expert·es',
    desc: "Apporte un regard scientifique et expert sur les outils et les méthodes, pour rester à la hauteur des enjeux.",
    accent: '#7a6ea8',
    tint: '#e5e0f0',
    members: [
      { name: 'Bénédicte Fumey', role: 'Économie régénérative', photo: window.__resources.teamBenedicte, linkedin: 'https://www.linkedin.com/in/benedictefumey/', message: "J'apporte la rigueur de l'économie régénérative pour que l'impact ne soit jamais un slogan, mais une mesure." },
      { name: 'Charles Judes',   role: 'Perma-comptabilité',   photo: window.__resources.teamCharles,   linkedin: 'https://www.linkedin.com/in/charles-judes/', message: "La perma-comptabilité, c'est compter ce qui compte vraiment : le vivant, et pas seulement l'argent." },
    ],
    link: { href: 'https://compte.evad.org/apps/forms/s/3YxDgfMCdPGf8gPyN7bmdM4w', label: 'Rejoindre le Conseil', primary: true, external: true },
  },
  {
    id: 'membres',
    label: 'Membres',
    role: 'Communauté engagée',
    desc: "Personnes qui adhèrent à l'association, votent en assemblée générale et co-construisent l'écosystème.",
    accent: '#c8732a',
    tint: '#fce8d8',
    bigCount: '10+',
    bigCountLabel: 'membres',
    message: "Nous sommes citoyennes et citoyens des quatre coins de France, réunis par une même envie : agir concrètement pour le vivant. Chacun apporte sa pierre, et ensemble nous faisons grandir EVAD.",
    faces: [
      window.__resources.member1, window.__resources.member2, window.__resources.member3, window.__resources.member4,
      window.__resources.member5, window.__resources.member6, window.__resources.member7, window.__resources.member8,
    ],
    link: { href: 'https://www.helloasso.com/associations/evad-connect/adhesions/devenir-membre-2026', label: 'Devenir membre', primary: true, external: true },
  },
];

const getInitials = (name) => {
  if (!name) return '';
  return name.split(/\s+/).filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();
};

const Avatar = ({ name, photo, photoPos, color, tint, size = 36, ring = true }) => (
  <div title={name} style={{
    width: size, height: size, borderRadius: '50%',
    background: tint, color,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Satoshi', sans-serif",
    fontWeight: 700, fontSize: size * 0.36,
    border: ring ? `2px solid #fff` : 'none',
    boxShadow: '0 2px 6px rgba(13,43,34,.08)',
    flexShrink: 0, overflow: 'hidden',
  }}>
    {photo ? (
      <img
        src={photo}
        alt={name}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: photoPos || 'center', display: 'block' }}
      />
    ) : (
      getInitials(name)
    )}
  </div>
);

const TeamCard = ({ group }) => {
  const isMembres = group.id === 'membres';
  const visibleMembers = group.members ? group.members.slice(0, 5) : [];
  const extra = group.members ? Math.max(0, group.members.length - 5) : 0;
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderRadius: 22,
      padding: 0, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(1,130,98,.06)',
      transition: 'transform .25s, box-shadow .25s',
    }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(1,130,98,.12)'; }}
       onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(1,130,98,.06)'; }}>
      <div style={{ height: 4, background: group.accent }}/>
      <div style={{ padding: '24px 26px 22px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: group.accent, marginBottom: 8 }}>{group.role}</div>
            <h4 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.15, color: '#0d2b22', margin: 0 }}>{group.label}</h4>
          </div>
          <span style={{
            fontFamily: "'Satoshi',sans-serif",
            fontWeight: 900, fontSize: isMembres ? 36 : 22,
            color: group.accent, fontFeatureSettings: "'tnum' 1",
            lineHeight: 1, whiteSpace: 'nowrap',
          }}>{isMembres ? group.bigCount : (group.members ? group.members.length : '')}</span>
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{group.desc}</p>

        {/* Stack of avatars removed, names appear in the list below */}

        {isMembres && (
          <a
            href="https://www.helloasso.com/associations/evad-connect/adhesions/devenir-membre-2026"
            target="_blank"
            rel="noopener"
            style={{
              background: group.tint,
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background .15s, transform .15s, box-shadow .15s',
              border: '1px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(200,115,42,.18)'; e.currentTarget.style.borderColor = group.accent + '55'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <span aria-hidden="true" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: '50%',
              background: '#fff', color: group.accent,
              fontSize: 18,
              boxShadow: '0 2px 6px rgba(200,115,42,.18)',
              flexShrink: 0,
            }}>🗺</span>
            <span style={{ fontSize: 13, color: '#0d2b22', fontWeight: 500, lineHeight: 1.45, flex: 1 }}>
              {group.bigCountLabel} partout en France
            </span>
            <span aria-hidden="true" style={{ color: group.accent, fontSize: 14, fontWeight: 700, flexShrink: 0 }}>→</span>
          </a>
        )}

        {/* Roles list (named members) */}
        {!isMembres && group.members && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {group.members.map((m, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '4px 0',
              }}>
                <Avatar name={m.name} photo={m.photo} photoPos={m.photoPos} color={group.accent} tint={group.tint} size={32} ring={false}/>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#0d2b22', fontWeight: 600, fontSize: 13, lineHeight: 1.25 }}>{m.name}</span>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener"
                        aria-label={`LinkedIn de ${m.name}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 20, height: 20, borderRadius: 5,
                          color: group.accent, background: 'transparent',
                          textDecoration: 'none', flexShrink: 0,
                          transition: 'background .15s, color .15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = group.accent + '22'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                        </svg>
                      </a>
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        aria-label={`Email de ${m.name}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 20, height: 20, borderRadius: 5,
                          color: group.accent, background: 'transparent',
                          textDecoration: 'none', flexShrink: 0,
                          transition: 'background .15s, color .15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = group.accent + '22'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="5" width="18" height="14" rx="2"/>
                          <path d="m3 7 9 6 9-6"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  <span style={{ color: group.accent, fontSize: 12, fontWeight: 500, lineHeight: 1.3, marginTop: 2 }}>{m.role}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Optional CTA link, internal anchor (default) or external action (primary) */}
        {group.link && group.link.external && (
          <a
            href={group.link.href}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
              marginTop: 4,
              padding: '11px 18px', borderRadius: 100,
              background: group.accent,
              color: '#fff',
              fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 700,
              border: 'none',
              textDecoration: 'none', cursor: 'pointer',
              boxShadow: `0 8px 20px ${group.accent}40`,
              transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 12px 26px ${group.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 20px ${group.accent}40`; }}
          >
            {group.link.label} <span style={{ fontSize: 14 }}>→</span>
          </a>
        )}
        {group.link && !group.link.external && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(group.link.agirId);
              if (!el) return;
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              el.classList.remove('agir-pulse');
              void el.offsetWidth;
              el.classList.add('agir-pulse');
            }}
            style={{
              display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 6,
              marginTop: 4,
              padding: '8px 14px', borderRadius: 100,
              background: group.accent + '14',
              color: group.accent,
              fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700,
              border: `1px solid ${group.accent}33`,
              textDecoration: 'none', cursor: 'pointer',
              transition: 'background .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = group.accent + '24'; }}
            onMouseLeave={e => { e.currentTarget.style.background = group.accent + '14'; }}
          >
            {group.link.label} <span style={{ fontSize: 14 }}>↓</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Member tile (people gallery item) ───
const MemberTile = ({ m, accent, tint }) => {
  const [open, setOpen] = React.useState(false);
  const expandable = !!m.message;
  return (
    <div
      onClick={expandable ? () => setOpen(o => !o) : undefined}
      role={expandable ? 'button' : undefined}
      tabIndex={expandable ? 0 : undefined}
      aria-expanded={expandable ? open : undefined}
      onKeyDown={expandable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); } } : undefined}
      style={{
        background: '#fff', border: `1px solid ${open ? accent + '55' : 'rgba(46,102,66,.1)'}`, borderRadius: 16,
        padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 0,
        boxShadow: open ? `0 12px 26px ${accent}1f` : '0 1px 8px rgba(1,130,98,.05)',
        cursor: expandable ? 'pointer' : 'default',
        transition: 'transform .2s, box-shadow .2s, border-color .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 26px ${accent}1f`; e.currentTarget.style.borderColor = accent + '44'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; if (!open) { e.currentTarget.style.boxShadow = '0 1px 8px rgba(1,130,98,.05)'; e.currentTarget.style.borderColor = 'rgba(46,102,66,.1)'; } }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <Avatar name={m.name} photo={m.photo} photoPos={m.photoPos} color={accent} tint={tint} size={48} ring={false}/>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1, gap: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ color: '#0d2b22', fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>{m.name}</span>
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener"
                aria-label={`LinkedIn de ${m.name}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, borderRadius: 5,
                  color: accent, background: 'transparent',
                  textDecoration: 'none', flexShrink: 0,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = accent + '22'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
              </a>
            )}
            {m.email && (
              <a
                href={`mailto:${m.email}`}
                aria-label={`Email de ${m.name}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, borderRadius: 5,
                  color: accent, background: 'transparent',
                  textDecoration: 'none', flexShrink: 0,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = accent + '22'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="m3 7 9 6 9-6"/>
                </svg>
              </a>
            )}
          </div>
          <span style={{ color: accent, fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{m.role}</span>
        </div>
        {expandable && (
          <span aria-hidden="true" style={{
            flexShrink: 0, color: accent, fontSize: 11,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22, borderRadius: '50%', background: accent + '14',
            transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s',
          }}>▾</span>
        )}
      </div>
      {expandable && (
        <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .3s ease' }}>
          <div style={{ overflow: 'hidden' }}>
            <blockquote style={{
              margin: '12px 0 2px', padding: '12px 14px',
              background: tint, borderLeft: `3px solid ${accent}`, borderRadius: 10,
              color: '#234b3e', fontSize: 13, lineHeight: 1.55, fontStyle: 'italic',
            }}>
              <span aria-hidden="true" style={{ color: accent, fontWeight: 800, marginRight: 4 }}>“</span>
              {m.message}
              <span style={{
                display: 'block', marginTop: 8, fontStyle: 'normal', fontWeight: 700,
                fontSize: 11.5, letterSpacing: '.02em', color: accent,
              }}>{m.name}</span>
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Directory band (one group = one horizontal band) ───
const TeamBand = ({ group, last }) => {
  const isMembres = group.id === 'membres';
  const [membersOpen, setMembersOpen] = React.useState(false);
  return (
    <div className="team-band" style={{
      display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40,
      padding: '32px 0',
      borderBottom: last ? 'none' : '1px solid rgba(46,102,66,.1)',
    }}>
      {/* ── Identity column ── */}
      <div className="team-band-id" style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: `3px solid ${group.accent}`, paddingLeft: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: group.accent }}>{group.role}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h4 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.1, color: '#0d2b22', margin: 0 }}>{group.label}</h4>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: group.tint, color: group.accent,
            fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 12,
            padding: '3px 10px', borderRadius: 100, lineHeight: 1,
          }}>{isMembres ? `${group.bigCount} pers.` : `${group.members ? group.members.length : 0} pers.`}</span>
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{group.desc}</p>
        {group.link && (
          <a
            href={group.link.href}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
              marginTop: 2,
              padding: '10px 17px', borderRadius: 100,
              background: group.accent, color: '#fff',
              fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 700,
              border: 'none', textDecoration: 'none', cursor: 'pointer',
              boxShadow: `0 8px 20px ${group.accent}40`,
              transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 12px 26px ${group.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 20px ${group.accent}40`; }}
          >
            {group.link.label} <span style={{ fontSize: 14 }}>→</span>
          </a>
        )}
      </div>

      {/* ── People / content column ── */}
      {isMembres ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            onClick={group.message ? () => setMembersOpen(o => !o) : undefined}
            role={group.message ? 'button' : undefined}
            tabIndex={group.message ? 0 : undefined}
            aria-expanded={group.message ? membersOpen : undefined}
            onKeyDown={group.message ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMembersOpen(o => !o); } } : undefined}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignContent: 'start', cursor: group.message ? 'pointer' : 'default' }}>
            {group.faces.map((src, i) => (
              <img key={i} src={src} alt="" style={{
                width: 66, height: 66, borderRadius: '50%', objectFit: 'cover',
                border: '2px solid #fff', boxShadow: '0 2px 10px rgba(13,43,34,.14)',
                background: group.tint,
              }}/>
            ))}
            <div style={{
              width: 66, height: 66, borderRadius: '50%',
              background: group.tint, color: group.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 16,
              border: '2px solid #fff', boxShadow: '0 2px 10px rgba(13,43,34,.10)',
            }}>…</div>
          </div>
          {group.message && (
            <>
              <button
                type="button"
                onClick={() => setMembersOpen(o => !o)}
                aria-expanded={membersOpen}
                style={{
                  display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 100,
                  background: group.accent + '14', color: group.accent,
                  fontFamily: "'Satoshi', sans-serif", fontSize: 12, fontWeight: 700,
                  border: `1px solid ${group.accent}33`, cursor: 'pointer',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = group.accent + '24'; }}
                onMouseLeave={e => { e.currentTarget.style.background = group.accent + '14'; }}
              >
                Le mot des membres
                <span aria-hidden="true" style={{ fontSize: 11, transform: membersOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>▾</span>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: membersOpen ? '1fr' : '0fr', transition: 'grid-template-rows .3s ease' }}>
                <div style={{ overflow: 'hidden' }}>
                  <blockquote style={{
                    margin: 0, padding: '14px 16px', maxWidth: 560,
                    background: group.tint, borderLeft: `3px solid ${group.accent}`, borderRadius: 10,
                    color: '#234b3e', fontSize: 13.5, lineHeight: 1.6, fontStyle: 'italic',
                  }}>
                    <span aria-hidden="true" style={{ color: group.accent, fontWeight: 800, marginRight: 4 }}>“</span>
                    {group.message}
                    <span style={{
                      display: 'block', marginTop: 8, fontStyle: 'normal', fontWeight: 700,
                      fontSize: 11.5, letterSpacing: '.02em', color: group.accent,
                    }}>Les membres d'EVAD Connect</span>
                  </blockquote>
                </div>
              </div>
            </>
          )}
        </div>
      ) : group.members ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12, alignContent: 'start' }}>
          {group.members.map((m, i) => <MemberTile key={i} m={m} accent={group.accent} tint={group.tint}/>)}
        </div>
      ) : null}
    </div>
  );
};

const TeamDirectory = () => (
  <div style={{ background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderRadius: 24, padding: '8px 32px', marginBottom: 56, boxShadow: '0 2px 16px rgba(1,130,98,.06)' }}>
    {TEAM_GROUPS.map((g, i) => <TeamBand key={g.id} group={g} last={i === TEAM_GROUPS.length - 1}/>)}
  </div>
);

// ─── Main section ───
const AssociationSection = ({ teamLayout = 'directory' }) => (
  <Section id="association" padded={true}>

    {/* ─── HEADER : titre à gauche, logo à droite ─── */}
    <div className="asso-header" style={{
      display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center',
      marginBottom: 72,
    }}>
      <div>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
          color: '#018262', opacity: .75, marginBottom: 14,
        }}>Qui porte le projet ?</div>
        <h2 style={{
          fontFamily: "'Satoshi',sans-serif", fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-.02em',
          color: '#0d2b22', margin: 0, marginBottom: 18, maxWidth: 560,
        }}>L'association <span style={{ color: '#018262', fontStyle: 'italic', fontWeight: 600 }}>EVAD Connect.</span></h2>
        <p style={{
          fontSize: 17, lineHeight: 1.55, color: '#3d6b5a',
          maxWidth: 520, margin: 0,
        }}>Un collectif réuni autour du projet EVAD et accessible à toutes et à tous, avec une gouvernance partagée.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img
          src={window.__resources.logoConnect}
          alt="Logo EVAD Connect"
          style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block' }}
        />
      </div>
    </div>

    {/* ─── BLOC 1 : OBJET SOCIAL ─── */}
    <BlockHeader label="L'objet" title="Ce que poursuit l'association"/>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
      <ObjectCard
        bg="#018262" fg="#e8f7f3" chipBg="rgba(255,255,255,.14)"
        num="01" name="L'écosystème EVAD"
        text={<>Faciliter la <b style={{ color: '#fff' }}>création et la gestion des lieux durables</b> grâce à EVAD : des outils, des méthodes, une communauté.</>}
      />
      <ObjectCard
        bg="#4aab8f" fg="#e8f7f3" chipBg="rgba(255,255,255,.2)"
        num="02" name="EVAD&Vous"
        text={<>Sensibiliser de manière <b style={{ color: '#fff' }}>positive et ludique</b> à la transition écologique grâce à l'évènement EVAD&amp;Vous.</>}
      />
    </div>

    {/* ─── BLOC 2 : IDENTITÉ JURIDIQUE ─── */}
    <BlockHeader label="L'identité" title="Le cadre juridique"/>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 56 }}>
      {[
        { e: '📜', t: '1901',                          d: 'Association loi 1901, à but non lucratif.', big: true },
        { e: '🏅', t: 'Intérêt général',                d: 'Reconnue d\'intérêt général. Dons défiscalisés jusqu\'à 66 %.' },
        { e: '🤝', t: 'Gouvernance partagée',           d: 'Décisions collectives, inspirées de l\'écocratie.' },
        { e: '📖', t: 'Communs ouverts',                d: 'Outils, méthodes et savoirs publiés sous licence Creative Commons.' },
        { e: '🚪', t: 'Accessible à toutes et tous',    d: 'Ouverte à toute personne qui veut s\'engager.' },
      ].map((c, i) => (
        <div key={i} style={{
          background: '#fff', border: '1px solid rgba(46,102,66,.08)', borderRadius: 18,
          padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: '0 2px 12px rgba(1,130,98,.05)',
        }}>
          <span role="img" aria-label={c.t} style={{ fontSize: 24 }}>{c.e}</span>
          <div style={{
            fontFamily: c.big ? "'Satoshi',sans-serif" : "'Satoshi',sans-serif",
            fontWeight: c.big ? 900 : 700,
            fontSize: c.big ? 32 : 17, color: '#018262', lineHeight: 1.1,
          }}>{c.t}</div>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: '#3d6b5a', margin: 0 }}>{c.d}</p>
        </div>
      ))}
    </div>

    {/* ─── BLOC 3 : ÉQUIPE ─── */}
    <BlockHeader label="Le collectif" title="Qui anime EVAD"/>
    {teamLayout === 'cards' ? (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
        {TEAM_GROUPS.map(g => <TeamCard key={g.id} group={g}/>)}
      </div>
    ) : (
      <TeamDirectory/>
    )}

    {/* ─── BLOC 4 : AGIR (Conseil Régénératif + Don + Coopétiteur) ─── */}
    <div id="agir" style={{ scrollMarginTop: 90 }}/>
    <BlockHeader label="Comment agir ?" title="D'autres façons de rejoindre l'aventure"/>
    <div className="agir-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'stretch' }}>
      <a id="agir-don" className="agir-don-card" href="https://www.helloasso.com/associations/evad-connect/formulaires/1" target="_blank" rel="noopener" style={{
        background: 'linear-gradient(155deg, #019b76 0%, #018262 55%, #016b52 100%)', color: '#e8f7f3', borderRadius: 22,
        padding: '26px 28px', minHeight: 200,
        display: 'flex', flexDirection: 'column', gap: 14,
        fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 15,
        boxShadow: '0 14px 32px rgba(1,130,98,.32)', transition: 'transform .2s, box-shadow .2s',
        textDecoration: 'none', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(1,130,98,.42)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 14px 32px rgba(1,130,98,.32)'; }}>
        <span aria-hidden="true" style={{ position: 'absolute', top: -60, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,201,176,.3), transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
          <span style={{
            width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>💚</span>
          <span style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>Faire un don</span>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: '#e8f7f3', opacity: .95, flex: 1, position: 'relative' }}>
          Chaque euro finance des <b style={{ color: '#fff' }}>impacts vérifiés par le Conseil Régénératif</b>, pas de greenwashing. Don défiscalisé à <b style={{ color: '#fff' }}>66 %</b> : 100 € ne vous coûtent que 34 €.
        </p>
        <span style={{
          display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 100, position: 'relative',
          background: 'rgba(255,255,255,.2)', border: '1px solid rgba(255,255,255,.25)',
          color: '#fff', fontSize: 13, fontWeight: 700,
        }}>Donner <span style={{ fontSize: 14 }}>→</span></span>
      </a>
      <ObjectCard
        bg="#9c7b33" fg="#f6edd7" chipBg="rgba(255,255,255,.2)"
        num="🤝" name="Soutenir en mécène"
        text={<>Entreprises et grands donateurs, soutenez EVAD dans la <b style={{ color: '#fff' }}>durée</b>. Construisons ensemble un partenariat de mécénat sur mesure, aligné sur vos engagements RSE.</>}
        link={{ href: "mailto:contact@evad.org?subject=Devenir%20mécène%20d'EVAD", label: "Envoyer un email" }}
        id="agir-mecene"
      />
      <ObjectCard
        bg="#3a6e8c" fg="#e0eef6" chipBg="rgba(255,255,255,.2)"
        num="🤲" name="Coopérer avec nous"
        text={<>Partager <b style={{ color: '#fff' }}>ressources, retours d'expérience et co-développement</b> entre acteurs, pour bâtir un écosystème numérique robuste au service des territoires en transition.</>}
        link={{ href: "https://compte.evad.org/apps/forms/s/MFdHsmKzPo9PSK3KjWo4czWn", label: "Se proposer" }}
        id="agir-coop"
      />
    </div>

    <style>{`
      @media (max-width: 880px) {
        .agir-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 880px) {
        .asso-header { grid-template-columns: 1fr !important; gap: 28px !important; }
        .asso-header > div:last-child { justify-content: flex-start !important; }
        .team-band { grid-template-columns: 1fr !important; gap: 20px !important; }
      }
      @keyframes agir-pulse-kf {
        0%   { box-shadow: 0 8px 20px rgba(1,130,98,.3); transform: scale(1); }
        25%  { box-shadow: 0 14px 36px rgba(1,130,98,.45), 0 0 0 4px rgba(126,201,176,.45); transform: scale(1.015); }
        100% { box-shadow: 0 8px 20px rgba(1,130,98,.3); transform: scale(1); }
      }
      .agir-pulse { animation: agir-pulse-kf 1.8s ease-out; }
    `}</style>
  </Section>
);

const BlockHeader = ({ label, title }) => (
  <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
      color: '#018262',
    }}>{label}</span>
    <span style={{ flex: 1, height: 1, background: 'rgba(46,102,66,.12)' }}/>
  </div>
);

const ObjectCard = ({ bg, fg, chipBg, num, name, text, link, id }) => (
  <div id={id} style={{
    background: bg, color: fg, borderRadius: 22, padding: '26px 28px',
    display: 'flex', flexDirection: 'column', gap: 14, minHeight: 200,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: chipBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 14, color: fg,
      }}>{num}</div>
      <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>{name}</div>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: fg, opacity: .95, flex: 1 }}>{text}</p>
    {link && (
      <a href={link.href} target="_blank" rel="noopener" style={{
        display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 100,
        background: 'rgba(255,255,255,.16)', color: '#fff',
        fontFamily: "'Satoshi',sans-serif", fontSize: 13, fontWeight: 700,
        border: '1px solid rgba(255,255,255,.2)',
        transition: 'background .2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.26)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.16)'; }}>
        {link.label} <span style={{ fontSize: 14 }}>→</span>
      </a>
    )}
  </div>
);

window.AssociationSection = AssociationSection;
