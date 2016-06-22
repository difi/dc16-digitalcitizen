var path = require('path');
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/*.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'app/*.js': ['webpack', 'sourcemap'],
            'test/*.js': ['webpack', 'sourcemap']
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
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};