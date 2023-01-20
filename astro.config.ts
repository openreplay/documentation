import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";
import preact from '@astrojs/preact';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLink from 'rehype-autolink-headings';
import remarkGFM from 'remark-gfm';
import remarkSmarty from 'remark-smartypants';
import inspectUrls from '@jsdevtools/rehype-url-inspector';
import { toString } from 'hast-util-to-string';
import { h } from 'hastscript';
import { escape } from 'html-escaper';
import { astroAsides } from './integrations/astro-asides';
import { astroCodeSnippets } from './integrations/astro-code-snippets';
import { astroSpoilers } from './integrations/astro-spoilers';
import { sitemap } from './integrations/sitemap';
import { rehypeTasklistEnhancer } from './plugins/rehype-tasklist-enhancer';
import { remarkFallbackLang } from './plugins/remark-fallback-lang';
import { backgroundPrimary, foregroundPrimary, tokens } from './syntax-highlighting-theme';
import { remarkCodeSnippets } from './integrations/astro-code-snippets';
import { remarkAsides } from './integrations/astro-asides';
import remarkDirective from 'remark-directive';
function addDefaultLayout() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    file.data.astro.frontmatter.layout = '~/layouts/MainLayout.astro';
    //file.data.astro.frontmatter.setup = AsideAsideAsideide.astro"; global.${AsideTagname} = ${AsideTagname};`
  };
}

const AnchorLinkIcon = h('svg', {
  width: 16,
  height: 16,
  version: 1.1,
  viewBox: '0 0 16 16',
  xlmns: 'http://www.w3.org/2000/svg'
}, h('path', {
  fillRule: 'evenodd',
  fill: 'currentcolor',
  d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'
}));
const createSROnlyLabel = (text: string) => {
  const node = h('span.sr-only', `Section titled ${escape(text)}`);
  node.properties!['is:raw'] = true;
  return node;
};

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.openreplay.com/',
  legacy: {
    astroFlavoredMarkdown: true
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'material-darker'
    },
    remarkPlugins: [remarkCodeSnippets()]
  },


  
  integrations: [tailwind(), preact({
    compat: true
  }), sitemap(), mdx({
    remarkPlugins: [addDefaultLayout, remarkGFM, [remarkSmarty, {
      dashes: false
    }], remarkFallbackLang(), remarkDirective
    // These are here because setting custom plugins disables the default plugins
    ],

    rehypePlugins: [rehypeSlug, [rehypeAutoLink, {
      properties: {
        class: 'anchor-link'
      },
      behavior: 'after',
      group: ({
        tagName
      }) => h(`div.heading-wrapper.level-${tagName}`, {
        tabIndex: -1
      }),
      content: heading => [h(`span.anchor-icon`, {
        ariaHidden: 'true'
      }, AnchorLinkIcon), createSROnlyLabel(toString(heading))]
    }], [inspectUrls, {
      inspectUrl(url) {
        console.log(url);
      }
    }], rehypeTasklistEnhancer()]
  }),
  //	astroAsides(),
  astroSpoilers()
  //	astroCodeSnippets()
  ]
});