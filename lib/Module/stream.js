function test_writeContentIntoResponse() {
	require("./Common").printTitle(arguments);
	var http = require("http");

	http.createServer(function(req, res) {
		res.writeHeader(200, {
			"Content-Type" : "text/javascript;charset=UTF-8"
		});

		var fs = require("fs");
		var readStream = fs.createReadStream("D:/exp.txt");
		readStream.pipe(res, {
			end : false
		});

		readStream.on("end", function() {
			console.log("内容写入完毕..");
			res.end();
		});
	}).listen(8888);

	console.log("服务启动成功！");
}

function test_socketServer() {
	require("./Common").printTitle(arguments);
	require("net").createServer(function(socket) {
		console.log('connect：' + socket.remoteAddress + '：' + socket.remotePort);
		socket.write("连接服务端成功.. \n");

		socket.on("data", function(data) {
			console.log(socket.remoteAddress + "：" + data);
		});

		socket.on("end", function() {
			console.log('end：' + socket.remoteAddress + '：' + socket.remotePort);
		});

		socket.on("close", function() {
			console.log('close：' + socket.remoteAddress + '：' + socket.remotePort);
		});

		socket.setTimeout(3000);
		socket.on("timeout", function() {
			socket.end();
		});
	}).listen(4001);
}

// module.exports.test_writeContentIntoResponse = test_writeContentIntoResponse;
module.exports.test_socketServer = test_socketServer;