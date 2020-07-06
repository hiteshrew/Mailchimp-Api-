const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("assets"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , (req,res) => {

	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) => {

	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var email = req.body.email;

	// console.log(firstName + "\n" + lastName + "\n" + email);

	var data = {
		members :
		[
		{
			email_address : email,
			status : "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
			}
		},
		]
	}

	var jsonData = JSON.stringify(data);
	const url = "https://us19.api.mailchimp.com/3.0/lists/9f38463f87"
	const options = {
		method: "POST",
		auth: "SugarDaddy:8e7b9e3c56a878d4abc5d4489c248452-us19"
	}

	const request = https.request(url,options,(response) => {

		//console.log(response);
		if(response.statusCode == 200)
		{
			res.sendFile(__dirname + "/success.html");
		}
		else if (response.statusCode != 200)
		{
			res.sendFile(__dirname + "/failure.html")
		}
	
	});

	request.write(jsonData);
	request.end();
});

app.listen(process.env.PORT || 3000, () => {
	console.log("App is running on port 3000 :) ")
}) 

//MailChimp API Key :- 8e7b9e3c56a878d4abc5d4489c248452-us19

//Audience id :- 9f38463f87

