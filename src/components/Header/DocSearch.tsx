import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { useEffect, useState } from 'preact/hooks';
import type { DocSearchTranslation } from '../../i18n/translation-checkers';
import { getVersionFromURL, __LATEST__, getLanguageFromURL } from '../../util';

interface Props {
	lang?: string;
	labels: Pick<DocSearchTranslation, 'modal' | 'placeholder'>;
}

export default function Search({ lang = 'en', labels }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [initialQuery, setInitialQuery] = useState<string>();
	const [version, setVersion] = useState('');
	const [language, setLanguage] = useState('');

	const onOpen = () => {
		setIsOpen(true);
	}

	const onClose = () => {
		setIsOpen(false);
	}

	const onInput = (e) => {
			setIsOpen(true);
			setInitialQuery(e.key);
	}

	useEffect(() => {
		let v = getVersionFromURL(window.location.href);
		let l = getLanguageFromURL(window.location.href);
		setVersion(v ? 'v' + v : __LATEST__);
		setLanguage(l);
		window.addEventListener('open-docsearch', onOpen);
		console.log('test')
		return () => {
			window.removeEventListener('open-docsearch', onOpen);
		}
	}, []);

	useDocSearchKeyboardEvents({
		isOpen,
		onOpen,
		onClose,
		onInput,
	});

	if (!isOpen) return null;

	return (
		<DocSearchModal
			initialQuery={initialQuery}
			initialScrollY={window.scrollY}
			onClose={onClose}
			indexName={import.meta.env.PUBLIC_ALGOLIA_INDEX ?? 'test'}
			appId={import.meta.env.PUBLIC_ALGOLIA_KEY ?? 'test'}
			apiKey={import.meta.env.PUBLIC_ALGOLIA_SECRET ?? 'test'}
			//searchParameters={{ filters: `version:${version}` }}
			searchParameters={{
				facetFilters: [`version:${version}`, `lang:${language}`],
				facets: ['*', 'version', 'lang'],
				attributesToRetrieve: ['title', 'version', 'slug', 'hierarchy', 'body', 'excerpt'],
			}}
			// searchParameters={{ facetFilters: [[`lang:${lang}`]] }}
			// searchParameters={{ facetFilters: [`lang:${lang}`, `version:${version}`] }}
			// hitComponent={CustomHit}
			transformItems={(items) => {
				// Production/preview builds serve the default locale (en) at the site
				// root (e.g. /installation/...), so a slug like "en/installation/x"
				// must drop its /en prefix or the result 404s. On localhost pages are
				// served under /en/, so keep it there.
				const onLocalhost =
					typeof location !== 'undefined' &&
					(location.hostname === 'localhost' || location.hostname.startsWith('127.'));
				return items.map((item) => {
					// We transform the absolute URL into a relative URL to
					// work better on localhost, preview URLS.
					const a = document.createElement('a');
					a.href = '/' + item.slug;
					item.type = 'lvl1';
					item.title = '';
					const hash = a.hash === '#overview' ? '' : a.hash;
					const pathname = onLocalhost ? a.pathname : a.pathname.replace(/^\/en(?=\/|$)/, '');
					return {
						...item,
						url: `${pathname || '/'}${hash}`,
					};
				});
			}}
			placeholder={labels.placeholder}
			translations={labels.modal}
		/>
	);
}
