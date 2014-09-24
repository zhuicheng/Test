console.log("文件正在生成..");
var fs = require("fs");

fs.unlink("D:/exp.txt", function() {
	fs.open("D:/exp.txt", "a", function(e, fd) {
		if (e) {
			throw e;
		}

		var content = new Content().getContent();
		for (var i = 0; i < content.length; i++) {
			var buffer = new Buffer(content[i] + "\n");
			fs.writeSync(fd, buffer, 0, buffer.length, null);
		}
		fs.close(fd);
	});
});
console.log("文件生成完毕");

function Content() {
	var thiz = this;
	var content = [];

	var appendContent = function(o) {
		content.push(o);
	};

	this.getContent = function() {
		return content;
	};

	appendContent("JavaScript：");
	appendContent("在if(o) {} 的判断方法中，当o为0、false、null、undefined时不会进入方法体");
	appendContent("NodeJs：");
}