module.exports={
	init:function(server){
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
				path:path.join(__dirname.replace("/bin",""),'public')
			},
			module:{
				rules:[
					{
						test:/\.html$/,
						use:'html-loader'
					},
					{
						test:/\.css$/,
						use:ExtractWebpackPlugin.extract({
							fallback:'style-loader',
							use:['css-loader','postcss-loader']
						})
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
				chunks:['hmr',chunkName]
			}))
		}
		var compiler = webpack(config,function(err,stats){
			console.log("webpack启动成功");
			console.log(stats.toString({
				colors:true
			}))
			
		})
		var io = global.IO
		console.log("开始启动webpack观察者模式");
		compiler.watch(config,function(err,stats){
			io.sockets.emit('refresh',{success:true});
			console.log("完成一次编译");
		})
	}
	
}
