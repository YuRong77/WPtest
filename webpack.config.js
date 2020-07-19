const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 載入 html-webpack-plugin (第一步)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./main.js",
  output: {
    filename: "./js/main-bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./styles/[name].[hash].css",
    }),
    new HtmlWebpackPlugin({
      // 創建實例 (第二步)
      template: "./index.html", // 配置 HTML 模板路徑與生成名稱 (第三步)
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'sound',
            publicPath: 'sound',
            emitFile: true,
            esModule: false
          },
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img',
            publicPath: 'img',
            limit: 10,
            emitFile: true,
            esModule: false
          }
        }
      },
    ],
  },
};
