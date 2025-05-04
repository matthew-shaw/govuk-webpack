const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  mode: "production",
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8000,
  },
  entry: ["./src/js/main.mjs", "./src/scss/main.scss"],
  output: {
    filename: "govuk.[contenthash].min.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  bugfixes: true,
                  loose: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({ test: /(\.js|\.css)(\?.*)?$/i }),
    new MiniCssExtractPlugin({
      filename: "govuk.[contenthash].min.css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/govuk-frontend/dist/govuk/assets/rebrand",
          to: "assets",
        },
      ],
    }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};
