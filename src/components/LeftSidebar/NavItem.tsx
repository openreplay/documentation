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

function NavItem({ item, currentPageNoLangNoVer, categoryLinkPrefix }: Props) {
  const isToggleList = item.slug === null;
  const currUrl = urlWithSlash(currentPageNoLangNoVer);
  const childrenActive = isToggleList 
    ? item.children?.some((child) => child.slug && currUrl.startsWith(urlWithSlash(child.slug))) 
    : false;
  const slugActive = !item.slug 
    ? false 
    : currUrl === urlWithSlash(item.slug) || item.children?.some((child) => child.slug && currUrl.startsWith(urlWithSlash(child.slug)));

  const isActive = childrenActive || slugActive;
  
  // Create a unique key for this item to store its open state
  const itemKey = `${item.text}:${item.slug || "null"}`;
  
  // Initialize state from cache if available, otherwise use isActive
  const initialOpenState = openStateCache.has(itemKey) 
    ? openStateCache.get(itemKey) 
    : isActive;
  
  const [isOpen, setIsOpen] = React.useState(initialOpenState);
  const hasChildren = item.children && item.children.length > 0;
  
  // Update cache whenever open state changes
  useEffect(() => {
    openStateCache.set(itemKey, isOpen);
  }, [isOpen, itemKey]);
  
  const handleClick = (e: React.MouseEvent) => {
    if (isToggleList || (hasChildren && !item.hideChevron)) {
      e.preventDefault();
      setIsOpen(!isOpen);
      // Save scroll position when toggling
      const scrollContainer = document.querySelector('.sidebar-scroll-container');
      if (scrollContainer) {
        sessionStorage.setItem('sidebarScrollPosition', scrollContainer.scrollTop.toString());
      }
    } else {
      // Save scroll position when navigating
      const scrollContainer = document.querySelector('.sidebar-scroll-container');
      if (scrollContainer) {
        sessionStorage.setItem('sidebarScrollPosition', scrollContainer.scrollTop.toString());
      }
    }
  };
  
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    // Save scroll position when toggling
    const scrollContainer = document.querySelector('.sidebar-scroll-container');
    if (scrollContainer) {
      sessionStorage.setItem('sidebarScrollPosition', scrollContainer.scrollTop.toString());
    }
  };
  
  const hrefValue = !isToggleList
    ? categoryLinkPrefix + item.slug
    : '#';

  return (
    <li className={isOpen ? 'menu-item active' : 'menu-item'}>
      <div
        className="flex items-center justify-between font-normal px-2"
        style={{ display: 'flex' }}
      >
        <a
          href={hrefValue}
          onClick={handleClick}
          className="w-full"
        >
          <div className="flex items-center">
            {item.icon && <MenuIcon icon={item.icon} />}
            <span className="ml-2">{item.text}</span>
          </div>
        </a>
        {hasChildren && !item.hideChevron && (
          <div 
            className="toggle px-2 cursor-pointer" 
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
        <ul className="submenu mt-0.5">
          {item.children!.map((child, idx) => (
            <NavItem
              key={`${child.text}-${child.slug || idx}`}
              item={child}
              currentPageNoLangNoVer={currentPageNoLangNoVer}
              categoryLinkPrefix={categoryLinkPrefix}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;
