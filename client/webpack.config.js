const path = require('path')

const webpack = require('webpack')
require('dotenv').config({ path: './.env' })
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const optimization = () => {
    const config = {
        //Оптимизация общих библеотек из разных файлов 
        // splitChunks: {
        //     chunks: 'all'
        // },
    }
    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        'js/main': './js/main.js',
        'css/main': './sass/main.sass',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    resolve: {
        extensions: ['.js', '.sass']
    },
    devServer: {
        port: 4200,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
          }),
        new HTMLWebpackPlugin({
            publicPath: '/',
            template: './index.html',
            filename: 'index.html',
            chunks: ['css/main', 'js/main'],
            minify: { collapseWhitespace: isProd }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, 
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg|gif|woff|woff2)$/,
                use: [{
                    loader: 'file-loader', 
                    options: {
                        name: '[path][name].[ext]',
                    }
                }]
            },
        ]
    }
}