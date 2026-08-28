// Landing page primitives + sections

// ─────────── Supabase : inscriptions à la bêta ───────────
// La clé "anon" est PUBLIQUE par conception : elle peut figurer dans le code.
// La sécurité vient de la règle (RLS) configurée dans Supabase, qui n'autorise
// QUE l'insertion (aucune lecture des inscriptions par le public).
// → Voir INSTALLATION-supabase.md pour créer la table et récupérer ces 2 valeurs.
const SUPABASE_URL      = 'https://lmhhrccmgebztioesmik.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGhyY2NtZ2VienRpb2VzbWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjIyOTgsImV4cCI6MjA4MDg5ODI5OH0.epfoBIsZJHLqj96dYE7AvImK_EgjMW9PFtvLk4VwlDc';
// Nom EXACT de la table Supabase (respectez la casse / les majuscules).
const SUPABASE_TABLE    = 'inscription_beta';

async function saveBetaSignup(data) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + SUPABASE_TABLE, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error('Supabase ' + res.status + ', ' + detail);
  }
}

const ROLES = {
  pilote:    { emoji: '🏡', tint: '#dcefe7', short: 'Porteurs de lieu', name: "Pilote d'impact",    verb: 'Coordonnez un lieu durable',     persona: "Porteur·se d'un tiers-lieu, écolieu, ferme, association, incubateur…", pillText: "Coordonner un lieu durable et visible",       desc: 'Tiers-lieu, écolieu, ferme, association, incubateur. Vous publiez des quêtes, accueillez des Bâtisseurs, vérifiez les preuves d\'impact.', perks: ['Pilotez et financez vos projets avec des outils numériques intégrés', 'Rendez vos impacts mesurables et traçables, preuves à l\'appui', 'Transformez vos actions en données probantes pour ancrer votre modèle'], cta: 'Développer mon lieu', accent: '#018262', image: window.__resources.pilote },
  batisseur: { emoji: '🌿', tint: '#fdf3e7', short: 'Citoyens',         name: "Bâtisseur d'impact", verb: "Passez à l'action",               persona: "Membre, particulier, étudiant, digital nomad, entrepreneur…",            pillText: "Passer à l'action avec des avantages concrets", desc: "Membre, particulier, étudiant, digital nomad, entrepreneur. Vous rejoignez des quêtes concrètes, vous contribuez, et votre engagement vous ouvre l'accès au réseau.", perks: ['Passez de l\'éco-anxiété à l\'éco-action, un pas à la fois', 'Soyez reconnu : chaque action est prouvée et valorisée', 'Avancez à votre rythme, porté par une communauté qui avance avec vous'], cta: 'Trouver ma quête', accent: '#c8732a', image: window.__resources.batisseur },
  semeur:    { emoji: '🌾', tint: '#e8f4f9', short: 'Financeurs',       name: "Semeur d'impact",    verb: 'Soutenez des projets durables',  persona: "Financeur public/privé, investisseur, fondation, collectivité…",         pillText: "Soutenir des projets durables vérifiés",        desc: 'Financeur public/privé, fondation, investisseur, collectivité. Vous financez des projets contre des preuves d\'impact vérifiées.', perks: ['Identifiez les initiatives véritablement transformatrices', 'Assurez-vous d\'impacts mesurables, durables et transparents', 'Chaque acte investi est tracé, mesuré, et devient une contribution'], cta: 'Soutenir des projets', accent: '#3a6e8c', image: window.__resources.semeur },
};

