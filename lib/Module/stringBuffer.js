/**
 * 循环打印ASCII码表
 */
function test_PrintASCII() {
	require("./Common").printTitle(arguments);
	console.log("ASCII码表对照一览：");
	var buffer = new Buffer(1);
	for (var i = 0; i < 128; i++) {
		buffer[0] = i;
		console.log(i + " < --- > " + buffer.toString());
	}
}

/**
 * 测试slice方法共用内存
 */
function test_SliceShareMemory() {
	require("./Common").printTitle(arguments);
	var a = new Buffer("Hello World");
	var b = a.slice(6, 11);
	console.log("改变前：" + a + " < --- > " + b);
	for (var i = 6; i < a.length; i++) {
		a[i] = Math.random() * 26 + 97;
	}
	console.log("改变后：" + a + " < --- > " + b + "：父变量改变导致子变量改变，变量共用内存");

	a = new Buffer("Hello World");
	b = a.slice(6, 11);
	console.log("改变前：" + a + " < --- > " + b);
	for (i = 0; i < b.length; i++) {
		b[i] = Math.random() * 26 + 97;
	}
	console.log("改变后：" + a + " < --- > " + b + "：子变量改变导致父变量改变，变量共用内存");

	a = new Buffer("Hello World");
	b = new Buffer(a.slice(6, 11));
	console.log("改变前：" + a + " < --- > " + b);
	for (i = 6; i < a.length; i++) {
		a[i] = Math.random() * 26 + 97;
	}
	console.log("改变后：" + a + " < --- > " + b + "：变量不共用内存");
}

/**
 * 测试slice方法的重载
 */
function test_SliceOverload() {
	require("./Common").printTitle(arguments);
	var a = new Buffer("Hello World");
	var b = a.slice();
	console.log("slice()：" + a + "< --- >" + b);
	b = a.slice(6);
	console.log("slice(start)：" + a + "< --- >" + b);
	b = a.slice(6, 11);
	console.log("slice(start, end)：" + a + "< --- >" + b);
}

/**
 * 测试Buffer对象的write方法
 */
function test_Write() {
	require("./Common").printTitle(arguments);
	var a = new Buffer("XXX");
	console.log("write(content)：写入" + a.write("abcde") + "个字符，内容：" + a.toString());
	a = new Buffer("XXXXXXXXXX");
	console.log("write(content)：写入" + a.write("abcde") + "个字符，内容：" + a.toString());
	a = new Buffer("XXXXXXXXXX");
	console.log("write(content, start)：写入" + a.write("abcde", 3) + "个字符，内容：" + a.toString());
	console.log("start最小为0，最大为Buffer对象的长度");
}

/**
 * 测试Buffer对象的copy方法
 */
function test_Copy() {
	require("./Common").printTitle(arguments);
	var a = new Buffer("Hello World");
	var b = new Buffer("XXXXXXXXXXX");
	console.log("copy(target)：写入" + a.copy(b) + "个字符，内容：" + b.toString());
	b = new Buffer("XXXXXXXXXXX");
	console.log("copy(target, targetStart)：写入" + a.copy(b, 3) + "个字符，内容：" + b.toString());
	b = new Buffer("XXXXXXXXXXX");
	console.log("copy(target, targetStart, sourceStart)：写入" + a.copy(b, 3, 6) + "个字符，内容：" + b.toString());
	b = new Buffer("XXXXXXXXXXX");
	console.log("copy(target, targetStart, sourceStart, sourceEnd)：写入" + a.copy(b, 3, 6, 9) + "个字符，内容：" + b.toString());
	for (var i = 0; i < a.length; i++) {
		a[i] = Math.random() * 26 + 97;
	}
	console.log("父变量与子变量不共用内存：" + a + " < --- > " + b);
}

module.exports.test_PrintASCII = test_PrintASCII;
module.exports.test_SliceShareMemory = test_SliceShareMemory;
module.exports.test_SliceOverload = test_SliceOverload;
module.exports.test_Write = test_Write;
module.exports.test_Copy = test_Copy;
