const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production", // or 'production' for optimized build
  entry: "./src/index.js", // Your main JS entry point (if you have one)
  output: {
    filename: "main.js", // Output JS filename
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS
          "css-loader", // Process CSS
          "sass-loader", // Compile Sass
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS filename
    }),
  ],
  resolve: {
    // Allows you to import govuk-frontend directly
    modules: [path.resolve(__dirname, "node_modules")],
  },
};
