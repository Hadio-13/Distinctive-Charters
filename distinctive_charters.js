// JavaScript Document
alert("js is attached gangg")

function pushData() {
	alert("At the confirm function");
    console.log("myFunction fired.");
    console.log("Getting Values....");
    console.log("Initialing Airtable API....");
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: ''}).base('');

    console.log("Creating a record....");
    base('Reservations').create(
    {
        "First Name": "First name test push",
		
		
    }, {typecast: true}, //gets the API to convert types instead of parsing everything as strings.
    function(err,record) {
        if (err) {
            console.error(err);
            return;
        }
    	alert("record created");
        console.log("Record created: " + record.getId());
    });
}//closes off the pushdata function



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
document.getElementById("checkInDate").setAttribute("min", today); //sets the minimum date of checkInInput to the current date
