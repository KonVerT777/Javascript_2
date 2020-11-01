const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  
  mode: 'development',
  entry: {
      main: "./src/public/index.js"
  },
  output: {
      path: path.join(__dirname, 'dist/public'),
      publicPath: "/",
      filename: "js/[name].js"
    },
  plugins: [
    new HTMLWebpackPlugin ({
      template: './src/public/index.html'
    }),
    new CleanWebpackPlugin ()
  ],

  module: {
    rules: [
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
       test: /\.(png|jpg|svg|gif)$/,
       use: ['file-loader']
     }
    ]
  }
}