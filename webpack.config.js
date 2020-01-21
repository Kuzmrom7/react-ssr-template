const isDev = process.env.NODE_ENV !== "production";
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs");

let buildNumber;

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "styles.css"
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

  buildNumber = Date.now();

  fs.writeFile("meta.json", JSON.stringify({ buildNumber }), error => {
    if (error) {
      console.error(error);
    }
  });
}

module.exports = {
  mode: isDev ? "development" : "production",
  context: path.join(__dirname, "src"),
  devtool: isDev ? "none" : "source-map",
  entry: { app: path.resolve(__dirname, "src/client.tsx") },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "bundle.js" : `bundle.${buildNumber}.js`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
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
