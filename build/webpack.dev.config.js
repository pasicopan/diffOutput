const path = require('path');
const merge = require('webpack-merge')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './test',
    hot: true,
    compress: true,
    port: 9000,
    open: false
  },
  output: {
    path: path.resolve(process.cwd(), 'test'),
    filename: 'index.js',
    // library: 'diffOutput',
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin(['test'], { root: process.cwd() }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/test.html',
      title: 'diff output text'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = devWebpackConfig;
