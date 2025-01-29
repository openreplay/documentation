import type { ModalTranslations } from '@docsearch/react';
import nav, { NavItem } from './en/nav';
import type enUI from './en/ui';

export type UIDictionaryKeys = keyof typeof enUI;
export type UIDict = Partial<typeof enUI>;

/** Helper to type check a dictionary of UI string translations. */
export const UIDictionary = (dict: Partial<typeof enUI>) => dict;

export interface DocSearchTranslation {
	button?: string;
	shortcutLabel?: string;
	placeholder?: string;
	modal?: ModalTranslations;
}

/** Helper to type check a dictionary of DocSearch string translations. */
export const DocSearchDictionary = (dict: DocSearchTranslation) => dict;

/** Recursively apply translations from the passed dictionary to the nav items. */
function applyTranslations(item: NavItem, dict: Partial<Record<string, string>>): NavItem {
	const text = item.key ? dict[item.key] || item.text : item.text;
	return {
		...item,
		text,
		children: item.children?.map(child => applyTranslations(child, dict)) || [],
	};
}

/**
 * Returns a fully translated navigation tree, falling back on
 * English if the translation is missing.
 */
export const NavDictionary = (dict: Partial<Record<string, string>> = {}) => {
	return applyTranslations(nav, dict);
};
