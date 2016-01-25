/**
 * Created by inspiron on 1/25/2016.
 */
var path = require('path');
var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {
  context: path.resolve('js'),
  entry: {
    about: './about_page.js',
  },
  output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/assets/js/',
    filename: "[name].js"
  },

  plugins: [
    commonsPlugin
  ],

  module: {

  },

  resolve: {
    extensions: ['', '.js', '.es6']
  }
}
