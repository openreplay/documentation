import type { AstroGlobal } from 'astro';
import { getNav } from '../i18n/util';
import { getLanguageFromURL } from '../util';

interface NavItem {
	text: string;
	slug: string;
}

interface LinkItem {
	text: string;
	link: string;
}

interface PreviousAndNext {
	previous?: LinkItem;
	next?: LinkItem;
}


function flattenNav(items: NavItem[]): NavItem[] {
  const flat: NavItem[] = [];
  items.forEach((item) => {
    flat.push(item);
    if (item.children && item.children.length > 0) {
      flat.push(...flattenNav(item.children));
    }
  });
  return flat;
}

export async function getNavLinks(Astro: Readonly<AstroGlobal>): Promise<PreviousAndNext> {
  const navTree = await getNav(Astro);
  const allLinks = flattenNav(navTree.children || []);
  const linksWithSlugs = allLinks.filter((x) => x.slug);
  return getPreviousAndNext(linksWithSlugs, Astro);
}

export function getPreviousAndNext(
	links: NavItem[],
	Astro: Readonly<AstroGlobal>
): PreviousAndNext {
	const index = links.findIndex((x) => Astro.url.pathname.replace(/\/$/, '').endsWith(x.slug));
	const lang = getLanguageFromURL(Astro.url.pathname);

	const makeLinkItem = ({ text, slug }: NavItem): LinkItem => ({ text, link: `/${lang}/${slug}/` });

	return {
		previous: index > 0 ? makeLinkItem(links[index - 1]) : undefined,
		next: index !== -1 && index < links.length - 1 ? makeLinkItem(links[index + 1]) : undefined,
	};
}
