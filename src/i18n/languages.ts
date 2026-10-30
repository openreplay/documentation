/**
 * Map of language codes to a written out language name.
 * Used to populate the language switcher in the navbar.
 */
export default {
	en: 'English',
	// de: 'Deutsch',
	// es: 'Español',
	// 'zh-cn': '简体中文',
	// 'zh-tw': '正體中文',
	// fr: 'Français',
	// ar: 'العربية',
	// ru: 'Русский',
	es: 'Espa\xF1ol',
	fr: 'Fran\xE7ais',
	ru: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
	zh: '\u4e2d\u6587',
	'ar-ae': '\u0627\u0644\u0639\u0631\u0628\u064A\u0629',
	ja: '\u65E5\u672C\u8A9E',
	'pt-br': 'Portugu\xEAs do Brasil'
};
export const rtlLanguages = new Set(['ar', 'ar-ae']);

/**
 * Languages translated for the latest docs version only (no `vX.Y.Z/` folders).
 * Versioned URLs in these languages fall back to English: the version and
 * language pickers route there directly, and hreflang alternates skip them.
 */
export const latestOnlyLanguages = new Set(['ja', 'pt-br']);
