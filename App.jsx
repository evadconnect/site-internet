// Landing, CTA + Footer + App

const BackToTop = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      onClick={() => {
        const el = document.getElementById('inscription');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      aria-label="Revenir à l'inscription"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 80,
        width: 52, height: 52, borderRadius: '50%',
        background: '#018262', color: '#e8f7f3', border: 'none',
        boxShadow: '0 12px 28px rgba(13,43,34,.3), 0 4px 10px rgba(1,130,98,.25)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, lineHeight: 1,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity .25s ease, transform .25s ease, background .2s',
      }}
      onMouseEnter={e => { if (show) e.currentTarget.style.background = '#016b52'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#018262'; }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
    </button>
  );
};

const SocialBtn = ({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener" aria-label={label} style={{
    width: 42, height: 42, borderRadius: '50%',
    background: 'rgba(232,247,243,.1)', border: '1px solid rgba(207,238,231,.22)',
    color: '#e8f7f3',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', transition: 'background .2s, transform .2s, border-color .2s',
  }}
  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,247,243,.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(207,238,231,.4)'; }}
  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,247,243,.1)'; e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(207,238,231,.22)'; }}>
    {children}
  </a>
);

const NEWSLETTER_BY_ROLE = {
  default: {
    eyebrow: 'Quatre fois par an',
    titleA: 'Quatre fois par an,',
    titleB: 'au rythme des saisons.',
    pitch: "Une lettre de saison qui raconte ce qui pousse dans l'écosystème : les nouveaux lieux, les quêtes en cours, ce qu'on a appris, ce qui se sème. Lent, soigné, sans tracker.",
    btn: "🌱 S'inscrire à la newsletter",
    socialTitle: 'Suivez-nous,',
    socialItalic: 'écrivez-nous.',
  },
  pilote: {
    eyebrow: 'Pour votre lieu',
    titleA: 'Pour votre lieu,',
    titleB: 'un rendez-vous saisonnier.',
    pitch: "Recevez chaque saison les nouveaux modules, fiches techniques et retours d'expérience d'autres lieux. De quoi nourrir vos chantiers et faire grandir votre projet sans bruit.",
    btn: "🏡 Recevoir la lettre des lieux",
    socialTitle: 'Rejoignez les autres pilotes,',
    socialItalic: 'partagez vos réussites.',
  },
  batisseur: {
    eyebrow: 'Pour passer à l\'action',
    titleA: 'Vos quêtes de saison,',
    titleB: 'directement dans votre boîte.',
    pitch: "Recevez les quêtes ouvertes près de chez vous, les nouveaux lieux à découvrir et les bons plans graines. Un email par saison, sans tracker.",
    btn: "🌿 Recevoir mes quêtes",
    socialTitle: 'Vibrez avec la communauté,',
    socialItalic: 'suivez les chantiers du réseau.',
  },
  semeur: {
    eyebrow: 'Pour suivre l\'impact',
    titleA: 'Le rapport saisonnier,',
    titleB: "pour mesurer l'impact.",
    pitch: "Recevez chaque saison les chiffres du réseau : graines en circulation, quêtes accomplies, preuves validées, scores REGEN. De quoi orienter vos financements en toute connaissance.",
    btn: "🌾 Recevoir le rapport d'impact",
    socialTitle: 'Suivez les projets que vous soutenez,',
    socialItalic: 'partagez avec votre réseau.',
  },
};

// ─────────── Newsletter : inscription Brevo via fonction Supabase ───────────
// La clé API Brevo reste SECRÈTE côté serveur (variable BREVO_API_KEY dans la
// fonction Edge « brevo-subscribe »). Le site n'appelle que cette fonction.
// → Voir INSTALLATION-newsletter-brevo.md.
const NL_SUPABASE_URL  = 'https://lmhhrccmgebztioesmik.supabase.co';
const NL_SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGhyY2NtZ2VienRpb2VzbWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMjIyOTgsImV4cCI6MjA4MDg5ODI5OH0.epfoBIsZJHLqj96dYE7AvImK_EgjMW9PFtvLk4VwlDc';
const NL_ENDPOINT = NL_SUPABASE_URL + '/functions/v1/brevo-subscribe';

