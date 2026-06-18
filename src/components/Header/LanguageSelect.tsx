import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import languages from '../../i18n/languages';
import './LanguageSelect.css';

const LanguageSelect: FunctionalComponent<{ lang: string }> = ({ lang }) => {
	const code = (lang || 'en').split('-')[0].toUpperCase();
	return (
		<div className="lang-pill">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<circle cx="12" cy="12" r="9"></circle>
				<path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path>
			</svg>
			<span className="lang-pill-code">{code}</span>
			<svg className="lang-pill-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path d="m6 9 6 6 6-6"></path>
			</svg>
			<select
				className="lang-pill-select"
				value={lang}
				aria-label="Select language"
				onChange={(e) => {
					const newLang = (e.target as HTMLSelectElement).value;
					const [_leadingSlash, _oldLang, ...rest] = window.location.pathname.split('/');
					const slug = rest.join('/');
					window.location.pathname = `/${newLang}/${slug}`;
				}}
			>
				{Object.entries(languages).map(([code, name]) => (
					<option value={code}>{name}</option>
				))}
			</select>
		</div>
	);
};

export default LanguageSelect;
