const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const publicPath = "/";
const entryList = require('./entries');

let getHtmlConfig = () =>{
  return entryList.map(item =>{
    let {name,pathDev,pathPro} = item;
    let params = {
      template: pathDev || `src/${name}/index.html`,
      filename: pathPro || `app/${name}/index.html`,
      chunks: ["vendors", "commons", name],
      inject: true
    }
    return  new HtmlWebpackPlugin(params)
  })
}
let entryObj = {};
entryList.map(item=>{
  let {name,pathEntry} = item;
  entryObj[name] = pathEntry ||  `./src/${name}/index.js`;
})
console.log(entryObj);

module.exports = {
  entry: {
    ...entryObj
  },
  output: {
    filename: "app/[name]/index.[hash:8].js",
    path: path.resolve(__dirname, "../build"),
    publicPath
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    ...getHtmlConfig(),
    // new HtmlWebpackPlugin({
    //   template: "src/home/index.html",
    //   filename: "app/home/index.html",
    //   chunks: ["vendors", "commons", "home"],
    //   inject: true,
    // }),
    // new HtmlWebpackPlugin({
    //   template: "src/detail/index.html",
    //   filename: "app/detail/index.html",
    //   chunks: ["vendors", "commons", "detail"],
    //   inject: true,
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf|webp|ttf|jpg|png|svg|jpeg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: "asset/font/[name].[hash:8].[ext]",
            publicPath,
          }
        }],
      }
    ]
  }
};
