let path = require("path");
const MiniExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

let config = {
    entry: [
        "./src/jsx/App.jsx"
    ],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "index.js",
        publicPath: "build/"
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: [
                    MiniExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniExtractPlugin({ filename: "styles.css" }),
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default", {
                    discardComments: {
                        removeAll: true
                    }
                }]
            }
        })
    ]
};

module.exports = (environment, options) => {
    let production = options.mode === "production";

    config.devtool = production ? false : "eval-sourcemap";

    return config;
};