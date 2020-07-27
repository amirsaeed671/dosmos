const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const DotEnv = require('dotenv-webpack');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetsConfig = require('./build-utils/loadPresets');
const webpack = require('webpack');

module.exports = ({mode, presets} = {mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            mode,
            resolve: {
                modules: ['node_modules', 'test', path.join(__dirname, 'src'), 'common', 'auth', 'main', 'utils', 'utils/endpoints'],
            },
            entry: './src/Index.js',
            output: {
                filename: 'app-bundle.js',
                path: path.resolve(__dirname, 'dist'),
            },
            module: {
                rules: [
                    {
                        test: /\.(png|jpe?g|gif|svg)$/i,
                        use: {
                            loader: 'url-loader',
                            options: {
                                limit: 5000,
                            }
                        }
                    },
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                        }
                    },
                    {
                        test: /\.html$/,
                        use: {
                            loader: 'html-loader'
                        },
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, 'public/index.html'),
                    filename: 'index.html',
                }),
                new DotEnv(),
                new webpack.EnvironmentPlugin(['BASE_URL'])
            ]
        },
        modeConfig(mode),
        presetsConfig({ mode, presets }),
    )
}