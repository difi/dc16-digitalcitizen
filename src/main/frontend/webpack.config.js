const path = require('path');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    source: path.join(__dirname, 'app/app.js'),
    output: path.join(__dirname, '../../../target/classes/static')
};

const common = {
    devtool: 'inline-source-map',
    entry: [
        PATHS.source
    ],
    output: {
        path: PATHS.output,
        publicPath: '',
        filename: 'bundle.js'
    },
    isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
            presets: ['es2015', 'react']
        }
    },
    module: {
        preLoaders: [
            // transpile all files except testing sources with babel as usual
            {
                test: /\.js$/,
                exclude: [
                    path.resolve('./app/'),
                    path.resolve('node_modules/')
                ],
                loader: 'babel'
            },
            // transpile and instrument only testing sources with isparta
            {
                test: /\.js$/,
                include: path.resolve('./app/'),
                exclude: './index.js',
                loader: 'isparta'
            }
        ],
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ["", ".tsx", ".ts", ".jsx", ".js"]
    },
    externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
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

if (TARGET === 'build') {
    module.exports = merge(common, {});
}

