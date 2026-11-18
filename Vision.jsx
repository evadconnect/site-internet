// Refonte teaser — Vision (3 piliers) + Teaser du jeu rétro (liste d'attente)
// Direction : hybride solarpunk + touches rétro arcade (CSS, sans police externe).

// ─────────────────────────── Vision : 3 piliers ───────────────────────────
const VISION_PILLARS = [
  {
    id: 'solarpunk',
    num: '01',
    kicker: 'La vision',
    title: 'Solarpunk',
    pitch: "Un imaginaire désirable où l'humanité, la nature et la technologie vivent en harmonie. Pas une dystopie de plus : un futur positif, lumineux, qu'on a envie d'habiter.",
    accent: '#c8732a',
    img: () => window.__resources.solarpunk,
  },
  {
    id: 'regen',
    num: '02',
    kicker: 'La boussole',
    title: 'Économie régénérative',
    pitch: "Aller plus loin que « durable » : restaurer et revitaliser le vivant. Chaque action crée des boucles vertueuses de valeur qui restent sur le territoire.",
    accent: '#018262',
    img: () => window.__resources.regen,
  },
  {
    id: 'gamification',
    num: '03',
    kicker: "Le moteur",
    title: 'Gamification',
    pitch: "Et si transformer le monde devenait un jeu ? Quêtes, preuves, niveaux : chaque geste concret devient une progression collective, tangible et célébrée.",
    accent: '#3a6e8c',
    img: null, // visuel rétro généré ci-dessous
  },
];

const PixelGameArt = () => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: 'radial-gradient(circle at 30% 25%, rgba(58,110,140,.4), transparent 60%), radial-gradient(circle at 75% 75%, rgba(200,115,42,.3), transparent 55%), #0d2b22',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    imageRendering: 'pixelated',
  }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '16px 16px' }}/>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 20, position: 'relative' }}>
      {[
        { e: '⚡', l: 'Quête' }, { e: '🌱', l: 'Pousse' }, { e: '✦', l: 'Niveau' },
        { e: '✓', l: 'Preuve' }, { e: '🫂', l: 'Guilde' }, { e: '🏆', l: 'Rang' },
      ].map(t => (
        <div key={t.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 46, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, background: 'rgba(232,247,243,.07)',
            border: '2px solid rgba(126,201,176,.35)', boxShadow: '0 0 18px rgba(126,201,176,.2)',
          }}>{t.e}</div>
          <div style={{ fontFamily: 'var(--mono, monospace)', fontSize: 8, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#a8e6cf' }}>{t.l}</div>
        </div>
      ))}
    </div>
  </div>
);

