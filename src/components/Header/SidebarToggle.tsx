import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './HeaderButton.css';
import './SidebarToggle.css';

const MenuToggle: FunctionalComponent = () => {
    const [sidebarShown, setSidebarShown] = useState(false);

    const openCurrentMenu = () => {
        document.querySelectorAll('aside nav details').forEach((e) => {
            e.removeAttribute('open');
        });
        document
            .querySelector('details a[data-current-parent="true"]')
            ?.closest('details')
            ?.setAttribute('open', '');
    };

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        if (sidebarShown) {
            // iOS-safe scroll lock: pin the page at its current offset with position:fixed.
            // On phones the document is the scroller; toggling `overflow:hidden` on the root
            // instead makes iOS Safari's toolbar stick and leaves a black gap. Pinning the
            // body and restoring the scroll on close keeps the toolbar behaving normally.
            const scrollY = window.scrollY;
            body.dataset.scrollLock = String(scrollY);
            body.classList.add('mobile-sidebar-toggle');
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.left = '0';
            body.style.right = '0';
        } else {
            const locked = body.dataset.scrollLock;
            body.classList.remove('mobile-sidebar-toggle');
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            if (locked !== undefined) {
                delete body.dataset.scrollLock;
                // Restoring the offset also re-establishes the scroll context, so iOS Safari
                // resumes hiding/showing its toolbar on scroll after the menu closes.
                window.scrollTo(0, parseInt(locked, 10) || 0);
            }
        }
        openCurrentMenu();
    }, [sidebarShown]);

    // Listen for custom event to close mobile sidebar.
    useEffect(() => {
        const handler = () => setSidebarShown(false);
        window.addEventListener('mobile-sidebar-closed', handler);
        return () => {
            window.removeEventListener('mobile-sidebar-closed', handler);
        };
    }, []);

    // The search modal (DocSearch, z-9999) and the sidebar drawer (z-50) must not
    // both be open — otherwise the drawer slides in *behind* the search overlay and
    // looks unresponsive. Keep them mutually exclusive.
    const openSearch = () => {
        setSidebarShown(false);
        window.dispatchEvent(new Event('open-docsearch'));
    };
    const toggleSidebar = () => {
        setSidebarShown((prev) => {
            const next = !prev;
            // DocSearch closes on Escape — dispatch it when opening the drawer so the
            // drawer isn't hidden behind an open search modal.
            if (next) {
                document.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true })
                );
            }
            return next;
        });
    };

    return (
        <div className='or-mobile-toggle flex gap-2 items-center md:hidden'>
        <button
            id="btn-search-mobile"
            className="header-button inline-flex"
            type="button"
            onClick={openSearch}
        >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span className="sr-only">Search</span>
        </button>
        <button
            id="menu-toggle"
            className="header-button"
            type="button"
            aria-pressed={sidebarShown ? 'true' : 'false'}
            onClick={toggleSidebar}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
            <span className="sr-only">Toggle sidebar</span>
        </button>
        </div>
    );
};

export default MenuToggle;
