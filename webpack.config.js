
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const currentMode = () => isDev ? 'development' : 'production'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: autoprefixer()
            }
        })
    ]
    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
        }
    ]
    if(isDev) {
        loaders.push('eslint-loader')
    }
    return loaders
}

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: currentMode(),
    entry: {
        main:[
            '@babel/polyfill', 
            './js/controller.js'
        ]
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    optimization: optimization(),
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: jsLoaders()
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader,'css-loader','postcss-loader']
            },
            {
                test: /\.(png)$/,
                use: {
                    loader:'file-loader',
                    options:{
                        outputPath: 'images'
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        open: true
    }
}