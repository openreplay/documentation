import React, { useEffect, useRef } from 'react';

interface LeftSidebarWrapperProps {
  children: React.ReactNode;
}

function LeftSidebarWrapper({ children }: LeftSidebarWrapperProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Restore scroll position on mount
  useEffect(() => {
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('sidebarScrollPosition');
      if (savedPosition && sidebarRef.current) {
        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          if (sidebarRef.current) {
            sidebarRef.current.scrollTop = parseInt(savedPosition, 10);
          }
        }, 0);
      }
    };
    
    restoreScrollPosition();
    
    // Listen for pageshow event (browser back/forward)
    window.addEventListener('pageshow', restoreScrollPosition);
    return () => {
      window.removeEventListener('pageshow', restoreScrollPosition);
    };
  }, []);
  
  return (
    <div 
      ref={sidebarRef} 
      className="sidebar-scroll-container"
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default LeftSidebarWrapper;