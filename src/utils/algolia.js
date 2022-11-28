const config = require("../../config.js");

const pageQuery = `{
  pages: allMdx {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        headings {
          value
        }
        frontmatter {
          title
          metaDescription 
        }
        excerpt(pruneLength: 50000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, fields, ...rest } }) => {
    let slugParts = fields.slug.split("/")
    const version = slugParts[1].match(/v[0-9]+.[0-9]+.[0-9]+/) ? slugParts[1] : "_latest_";
    return ({
      version,
    ...frontmatter,
    ...fields,
    ...rest,
  })
  })
const settings = { attributesForFacetting: ['version'], attributesToSnippet: [`excerpt:20`], snippetEllipsisText: "…" }

const indexName = config.header.search ? config.header.search.indexName : '';

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `${indexName}`,
    settings,
  },
]

module.exports = queries