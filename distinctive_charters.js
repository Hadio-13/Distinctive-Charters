// JavaScript Document
alert("js is attached gangg")

// Airtable stuff - appL3oA7I7nOX3bfD
// Airtable token - patxNxYkDY7srtvjJ.a89775867949db56ade3c4537ce3d791813c4299fed84c1c9795c3bfd807056b

function boatHireDate(){
	var totalCost=0;
	alert("charter reservation function");
	
	var boatHireDate=document.getElementById("boatHireDate").value;
	alert(boatHireDate);
	var boatHireLength=document.getElementById("boatHireLength").value;
	alert(boatHireLength);
	var timeSelect=this.dataset.value;
	alert(timeSelect);
	
	if(document.getElementById("boatHireDate").validity.valueMissing){
		alert("date not selected");
		document.getElementById("boatHireDate").scrollIntoView();
		document.getElementById("dateError").innerHTML = "Please enter in a date";
		return;
	}
	
	if(document.getElementById("boatHireLength").validity.rangeUnderflow ||
	document.getElementById("boatHireLength").validity.rangeOverflow ||
	document.getElementById("boatHireLength").validity.valueMissing) {
		alert("Please select number of nights");
		document.getElementById("boatHireLength").scrollIntoView();
		document.getElementById("boatHireLengthError").innerHTML = "Please enter in a valid number of hours for hire";
		return;
	}
		
	if(roomSelect==null){
		alert("time not selected");
		document.getElementById("timeSelect").scrollIntoView();
		roomError.innerHTML="Please select a time to continue";
		return;
	}

		
	var priceForHire=this.dataset.price;
	alert(priceForHire);
	totalCost+=Number(boatHireLength);
	extraOptions=[];
	var addExtras=document.getElementsByClassName("extrasCheckbox");
	var extrasCost=0;
	for(i=0; i<addExtras.length; i++){
		if(addExtras[i].type=="checkbox"){
			if(addExtras[i].checked){
				extraOptions.push(addExtras[i].value);
				extrasCost+=Number(addExtras[i].dataset.price);
				alert(extraOptions);
				alert(extrasCost);
			}
		}
	}
	totalCost=Number(priceForHire+extrasCost);
	alert("total cost" + totalCost);
	document.getElementById("dateOutput").scrollIntoView();
	//outputSummary();
}

function pushData() {
	alert("At the confirm function");
    console.log("myFunction fired.");
    console.log("Getting Values....");
    console.log("Initialing Airtable API....");
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'patxNxYkDY7srtvjJ.a89775867949db56ade3c4537ce3d791813c4299fed84c1c9795c3bfd807056b'}).base('appL3oA7I7nOX3bfD');

    console.log("Creating a record....");
    base('Reservations').create(
    {
        "First Name": "First name test push"
		
		
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
