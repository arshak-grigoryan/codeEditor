
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {

    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsWebpackPlugin(),
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
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        })
    ]
    return base
}

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: {
        main:[
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
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader,'css-loader']
            }
        ]
    },
    devtool: isDev ? 'source-map' : '',
    devServer: {
        open: true
    }
}