const CTASection = ({ role }) => {
  const copy = (role && NEWSLETTER_BY_ROLE[role]) || NEWSLETTER_BY_ROLE.default;
  const [prenom, setPrenom] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [status, setStatus] = React.useState('idle'); // idle | loading | ok | error
  const [errMsg, setErrMsg] = React.useState('');

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (status === 'loading') return;
    const mail = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
      setStatus('error'); setErrMsg('Merci d’indiquer un email valide.');
      return;
    }
    if (!consent) {
      setStatus('error'); setErrMsg('Merci de cocher la case pour accepter de recevoir la newsletter.');
      return;
    }
    setStatus('loading'); setErrMsg('');
    try {
      const res = await fetch(NL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + NL_SUPABASE_ANON,
          'apikey': NL_SUPABASE_ANON,
        },
        body: JSON.stringify({ email: mail, prenom: prenom.trim(), role: role || null, consent: true }),
      });
      if (!res.ok) {
        let msg = 'Une erreur est survenue. Réessayez dans un instant.';
        let raw = '';
        try { raw = await res.text(); const j = JSON.parse(raw); if (j && j.error) msg = j.error; } catch {}
        console.error('[newsletter] HTTP', res.status, 'depuis', NL_ENDPOINT, '→', raw);
        setStatus('error'); setErrMsg(msg);
        return;
      }
      setStatus('ok'); setPrenom(''); setEmail(''); setConsent(false);
    } catch {
      setStatus('error'); setErrMsg('Connexion impossible. Vérifiez votre réseau.');
    }
  };

  return (
  <section id="cta" style={{
    padding: '120px 24px',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(74,171,143,.25) 0%, transparent 60%), #018262',
    color: '#e8f7f3', textAlign: 'center', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: -100, left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,201,176,.2), transparent 70%)' }}/>
    <div style={{ position: 'absolute', bottom: -100, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,110,168,.15), transparent 70%)' }}/>
    <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
      <div style={{ fontSize: 32, marginBottom: 18, display: 'none' }}>💭 ➡️ 🏡</div>
      <h2 style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-.025em', color: '#e8f7f3', margin: 0, marginBottom: 20 }}>
        {copy.titleA}<br/>
        <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#7ec9b0' }}>{copy.titleB}</span>
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: '#cfeee7', opacity: .9, marginBottom: 36 }}>
        {copy.pitch}
      </p>
      {status === 'ok' ? (
        <div style={{
          maxWidth: 620, margin: '0 auto', background: 'rgba(232,247,243,.1)',
          border: '1px solid rgba(207,238,231,.28)', borderRadius: 14, padding: '24px 26px',
          display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center',
        }}>
          <span aria-hidden="true" style={{ fontSize: 26 }}>🌱</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 700, fontSize: 17, color: '#e8f7f3' }}>Merci, c’est noté&nbsp;!</div>
            <div style={{ fontSize: 14, color: '#cfeee7', opacity: .85 }}>Vous êtes bien inscrit·e à la newsletter. À très vite dans votre boîte mail.</div>
          </div>
        </div>
      ) : (
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 620, margin: '0 auto', background: 'rgba(232,247,243,.08)', border: '1px solid rgba(207,238,231,.2)', borderRadius: 14, padding: 6 }}>
        <input type="text" name="prenom" autoComplete="given-name" placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} style={{
          flex: '1 1 140px', minWidth: 120, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none',
          color: '#e8f7f3', fontFamily: "'Satoshi',sans-serif", fontSize: 15, fontWeight: 500,
        }}/>
        <span style={{ width: 1, alignSelf: 'stretch', background: 'rgba(207,238,231,.18)', margin: '6px 0' }} className="newsletter-sep"/>
        <input type="email" name="email" autoComplete="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{
          flex: '1 1 200px', minWidth: 180, padding: '14px 16px', background: 'transparent', border: 'none', outline: 'none',
          color: '#e8f7f3', fontFamily: "'Satoshi',sans-serif", fontSize: 15, fontWeight: 500,
        }}/>
        <button type="submit" disabled={status === 'loading'} style={{
          padding: '14px 22px', background: '#e8f7f3', color: '#018262', border: 'none', borderRadius: 10,
          fontFamily: "'Satoshi',sans-serif", fontSize: 14, fontWeight: 700,
          cursor: status === 'loading' ? 'wait' : 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? .75 : 1,
          boxShadow: '0 8px 24px rgba(13,43,34,.25)', transition: 'transform .2s, opacity .2s',
        }} onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)'; }}
           onMouseLeave={e => e.currentTarget.style.transform = ''}>
          {status === 'loading' ? 'Inscription…' : "🌱 S'inscrire à la newsletter"}
        </button>
      </form>
      )}
      {status !== 'ok' && (
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: 620, margin: '14px auto 0',
          textAlign: 'left', cursor: 'pointer', fontSize: 13, lineHeight: 1.5, color: '#cfeee7',
        }}>
          <input type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); if (e.target.checked && status === 'error') setStatus('idle'); }} style={{
            width: 18, height: 18, marginTop: 1, flexShrink: 0, accentColor: '#7ec9b0', cursor: 'pointer',
          }}/>
          <span>J’accepte de recevoir la newsletter d’EVAD par email et que mon adresse soit utilisée à cette fin. Je peux me désinscrire à tout moment.</span>
        </label>
      )}
      {status === 'error' && (
        <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: '#ffd9c2' }}>{errMsg}</div>
      )}
      <div style={{ marginTop: 14, fontSize: 12, color: '#cfeee7', opacity: .7 }}>Pas de spam, pas de tracker, désinscription en un clic.</div>

      {/* ─── Réseaux sociaux + contact ─── */}
      <div id="suivre" style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, scrollMarginTop: 80 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <SocialBtn href="https://www.linkedin.com/company/88460539/" label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </SocialBtn>
          <SocialBtn href="https://www.instagram.com/evad_org" label="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </SocialBtn>
          <SocialBtn href="https://www.youtube.com/@EVAD_org" label="YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
          </SocialBtn>
          <SocialBtn href="https://www.tiktok.com/@evad_org" label="TikTok">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09z"/></svg>
          </SocialBtn>
          <span style={{ width: 1, height: 24, background: 'rgba(207,238,231,.2)', margin: '0 6px' }}/>
          <a href="mailto:contact@evad.org" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '12px 20px', borderRadius: 100,
            background: 'rgba(232,247,243,.12)', border: '1px solid rgba(207,238,231,.25)',
            color: '#e8f7f3', fontFamily: "'Satoshi',sans-serif", fontSize: 13, fontWeight: 700,
            textDecoration: 'none', transition: 'background .2s, transform .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,247,243,.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,247,243,.12)'; e.currentTarget.style.transform = ''; }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            Nous contacter
          </a>
        </div>
      </div>

      <style>{`
        #cta input::placeholder { color: rgba(232,247,243,.78); font-weight: 500; }
        @media (max-width: 560px) { .newsletter-sep { display: none; } }
      `}</style>
      <div style={{ display: 'none' }}>
        <span>✓ Association d'intérêt général</span>
        <span>✓ Licence Creative Commons</span>
        <span>✓ Données souveraines</span>
      </div>
    </div>
  </section>
  );
};

