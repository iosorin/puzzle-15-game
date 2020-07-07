const path = require('path');

/* --------------------------------- PLUGINS -------------------------------- */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/* --------------------------- TOP-LEVEL VARIABLES -------------------------- */
const src = () => path.resolve(__dirname, 'src');
const dist = () => path.resolve(__dirname, 'dist');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

/* --------------------------------- CONGIF --------------------------------- */
module.exports = {
    mode: process.env.NODE_ENV,
    context: src(),
    entry: {
        app: ['@babel/polyfill', './app.js']
    },
    output: {
        path: dist(),
        filename: filename('js')
    },
    devServer: {
        port: 9000,
        contentBase: dist()
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
        new MiniCssExtactPlugin({
            filename: filename('css')
        })
    ],
    resolve: {
        alias: {
            '@': src()
        },
        extensions: ['.js', '.css', '.scss', '.sass']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    jsLoader(),
                    'eslint-loader'
                ]
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

function jsLoader(preset) {
    const loader = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }
    };

    if (preset) {
        loader.options.presets.push(preset);
    }

    return loader;
}
