// Updated gatsby-config.js: Disabled Gatsby Preact plugin to isolate static HTML build issue
const path = require('path');

module.exports = {
  siteMetadata: {
    title: `weddingInvitation`,
    siteUrl: `https://ttokka-wedding.netlify.app`
  },
  plugins: [
    // Styled-components with optimized options
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== 'production',
        fileName: false,
        minify: true
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `imgs`, path: `${__dirname}/src/assets/imgs/` }
    },

    // React Helmet for metadata
    `gatsby-plugin-react-helmet-async`,

    // Image optimization
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    // Temporarily disabled Preact plugin due to static HTML build hang
    // {
    //   resolve: `gatsby-plugin-preact`,
    //   options: {
    //     include: path.resolve(__dirname, 'src')
    //   }
    // },

    // Netlify plugin (headers, redirects)
    `gatsby-plugin-netlify`,

    // Offline support still disabled for troubleshooting
    // `gatsby-plugin-offline`,

    // Bundle analyzer still disabled
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ]
};
