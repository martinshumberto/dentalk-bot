const path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('../node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: [
        './src/app.js'
    ],
    target: 'node',
    externals: nodeModules,
    node: {
        __dirname: false,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../build'),
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|build)/,
                test: /\.js$/,
                query: {
                    presets: ['@babel/preset-env'],
                },
            }
        ]
    },
    devtool: 'sourcemap',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    }
};