const { merge } = require("webpack-merge");
const base = require("./webpack.config");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8888,
  },
});