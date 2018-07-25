var mongoose = require('mongoose');
var CSE = mongoose.model('CSE');
var MECH = mongoose.model('MECH');



var helper = function(array, index){
	var x = array.slice();
	x[index] = x[index] + 1;
	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}
	return x;
};

module.exports.addVote = function(req,res){

		var model;
		
		if(req.user=='CSE'){
			model = CSE;
		}
		else if(req.user == 'MECH'){
			model = MECH;
		}

	var sec;
	var id = req.params.id;
	if(req.query && req.query.sec)
	{
		sec = req.query.sec;
	}

	model
		.findById(id)
		.select('votes')
		.exec(function(err,doc){
			

			if(sec == 'a')
			{
				doc.votes=helper(doc.votes,0);
				
			}
			else if(sec =='b')
			{

				doc.votes=helper(doc.votes,1);
			}
			else if(sec =='c')
			{

				doc.votes=helper(doc.votes,2);
			}
			else if(sec =='d')
			{

				doc.votes=helper(doc.votes,3);
			}
			else if(sec =='e')
			{

				doc.votes=helper(doc.votes,4);
			}
			else if(sec =='f')
			{

				doc.votes=helper(doc.votes,5);
			}
			else
			{
				res
				.status(400)
				.json('bad request');
			}

			doc.save(function(err, Updated){
				if(err)
				{
					console.log("sorry");
					res
					.status(500)
					.json(err);
				}
				else
				{
					console.log('DONE');
					res
					.status(204)
					.json();
				}
			})
		});
};