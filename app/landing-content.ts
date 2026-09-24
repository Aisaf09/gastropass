export type Locale = "es" | "en" | "ca";

export const locales: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "ca", label: "CA" },
];

interface FeatureItem {
  title: string;
  description: string;
}

interface CompareCell {
  ok: boolean;
  text: string;
}

interface CompareColumn {
  name: string;
  highlight?: boolean;
  values: CompareCell[];
}

interface LandingContent {
  nav: {
    features: string;
    howItWorks: string;
    compare: string;
    faq: string;
    login: string;
    signup: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    titleTail: string;
    subtitle: string;
    ctaSignup: string;
    ctaLogin: string;
    trust: [string, string, string];
    card: {
      name: string;
      status: string;
      pointsLabel: string;
      member: string;
      memberName: string;
      perVisit: string;
      notifTitle: string;
      notifBody: string;
    };
  };
  marquee: string[];
  stats: { value: string; label: string }[];
  business: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: FeatureItem[];
  };
  showcase: [
    {
      eyebrow: string;
      title: string;
      description: string;
      bullets: string[];
    },
    {
      eyebrow: string;
      title: string;
      description: string;
      bullets: string[];
    },
  ];
  customer: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: FeatureItem[];
  };
  compare: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rows: string[];
    columns: CompareColumn[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FeatureItem[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    copyright: string;
  };
}

