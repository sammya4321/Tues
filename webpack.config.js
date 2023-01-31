const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.WEBPACK_MODE,
    entry: path.join(__dirname, "src", "js", "app.js"),
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /(node_modules|scrips)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.?css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.?mp4$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        }),
        new HtmlWebpackPlugin({
            filename: "preview.html",
            template: path.join(__dirname, "src", "preview.html")
        })
    ]
}
