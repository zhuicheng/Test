/**
 * 测试子进程
 */
function test_childProcessExec() {
	require("./Common").printTitle(arguments);
	require("child_process").exec("dir D:", function(err, stdout, stderr) {
		if (err) {
			console.error("子进程发生错误并退出：%j", err);
			return;
		}
		console.log(stdout);
	});
}

/**
 * 测试带参数的子进程
 */
function test_childProcessExecWithParam() {
	require("./Common").printTitle(arguments);
	if ("win32" === process.platform) {
		console.log("Windows平台不支持此命令，或需要其他方法来实现");
	} else {
		require("child_process").exec("node ./Model/ChildTest", {
			env : {
				num : 123
			}
		}, function(err, stdout, stderr) {
			if (err) {
				console.log(err);
				console.error("子进程发生错误并退出：%j", err);
				return;
			}
			if (null !== stdout) {
				console.log(stdout);
			}
		});
	}
}

/**
 * 测试子进程
 */
function test_childProcessSpawn() {
	require("./Common").printTitle(arguments);
	var child = require("child_process").spawn("node", [ "./lib/Model/ChildPrint", "arg1", "arg2", "-x" ]);
	child.stdout.on("data", function(data) {
		console.log(data.toString());
	});

	child.stderr.on("data", function(data) {
		console.log(data.toString());
	});

	child.on("exit", function(code, signal) {
		if (null !== code) {
			console.log("子进程自行退出：%j", code);
		} else {
			console.log("子进程被父进程杀死：%j", signal);
		}
	});

	var int = setInterval(function() {
		child.stdin.write(new Date() + "\n");
	}, 1000);

	setTimeout(function() {
		clearInterval(int);
		// child.kill()也可以杀死子进程
	}, 6000);
}

module.exports.test_childProcessExec = test_childProcessExec;
module.exports.test_childProcessExecWithParam = test_childProcessExecWithParam;
module.exports.test_childProcessSpawn = test_childProcessSpawn;