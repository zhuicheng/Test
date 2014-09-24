/**
 * 测试触发事件
 */
function test_triggerEvent() {
	require("./Common").printTitle(arguments);

	var Test = function() {
		this.print = function(content) {
			this.emit("print", content);
		};
	};

	require("util").inherits(Test, require("events").EventEmitter);

	var test = new Test();
	test.on("print", function(content) {
		console.log(content);
	});

	test.print(new Date());
}

module.exports.test_triggerEvent = test_triggerEvent;