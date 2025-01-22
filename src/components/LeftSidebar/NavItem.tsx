import React from 'react'
import type { NavItem } from '../../i18n/en/nav'
import MenuIcon from './MenuIcon'
import {ChevronRight} from 'lucide-react'


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
    <li className={isOpen ? 'menu-item active' : 'menu-item '}>
      <div
      className={
        'flex items-center justify-between font-normal px-2'
      }
      style={{ display: 'flex' }}
    >
    <a
	   	href={hrefValue}
	    onClick={onLinkClick}
			className={'w-full'}
    >
      <div className="flex items-center">
        {item.icon && <MenuIcon icon={item.icon} />}
        <span className="ml-2">{item.text}</span>
      </div>
    </a>
      {hasChildren && !item.hideChevron && (
        <div className="toggle px-2 cursor-pointer" onClick={() => toggleOpen(!isOpen)}>
         <ChevronRight size={16} strokeWidth={1.5} />
        </div>
      )}
    </div>
  {isOpen && hasChildren && (
    <ul className="submenu mt-0.5">
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
