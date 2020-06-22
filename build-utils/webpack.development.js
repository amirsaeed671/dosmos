const webpack = require('webpack')
const DotEnv = require('dotenv-webpack');

module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devtool: false,
    plugins: [
        new DotEnv(),
        new webpack.SourceMapDevToolPlugin({})
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
    }
})