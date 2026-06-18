import React, { useEffect } from 'react';
import type { NavItem } from '../../i18n/en/nav';
import MenuIcon from './MenuIcon';

interface Props {
  item: NavItem;
  currentPageNoLangNoVer: string;
  categoryLinkPrefix: string;
}

const urlWithSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);

// Create a cache for open state that persists across renders
const openStateCache = new Map<string, boolean>();

function NavItem({ item, currentPageNoLangNoVer, categoryLinkPrefix, level = 0 }: Props & { level?: number }) {
  const isToggleList = item.slug === null;
  const currUrl = urlWithSlash(currentPageNoLangNoVer);
  
  // First level check - this helps fix the specific issue with parent items like "Deployment"
  const isFirstLevel = level === 0;
  
  // Check for Overview specifically
  const isOverviewItem = item.text === "Overview";
  
  // Get the URL for this item
  const itemUrl = item.slug ? urlWithSlash(item.slug) : null;
  
  // Basic exact active check - URL must match exactly
  const isExactlyActive = itemUrl === currUrl;

  // A parent and an "Overview"-style child often share the same slug. At ANY
  // depth, when one of an item's children matches the current URL exactly, only
  // the (deepest) child should be highlighted — never the ancestor too.
  const hasExactlyActiveChild = item.children?.some(
    (child) => child.slug != null && urlWithSlash(child.slug) === currUrl
  );
  const shouldBeHighlighted = isExactlyActive && !hasExactlyActiveChild;

  // Check if any child is active (for expanding parent menus)
  const hasActiveChild = item.children?.some(
    (child) => {
      if (!child.slug) return false;
      return currUrl.startsWith(urlWithSlash(child.slug));
    }
  );
  
  // Determine if menu should be expanded
  const shouldBeOpen = isExactlyActive || hasActiveChild;

  const itemKey = `${item.text}:${item.slug || "null"}`;
  const initialOpenState = openStateCache.has(itemKey) 
    ? openStateCache.get(itemKey) 
    : shouldBeOpen;

  const [isOpen, setIsOpen] = React.useState(initialOpenState);
  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    // Keep parent menus open when child is active
    if (shouldBeOpen && !isOpen) {
      setIsOpen(true);
    }
    
    openStateCache.set(itemKey, isOpen ?? false);
  }, [isOpen, itemKey, shouldBeOpen]);

  const handleClick = (e: React.MouseEvent) => {
    if (isToggleList || (hasChildren && !item.hideChevron)) {
      e.preventDefault();
      setIsOpen(!isOpen);
      const scrollContainer = document.querySelector('.sidebar-scroll-container');
      if (scrollContainer) {
        sessionStorage.setItem('sidebarScrollPosition', scrollContainer.scrollTop.toString());
      }
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    const scrollContainer = document.querySelector('.sidebar-scroll-container');
    if (scrollContainer) {
      sessionStorage.setItem('sidebarScrollPosition', scrollContainer.scrollTop.toString());
    }
  };

  const hrefValue = !isToggleList
    ? categoryLinkPrefix + item.slug
    : '#';

  const rawText = typeof item.text === 'string' ? item.text : String(item.text ?? '');
  const isBeta = /\(beta\)/i.test(rawText);
  const label = rawText.replace(/\s*\(beta\)/i, '');
  const showIcon = level === 0 && item.icon && item.icon !== 'null';

  return (
    <li
      className={`or-nav-li ${isOpen ? 'open' : ''}`}
      data-level={level}
      data-current-parent={shouldBeHighlighted ? 'true' : undefined}
    >
      <div className={`or-navrow ${shouldBeHighlighted ? 'active' : ''}`}>
        <a
          href={hrefValue}
          onClick={handleClick}
          className={`or-navlink lvl-${level}`}
          aria-current={shouldBeHighlighted ? 'page' : undefined}
        >
          {showIcon && (
            <span className="or-navico">
              <MenuIcon icon={item.icon} />
            </span>
          )}
          <span className="or-navlabel">{label}</span>
          {isBeta && <span className="navbeta">beta</span>}
        </a>
        {hasChildren && !item.hideChevron && (
          <button
            type="button"
            aria-label="Toggle section"
            className={`or-navchev ${isOpen ? 'open' : ''}`}
            onClick={handleChevronClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
      </div>
      {isOpen && hasChildren && (
        <ul className="or-navchildren">
          {item.children!.map((child, idx) => (
            <NavItem key={`${child.text}-${child.slug || idx}`} item={child} currentPageNoLangNoVer={currentPageNoLangNoVer} categoryLinkPrefix={categoryLinkPrefix} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;