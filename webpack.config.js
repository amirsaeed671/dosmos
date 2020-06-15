const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetsConfig = require('./build-utils/loadPresets');

module.exports = ({mode, presets} = {mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            mode,
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'docs')
            },
            resolve: {
                modules: ['node_modules', path.join(__dirname, 'src'), 'common', 'auth', 'main'],
            },
            module: {
                rules: [
                    {
                        test: /\.jpe?g$/,
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
                    template: path.join(__dirname, '/public/index.html'),
                    filename: 'index.html',
                })
            ]
        },
        modeConfig(mode),
        presetsConfig({ mode, presets }),
    )
}