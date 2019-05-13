const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const postcssPresetEnv = require("postcss-preset-env");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: "development",
    entry:["./src/index.js","./scss/app.scss"],
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader:"css-loader",
                        options: {
                            importLoaders: 1
                        }

                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({
            filename: devMode ? "css/app.css" : "css/app.min.css"
        })

    ],
    // watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1000
    }
};
