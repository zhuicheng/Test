/**
 * 启动服务以及重写服务模块相关参数
 */
function test_startServerAndOverriderParam() {
	require("./Common").printTitle(arguments);
	var server = require("../Model/HttpServer");
	console.log("server模块带来的参数PI：" + server.PI);
	server.PI = Math.PI * 2;
	console.log("重写server模块带来的参数PI：" + server.PI);
	var tempServer = require("../Model/HttpServer");
	console.log("tempServer变量的参数PI受到了影响：" + tempServer.PI);

	// 获取在运行指令时的参数
	if (process.argv.length > 2) {
		for (var i = 2; i < process.argv.length; i++) {
			console.log(process.argv[i]);
		}
	}

	server.Server.start();
}

module.exports.test_startServerAndOverriderParam = test_startServerAndOverriderParam;