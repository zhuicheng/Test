/**
 * 测试NextTick方法
 */
function test_NextTick() {
	require("./Common").printTitle(arguments);
	process.nextTick(function() {
		var i = 1;
		while (i <= 100) {
			console.log("function 1执行：" + i);
			i++;
		}
	});

	process.nextTick(function() {
		console.log("function 2执行！");
	});

	console.log("方法按照顺序执行");
}

module.exports.test_NextTick = test_NextTick;