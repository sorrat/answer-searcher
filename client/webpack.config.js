const path = require("path");
const webpack = require("webpack");

const APP = path.join(__dirname, "src");
const BUILD = path.join(__dirname, "build");

const isProduction = process.env.NODE_ENV == "production"


function entry() {
  const dev = [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "babel-regenerator-runtime",
  ];
  const common = [
    "whatwg-fetch",
    `${APP}/index.jsx`
  ];
  return isProduction ? common : dev.concat(common);
}

function publicPath() {
  return isProduction ? "static" : "";
}

function devtool() {
  return isProduction ? "#source-map" : "#cheap-module-source-map";
}

function postcss() {
  return (webpack) => {
    const postcssImport = require("postcss-import");
    const precss = require("precss");
    const autoprefixer = require("autoprefixer");

    return [
      postcssImport({addDependencyTo: webpack}),
      precss,
      autoprefixer({browsers: ["last 2 versions"]}),
    ];
  }
}

function plugins() {
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");

  const common = [
    new HtmlWebpackPlugin({
      template: `${APP}/index.html`,
      inject: "body"
    }),
    new CopyWebpackPlugin([
      {from: `${APP}/public`, to: BUILD}
    ]),
  ];
  const prod = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ];
  const dev = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  return common.concat(isProduction ? prod : dev);
}

function jsx_loaders() {
  return isProduction ? ["babel"] : ["react-hot", "babel"];
}


const config = {
  entry: entry(),
  output: {
    path: BUILD,
    filename: "bundle.js",
    publicPath: publicPath(),
  },
  devtool: devtool(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: jsx_loaders(),
        include: APP,
      },
      {
        test: /\.css$/,
        loaders: ["style", "css", "postcss"],
        include: APP,
      },
    ]
  },
  postcss: postcss(),
  plugins: plugins(),
};

module.exports = config;
