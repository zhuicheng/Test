function WebSocketServer(opt) {
	var thiz = this;
	var options = require('../../Utils/CommonUtil').clone(opt);
	var connect = require('connect');
	var app = connect();
	var socketio = require('socket.io');
	var clients = [];

	var init = function() {
		options = (null === options || undefined === options) ? {} : options;
		options.port = typeof (options.port) === 'undefined' ? 8888 : options.port;
	};

	var bindEvent = function() {
		app.use(connect.logger('dev'));
		app.use(connect.static('./src'));
		app.use(function(req, res) {
			require('fs').readFile(__dirname + '/src/index.html', function(err, data) {
				if (err) {
					res.writeHead(500);
					res.end('Some error occured..');
				} else {
					res.writeHead(200);
					res.end(data);
				}
			});
		});

		socketio.listen(app).on('connection', function(client) {
			console.log('%j linked..', client.client.conn.remoteAddress);
			clients.push(client);
			// console.error(client.client.conn.remoteAddress);

			// 监听成功
			client.on('clientMessage', function(msg) {
				for (var i = 0; i < clients.length; i++) {
					if (clients[i] !== client) {
						clients[i].emit('serverMessage', client.client.conn.remoteAddress + '：' + msg);
					}
				}
			});
			client.on('disconnect', function() {
				clients.splice(clients.indexOf(client), 1);
				console.log('%j has disconnected..', client.client.conn.remoteAddress);
			});
		});
	};

	this.getOptions = function() {
		return options;
	};

	this.start = function() {
		app.listen(options.port);
		console.log('Server start..');
	};

	init();
	bindEvent();
}

function OtherServer() {
	var http = require('http');
	var stic = require('node-static');
	var file = new stic.Server('./src', {
		cache : 0
	});
	var socketio = require('socket.io');
	var clients = [];

	var server = http.createServer(function(req, res) {
		file.serve(req, res, function(err, resErr) {
			if (err) {
				var content = new Buffer(new Date() + '：' + err + '\n');
				require('../../Utils/CommonUtil').writeContent('./err.log', content);
				res.writeHead(err.status, err.headers);
				res.end();
			} else {
				require('fs').readFile(__dirname + '/src/index.html', function(err, data) {
					if (err) {
						res.writeHead(500);
						res.end('Some error occured..');
					} else {
						res.writeHead(200);
						res.end(data);
					}
				});
			}
		});
	}).listen(8888);

	socketio.listen(server).on('connection', function(client) {
		console.log('%j linked..', client.client.conn.remoteAddress);
		clients.push(client);
		// console.error(client.client.conn.remoteAddress);

		// 监听成功
		client.on('clientMessage', function(msg) {
			for (var i = 0; i < clients.length; i++) {
				if (clients[i] !== client) {
					clients[i].emit('serverMessage', client.client.conn.remoteAddress + '：' + msg);
				}
			}
		});
		client.on('disconnect', function() {
			clients.splice(clients.indexOf(client), 1);
			console.log('%j has disconnected..', client.client.conn.remoteAddress);
		});
	});

	console.log('Server start..');
}

var webSocketServer = new WebSocketServer();
webSocketServer.start();