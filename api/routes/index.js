var express = require('express');
var router = express.Router();

var ctrlTeacher = require("../controller/teacher-list.controller.js");
var ctrlVote = require("../controller/vote-controller.js");
var ctrlStu = require("../controller/student-controller.js");
var ctrlMSg = require("../controller/twilio-controller.js");
var ctrlToken = require("../controller/refresh-token-controller.js");
var ctrlElect = require("../controller/elective-controller.js")


router
	.route('/teacherlist')
	.get(ctrlStu.authenticate,ctrlTeacher.teacherList);


router
	.route('/teacherlist/:id')
	.put(ctrlStu.authenticate,ctrlVote.addVote);


router
	.route('/student/login')
	.post(ctrlStu.loginStudent);


router
	.route('/student/register')
	.post(ctrlStu.registerStudent);

router
	.route('/student/voted/:id')
	.put(ctrlStu.blockStudent);

router
    .route('/twilio')
    .get(ctrlMSg.OTP);

router
	.route('/refreshToken/:id')
	.get(ctrlToken.refreshToken);

router
	.route('/elective/:id')
	.put(ctrlStu.authenticate,ctrlElect.addElective);

router
	.route('/elective')
	.get(ctrlStu.authenticate,ctrlElect.getElectives);

module.exports = router;