const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "/src/js/controller.js",
  output: {
    path: path.join(__dirname, "dist"),
    //path: path.resolve("/dist"),
    filename: "bundle.js"
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    //contentBase: path.join(__dirname, "dist"),
    port: 3000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
            // options: {
            //   implementation: require("sass")
            // }
          }
        ]
      }
      /*{
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images"
            }
          }
        ]
      }*/
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ]
};
