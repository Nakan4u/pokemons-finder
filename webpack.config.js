const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './index.web.js',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ 
          fallback: 'style-loader', 
          use: 'css-loader?sourceMap!sass-loader?sourceMap' })
      }
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-router-native': 'react-router-dom'
    },
  },
  output: {
    filename: 'app/web/bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('app/web/bundle.css')
  ]
};
