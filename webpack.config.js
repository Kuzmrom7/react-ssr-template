const isDev = process.env.NODE_ENV !== "production";
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const LoadablePlugin = require("@loadable/webpack-plugin");

let buildNumber;

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: isDev ? "[name].css" : "[name].[contenthash:8].css",
    chunkFilename: isDev ? "[id].css" : "[id].[contenthash:8].css"
  }),
  new LoadablePlugin({
    writeToDisk: true,
    filename: "../dist/loadable-stats.json"
  })
];

if (!isDev) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "webpack-report.html",
      openAnalyzer: false
    }),
    new CleanWebpackPlugin()
  );
}

module.exports = {
  mode: isDev ? "development" : "production",
  context: path.join(__dirname, "src"),
  devtool: isDev ? "none" : "source-map",
  entry: { app: path.resolve(__dirname, "src/client.tsx") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: isDev ? "[id].js" : "[id].[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|ico|gif|svg|eot|ttf|woff|woff2|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["src", "node_modules"]
  },
  plugins
};
