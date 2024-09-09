// JavaScript Document
alert("js is attached gangg")
// Airtable stuff - appL3oA7I7nOX3bfD
// Airtable token - patxNxYkDY7srtvjJ.41c075fe1be034bd2cc8a3263f8b757cbb59634798d68b161a0115383e34eab0
function boatHireDate() { //Creating function for the date of the boat hire
	var totalCost = 0; // creating variable for the total cost before any choices
	alert("charter reservation function");
	var boatHireDate = document.getElementById("boatHireDate").value; //creating variable for boat hire date
	alert(boatHireDate); //calling boat hire date
	var boatHireLength = document.getElementById("boatHireLength").value; //creating variable for boat hire length
	alert(boatHireLength); // calling variable
	var timeSelect = this.dataset.value; //creating variable for time select
	alert(timeSelect); //calling variable
	if (document.getElementById("boatHireDate").validity.valueMissing) { //checking to see that a boat hire date has been entered
		alert("date not selected"); //alert if no date has been selected
		document.getElementById("boatHireDate").scrollIntoView(); //scrolls the user to the boat hire date
		document.getElementById("dateError").innerHTML = "Please enter in a date"; //message on the page to show user they have not entered a valid date
		return;
	}
	if (document.getElementById("boatHireLength").validity.rangeUnderflow || document.getElementById("boatHireLength").validity.rangeOverflow || document.getElementById("boatHireLength").validity.valueMissing) { //checking that the boat hire date is within a specific timeline
		alert("Please select boat hire length"); //tells user to enter a valid boat hire length
		document.getElementById("boatHireLength").scrollIntoView(); //scrolls user to boat hire length
		document.getElementById("boatHireLengthError").innerHTML = "Please enter in a valid number of hours for hire"; //message on thw webpage to tell user to enter a valid boat hire length
		return;
	}
	if (timeSelect == null) { //checking that a time has been selected
		alert("time not selected"); //tells user time has not been selected
		document.getElementById("timeSelect").scrollIntoView(); //scrolls user to the time select
		timeError.innerHTML = "Please select a time to continue"; //message on the webpage
		return;
	}
	var boatHirePrice = 680; //creating variable for boat hire price
	var priceForHire = (boatHirePrice * boatHireLength); ////creating variable for  price for hire
	totalCost += Number(priceForHire); //calling the total cost of the boat hire
	extraOptions = []; //extras
	var addExtras = document.getElementsByClassName("extrasCheckbox"); //checking which extras boxes have been checked
	var extrasCost = 0; //begining extras cost
	for (i = 0; i < addExtras.length; i++) {
		if (addExtras[i].type == "checkbox") {
			if (addExtras[i].checked) {
				extraOptions.push(addExtras[i].value);
				extrasCost += Number(addExtras[i].dataset.price);
				alert(extraOptions);
				alert(extrasCost);
			}
		}
	}
	totalCost = Number(priceForHire + extrasCost); //total cost accounting for boat hire and extras
	alert("total cost" + totalCost); //alerts the total
	document.getElementById("dateOutput").scrollIntoView(); //scrolls to the date output
	outputSummary(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost); //variables that will be outputted
}

function outputSummary(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost) { //creating function for the output
	alert("Push data function"); //alert
	alert(timeSelect); //alerts time selected
	document.getElementById("dateOutput").innerHTML = boatHireDate; //alerts variable
	document.getElementById("hireLengthOutput").innerHTML = boatHireLength; //alerts variable
	document.getElementById("sailTimeOutput").innerHTML = timeSelect; //alerts variable
	document.getElementById("priceOutput").innerHTML = "$" + priceForHire; //alerts variable
	document.getElementById("extrasOutput").innerHTML = "$" + extrasCost; //alerts variable
	document.getElementById("totalCostOutput").innerHTML = "$" + totalCost; //alerts variable
	checkDetails(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost)
}

function checkPattern(input, output, errorMessage) { //function to check that inputs are valid
	alert("check pattern function");
	if (input.validity.patternMismatch || input.validity.valueMissing) {
		alert("incorrect name");
		output.innerHTML = errorMessage;
		return false;
	} else {
		alert("correct name");
		output.innerHTML = "";
		return true;
	}
}
function checkDetails(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost) {
	alert("In CheckDetails");
	if (termsAndConditions.checked) {
		alert("Terms checked");
		alert("Total in CheckDetails: " + totalCost);
		alert("purpose in Checkdetails: " + purpose);
		var firstName = checkPattern(firstNameInput, errorFirstName, "Please enter a valid first name");
		if (firstName == true) {
			alert("first name has been checked and recieved by checkdetails");
			var firstNameAlert = document.getElementById("firstNameInput").value;
			alert("checked first name: " + firstNameAlert);
		}
		var lastName = checkPattern(lastNameInput, errorLastName, "Please enter a valid last name");
		if (lastName == true) {
			alert("last name has been checked and recieved by checkdetails");
			var lastNameAlert = document.getElementById("lastNameInput").value;
			alert("checked last name: " + lastNameAlert);
		}
		pushData(firstNameInput, lastNameInput, boatHireDate, boatHireLength, extraOptions, timeSelect, priceForHire, extrasCost, totalCost);
	} else {
		alert("Not checked");
		return;
	}
}

function pushData(firstNameInput, lastNameInput, boatHireDate, boatHireLength, extraOptions, timeSelect, priceForHire, extrasCost, totalCost) { //function for pushing info to airtable
	alert(firstNameInput);
	alert("At the confirm function");
	console.log("myFunction fired.");
	console.log("Getting Values....");
	console.log("Initialing Airtable API....");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'patxNxYkDY7srtvjJ.41c075fe1be034bd2cc8a3263f8b757cbb59634798d68b161a0115383e34eab0' }).base('appL3oA7I7nOX3bfD');
	console.log("Creating a record....");
	base('Reservations').create({
			"First Name": firstNameInput, //variable getting pushed to airtable
			"Last Name": lastNameInput, //variable getting pushed to airtable
			"Drivers License": "AB123456", //variable getting pushed to airtable
			"Age": "131", //variable getting pushed to airtable
			"Cellphone": "911", //variable getting pushed to airtable
			"Email": "lol@mail.com", //variable getting pushed to airtable
			"Comments": "yes", //variable getting pushed to airtable
			"Hire Date": boatHireDate, //variable getting pushed to airtable
			"Cruise Purpose": "FuN", //variable getting pushed to airtable
			"Hire Length": boatHireLength, //variable getting pushed to airtable
			"Number of Guests": "22 billion", //variable getting pushed to airtable
			"Extras": extraOptions, //variable getting pushed to airtable
			"Time of Hire": timeSelect, //variable getting pushed to airtable
			"Price For Hire": priceForHire, //variable getting pushed to airtable
			"Extras Cost": extrasCost, //variable getting pushed to airtable
			"Total Cost": totalCost //variable getting pushed to airtable
		}, {
			typecast: true
		}, //gets the API to convert types instead of parsing everything as strings.
		function(err, record) {
			if (err) {
				console.error(err);
				return;
			}
			alert("record created");
			console.log("Record created: " + record.getId());
		});
} //closes off the pushdata function
//creating variables to check the date select is only a present date 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd;
}
if (mm < 10) {
	mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("boatHireDate").setAttribute("min", today); //sets the minimum date of checkInInput to the current date
var tiles = document.getElementsByClassName("time_card");
for (var i = 0; i < tiles.length; i++) {
	tiles[i].addEventListener("click", boatHireDate);
}