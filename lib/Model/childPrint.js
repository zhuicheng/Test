if (undefined !== process.env.num) {
	console.log("传入的参数：" + process.env.num);
}

console.log("执行命令行时的携带参数：");
console.log(require('optimist').argv);

process.stdin.resume();
process.stdin.on("data", function(content) {
	console.log(content.toString());
});

setTimeout(function() {
	process.exit();
}, 6000);