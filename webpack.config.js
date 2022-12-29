const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PugPlugin = require('pug-plugin');

const webpack = require('webpack');

const path = require('path');
const srcPath = path.resolve(__dirname, "./src");

const entryPoints = {
  index: "./pages/index/index.ts",
  records: "./pages/records/index.ts",
  "player-profile": "./pages/player-profile/index.ts",
};

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
console.log(mode + " mode");

module.exports = {
  context: srcPath,
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./[name].[contenthash].css",
      ignoreOrder: true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    require('autoprefixer'),
    new HtmlWebpackPlugin({
      template: "./pages/index/index.pug", // relative path to the HTML files
      filename: "./index.html", // output HTML files
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/player-profile/player-profile.pug", // relative path to the HTML files
      filename: "./player-profile.html", // output HTML files
      chunks: ["player-profile"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/records/records.pug", // relative path to the HTML files
      filename: "./records.html", // output HTML files
      chunks: ["records"],
    }),
  ],
  entry: entryPoints,
  output: {
    filename: "./[name].[contenthash].js",
    clean: true,
  },
  devtool: (mode === "development") ? "eval-source-map" : false,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@favicons": path.resolve(__dirname, "./src/assets/favicons/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/i,
        include: /favicons/,
        type: "asset/resource",
        generator: {
          filename: 'assets/favicons/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        exclude: /fonts|favicons/,
        type: "asset/resource",
        generator: {
          filename: 'assets/images/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: /fonts/,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[name][hash][ext][query]',
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        exclude: /(node_modules|bower_components)/,
        options: {
            basedir: path.resolve(__dirname, './src')
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer",
                  "postcss-preset-env",
                ]
              }
            }
          },
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, "./src/main-styles/variables.scss")
            }
          }
        ]
      },
    ]
  },
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },
};