// Language-neutral site data (name, contact, links, project files). Translatable text lives in content.ts.
import type { ImageMetadata } from 'astro';
import miclaseLogo from '../assets/projects/miclase-logo-512.png';
import jorgelinaLogo from '../assets/projects/logo_jpmp_blanco.png';

export type ServiceIcon = 'ai' | 'web' | 'crm' | 'social';
export type ProcessIcon = 'audit' | 'design' | 'build' | 'maintain';
export type SocialName = 'instagram' | 'linkedin' | 'tiktok';

export interface SocialLink {
  name: SocialName;
  label: string;
  /** null until the real profile exists. */
  href: string | null;
}

export const site = {
  name: 'KAPLA',
  email: 'kaplatech.ar@gmail.com' as string | null,
  // International format, digits only (used in https://wa.me/<number>).
  whatsapp: '5491126944636',
  // Share preview (1200x630, in public/): wordmark on the brand gradient.
  ogImage: '/og-image.png' as string | null,
};

export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kapla.tech/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/kaplatech' },
  { name: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@kapla.tech' },
];

export interface ProjectShot {
  src: ImageMetadata;
  /** Short name of the screen, shown in the selector (e.g. 'Features'). */
  label: string;
  alt: string;
}

/** A project with its text already in one language (built in content.ts). */
export interface Project {
  id: string;
  name: string;
  /** Industry or kind of project, shown in the tab. */
  sector: string;
  /** Honest status label (e.g. 'En desarrollo'). Leave out when there is nothing to flag. */
  status?: string;
  /** Small logo shown next to the name (shown on a dark chip, so white logos work). */
  logo?: ImageMetadata;
  description: string;
  features: string[];
  url: string;
  /** Domain shown in the browser frame. */
  domain: string;
  desktop: ProjectShot[];
  mobile: ProjectShot[];
}

export interface ProjectBase {
  id: string;
  name: string;
  logo?: ImageMetadata;
  url: string;
  domain: string;
  /** Screenshots by device. Files: src/assets/projects/<id>-desktop-<screen>.jpg and <id>-celular-<screen>.jpg. */
  desktop: { src: ImageMetadata; screen: string }[];
  mobile: { src: ImageMetadata; screen: string }[];
}

const shotFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

// Order in which the screens are shown (the last part of the file name). Names are translated in content.ts.
const screenOrder = ['hero', 'funciones', 'como-funciona', 'pantallas', 'obras'];

function shots(id: string, device: 'desktop' | 'celular') {
  const pattern = new RegExp(`/${id}-${device}-([a-z-]+)\\.(png|jpe?g|webp)$`);
  const found: { src: ImageMetadata; screen: string }[] = [];
  for (const [path, file] of Object.entries(shotFiles)) {
    const screen = pattern.exec(path)?.[1];
    if (screen) found.push({ src: file.default, screen });
  }
  const rank = (screen: string) => {
    const index = screenOrder.indexOf(screen);
    return index === -1 ? screenOrder.length : index;
  };
  return found.sort((a, b) => rank(a.screen) - rank(b.screen));
}

// To add a project: add an entry here, its texts in content.ts (both languages) and its screenshots in
// src/assets/projects/.
export const projectBase: ProjectBase[] = [
  {
    id: 'miclase',
    name: 'MiClase',
    logo: miclaseLogo,
    url: 'https://miclase.net.ar/',
    domain: 'miclase.net.ar',
    desktop: shots('miclase', 'desktop'),
    mobile: shots('miclase', 'celular'),
  },
  {
    id: 'jorgelinapmp',
    name: 'Jorgelina PMP',
    logo: jorgelinaLogo,
    url: 'https://jorgelinapmp.com.ar/',
    domain: 'jorgelinapmp.com.ar',
    desktop: shots('jorgelinapmp', 'desktop'),
    mobile: shots('jorgelinapmp', 'celular'),
  },
];

export interface Testimonial {
  /** Person's name, and company if any (e.g. 'Ana López, Estudio López'). */
  name: string;
  /** Industry or profession (e.g. 'Contadora'). */
  role: string;
  quote: string;
}

// Only real testimonials, published with the person's permission.
// While this list is empty the section is not shown in production.
// TODO-CONTENIDO: add real testimonials (name/company, industry/profession, comment).
export const testimonials: Testimonial[] = [];

/** Dev-only placeholders to preview the layout. Never rendered in production. */
export const sampleTestimonials: Testimonial[] = [
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo. Acá va la opinión real del cliente, en dos o tres líneas.' },
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo un poco más largo, para ver cómo se acomoda la tarjeta cuando el texto ocupa varias líneas en el celular.' },
  { name: 'Nombre Apellido', role: 'Rubro o profesión', quote: 'Comentario de ejemplo corto.' },
  { name: 'Nombre Apellido, Empresa', role: 'Rubro o profesión', quote: 'Comentario de ejemplo. Con cuatro o más opiniones la fila se desliza hacia el costado.' },
];

// TODO-CONTENIDO: photo. Drop `founder.png|jpg|webp` in src/assets/ (square, at least 640 px).
const founderFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/founder.{png,jpg,jpeg,webp}', {
  eager: true,
});
export const founderPhoto: ImageMetadata | null = Object.values(founderFiles)[0]?.default ?? null;
