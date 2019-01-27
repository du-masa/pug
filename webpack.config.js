const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'assets'),
  entry: {
    app: ['./js/app.js', './scss/app.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /.pug$/,
        use: ['pug-loader']
      },
      {
        test: /.vue$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'vue-loader',
            options: {
              // extractCSS: true,
              loaders: {
                js: 'babel-loader'
              }
            }
          }
        ]
      },
      {
        test:/.js$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader',options: {sourceMap: true}},
            { loader: 'sass-loader',options: {sourceMap: true}},
          ]
        })
      },
      {
        test: /.(jpe?g|png|gif|svg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath : 'image/',
              publicPath : 'image'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      template: './pug/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './pug/list.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: './pug/detail.pug'
    }),
    new HtmlWebpackPlugin({
      filename: './second/index.html',
      template: './pug/second/index.pug',
    }),
    new ExtractTextPlugin('[name].css'),
  ]
}

