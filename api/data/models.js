var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	age : {
		type : Number
	},
	votes : [Number],

	subject : {
		type : String
	},
	description:{
		type:String
	}
});


var studentSchema = new mongoose.Schema({
	name : {
		type : String
	},
	id : {
		type : Number
	},
	branch : {
		type : String
	},
	section : {
		type : String
	},
	mobile : {
		type : Number
	},
	password : {
		type : String
	},
	blocked : {
		type : Boolean
	},
	elective : {
		type : Boolean
	}

});

var electiveSchema = new mongoose.Schema({
	id : {
		type:[Number]
	},
	count : {
		type:Number
	},
	elective : {
		type : String
	}

});

mongoose.model('CSE',teacherSchema,'CSE');
mongoose.model('MECH',teacherSchema,'MECH');
mongoose.model('STUDENT',studentSchema,'STUDENT');
mongoose.model('CSELECTIVE',electiveSchema,'CSELECTIVE');