var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/picknlearn';

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
	console.log('mongoose connected to ' + dburl);
});

mongoose.connection.on('disconnected',function(){
	console.log('mongoose disconnected');
});

mongoose.connection.on('error',function(err){
	console.log('mongoose connection error ' + err);
});

require('./models.js')