var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const merge = require('webpack-merge');
const common = {
    entry: './src/app.js',

    output: {
        path: '../../../target/classes/static/',
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "./src")
                ],
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};


if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            port: 9090,
            proxy: {
                '/*': {
                    target: 'http://localhost:8080',
                    secure: false,
                    prependPath: false
                }
            },
            publicPath: 'http://localhost:9090/',
            historyApiFallback: true
        },
        devtool: 'source-map'
    });
}