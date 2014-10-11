function Module() {
	console.log('\n\n');
	console.log('Chpt03：测试引入相同模块');
	require('./sample');
	require('./sample');
	console.log('模块在首次加载后会被缓存起来，如果模块名能被解析为相同的文件名，则每次调用require均会返回同一模块（不要轻易修改引用模块的属性或方法，否则会影响到整个项目）');
}

Module();