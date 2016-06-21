const path = require('path');
const merge = require('webpack-merge');
var webpack = require('webpack')
const PATHS = {
    source: path.join(__dirname, 'app/app.js'),
    output: path.join(__dirname, 'dist')
};

module.exports = {
    devtool: 'eval',
    entry: [
        './app/app.js',
        'webpack-dev-server/client?http://0.0.0.0:9090', // WebpackDevServer host and port
        'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors

    ],
    output: {
        path: PATHS.output,
        publicPath: '/static/',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'app'),
            loaders: ['react-hot', 'babel']
        },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"

        }]
    }
};