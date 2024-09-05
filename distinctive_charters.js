// JavaScript Document
alert("js is attached gangg")
// Airtable stuff - appL3oA7I7nOX3bfD
// Airtable token - patxNxYkDY7srtvjJ.41c075fe1be034bd2cc8a3263f8b757cbb59634798d68b161a0115383e34eab0
function boatHireDate() {
	var totalCost = 0;
	alert("charter reservation function");
	var boatHireDate = document.getElementById("boatHireDate").value;
	alert(boatHireDate);
	var boatHireLength = document.getElementById("boatHireLength").value;
	alert(boatHireLength);
	var timeSelect = this.dataset.value;
	alert(timeSelect);
	if (document.getElementById("boatHireDate").validity.valueMissing) {
		alert("date not selected");
		document.getElementById("boatHireDate").scrollIntoView();
		document.getElementById("dateError").innerHTML = "Please enter in a date";
		return;
	}
	if (document.getElementById("boatHireLength").validity.rangeUnderflow || document.getElementById("boatHireLength").validity.rangeOverflow || document.getElementById("boatHireLength").validity.valueMissing) {
		alert("Please select number of nights");
		document.getElementById("boatHireLength").scrollIntoView();
		document.getElementById("boatHireLengthError").innerHTML = "Please enter in a valid number of hours for hire";
		return;
	}
	if (timeSelect == null) {
		alert("time not selected");
		document.getElementById("timeSelect").scrollIntoView();
		timeError.innerHTML = "Please select a time to continue";
		return;
	}
	var boatHirePrice = 680;
	var priceForHire = (boatHirePrice * boatHireLength);
	totalCost += Number(priceForHire);
	extraOptions = [];
	var addExtras = document.getElementsByClassName("extrasCheckbox");
	var extrasCost = 0;
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
	totalCost = Number(priceForHire + extrasCost);
	alert("total cost" + totalCost);
	document.getElementById("dateOutput").scrollIntoView();
	outputSummary(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost);
}

function outputSummary(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost) {
	alert("Push data function");
	alert(timeSelect);
	document.getElementById("dateOutput").innerHTML = boatHireDate;
	document.getElementById("hireLengthOutput").innerHTML = boatHireLength;
	document.getElementById("sailTimeOutput").innerHTML = timeSelect;
	document.getElementById("priceOutput").innerHTML = "$" + priceForHire;
	document.getElementById("extrasOutput").innerHTML = "$" + extrasCost;
	document.getElementById("totalCostOutput").innerHTML = "$" + totalCost;
	checkDetails(boatHireDate, boatHireLength, timeSelect, priceForHire, extrasCost, totalCost)
}

function checkPattern(input, output, errorMessage) {
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
		//alert("purpose in Checkdetails: " + purpose);
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

function pushData(firstNameInput, lastNameInput, boatHireDate, boatHireLength, extraOptions, timeSelect, priceForHire, extrasCost, totalCost) {
	alert("At the confirm function");
	console.log("myFunction fired.");
	console.log("Getting Values....");
	console.log("Initialing Airtable API....");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'patxNxYkDY7srtvjJ.41c075fe1be034bd2cc8a3263f8b757cbb59634798d68b161a0115383e34eab0' }).base('appL3oA7I7nOX3bfD');
	console.log("Creating a record....");
	base('Reservations').create({
			"First Name": firstNameInput,
			"Last Name": lastNameInput,
			"Drivers License": "AB123456",
			"Age": "131",
			"Cellphone": "911",
			"Email": "lol@mail.com",
			"Comments": "yes",
			"Hire Date": boatHireDate,
			"Cruise Purpose": "FuN",
			"Hire Length": boatHireLength,
			"Number of Guests": "22 billion",
			"Extras": extraOptions,
			"Time of Hire": timeSelect,
			"Price For Hire": priceForHire,
			"Extras Cost": extrasCost,
			"Total Cost": totalCost
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