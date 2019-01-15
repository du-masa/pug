const path = require('path');
const webpack = require('webpack');
const globule = require('globule')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ディレクトリの設定
const opts = {
  srcDir: path.join(__dirname, 'assets'),
  destDir: path.join(__dirname, 'public')
}

const from = 'pug';
const to = 'html';
const htmlPluginConfig = globule.find([`**/*.${from}`, `!**/_*.${from}`], {cwd: opts.srcDir}).map(filename => {
  const file = filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`).split('/')
  return new HtmlWebpackPlugin({
    filename: filename.replace(new RegExp(`.${from}$`, 'i'), `.${to}`).replace(/(\.\/)?pug/, '.'),
    template: `./${filename}`
  })
})

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
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    ...(htmlPluginConfig)
  ]
}

