module.exports={
	initDefault:function(server){
		//监控自动生成界面配置文件
		if(process.env.NODE_ENV=='dev'){
			var fs = require('fs');
			fs.watch('./page.config.js',function(event,filename){
				if(event=='change'){
					var data = fs.readFileSync('./'+filename);
					var pages = JSON.parse(JSON.stringify(data.toString()));
					require('./makeUserDir.js').initPages(pages);
					require('./reLoadWebpack.js').init();
				}
			})
			
		}
		//生成初始文件结构
		console.log("准备开发文件结构")
		require('./makeDefaultDir')(server);
	}
}
