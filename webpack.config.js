const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "~/shared": path.resolve(__dirname, "src/shared"),
      "~/components": path.resolve(__dirname, "src/components"),
      "~/assets": path.resolve(__dirname, "src/assets"),
      "~/store": path.resolve(__dirname, "src/store")
    }
  },
  devServer: {
    port: 3210,
    quiet: true,
    overlay: true,
    open: true
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/favicon.svg"
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx)$/,
        exclude: [/(node_modules)/],
        use: [
          {
            loader: "eslint-loader",
            options: {
              emitError: true
            }
          }
        ]
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/(node_modules)/],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
};
