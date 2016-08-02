var path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
module.exports = function(config) {
    config.set({
        basePath: '', //The root path location that will be used to resolve all relative paths defined in files and exclude. What we have written here is the default value of basePath.
        frameworks: ['jasmine'], //use jasmine framework to test
        files: [ //List of files/patterns to load in the browser.
            'node_modules/babel-polyfill/dist/polyfill.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './index.js'
        ],

        preprocessors: {
            // add webpack as preprocessor

            './index.js': [ 'webpack','sourcemap'],

        },

        webpack: webpackConfig,
        webpackMiddleWare: {
            noInfo: true
        },

        babelPreprocessor: {
            options: {
                presets: ['react']
            }
        },
        reporters: ['coverage', 'progress' ], //Progress will show the number of tests executed, skipped and total.
        port: 9876, // The port where the web server will be listening.
        colors: true, //Enable colors in the output (reporters and logs).
        logLevel: config.LOG_INFO, //This is the default loglevel. Other possible values: config.LOG_DISABLE, config.LOG_ERROR, config.LOG_WARN, config.LOG_INFO, config.LOG_DEBUG
        autoWatch: true,  //Enable watching files and executing the tests whenever one of these files changes.
        browsers: ['Chrome'], //PhantomJS // A list of browsers to launch and capture. When Karma starts up, it will also start up each browser which is placed within this setting.
        singleRun: false,
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            file : 'coverage.txt',

        }
    })
};