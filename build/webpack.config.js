const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname, '../');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: [
            'webpack-hot-middleware/client?quiet=true',
            root + '/test/index.js',
        ],
    },

    output: {
        path: root + '/',
        publicPath: '/',
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['json', '.js', '.ts'],
        alias: {
            Lib: path.resolve(__dirname, '../src/lib'),
            Canvas: path.resolve(__dirname, '../src/canvas'),
            ASSETS: path.resolve(__dirname, '../asserts'),
        },
    },

    module: {
        loaders: [
            {
                test: /\.(jpg|gif|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.styl$/,
                // loader: 'stylus-loader',
                loader: 'style-loader!css-loader!stylus-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: root,
            },
            {
                test: /\.css$/,
                loader: 'style!css', //添加对样式表的处理
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new htmlWebpackPlugin({
            filename: 'test.html',
            template: 'test.html',
            inject: true,
        }),
    ],

    // devServer: {
    //     contentBase: "./",
    //     port: 8888,
    //     colors: true,
    //     historyApiFallback: true,
    //     inline: true
    // }
};
