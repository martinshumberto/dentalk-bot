const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: [
        './server/app.js'
    ],
    node: {
        __dirname: false,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './server/build'),
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
        contentBase: path.resolve('./server')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};