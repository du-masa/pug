# pug

## pugとは

Node.js製のテンプレートエンジン(旧名:jade)
https://pugjs.org/api/getting-started.html

pugのメリットは下記です。
- タグで囲んだり、属性値を省略して書くことが可能で、記述をシンプルになる
- ファイルを分割して、includeすることで、可読性や再利用性が高まる
- 変数、if文、ループ文を使うことができる

## pugの環境設定

今回は、webpackを使ったpugのコンパイル(HTMLファイル化)を紹介します。

### モジュールインストール

下記のモジュールをインストールします。

```
$ npm i -D pug pug-loader html-webpack-plugin
```

### webpackに設定

`.pug`ファイルをpug-loaderを使ってコンパイルします。

```js
  module: {
    rules: [
      {
        test: /.pug$/,
        use: ['pug-loader']
      },
```

また、pug-loaderのみだとHTMLとして出力されないため、`html-webpack-plugin` を使って
どのpugファイルをどの言った名前のhtmlに出力するかを設定します。

`html-webpack-plugin`はwebpackのpluginsに設定します。

```js
  plugins: [
    new HtmlWebpackPlugin({
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
      minify: false
    }),
```

引数のオブジェクトを渡して詳細を設定します。
`template` には対象となるpugファイルのパス、`filename` には出力するhtmlのパスを指定します。
(`filename`を指定しなかった場合はindex.htmlになります)


