import type { Cta } from '../data/content';

/** Extra attributes for links that leave the site: new tab and no referrer/opener. `newTab` is the translated hint. */
export function externalAttrs(link: Cta, newTab: string) {
  return link.external
    ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (${newTab})` }
    : {};
}
