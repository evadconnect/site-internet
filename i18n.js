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

  // Titre de l'onglet en anglais.
  var TITLE_EN = 'EVAD · The regenerative ecosystem connecting places, citizens and funders';

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

    // ── Bloc caché (badges de confiance) ──
    "✓ Association d'intérêt général": "✓ Public-interest nonprofit",
    "✓ Licence Creative Commons": "✓ Creative Commons license",
    "✓ Données souveraines": "✓ Sovereign data",

    // ── Étiquette de profil dans la nav ──
    "Vue porteurs de lieu": "Place stewards view",
    "Vue citoyens": "Citizens view",
    "Vue financeurs": "Funders view"
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
    try { document.title = TITLE_EN; } catch (e) {}
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
