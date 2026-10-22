// Translatable site content (Spanish and English). Language-neutral data (name, email, links, project
// files) lives in site.ts. Components read a language with `getContent(Astro.currentLocale)`.
import { projectBase, site, type Project, type ProjectBase } from './site';

export type Lang = 'es' | 'en';

export const languages: Record<Lang, { code: string; name: string; htmlLang: string; ogLocale: string }> = {
  es: { code: 'ES', name: 'Español', htmlLang: 'es', ogLocale: 'es_AR' },
  en: { code: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
};

export function langOf(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

/** Path of a page in a language. Spanish is the default language (no prefix); English lives under /en. */
export type PageName = 'home' | 'privacy' | 'projects' | 'about';

const pagePaths: Record<PageName, Record<Lang, string>> = {
  home: { es: '/', en: '/en/' },
  privacy: { es: '/privacidad', en: '/en/privacy' },
  projects: { es: '/proyectos', en: '/en/projects' },
  about: { es: '/nosotros', en: '/en/about' },
};

export function pagePath(lang: Lang, page: PageName, hash = ''): string {
  return `${pagePaths[page][lang]}${hash ? `#${hash}` : ''}`;
}

export interface Cta {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PrivacyContent {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updatedLabel: string;
  updated: string;
  sections: { heading: string; paragraphs: string[]; email?: boolean }[];
  back: string;
}

export interface Content {
  lang: Lang;
  meta: { title: string; description: string; ogImageAlt: string };
  ui: {
    skip: string;
    mainNav: string;
    homeAria: string;
    menuToggle: string;
    newTab: string;
    languageLabel: string;
    whatsappFloat: string;
    privacyLink: string;
    socialLabel: string;
    emailTodo: string;
    projectsTabs: string;
    viewProjects: string;
    openProject: (name: string) => string;
    projectsStrip: string;
    projectCounter: (current: string, total: number) => string;
    projectHint: string;
    prevProject: string;
    nextProject: string;
    screensGroup: string;
    viewLive: string;
    deviceDesktop: string;
    deviceMobile: string;
    shotAlt: (project: string, device: 'desktop' | 'mobile', screen: string) => string;
    testimonialsRegion: string;
    founderAlt: (name: string, role: string) => string;
  };
  whatsappMessage: string;
  nav: NavItem[];
  navCta: Cta;
  hero: {
    title: string;
    titleLead: string;
    titleWords: string[];
    subtitle: string;
    /** Word of the subtitle that breathes. */
    highlight: string;
    support: string;
    primary: Cta;
    secondary: Cta;
  };
  sections: Record<
    'services' | 'projects' | 'why' | 'process' | 'testimonials' | 'founder' | 'faq' | 'contact',
    { id: string; title: string; subtitle?: string }
  >;
  services: { icon: 'ai' | 'web' | 'crm' | 'social'; title: string; text: string; todo?: string }[];
  projects: Project[];
  why: { lead: string; paragraphs: string[]; cta: Cta };
  process: { intro: string; steps: { icon: 'audit' | 'design' | 'build' | 'maintain'; title: string; text: string }[] };
  founder: { name: string; role: string; bio: string[] };
  faq: { question: string; answer: string | null }[];
  contact: { intro: string; whatsappLabel: string; emailLabel: string };
  pages: Record<'projects' | 'about', { metaTitle: string; metaDescription: string }>;
  privacy: PrivacyContent;
  showFounder: boolean;
  showFaq: boolean;
}

const isDev = import.meta.env.DEV;

const whatsappUrl = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

function projectTexts(
  texts: Record<string, { sector: string; description: string; features: string[] }>,
  screens: Record<string, string>,
  shotAlt: Content['ui']['shotAlt'],
): Project[] {
  const toShots = (base: ProjectBase, device: 'desktop' | 'mobile', name: string) =>
    base[device].map((shot) => {
      const label = screens[shot.screen] ?? shot.screen;
      return { src: shot.src, label, alt: shotAlt(name, device, label) };
    });
  return projectBase.map((base) => {
    const text = texts[base.id] ?? { sector: '', description: '', features: [] };
    return {
      id: base.id,
      name: base.name,
      sector: text.sector,
      description: text.description,
      features: text.features,
      url: base.url,
      domain: base.domain,
      ...(base.logo ? { logo: base.logo } : {}),
      desktop: toShots(base, 'desktop', base.name),
      mobile: toShots(base, 'mobile', base.name),
    };
  });
}

// ---------------------------------------------------------------------------------------------
// Spanish
// ---------------------------------------------------------------------------------------------
const esAfter = 'Hasta 2 revisiones gratis. Después, cualquier consulta extra tiene un costo.';
const esWhatsapp = whatsappUrl('Hola, quiero una auditoría gratis para mi negocio.');
const esFaq: Content['faq'] = [
  {
    question: '¿Qué es la auditoría?',
    answer: 'Revisamos cómo trabaja hoy tu equipo y detectamos qué tareas consumen más tiempo o generan errores.',
  },
  { question: '¿Necesito saber de tecnología?', answer: 'No. Solo tenés que contarnos tu problema y nosotros lo resolvemos.' },
  {
    question: '¿Se conecta con las herramientas que ya uso?',
    answer: 'Sí. Lo conectamos con lo que ya usás, sin frenar tu operación.',
  },
  { question: '¿Qué pasa después de la implementación?', answer: esAfter },
  // TODO-CONTENIDO: price and timing answers. Never invent prices or timelines.
  { question: '¿Cuánto cuesta?', answer: null },
  { question: '¿Cuánto tarda?', answer: null },
];
const esFounder: Content['founder'] = {
  name: 'Ignacio Castro',
  role: 'Founder',
  bio: [
    'Soy Ignacio, ingeniero de software. Automatizo procesos y sumo inteligencia artificial a PyMEs para que pierdan menos tiempo en tareas repetitivas.',
  ],
};

const es: Content = {
  lang: 'es',
  meta: {
    title: 'KAPLA | Automatización, IA y sistemas para PyMEs',
    // TODO-CONTENIDO: owner approval of this proposed meta description.
    description:
      'KAPLA organiza y automatiza el negocio de tu PyME: inteligencia artificial, páginas web, CRMs y gestión de redes. Pedí una auditoría gratis.',
    ogImageAlt: 'Logo de KAPLA sobre fondo azul oscuro',
  },
  ui: {
    skip: 'Saltar al contenido',
    mainNav: 'Principal',
    homeAria: 'KAPLA, ir al inicio',
    menuToggle: 'Abrir o cerrar el menú',
    newTab: 'se abre en una pestaña nueva',
    languageLabel: 'Idioma',
    whatsappFloat: 'Escribinos por WhatsApp',
    privacyLink: 'Aviso de privacidad',
    socialLabel: 'Redes sociales',
    emailTodo: 'email de contacto.',
    projectsTabs: 'Proyectos',
    viewProjects: 'Ver proyectos',
    openProject: (name) => `Ver el proyecto ${name}`,
    projectsStrip: 'Proyectos destacados (deslizá para ver más)',
    projectCounter: (current, total) => `Proyecto ${current} de ${total}`,
    projectHint: ' · deslizá o usá las flechas',
    prevProject: 'Proyecto anterior',
    nextProject: 'Proyecto siguiente',
    screensGroup: 'Pantallas',
    viewLive: 'Ver en vivo',
    deviceDesktop: 'Computadora',
    deviceMobile: 'Celular',
    shotAlt: (project, device, screen) => `${project} ${device === 'desktop' ? 'en computadora' : 'en el celular'}: ${screen}.`,
    testimonialsRegion: 'Opiniones de clientes (deslizá para ver más)',
    founderAlt: (name, role) => `${name}, ${role} de KAPLA`,
  },
  whatsappMessage: 'Hola, quiero una auditoría gratis para mi negocio.',
  nav: [
    { label: 'Servicios', href: pagePath('es', 'home', 'servicios') },
    { label: 'Proyectos', href: pagePath('es', 'projects') },
    // "Nosotros" is its own page: Por qué KAPLA and the founder.
    { label: 'Nosotros', href: pagePath('es', 'about') },
    { label: 'FAQ', href: pagePath('es', 'home', 'faq') },
  ],
  navCta: { label: 'Auditoría gratis', href: esWhatsapp, external: true },
  hero: {
    title: 'Automatizamos tus sistemas.',
    titleLead: 'Automatizamos',
    titleWords: ['tus sistemas', 'tus redes', 'tus consultas', 'tus procesos', 'tus tareas'],
    subtitle: 'Tu negocio, completamente ordenado.',
    highlight: 'ordenado',
    // TODO-CONTENIDO: owner approval of this proposed supporting line.
    support: 'Inteligencia artificial, páginas web, CRMs y redes sociales, para que tu negocio funcione sin tareas repetitivas.',
    primary: { label: 'Quiero una auditoría', href: esWhatsapp, external: true },
    secondary: { label: 'Ver trabajo', href: pagePath('es', 'home', 'proyectos') },
  },
  sections: {
    services: { id: 'servicios', title: 'Servicios', subtitle: 'Cuatro formas de ordenar y automatizar tu negocio.' },
    projects: { id: 'proyectos', title: 'Proyectos', subtitle: 'Sistemas y sitios que ya están funcionando.' },
    why: { id: 'por-que', title: 'Por qué KAPLA' },
    process: { id: 'proceso', title: 'Proceso' },
    testimonials: { id: 'opiniones', title: 'Lo que dicen nuestros clientes' },
    founder: { id: 'fundador', title: 'Fundador' },
    faq: { id: 'faq', title: 'Preguntas frecuentes' },
    contact: { id: 'contacto', title: 'Pedí tu auditoría gratis' },
  },
  // TODO-CONTENIDO: owner approval of these proposed texts. No prices: they are discussed on WhatsApp.
  services: [
    {
      icon: 'ai',
      title: 'Automatización con IA',
      text: 'Dejamos que la inteligencia artificial se ocupe de lo repetitivo: responder consultas, ordenar datos y armar informes.',
    },
    { icon: 'web', title: 'Páginas web', text: 'Sitios claros y rápidos que explican qué hacés y hacen fácil que te contacten.' },
    {
      icon: 'crm',
      title: 'CRM a medida',
      text: 'Un sistema para seguir a tus clientes y consultas en un solo lugar, armado según cómo trabajás.',
    },
    {
      icon: 'social',
      title: 'Gestión de redes',
      text: 'Nos encargamos de gestionar y publicar tus redes. No grabamos ni producimos el contenido.',
      todo: 'Alcance exacto de la gestión de redes (qué incluye, frecuencia, plataformas).',
    },
  ],
  projects: projectTexts(
    {
      miclase: {
        sector: 'Gestor para profesores particulares',
        description:
          'Alumnos, calendario, asistencia y cobros en un solo lugar. Para profesores de idiomas, música, arte, matemática y más.',
        features: [
          'Alumnos organizados por grupo',
          'Clases únicas o recurrentes, en vista semanal o mensual',
          'Asistencia y pagos: sabé quién te debe',
          'Funciona desde el celular, con acceso por Google o email',
        ],
      },
      jorgelinapmp: {
        sector: 'Sitio web de artista',
        description: 'Sitio web para mostrar obras y presentar a la artista.',
        features: [],
      },
    },
    { hero: 'Inicio', funciones: 'Funciones', 'como-funciona': 'Cómo funciona', pantallas: 'Pantallas', obras: 'Obras' },
    (project, device, screen) => `${project} ${device === 'desktop' ? 'en computadora' : 'en el celular'}: ${screen}.`,
  ),
  why: {
    lead: 'Somos KAPLA.',
    paragraphs: [
      'Diseñamos e implementamos sistemas de automatización de procesos e inteligencia artificial a medida para pequeñas y medianas empresas.',
      'Te ayudamos a cambiar la forma en que trabaja tu equipo: automatizamos lo repetitivo, ordenamos lo complejo y liberamos tiempo para que te enfoques en crecer.',
      'Trabajamos con PyMEs. Cada solución se diseña para los desafíos específicos de tu negocio.',
      'El objetivo: menos tareas repetitivas, menos errores y más tiempo para tu negocio.',
    ],
    cta: { label: 'Quiero una auditoría', href: esWhatsapp, external: true },
  },
  process: {
    intro: 'Cuatro pasos claros, desde el primer diagnóstico hasta el mantenimiento.',
    steps: [
      {
        icon: 'audit',
        title: 'Auditoría',
        text: 'Revisamos cómo trabaja hoy tu equipo y detectamos qué tareas consumen más tiempo o generan errores.',
      },
      {
        icon: 'design',
        title: 'Diseño',
        text: 'Definimos juntos qué se automatiza, con qué herramientas y dónde suma la inteligencia artificial.',
      },
      {
        icon: 'build',
        title: 'Implementación',
        text: 'Ponemos el sistema en marcha y lo conectamos con lo que ya usás, sin frenar tu operación.',
      },
      { icon: 'maintain', title: 'Mantenimiento', text: esAfter },
    ],
  },
  founder: esFounder,
  faq: esFaq,
  contact: {
    intro: 'Escribinos por WhatsApp, contanos cómo trabajás hoy y vemos por dónde empezar.',
    whatsappLabel: 'Escribinos por WhatsApp',
    emailLabel: 'O escribinos por email',
  },
  pages: {
    projects: {
      metaTitle: 'Proyectos | KAPLA',
      metaDescription: 'Sistemas y sitios web que KAPLA ya diseñó y puso en marcha. Mirá cómo se ven y cómo funcionan.',
    },
    about: {
      metaTitle: 'Nosotros | KAPLA',
      metaDescription: 'Quiénes somos en KAPLA y cómo ayudamos a las PyMEs a automatizar su trabajo con inteligencia artificial.',
    },
  },
  privacy: {
    metaTitle: 'Aviso de privacidad | KAPLA',
    metaDescription: 'Cómo KAPLA usa los datos que nos compartís al escribirnos.',
    title: 'Aviso de privacidad',
    updatedLabel: 'Última actualización',
    updated: '22 de octubre de 2026',
    sections: [
      {
        heading: 'Qué datos pedimos',
        paragraphs: [
          'Este sitio no tiene formularios y no recibe datos tuyos. Solo tenemos los que vos nos compartís cuando nos escribís por WhatsApp o por email: tu nombre, tu número o tu email, y lo que nos cuentes.',
        ],
      },
      {
        heading: 'Para qué los usamos',
        paragraphs: [
          'Solo para responder tu consulta y, si te interesa, coordinar una auditoría. No los vendemos, no los compartimos con fines comerciales y no te sumamos a listas de correo.',
        ],
      },
      {
        heading: 'Quién los recibe',
        paragraphs: [
          'Solo nosotros. Si nos escribís por WhatsApp, además aplica la política de privacidad de WhatsApp; si nos escribís por email, la de tu proveedor de correo.',
        ],
      },
      {
        heading: 'Cuánto tiempo los guardamos',
        paragraphs: ['Mientras dure la conversación con vos. Si no seguimos trabajando juntos, los borramos.'],
      },
      { heading: 'Cookies', paragraphs: ['Este sitio no usa cookies ni herramientas de seguimiento.'] },
      {
        heading: 'Tus derechos',
        email: true,
        paragraphs: [
          'Podés pedirnos ver, corregir o borrar tus datos cuando quieras, escribiendo a',
          'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a ellos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto (art. 14, inc. 3, Ley 25.326). La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos por incumplimiento de las normas sobre protección de datos personales.',
        ],
      },
    ],
    back: 'Volver al inicio',
  },
  showFounder: isDev || esFounder.bio.length > 0,
  showFaq: isDev || esFaq.some((item) => item.answer !== null),
};

// ---------------------------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------------------------
const enAfter = 'Up to 2 free revisions. After that, any extra request has a cost.';
const enWhatsapp = whatsappUrl("Hi, I'd like a free audit for my business.");
const enFaq: Content['faq'] = [
  {
    question: 'What is the audit?',
    answer: 'We review how your team works today and find which tasks take the most time or cause errors.',
  },
  { question: 'Do I need to know about technology?', answer: 'No. You just tell us your problem and we solve it.' },
  {
    question: 'Does it connect with the tools I already use?',
    answer: 'Yes. We connect it with what you already use, without slowing down your operation.',
  },
  { question: 'What happens after the implementation?', answer: enAfter },
  { question: 'How much does it cost?', answer: null },
  { question: 'How long does it take?', answer: null },
];
const enFounder: Content['founder'] = {
  name: 'Ignacio Castro',
  role: 'Founder',
  bio: [
    "I'm Ignacio, a software engineer. I automate processes and add artificial intelligence to small and medium businesses so they lose less time on repetitive tasks.",
  ],
};

const en: Content = {
  lang: 'en',
  meta: {
    title: 'KAPLA | Automation, AI and systems for small businesses',
    description:
      'KAPLA organizes and automates your small business: artificial intelligence, websites, CRMs and social media management. Request a free audit.',
    ogImageAlt: 'KAPLA logo on a dark blue background',
  },
  ui: {
    skip: 'Skip to content',
    mainNav: 'Main',
    homeAria: 'KAPLA, go to the top',
    menuToggle: 'Open or close the menu',
    newTab: 'opens in a new tab',
    languageLabel: 'Language',
    whatsappFloat: 'Message us on WhatsApp',
    privacyLink: 'Privacy notice',
    socialLabel: 'Social media',
    emailTodo: 'contact email.',
    projectsTabs: 'Projects',
    viewProjects: 'View projects',
    openProject: (name) => `View the ${name} project`,
    projectsStrip: 'Featured projects (swipe to see more)',
    projectCounter: (current, total) => `Project ${current} of ${total}`,
    projectHint: ' · swipe or use the arrows',
    prevProject: 'Previous project',
    nextProject: 'Next project',
    screensGroup: 'Screens',
    viewLive: 'View live',
    deviceDesktop: 'Computer',
    deviceMobile: 'Phone',
    shotAlt: (project, device, screen) => `${project} ${device === 'desktop' ? 'on a computer' : 'on a phone'}: ${screen}.`,
    testimonialsRegion: 'Client testimonials (swipe to see more)',
    founderAlt: (name, role) => `${name}, ${role} of KAPLA`,
  },
  whatsappMessage: "Hi, I'd like a free audit for my business.",
  nav: [
    { label: 'Services', href: pagePath('en', 'home', 'servicios') },
    { label: 'Projects', href: pagePath('en', 'projects') },
    { label: 'About us', href: pagePath('en', 'about') },
    { label: 'FAQ', href: pagePath('en', 'home', 'faq') },
  ],
  navCta: { label: 'Free audit', href: enWhatsapp, external: true },
  hero: {
    title: 'We automate your systems.',
    titleLead: 'We automate',
    titleWords: ['your systems', 'your social media', 'your inquiries', 'your processes', 'your tasks'],
    subtitle: 'Your business, fully organized.',
    highlight: 'organized',
    support: 'Artificial intelligence, websites, CRMs and social media, so your business runs without repetitive tasks.',
    primary: { label: 'I want an audit', href: enWhatsapp, external: true },
    secondary: { label: 'See our work', href: pagePath('en', 'home', 'proyectos') },
  },
  sections: {
    services: { id: 'servicios', title: 'Services', subtitle: 'Four ways to organize and automate your business.' },
    projects: { id: 'proyectos', title: 'Projects', subtitle: 'Systems and websites that are already running.' },
    why: { id: 'por-que', title: 'Why KAPLA' },
    process: { id: 'proceso', title: 'Process' },
    testimonials: { id: 'opiniones', title: 'What our clients say' },
    founder: { id: 'fundador', title: 'Founder' },
    faq: { id: 'faq', title: 'Frequently asked questions' },
    contact: { id: 'contacto', title: 'Request your free audit' },
  },
  services: [
    {
      icon: 'ai',
      title: 'AI automation',
      text: 'We let artificial intelligence handle the repetitive work: answering inquiries, organizing data and building reports.',
    },
    { icon: 'web', title: 'Websites', text: 'Clear, fast websites that explain what you do and make it easy to contact you.' },
    {
      icon: 'crm',
      title: 'Custom CRM',
      text: 'A system to follow your clients and inquiries in one place, built around how you work.',
    },
    {
      icon: 'social',
      title: 'Social media management',
      text: 'We manage and publish your social media. We do not film or produce the content.',
      todo: 'Alcance exacto de la gestión de redes (qué incluye, frecuencia, plataformas).',
    },
  ],
  projects: projectTexts(
    {
      miclase: {
        sector: 'Manager for private teachers',
        description:
          'Students, calendar, attendance and payments in one place. For teachers of languages, music, art, math and more.',
        features: [
          'Students organized by group',
          'One-off or recurring classes, in weekly or monthly view',
          'Attendance and payments: know who owes you',
          'Works from your phone, with Google or email sign-in',
        ],
      },
      jorgelinapmp: {
        sector: 'Artist website',
        description: 'A website to show artwork and introduce the artist.',
        features: [],
      },
    },
    { hero: 'Home', funciones: 'Features', 'como-funciona': 'How it works', pantallas: 'Screens', obras: 'Artwork' },
    (project, device, screen) => `${project} ${device === 'desktop' ? 'on a computer' : 'on a phone'}: ${screen}.`,
  ),
  why: {
    lead: 'We are KAPLA.',
    paragraphs: [
      'We design and implement custom process automation and artificial intelligence systems for small and medium businesses.',
      'We help you change the way your team works: we automate the repetitive, organize the complex and free up time so you can focus on growing.',
      'We work with small and medium businesses. Every solution is designed for the specific challenges of your business.',
      'The goal: fewer repetitive tasks, fewer mistakes and more time for your business.',
    ],
    cta: { label: 'I want an audit', href: enWhatsapp, external: true },
  },
  process: {
    intro: 'Four clear steps, from the first diagnosis to maintenance.',
    steps: [
      {
        icon: 'audit',
        title: 'Audit',
        text: 'We review how your team works today and find which tasks take the most time or cause errors.',
      },
      {
        icon: 'design',
        title: 'Design',
        text: 'Together we define what gets automated, with which tools and where artificial intelligence adds value.',
      },
      {
        icon: 'build',
        title: 'Implementation',
        text: 'We put the system into operation and connect it with what you already use, without slowing down your operation.',
      },
      { icon: 'maintain', title: 'Maintenance', text: enAfter },
    ],
  },
  founder: enFounder,
  faq: enFaq,
  contact: {
    intro: 'Message us on WhatsApp, tell us how you work today and we will see where to start.',
    whatsappLabel: 'Message us on WhatsApp',
    emailLabel: 'Or email us',
  },
  pages: {
    projects: {
      metaTitle: 'Projects | KAPLA',
      metaDescription: 'Systems and websites KAPLA has already designed and launched. See how they look and how they work.',
    },
    about: {
      metaTitle: 'About us | KAPLA',
      metaDescription: 'Who we are at KAPLA and how we help small businesses automate their work with artificial intelligence.',
    },
  },
  privacy: {
    metaTitle: 'Privacy notice | KAPLA',
    metaDescription: 'How KAPLA uses the data you share with us when you contact us.',
    title: 'Privacy notice',
    updatedLabel: 'Last updated',
    updated: 'October 22, 2026',
    sections: [
      {
        heading: 'What data we ask for',
        paragraphs: [
          'This website has no forms and does not collect data from you. We only have what you share with us when you contact us on WhatsApp or by email: your name, your number or email, and whatever you tell us.',
        ],
      },
      {
        heading: 'What we use it for',
        paragraphs: [
          'Only to answer your inquiry and, if you are interested, to arrange an audit. We do not sell it, we do not share it for commercial purposes and we do not add you to mailing lists.',
        ],
      },
      {
        heading: 'Who receives it',
        paragraphs: [
          'Only us. If you contact us on WhatsApp, the WhatsApp privacy policy also applies; if you email us, so does your email provider\'s.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: ['For as long as our conversation lasts. If we do not end up working together, we delete it.'],
      },
      { heading: 'Cookies', paragraphs: ['This website does not use cookies or tracking tools.'] },
      {
        heading: 'Your rights',
        email: true,
        paragraphs: [
          'You can ask us to see, correct or delete your data at any time by writing to',
          'Under Argentine Law 25.326, the data subject may exercise the right of access free of charge at intervals of no less than six months, unless a legitimate interest is shown (art. 14, sec. 3). The Agency for Access to Public Information (Agencia de Acceso a la Información Pública), the supervisory body for Law 25.326, handles complaints about non-compliance with personal data protection rules.',
        ],
      },
    ],
    back: 'Back to home',
  },
  showFounder: isDev || enFounder.bio.length > 0,
  showFaq: isDev || enFaq.some((item) => item.answer !== null),
};

const dictionaries: Record<Lang, Content> = { es, en };

export function getContent(locale: string | undefined): Content {
  return dictionaries[langOf(locale)];
}
