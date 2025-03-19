import { unescape } from 'html-escaper';
import type { FunctionalComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import type React from 'react';
import './TableOfContents.css';

interface Props {
    headings: { depth: number; slug: string; text: string }[];
    labels: { onThisPage: string; overview: string; };
    isMobile?: boolean;
}

const TableOfContents: FunctionalComponent<Props> = ({ headings = [], labels, isMobile }) => {
    headings = [{ depth: 2, slug: 'overview', text: labels.overview }, ...headings].filter(
        ({ depth }) => depth > 1 && depth < 4
    );
    const toc = useRef<HTMLUListElement | null>(null);
    const [currentID, setCurrentID] = useState('overview');
    const [open, setOpen] = useState(!isMobile);
    const onThisPageID = 'on-this-page-heading';

    const Container = ({ children }: { children: React.ReactNode }) => {
        return isMobile ? (
            <details {...{ open }} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)} className="toc-mobile-container"> {children} </details>
        ) : ( children );
    };

    const HeadingContainer = ({ children }: { children: React.ReactNode }) => {
        const currentHeading = headings.find(({ slug }) => slug === currentID);
        return isMobile ? (
            <summary className="toc-mobile-header">
                <div className="toc-mobile-header-content">
                    <div className="toc-toggle">
                        {children}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 16 16" width="16" height="16" aria-hidden="true" > 
                            <path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" ></path> 
                        </svg>
                        {!open && currentHeading?.slug !== 'overview' && (
                            <span className="toc-current-heading">{unescape(currentHeading?.text || '')}</span>
                        )}
                    </div>
                </div>
            </summary>
        ) : (
            children
        );
    };

    useEffect(() => {
        if (!toc.current) return;

        const setCurrent: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const { id } = entry.target;
                    if (id === onThisPageID) continue;
                    setCurrentID(entry.target.id);
                    break;
                }
            }
        };

        const observerOptions: IntersectionObserverInit = {
            // Negative top margin accounts for `scroll-margin`.
            // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
            rootMargin: '-100px 0% -66%',
            threshold: 1,
        };

        const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

        // Observe all the headings in the main page content.
        document.querySelectorAll('article :is(h1,h2,h3)').forEach((h) => headingsObserver.observe(h));

        // Stop observing when the component is unmounted.
        return () => headingsObserver.disconnect();
    }, [toc.current]);

    // Add click outside behavior for mobile view.
    useEffect(() => {
        // Only run when in mobile mode and when TOC is open.
        if (!isMobile || !open) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (toc.current && !toc.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMobile, open]);

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isMobile) return;
        setOpen(false);
        setCurrentID((e.target as HTMLAnchorElement).getAttribute('href')?.replace('#', '') || '');
    };

    return (
        <Container>
            <HeadingContainer>
                <h2 className="heading" id={onThisPageID}>
                    {labels.onThisPage}
                </h2>
            </HeadingContainer>
            <ul ref={toc} className='py-3 space-y-1'>
                {headings.map(({ depth, slug, text }) => (
                    <li
                        key={slug}
                        className={`header-link depth-${depth} ${
                            currentID === slug ? 'current-header-link' : ''
                        }`.trim()}
                    >
                        <a href={`#${slug}`} onClick={onLinkClick}>
                            {unescape(text)}
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TableOfContents;
