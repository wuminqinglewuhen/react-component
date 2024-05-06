const path = require("path")

module.exports = {
    mode: 'production',
    entry: './src/components/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
    externals: {
        'react': 'react',
        'antd': 'antd'
    }
}