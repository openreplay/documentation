import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import { createPortal } from 'preact/compat';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { DocSearchTranslation } from '../../i18n/translation-checkers';
import { getVersionFromURL, __LATEST__, getLanguageFromURL } from '../../util';

interface Props {
	lang?: string;
	labels: Pick<DocSearchTranslation, 'modal' | 'placeholder'>;
}

export default function Search({ lang = 'en', labels }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const searchButtonRef = useRef(document.getElementById('docsearch-search-button'));
	const [initialQuery, setInitialQuery] = useState<string>();
	const [version, setVersion] = useState('');
	const [language, setLanguage] = useState('');

	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, [setIsOpen]);

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const onInput = useCallback(
		(e) => {
			setIsOpen(true);
			setInitialQuery(e.key);
		},
		[setIsOpen, setInitialQuery]
	);

	useEffect(() => {
		let v = getVersionFromURL(window.location.href);
		let l = getLanguageFromURL(window.location.href);
		// console.log('v', v)
		setVersion(v ? 'v' + v : __LATEST__);
		setLanguage(l);
	}, []);

	useEffect(() => {
		searchButtonRef.current?.addEventListener('click', onOpen);
		return () => searchButtonRef.current?.removeEventListener('click', onOpen);
	}, [searchButtonRef.current, onOpen]);

	useEffect(() => {
		const handleOpen = () => setIsOpen(true);
		window.addEventListener('open-docsearch', handleOpen);
		return () => window.removeEventListener('open-docsearch', handleOpen);
	}, []);

	useDocSearchKeyboardEvents({
		isOpen,
		onOpen,
		onClose,
		onInput,
		searchButtonRef,
	});

	if (!isOpen) return null;

	function CustomHit(props) {
		console.log('props', props)
		return (
		  <div className="border p-2">
			<a href={props.hit.url}>
				<h2 className="font-medium text-lg">{props.hit.title}</h2>
			</a>
			<p className="">{props.hit.body}</p>
			<p>{props.hit.version}</p>
			{/* <a href={props.hit.url}>Read More</a> */}
		  </div>
		);
	  }

	return createPortal(
		<DocSearchModal
			initialQuery={initialQuery}
			initialScrollY={window.scrollY}
			onClose={onClose}
			indexName={import.meta.env.PUBLIC_ALGOLIA_INDEX}
			appId={import.meta.env.PUBLIC_ALGOLIA_KEY}
			apiKey={import.meta.env.PUBLIC_ALGOLIA_SECRET}
			//searchParameters={{ filters: `version:${version}` }}
			searchParameters={{ facetFilters: [`version:${version}`,`lang:${language}` ], facets:["*", "version", "lang"], attributesToRetrieve: ["title", "version", "slug", "hierarchy", "body", "excerpt"] }}
			// searchParameters={{ facetFilters: [[`lang:${lang}`]] }}
			// searchParameters={{ facetFilters: [`lang:${lang}`, `version:${version}`] }}
			// hitComponent={CustomHit}
			transformItems={(items) => {
				return items.map((item) => {
					// console.log('item', item);
					// We transform the absolute URL into a relative URL to
					// work better on localhost, preview URLS.
					const a = document.createElement('a');
					a.href = "/" + item.slug;
					item.type="lvl1"
					item.title = ""
					const hash = a.hash === '#overview' ? '' : a.hash;
					return {
						...item,
						url: `${a.pathname}${hash}`,
					};
				});
			}}
			placeholder={labels.placeholder}
			translations={labels.modal}
		/>,
		document.body
	);
}