const Section = ({ id, eyebrow, title, sub, children, dark, narrow, padded = true }) => (
  <section id={id} style={{
    background: dark ? '#0d2b22' : 'transparent',
    color: dark ? '#cfeee7' : '#0d2b22',
    padding: padded ? 'var(--sec-pad, 96px) 24px' : '0 24px',
    position: 'relative',
  }}>
    <div style={{ maxWidth: narrow ? 760 : 1180, margin: '0 auto' }}>
      {eyebrow && (
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
          color: dark ? '#7ec9b0' : '#018262', opacity: dark ? .8 : .75, marginBottom: 14,
        }}>{eyebrow}</div>
      )}
      {title && (
        <h2 style={{
          fontFamily: "'Satoshi',sans-serif", fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-.02em',
          color: dark ? '#e8f7f3' : '#0d2b22', margin: 0, marginBottom: sub ? 18 : 36,
          maxWidth: 760,
        }}>{title}</h2>
      )}
      {sub && (
        <p style={{
          fontSize: 17, lineHeight: 1.55, color: dark ? '#cfeee7' : '#3d6b5a',
          maxWidth: 640, margin: 0, marginBottom: 48, opacity: dark ? .85 : 1,
        }}>{sub}</p>
      )}
      {children}
    </div>
  </section>
);

