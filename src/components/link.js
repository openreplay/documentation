import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";

const Link = ({ to, ...props }) => {
  console.log("Using custom link for:", to)
  return isAbsoluteUrl(to) ? (
    <a href={to} {...props} />
  ) : (
    <GatsbyLink to={to} {...props} />
  );


}
export default Link;
