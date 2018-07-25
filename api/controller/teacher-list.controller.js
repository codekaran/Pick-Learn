var mongoose = require('mongoose');
var CSE = mongoose.model('CSE');
var MECH = mongoose.model('MECH');

module.exports.teacherList = function(req, res){

       var branch=null;

       if(req.query && req.query.branch){
              branch = req.query.branch;
       }
       else
       {
              res
                .status(500)
                .json('bad request');
       }
       var model;
       if(branch == 'CSE'){
       model = CSE;
       }
       else if(branch == 'MECH'){
              model = MECH;
       }

       model
       .find({"votes":{$not:{$gte:60}}})
       .sort({"subject": 1 })
       .exec(function(err,list){
              if(err)
              {
                     console.log("error");
                     res
                     .status(500)
                     .json(err);
              }
              else
              {
                     console.log("List found "+list.length);
                     res.status(200).json(list);
              }
       });
};