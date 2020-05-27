const path = require("path");
const { DefinePlugin } = require("webpack");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WrmPlugin = require("atlassian-webresource-webpack-plugin");

const PLUGIN_KEY = "com.erika.jira.JIRAANNOUNCEMENTS";

const MVN_OUTPUT_DIR = path.join(__dirname, "target", "classes");
const FRONTEND_SRC_DIR = path.join(__dirname, "src", "main", "resources");
const NODE_MODULES_DIR = path.join(__dirname, "node_modules");

const providedDependencies = require(path.resolve(
  FRONTEND_SRC_DIR,
  "wrm-dependencies-conf.js"
));

module.exports = {
  mode: "development",
  context: FRONTEND_SRC_DIR,
  entry: {
    "admin-config-context": "./js/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.soy$/i,
        loader: "soy-loader",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    //new WebpackMd5Hash(),
    new DefinePlugin({
      // outputs a literal string with the plugin key value in it
      PLUGIN_KEY: `"${PLUGIN_KEY}"`,
      // disables debug output in soy templates
      "goog.DEBUG": false,
    }),
    new WrmPlugin({
      pluginKey: PLUGIN_KEY,
      contextMap: {
        "admin-config-context": [
          "com.erika.jira.JIRAANNOUNCEMENTS.admin-config-context",
        ],
      },
      providedDependencies: providedDependencies,
      xmlDescriptors: path.resolve(
        MVN_OUTPUT_DIR,
        "META-INF",
        "plugin-descriptors",
        "wr-webpack-bundles.xml"
      ),
    }),
  ],
  resolve: {
    alias: {
      myapp: FRONTEND_SRC_DIR,
      jquery$: path.join(NODE_MODULES_DIR, "jquery", "dist", "jquery.js"),
      "vendor/es6-promise": path.join(
        NODE_MODULES_DIR,
        "es6-promise",
        "dist",
        "es6-promise.auto.js"
      ),
      "vendor/idb": path.join(NODE_MODULES_DIR, "idb", "lib", "idb.js"),
    },
    modules: [path.resolve(FRONTEND_SRC_DIR), path.resolve(NODE_MODULES_DIR)],
    plugins: [new DirectoryNamedWebpackPlugin()],
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(MVN_OUTPUT_DIR),
  },
};
