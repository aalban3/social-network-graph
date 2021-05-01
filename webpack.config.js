const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  entry: path.join(__dirname, "client", "index.tsx"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        include: [path.resolve(__dirname, "client")],
        exclude: [path.resolve(__dirname, "node_modules")],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        REACT_APP_USER: JSON.stringify(process.env.REACT_APP_USER),
        REACT_APP_PW: JSON.stringify(process.env.REACT_APP_PW),
        REACT_APP_NEO_URI: JSON.stringify(process.env.REACT_APP_NEO_URI),
      },
    }),
    new Dotenv(),
  ],
};
