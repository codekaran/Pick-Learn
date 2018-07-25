var mongoose = require('mongoose');
var STUDENT = mongoose.model('STUDENT');
var jwt      = require('jsonwebtoken');

module.exports.refreshToken =  function(req ,res){
	var id = req.params.id;
	STUDENT
		.findById(id)
		.exec(function(err,data){
			if(data){
				console.log(data.blocked);
				var token = jwt.sign({
									name: data.name,
									section: data.section,
									branch:data.branch,
									id:data._id,
									stu_id:data.id,
									elective:data.elective,
									blocked:data.blocked
									},'s3cr3t',{expiresIn:3600});


				res
				 .status(200)
				 .json({success : true,token :token });

		}
			else{
			res.status(500).json(err);
		}
		});

};