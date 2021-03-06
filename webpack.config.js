// webpack.config.js in root directory
const path = require("path");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/bundle.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    }
};