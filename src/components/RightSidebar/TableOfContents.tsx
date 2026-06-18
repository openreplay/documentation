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
    headings = headings.filter(({ depth }) => depth > 1 && depth < 4);
    const toc = useRef<HTMLUListElement | null>(null);
    const [currentID, setCurrentID] = useState(headings[0]?.slug || 'overview');
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
        // Position-based scroll-spy against the actual scroll container
        // (#or-main-scroll). An IntersectionObserver top-zone can never
        // activate the LAST heading (nothing below it pushes it into the zone),
        // so we pick the last heading above an activation line and add an
        // explicit "scrolled to bottom" guard.
        const scroller =
            (typeof document !== 'undefined' && document.getElementById('or-main-scroll')) || null;
        const headingEls = () =>
            headings
                .map(({ slug }) => document.getElementById(slug))
                .filter((el): el is HTMLElement => !!el);

        const update = () => {
            const els = headingEls();
            if (!els.length) return;
            const top = scroller ? scroller.getBoundingClientRect().top : 0;
            const line = top + 120; // activation line ~120px below the scroll area's top
            let cur = els[0].id;
            for (const el of els) {
                if (el.getBoundingClientRect().top <= line) cur = el.id;
            }
            // At (or near) the bottom, the last section is the active one.
            if (
                scroller &&
                scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 8
            ) {
                cur = els[els.length - 1].id;
            }
            setCurrentID(cur);
        };

        const target: HTMLElement | Window = scroller || window;
        target.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();

        return () => {
            target.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [headings.map((h) => h.slug).join('|')]);

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
            <ul ref={toc} className='or-toc-list'>
                {headings.map(({ depth, slug, text }) => (
                    <li
                        key={slug}
                        className={`header-link or-toclink depth-${depth} ${
                            currentID === slug ? 'current-header-link active' : ''
                        }`.trim()}
                    >
                        <a href={`#${slug}`} onClick={onLinkClick}>
                            <span className="tick" aria-hidden="true"></span>
                            <span className="or-toc-text">{unescape(text)}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TableOfContents;
