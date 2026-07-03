// Landing, Cinematic Minecraft prologue (solarpunk imagination)
// Sits at the very top of the page. Full-bleed image with slow Ken Burns,
// soft vignette, eyebrow + slogan overlay, scroll cue. Smoothly fades into
// the hero via a bottom gradient matching the page background.

const Prologue = ({ onChoose, persona }) => {
  const [picking, setPicking] = React.useState(false);

  const PROFILES = [
    { id: 'pilote',    emoji: '🏡', label: "Je porte un lieu",      sub: "Pilote d'impact" },
    { id: 'batisseur', emoji: '🌿', label: "Je veux agir",          sub: "Bâtisseur d'impact" },
    { id: 'semeur',    emoji: '🌾', label: "Je finance des projets", sub: "Semeur d'impact" },
  ];

  const pick = (id) => {
    if (typeof onChoose === 'function') onChoose(id);
    setPicking(false);
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Track scroll → tag <html> with .over-prologue so NavBar can flip to
  // light-on-dark treatment while the cinematic scene fills the viewport.
  React.useEffect(() => {
    const update = () => {
      const stillOver = window.scrollY < window.innerHeight * 0.85;
      document.documentElement.classList.toggle('over-prologue', stillOver);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      document.documentElement.classList.remove('over-prologue');
    };
  }, []);

  return (
    <section id="prologue" style={{
      position: 'relative',
      height: '100vh', minHeight: 620,
      width: '100%',
      overflow: 'hidden',
      background: '#0d2b22',
      color: '#e8f7f3',
    }}>
      {/* Ken Burns image layer */}
      <div className="mc-bg" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${window.__resources.minecraft})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 55%',
        willChange: 'transform',
      }}/>

      {/* Vignette + bottom fade into page bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(13,43,34,.55) 0%, rgba(13,43,34,0) 22%, rgba(13,43,34,0) 55%, rgba(13,43,34,.45) 88%, rgba(232,247,243,.95) 100%)',
        pointerEvents: 'none',
      }}/>
      {/* Soft radial accent top-right to echo brand glow */}
      <div style={{
        position: 'absolute', top: -120, right: -80, width: 520, height: 520,
        background: 'radial-gradient(circle, rgba(126,201,176,.18), transparent 65%)',
        pointerEvents: 'none',
      }}/>

      {/* Centered overlay content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '88px 24px 24px',
      }}>
        <h1 className="mc-title" style={{
          fontFamily: "'Satoshi',sans-serif", fontWeight: 900,
          fontSize: 'clamp(30px, 4.6vw, 60px)', lineHeight: 1.05,
          letterSpacing: '-.02em',
          margin: 0, marginBottom: 18,
          color: '#fff',
          textShadow: '0 4px 32px rgba(13,43,34,.55), 0 2px 8px rgba(13,43,34,.4)',
          maxWidth: 880,
        }}>
          L'écosystème régénératif de demain,<br/>
          <span style={{
            fontStyle: 'italic', fontWeight: 700, color: '#a8d8c8',
            textShadow: '0 3px 18px rgba(13,43,34,.75), 0 1px 6px rgba(13,43,34,.6)',
          }}>
            prend racine aujourd'hui
          </span>
        </h1>

        {/* Scroll cue */}
        <button
          type="button"
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Découvrir EVAD"
          className="mc-scrollcue"
          style={{
            marginTop: 40,
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            padding: '10px 14px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#e8f7f3',
            fontFamily: "'Satoshi',sans-serif", fontSize: 11, fontWeight: 900,
            letterSpacing: '.22em', textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(13,43,34,.5)',
          }}>
          Envie de passer du virtuel au réel ?
          <span aria-hidden="true" style={{
            width: 22, height: 36, borderRadius: 100,
            border: '1.5px solid rgba(232,247,243,.7)',
            display: 'inline-flex', justifyContent: 'center', paddingTop: 7,
          }}>
            <span style={{
              width: 3, height: 7, borderRadius: 2,
              background: '#e8f7f3',
              animation: 'mc-scroll-dot 1.6s ease-in-out infinite',
            }}/>
          </span>
        </button>
      </div>

      <style>{`
        @keyframes mc-kenburns {
          0%   { transform: scale(1.04) translate3d(0, 0, 0); }
          100% { transform: scale(1.14) translate3d(-1.5%, -2%, 0); }
        }
        @keyframes mc-scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          70%  { transform: translateY(8px); opacity: 0; }
          71%  { transform: translateY(0); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes mc-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        #prologue .mc-bg { animation: mc-kenburns 32s ease-in-out infinite alternate; }
        #prologue .mc-title   { animation: mc-rise 1.1s .35s ease both; }
        #prologue .mc-scrollcue { animation: mc-rise 1.1s .8s ease both; opacity: .9; transition: opacity .2s, transform .2s; }
        #prologue .mc-scrollcue:hover { opacity: 1; transform: translateY(-2px); }
        @media (max-width: 760px) {
          #prologue { /* mobile tweaks */ }
        }
        @media (prefers-reduced-motion: reduce) {
          #prologue .mc-bg { animation: none !important; }
          #prologue .mc-title, #prologue .mc-scrollcue {
            animation: none !important; opacity: 1; transform: none;
          }
        }
      `}</style>
    </section>
  );
};

window.Prologue = Prologue;
