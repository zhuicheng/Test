function Slice() {
	console.log('\n\n');
	console.log('Chpt04：测试slice方法');
	var a = new Buffer("Hello World");
	var b = a.slice(6, 11);
	console.log(a + " < --- > " + b);
	for (var i = 6; i < a.length; i++) {
		a[i] = Math.random() * 26 + 97;
	}
	console.log(a + " < --- > " + b);
	console.log('父缓冲区与通过slice生成的子缓冲区具有相同的内存引用');
}

function Copy() {
	console.log('\n\n');
	console.log('Chpt04：测试copy方法');
	var a = new Buffer("Hello World");
	var b = new Buffer(5);
	console.log(a + " < --- > " + b);
	a.copy(b, 0, 6, 11);
	console.log(a + " < --- > " + b);
}

Slice();
Copy();