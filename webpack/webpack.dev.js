const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'eval',
    output: {
        filename: '[name].[hash].js'
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9999,
        hot: true,
        historyApiFallback: true,
        clientLogLevel: 'error'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            enforce: 'pre',
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                failOnWarning: false,
                failOnError: false,
                emitWarning: true
            }
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});