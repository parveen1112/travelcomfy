/**
 * TODO: COMING SOON - Webpack Config UNDER DEVELOPMENT
 * @type {webpack|exports}
 */
const webpack = require('webpack');
const path= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool : 'eval',
    entry : {

    },

   plugins : [
       new CopyWebpackPlugin( ),
       new webpack.EnvironmentPlugin({
           NODE_ENV: JSON.stringify('production')
       }),
       new ExtractTextPlugin(__dirname + '/public/style/style.min.css'),
       new webpack.optimize.UglifyJsPlugin({
           compress: {
               warnings: false,
               screw_ie8: true,
               conditionals: true,
               unused: true,
               comparisons: true,
               sequences: true,
               dead_code: true,
               evaluate: true,
               if_return: true,
               join_vars: true
           },
           comments: false,
           sourceMap: false
       })
   ],
   module : {
       rules : [
           {
               test: /\.less$/,
               exclude: /(node_modules|bower_components)/,
               loader : ExtractTextPlugin.extract({
                   fallback: "style-loader",
                   use: [{
                       loader : "css-loader",
                       options : {
                           minimize : true
                       }
                   },
                       "resolve-url-loader",
                       {
                           loader : "less-loader",
                           options : {
                               outputStyle: 'compressed'
                           }
                       }]
               })
           }
       ]
   }
};

