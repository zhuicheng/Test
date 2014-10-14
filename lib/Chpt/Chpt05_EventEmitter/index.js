function EventEmitter() {
	console.log('\n\n');
	console.log('Chpt05：测试eventEmitter方法');
	function Timer() {
		var thiz = this;
		this.tick = function() {
			thiz.emit('tick');
			setInterval(function() {
				thiz.emit('tick');
			}, 1000);
			setTimeout(function() {
				process.exit();
			}, 5000);
		};
	}
	require("util").inherits(Timer, require("events").EventEmitter);

	var timer = new Timer();
	timer.on('tick', function() {
		console.log(new Date());
	});
	timer.tick();
}

EventEmitter();