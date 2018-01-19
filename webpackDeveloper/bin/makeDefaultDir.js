module.exports=function(){
	var fs = require('fs');
	console.log("正在检测src文件目录...")
	if(!fs.existsSync('./src')){
		console.log("项目不存在src目录正在创建...");
		fs.mkdirSync('./src');
		console.log("src目录创建成功");
	}
	console.log("正在检测src附属目录结构");
	if(!fs.existsSync('./src/js')){
		console.log("项目不存在js目录正在创建...");
		fs.mkdirSync('./src/js')
		console.log("js目录创建成功");
	}
	if(!fs.existsSync('./src/css')){
		console.log("项目不存在css目录正在创建...");
		fs.mkdirSync('./src/css')
		console.log("css目录创建成功");
	}
	if(!fs.existsSync('./src/html')){
		console.log("项目不存在html目录正在创建...");
		fs.mkdirSync('./src/html')
		console.log("html目录创建成功");
	}
	if(!fs.existsSync('./src/img')){
		console.log("项目不存在img目录正在创建...");
		fs.mkdirSync('./src/img')
		console.log("img目录创建成功");
	}
	if(!fs.existsSync('./src/plugin')){
		console.log("项目不存在plugin目录正在创建...");
		fs.mkdirSync('./src/plugin')
		console.log("plugin目录创建成功");
	}
	console.log("全部目录已创建");
	console.log("检测目录内部初始文件是否需要生成");
	var jsDir = fs.readdirSync('./src/js');
	var cssDir = fs.readdirSync('./src/css');
	var htmlDir = fs.readdirSync('./src/html');
	var pluginDir = fs.readdirSync('./src/plugin');
	if(jsDir.length==0&&cssDir.length==0&&htmlDir.length==0&&pluginDir.length==0){
		console.log("检测到初始文件并没有生成，开始生产初始文件结构");
		var jsData = `import '../css/index.css';`;
		fs.writeFileSync('./src/js/index.js',new Buffer(jsData));
		console.log("完成index.js的创建");
		var cssData = `.container{
	text-align: center;
}
.container  h2{
	font-size: 50px;
	margin: 10px;
}
.container  h2 small{
	font-size: 30%;
	margin-left: 10px;
}
.container .leader{
	margin: 10px;
}
`;
		fs.writeFileSync('./src/css/index.css',new Buffer(cssData));
		console.log("完成index.css的创建");
		var htmlData = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>Webpack Developer</title>
	</head>
	<body>
		<div class="container">
			<h2>WelCome To Use WebPackDeveloper<small>v1.0.0</small></h2>
			<div class="leader">created by LeoZhang</div>
			<img src="/img/webpack.png"/> 
		</div>
	</body>
</html>`;
		fs.writeFileSync('./src/html/index.html',new Buffer(htmlData));
		console.log("完成index.html的创建");
		var hmrData = `var scripts = document.querySelectorAll("script");
var hmr = document.createElement("script");
hmr.src = '/socket.io/socket.io.js';
document.body.insertBefore(hmr,scripts[0]);
window.onload=()=>{
	var socket = io.connect();
	socket.on('refresh',res =>{if(res.success) {location.reload()}});
}`;
		fs.writeFileSync('./src/plugin/hmr.js',new Buffer(hmrData));
		console.log("完成hmr.js的创建");
	}
	console.log("已经生成过初始文件");
}
