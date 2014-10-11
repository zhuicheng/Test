console.log("NodeJs正在运行..");

function Index() {
	this.chpt03 = function() {
		require('./lib/Chpt/Chpt03_Module');
	};

	this.chpt04 = function() {
		require('./lib/Chpt/Chpt04_Buffer');
	};

	var doc = function() {
		require("./doc");
	};

	var socket = function() {
		require("./lib/core/socket/SocketServer");
	};

	var http = function() {
		var http = require("./lib/Module/Http");
		for ( var i in http) {
			eval("http." + i)({
				title : i
			});
		}
	};

	var stringBuffer = function() {
		var stringBuffer = require("./lib/Module/StringBuffer");
		for ( var i in stringBuffer) {
			eval("stringBuffer." + i)({
				title : i
			});
		}
	};

	var eventEmitter = function() {
		var eventEmitter = require("./lib/Module/EventEmitter");
		for ( var i in eventEmitter) {
			eval("eventEmitter." + i)({
				title : i
			});
		}
	};

	var timer = function() {
		var timer = require("./lib/Module/Timer");
		for ( var i in timer) {
			eval("timer." + i)({
				title : i
			});
		}
	};

	var file = function() {
		var file = require("./lib/Module/File");
		for ( var i in file) {
			eval("file." + i)({
				title : i
			});
		}
	};

	var childProcess = function() {
		var childProcess = require("./lib/Module/ChildProcess");
		for ( var i in childProcess) {
			eval("childProcess." + i)({
				title : i
			});
		}
	};

	var stream = function() {
		var stream = require("./lib/Module/Stream");
		for ( var i in stream) {
			eval("stream." + i)({
				title : i
			});
		}
	};
}

var index = new Index();
for ( var i in index) {
	eval("index." + i)();
}