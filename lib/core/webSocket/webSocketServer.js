function WebSocketServer(opt) {
	var thiz = this;
	var options = require('../../Utils/CommonUtil').clone(opt);
	var socketServer = require('http').createServer();
	var clients = [];

	var init = function() {
		options = (null === options || undefined === options) ? {} : options;
	};
}

var http = require('http');
var stic = require('node-static');
var file = new stic.Server('./src', {
	cache : 0
});
var socketio = require('socket.io');
var clientArray = [];

var server = http.createServer(function(req, res) {
	file.serve(req, res, function(err, resErr) {
		if (err) {
			var content = new Buffer(new Date() + "：" + err + "\n");
			require("../../Utils/CommonUtil").writeContent("./err.log", content);
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
	clientArray.push(client);
	// console.error(client.client.conn.remoteAddress);

	// 监听成功
	client.on('clientMessage', function(msg) {
		for (var i = 0; i < clientArray.length; i++) {
			if (clientArray[i] !== client) {
				clientArray[i].emit('serverMessage', client.client.conn.remoteAddress + '：' + msg);
			}
		}
	});
	client.on("disconnect", function() {
		clientArray.splice(clientArray.indexOf(client), 1);
		console.log("%j has disconnected", client.client.conn.remoteAddress);
	});
});

console.log('Server start..');