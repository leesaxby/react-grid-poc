const path = require('path');
const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8888,
        historyApiFallback: true
    },
});