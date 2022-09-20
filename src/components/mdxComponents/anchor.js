import * as React from "react";

const AnchorTag = ({ children: link, ...props }) => {
  //console.log("anchor tag:", props.href)
  //useLocation = (typeof useLocation === "function") ? useLocation : 
  let currentVersion = "";
  const location = ( (typeof window !== "undefined") ? window.location : {pathname: "/"})
  //if(typeof window != "undefined") {
  
  currentVersion = location.pathname.split("/")[1]
  console.log("Anchor tag:", currentVersion)

  if(currentVersion.indexOf("v") != 0) currentVersion = "";

  //console.log("link to: ", props.href)
  if(props.href.indexOf("/") == 0) {
    props.href = (currentVersion != "") ? "/" + currentVersion + props.href : props.href
  } else {
    if(props.href.indexOf("http") != 0) {
      props.href = "/" + currentVersion + props.href
    }
  }
  //console.log("changed link to: ", props.href)



  if(link) {
    return (
      <a href={props.href} rel="noopener">{link}</a>
    );
  } else {
    return null;
  }
};

export default AnchorTag;
