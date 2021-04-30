import React, { useState, createRef, useEffect } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import config from "../../../config.js";

import {
  InstantSearch,
  connectAutoComplete,
  PoweredBy,
  Configure,
  Highlight,
  Snippet,
} from "react-instantsearch-dom";

import algoliasearch from "algoliasearch/lite"

const searchClient = algoliasearch(
  config.header.search.algoliaAppId,
  config.header.search.algoliaSearchKey
);


const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    ref.current && !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}


const Search = ({ className }) => console.log("search component loaded") || (
  <InstantSearch searchClient={searchClient} indexName="docs">
  	<Configure
		  hitsPerPage={5}
		/>
    <CustomAutocomplete className={className} />
  </InstantSearch>
);
export default Search;

const Autocomplete = ({ hits, currentRefinement, refine, className }) => {
	const ref = createRef();
	const [focus, setFocus] = useState(false);
	useClickOutside(ref, () => setFocus(false));
  return (
  	<Wrapper ref={ref} className={className}>
  		<svg className="Search_Icon" stroke="currentColor" fill="#9d9d9d" strokeWidth="0" viewBox="0 0 24 24" focusable="false" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
	    <Input
	    	placeholder="Search..."
	      // type="search"
	      onFocus={()=> setFocus(true)}
	      value={currentRefinement}
	      onChange={event => refine(event.currentTarget.value)}
	    />
	    <Results className="Search_Results" show={focus && currentRefinement.trim() !== ''} >
	    	{ hits.length === 0 &&
	    		<NoResults>No results</NoResults>
	    	}
	    	<ScrollWrapper>
			    { hits.map(hit => (
		      	<ItemLink key={hit.objectID} to={hit.slug}>
			      	<h4>
			      		<Highlight hit={hit} attribute="title" />
			      	</h4>
			      	<p>
			      		<Snippet hit={hit} attribute="excerpt" />
			      	</p>
		      	</ItemLink>
			    )) }
			  </ScrollWrapper>
		    <PoweredByStyled />
	    </Results>
	  </Wrapper>
	);
}

const CustomAutocomplete = connectAutoComplete(Autocomplete);

const Wrapper = styled.div`
	position: relative;

  & .Search_Icon {
  	position: absolute;
  	vertical-align:middle;
  	top: 7px;
    left: 7px;
  }
`;

const Input = styled.input`
	&:placeholder{
		color: #999;
	}
	font-size: 18px;
  padding: 8px 20px 8px 35px;
  border-radius: 4px;
  outline: none;
  border: none;
	width: 100%;
	font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
	background: #eee;
	transition: #394EFF;
	&:focus {
		box-shadow: 0 0 0 1px #394EFF;
		background: white;
	}
`;

const Results = styled.div`
	display: ${ p => p.show ? "block" : "none" };
	position: absolute;
	top: 50px;
	z-index: 4;
	background: white;
	border-radius: 4px;
	border: 1px solid #e6ecf1;
	width: 100%;
	&:before {
		display: block;
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    background: #fff;
    top: -7px;
    right: 30px;
    border-top: 1px solid #e6ecf1;
    border-right: 1px solid #e6ecf1;
    transform: rotate(-45deg);
    border-radius: 2px;
	}
`;

const ScrollWrapper = styled.div`
	max-height: 400px;
	position: relative;
	z-index: 5;
	overflow: auto;
`;

const ItemLink = styled(Link)`
	display:block;
	padding: 10px 15px 15px;

	border-bottom: 1px solid #e6ecf1;
	&:last-child {
		border: none;
	}

	& h4 {
		color: black;
		font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
		margin-bottom: 5px;
		& em {
			font-style: normal;
			background: #CCE2FF;
		}
	}
	& p {
		font-size: 15px;
		color: #73737D;

		/* TODO: through Algolia Snippet */
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;

		& em {
			font-style: normal;
			background: #CCE2FF;
		}
	}
	&:hover {
		background: #CCE2FF;
	}
`;

const NoResults = styled.div`
	color: #73737D;
	font-weight: 20px;
	padding: 10px;
	text-align: center;
`;

const PoweredByStyled = styled(PoweredBy)`
	border-top: 1px solid #e6ecf1;
	padding: 2px 10px;
	text-align: end;
	font-size: 10px;
	& svg {
		width: 40px;
		vertical-align: middle;
	}
`;
