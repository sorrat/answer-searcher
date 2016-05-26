const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const postcssImport = require("postcss-import");

// PostCSS support
const precss = require("precss");
const autoprefixer = require("autoprefixer");

APP = path.join(__dirname, "src")
BUILD = path.join(__dirname, "build")

const common = {
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "babel-regenerator-runtime",
    `${APP}/index.jsx`,
  ],
  output: {
    path: BUILD,
    filename: "static/bundle.js",
  },
  devtool: "#cheap-module-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP,
        loaders: ["react-hot", "babel"],
      },
      {
        test: /\.css$/,
        loaders: ["style", "css", "postcss"],
        include: APP,
      },
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({addDependencyTo: webpack}),
      precss,
      autoprefixer({browsers: ["last 2 versions"]}),
    ];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${APP}/index.html`,
      inject: "body"
    }),
    new CopyWebpackPlugin([
      {from: `${APP}/public`, to: BUILD}
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const production = webpackMerge(common, {
  devtool: "#source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

if (process.env.NODE_ENV == "production") {
  module.exports = production;
} else {
  module.exports = common;
}