// ─────────────────── Hero ───────────────────
const Hero = ({ role, setRole, palette, persona, onChoose }) => {
  const r = ROLES[role];
  const [mode, setMode] = React.useState('signup'); // 'signup' | 'login'
  const accent = palette === 'terracotta' ? '#c8732a' : palette === 'sky' ? '#3a6e8c' : '#018262';
  React.useEffect(() => {
    if (mode === 'login') {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mode]);
  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '92vh', padding: '80px 24px 64px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 80% 0%, rgba(74,171,143,.18) 0%, transparent 50%), #e8f7f3',
      overflow: 'hidden',
    }}>
      <NavBar accent={accent} onLogin={() => { window.location.href = 'https://app.evad.org/?login=1'; }} persona={persona} onChoose={onChoose}/>
      <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 64, alignItems: 'center' }} className="hero-grid">
        <div>
          <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="hero-logo-block">
            <div style={{ width: '100%', maxWidth: 520, display: 'flex', justifyContent: 'center' }}>
              <Logo width="100%" fill="#018262"/>
            </div>
            <div style={{
              fontFamily: "'Satoshi',sans-serif", fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: '#018262', opacity: .85, marginTop: -28,
              textAlign: 'center',
              fontSize: 'clamp(11px, 2vw, 20px)',
              maxWidth: '100%',
              padding: '0 8px',
            }} className="hero-tagline">
              Écosystème Vivant Autonome &amp; Décentralisé
            </div>
          </div>
          <h1 style={{
            fontFamily: "'Satoshi',sans-serif", fontWeight: 900,
            fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-.02em',
            color: '#0d2b22', margin: 0, marginBottom: 24,
          }}>
            Imaginons un avenir durable <span style={{ fontStyle: 'italic', fontWeight: 600, color: accent }}>et réalisons-le ensemble.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: '#3d6b5a', maxWidth: 540, marginBottom: 36 }}>
            Du pixel à la terre, du rêve au lieu, de l'action à l'impact. Plongez dans un avenir solarpunk et rejoignez le mouvement qui transforme la transition écologique en économie régénérative.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => document.getElementById('ecosystem').scrollIntoView({ behavior: 'smooth' })} style={{
              padding: '16px 28px', background: accent, color: '#e8f7f3', border: 'none', borderRadius: 12,
              fontFamily: "'Satoshi',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '.02em', cursor: 'pointer',
              boxShadow: '0 8px 24px ' + accent + '50', transition: 'transform .18s, box-shadow .18s',
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px ' + accent + '70'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px ' + accent + '50'; }}>
              En savoir plus ↓
            </button>
          </div>

        </div>

        <HeroVisual role={role} setRole={setRole} mode={mode} setMode={setMode}/>
      </div>
      <style>{`
        @media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

const NAV_LINKS = [['#ecosystem', 'Solutions'], ['#roles', 'Profils'], ['#foundations', 'Piliers'], ['#cycle', 'Spirale'], ['#deva', 'Deva'], ['#association', "L'asso"], ['#agir', 'Nous soutenir'], ['#cta', 'Nous suivre']];

// Sélecteur de langue (menu déroulant). Le choix est mémorisé (localStorage)
// et la page rechargée ; la traduction est faite au runtime par i18n.js.
// data-no-i18n empêche le moteur de traduire les libellés « Français » / « English ».
const LANG_OPTIONS = [{ code: 'fr', label: 'Français' }, { code: 'en', label: 'English' }];
const LangSwitch = ({ overDark }) => {
  const cur = (typeof window !== 'undefined' && window.EVAD_LANG) || 'fr';
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const curLabel = (LANG_OPTIONS.find(l => l.code === cur) || LANG_OPTIONS[0]).label;
  const textColor = overDark ? '#f5fbf8' : '#0d2b22';
  return (
    <div data-no-i18n="1" ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Langue / Language"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 10px', borderRadius: 10, cursor: 'pointer',
          background: overDark ? 'rgba(232,247,243,.16)' : 'rgba(1,130,98,.06)',
          border: '1px solid ' + (overDark ? 'rgba(232,247,243,.32)' : 'rgba(1,130,98,.2)'),
          backdropFilter: overDark ? 'blur(6px)' : 'none', WebkitBackdropFilter: overDark ? 'blur(6px)' : 'none',
          color: textColor, fontFamily: "'Satoshi',sans-serif", fontSize: 13, fontWeight: 700, lineHeight: 1,
        }}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>
        <span>{curLabel}</span>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul role="listbox" aria-label="Langue / Language" style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, minWidth: 152,
          listStyle: 'none', margin: 0, padding: 6,
          background: '#fff', border: '1px solid rgba(46,102,66,.14)', borderRadius: 12,
          boxShadow: '0 14px 34px rgba(13,43,34,.18)', zIndex: 60,
        }}>
          {LANG_OPTIONS.map(l => {
            const isCur = cur === l.code;
            return (
              <li key={l.code} role="option" aria-selected={isCur}
                onClick={() => { if (window.EVAD_setLang) window.EVAD_setLang(l.code); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
                  fontFamily: "'Satoshi',sans-serif", fontSize: 14, fontWeight: 600,
                  color: isCur ? '#018262' : '#0d2b22',
                  background: isCur ? 'rgba(1,130,98,.08)' : 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = isCur ? 'rgba(1,130,98,.12)' : 'rgba(1,130,98,.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = isCur ? 'rgba(1,130,98,.08)' : 'transparent'; }}>
                <span>{l.label}</span>
                {isCur && (
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#018262" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const NavBar = ({ accent, onLogin, persona, onChoose }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [overDark, setOverDark] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pr = persona && ROLES[persona];
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setOverDark(document.documentElement.classList.contains('over-prologue'));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Also watch the html class for changes the prologue sets after mount
    const mo = new MutationObserver(() => setOverDark(document.documentElement.classList.contains('over-prologue')));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => { window.removeEventListener('scroll', onScroll); mo.disconnect(); };
  }, []);
  // Close menu on scroll or escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const linkColor = overDark ? '#f5fbf8' : '#0d2b22';
  const logoFill  = overDark ? '#f5fbf8' : '#018262';
  const burgerColor = overDark ? '#f5fbf8' : '#0d2b22';
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      padding: scrolled && !overDark ? '12px 32px' : '20px 32px',
      display: 'flex', alignItems: 'center', gap: 32, zIndex: 50,
      background: overDark ? 'transparent' : (scrolled || menuOpen ? 'rgba(232,247,243,.92)' : 'transparent'),
      backdropFilter: (!overDark && scrolled) || menuOpen ? 'saturate(180%) blur(14px)' : 'none',
      WebkitBackdropFilter: (!overDark && scrolled) || menuOpen ? 'saturate(180%) blur(14px)' : 'none',
      borderBottom: (!overDark && scrolled) || menuOpen ? '1px solid rgba(46,102,66,.08)' : '1px solid transparent',
      transition: 'all .25s ease',
      textShadow: overDark && !menuOpen ? '0 2px 10px rgba(13,43,34,.45)' : 'none',
    }}>
      <Logo width={88} fill={menuOpen ? '#018262' : logoFill}/>
      <div style={{ display: 'flex', gap: 24, marginLeft: 24 }} className="nav-links">
        {NAV_LINKS.map(([h, l]) => (
          <a key={h + l} href={h} style={{ fontSize: 13, fontWeight: 500, color: linkColor }}>{l}</a>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
        <LangSwitch overDark={overDark}/>
        {pr && (
          <div className="nav-persona" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 6px 6px 12px', borderRadius: 100,
            background: overDark ? 'rgba(232,247,243,.16)' : pr.tint,
            border: '1px solid ' + (overDark ? 'rgba(232,247,243,.35)' : pr.accent + '40'),
            backdropFilter: overDark ? 'blur(6px)' : 'none', WebkitBackdropFilter: overDark ? 'blur(6px)' : 'none',
          }}>
            <button
              type="button"
              onClick={() => { const el = document.getElementById('roles'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              title="Changer de profil"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: "'Satoshi',sans-serif", fontSize: 12.5, fontWeight: 700,
                color: overDark ? '#f5fbf8' : pr.accent,
              }}>
              <span aria-hidden="true" style={{ fontSize: 14 }}>{pr.emoji}</span>
              <span className="nav-persona-label" style={{ whiteSpace: 'nowrap' }}>Vue {pr.short.toLowerCase()}</span>
            </button>
            <button
              type="button"
              onClick={() => onChoose && onChoose(null)}
              aria-label="Revenir à la vue générale"
              title="Revenir à la vue générale"
              style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: overDark ? 'rgba(13,43,34,.25)' : '#fff',
                border: 'none', cursor: 'pointer', padding: 0,
                color: overDark ? '#f5fbf8' : pr.accent, fontSize: 13, lineHeight: 1,
              }}>×</button>
          </div>
        )}
        <button type="button" onClick={onLogin} className="nav-login" style={{ padding: '8px 16px', background: accent, color: '#e8f7f3', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'Satoshi',sans-serif" }}>Se connecter</button>
        <button
          type="button"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          className="nav-burger"
          style={{
            display: 'none',
            width: 40, height: 40, borderRadius: 10,
            background: menuOpen ? 'rgba(1,130,98,.12)' : 'transparent',
            border: '1px solid ' + (menuOpen ? 'rgba(1,130,98,.3)' : 'transparent'),
            cursor: 'pointer', padding: 0,
            alignItems: 'center', justifyContent: 'center',
            transition: 'background .2s, border-color .2s',
          }}>
          <span aria-hidden="true" style={{ display: 'inline-block', position: 'relative', width: 20, height: 14 }}>
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, background: menuOpen ? '#018262' : burgerColor, borderRadius: 2, top: menuOpen ? 6 : 0, transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'top .2s, transform .2s, background .2s' }}/>
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, background: menuOpen ? '#018262' : burgerColor, borderRadius: 2, top: 6, opacity: menuOpen ? 0 : 1, transition: 'opacity .15s' }}/>
            <span style={{ position: 'absolute', left: 0, right: 0, height: 2, background: menuOpen ? '#018262' : burgerColor, borderRadius: 2, top: menuOpen ? 6 : 12, transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'top .2s, transform .2s, background .2s' }}/>
          </span>
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div className={'nav-mobile-menu' + (menuOpen ? ' open' : '')} style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'rgba(232,247,243,.96)',
        backdropFilter: 'saturate(180%) blur(14px)',
        WebkitBackdropFilter: 'saturate(180%) blur(14px)',
        borderBottom: '1px solid rgba(46,102,66,.1)',
        boxShadow: menuOpen ? '0 18px 32px rgba(13,43,34,.12)' : 'none',
        maxHeight: menuOpen ? 'calc(100vh - 64px)' : 0,
        overflow: 'hidden',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'max-height .3s ease, opacity .2s ease, box-shadow .25s ease',
        display: 'none',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 24px 18px' }}>
          {NAV_LINKS.map(([h, l]) => (
            <a key={h + l} href={h} onClick={() => setMenuOpen(false)} style={{
              padding: '14px 4px',
              fontFamily: "'Satoshi', sans-serif", fontSize: 16, fontWeight: 600,
              color: '#0d2b22',
              borderBottom: '1px solid rgba(46,102,66,.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>{l}</span>
              <span aria-hidden="true" style={{ opacity: .35, fontSize: 14 }}>→</span>
            </a>
          ))}
          <button type="button" onClick={() => { setMenuOpen(false); onLogin(); }} style={{
            marginTop: 18, padding: '14px 18px',
            background: accent, color: '#e8f7f3', border: 'none',
            borderRadius: 12,
            fontFamily: "'Satoshi', sans-serif", fontSize: 14, fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 20px ' + accent + '40',
          }}>Se connecter</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
          .nav-login { display: none !important; }
          .nav-burger { display: inline-flex !important; }
          .nav-mobile-menu { display: flex !important; }
          .nav-persona-label { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

const Logo = ({ width = 100, fill = '#018262' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 296" style={{ width, maxWidth: '100%', height: 'auto', display: 'block' }}>
    <path fill={fill} d="M519.25 97.74V66.85q0-.84.84-.84l17.13-.05q.46 0 .47.45c.44 26.01.05 52.06.05 78.07q0 14.47-1.14 19.92c-7.95 38.07-56.84 51.84-86.46 28.83-34.83-27.06-21.3-83.94 21.39-93.55q5.51-1.25 15.01-1.2 16.07.07 31.97 0a.74.74 0 0 0 .74-.74zm-35.67 18.32c-19.9.42-34.7 17.36-34 36.62.75 20.55 18.24 37.48 39.47 34.26 17.99-2.74 29.88-18.13 30.06-36.2q.18-17.34.14-34.47a.54.53 90 0 0-.53-.54q-17.58-.05-35.14.33z"/>
    <path fill={fill} d="M316.21 169.01c-9.71-25.62-.51-57.33 26.11-68.88 29.74-12.92 66.59 2.76 73.87 35.6q1.25 5.63 1.29 18.77.06 23.25 0 46.48a.53.53 0 0 1-.53.53q-21.42-.04-42.99.01-13.77.03-19.93-1.11-27.86-5.13-37.82-31.4zm21.44-42.36c-15.78 18.14-7.53 46.46 14.92 54.33q5.02 1.76 15.07 2.03 15.97.45 31.75.18a.87.87 0 0 0 .85-.87q.02-12.75.01-25.61-.02-13.01-1.61-18.14c-8.03-25.93-43.32-32.24-60.99-11.92z"/>
    <path fill={fill} d="M113.27 160.15c8.06 29.3 44.48 37.17 61.33 10.21a.74.71 15.4 0 1 .62-.34l17.86-.06a.46.46 0 0 1 .43.62c-12.21 31.92-51.65 44.27-79.27 22.36-15-11.89-22.71-30.84-19.7-49.89 3.08-19.49 17.43-37.76 37.13-43.03q5.65-1.51 15.81-1.67 23.26-.34 46.51.27a1.91 1.9-57 0 0 .93-.2q1.01-.51 1.58.21.34.43.27 1.3c-.32 4.15-.13 8.77-.56 12.4-3.11 26.44-23.57 46.92-50.64 47.08q-15.91.1-31.81.1-.67 0-.49.64zm64.4-44.43c-12.95.44-27.67-2.08-39.75 1.03q-20.1 5.18-25.01 27.11a.74.74 0 0 0 .72.9q12.93-.04 26.04 0 9.58.03 14.52-1.31 19.58-5.3 24.03-27.07a.55.55 0 0 0-.55-.66z"/>
    <path fill={fill} d="M206.48 98.31c13.91.12 24.8 9.83 29.09 22.61 6.99 20.84 15.19 41.3 22.53 61.66a2.13 2.13 0 0 0 4.01-.01q10.19-28.63 20.54-57.33c5.71-15.83 12.31-25.72 30.2-26.94a.65.64 8.8 0 1 .65.88q-17.96 45.46-35.93 90.89c-1.29 3.28-2.91 6.79-5.27 9.24-8.02 8.34-21.35 6.12-27.2-3.4q-2.04-3.33-4.51-9.6-17.16-43.6-34.55-87.36a.47.47 0 0 1 .44-.64z"/>
  </svg>
);

const HeroVisual = ({ role, setRole, mode, setMode }) => {
  const r = ROLES[role];
  return (
    <div id="inscription" style={{
      background: '#fff', border: '1px solid rgba(46,102,66,.12)', borderRadius: 28,
      boxShadow: '0 24px 60px rgba(1,130,98,.18)', overflow: 'hidden',
      transform: 'rotate(0deg)', transition: 'transform .3s', scrollMarginTop: 90,
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(46,102,66,.08)', display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#b84e35' }}/>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f0c84a' }}/>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4aab8f' }}/>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '.01em', color: '#0d2b22', pointerEvents: 'none' }}>Bienvenue dans l'écosystème</span>
      </div>
      <div style={{ padding: 22, background: 'linear-gradient(180deg, #fff 0%, #f5fbf8 100%)' }}>
        {mode === 'login' ? (
          <LoginForm onBack={() => setMode('signup')}/>
        ) : (
          <SignupContent role={role} setRole={setRole} r={r} onLogin={() => { window.location.href = 'https://app.evad.org/?login=1'; }}/>
        )}
      </div>
    </div>
  );
};

const SignupContent = ({ role, setRole, r, onLogin }) => {
  const [chosen, setChosen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);
  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#fff', border: '1px solid rgba(46,102,66,.16)', borderRadius: 12,
    fontFamily: "'Satoshi',sans-serif", fontSize: 14, color: '#0d2b22',
    outline: 'none', transition: 'border-color .15s, box-shadow .15s',
    boxSizing: 'border-box',
  };
  const focusIn = e => { e.currentTarget.style.borderColor = r.accent; e.currentTarget.style.boxShadow = '0 0 0 3px ' + r.accent + '22'; };
  const focusOut = e => { e.currentTarget.style.borderColor = 'rgba(46,102,66,.16)'; e.currentTarget.style.boxShadow = 'none'; };

  // ─── FORM VIEW (a profile has been chosen) ───
  if (chosen) {
    return (
      <>
        <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 20, lineHeight: 1.2, color: '#0d2b22', margin: '0 0 16px' }}>Rejoignez la bêta :</h3>

        {/* Chosen profile recap + changer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid ' + r.accent + '40', background: r.accent + '0e', borderRadius: 14, marginBottom: 16 }}>
          <div role="img" aria-label={r.name} style={{ width: 40, height: 40, borderRadius: 10, background: r.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{r.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0d2b22', lineHeight: 1.2 }}>{r.name}</div>
            <div style={{ fontSize: 11.5, color: '#3d6b5a', opacity: .85, marginTop: 2 }}>{r.short}</div>
          </div>
          {!sent && (
            <button type="button" onClick={() => { setChosen(false); setSent(false); }} style={{ background: 'none', border: 'none', padding: 0, color: r.accent, fontWeight: 700, cursor: 'pointer', fontFamily: "'Satoshi',sans-serif", fontSize: 12, flexShrink: 0 }}>Changer</button>
          )}
        </div>

        {sent ? (
          <div style={{ padding: '18px 18px', borderRadius: 14, background: 'transparent', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>🌱</span>
            <div>
              <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 14, color: '#0d2b22', marginBottom: 3 }}>Merci pour votre inscription !</div>
              <div style={{ fontSize: 12.5, color: '#3d6b5a', lineHeight: 1.45 }}>Votre demande d'accès <b style={{ color: r.accent }}>{r.name}</b> est bien enregistrée. Nous vous contacterons dès l'ouverture de la bêta, en fin d'année, et vous serez convié·e à notre <b style={{ color: r.accent }}>événement de lancement</b>.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (busy) return;
            setError(null);
            setBusy(true);
            const fd = new FormData(e.currentTarget);
            const data = {
              role,
              role_label: r.name,
              prenom: String(fd.get('prenom') || '').trim(),
              nom: String(fd.get('nom') || '').trim(),
              structure: String(fd.get('structure') || '').trim() || null,
              ville: String(fd.get('ville') || '').trim(),
              email: String(fd.get('email') || '').trim(),
              consent: fd.get('consent') === 'on',
            };
            try {
              const configured = !SUPABASE_URL.includes('VOTRE-PROJET') && !SUPABASE_ANON_KEY.includes('COLLEZ');
              if (configured) {
                await saveBetaSignup(data);
              } else {
                // Mode démo (clés Supabase pas encore renseignées) : on simule.
                await new Promise(res => setTimeout(res, 500));
              }
              setSent(true);
            } catch (err) {
              console.error(err);
              setError("Impossible d'enregistrer votre inscription pour le moment. Merci de réessayer dans un instant.");
            } finally {
              setBusy(false);
            }
          }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input type="text" name="prenom" placeholder="Prénom" autoComplete="given-name" required style={inputStyle} onFocus={focusIn} onBlur={focusOut}/>
            <input type="text" name="nom" placeholder="Nom" autoComplete="family-name" required style={inputStyle} onFocus={focusIn} onBlur={focusOut}/>
            {(role === 'pilote' || role === 'semeur' || role === 'batisseur') && (
              <input type="text" name="structure" placeholder={role === 'pilote' ? 'Structure (lieu, association…)' : role === 'semeur' ? 'Structure (fondation, collectivité…)' : 'Structure (entreprise, asso… facultatif)'} autoComplete="organization" required={role !== 'batisseur'} style={inputStyle} onFocus={focusIn} onBlur={focusOut}/>
            )}
            <input type="text" name="ville" placeholder="Ville" autoComplete="address-level2" required style={inputStyle} onFocus={focusIn} onBlur={focusOut}/>
            <input type="email" name="email" placeholder="Adresse email" autoComplete="email" required style={inputStyle} onFocus={focusIn} onBlur={focusOut}/>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, lineHeight: 1.45, color: '#3d6b5a', cursor: 'pointer', marginTop: 2 }}>
              <input type="checkbox" name="consent" required style={{ width: 16, height: 16, marginTop: 1, accentColor: r.accent, flexShrink: 0, cursor: 'pointer' }}/>
              <span>J'accepte qu'EVAD conserve ces informations pour me recontacter au sujet de la bêta. Vos données ne sont jamais revendues. <a href="mentions-legales.html#rgpd" target="_blank" rel="noopener" style={{ color: r.accent, fontWeight: 600 }}>En savoir plus</a>.</span>
            </label>
            {error && (
              <div style={{ fontSize: 12.5, lineHeight: 1.4, color: '#b4451f', background: 'rgba(180,69,31,.08)', border: '1px solid rgba(180,69,31,.25)', borderRadius: 10, padding: '10px 12px' }}>{error}</div>
            )}
            <button type="submit" disabled={busy} style={{
              width: '100%', padding: 14, marginTop: 2, background: r.accent, color: '#fff', border: 'none',
              borderRadius: 12, fontFamily: "'Satoshi',sans-serif", fontSize: 14, fontWeight: 700,
              cursor: busy ? 'wait' : 'pointer', opacity: busy ? .75 : 1,
              boxShadow: '0 8px 20px ' + r.accent + '40', transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => { if (busy) return; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 24px ' + r.accent + '55'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 20px ' + r.accent + '40'; }}>
              {busy ? 'Enregistrement…' : r.emoji + " S'inscrire à la bêta →"}
            </button>
          </form>
        )}

        <div style={{ marginTop: 14, fontSize: 12, color: '#3d6b5a', textAlign: 'center' }}>
          Déjà membre ? <button type="button" onClick={onLogin} style={{ background: 'none', border: 'none', padding: 0, color: '#018262', fontWeight: 700, cursor: 'pointer', fontFamily: "'Satoshi',sans-serif", fontSize: 12 }}>Se connecter</button>
        </div>
      </>
    );
  }

  // ─── SELECTION VIEW (pick a profile) ───
  return (
  <>
    <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '.04em', color: '#018262', marginBottom: 8 }}>S'inscrire à la bêta</div>
    <p style={{ fontSize: 13, lineHeight: 1.5, color: '#3d6b5a', margin: '0 0 16px' }}>Notre prototype ouvre en <b style={{ color: '#018262' }}>fin d'année à Bordeaux</b>. Inscrivez-vous pour le tester en avant-première, être convié·e à notre <b style={{ color: '#018262' }}>événement de lancement</b> et nous aider à le faire grandir avec vos retours.</p>
    {Object.entries(ROLES).map(([id, x]) => {
      const isSel = role === id;
      return (
        <div key={id} onClick={() => { setRole(id); setChosen(true); setSent(false); }} style={{
          display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px',
          border: '1px solid ' + (isSel ? x.accent : 'rgba(46,102,66,.14)'),
          background: isSel ? 'rgba(1,130,98,.04)' : '#fff',
          borderRadius: 14, marginBottom: 10, cursor: 'pointer',
          boxShadow: isSel ? '0 8px 24px ' + x.accent + '30' : 'none',
          transition: 'all .25s',
        }}>
          <div role="img" aria-label={x.name} style={{ width: 48, height: 48, borderRadius: 12, background: x.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{x.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: x.accent, opacity: .9, marginBottom: 4 }}>{x.short}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0d2b22' }}>{x.name}</div>
            <div style={{ fontSize: 12, color: '#3d6b5a', opacity: .85, marginTop: 3, lineHeight: 1.45 }}>{x.persona}</div>
            <span style={{
              display: 'inline-block', marginTop: 8,
              fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '5px 10px', borderRadius: 100,
              background: x.tint, color: x.accent,
            }}>{x.pillText}</span>
          </div>
        </div>
      );
    })}
    <div style={{ marginTop: 14, fontSize: 12, color: '#3d6b5a', textAlign: 'center' }}>
      Déjà membre ? <button type="button" onClick={onLogin} style={{ background: 'none', border: 'none', padding: 0, color: '#018262', fontWeight: 700, cursor: 'pointer', fontFamily: "'Satoshi',sans-serif", fontSize: 12 }}>Se connecter</button>
    </div>
  </>
  );
};

const LoginForm = ({ onBack }) => {
  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#fff', border: '1px solid rgba(46,102,66,.16)', borderRadius: 12,
    fontFamily: "'Satoshi',sans-serif", fontSize: 14, color: '#0d2b22',
    outline: 'none', transition: 'border-color .15s, box-shadow .15s',
    boxSizing: 'border-box',
  };
  return (
    <>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#018262', opacity: .65, marginBottom: 8 }}>Se connecter</div>
      <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 20, lineHeight: 1.2, color: '#0d2b22', margin: '0 0 18px' }}>Bon retour parmi nous.</h3>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input type="email" placeholder="Adresse email" autoComplete="email" style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#018262'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,130,98,.12)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(46,102,66,.16)'; e.currentTarget.style.boxShadow = 'none'; }}/>
        <input type="password" placeholder="Mot de passe" autoComplete="current-password" style={inputStyle}
          onFocus={e => { e.currentTarget.style.borderColor = '#018262'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(1,130,98,.12)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(46,102,66,.16)'; e.currentTarget.style.boxShadow = 'none'; }}/>
        <button type="submit" style={{
          width: '100%', padding: 14, marginTop: 6, background: '#018262', color: '#fff', border: 'none',
          borderRadius: 100, fontFamily: "'Satoshi',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(1,130,98,.25)', transition: 'transform .15s, box-shadow .15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(1,130,98,.32)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 20px rgba(1,130,98,.25)'; }}>
          Se connecter
        </button>
      </form>
      <div style={{ marginTop: 14, fontSize: 12, color: '#3d6b5a', textAlign: 'center' }}>
        Pas encore de compte ? <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', padding: 0, color: '#018262', fontWeight: 700, cursor: 'pointer', fontFamily: "'Satoshi',sans-serif", fontSize: 12 }}>S'inscrire à la bêta</button>
      </div>
    </>
  );
};

window.Hero = Hero;
window.Section = Section;
window.ROLES = ROLES;
window.Logo = Logo;
