const path = require('path')
const MyConsoleRemovePlugin = require('./loader/plugin-loader')
const MyPlugin = require('./loader/myPlugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),  // 将 @ 映射到 src 目录
        }
    },
    module: {
        rules: [
            // {
            //     // 你的自定义 Loader 配置
            //     test: /\.js$/, // 匹配 .txt 文件
            //     use: [
            //         {
            //             loader: path.resolve('loader/loader.js'),
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new MyConsoleRemovePlugin(), // 使用插件
        // new MyPlugin()
    ]
}