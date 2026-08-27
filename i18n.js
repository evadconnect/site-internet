/* ============================================================
   i18n.js — Couche de traduction FR → EN (runtime, sans build)
   ------------------------------------------------------------
   Le site est écrit en français dans les composants. Ce fichier
   ajoute une version anglaise SANS toucher aux composants : il
   traduit le DOM après le rendu de React et suit les re-rendus
   via un MutationObserver.

   • Langue par défaut : fr
   • Choix mémorisé dans localStorage ('evad.lang')
   • Bascule = on écrit la langue + on recharge la page
     (reload = état 100 % propre, aucune logique de « dé-traduction »)
   • window.EVAD_LANG    → 'fr' | 'en' (lu par Hero/Deva)
   • window.EVAD_setLang → change la langue et recharge

   Pour ajouter une chaîne : ajoutez « "texte FR": "texte EN" »
   dans TEXTS (contenu visible) ou ATTRS (placeholder/aria/alt/title).
   La correspondance est faite sur le texte FR normalisé
   (espaces compressés + apostrophes droites), donc l'apostrophe
   typographique « ’ » et « ' » sont équivalentes.
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'evad.lang';
  var lang = 'fr';
  try { var s = localStorage.getItem(STORAGE_KEY); if (s === 'en' || s === 'fr') lang = s; } catch (e) {}
  window.EVAD_LANG = lang;

  // Applique la langue au <html> tout de suite (avant le rendu).
  try { document.documentElement.setAttribute('lang', lang); } catch (e) {}

  window.EVAD_setLang = function (l) {
    if (l !== 'fr' && l !== 'en') return;
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
    window.EVAD_LANG = l;
    // Recharge pour repartir d'un DOM français propre puis (re)traduire.
    location.reload();
  };
  window.EVAD_toggleLang = function () {
    window.EVAD_setLang(window.EVAD_LANG === 'en' ? 'fr' : 'en');
  };

  // Titre de l'onglet en anglais, par page (clé = dernier segment de l'URL).
  var TITLES_EN = {
    '': 'EVAD · The regenerative ecosystem connecting places, citizens and funders',
    'index.html': 'EVAD · The regenerative ecosystem connecting places, citizens and funders',
    'mentions-legales.html': 'EVAD · Legal notice & data protection (GDPR)'
  };
  function titleForPage() {
    var seg = (location.pathname || '').split('/').pop();
    return TITLES_EN[seg];
  }

  // ─────────────── Dictionnaire : contenu visible ───────────────
  var TEXTS = {
    // ── Prologue ──
    "L'écosystème régénératif de demain,": "Tomorrow's regenerative ecosystem,",
    "prend racine aujourd'hui": "takes root today",
    "Envie de passer du virtuel au réel ?": "Ready to go from virtual to real?",

    // ── Navigation ──
    "Solutions": "Solutions",
    "Profils": "Profiles",
    "Piliers": "Pillars",
    "Spirale": "Spiral",
    "Deva": "Deva",
    "L'asso": "The nonprofit",
    "Nous soutenir": "Support us",
    "Nous suivre": "Follow us",
    "Se connecter": "Log in",

    // ── Hero ──
    "Écosystème Vivant Autonome & Décentralisé": "Living, Autonomous & Decentralized Ecosystem",
    "Imaginons un avenir durable": "Let's imagine a sustainable future",
    "et réalisons-le ensemble.": "and build it together.",
    "Du pixel à la terre, du rêve au lieu, de l'action à l'impact. Plongez dans un avenir solarpunk et rejoignez le mouvement qui transforme la transition écologique en économie régénérative.": "From pixel to soil, from dream to place, from action to impact. Dive into a solarpunk future and join the movement turning the ecological transition into a regenerative economy.",
    "En savoir plus ↓": "Learn more ↓",

    // ── Carte d'inscription (Hero) ──
    "Bienvenue dans l'écosystème": "Welcome to the ecosystem",
    "S'inscrire à la bêta": "Join the beta",
    "Notre prototype ouvre en": "Our prototype opens",
    "fin d'année à Bordeaux": "late this year in Bordeaux",
    ". Inscrivez-vous pour le tester en avant-première, être convié·e à notre": ". Sign up to test it early, get invited to our",
    "événement de lancement": "launch event",
    "et nous aider à le faire grandir avec vos retours.": "and help it grow with your feedback.",
    "Porteurs de lieu": "Place stewards",
    "Pilote d'impact": "Impact Pilot",
    "Porteur·se d'un tiers-lieu, écolieu, ferme, association, incubateur…": "Steward of a third place, eco-place, farm, nonprofit, incubator…",
    "Coordonner un lieu durable et visible": "Coordinate a sustainable, visible place",
    "Citoyens": "Citizens",
    "Bâtisseur d'impact": "Impact Builder",
    "Membre, particulier, étudiant, digital nomad, entrepreneur…": "Member, individual, student, digital nomad, entrepreneur…",
    "Passer à l'action avec des avantages concrets": "Take action with tangible perks",
    "Financeurs": "Funders",
    "Semeur d'impact": "Impact Sower",
    "Financeur public/privé, investisseur, fondation, collectivité…": "Public/private funder, investor, foundation, local authority…",
    "Soutenir des projets durables vérifiés": "Back verified sustainable projects",
    "Déjà membre ?": "Already a member?",

    // ── Formulaire d'inscription (choix fait) ──
    "Rejoignez la bêta :": "Join the beta:",
    "Changer": "Change",
    "Merci pour votre inscription !": "Thanks for signing up!",
    "Votre demande d'accès": "Your access request",
    "est bien enregistrée. Nous vous contacterons dès l'ouverture de la bêta, en fin d'année, et vous serez convié·e à notre": "has been recorded. We'll contact you as soon as the beta opens, late this year, and you'll be invited to our",
    "Impossible d'enregistrer votre inscription pour le moment. Merci de réessayer dans un instant.": "We couldn't save your sign-up right now. Please try again in a moment.",
    "Enregistrement…": "Saving…",
    "🏡 S'inscrire à la bêta →": "🏡 Join the beta →",
    "🌿 S'inscrire à la bêta →": "🌿 Join the beta →",
    "🌾 S'inscrire à la bêta →": "🌾 Join the beta →",
    "J'accepte qu'EVAD conserve ces informations pour me recontacter au sujet de la bêta. Vos données ne sont jamais revendues.": "I agree that EVAD may keep this information to contact me about the beta. Your data is never resold.",
    "Développer mon lieu": "Grow my place",
    "Trouver ma quête": "Find my quest",
    "Soutenir des projets": "Back projects",

    // ── Connexion ──
    "Bon retour parmi nous.": "Welcome back.",
    "Pas encore de compte ?": "No account yet?",

    // ── Section Profils ──
    "Pour commencer, quel est votre rôle ?": "To begin, what's your role?",
    "Chacun joue un rôle dans le passage": "Everyone plays a part in the shift",
    "de l'imagination à l'action.": "from imagination to action.",
    "L'écosystème EVAD relie ceux qui coordonnent un lieu, ceux qui contribuent par leurs mains, et ceux qui financent contre des preuves d'impact mesurables.": "The EVAD ecosystem connects those who run a place, those who contribute with their hands, and those who fund against measurable proof of impact.",
    "Coordonnez un lieu durable": "Coordinate a sustainable place",
    "Tiers-lieu, écolieu, ferme, association, incubateur. Vous publiez des quêtes, accueillez des Bâtisseurs, vérifiez les preuves d'impact.": "Third place, eco-place, farm, nonprofit, incubator. You post quests, host Builders, and verify proof of impact.",
    "Pilotez et financez vos projets avec des outils numériques intégrés": "Run and fund your projects with integrated digital tools",
    "Rendez vos impacts mesurables et traçables, preuves à l'appui": "Make your impact measurable and traceable, with proof to back it",
    "Transformez vos actions en données probantes pour ancrer votre modèle": "Turn your actions into hard evidence to anchor your model",
    "Personnaliser le site pour les": "Personalize the site for",
    "porteurs de lieu": "place stewards",
    "Passez à l'action": "Take action",
    "Membre, particulier, étudiant, digital nomad, entrepreneur. Vous rejoignez des quêtes concrètes, vous contribuez, et votre engagement vous ouvre l'accès au réseau.": "Member, individual, student, digital nomad, entrepreneur. You join concrete quests, you contribute, and your engagement opens access to the network.",
    "Passez de l'éco-anxiété à l'éco-action, un pas à la fois": "Move from eco-anxiety to eco-action, one step at a time",
    "Soyez reconnu : chaque action est prouvée et valorisée": "Be recognized: every action is proven and valued",
    "Avancez à votre rythme, porté par une communauté qui avance avec vous": "Go at your own pace, carried by a community moving with you",
    "citoyens": "citizens",
    "Soutenez des projets durables": "Back sustainable projects",
    "Financeur public/privé, fondation, investisseur, collectivité. Vous financez des projets contre des preuves d'impact vérifiées.": "Public/private funder, foundation, investor, local authority. You fund projects against verified proof of impact.",
    "Identifiez les initiatives véritablement transformatrices": "Spot the truly transformative initiatives",
    "Assurez-vous d'impacts mesurables, durables et transparents": "Ensure measurable, lasting and transparent impact",
    "Chaque acte investi est tracé, mesuré, et devient une contribution": "Every invested act is tracked, measured, and becomes a contribution",
    "financeurs": "funders",

    // ── Section Solutions / Écosystème ──
    "Concrètement, qu'est-ce que ça change ?": "Concretely, what does it change?",
    "Un écosystème d'outils,": "An ecosystem of tools,",
    "connectés au même compte.": "connected to one account.",
    "Huit solutions, un seul compte. Sélectionnez-en une dans la liste pour comprendre sa contribution au tissu vivant d'EVAD.": "Eight solutions, one account. Pick one from the list to see how it feeds EVAD's living fabric.",
    "Carte de l'écosystème": "Ecosystem map",
    "Tous les profils géolocalisés : pilotes, bâtisseurs, semeurs, avec leur fiche de présentation.": "Every profile mapped: pilots, builders, sowers, each with a presentation page.",
    "Réseau social": "Social network",
    "Un réseau pensé pour l'action collective. Des fils centrés sur les quêtes et les rencontres concrètes entre membres.": "A network built for collective action. Feeds focused on quests and real encounters between members.",
    "Bibliothèque de solutions": "Solutions library",
    "Une bibliothèque vivante où chaque solution trouvée par un lieu devient un savoir partagé pour tous.": "A living library where every solution found by a place becomes shared knowledge for all.",
    "Reconnaissance": "Recognition",
    "Un écosystème où votre engagement est reconnu. En contribuant, vous débloquez des ateliers, des formations, des nuits en écolieu et des savoir-faire partagés du réseau. Ici, on n'achète rien : on ouvre des portes grâce à ce que l'on a apporté au commun. La valeur reste sur le territoire.": "An ecosystem where your engagement is recognized. By contributing, you unlock workshops, trainings, nights in eco-places and shared know-how from the network. Here you buy nothing: you open doors thanks to what you've given to the commons. Value stays on the territory.",
    "Mesure d'impact": "Impact measurement",
    "Chaque lieu affiche sa Vadance, sa promesse d'impact, et sa Vadité, ce qui est déjà prouvé. L'indice de confiance mesure l'écart entre les deux : chaque preuve documentée rapproche la promesse de la réalité.": "Each place shows its Vadance, its impact promise, and its Vadité, what's already proven. The trust index measures the gap between the two: every documented proof brings the promise closer to reality.",
    "Tableau de bord": "Dashboard",
    "Un cockpit pour chaque rôle : contributions, quêtes en cours, financements, indicateurs d'impact. Voir son impact en un coup d'œil et le partager.": "A cockpit for every role: contributions, active quests, funding, impact indicators. See your impact at a glance and share it.",
    "Gestion de projet": "Project management",
    "Un compte unique propulsé par Nextcloud : fichiers, agenda, contacts, visio, tâches. Chiffré de bout en bout, hébergé en France, conforme RGPD : vos données et celles de votre projet sont protégées.": "A single account powered by Nextcloud: files, calendar, contacts, video calls, tasks. End-to-end encrypted, hosted in France, GDPR-compliant: your data and your project's are protected.",
    "Modélisation": "Modeling",
    "Modéliser un lieu dans Minecraft Java avant de poser la première pierre. Co-construire les futurs possibles avec la communauté, bloc par bloc.": "Model a place in Minecraft Java before laying the first stone. Co-build possible futures with the community, block by block.",
    "Apport à l'écosystème": "Contribution to the ecosystem",
    "Le territoire avant l'outil : on commence toujours par un lieu réel.": "Territory before tool: we always start from a real place.",

    // ── Section Piliers ──
    "Mais sur quoi ça repose ?": "But what's it built on?",
    "Quatre piliers pour": "Four pillars for",
    "un nouveau futur.": "a new future.",
    "EVAD s'appuie sur quatre courants novateurs : une vision solarpunk, une boussole régénérative, une gouvernance écocratique, et une gamification au service de l'engagement.": "EVAD draws on four pioneering currents: a solarpunk vision, a regenerative compass, ecocratic governance, and gamification in the service of engagement.",
    "01 · Vision": "01 · Vision",
    "Solarpunk": "Solarpunk",
    "Un mouvement visionnaire à la croisée de la culture, de la science et de l'art, imaginant un avenir positif où l'humanité, la nature et la technologie cohabitent dans une harmonie vivante.": "A visionary movement at the crossroads of culture, science and art, imagining a positive future where humanity, nature and technology coexist in living harmony.",
    "02 · Boussole": "02 · Compass",
    "Économie régénérative": "Regenerative economy",
    "Une économie qui va au-delà de la durabilité afin de restaurer, revitaliser et renforcer les systèmes écologiques, sociaux et économiques en créant des boucles vertueuses de valeur.": "An economy that goes beyond sustainability to restore, revitalize and strengthen ecological, social and economic systems by creating virtuous loops of value.",
    "03 · Gouvernance": "03 · Governance",
    "Écocratie": "Ecocracy",
    "Une gouvernance au service du vivant : des décisions décentralisées, alignées sur les limites planétaires et nourries par l'intelligence collective.": "Governance in the service of the living: decentralized decisions, aligned with planetary boundaries and nourished by collective intelligence.",
    "Quête": "Quest",
    "Preuve": "Proof",
    "Contrib.": "Contrib.",
    "Niveau": "Level",
    "Vadité": "Vadité",
    "Guilde": "Guild",
    "04 · Engagement": "04 · Engagement",
    "Gamification": "Gamification",
    "Des mécaniques de jeu au service de l'impact : quêtes, preuves, Vadance et Vadité transforment chaque action en progression collective tangible et célébrée.": "Game mechanics in the service of impact: quests, proofs, Vadance and Vadité turn every action into tangible, celebrated collective progress.",

    // ── Section Spirale VADE ──
    "Et comment ça fonctionne ?": "And how does it work?",
    "Spirale VADE,": "The VADE spiral,",
    "la spirale partagée.": "the shared spiral.",
    "VADE est la spirale partagée par les": "VADE is the spiral shared by",
    "Pilotes": "Pilots",
    ", les": ",",
    "Bâtisseurs": "Builders",
    "et les": "and",
    "Semeurs": "Sowers",
    // Lettres V A D E : on garde l'initiale, on traduit la suite → Value / Activate / Develop / Extend
    "aloriser,": "alue,",
    "ctiver,": "ctivate,",
    "évelopper,": "evelop,",
    "ssaimer.": "xtend.",
    "un cran plus haut": "one notch higher",
    "SPIRALE": "SPIRAL",
    "VADE": "VADE",
    "Valoriser": "Value",
    "Activer": "Activate",
    "Développer": "Develop",
    "Essaimer": "Extend",
    "Une même spirale pour les trois profils : la valeur circule entre eux et nourrit l'écosystème.": "One spiral for all three profiles: value flows between them and feeds the ecosystem.",
    "Pas besoin de commencer au début": "No need to start at the beginning",
    ": on entre dans la spirale à l'étape qui nous correspond.": ": you enter the spiral at the step that fits you.",
    "Valoriser le potentiel": "Value the potential",
    "Connaître la base : les ressources, les forces et les limites. Ce socle pose la Vadance, la promesse d'impact, ce que le projet s'engage à devenir.": "Know the basics: resources, strengths and limits. This foundation sets the Vadance, the impact promise, what the project commits to becoming.",
    "Activer les solutions": "Activate the solutions",
    "Puiser dans la bibliothèque commune (low-tech, permaculture, gouvernance), générer fiche et tableau de bord. La promesse s'outille et se met en mouvement.": "Draw on the shared library (low-tech, permaculture, governance), generate a profile and dashboard. The promise gets equipped and set in motion.",
    "Développer l'écosystème": "Develop the ecosystem",
    "Mettre les quêtes en ligne, mobiliser la communauté, sécuriser le financement et documenter chaque preuve. La Vadance se change en résultats mesurés sur le terrain.": "Put quests online, mobilize the community, secure funding and document every proof. The Vadance turns into results measured on the ground.",
    "Essaimer preuves et pratiques": "Extend proofs and practices",
    "La promesse devient Vadité. Les apprentissages essaiment dans les communs et relancent la spirale un cran plus haut.": "The promise becomes Vadité. The learnings spread through the commons and relaunch the spiral one notch higher.",

    // ── Section Vadance & Vadité ──
    "Vadance & Vadité": "Vadance & Vadité",
    "Nous ne vendons pas une promesse.": "We don't sell a promise.",
    "Nous prouvons un changement.": "We prove a change.",
    "EVAD mesure l'impact régénératif d'un territoire avec un cadre ouvert : la": "EVAD measures a territory's regenerative impact with an open framework: the",
    "Charte des ICI": "ICI Charter",
    ". Chaque Indicateur de Changement d'Impact mesure une variation réelle, d'une base de départ (T0) vers une référence extérieure. Jamais un état absolu, jamais un chiffre sorti de nulle part.": ". Each Impact Change Indicator measures a real variation, from a starting baseline (T0) toward an external reference. Never an absolute state, never a number out of nowhere.",
    "La promesse et la preuve": "The promise and the proof",
    "La": "The",
    "Vadance": "Vadance",
    "projette ce qu'un lieu s'engage à faire advenir. La": "projects what a place commits to bringing about. The",
    "prouve ce qui a réellement eu lieu, vérifié.": "proves what actually happened, verified.",
    "L'": "The ",
    "indice de confiance": "trust index",
    "(Vadité ÷ Vadance) mesure la capacité d'un lieu à transformer ses promesses en preuves : notre indicateur anti-greenwashing.": "(Vadité ÷ Vadance) measures a place's ability to turn its promises into proof: our anti-greenwashing indicator.",
    "Indice de Confiance · 65%": "Trust Index · 65%",
    "à prouver": "to prove",
    "ce que tu promets": "what you promise",
    "déjà prouvé ✓": "already proven ✓",
    "Transforme tes promesses en preuves 🌱": "Turn your promises into proof 🌱",
    "Dire moins, et le": "Say less, and",
    "prouver.": "prove it.",

    // ── Section Deva ──
    "Enfin, qui vous accompagne ?": "Finally, who's with you?",
    "Deva accompagne,": "Deva guides,",
    "vous prenez les décisions.": "you make the decisions.",
    "Deva est l'esprit régénératif de l'écosystème. Il suggère des quêtes adaptées à votre lieu, repère les preuves manquantes, propose des solutions issues de la bibliothèque.": "Deva is the regenerative spirit of the ecosystem. It suggests quests suited to your place, spots missing proof, and offers solutions from the library.",
    "IA frugale · Écosystème EVAD": "Frugal AI · EVAD ecosystem",
    "✦ DEVA": "✦ DEVA",
    "Bonjour 🌿 Je suis Deva, votre compagnon régénératif dans l'écosystème EVAD. Que puis-je faire pour vous aujourd'hui ?": "Hello 🌿 I'm Deva, your regenerative companion in the EVAD ecosystem. What can I do for you today?",
    "Suggère des solutions": "Suggests solutions",
    "Génère des quêtes": "Generates quests",
    "Vérifie les preuves": "Verifies proof",
    "Met en relation": "Connects people",

    // ── Section Association ──
    "Qui porte le projet ?": "Who's behind the project?",
    "L'association": "The nonprofit",
    "EVAD Connect.": "EVAD Connect.",
    "Un collectif réuni autour du projet EVAD et accessible à toutes et à tous, avec une gouvernance partagée.": "A collective gathered around the EVAD project, open to everyone, with shared governance.",
    "L'objet": "The purpose",
    "L'écosystème EVAD": "The EVAD ecosystem",
    "Faciliter la": "Facilitate the",
    "création et la gestion des lieux durables": "creation and management of sustainable places",
    "grâce à EVAD : des outils, des méthodes, une communauté.": "with EVAD: tools, methods, a community.",
    "EVAD&Vous": "EVAD&You",
    "Sensibiliser de manière": "Raise awareness in a",
    "positive et ludique": "positive, playful way",
    "à la transition écologique grâce à l'évènement EVAD&Vous.": "about the ecological transition through the EVAD&You event.",
    "L'identité": "The identity",
    "Association loi 1901, à but non lucratif.": "French 1901 nonprofit association.",
    "Intérêt général": "Public interest",
    "Reconnue d'intérêt général. Dons défiscalisés jusqu'à 66 %.": "Recognized as serving the public interest. Tax-deductible donations up to 66%.",
    "Gouvernance partagée": "Shared governance",
    "Décisions collectives, inspirées de l'écocratie.": "Collective decisions, inspired by ecocracy.",
    "Communs ouverts": "Open commons",
    "Outils, méthodes et savoirs publiés sous licence Creative Commons.": "Tools, methods and knowledge published under a Creative Commons license.",
    "Accessible à toutes et tous": "Open to everyone",
    "Ouverte à toute personne qui veut s'engager.": "Open to anyone who wants to get involved.",
    "Le collectif": "The collective",
    "Pilotage stratégique": "Strategic steering",
    "Bureau": "Board",
    "3 pers.": "3 people",
    "Définit les orientations, vote les budgets, veille au respect de l'objet social.": "Sets the direction, votes the budgets, ensures the mission is upheld.",
    "Président": "President",
    "Depuis le premier jour, je porte une conviction : on change le monde en faisant, pas en attendant. EVAD, c'est notre terrain de jeu pour imaginer et bâtir le monde de demain, ensemble.": "From day one I've held one conviction: we change the world by doing, not by waiting. EVAD is our playground to imagine and build tomorrow's world, together.",
    "Trésorier": "Treasurer",
    "Je veille à ce que chaque euro serve un impact réel. La transparence, c'est la première graine de la confiance.": "I make sure every euro serves real impact. Transparency is the first seed of trust.",
    "Secrétaire": "Secretary",
    "Mon rôle, c'est de garder le cap collectif et de fluidifier nos décisions. Une association bien tenue, c'est une association qui dure.": "My role is to keep the collective on course and smooth our decisions. A well-run nonprofit is one that lasts.",
    "Tech & partenariats": "Tech & partnerships",
    "Équipe": "Team",
    "4 pers.": "4 people",
    "Font vivre les outils, l'infrastructure et les partenariats au service de l'écosystème.": "They keep the tools, infrastructure and partnerships alive in the service of the ecosystem.",
    "Partenariats": "Partnerships",
    "Je tisse les liens entre EVAD et celles et ceux qui partagent nos valeurs et conviction. C'est grâce à la confiance et l'audace collective que naissent les plus belles réussites.": "I weave the links between EVAD and those who share our values and conviction. It's through trust and collective daring that the finest successes are born.",
    "Réseau & Support IT": "Network & IT support",
    "Je m'assure que les outils tournent et que le réseau tienne. La sobriété technique, c'est aussi de l'écologie.": "I make sure the tools run and the network holds. Technical sobriety is ecology too.",
    "IA & Data": "AI & Data",
    "Je mets l'IA et la donnée au service du vivant, pas l'inverse : frugales, utiles, au plus près du terrain.": "I put AI and data at the service of the living, not the other way around: frugal, useful, close to the ground.",
    "Communication": "Communication",
    "Je raconte EVAD pour donner envie d'agir. Les belles histoires sont celles qu'on écrit à plusieurs.": "I tell EVAD's story to make people want to act. The best stories are the ones we write together.",
    "Chercheur·es et expert·es": "Researchers and experts",
    "Conseil Régénératif": "Regenerative Council",
    "2 pers.": "2 people",
    "Apporte un regard scientifique et expert sur les outils et les méthodes, pour rester à la hauteur des enjeux.": "Brings a scientific, expert eye to the tools and methods, to stay equal to the stakes.",
    "Rejoindre le Conseil": "Join the Council",
    "J'apporte la rigueur de l'économie régénérative pour que l'impact ne soit jamais un slogan, mais une mesure.": "I bring the rigor of regenerative economics so impact is never a slogan, but a measure.",
    "Perma-comptabilité": "Perma-accounting",
    "La perma-comptabilité, c'est compter ce qui compte vraiment : le vivant, et pas seulement l'argent.": "Perma-accounting means counting what truly counts: the living, not just money.",
    "Communauté engagée": "Engaged community",
    "Membres": "Members",
    "10+ pers.": "10+ people",
    "Personnes qui adhèrent à l'association, votent en assemblée générale et co-construisent l'écosystème.": "People who join the nonprofit, vote at the general assembly and co-build the ecosystem.",
    "Devenir membre": "Become a member",
    "Le mot des membres": "A word from the members",
    "Nous sommes citoyennes et citoyens des quatre coins de France, réunis par une même envie : agir concrètement pour le vivant. Chacun apporte sa pierre, et ensemble nous faisons grandir EVAD.": "We are citizens from every corner of France, united by one desire: to act concretely for the living. Each brings their stone, and together we grow EVAD.",
    "Les membres d'EVAD Connect": "The members of EVAD Connect",

    // ── Section Agir ──
    "Comment agir ?": "How to act?",
    "Faire un don": "Make a donation",
    "Chaque euro finance des": "Every euro funds",
    "impacts vérifiés par le Conseil Régénératif": "impacts verified by the Regenerative Council",
    ", pas de greenwashing. Don défiscalisé à": ", no greenwashing. Tax-deductible donation at",
    ": 100 € ne vous coûtent que 34 €.": ": €100 costs you only €34.",
    "Donner": "Donate",
    "Soutenir en mécène": "Support as a patron",
    "Entreprises et grands donateurs, soutenez EVAD dans la": "Companies and major donors, support EVAD for the",
    "durée": "long haul",
    ". Construisons ensemble un partenariat de mécénat sur mesure, aligné sur vos engagements RSE.": ". Let's build a tailored patronage partnership together, aligned with your CSR commitments.",
    "Envoyer un email": "Send an email",
    "Coopérer avec nous": "Cooperate with us",
    "Partager": "Share",
    "ressources, retours d'expérience et co-développement": "resources, feedback and co-development",
    "entre acteurs, pour bâtir un écosystème numérique robuste au service des territoires en transition.": "between players, to build a robust digital ecosystem serving territories in transition.",
    "Se proposer": "Get in touch",

    // ── Newsletter (CTA) ──
    "Quatre fois par an,": "Four times a year,",
    "au rythme des saisons.": "in rhythm with the seasons.",
    "Une lettre de saison qui raconte ce qui pousse dans l'écosystème : les nouveaux lieux, les quêtes en cours, ce qu'on a appris, ce qui se sème. Lent, soigné, sans tracker.": "A seasonal letter about what's growing in the ecosystem: new places, ongoing quests, what we've learned, what's being sown. Slow, careful, tracker-free.",
    "🌱 S'inscrire à la newsletter": "🌱 Subscribe to the newsletter",
    "J'accepte de recevoir la newsletter d'EVAD par email et que mon adresse soit utilisée à cette fin. Je peux me désinscrire à tout moment.": "I agree to receive EVAD's newsletter by email and for my address to be used for this purpose. I can unsubscribe at any time.",
    "Pas de spam, pas de tracker, désinscription en un clic.": "No spam, no tracker, one-click unsubscribe.",
    "Nous contacter": "Contact us",
    "Inscription…": "Subscribing…",
    "Merci, c'est noté !": "Thanks, noted!",
    "Vous êtes bien inscrit·e à la newsletter. À très vite dans votre boîte mail.": "You're subscribed to the newsletter. See you very soon in your inbox.",
    "Merci d'indiquer un email valide.": "Please enter a valid email.",
    "Merci de cocher la case pour accepter de recevoir la newsletter.": "Please tick the box to agree to receive the newsletter.",
    "Une erreur est survenue. Réessayez dans un instant.": "Something went wrong. Please try again in a moment.",
    "Connexion impossible. Vérifiez votre réseau.": "Connection failed. Check your network.",

    // Newsletter, variantes par profil (affichées si un profil est choisi)
    "Pour votre lieu,": "For your place,",
    "un rendez-vous saisonnier.": "a seasonal rendezvous.",
    "Recevez chaque saison les nouveaux modules, fiches techniques et retours d'expérience d'autres lieux. De quoi nourrir vos chantiers et faire grandir votre projet sans bruit.": "Each season, receive new modules, technical sheets and feedback from other places. Enough to feed your projects and grow yours quietly.",
    "🏡 Recevoir la lettre des lieux": "🏡 Get the places letter",
    "Vos quêtes de saison,": "Your seasonal quests,",
    "directement dans votre boîte.": "straight to your inbox.",
    "Recevez les quêtes ouvertes près de chez vous, les nouveaux lieux à découvrir et les bons plans du réseau. Un email par saison, sans tracker.": "Receive open quests near you, new places to discover and the network's good tips. One email per season, no tracker.",
    "🌿 Recevoir mes quêtes": "🌿 Get my quests",
    "Le rapport saisonnier,": "The seasonal report,",
    "pour mesurer l'impact.": "to measure impact.",
    "Recevez chaque saison les chiffres du réseau : contributions en circulation, quêtes accomplies, preuves validées, Vadité des lieux. De quoi orienter vos financements en toute connaissance.": "Each season, receive the network's figures: contributions in circulation, quests completed, validated proofs, places' Vadité. Enough to guide your funding with full knowledge.",
    "🌾 Recevoir le rapport d'impact": "🌾 Get the impact report",

    // ── Footer ──
    "Imaginons un avenir durable et": "Let's imagine a sustainable future and",
    "réalisons-le ensemble.": "build it together.",
    "Découvrir": "Discover",
    "Les profils": "Profiles",
    "Les solutions": "Solutions",
    "Les piliers": "Pillars",
    "La spirale VADE": "The VADE spiral",
    "Agir": "Act",
    "Faire un don défiscalisé": "Make a tax-deductible donation",
    "Suivre": "Follow",
    "Newsletter": "Newsletter",
    "Empreinte de ce site": "This site's footprint",
    "Nous mesurons aussi notre propre impact numérique.": "We measure our own digital impact too.",
    "Création du site": "Building the site",
    "conception + développement · ponctuel": "design + development · one-off",
    "≈ 1,5 kWh": "≈ 1.5 kWh",
    "≈ 0,5 kg CO₂e": "≈ 0.5 kg CO₂e",
    "Chaque visite du site": "Each site visit",
    "~1,5 Mo transférés": "~1.5 MB transferred",
    "≈ 1,3 Wh": "≈ 1.3 Wh",
    "≈ 0,5 g CO₂e": "≈ 0.5 g CO₂e",
    "Estimations à titre indicatif (ordre de grandeur), dans une démarche de sobriété numérique en amélioration continue.": "Indicative estimates (order of magnitude), part of an ongoing effort toward digital sobriety.",
    "Association loi 1901": "1901 nonprofit association",
    "Licence Creative Commons": "Creative Commons license",
    "Mentions légales & RGPD": "Legal notice & GDPR",
    "Retour en haut": "Back to top",

    // ── Bandeau cookies ──
    "Ce site n'utilise que des": "This site uses only",
    "cookies strictement nécessaires": "strictly necessary cookies",
    "à son fonctionnement. Aucun traceur publicitaire ni statistique : rien à accepter ou refuser.": "to function. No advertising or analytics tracker: nothing to accept or decline.",
    "En savoir plus": "Learn more",
    "J'ai compris": "Got it",

    // ── Deva : bulle + panneau ──
    "Bonjour ! Une question sur EVAD ? Cliquez ici, je vous réponds.": "Hi! A question about EVAD? Click here, I'll answer.",
    "En ligne · IA frugale": "Online · frugal AI",
    "Empreinte de cette conversation": "This conversation's footprint",
    "Énergie": "Energy",
    "Eau": "Water",
    "CO₂e": "CO₂e",
    "Chaque question à une IA a un coût réel en énergie, en eau et en carbone. Deva s'appuie sur un modèle frugal et des réponses courtes pour le limiter. Privilégiez des questions précises 🌿": "Every question to an AI has a real cost in energy, water and carbon. Deva relies on a frugal model and short answers to keep it low. Favor precise questions 🌿",
    "🌱 Compenser mon empreinte": "🌱 Offset my footprint",
    "💡 Suggérer une amélioration": "💡 Suggest an improvement",
    "Suggestions": "Suggestions",
    "Comment référencer mon lieu ?": "How do I list my place?",
    "Quelles quêtes me correspondent ?": "Which quests suit me?",
    "Comment financer un projet ?": "How do I fund a project?",
    "Comment fonctionne la Vadité ?": "How does Vadité work?",
    "Comment fonctionnent les contributions ?": "How do contributions work?",
    "Bonjour ! Je suis Deva, l'assistant IA d'EVAD (l'esprit régénératif de l'écosystème). Explorez le site librement, je reste là pour répondre à vos questions.": "Hi! I'm Deva, EVAD's AI assistant (the regenerative spirit of the ecosystem). Explore the site freely, I'm here to answer your questions.",
    "Ravi de vous revoir 🌿 Vous êtes Porteur de lieu. Une question sur l'écosystème ?": "Great to see you again 🌿 You're a Place steward. A question about the ecosystem?",
    "Ravi de vous revoir 🌿 Vous êtes Citoyen. Une question sur l'écosystème ?": "Great to see you again 🌿 You're a Citizen. A question about the ecosystem?",
    "Ravi de vous revoir 🌿 Vous êtes Financeur. Une question sur l'écosystème ?": "Great to see you again 🌿 You're a Funder. A question about the ecosystem?",
    "Pas de souci. Posez-moi n'importe quelle question sur EVAD.": "No problem. Ask me anything about EVAD.",
    "On recommence : qui êtes-vous ?": "Let's start over: who are you?",
    "Je n'ai pas pu répondre, réessayez dans un instant.": "I couldn't answer, please try again in a moment.",
    "🌿 On a bien échangé ! Si vous souhaitez équilibrer l'empreinte de notre conversation, voici quelques gestes concrets. Et côté sobriété, des questions précises suffisent souvent 🌱": "🌿 We've had a good chat! If you'd like to balance out our conversation's footprint, here are a few concrete actions. And for sobriety, precise questions often do the trick 🌱",
    "🌳 Soutenir un lieu pilote": "🌳 Support a pilot place",
    "🌱 Devenir membre & agir": "🌱 Become a member & act",
    "☀️ D'autres façons d'agir": "☀️ Other ways to act",
    "Qu'est-ce qui vous a manqué sur cette page ?": "What did you miss on this page?",
    "Si vous pouviez changer une chose, ce serait quoi ?": "If you could change one thing, what would it be?",
    "Une dernière idée folle pour faire grandir EVAD ?": "One last wild idea to grow EVAD?",
    "🌿 Merci, votre retour compte. Chaque contribution nourrit la prochaine version d'EVAD. Vous pouvez continuer la conversation ou refermer la fenêtre.": "🌿 Thank you, your feedback matters. Every contribution feeds the next version of EVAD. You can keep chatting or close the window.",

    // ─────────── Vues personnalisées par profil ───────────
    // Bouton bascule (section Profils)
    "Site personnalisé pour les": "Personalized site for",
    "Revenir à la vue générale": "Back to the general view",

    // Badge + accroches personnalisées (section Solutions)
    "Pour vous,": "For you,",
    "Pilote": "Pilot",
    "Bâtisseur": "Builder",
    "Semeur": "Sower",
    "Visualisez votre territoire, mesurez votre impact, suivez vos quêtes.": "Visualize your territory, measure your impact, track your quests.",
    "Trouvez vos quêtes, échangez vos contributions, apprenez du commun.": "Find your quests, exchange your contributions, learn from the commons.",
    "Mesurez les impacts, cartographiez les projets, suivez votre portefeuille.": "Measure impacts, map the projects, track your portfolio.",

    // « Apport à l'écosystème » par outil (le premier est déjà plus haut)
    "Les liens humains comme infrastructure : sans relations, pas de durabilité.": "Human bonds as infrastructure: without relationships, no sustainability.",
    "La mémoire commune : ce qui marche quelque part peut servir partout.": "The shared memory: what works somewhere can serve everywhere.",
    "On ne paie pas, on reconnaît : ce que vous apportez au commun vous ouvre le réseau.": "You don't pay, you're recognized: what you give to the commons opens the network to you.",
    "Mesurer pour rendre crédible : promesse affichée, preuves vérifiées.": "Measure to build credibility: promise stated, proof verified.",
    "Piloter à hauteur d'humain : votre lieu, votre rôle, votre trajectoire.": "Steering on a human scale: your place, your role, your path.",
    "Souveraineté numérique : vos données restent les vôtres, sur une infrastructure libre.": "Digital sovereignty: your data stays yours, on free and open infrastructure.",
    "Projeter avant d'agir : un jeu sérieux pour rêver le lieu ensemble.": "Envision before acting: a serious game to dream the place together.",

    // Descriptions par outil ET par profil (roleDesc)
    "Rendez votre lieu visible des bâtisseurs et financeurs de votre biorégion. Une fiche, des photos, vos quêtes ouvertes.": "Make your place visible to the builders and funders of your bioregion. A profile, photos, your open quests.",
    "Trouvez les lieux durables près de chez vous, filtrez par activité (permaculture, low-tech, hébergement) et engagez-vous.": "Find the sustainable places near you, filter by activity (permaculture, low-tech, lodging) and get involved.",
    "Cartographiez les projets à soutenir, filtrez par biorégion, Vadité ou thématique avant d'engager vos fonds.": "Map the projects to support, filter by bioregion, Vadité or theme before committing your funds.",
    "Animez votre communauté locale : publiez vos quêtes, partagez l'avancée des chantiers, fédérez vos bâtisseurs réguliers.": "Energize your local community: post your quests, share project progress, rally your regular builders.",
    "Discutez avec les porteurs de lieu, posez vos questions avant de partir, retrouvez d'autres bâtisseurs de votre coin.": "Chat with place stewards, ask your questions before setting off, find other builders in your area.",
    "Suivez l'actualité concrète des projets que vous financez : avancées, photos, témoignages des bâtisseurs.": "Follow the concrete news of the projects you fund: progress, photos, builders' testimonials.",
    "Puisez dans les fiches techniques éprouvées (permaculture, low-tech, gouvernance) et documentez vos propres réussites pour les autres lieux.": "Draw on proven technical sheets (permaculture, low-tech, governance) and document your own successes for other places.",
    "Apprenez gratuitement les techniques régénératives, fiche par fiche, et formez-vous avant ou pendant vos quêtes.": "Learn regenerative techniques for free, sheet by sheet, and train yourself before or during your quests.",
    "Identifiez les solutions à fort impact qui méritent d'être financées et essaimées sur d'autres territoires.": "Identify the high-impact solutions worth funding and spreading to other territories.",
    "Proposez vos ateliers, hébergements et formations contre des contributions. Une nouvelle ressource, ancrée localement.": "Offer your workshops, lodging and trainings in exchange for contributions. A new resource, locally rooted.",
    "Gagnez des contributions en accomplissant des quêtes, échangez-les contre des ateliers, nuits en yourte ou formations dans le réseau.": "Earn contributions by completing quests, exchange them for workshops, yurt nights or trainings across the network.",
    "Soutenez la circulation locale en abondant les pots de contributions : votre euro reste sur le territoire au lieu de fuir.": "Support local circulation by topping up the contribution pots: your euro stays on the territory instead of leaking away.",
    "Affichez la Vadance de votre lieu et faites-la monter en Vadité : chaque preuve documentée rend vos progrès crédibles auprès des financeurs et des bâtisseurs.": "Show your place's Vadance and raise it toward Vadité: every documented proof makes your progress credible to funders and builders.",
    "Voyez la Vadité réelle des lieux où vous allez agir : ce qui est déjà prouvé, leur indice de confiance, leur trajectoire.": "See the real Vadité of the places where you'll act: what's already proven, their trust index, their trajectory.",
    "Financez les lieux qui transforment leur Vadance en Vadité, et suivez l'indice de confiance de votre portefeuille.": "Fund the places that turn their Vadance into Vadité, and track your portfolio's trust index.",
    "Pilotez votre lieu en un coup d'œil : quêtes ouvertes, preuves en attente, financements reçus, Vadité en évolution.": "Steer your place at a glance: open quests, pending proofs, funding received, Vadité on the move.",
    "Suivez vos contributions, vos quêtes en cours, vos preuves validées et vos apports à la bibliothèque commune.": "Track your contributions, your ongoing quests, your validated proofs and your inputs to the shared library.",
    "Visualisez votre portefeuille d'impact : fonds engagés, preuves reçues, Vadité agrégée de vos projets soutenus.": "Visualize your impact portfolio: funds committed, proofs received, aggregated Vadité of the projects you back.",
    "Gérez tout votre lieu sur un compte souverain : agenda, contacts bâtisseurs, fichiers chantier, visios, tâches d'équipe.": "Run your whole place on a sovereign account: calendar, builder contacts, project files, video calls, team tasks.",
    "Stockez vos preuves, photos et notes de chantier sur un compte chiffré et libre, en France.": "Store your proofs, photos and field notes on an encrypted, free and open account, in France.",
    "Centralisez vos dossiers de financement, conventions et reportings sur une infrastructure souveraine et conforme RGPD.": "Centralize your funding files, agreements and reports on a sovereign, GDPR-compliant infrastructure.",
    "Maquettez votre lieu en voxel avec votre communauté avant les travaux : teste d'aménagements, validation collective, économie d'erreurs.": "Prototype your place in voxels with your community before construction: layout tests, collective validation, fewer costly mistakes.",
    "Plongez dans les futurs possibles, contribuez aux maquettes des lieux que vous rejoindrez, apprenez le design solarpunk.": "Dive into possible futures, contribute to the models of the places you'll join, learn solarpunk design.",
    "Visualisez en 3D les projets avant d'investir : comprenez l'ambition, le contexte et l'usage prévu d'un lieu avant de financer.": "Visualize projects in 3D before investing: grasp the ambition, context and intended use of a place before funding.",

    // Spirale VADE personnalisée (section Spirale)
    "vécue en": "lived as an",
    "Voici les quatre étapes telles que vous,": "Here are the four steps as you,",
    ", les traversez. La même spirale nourrit aussi les autres profils, la valeur circule.": ", go through them. The same spiral also feeds the other profiles; value flows.",
    "Vue adaptée à votre profil": "View adapted to your",
    ". La spirale reste la même, vos actions changent.": ". The spiral stays the same, your actions change.",
    "Vous êtes libre d'y entrer à n'importe quelle étape": "You're free to enter it at any step",
    ", selon là où vous en êtes.": ", depending on where you stand.",
    "Diagnostiquer les ressources, les forces et les limites de votre lieu. Ce socle pose votre Vadance : la promesse d'impact que votre lieu s'engage à tenir.": "Diagnose the resources, strengths and limits of your place. This foundation sets your Vadance: the impact promise your place commits to keeping.",
    "Puiser dans la bibliothèque commune (low-tech, permaculture, gouvernance), générer la fiche de votre lieu et son tableau de bord. Votre promesse s'outille.": "Draw on the shared library (low-tech, permaculture, governance), generate your place's profile and dashboard. Your promise gets equipped.",
    "Publier vos quêtes, mobiliser les Bâtisseurs, sécuriser les financements des Semeurs, documenter chaque preuve sur le terrain.": "Post your quests, mobilize the Builders, secure funding from the Sowers, document every proof in the field.",
    "Votre Vadance devient Vadité : un score vérifié, lisible par les financeurs. Vos apprentissages rejoignent les communs et votre lieu repart un cran plus haut.": "Your Vadance becomes Vadité: a verified score, legible to funders. Your learnings join the commons and your place sets off one notch higher.",
    "Identifier vos compétences, vos envies, ce que vous voulez apporter aux lieux qui vous entourent. Votre profil devient votre promesse de contribution.": "Identify your skills, your wishes, what you want to bring to the places around you. Your profile becomes your contribution promise.",
    "Explorer la bibliothèque, découvrir les solutions et les cartes compétences, vous former aux pratiques régénératives éprouvées.": "Explore the library, discover the solutions and skill cards, and train yourself in proven regenerative practices.",
    "Entreprendre les missions des lieux, contribuer sur le terrain, créditer vos contributions, documenter vos réalisations.": "Take on the places' missions, contribute in the field, credit your contributions, document your achievements.",
    "Vos contributions vérifiées construisent votre parcours. Transmettre, devenir référent, porter les pratiques vers d'autres lieux, et reprendre la spirale un cran plus haut.": "Your verified contributions build your journey. Pass it on, become a reference, carry practices to other places, and pick the spiral back up one notch higher.",
    "Lire la Vadance des lieux : une promesse d'impact structurée, comparable, adossée à des indicateurs, pas une plaquette.": "Read the places' Vadance: a structured, comparable impact promise backed by indicators, not a brochure.",
    "Flécher votre financement vers des solutions et des quêtes précises, avec une visibilité directe sur ce que votre apport déclenche.": "Direct your funding toward specific solutions and quests, with direct visibility into what your contribution triggers.",
    "Suivre en continu les résultats mesurés sur le terrain : chaque preuve documentée alimente le tableau de bord de votre portefeuille de lieux.": "Continuously track the results measured in the field: every documented proof feeds the dashboard of your portfolio of places.",
    "La Vadité consolide ce qui a été tenu. Comparer promesse et réalisation, capitaliser les enseignements, réinvestir un cran plus haut.": "Vadité consolidates what has been delivered. Compare promise and outcome, capitalize on the lessons, reinvest one notch higher.",

    // ─────────── Maquettes d'outils (section Solutions, ToolVisual) ───────────
    // Reconnaissance (grille de ressources)
    "Ressources du réseau": "Network resources",
    "Par type": "By type",
    "À proximité": "Nearby",
    "Atelier réparation": "Repair workshop",
    "Nuit en écolieu": "Night at an eco-place",
    "Outils partagés": "Shared tools",
    "Formation": "Training",
    "Four à pain": "Bread oven",
    "Serre & semences": "Greenhouse & seeds",
    "L'Atelier du Val": "The Valley Workshop",
    "Ferme des Colibris": "Hummingbird Farm",
    "La Commune Verte": "The Green Commons",
    "Le Champ des Possibles": "The Field of Possibilities",
    "Le Fournil Partagé": "The Shared Bakehouse",
    "Les Serres du Coteau": "The Hillside Greenhouses",
    // Mesure d'impact (graphique Vadance/Vadité)
    "📈 Indice de confiance · 65%": "📈 Trust index · 65%",
    "ton objectif": "your target",
    // Tableau de bord (cockpit)
    "TABLEAU DE BORD · SARA · BÂTISSEUSE": "DASHBOARD · SARA · BUILDER",
    "Vue d'ensemble": "Overview",
    "quêtes en cours": "active quests",
    "preuves validées": "validated proofs",
    "contributions BDD": "library contributions",
    "CONTRIBUTIONS · 6 DERNIERS MOIS": "CONTRIBUTIONS · LAST 6 MONTHS",
    "Déc": "Dec",
    "Fév": "Feb",
    "Avr": "Apr",
    "Mai": "May",
    "+12 sur 6 mois": "+12 over 6 months",
    "PROCHAINES QUÊTES": "UPCOMING QUESTS",
    "Phytoépuration · samedi": "Phytopurification · Saturday",
    "Atelier permaculture · 23 mai": "Permaculture workshop · 23 May",
    "Récolte miel · juin": "Honey harvest · June",
    // Gestion de projet (Nextcloud)
    "Sara · Bâtisseuse · 28 🌱": "Sara · Builder · 28 🌱",
    "Fichiers": "Files",
    "Agenda": "Calendar",
    "Coffre": "Vault",
    "Réglages": "Settings",
    "Propulsé par": "Powered by",
    "🇫🇷 Hébergement souverain": "🇫🇷 Sovereign hosting",

    // ── Bloc caché (badges de confiance) ──
    "✓ Association d'intérêt général": "✓ Public-interest nonprofit",
    "✓ Licence Creative Commons": "✓ Creative Commons license",
    "✓ Données souveraines": "✓ Sovereign data",

    // ── Étiquette de profil dans la nav ──
    "Vue porteurs de lieu": "Place stewards view",
    "Vue citoyens": "Citizens view",
    "Vue financeurs": "Funders view",

    // ═════════ Page « Mentions légales » (mentions-legales.html) ═════════
    "Retour à l'accueil": "Back to home",
    "Retour à l'accueil →": "Back to home →",
    "Informations légales": "Legal information",
    "Mentions légales &": "Legal notice &",
    "protection des données": "data protection",
    "Éditeur, hébergement et politique de traitement des données personnelles (RGPD) applicables au site EVAD.": "Publisher, hosting and personal-data processing policy (GDPR) applicable to the EVAD site.",
    "1 · Éditeur": "1 · Publisher",
    "2 · Hébergeur": "2 · Host",
    "3 · Propriété intellectuelle": "3 · Intellectual property",
    "4 · Responsabilité": "4 · Liability",
    "5 · Données personnelles (RGPD)": "5 · Personal data (GDPR)",
    "6 · Cookies": "6 · Cookies",
    "7 · Vos droits": "7 · Your rights",
    "8 · Contact": "8 · Contact",
    "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) et au Règlement général sur la protection des données (RGPD, UE 2016/679), les informations ci-dessous précisent l'identité de l'éditeur du site, de son hébergeur et les conditions de traitement de vos données personnelles.": "In accordance with French Act No. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN) and the General Data Protection Regulation (GDPR, EU 2016/679), the information below sets out the identity of the site's publisher and host and the conditions under which your personal data is processed.",
    "Éditeur du site": "Site publisher",
    "Le présent site est édité par :": "This site is published by:",
    "Dénomination": "Name",
    "Forme juridique": "Legal form",
    "Association loi 1901 à but non lucratif, reconnue d'intérêt général": "French 1901 non-profit association, recognized as serving the public interest",
    "Objet": "Purpose",
    "Écosystème régénératif reliant lieux durables, citoyens et financeurs": "Regenerative ecosystem connecting sustainable places, citizens and funders",
    "Siège social": "Registered office",
    "(en cours de déménagement à Bordeaux)": "(currently relocating to Bordeaux)",
    "N° RNA": "RNA No.",
    "N° SIRET": "SIRET No.",
    "Code APE": "APE code",
    "Directeur de la publication": "Publication director",
    "Hébergement": "Hosting",
    "Le site est hébergé par :": "The site is hosted by:",
    "Hébergeur": "Host",
    "Adresse": "Address",
    "61 Lordou Vironos Street, 6023 Larnaca, Chypre": "61 Lordou Vironos Street, 6023 Larnaca, Cyprus",
    "Localisation des serveurs": "Server location",
    "Union européenne": "European Union",
    "Site": "Website",
    "Propriété intellectuelle": "Intellectual property",
    "Sauf mention contraire, la méthode de mesure d'impact d'EVAD (Charte des ICI, spirale VADE, référentiel Vadance / Vadité) est publiée comme un": "Unless stated otherwise, EVAD's impact-measurement method (ICI Charter, VADE spiral, Vadance / Vadité framework) is published as a",
    "commun : publique, inspectable et amendable": "commons: public, inspectable and amendable",
    ", sous licence Creative Commons. La marque « EVAD », le logo, la mascotte Deva et les éléments graphiques distinctifs restent la propriété de l'association EVAD Connect.": ", under a Creative Commons license. The \"EVAD\" trademark, the logo, the Deva mascot and the distinctive graphic elements remain the property of the EVAD Connect association.",
    "Toute reproduction ou réutilisation doit respecter les conditions de la licence applicable et créditer la source. Pour tout autre usage, contactez-nous à": "Any reproduction or reuse must comply with the applicable license terms and credit the source. For any other use, contact us at",
    "Responsabilité": "Liability",
    "EVAD s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Les exemples chiffrés à visée pédagogique (notamment l'exemple fictif « La Fabrique des Coteaux ») sont illustratifs et ne constituent pas des données réelles. EVAD ne saurait être tenue responsable des erreurs, d'une absence de disponibilité des informations ou de la présence de virus sur son site.": "EVAD strives to ensure the accuracy of the information published on this site. The educational figures shown (in particular the fictional example \"La Fabrique des Coteaux\") are illustrative and do not constitute real data. EVAD cannot be held liable for errors, unavailability of information, or the presence of viruses on its site.",
    "Données personnelles (RGPD)": "Personal data (GDPR)",
    "EVAD Connect, en qualité de": "EVAD Connect, acting as",
    "responsable de traitement": "data controller",
    ", collecte et traite des données personnelles dans le respect du RGPD et de la loi « Informatique et Libertés ».": ", collects and processes personal data in compliance with the GDPR and the French Data Protection Act.",
    "Données collectées": "Data collected",
    "Formulaires de contact & d'adhésion :": "Contact & membership forms:",
    "nom, prénom, adresse e-mail, message.": "surname, first name, email address, message.",
    "Inscription à la bêta :": "Beta sign-up:",
    "prénom, nom, ville, adresse e-mail, structure (facultatif) et profil choisi.": "first name, surname, city, email address, organization (optional) and chosen profile.",
    "Assistant Deva :": "Deva assistant:",
    "le contenu des messages que vous adressez au chat, le temps d'y répondre.": "the content of the messages you send to the chat, for the time needed to answer them.",
    "Dons & adhésions :": "Donations & memberships:",
    "traités via HelloAsso, qui agit comme sous-traitant/prestataire de paiement.": "processed via HelloAsso, acting as a processor/payment provider.",
    "Navigation :": "Browsing:",
    "données techniques strictement nécessaires au fonctionnement du site.": "technical data strictly necessary for the site to function.",
    "Finalités": "Purposes",
    "Répondre à vos demandes de contact.": "Respond to your contact requests.",
    "Gérer les adhésions, dons et la vie associative.": "Manage memberships, donations and the life of the association.",
    "Vous informer sur l'activité d'EVAD si vous y avez consenti.": "Inform you about EVAD's activity if you have consented.",
    "Assurer la sécurité et le bon fonctionnement du site.": "Ensure the security and proper functioning of the site.",
    "Bases légales": "Legal bases",
    "Consentement": "Consent",
    "(newsletter, cookies non essentiels).": "(newsletter, non-essential cookies).",
    "Exécution d'un contrat ou de mesures précontractuelles": "Performance of a contract or pre-contractual measures",
    "(adhésion, don).": "(membership, donation).",
    "Intérêt légitime": "Legitimate interest",
    "(sécurité du site, réponse aux demandes).": "(site security, responding to requests).",
    "Durée de conservation": "Retention period",
    "Les données sont conservées pour la durée strictement nécessaire aux finalités poursuivies, puis archivées ou supprimées : demandes de contact (jusqu'à 3 ans après le dernier échange), données d'adhérents et de donateurs (durée légale comptable et associative applicable).": "Data is kept for the period strictly necessary for the purposes pursued, then archived or deleted: contact requests (up to 3 years after the last exchange), member and donor data (applicable legal accounting and association retention periods).",
    "Destinataires & sous-traitants": "Recipients & processors",
    "Vos données ne sont ni vendues ni cédées. Elles peuvent être traitées par les prestataires suivants, agissant pour le compte d'EVAD dans le cadre d'engagements de confidentialité et de conformité au RGPD :": "Your data is neither sold nor transferred. It may be processed by the following providers, acting on EVAD's behalf under confidentiality and GDPR-compliance commitments:",
    "Hébergeur du site": "Site host",
    "(voir la rubrique « Hébergement »).": "(see the \"Hosting\" section).",
    ": stockage des inscriptions à la bêta. Données hébergées dans l'Union européenne (Irlande et Allemagne).": ": storage of beta sign-ups. Data hosted in the European Union (Ireland and Germany).",
    "(société française) : traitement des messages envoyés à l'assistant Deva, afin de générer une réponse. Aucun message n'est utilisé à d'autres fins.": "(French company): processing of the messages sent to the Deva assistant in order to generate a reply. No message is used for any other purpose.",
    ": gestion des dons et adhésions (prestataire de paiement).": ": management of donations and memberships (payment provider).",
    "Le cas échéant, un service d'emailing établi dans l'Union européenne pour vous recontacter au sujet de la bêta, si vous y avez consenti.": "Where applicable, an emailing service established in the European Union to contact you about the beta, if you have consented.",
    "Transferts hors Union européenne": "Transfers outside the European Union",
    "Les données personnelles collectées via ce site sont hébergées et traitées": "The personal data collected via this site is hosted and processed",
    "dans l'Union européenne": "within the European Union",
    ". Aucun transfert de vos données personnelles n'est réalisé en dehors de l'UE.": ". No transfer of your personal data is carried out outside the EU.",
    "Assistant conversationnel Deva (intelligence artificielle)": "Deva conversational assistant (artificial intelligence)",
    "Deva est un": "Deva is an",
    "assistant IA": "AI assistant",
    "; vous êtes informé·e que vous dialoguez avec un système d'intelligence artificielle, et non avec une personne. Il s'appuie sur le modèle de Mistral AI (France) et répond à partir d'une documentation publique sur EVAD. N'y saisissez pas d'informations sensibles ; ses réponses peuvent comporter des imprécisions et ne constituent pas un conseil professionnel.": "; you are informed that you are talking with an artificial-intelligence system, not a person. It relies on Mistral AI's model (France) and answers from public documentation about EVAD. Do not enter sensitive information; its answers may contain inaccuracies and do not constitute professional advice.",
    "Cookies": "Cookies",
    "Ce site utilise": "This site uses",
    "uniquement des cookies et technologies strictement nécessaires": "only strictly necessary cookies and technologies",
    "à son fonctionnement et à sa sécurité. Conformément à la réglementation, ces cookies essentiels ne requièrent pas votre consentement préalable.": "for its operation and security. In accordance with regulations, these essential cookies do not require your prior consent.",
    "Aucun cookie publicitaire, statistique ou de traçage tiers": "No advertising, analytics or third-party tracking cookie",
    "n'est déposé. Vous pouvez configurer votre navigateur pour refuser les cookies ; certaines fonctionnalités pourraient alors être limitées.": "is placed. You can configure your browser to refuse cookies; some features may then be limited.",
    "Mesure d'audience": "Audience measurement",
    "La fréquentation du site est mesurée avec": "Site traffic is measured with",
    ", une solution": ", a solution",
    "auto-hébergée sur notre propre serveur (Union européenne)": "self-hosted on our own server (European Union)",
    ": aucune donnée n'est transmise à un tiers. Cette mesure fonctionne": ": no data is transmitted to a third party. This measurement works",
    "sans cookie": "without cookies",
    ", avec": ", with",
    "anonymisation de votre adresse IP": "anonymization of your IP address",
    ", et respecte le signal « Do Not Track » de votre navigateur. Configurée ainsi, elle ne requiert pas votre consentement (conformément aux recommandations de la CNIL) et ne permet pas de vous identifier.": ", and respects your browser's \"Do Not Track\" signal. Configured this way, it does not require your consent (in line with the CNIL's recommendations) and cannot identify you.",
    "Vos droits": "Your rights",
    "Conformément au RGPD, vous disposez des droits suivants sur vos données :": "In accordance with the GDPR, you have the following rights over your data:",
    "Droit d'": "Right of ",
    "accès": "access",
    "et de": "and",
    "rectification": "rectification",
    "Droit à l'": "Right to ",
    "effacement": "erasure",
    "(« droit à l'oubli »).": "(\"right to be forgotten\").",
    "Droit à la": "Right to",
    "limitation": "restriction",
    "et à l'": "and ",
    "opposition": "objection",
    "au traitement.": "to processing.",
    "portabilité": "portability",
    "de vos données.": "of your data.",
    "Droit de": "Right to",
    "retirer votre consentement": "withdraw your consent",
    "à tout moment.": "at any time.",
    "Pour exercer ces droits, écrivez à": "To exercise these rights, write to",
    "(une preuve d'identité pourra être demandée). Vous disposez également du droit d'introduire une réclamation auprès de la": "(proof of identity may be requested). You also have the right to lodge a complaint with the",
    "(Commission nationale de l'informatique et des libertés).": "(the French data protection authority).",
    "Pour toute question relative aux présentes mentions légales ou au traitement de vos données personnelles :": "For any question regarding this legal notice or the processing of your personal data:",
    "Dernière mise à jour : août 2026.": "Last updated: August 2026."
  };

  // ─────────────── Dictionnaire : attributs ───────────────
  // (placeholder, aria-label, alt, title)
  var ATTRS = {
    "Découvrir EVAD": "Discover EVAD",
    "Ouvrir le menu": "Open the menu",
    "Fermer le menu": "Close the menu",
    "Pilote d'impact": "Impact Pilot",
    "Bâtisseur d'impact": "Impact Builder",
    "Semeur d'impact": "Impact Sower",
    "Carte de l'écosystème": "Ecosystem map",
    "Réseau social": "Social network",
    "Bibliothèque de solutions": "Solutions library",
    "Reconnaissance": "Recognition",
    "Mesure d'impact": "Impact measurement",
    "Tableau de bord": "Dashboard",
    "Gestion de projet": "Project management",
    "Modélisation": "Modeling",
    "Carte EVAD, communauté autour de Bordeaux, pins lieux/bâtisseurs/semeurs, panneau de la communauté EVAD": "EVAD map, community around Bordeaux, pins for places/builders/sowers, EVAD community panel",
    "Réseau social EVAD, fils de quêtes et conversations entre membres": "EVAD social network, quest feeds and conversations between members",
    "Bibliothèque de solutions, fiches Récupération eau, Phytoépuration, filtres thématiques": "Solutions library, sheets for Water harvesting, Phytopurification, thematic filters",
    "Modélisation Minecraft Java, village solarpunk en voxel": "Minecraft Java modeling, solarpunk voxel village",
    "Solarpunk, maison en bois avec panneaux solaires et toit végétalisé": "Solarpunk, wooden house with solar panels and a green roof",
    "Économie régénérative, atelier collectif de réparation, jardin et ressources partagées": "Regenerative economy, collective repair workshop, garden and shared resources",
    "Écocratie, conseil de toutes les voix autour d'une table ronde dans un jardin": "Ecocracy, a council of all voices around a round table in a garden",
    "Ouvrir la conversation avec Deva": "Open the conversation with Deva",
    "Demandez à Deva…": "Ask Deva…",
    "Choisissez un profil ou posez une question…": "Pick a profile or ask a question…",
    "Votre réponse… (ou «passer»)": "Your answer… (or type 'skip')",
    "Envoyer": "Send",
    "Logo EVAD Connect": "EVAD Connect logo",
    "Intérêt général": "Public interest",
    "Gouvernance partagée": "Shared governance",
    "Communs ouverts": "Open commons",
    "Accessible à toutes et tous": "Open to everyone",
    "Prénom": "First name",
    "Nom": "Last name",
    "Ville": "City",
    "Adresse email": "Email address",
    "Mot de passe": "Password",
    "Structure (lieu, association…)": "Organization (place, nonprofit…)",
    "Structure (fondation, collectivité…)": "Organization (foundation, authority…)",
    "Structure (entreprise, asso… facultatif)": "Organization (company, nonprofit… optional)",
    "Revenir à l'inscription": "Back to sign-up",
    "Information cookies": "Cookie information",
    "Discuter avec Deva": "Chat with Deva",
    "Fermer Deva": "Close Deva",
    "Masquer le message": "Hide the message",
    "Réduire": "Minimize",
    "Détails de l'empreinte de la conversation": "Conversation footprint details",
    "Changer de profil": "Change profile",
    "Revenir à la vue générale": "Back to the general view",
    "Suggérer une amélioration": "Suggest an improvement",
    "Conversation avec Deva": "Conversation with Deva",
    "Ouvrir le menu de langue": "Open the language menu",
    "Sommaire": "Contents",
    // LinkedIn / Email des membres
    "LinkedIn de Romain Marie Froment": "Romain Marie Froment's LinkedIn",
    "Email de Romain Marie Froment": "Email Romain Marie Froment",
    "LinkedIn de Arnaud Duvigneau": "Arnaud Duvigneau's LinkedIn",
    "LinkedIn de Alexandre Letellier": "Alexandre Letellier's LinkedIn",
    "LinkedIn de Alexandra Cofano": "Alexandra Cofano's LinkedIn",
    "Email de Alexandra Cofano": "Email Alexandra Cofano",
    "LinkedIn de Pierre Gaignet": "Pierre Gaignet's LinkedIn",
    "LinkedIn de Ismail Belqi": "Ismail Belqi's LinkedIn",
    "LinkedIn de Jonas Chaurial": "Jonas Chaurial's LinkedIn",
    "LinkedIn de Bénédicte Fumey": "Bénédicte Fumey's LinkedIn",
    "Email de Bénédicte Fumey": "Email Bénédicte Fumey",
    "LinkedIn de Charles Judes": "Charles Judes's LinkedIn"
  };

  // ─────────────── Moteur ───────────────
  // NB : on NE saute PAS les <svg> — la spirale VADE contient des <text> à traduire.
  // Les données de tracé (attribut « d ») ne sont pas des nœuds texte, donc intactes.
  var SKIP_TAGS = { STYLE: 1, SCRIPT: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1 };
  var ATTR_NAMES = ['placeholder', 'aria-label', 'alt', 'title'];

  function norm(str) {
    return str.replace(/[’‘ʼʻ]/g, "'").replace(/\s+/g, ' ').trim();
  }

  function inSkipped(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      if (SKIP_TAGS[p.nodeName]) return true;
      // Ne jamais toucher le sélecteur de langue ni ce qui est marqué translate="no"
      if (p.getAttribute && (p.getAttribute('data-no-i18n') === '1' || p.getAttribute('translate') === 'no')) return true;
      p = p.parentNode;
    }
    return false;
  }

  function translateTextNode(node) {
    var raw = node.nodeValue;
    if (!raw || !/[A-Za-zÀ-ÿ]/.test(raw)) return;
    if (inSkipped(node)) return;
    var key = norm(raw);
    if (!key) return;
    var en = TEXTS[key];
    if (en == null) return;
    var lead = (raw.match(/^\s*/) || [''])[0];
    var trail = (raw.match(/\s*$/) || [''])[0];
    var next = lead + en + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateEl(el) {
    if (!el.getAttribute) return;
    if (SKIP_TAGS[el.nodeName]) return;
    for (var i = 0; i < ATTR_NAMES.length; i++) {
      var a = ATTR_NAMES[i];
      var v = el.getAttribute(a);
      if (!v) continue;
      var en = ATTRS[norm(v)];
      if (en != null && v !== en) el.setAttribute(a, en);
    }
  }

  function translateSubtree(root) {
    if (window.EVAD_LANG !== 'en') return;
    if (root.nodeType === 3) { translateTextNode(root); return; }
    if (root.nodeType !== 1) return;
    if (SKIP_TAGS[root.nodeName]) return;
    translateEl(root);
    // Attributs des descendants
    var els = root.querySelectorAll ? root.querySelectorAll('*') : [];
    for (var i = 0; i < els.length; i++) translateEl(els[i]);
    // Noeuds texte des descendants
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = tw.nextNode())) translateTextNode(n);
  }

  function translateAll() {
    if (document.body) translateSubtree(document.body);
  }

  function startObserver() {
    if (!window.MutationObserver) return;
    var obs = new MutationObserver(function (mutations) {
      if (window.EVAD_LANG !== 'en') return;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'characterData') {
          translateTextNode(m.target);
        } else if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) translateSubtree(m.addedNodes[j]);
        }
      }
    });
    obs.observe(document.documentElement, {
      childList: true, subtree: true, characterData: true
    });
  }

  function init() {
    if (window.EVAD_LANG !== 'en') return;
    try { var tt = titleForPage(); if (tt) document.title = tt; } catch (e) {}
    translateAll();
    // Passes différées : React monte de façon asynchrone (Babel in-browser).
    setTimeout(translateAll, 150);
    setTimeout(translateAll, 600);
    setTimeout(translateAll, 1500);
    startObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
