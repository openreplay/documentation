const componentWithMDXScope = require("gatsby-plugin-mdx/component-with-mdx-scope");
const path = require("path");
const startCase = require("lodash.startcase");
const config = require("./config");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fileAbsolutePath
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          //console.log(node)
          createPage({
            path: node.fields.slug ? node.fields.slug : "/",
            component: path.resolve("./src/templates/docs.js"),
            fullPath: node.fileAbsolutePath,
            context: {
              id: node.fields.id
            }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { 
        $components: path.resolve(__dirname, "src/components"),
        buble: '@philpl/buble' // to reduce bundle size
      }
    }
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-proposal-export-default-from"
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, "");

    if (value === "index") {
      value = "";
    }
    let slug = `/${value}`;


    if(config.gatsby && config.gatsby.trailingSlash && value !== "") {
      slug = slug + '/';
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug
    });

    createNodeField({
      name: "id",
      node,
      value: node.id
    });

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title || startCase(parent.name)
    });
  }
};
