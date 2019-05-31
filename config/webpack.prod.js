const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require("./webpack.common.js");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        //合并打包引入的自己写得common等公共文件
        commons: {
          name: "commons",
          minSize: 1,
          chunks: "initial",
          priority: 2,
          minChunks: 2
        },
        //合并打包引入node_modules内的公共文件
        vendors: {
          name: "vendors",
          test: /node_modules/,
          chunks: "initial",
          priority: 10,
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "app/[name]/index.[contenthash:8].css"
    }),
    new UglifyJSPlugin({
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: "server" })
  ]
});
