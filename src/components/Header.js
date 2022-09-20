import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn'
import styled from "@emotion/styled";
import Link from './link';
import './styles.css';
import config from '../../config.js';
import Loadable from 'react-loadable';
import LoadingProvider from './mdxComponents/loading';
//const help = require('./images/help.svg');
import Sidebar from "./sidebar";
import { SyncDisabled } from 'styled-icons/material';
import VersionSelector from './versionSelector'


/* eslint-disabled  import/first */

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];
if(isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    { name: `${config.header.search.indexName}`, title: `Results`, hitComp: `PageHit` },
  );
}


const LoadableComponent = Loadable({
  loader: () => import('./algoliaSearch/index'),
  loading: LoadingProvider,
});

const MyVersionComponent = Loadable({
  loader: () => import("./versionSelector"),
  loading: LoadingProvider
})

function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const Header = ({location}) => (
  <StaticQuery
    query={
      graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              headerTitle
              githubUrl
              helpUrl
              tweetText
              logo {
                link
                image
              }
              headerLinks {
                link
                text
              }
            }
          }
        }
        `}
    render={(data) => {
      const logoImg = require('./images/logo.svg');
      const twitter = require('./images/twitter.svg');
      const github = require('./images/github.svg');
      const linkedin = require('./images/linkedin.svg');
      const {
        site: {
          siteMetadata: {
            headerTitle,
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            headerLinks,
          }
        }
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : '/';
      return (
        <div className={'navBarWrapper'}>
          <nav className={'navBarDefault'}>
            <div className={'navBarHeader'}>
              <Link to={finalLogoLink} className={'navBarBrand'}>
                <img className={'img-responsive displayInline'} src={(logo.image !== '') ? logo.image : logoImg} alt={'logo'} />
              </Link>
              <IndexLink to="/">
                DOCS
              </IndexLink>
              <MyVersionComponent/>

              <span onClick={myFunction} className={'navBarToggle'}>
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
              </span>
            </div>

            {isSearchEnabled ? (
              <div className={'searchWrapper hiddenMobile navBarUL'}>
                <LoadableComponent collapse={true} indices={searchIndices} />
              </div>
              ): null}
            <div id="navbar" className={'topnav'}>
              <div className={'visibleMobile'}>
                {isSearchEnabled ? (
                  <div className={'searchWrapper'}>
                    <LoadableComponent collapse={true} indices={searchIndices} />
                  </div>
                  ): null}
                <Sidebar location={location} bottomDivider />
              </div>
              <ul className={'navBarUL navBarNav navBarULRight'}>
                { config.header.social.github &&
                  <li><a href={config.header.social.github}><img src={github} alt={'Github'}/></a></li>
                }
                { config.header.social.twitter &&
                  <li><a href={config.header.social.twitter}><img src={twitter} alt={'Twitter'}/></a></li>
                }
                { config.header.social.linkedin &&
                  <li><a href={config.header.social.linkedin}><img src={linkedin} alt={'LinkedIn'}/></a></li>
                }
              </ul>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

const IndexLink = styled(Link)`
  display:block;
  font-size: 14px;
  font-weight: 700;
  color: #777;
  margin-left: -10px;
  margin-bottom: -4px;
`;


export default Header;
