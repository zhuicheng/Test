/**
 * 对一个对象进行拷贝，并返回一个全新的对象
 * 
 * @param o
 */
function clone(o) {
	if (null !== o && typeof (o) === "object") {
		var obj = {};
		for ( var i in o) {
			switch (typeof (eval("o." + i))) {
			case "object":
				if (null == eval("o." + i)) {
					obj[i] = null;
				} else if (eval("o." + i) instanceof Array) {
					obj[i] = new Array();
					var arr = eval("o." + i);
					for (var j = 0; j < arr.length; j++) {
						obj[i].push(arr[j]);
					}
				} else {
					obj[i] = clone(eval("o." + i));
				}
				break;
			case "undefined":
				obj[i] = undefined;
				break;
			case "string":
				obj[i] = eval("o." + i) + "";
				break;
			case "number":
				obj[i] = eval("o." + i) + 0;
				break;
			case "boolean":
				obj[i] = eval("o." + i);
				break;
			case "function":
				obj[i] = eval("o." + i);
				break;
			}
		}
		return obj;
	} else {
		return o;
	}
}

/**
 * 往指定文件内写入内容
 * 
 * @param path
 * @param content
 */
function writeContent(path, content) {
	if (null === path || path === "") {
		throw new Error("文件路径不能为空");
	}

	var o = new Buffer(content);
	var fs = require("fs");
	fs.open(path, "a", function(e, fd) {
		if (e) {
			throw e;
		}
		fs.write(fd, content, 0, content.length, null, function(err, written) {
			if (err) {
				throw err;
			}
		});
	});
}

module.exports.clone = clone;
module.exports.writeContent = writeContent;