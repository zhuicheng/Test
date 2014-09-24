function Server() {
	var http;

	var init = function() {
		console.log("服务正在启动..");
		http = require("http");
	};

	this.start = function() {
		init();

		http.createServer(function(req, res) {
			console.log("\n*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*");
			console.log("请求信息：");
			console.log("request.url：" + req.url);
			console.log("pathname：" + require("url").parse(req.url).pathname);

			res.writeHeader(200, {
				"Content-Type" : "text/plain"
			});

			res.write(require("util").inspect(req.headers));
			res.end();
		}).listen(8888);

		console.log("服务启动成功！");
	};
}

module.exports.Server = new Server();
module.exports.PI = Math.PI;