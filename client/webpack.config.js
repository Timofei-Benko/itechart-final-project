const webpack = require('webpack');
const path = require('path');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ],
    },
    plugins: [
        // new ForkTsCheckerWebpackPlugin({
        //     async: false,
        //     eslint: {
        //         files: "./src/**/*",
        //     },
        // }),
        new HtmlWebpackPlugin({
            title: "Not Stack Overflow",
            template: './public/index.html'
        }),
        new Dotenv(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            'crypto': false,
        }
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        hot: true,
        port: 4002,
        historyApiFallback: true
    },
};
