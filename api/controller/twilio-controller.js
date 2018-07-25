var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);



module.exports.OTP = function(req,res){


if(req.query && req.query.random)
{
	var otp = req.query.random;
	console.log(otp);
twilio.messages.create({
    body: otp,
    to: '+918574677149',  // Text this number
    from: '+13092710156' // From a valid Twilio number
}).then((message) => console.log(message.sid));
	res
		.status(200)
		.json("message sent");
}
else{
	res.status(500).json("something went wrong");
}
};
//
