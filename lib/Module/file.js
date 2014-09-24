/**
 * 测试文件夹是否存在
 */
function test_DirectoryState() {
	require("./Common").printTitle(arguments);
	var fs = require("fs");

	fs.exists("./err.log", function(exists) {
		if (exists) {
			fs.stat("./err.log", function(e, stats) {
				if (e) {
					throw e;
				}
				console.log("exists()方法检测文件夹是否存在：");
				console.log(stats);
			});
		} else {
			console.log("./err.log文件夹不存在");
		}
	});

	if (fs.existsSync("./err.log")) {
		fs.stat("./err.log", function(e, stats) {
			if (e) {
				throw e;
			}
			console.log("existsSync()方法检测文件夹是否存在：");
			console.log(stats);
		});
	} else {
		console.log("./err.log文件夹不存在");
	}
}

/**
 * 测试文件读取
 */
function test_readFile() {
	require("./Common").printTitle(arguments);
	var fs = require("fs");
	// 如果文件所在的文件夹不存在，则会报错
	fs.open("D:/log.txt", "r", function(e, fd) {
		if (e) {
			throw e;
		}
		console.log("文件内容：");
		var content = new Buffer(1024);
		fs.read(fd, content, 0, content.length, 0, function(e, read) {
			if (e) {
				throw e;
			}
			// read表示读入长度
			if (read > 0) {
				console.log(content.slice(0, read).toString());
			}
		});
		fs.close(fd);
	});
}

/**
 * 测试文件写入
 */
function test_writeFile() {
	require("./Common").printTitle(arguments);
	var fs = require("fs");
	// 如果文件不存在则会创建，如果文件所在的文件夹不存在，则会报错
	fs.open("D:/log.txt", "a", function(e, fd) {
		if (e) {
			throw e;
		}
		if (fs.existsSync("D:/TDOWNLOAD")) {
			fs.stat("D:/TDOWNLOAD", function(e, stats) {
				if (e) {
					throw e;
				}

				for ( var i in stats) {
					if (typeof (eval("stats." + i)) !== "function") {
						var content = new Buffer(i + "：" + eval("stats." + i) + "\n");
						fs.write(fd, content, 0, content.length, null, function(e, written) {
							if (e) {
								throw e;
							}
							// written表示写入长度
						});
					}
				}
				fs.close(fd);
			});
		} else {
			var content = new Buffer("D:/TDOWNLOAD文件夹不存在");
			fs.write(fd, content, 0, content.length, null, function(e, written) {
				if (e) {
					throw e;
				}
				// written表示写入长度
				fs.close(fd);
			});
		}
		console.log("文件写入完毕");
	});
}

module.exports.test_DirectoryState = test_DirectoryState;
// module.exports.test_writeFile = test_writeFile;
// module.exports.test_readFile = test_readFile;
