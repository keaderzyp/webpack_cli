module.exports={
	init:function(server){
		console.log("开始启动webpack环境");
		var webpack = require('webpack');
		var webpackConfig = require('../webpack.config.js');
		var compiler = webpack(webpackConfig,function(err,stats){
			console.log("webpack启动成功");
			console.log(stats.toString({
				colors:true
			}))
			
		})
		//如果是生产环境就使用观察者模式
		if(process.env.NODE_ENV == 'dev'){
			console.log("开始启动webpack观察者模式");
			var io = require('socket.io').listen(server);
			global.IO = io;
			compiler.watch(webpackConfig,function(err,stats){
				console.log("完成一次编译");
//				console.log(stats.toString({
//					colors:true
//				}))
				io.sockets.emit('refresh',{success:true});
			})
		}
	}
}
