/* Require hooks for server-side */

const sass = require("node-sass");
const path = require("path");

const nodeEnv = process.env.NODE_ENV || "development";
const isDev = nodeEnv === "development";

module.exports = () => {
  require("css-modules-require-hook")({
    extensions: [".css", ".scss"]
  });
};
