export default {
    isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
            presets: ['es2015', 'stage-0', 'react']
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /\.test\.js/],
                loader: 'isparta-instrumenter-loader'

            }
        ]
    }
}