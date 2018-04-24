const path = require('path');
const merge = require('webpack-merge')
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: './src/index.ts',
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/lib'),
    filename: 'index.js',
    // library: 'diffOutput',
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/lib'], { root: process.cwd() }),
  ],
});
module.exports = prodWebpackConfig;
