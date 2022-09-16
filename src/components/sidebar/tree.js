import React, {useState,useEffect} from 'react';
import styled from "@emotion/styled";
import Collapse from '../images/Collapse';
import Expand from '../images/Expand';
import config from '../../../config';
import TreeNode from './treeNode';
import { ImportExportDimensions } from 'styled-icons/material';

const calculateTreeData = (edges, currentVersion) => {
  let originalData = config.sidebar.ignoreIndex ? edges.filter(({node: {fields: {slug}}}) => slug !== '/') : edges;
  originalData = originalData.filter( edge => {
    if(currentVersion.indexOf("v") == 0) { //we're looking for a specific version
      return edge.node.fields.slug.indexOf(currentVersion) != -1
    } else {
      return !edge.node.fields.slug.match(/\/v[0-9]+.[0-9]+.[0-9]+/)
    }
  })
  const tree = originalData.reduce((accu, {node: {fields: {slug, title}}}) => {
    const parts = slug.split('/');
    let {items: prevItems} = accu;
    const slicedParts = config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);
    for (const part of slicedParts) {
      let tmp = prevItems && prevItems.find(({label}) => label == part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = {label: part, items: []};
        prevItems.push(tmp)
      }
      prevItems = tmp.items;
    }
    const slicedLength = config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;
    const existingItem = prevItems.find(({label}) => label === parts[slicedLength]);
    if (existingItem) {
      existingItem.url = slug;
      existingItem.title = title;
    } else {
      prevItems.push({
        label: parts[slicedLength],
        url: slug,
        items: [],
        title
      });
    }
    return accu;
  }, {items: []});
  const {sidebar: {forcedNavOrder = [], versionedNavOrder = []} } = config;

  let tmp = [];
  if(currentVersion == "") {
    tmp = [...forcedNavOrder];
  } else {
    tmp = versionedNavOrder.map( url => url.replace("<VERSION>", currentVersion))
  }
  if(config.gatsby && config.gatsby.trailingSlash) {
  }
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    //slug = "/" + currentVersion + slug
    const parts = slug.split('/');
    let {items: prevItems} = accu;
    const slicedParts = config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);
    for (const part of slicedParts) {
      let tmp = prevItems.find((item) => item && item.label == part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = {label: part, items: []};
        prevItems.push(tmp)
      }
      if(tmp && tmp.items) {
        prevItems = tmp.items;
      }
    }
    // sort items alphabetically.
    prevItems.map((item) => {
      item.items = item.items
        .sort(function (a, b) {
          if (a.label < b.label)
            return -1;
          if (a.label > b.label)
            return 1;
          return 0;
        });
    })
    const slicedLength = config.gatsby && config.gatsby.trailingSlash ? (parts.length - 2) : (parts.length - 1);
    const index = prevItems.findIndex(({label}) => label === parts[slicedLength]);
    if(prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0]);
    }
    return accu;
  }, tree);
}

const Tree = ({edges, location}) => {
 
  let currentVersion = window.location.pathname.split("/")[1]
  if(currentVersion.indexOf("v") != 0) {
    currentVersion = "";
  }
  let [treeData] = useState(() => {
    return calculateTreeData(edges, currentVersion);
  });


  const defaultCollapsed = {};
  treeData.items.forEach(item => {

    let startWithString = item.url
    //let startWithString = (currentVersion) ? "/" + currentVersion + item.url : item.url

    if (config.sidebar.collapsedNav && config.sidebar.collapsedNav.find( path => item.url && item.url.indexOf(path) != -1)) {
      defaultCollapsed[startWithString] = !!location && !location.pathname.startsWith(startWithString);
    } else {
      defaultCollapsed[startWithString] = false;
    }
  });
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggle = (url) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  }
  useEffect(() => {
    let parts = location.pathname.split("/")
    let index = ""
    if(parts[1].charAt(0) == 'v') {
      index = parts[2]
    } else {
      index = parts[1]
    }

    setCollapsed({
      ...collapsed,
      ["/" + index]: false,
    });
  }, [location.pathname]);
  const someCollapsed = Object.values(collapsed).some(c => c);
  const setAll = value => () => {
    const newCollapsed = {};
    Object.keys(collapsed).forEach(key => {
      newCollapsed[ key ] = value;
    });
    setCollapsed(newCollapsed);
  }
  return (
    <ul className={'sideBarUL'}>
      <li>
        <ExpandCollapseButton
          onClick={ setAll(someCollapsed ? false : true) }
        >
          {someCollapsed ? <Expand /> : <Collapse/>}
          {someCollapsed ? "Expand All" : "Collapse All"}
        </ExpandCollapseButton>
      </li>
      <TreeNode
        className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
        setCollapsed={toggle}
        collapsed={collapsed}
        location={location}
        {...treeData}
      />
    </ul>
  );
}

export default Tree;

const ExpandCollapseButton = styled.button`
  padding: 8px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
  color: #777;
  cursor: pointer;
  width: 98px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
