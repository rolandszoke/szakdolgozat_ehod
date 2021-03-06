var webpack = require("webpack");

module.exports = {
    entry: {
        main: ['./src/scripts/main.js']
    }
    , output: {
        filename: './dist/scripts/[name].js'
    }
    , module: {
        loaders: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: []
                    }
                }]
            }
            , {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            }
            , {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            }
            ,{
                test: /\.json$/,
                exclude: /node_modules/,
                use: 'json-loader'
            }
        ]
    }
    , devServer: {
        port: 8080
    }
};