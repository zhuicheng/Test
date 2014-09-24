/**
 * 打印所执行的方法名称
 * 
 * @param title
 */
function printTitle(array) {
	if (null === array || undefined === array) {
		console.log("\n\n\n< =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= >");
	} else if (array instanceof Object && array.length > 0 && typeof (array[0]) === "object") {
		console.log("\n\n\n< =*=*=*=*=* 正在执行" + array[0].title + "方法 *=*=*=*=*= >");
	} else {
		console.log("\n\n\n< =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= >");
	}
}

module.exports.printTitle = printTitle;