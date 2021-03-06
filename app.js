require('./api/data/db.js');


var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes');



app.set('port', 3001);

app.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
});

app.listen(app.get('port'), function(){
	console.log("listening at" + app.get('port'));
});

app.use(express.static(path.join(__dirname,'public')));

app.use('/node_modules',express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',routes);

console.log('hello');