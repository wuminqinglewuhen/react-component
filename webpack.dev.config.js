const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: './src/app.jsx',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
        //   loader: 'babel-loader',
          use: ['babel-loader', 'react-hot-loader/webpack'],
        //   query: {
        //     presets: ['@babel/env', '@babel/react']
        //   }
        },
        {
          test: /.css$/,
          use: ['style-loader', {
            loader: 'css-loader',
          }, 'postcss-loader']
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: 'style-loader',
            }, // 将 JS 字符串生成为 style 节点
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true // less javascriptEnabled参数
                },
              },
            },  // 将 less 转化成 CSS，需要安装 less 和 less-loader
          ]
        },

      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],
    devServer: {
        host: "localhost",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    }
  };