export const content: Record<Locale, LandingContent> = {
  es: {
    nav: {
      features: "Características",
      howItWorks: "Cómo funciona",
      compare: "Comparativa",
      faq: "FAQ",
      login: "Iniciar sesión",
      signup: "Crear cuenta",
    },
    hero: {
      eyebrow: "Fidelización de clientes, sin fricción",
      titleLead: "Tarjetas de fidelización",
      titleHighlight: "sin apps",
      titleTail: "para tu restaurante",
      subtitle:
        "Tus clientes se apuntan escaneando un QR y guardan su tarjeta en Apple Wallet o Google Wallet. Sin apps que instalar, sin tarjetas de cartón que perder.",
      ctaSignup: "Crear cuenta gratis",
      ctaLogin: "Iniciar sesión",
      trust: ["Gratis para empezar", "Apple & Google Wallet", "Alta en 10 segundos"],
      card: {
        name: "Tu Restaurante",
        status: "Activa",
        pointsLabel: "puntos",
        member: "Cliente",
        memberName: "Ana García",
        perVisit: "+1 punto por visita",
        notifTitle: "Tu Restaurante",
        notifBody: "Has ganado 1 punto en tu última visita",
      },
    },
    marquee: [
      "Restaurantes",
      "Cafeterías",
      "Bares",
      "Pastelerías",
      "Fast casual",
      "Heladerías",
      "Foodtrucks",
      "Vinotecas",
    ],
    stats: [
      { value: "10s", label: "Para dar de alta a un cliente nuevo" },
      { value: "0€", label: "Coste para empezar a usarlo" },
      { value: "2", label: "Wallets nativos: Apple y Google" },
      { value: "100%", label: "Sin apps que tus clientes deban instalar" },
    ],
    business: {
      eyebrow: "Para tu negocio",
      title: "Todo lo que necesitas para fidelizar",
      subtitle: "Lanza tu programa de fidelización hoy mismo, sin desarrollo ni instalaciones.",
      features: [
        {
          title: "Tarjeta digital",
          description: "Tus clientes guardan su tarjeta en el móvil, sin instalar nada.",
        },
        {
          title: "Puntos por visita",
          description: "Suma puntos escaneando el QR personal del cliente desde tu panel.",
        },
        {
          title: "Alta pública en segundos",
          description: "Comparte un enlace o un QR en tu local y los clientes se apuntan solos.",
        },
        {
          title: "Panel centralizado",
          description: "Gestiona clientes, ajustes y notificaciones desde un mismo lugar.",
        },
        {
          title: "Notificaciones push",
          description: "Avisa de ofertas y novedades directamente en la pantalla de bloqueo.",
        },
        {
          title: "Marca personalizada",
          description: "El color y el nombre de tu negocio, presentes en cada tarjeta emitida.",
        },
      ],
    },
    showcase: [
      {
        eyebrow: "Panel de control",
        title: "Gestiona tu fidelización sin complicarte",
        description:
          "Un panel pensado para el día a día del negocio: rápido de usar desde la barra o la caja, sin curva de aprendizaje.",
        bullets: [
          "Añade puntos a un cliente en dos toques",
          "Consulta el historial de visitas de cada cliente",
          "Exporta tu lista de clientes cuando quieras",
        ],
      },
      {
        eyebrow: "Notificaciones Wallet",
        title: "Llega a tus clientes sin ser invasivo",
        description:
          "Las actualizaciones de la tarjeta aparecen directamente en el móvil de tu cliente, sin pedir permisos ni abrir ninguna app.",
        bullets: [
          "Avisos en la pantalla de bloqueo del móvil",
          "Sin permisos de notificaciones que aceptar",
          "Ideal para anunciar ofertas puntuales",
        ],
      },
    ],
    customer: {
      eyebrow: "Para tus clientes",
      title: "Así de fácil es unirse",
      subtitle: "Sin descargas, sin registros largos, sin fricción.",
      steps: [
        {
          title: "Escanea el QR",
          description: "Encuéntralo en la mesa o el mostrador del restaurante.",
        },
        {
          title: "Apúntate en 10 segundos",
          description: "Solo hace falta el nombre y el teléfono.",
        },
        {
          title: "Enseña tu tarjeta",
          description: "Cada visita, muestra tu código al personal y suma puntos.",
        },
      ],
    },
    compare: {
      eyebrow: "La comparativa",
      title: "Por qué GastroPass y no lo de siempre",
      subtitle: "Frente a la tarjeta de cartón o una app a medida, la diferencia es clara.",
      rows: [
        "Coste inicial",
        "Puesta en marcha",
        "El cliente instala algo",
        "Notificaciones al cliente",
        "Riesgo de perderla",
        "Actualización de puntos",
      ],
      columns: [
        {
          name: "Tarjeta de cartón",
          values: [
            { ok: false, text: "Bajo" },
            { ok: true, text: "Minutos" },
            { ok: true, text: "No" },
            { ok: false, text: "No existen" },
            { ok: false, text: "Alto" },
            { ok: false, text: "Manual" },
          ],
        },
        {
          name: "GastroPass",
          highlight: true,
          values: [
            { ok: true, text: "Gratis" },
            { ok: true, text: "Minutos" },
            { ok: true, text: "No" },
            { ok: true, text: "Pantalla de bloqueo" },
            { ok: true, text: "No, va en el móvil" },
            { ok: true, text: "Tiempo real" },
          ],
        },
        {
          name: "App propia",
          values: [
            { ok: false, text: "Miles de €" },
            { ok: false, text: "Meses" },
            { ok: false, text: "Sí" },
            { ok: true, text: "Solo si abre la app" },
            { ok: true, text: "No" },
            { ok: true, text: "Tiempo real" },
          ],
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Todo lo que debes saber",
      items: [
        {
          title: "¿Mis clientes necesitan instalar una app?",
          description:
            "No. La tarjeta se guarda directamente en Apple Wallet o Google Wallet. Si su móvil no es compatible, reciben una tarjeta web que funciona igual desde un enlace.",
        },
        {
          title: "¿Cuánto cuesta empezar?",
          description:
            "Crear tu cuenta y lanzar tu programa de fidelización es gratis. No hace falta ninguna tarjeta de crédito para probarlo.",
        },
        {
          title: "¿Cómo sumo puntos a un cliente?",
          description:
            "Desde tu panel, escaneas el código QR personal del cliente y el punto se añade al instante. Su tarjeta se actualiza sola en el móvil.",
        },
        {
          title: "¿Qué datos se piden a mis clientes?",
          description:
            "Solo nombre y teléfono, lo justo para identificar su tarjeta. No se comparten con nadie más.",
        },
        {
          title: "¿Puedo personalizar el diseño de la tarjeta?",
          description:
            "Sí, puedes usar el color de tu marca y el nombre de tu negocio en la tarjeta que reciben tus clientes.",
        },
        {
          title: "¿Y si mi cliente cambia de móvil?",
          description:
            "Su tarjeta sigue ligada a su número de teléfono, así que puede volver a añadirla sin perder sus puntos.",
        },
      ],
    },
    finalCta: {
      title: "¿Listas para dejar atrás las tarjetas de cartón?",
      subtitle: "Crea tu cuenta gratis y ten tu programa de fidelización listo en minutos.",
      cta: "Crear cuenta gratis",
    },
    footer: {
      tagline: "Tarjetas de fidelización digitales para restaurantes y negocios de hostelería.",
      columns: [
        {
          title: "Producto",
          links: [
            { label: "Características", href: "#features" },
            { label: "Cómo funciona", href: "#how-it-works" },
            { label: "Comparativa", href: "#compare" },
            { label: "Preguntas frecuentes", href: "#faq" },
          ],
        },
        {
          title: "Cuenta",
          links: [
            { label: "Iniciar sesión", href: "/login" },
            { label: "Crear cuenta", href: "/signup" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacidad", href: "/privacy" },
            { label: "Términos", href: "/terms" },
          ],
        },
      ],
      copyright: "GastroPass — Tarjetas de fidelización digitales.",
    },
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it works",
      compare: "Compare",
      faq: "FAQ",
      login: "Log in",
      signup: "Create account",
    },
    hero: {
      eyebrow: "Customer loyalty, without the friction",
      titleLead: "Loyalty cards",
      titleHighlight: "without apps",
      titleTail: "for your restaurant",
      subtitle:
        "Customers join by scanning a QR code and keep their card in Apple Wallet or Google Wallet. No app to install, no paper cards to lose.",
      ctaSignup: "Create free account",
      ctaLogin: "Log in",
      trust: ["Free to start", "Apple & Google Wallet", "Sign-up in 10 seconds"],
      card: {
        name: "Your Restaurant",
        status: "Active",
        pointsLabel: "points",
        member: "Member",
        memberName: "Ana Garcia",
        perVisit: "+1 point per visit",
        notifTitle: "Your Restaurant",
        notifBody: "You earned 1 point on your last visit",
      },
    },
    marquee: [
      "Restaurants",
      "Cafes",
      "Bars",
      "Bakeries",
      "Fast casual",
      "Ice cream shops",
      "Food trucks",
      "Wine bars",
    ],
    stats: [
      { value: "10s", label: "To sign up a new customer" },
      { value: "$0", label: "Cost to get started" },
      { value: "2", label: "Native wallets: Apple and Google" },
      { value: "100%", label: "No app your customers need to install" },
    ],
    business: {
      eyebrow: "For your business",
      title: "Everything you need to build loyalty",
      subtitle: "Launch your loyalty program today — no development, nothing to install.",
      features: [
        {
          title: "Digital card",
          description: "Customers keep their card on their phone — nothing to install.",
        },
        {
          title: "Points per visit",
          description: "Add points by scanning the customer's personal QR from your dashboard.",
        },
        {
          title: "Public signup in seconds",
          description: "Share a link or QR at your venue and customers sign themselves up.",
        },
        {
          title: "Centralized dashboard",
          description: "Manage customers, settings, and notifications from one place.",
        },
        {
          title: "Push notifications",
          description: "Announce offers and news straight to the lock screen.",
        },
        {
          title: "Custom branding",
          description: "Your color and business name on every card you issue.",
        },
      ],
    },
    showcase: [
      {
        eyebrow: "Dashboard",
        title: "Manage loyalty without the hassle",
        description:
          "A dashboard built for the daily grind: fast to use from behind the counter, no learning curve.",
        bullets: [
          "Add a point to a customer in two taps",
          "See each customer's visit history",
          "Export your customer list whenever you want",
        ],
      },
      {
        eyebrow: "Wallet notifications",
        title: "Reach customers without being intrusive",
        description:
          "Card updates land straight on your customer's phone — no permissions to grant, no app to open.",
        bullets: [
          "Alerts right on the phone's lock screen",
          "No notification permissions to accept",
          "Perfect for one-off offers and news",
        ],
      },
    ],
    customer: {
      eyebrow: "For your customers",
      title: "This easy to join",
      subtitle: "No downloads, no long sign-up forms, no friction.",
      steps: [
        {
          title: "Scan the QR",
          description: "Find it on the table or counter at the restaurant.",
        },
        {
          title: "Join in 10 seconds",
          description: "Just your name and phone number.",
        },
        {
          title: "Show your card",
          description: "Every visit, show your code to staff to earn points.",
        },
      ],
    },
    compare: {
      eyebrow: "The comparison",
      title: "Why GastroPass over the usual options",
      subtitle: "Against a paper card or a custom-built app, the difference is clear.",
      rows: [
        "Upfront cost",
        "Time to launch",
        "Customer installs something",
        "Notifications to customers",
        "Risk of losing it",
        "Points update",
      ],
      columns: [
        {
          name: "Paper card",
          values: [
            { ok: false, text: "Low" },
            { ok: true, text: "Minutes" },
            { ok: true, text: "No" },
            { ok: false, text: "None" },
            { ok: false, text: "High" },
            { ok: false, text: "Manual" },
          ],
        },
        {
          name: "GastroPass",
          highlight: true,
          values: [
            { ok: true, text: "Free" },
            { ok: true, text: "Minutes" },
            { ok: true, text: "No" },
            { ok: true, text: "Lock screen" },
            { ok: true, text: "No, it's on the phone" },
            { ok: true, text: "Real time" },
          ],
        },
        {
          name: "Custom app",
          values: [
            { ok: false, text: "Thousands" },
            { ok: false, text: "Months" },
            { ok: false, text: "Yes" },
            { ok: true, text: "Only if opened" },
            { ok: true, text: "No" },
            { ok: true, text: "Real time" },
          ],
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Everything you need to know",
      items: [
        {
          title: "Do my customers need to install an app?",
          description:
            "No. The card is saved straight to Apple Wallet or Google Wallet. If their phone doesn't support either, they get a web card that works the same way from a link.",
        },
        {
          title: "How much does it cost to get started?",
          description:
            "Creating your account and launching your loyalty program is free. No credit card needed to try it.",
        },
        {
          title: "How do I add points to a customer?",
          description:
            "From your dashboard, scan the customer's personal QR code and the point is added instantly. Their card updates itself on their phone.",
        },
        {
          title: "What data do you collect from my customers?",
          description:
            "Just name and phone number — enough to identify their card. It's never shared with anyone else.",
        },
        {
          title: "Can I customize the card design?",
          description:
            "Yes, you can use your brand color and business name on the card your customers receive.",
        },
        {
          title: "What if my customer gets a new phone?",
          description:
            "Their card stays tied to their phone number, so they can add it again without losing their points.",
        },
      ],
    },
    finalCta: {
      title: "Ready to leave paper cards behind?",
      subtitle: "Create your free account and have your loyalty program ready in minutes.",
      cta: "Create free account",
    },
    footer: {
      tagline: "Digital loyalty cards for restaurants and hospitality businesses.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Compare", href: "#compare" },
            { label: "FAQ", href: "#faq" },
          ],
        },
        {
          title: "Account",
          links: [
            { label: "Log in", href: "/login" },
            { label: "Create account", href: "/signup" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
      ],
      copyright: "GastroPass — Digital loyalty cards.",
    },
  },
  ca: {
    nav: {
      features: "Característiques",
      howItWorks: "Com funciona",
      compare: "Comparativa",
      faq: "FAQ",
      login: "Inicia sessió",
      signup: "Crea un compte",
    },
    hero: {
      eyebrow: "Fidelització de clients, sense fricció",
      titleLead: "Targetes de fidelització",
      titleHighlight: "sense apps",
      titleTail: "per al teu restaurant",
      subtitle:
        "Els teus clients s'apunten escanejant un QR i guarden la targeta a Apple Wallet o Google Wallet. Sense apps per instal·lar, sense targetes de cartró que es perdin.",
      ctaSignup: "Crea un compte gratis",
      ctaLogin: "Inicia sessió",
      trust: ["Gratis per començar", "Apple & Google Wallet", "Alta en 10 segons"],
      card: {
        name: "El teu Restaurant",
        status: "Activa",
        pointsLabel: "punts",
        member: "Client",
        memberName: "Ana Garcia",
        perVisit: "+1 punt per visita",
        notifTitle: "El teu Restaurant",
        notifBody: "Has guanyat 1 punt a la teva última visita",
      },
    },
    marquee: [
      "Restaurants",
      "Cafeteries",
      "Bars",
      "Pastisseries",
      "Fast casual",
      "Gelateries",
      "Foodtrucks",
      "Vinoteques",
    ],
    stats: [
      { value: "10s", label: "Per donar d'alta un client nou" },
      { value: "0€", label: "Cost per començar a fer-lo servir" },
      { value: "2", label: "Wallets natius: Apple i Google" },
      { value: "100%", label: "Sense apps que els teus clients hagin d'instal·lar" },
    ],
    business: {
      eyebrow: "Per al teu negoci",
      title: "Tot el que necessites per fidelitzar",
      subtitle: "Llança el teu programa de fidelització avui mateix, sense desenvolupament ni instal·lacions.",
      features: [
        {
          title: "Targeta digital",
          description: "Els clients guarden la targeta al mòbil, sense instal·lar res.",
        },
        {
          title: "Punts per visita",
          description: "Suma punts escanejant el QR personal del client des del teu panell.",
        },
        {
          title: "Alta pública en segons",
          description: "Comparteix un enllaç o un QR al local i els clients s'apunten sols.",
        },
        {
          title: "Panell centralitzat",
          description: "Gestiona clients, ajustos i notificacions des d'un mateix lloc.",
        },
        {
          title: "Notificacions push",
          description: "Avisa d'ofertes i novetats directament a la pantalla de bloqueig.",
        },
        {
          title: "Marca personalitzada",
          description: "El color i el nom del teu negoci, presents a cada targeta emesa.",
        },
      ],
    },
    showcase: [
      {
        eyebrow: "Panell de control",
        title: "Gestiona la fidelització sense complicar-te",
        description:
          "Un panell pensat per al dia a dia del negoci: ràpid d'usar des de la barra o la caixa, sense corba d'aprenentatge.",
        bullets: [
          "Afegeix punts a un client en dos tocs",
          "Consulta l'historial de visites de cada client",
          "Exporta la teva llista de clients quan vulguis",
        ],
      },
      {
        eyebrow: "Notificacions Wallet",
        title: "Arriba als teus clients sense ser invasiu",
        description:
          "Les actualitzacions de la targeta apareixen directament al mòbil del client, sense demanar permisos ni obrir cap app.",
        bullets: [
          "Avisos a la pantalla de bloqueig del mòbil",
          "Sense permisos de notificacions que acceptar",
          "Ideal per anunciar ofertes puntuals",
        ],
      },
    ],
    customer: {
      eyebrow: "Per als teus clients",
      title: "Així de fàcil és apuntar-se",
      subtitle: "Sense descàrregues, sense registres llargs, sense fricció.",
      steps: [
        {
          title: "Escaneja el QR",
          description: "Troba'l a la taula o al taulell del restaurant.",
        },
        {
          title: "Apunta't en 10 segons",
          description: "Només cal el nom i el telèfon.",
        },
        {
          title: "Ensenya la teva targeta",
          description: "Cada visita, mostra el teu codi al personal i suma punts.",
        },
      ],
    },
    compare: {
      eyebrow: "La comparativa",
      title: "Per què GastroPass i no el de sempre",
      subtitle: "Davant la targeta de cartró o una app a mida, la diferència és clara.",
      rows: [
        "Cost inicial",
        "Posada en marxa",
        "El client instal·la algo",
        "Notificacions al client",
        "Risc de perdre-la",
        "Actualització de punts",
      ],
      columns: [
        {
          name: "Targeta de cartró",
          values: [
            { ok: false, text: "Baix" },
            { ok: true, text: "Minuts" },
            { ok: true, text: "No" },
            { ok: false, text: "No existeixen" },
            { ok: false, text: "Alt" },
            { ok: false, text: "Manual" },
          ],
        },
        {
          name: "GastroPass",
          highlight: true,
          values: [
            { ok: true, text: "Gratis" },
            { ok: true, text: "Minuts" },
            { ok: true, text: "No" },
            { ok: true, text: "Pantalla de bloqueig" },
            { ok: true, text: "No, va al mòbil" },
            { ok: true, text: "Temps real" },
          ],
        },
        {
          name: "App pròpia",
          values: [
            { ok: false, text: "Milers d'€" },
            { ok: false, text: "Mesos" },
            { ok: false, text: "Sí" },
            { ok: true, text: "Només si obre l'app" },
            { ok: true, text: "No" },
            { ok: true, text: "Temps real" },
          ],
        },
      ],
    },
    faq: {
      eyebrow: "Preguntes freqüents",
      title: "Tot el que has de saber",
      items: [
        {
          title: "Els meus clients han d'instal·lar una app?",
          description:
            "No. La targeta es desa directament a Apple Wallet o Google Wallet. Si el mòbil no és compatible, reben una targeta web que funciona igual des d'un enllaç.",
        },
        {
          title: "Quant costa començar?",
          description:
            "Crear el teu compte i llançar el teu programa de fidelització és gratis. No cal cap targeta de crèdit per provar-ho.",
        },
        {
          title: "Com sumo punts a un client?",
          description:
            "Des del teu panell, escanejes el codi QR personal del client i el punt s'afegeix a l'instant. La seva targeta s'actualitza sola al mòbil.",
        },
        {
          title: "Quines dades es demanen als meus clients?",
          description:
            "Només nom i telèfon, el just per identificar la seva targeta. No es comparteixen amb ningú més.",
        },
        {
          title: "Puc personalitzar el disseny de la targeta?",
          description:
            "Sí, pots fer servir el color de la teva marca i el nom del teu negoci a la targeta que reben els teus clients.",
        },
        {
          title: "I si el meu client canvia de mòbil?",
          description:
            "La seva targeta segueix lligada al seu número de telèfon, així que la pot tornar a afegir sense perdre els punts.",
        },
      ],
    },
    finalCta: {
      title: "Preparats per deixar enrere les targetes de cartró?",
      subtitle: "Crea el teu compte gratis i tingues el teu programa de fidelització llest en minuts.",
      cta: "Crea un compte gratis",
    },
    footer: {
      tagline: "Targetes de fidelització digitals per a restaurants i negocis d'hostaleria.",
      columns: [
        {
          title: "Producte",
          links: [
            { label: "Característiques", href: "#features" },
            { label: "Com funciona", href: "#how-it-works" },
            { label: "Comparativa", href: "#compare" },
            { label: "Preguntes freqüents", href: "#faq" },
          ],
        },
        {
          title: "Compte",
          links: [
            { label: "Inicia sessió", href: "/login" },
            { label: "Crea un compte", href: "/signup" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privadesa", href: "/privacy" },
            { label: "Termes", href: "/terms" },
          ],
        },
      ],
      copyright: "GastroPass — Targetes de fidelització digitals.",
    },
  },
};
