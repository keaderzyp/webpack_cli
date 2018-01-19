var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractWebpackPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');
var config = {
	entry:{
		hmr:'./src/plugin/hmr.js'
	},
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'public')
	},
	module:{
		rules:[
			{
				test:/\.html$/,
				use:'html-loader'
			},
			{
				test:/\.js$/,
				include:/src/,
				use:'babel-loader'
			},
			{
				test:/\.vue$/,
				use:'vue-loader'
			},
			{
				test:/\.(gif|jpeg|jpg|png)\??.*$/,
				loader:'url-loader?limit=1&name=/img/[name].[ext]'
			},
			{
				test:/\.(woff|svg|eot|ttf)\??.*$/,
				loader:'url-loader?limit=1&name=/fonts/[name].[ext]'
			},
		]
	},
	plugins:[
		new ExtractWebpackPlugin('css/[name].css'),
	]
}
var fs = require('fs');
var files = fs.readdirSync('./src/js');
for(item of files){
	//生成chunkname放入entry
	var chunkName = item.substring(0,item.indexOf('.'))
	config.entry[chunkName]='./src/js/'+item;
	//生成htmlPlugin放入plugin
	config.plugins.push(new HtmlWebpackPlugin({
		template:'./src/html/'+chunkName+'.html',
		filename:'html/'+chunkName+'.html',
		chunks:process.env.NODE_ENV=='dev'?['hmr',chunkName]:[chunkName]
	}))
}
//当使用发布环境的时候采用css代码的压缩以及js代码的压缩
config.module.rules.push({
	test:/\.css$/,
	use:ExtractWebpackPlugin.extract({
		fallback:'style-loader',
		use:[process.env.NODE_ENV=='dev'?'css-loader':{loader:'css-loader',options:{minimize:true}},'postcss-loader']
	})
})
if(process.env.NODE_ENV=='build'){
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
//当使用生产环境的时候采用自动打开浏览器
if(process.env.NODE_ENV=='dev'){
	config.plugins.unshift(new OpenBrowserPlugin({ url: 'http://localhost:3000/index',browser:'Google Chrome' }));
}
//公开webpack模块
module.exports = config;