const VisionSection = () => (
  <Section id="vision" eyebrow="La vision d'EVAD"
    title={<>Un futur <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#018262' }}>qu'on a envie de jouer.</span></>}
    sub="EVAD tient sur trois idées simples : un imaginaire désirable, une économie qui régénère le vivant, et le jeu comme moteur de l'engagement.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }} className="vision-grid">
      {VISION_PILLARS.map(p => (
        <div key={p.id} style={{
          display: 'flex', flexDirection: 'column',
          background: '#fff', border: '1px solid rgba(46,102,66,.1)', borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(1,130,98,.06)', transition: 'transform .25s, box-shadow .25s',
        }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 44px rgba(1,130,98,.14)'; }}
           onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(1,130,98,.06)'; }}>
          <div style={{ height: 180, background: '#0d2b22', overflow: 'hidden', position: 'relative' }}>
            {p.img ? (
              <img loading="lazy" decoding="async" src={p.img()} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            ) : <PixelGameArt/>}
            <span style={{
              position: 'absolute', top: 14, left: 14,
              fontFamily: 'var(--mono, monospace)', fontSize: 11, fontWeight: 700,
              color: '#fff', background: p.accent, padding: '4px 9px', letterSpacing: '.1em',
            }}>{p.num}</span>
          </div>
          <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: p.accent, marginBottom: 8 }}>{p.kicker}</div>
            <h3 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.15, letterSpacing: '-.015em', color: '#0d2b22', margin: '0 0 10px' }}>{p.title}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#3d6b5a', margin: 0 }}>{p.pitch}</p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// ─────────────────── Teaser du jeu rétro + liste d'attente ───────────────────
// La liste d'attente réutilise la fonction Supabase « brevo-subscribe » (même
// mécanisme que la newsletter). La clé anon est publique par conception.
const WL_SUPABASE_URL  = 'https://lmhhrccmgebztioesmik.supabase.co';
const WL_SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGhyY2NtZ2VienRpb2VzbWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjIyOTgsImV4cCI6MjA4MDg5ODI5OH0.epfoBIsZJHLqj96dYE7AvImK_EgjMW9PFtvLk4VwlDc';
const WL_ENDPOINT = WL_SUPABASE_URL + '/functions/v1/brevo-subscribe';

const GameTeaser = () => {
  const [email, setEmail] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [status, setStatus] = React.useState('idle'); // idle | loading | ok | error
  const [errMsg, setErrMsg] = React.useState('');

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (status === 'loading') return;
    const mail = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      setStatus('error'); setErrMsg("Indiquez un email valide pour continuer.");
      return;
    }
    if (!consent) {
      setStatus('error'); setErrMsg("Cochez la case pour être prévenu·e du lancement.");
      return;
    }
    setStatus('loading'); setErrMsg('');
    try {
      const res = await fetch(WL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + WL_SUPABASE_ANON,
          'apikey': WL_SUPABASE_ANON,
        },
        body: JSON.stringify({ email: mail, prenom: prenom.trim(), role: null, consent: true }),
      });
      if (!res.ok) {
        let msg = "Une erreur est survenue. Réessayez dans un instant.";
        try { const j = JSON.parse(await res.text()); if (j && j.error) msg = j.error; } catch {}
        setStatus('error'); setErrMsg(msg);
        return;
      }
      setStatus('ok'); setEmail(''); setPrenom(''); setConsent(false);
    } catch {
      setStatus('error'); setErrMsg("Connexion impossible. Vérifiez votre réseau.");
    }
  };

  const inputStyle = {
    flex: '1 1 160px', minWidth: 140, padding: '14px 16px',
    background: 'rgba(13,43,34,.6)', border: '2px solid rgba(126,201,176,.3)', borderRadius: 4,
    color: '#e8f7f3', fontFamily: 'var(--mono, monospace)', fontSize: 14, outline: 'none',
  };

  return (
    <section id="jeu" style={{
      position: 'relative', overflow: 'hidden',
      padding: 'var(--sec-pad, 96px) 24px',
      background: 'radial-gradient(ellipse at 50% -10%, rgba(74,171,143,.22) 0%, transparent 55%), #0d2b22',
      color: '#e8f7f3',
    }}>
      {/* grille pixel + scanlines CRT */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(126,201,176,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(126,201,176,.05) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }}/>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(rgba(0,0,0,0) 0 2px, rgba(0,0,0,.12) 2px 4px)', pointerEvents: 'none', mixBlendMode: 'multiply' }}/>

      <div style={{ maxWidth: 1040, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--mono, monospace)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase',
          color: '#0d2b22', background: '#a8e6cf', padding: '6px 12px', borderRadius: 4, marginBottom: 22,
        }}>
          <span style={{ width: 8, height: 8, background: '#018262', animation: 'wl-blink 1.1s steps(1) infinite' }}/>
          Nouvelle version · Bientôt
        </div>

        {/* Écran de jeu rétro */}
        <div style={{
          background: '#07201a', border: '3px solid rgba(126,201,176,.4)', borderRadius: 14,
          boxShadow: '0 0 0 4px rgba(13,43,34,.6), 0 30px 70px rgba(0,0,0,.45), inset 0 0 70px rgba(74,171,143,.12)',
          padding: 'clamp(28px, 5vw, 56px) clamp(22px, 4vw, 48px)', textAlign: 'center',
        }}>
          {/* sprites pixel (box-shadow art) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginBottom: 28 }} className="wl-sprites">
            <span className="wl-sprite wl-leaf" aria-hidden="true"/>
            <span className="wl-sprite wl-heart" aria-hidden="true"/>
            <span className="wl-sprite wl-coin" aria-hidden="true"/>
          </div>

          <h2 style={{
            fontFamily: 'var(--mono, monospace)', fontWeight: 800,
            fontSize: 'clamp(24px, 4.5vw, 44px)', lineHeight: 1.2, letterSpacing: '.02em',
            color: '#e8f7f3', margin: '0 0 16px', textShadow: '0 0 22px rgba(126,201,176,.4)',
          }}>
            EVAD, le jeu<br/><span style={{ color: '#a8e6cf' }}>arrive en ligne.</span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color: '#cfeee7', maxWidth: 560, margin: '0 auto 10px', opacity: .92 }}>
            Un jeu en ligne rétro où l'on bâtit, régénère et fait pousser un monde solarpunk, ensemble. La vision d'EVAD devient jouable.
          </p>
          <p style={{ fontFamily: 'var(--mono, monospace)', fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: '#7ec9b0', margin: '0 0 30px' }}>
            ▸ Insérez votre email pour continuer
          </p>

          {status === 'ok' ? (
            <div style={{
              maxWidth: 520, margin: '0 auto', background: 'rgba(126,201,176,.1)',
              border: '2px solid rgba(126,201,176,.4)', borderRadius: 8, padding: '22px 24px',
              display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center',
            }}>
              <span aria-hidden="true" style={{ fontSize: 26 }}>🌱</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--mono, monospace)', fontWeight: 800, fontSize: 15, color: '#e8f7f3', letterSpacing: '.04em' }}>VOUS ÊTES SUR LA LISTE !</div>
                <div style={{ fontSize: 13.5, color: '#cfeee7', opacity: .85, marginTop: 2 }}>On vous prévient dès que le jeu ouvre ses portes.</div>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 560, margin: '0 auto' }}>
                <input type="text" name="prenom" autoComplete="given-name" placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle}/>
                <input type="email" name="email" autoComplete="email" required placeholder="votre@email.fr" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, flex: '1 1 220px', minWidth: 200 }}/>
                <button type="submit" disabled={status === 'loading'} style={{
                  padding: '14px 26px', background: '#a8e6cf', color: '#07201a', border: 'none', borderRadius: 4,
                  fontFamily: 'var(--mono, monospace)', fontSize: 13, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase',
                  cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? .7 : 1, whiteSpace: 'nowrap',
                  boxShadow: '0 5px 0 #4aab8f', transition: 'transform .1s, box-shadow .1s',
                }} onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.boxShadow = '0 1px 0 #4aab8f'; }}
                   onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 5px 0 #4aab8f'; }}
                   onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 5px 0 #4aab8f'; }}>
                  {status === 'loading' ? 'Chargement…' : 'Rejoindre ▸'}
                </button>
              </form>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: 520, margin: '16px auto 0', textAlign: 'left', cursor: 'pointer', fontSize: 12.5, lineHeight: 1.5, color: '#cfeee7' }}>
                <input type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); if (e.target.checked && status === 'error') setStatus('idle'); }} style={{ width: 17, height: 17, marginTop: 1, flexShrink: 0, accentColor: '#a8e6cf', cursor: 'pointer' }}/>
                <span>J'accepte d'être prévenu·e par email du lancement du jeu et des nouvelles d'EVAD. Désinscription en un clic.</span>
              </label>
              {status === 'error' && (
                <div style={{ marginTop: 12, fontFamily: 'var(--mono, monospace)', fontSize: 13, fontWeight: 700, color: '#ffd9c2' }}>{errMsg}</div>
              )}
            </>
          )}
          <div style={{ marginTop: 22, fontSize: 11.5, color: '#7ec9b0', opacity: .7 }}>Pas de spam, pas de tracker. Juste le signal de départ.</div>
        </div>
      </div>

      <style>{`
        @keyframes wl-blink { 50% { opacity: 0; } }
        .wl-sprite { display: inline-block; width: 8px; height: 8px; transform: scale(2.4); transform-origin: center; image-rendering: pixelated; }
        /* feuille (vert) */
        .wl-leaf { background: #7fb069; box-shadow:
          8px 0 #7fb069, 0 8px #4aab8f, 8px 8px #4aab8f, 16px 8px #7fb069,
          8px 16px #4aab8f, 16px 16px #4aab8f, 0 16px #018262, 8px 24px #018262; }
        /* cœur (orange) */
        .wl-heart { background: #e8915b; box-shadow:
          16px 0 #e8915b, 8px 8px #c8732a, 24px 8px #c8732a, 0 8px #e8915b, 32px 8px #e8915b,
          8px 16px #c8732a, 16px 16px #c8732a, 24px 16px #c8732a, 16px 24px #a85e20; }
        /* pièce (jaune) */
        .wl-coin { background: #e6c068; box-shadow:
          8px 0 #e6c068, 16px 0 #e6c068, 0 8px #e6c068, 24px 8px #e6c068,
          0 16px #e6c068, 24px 16px #e6c068, 8px 24px #e6c068, 16px 24px #e6c068, 12px 8px #fff3c4; }
        @media (max-width: 560px) { .wl-sprites { gap: 44px; } }
      `}</style>
    </section>
  );
};

window.VisionSection = VisionSection;
window.GameTeaser = GameTeaser;
