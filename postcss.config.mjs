const config = {
  plugins: {
    "postcss-nested": {},          // Enables Sass-like nesting
    "autoprefixer": {},            // Adds vendor prefixes for browser support
    "cssnano": {                   // Minifies CSS in production
      preset: ["default", {
        discardComments: { removeAll: true }
      }]
    }
  },
};

export default config;
