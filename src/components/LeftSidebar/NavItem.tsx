import React from 'react'
import type { NavItem } from '../../i18n/en/nav'
import MenuIcon from './MenuIcon'

interface Props {
  item: NavItem
  currentPageNoLangNoVer: string
  categoryLinkPrefix: string
}

const urlWithSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`)

function NavItem({ item, currentPageNoLangNoVer, categoryLinkPrefix }: Props) {
  const isToggleList = item.slug === null
  const currUrl = urlWithSlash(currentPageNoLangNoVer)
  const childrenActive = isToggleList ? item.children?.some((child) => child.slug && currUrl.startsWith(urlWithSlash(child.slug))) : false
  const slugActive = !item.slug ? false : currUrl === urlWithSlash(item.slug) || item.children?.some((child) => child.slug && currUrl.startsWith(urlWithSlash(child.slug)))

  const isActive = childrenActive || slugActive
  const [isOpen, toggleOpen] = React.useState(isActive)
  const hasChildren = item.children && item.children.length > 0

  const onLinkClick = (e: React.MouseEvent) => {
    if (isToggleList) {
      toggleOpen(!isOpen)
      e.preventDefault()
    }
  }
  const hrefValue = !isToggleList
    ? categoryLinkPrefix + item.slug
    : item.slug

  return (
    <li className={isOpen ? 'menu-item active' : 'menu-item'}>
      <a
      href={hrefValue}
      onClick={onLinkClick}
      className={
        'flex items-center justify-between uppercase font-bold'
      }
      style={{ display: 'flex' }}
    >
      <div className="flex items-center">
        {item.icon && <MenuIcon icon={item.icon} />}
        <span className="ml-2">{item.text}</span>
      </div>
      {hasChildren && !item.hideChevron && (
        <div className="toggle px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="chevron bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6
                 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0
                 1-.708-.708L10.293 8
                 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      )}
    </a>
  {isOpen && hasChildren && (
    <ul className="submenu">
      {item.children!.map((child) => (
        <NavItem
          item={child}
          currentPageNoLangNoVer={currentPageNoLangNoVer}
          categoryLinkPrefix={categoryLinkPrefix}
        />
      ))}
    </ul>
  )}
    </li>
  )
}

export default NavItem
