const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "app/web/bundle.css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    main: './index.web.js',
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.css(\.js)?$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.css\.js$/,
        loader: 'css-js-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
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
    extractSass
  ]
};
