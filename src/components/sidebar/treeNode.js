import React from "react";
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from "../link";

const TreeNode = ({className = '', setCollapsed, collapsed, url, title, items, activeSection, ...rest}) => {
  const isCollapsed = collapsed[url];
  const collapse = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed(url);
  }
  const hasChildren = items.length !== 0;
  let location;
  if(typeof(document) != 'undefined') {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === (config.gatsby.pathPrefix + url));
  const activeHeading = hasChildren && (location && (location.pathname.startsWith(url)));
  const isHeading = hasChildren || url==="/";
  const calculatedClassName = `${className} item ${active ? 'active' : ''} ${ isHeading ? "heading" : ""} ${activeHeading ? "activeHeading" : "" }`;
  return (
    <li
      className={calculatedClassName}
    >
      {title && (
        <Link
          to={url}
        >
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button
              onClick={ collapse }
              aria-label='collapse'
              className='collapser'>
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </Link>)
      }

      {!isCollapsed && hasChildren ? (
        items.map((item, index) => (
          <TreeNode
            key={item.url + index.toString()}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
            activeSection={activeHeading}
            {...item}
          />
        ))
      ) : null}
    </li>
  );
}
export default TreeNode
