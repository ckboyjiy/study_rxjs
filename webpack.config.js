const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        scheduler8: './rxjs/4_scheduler/example_8/example_8.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.target.js$/,
                exclude: [
                    /node_modules/
                ],
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
        ]
    },
}