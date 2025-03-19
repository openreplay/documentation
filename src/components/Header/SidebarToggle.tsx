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
            body.classList.add('mobile-sidebar-toggle');
        } else {
            body.classList.remove('mobile-sidebar-toggle');
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

    return (
        <button
            id="menu-toggle"
            className="header-button ml-4"
            type="button"
            aria-pressed={sidebarShown ? 'true' : 'false'}
            onClick={() => setSidebarShown(!sidebarShown)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
            <span className="sr-only">Toggle sidebar</span>
        </button>
    );
};

export default MenuToggle;
