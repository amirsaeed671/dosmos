const webpack = require('webpack')

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
        new webpack.SourceMapDevToolPlugin({})
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
    }
})