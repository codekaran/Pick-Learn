var mongoose = require('mongoose');
var STUDENT  = mongoose.model('STUDENT');	
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');


module.exports.registerStudent = function(req,res){

	var name = req.body.name;
	var id   = parseInt(req.body.id,10);
	var password = req.body.pass;
	var mobile = parseInt(req.body.mobile,10);

	STUDENT
		.findOne({
				id : id
		}).exec(function(err,data){
			if(err){
				res
				.status(400)
				.json(err);
			}
			else if(data){
				if(data.name == name){

				data.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
				data.mobile = mobile;
				data.save(function(err,update){
					if(err){


						res
						 .status(500)
						 .json(err);
					}
					else{
						res
						 .status(204)
						 .json(update);
					}
				});
			}

		
		else{
			res
			 .status(400)
			 .json({message : "Name and ID mismatch"});
		}
	}
	else
	{
		res
		 .status(400)
		 .json({"message" : "data not found"});
	}
	
		});


};



module.exports.loginStudent = function(req,res){
	
	
	var id   = parseInt(req.body.id,10);
	var password = req.body.password;

	STUDENT
		.findOne({
				id : id
		}).exec(function(err,data){
			if(err){
				res
				.status(500)
				.json(err);
			}
			else if(data){
				if(bcrypt.compareSync(password,data.password)){
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
			res
			 .status(401)
			 .json({message : "incorrect password"});

		}

		}
		else{
			res
			 .status(400)
			 .json({message : "Please register yourself"});
		}
		});

	
};



module.exports.blockStudent = function(req,res){	

	var id = req.params.id;
	STUDENT
		.findById(id)
		.exec(function(err,data){
			if(err){
				
				res
				 .status(400)
				 .json({message:"Bad Request"});
			}
			else if(data){
				console.log(data.blocked);
				data.blocked=true;
				data.save(function(err,update){
					if(err){


						res
						 .status(500)
						 .json(err);
					}
					else{
						res
						 .status(204)
						 .json(update);
					}
				});
			}

		});
};





module.exports.authenticate = function(req,res,next){
	var headerExists = req.headers.authorization;
	if(headerExists){

		var token = req.headers.authorization.split(' ')[1];
		
		jwt.verify(token,'s3cr3t',function(error,decoded){
			if(error){
				console.log('this is b');
				res.status(401).json('Unauthorized');
			}
			else{
				req.user = decoded.branch;
				next();
			}
		});

	}
	else{
		console.log('this is c');
		res.status(403).json('No token provided');
	}
};


