const path = require('path');

/* --------------------------------- PLUGINS -------------------------------- */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/* --------------------------- TOP-LEVEL VARIABLES -------------------------- */
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

/* --------------------------------- CONGIF --------------------------------- */
module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js')
    },
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, 'dist')
    },
    devtool: isDev ? 'source-map' : '',
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
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
        new MiniCssExtactPlugin({
            filename: filename('css')
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@puzzle': path.resolve(__dirname, 'src/lib/puzzle'),
            '@core': path.resolve(__dirname, 'src/lib/puzzle/core')
        },
        extensions: ['.js', '.css', '.scss', '.sass']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: ['file-loader']
            }
        ]
    }
};

/* --------------------------------- HELPERS -------------------------------- */
function filename(ext) {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
}

function optimization() {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return config;
}

function cssLoaders(additional) {
    const loaders = [
        {
            loader: MiniCssExtactPlugin.loader,
            options: {
                hmr: isDev
            }
        },
        'css-loader'
    ];

    if (additional) {
        loaders.push(additional);
    }

    return loaders;
}

function jsLoaders() {
    const loaders = ['babel-loader'];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
}
