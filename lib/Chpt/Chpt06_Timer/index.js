function timer() {
	console.log('\n\n');
	console.log('Chpt06：测试process.nextTick方法');
	process.nextTick(function() {
		var i = 1;
		while (i <= 100) {
			console.log('function 1执行：' + i);
			i++;
		}
	});

	process.nextTick(function() {
		console.log('function 2执行！');
	});

	console.log('方法按照顺序执行');
}

timer();