const Footer = () => (
  <footer style={{ padding: '72px 24px 32px', background: '#016b52', color: '#cfeee7', position: 'relative', overflow: 'hidden' }}>
    {/* Atmospheric glow */}
    <div style={{ position: 'absolute', top: -120, right: '15%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,201,176,.12), transparent 70%)', pointerEvents: 'none' }}/>
    <div style={{ position: 'absolute', bottom: -120, left: '-5%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,115,42,.08), transparent 70%)', pointerEvents: 'none' }}/>

    <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 40 }} className="footer-grid">
      <div>
        <Logo width={120} fill="#e8f7f3"/>
        <div style={{
          fontFamily: "'Satoshi',sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: '.28em', textTransform: 'uppercase',
          color: '#7ec9b0', marginTop: 12, marginBottom: 18,
        }}>
          Écosystème Vivant Autonome &amp; Décentralisé
        </div>
        <p style={{
          fontFamily: "'Satoshi',sans-serif", fontSize: 18, lineHeight: 1.4,
          color: '#e8f7f3', margin: 0, marginBottom: 22, maxWidth: 340,
          fontStyle: 'italic', fontWeight: 500,
        }}>
          Imaginons un avenir durable et <span style={{ color: '#7ec9b0' }}>réalisons-le ensemble.</span>
        </p>
      </div>
      {[
        { t: 'Découvrir', l: [
          ['Les profils', '#roles'],
          ['Les solutions', '#ecosystem'],
          ['Les piliers', '#foundations'],
          ['La spirale VADE', '#cycle'],
          ['Deva', '#deva'],
        ] },
        { t: "L'association", l: [
          ["L'objet", '#association'],
          ['Devenir membre', 'https://www.helloasso.com/associations/evad-connect/adhesions/devenir-membre-2026'],
          ['Conseil Régénératif', 'https://compte.evad.org/apps/forms/s/3YxDgfMCdPGf8gPyN7bmdM4w'],
          ['Nous contacter', 'mailto:contact@evad.org'],
        ] },
        { t: 'Agir', l: [
          ['Faire un don défiscalisé', 'https://www.helloasso.com/associations/evad-connect/formulaires/1'],
          ['Soutenir en mécène', "mailto:contact@evad.org?subject=Devenir%20mécène%20d'EVAD"],
          ['Coopérer avec nous', 'https://compte.evad.org/apps/forms/s/MFdHsmKzPo9PSK3KjWo4czWn'],
        ] },
        { t: 'Suivre', l: [
          ['Newsletter', '#cta'],
          ['Nous suivre', '#suivre'],
        ] },
      ].map(c => (
        <div key={c.t}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 18 }}>{c.t}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {c.l.map(([label, href]) => {
              const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:'));
              return (
                <li key={label}>
                  <a href={href}
                     {...(isExternal && !href.startsWith('mailto:') ? { target: '_blank', rel: 'noopener' } : {})}
                     style={{
                       fontSize: 13.5, color: '#cfeee7', opacity: .8,
                       textDecoration: 'none', transition: 'opacity .15s, color .15s, transform .15s',
                       display: 'inline-block',
                     }}
                     onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#7ec9b0'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                     onMouseLeave={e => { e.currentTarget.style.opacity = '.8'; e.currentTarget.style.color = '#cfeee7'; e.currentTarget.style.transform = ''; }}>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>

    {/* Empreinte numérique du site · esprit score REGEN */}
    <div style={{ maxWidth: 1180, margin: '52px auto 0', position: 'relative' }}>
      <div style={{
        background: 'rgba(13,43,34,.35)',
        border: '1px solid rgba(126,201,176,.18)',
        borderLeft: '3px solid #7ec9b0',
        borderRadius: 16, padding: '20px 22px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22,
      }}>
        <div style={{ flex: '1 1 260px', minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#7ec9b0', marginBottom: 8 }}>
            <span aria-hidden="true">🌍</span> Empreinte de ce site
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#e8f7f3', margin: 0, opacity: .9 }}>
            Fidèles au score REGEN, nous mesurons aussi notre propre impact numérique, pour le réduire.
          </p>
        </div>
        {[
          { lbl: 'Création du site', sub: 'conception + développement · ponctuel', e: '≈ 1,5 kWh', c: '≈ 0,5 kg CO₂e' },
          { lbl: 'Chaque visite du site', sub: '~1,5 Mo transférés', e: '≈ 1,3 Wh', c: '≈ 0,5 g CO₂e' },
        ].map(m => (
          <div key={m.lbl} style={{
            flex: '1 1 200px', minWidth: 190,
            background: 'rgba(126,201,176,.07)', border: '1px solid rgba(126,201,176,.16)',
            borderRadius: 12, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#e8f7f3', marginBottom: 2 }}>{m.lbl}</div>
            <div style={{ fontSize: 11, color: '#cfeee7', opacity: .6, marginBottom: 11 }}>{m.sub}</div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 15, color: '#a8e6cf' }}><span aria-hidden="true" style={{ fontSize: 13 }}>⚡</span>{m.e}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: 15, color: '#a8e6cf' }}><span aria-hidden="true" style={{ fontSize: 13 }}>🌫️</span>{m.c}</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10.5, lineHeight: 1.45, color: '#7ec9b0', opacity: .6, margin: '10px 2px 0', fontStyle: 'italic' }}>
        Estimations à titre indicatif (ordre de grandeur), dans une démarche de sobriété numérique en amélioration continue.
      </p>
    </div>

    {/* Social row */}
    <div style={{
      maxWidth: 1180, margin: '56px auto 0', position: 'relative',
      paddingTop: 28, borderTop: '1px solid rgba(126,201,176,.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18,
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <SocialBtn href="https://www.linkedin.com/company/88460539/" label="LinkedIn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
        </SocialBtn>
        <SocialBtn href="https://www.instagram.com/evad_org" label="Instagram">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </SocialBtn>
        <SocialBtn href="https://www.youtube.com/@EVAD_org" label="YouTube">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
        </SocialBtn>
        <SocialBtn href="https://www.tiktok.com/@evad_org" label="TikTok">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09z"/></svg>
        </SocialBtn>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', fontSize: 12, color: '#cfeee7', opacity: .6 }}>
        <span>EVAD © 2026</span>
        <span style={{ opacity: .5 }}>·</span>
        <span>Association loi 1901</span>
        <span style={{ opacity: .5 }}>·</span>
        <span>Licence Creative Commons</span>
        <span style={{ opacity: .5 }}>·</span>
        <a href="#prologue" style={{ color: '#7ec9b0', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}
           onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
           onMouseLeave={e => { e.currentTarget.style.opacity = ''; }}>
          Retour en haut
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
        </a>
      </div>
    </div>
    <style>{`
      @media (max-width: 980px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; } }
      @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </footer>
);

// ─────────────────── App ───────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroRole": "pilote",
  "density": "comfortable",
  "palette": "forest",
  "teamLayout": "directory"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [role, setRole] = React.useState(tweaks.heroRole);
  // Persona = explicitly chosen via Deva chat onboarding. Null when reset.
  const [persona, setPersona] = React.useState(() => {
    try { const v = localStorage.getItem('evad.deva.persona'); return (v && v !== 'null') ? v : null; } catch { return null; }
  });
  React.useEffect(() => { setRole(tweaks.heroRole); }, [tweaks.heroRole]);

  // Personnalisation du site depuis le prologue (choix de profil)
  const choosePersona = (id) => {
    if (id) {
      try { localStorage.setItem('evad.deva.persona', id); } catch {}
      setPersona(id);
      setRole(id);
      setTweak('heroRole', id);
    } else {
      try { localStorage.removeItem('evad.deva.persona'); } catch {}
      setPersona(null);
    }
  };

  // density CSS var
  const secPad = tweaks.density === 'compact' ? '64px' : tweaks.density === 'airy' ? '128px' : '96px';

  // observe-in animation
  React.useEffect(() => {
    const els = document.querySelectorAll('[data-fade]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ '--sec-pad': secPad }}>
      <Prologue onChoose={choosePersona} persona={persona}/>
      <Hero role={role} setRole={(r) => { setRole(r); setTweak('heroRole', r); }} palette={tweaks.palette} persona={persona} onChoose={choosePersona}/>
      <div data-fade><Roles onChoose={choosePersona} persona={persona}/></div>
      <div data-fade><EcosystemSection role={persona} onChoose={choosePersona}/></div>
      <div data-fade><FoundationsSection/></div>
      <div data-fade><Cycle role={persona} onChoose={choosePersona}/></div>
      <div data-fade><DevaSection/></div>
      <div data-fade><AssociationSection teamLayout={tweaks.teamLayout}/></div>
      <CTASection role={persona}/>
      <Footer/>
      <BackToTop/>
      <DevaChat
        role={role}
        setRole={(r) => { setRole(r); setTweak('heroRole', r); }}
        onPersonaChange={setPersona}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio
            label="Rôle visible"
            value={tweaks.heroRole}
            onChange={(v) => setTweak('heroRole', v)}
            options={[
              { value: 'pilote', label: '🏡 Pilote' },
              { value: 'batisseur', label: '🌿 Bâtisseur' },
              { value: 'semeur', label: '🌾 Semeur' },
            ]}
          />
          <TweakRadio
            label="Accent CTA"
            value={tweaks.palette}
            onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'forest', label: 'Forest' },
              { value: 'terracotta', label: 'Terracotta' },
              { value: 'sky', label: 'Sky' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Mise en page">
          <TweakRadio
            label="Densité"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'compact', label: 'Compact' },
              { value: 'comfortable', label: 'Confort' },
              { value: 'airy', label: 'Aéré' },
            ]}
          />
          <TweakRadio
            label="Équipe"
            value={tweaks.teamLayout}
            onChange={(v) => setTweak('teamLayout', v)}
            options={[
              { value: 'directory', label: 'Annuaire' },
              { value: 'cards', label: 'Cartes' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>

      <style>{`
        [data-fade] > section { opacity: 0; transform: translateY(20px); transition: opacity .8s ease, transform .8s ease; }
        [data-fade].in > section { opacity: 1; transform: none; }
        a { text-decoration: none; }
        a:hover { opacity: .75; }
        html { scroll-behavior: smooth; }

        /* ───────────── Mobile polish ───────────── */
        @media (max-width: 760px) {
          /* Reduce section padding everywhere */
          section { padding-left: 18px !important; padding-right: 18px !important; }
          [style*="--sec-pad"] section { --sec-pad: 56px !important; }

          /* Hero specifically */
          #hero { padding: 64px 18px 48px !important; min-height: auto !important; }
          #hero .hero-grid { gap: 32px !important; }
          #hero h1 { font-size: clamp(28px, 8vw, 40px) !important; margin-bottom: 18px !important; }
          #hero p { font-size: 16px !important; margin-bottom: 24px !important; }

          /* Navbar: tighter padding + smaller logo + smaller button on small */
          nav { padding: 14px 16px !important; gap: 16px !important; }
          nav > svg, nav > a > svg { transform: scale(.85); transform-origin: left center; }

          /* Section headings & text */
          section h2 { font-size: clamp(24px, 6vw, 32px) !important; margin-bottom: 14px !important; }
          section h3 { font-size: clamp(18px, 4.5vw, 22px) !important; }

          /* Parcours matrix (qui fait quoi), keep horizontal scroll but cleaner */
          .parcours-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }

          /* Ecosystem accordion, tighter padding */
          .eco-grid > div { padding: 0 14px !important; }

          /* Prologue */
          #prologue { height: 88vh !important; min-height: 540px !important; }
          #prologue .mc-title { font-size: clamp(26px, 7vw, 42px) !important; }

          /* Fixed buttons: prevent overlap & give breathing room */
          button[aria-label="Revenir à l'inscription"] { bottom: 20px !important; right: 18px !important; width: 44px !important; height: 44px !important; }
          button[aria-label="Discuter avec Deva"], button[aria-label="Fermer Deva"] {
            bottom: 16px !important; left: 14px !important; right: auto !important; width: 56px !important; height: 68px !important;
          }

          /* Cards inside grids: ensure they don't push viewport */
          [class*="grid"] { min-width: 0; }

          /* Visual blocks: cap height so phones don't get giant images */
          .deva-grid img { max-width: 200px !important; }
        }

        /* Very small screens */
        @media (max-width: 420px) {
          #hero h1 { font-size: 26px !important; }
          section h2 { font-size: 22px !important; }
          #prologue .mc-title { font-size: 26px !important; }
          [data-screen-label], section { padding-left: 14px !important; padding-right: 14px !important; }
        }

        /* Prevent horizontal scroll across the whole page on mobile */
        @media (max-width: 760px) {
          body, html { overflow-x: hidden; }
        }
      `}</style>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
