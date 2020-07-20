const{ merge }= require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
	// 设置为开发模式
    mode: 'development',
    devtool: 'inline-source-map',
    // 配置服务端目录和端口
    devServer: {
        contentBase: '../dist',
        port: 3000
    }
});