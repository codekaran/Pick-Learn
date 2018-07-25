var mongoose = require('mongoose');
var CSELECTIVE  = mongoose.model('CSELECTIVE');
var STUDENT  = mongoose.model('STUDENT');

module.exports.addElective = function(req,res){
	
	 var id = req.params.id;
	var stu_id;
	if(req.query && req.query.studentId){
		stu_id = req.query.studentId;
	}
	else{
		res.status(400).json("wrong url");
	}
	CSELECTIVE
		.findById(id)
		.exec(function(err,data){
			if(err){
				res
				.status(500)
				.json("internal error");
			}
			else if(data){
				data.count = data.count + 1;
				var len = data.id.length;
				data.id=helper(data.id,len,stu_id);
				data.save(function(err,update){
					if(err)
					{

						res
						.status(500)
						.json(err);
					}
					else
					{
						STUDENT
							.findOne({
								id:stu_id
							}).exec(function(err,data){
								if(err){
									res.status(400).json("Wrong URL");
								}
								else{
									data.elective = true;
									data.save(function(err,update){
										if(err){
											res.status(500).json(err);
										}
										else
										{
											res
						 					.status(204)
						 					.json("elective added");
										}
									});
								}
							});
						
					}
				});
			}
			else{
				res.status(400).json("use not found");
			}
		});

};

var helper = function(array, index,id){
	var x = array.slice();
	x[index] = id;
	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}
	return x;
};

module.exports.getElectives = function(req,res){
	CSELECTIVE
		.find({"count":{$not:{$gte:60}}})
		.exec(function(err,data){
			if(err){
				res
				.status(500)
				.json("Some Error occured");
			}
			else{
				res
				 .status(200)
				 .json(data);
			}
		});
};