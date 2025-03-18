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
  
  // For first level categories, we need special handling
  // They should NOT be highlighted when their Overview child is active
  let shouldBeHighlighted = isExactlyActive;
  
  // If this is a first level category with children, it should only be highlighted
  // if it's not the case that one of its children is the Overview page being viewed
  if (isFirstLevel && item.children && item.children.length > 0) {
    // Check if the first child is "Overview" and is active
    const firstChild = item.children[0];
    const isFirstChildOverview = firstChild.text === "Overview" && firstChild.slug;
    const firstChildUrl = firstChild.slug ? urlWithSlash(firstChild.slug) : null;
    const isFirstChildActive = firstChildUrl === currUrl;
    
    // If we're viewing the Overview page, don't highlight the parent
    if (isFirstChildOverview && isFirstChildActive) {
      shouldBeHighlighted = false;
    }
  }
  
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

  return (
    <li 
      className={`group ${isOpen ? 'menu-open' : ''}`} 
      data-level={level}
    >
      <div className={`flex items-center justify-between font-normal rounded ${
        shouldBeHighlighted
          ? 'bg-opacity-10 bg-accent text-accent' 
          : 'text-readable-grey hover:content-bg' 
      }`}>
        <a
          href={hrefValue}
          onClick={handleClick}
          className={`w-full px-2 py-1 rounded ${
            shouldBeHighlighted ? 'text-accent font-medium' : 'text-readable-grey'
          }`}
        >
          <div className="flex items-center">
            {item.icon && <MenuIcon icon={item.icon} />}
            <span className="ml-2">{item.text}</span>
          </div>
        </a>
        {hasChildren && !item.hideChevron && (
          <div 
            className={`px-2 cursor-pointer transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            onClick={handleChevronClick}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        )}
      </div>
      {isOpen && hasChildren && (
        <ul className="ms-4 ps-0" style={{ borderLeft:'thin dotted #555', borderLeftColor: 'var(--color-neutral-400)' }}>
          {item.children!.map((child, idx) => (
            <NavItem
              key={`${child.text}-${child.slug || idx}`}
              item={child}
              currentPageNoLangNoVer={currentPageNoLangNoVer}
              categoryLinkPrefix={categoryLinkPrefix}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;