const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({ // Define below in 'plugins'?
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index_bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
          {
            loader: "jshint-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        // use:['style-loader', 'css-loader', 'sass-loader'] // TODO: Should this bundle all CSS into single file? Currently dumps CSS into HTML head
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new CopyWebpackPlugin([
      {from:'client/fonts',to:'fonts'},
      {from:'client/img',to:'img'}
    ])
  ]
}