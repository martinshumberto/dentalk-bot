const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: [
        './app.js'
    ],
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.js$/,
                query: {
                    presets: ['@babel/preset-env'],
                },
            }
        ]
    },
    devtool: 'sourcemap',
    devServer: {
        contentBase: './build',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};