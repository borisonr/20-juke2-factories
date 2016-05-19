var express = require('express');
var bodyParser = require('body-parser');

var server = express();

server.use(express.static(__dirname));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));


var port = 3000;
server.listen(port, function () {
	console.log('If you wanna be served, check out port', port);
});