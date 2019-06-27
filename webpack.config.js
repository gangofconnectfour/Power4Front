const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "assets/index.html",
    filename: "../public/index.html",
    inject: true,
    hash: true,
});
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: "development",
    entry:["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "assets"),
        publicPath: "/assets/",
        filename: "javascript/[name].js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: ["./public","./assets"],
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({
            filename: devMode ? "stylesheets/app.css" : "stylesheets/app.min.css"
        })
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1000
    }
};
