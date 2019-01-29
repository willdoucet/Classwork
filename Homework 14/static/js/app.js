console.log("tssest")
// from data.js
var tableData = data;

// YOUR CODE HERE!
var table_body = d3.select("tbody");

tableData.forEach((sightings) => {
    var row = table_body.append("tr");
    Object.entries(sightings).forEach(([key, value]) =>{
        var cell = table_body.append("td");
        cell.text(value);
    });
});

var filter_button = d3.select("#filter-btn");

filter_button.on("click", function(){

    d3.event.preventDefault();

    var inputElement = d3.select("#search-input").property("value");
    var inputCriteria = d3.select("#criteria-selection").node().value;
    var inputAlert = d3.select("#only-alert")
    console.log(inputElement);
    console.log(inputCriteria);

    if (inputCriteria == "Search Criteria"){
        console.log("invalid");
        inputAlert.text("Select Valid Search Criteria")
        inputAlert.attr("class", "alert alert-dark fade-in");
        
        setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
        }, 1000)
    }else if (inputCriteria == 1){
        if (inputElement === ""){
            console.log("invalid");
            inputAlert.text("Please Enter a Date")
            inputAlert.attr("class", "alert alert-dark fade-in");
        
            setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
            }, 1000)
        }else{


            console.log("date");
            var filteredDate = data.filter(entry => entry.datetime === inputElement);
            console.log(filteredDate)
            r = d3.select("tbody").selectAll("tr");;
            t = d3.select("tbody").selectAll("td");;

            console.log(r);
            r.remove();
            t.remove();

            filteredDate.forEach((sightings) => {
                var row = d3.select("tbody").append("tr");
                Object.entries(sightings).forEach(([key, value]) => {
                    var cell = d3.select("tbody").append("td");
                    cell.text(value);
                    console.log(value);
                })
            })
        }
    }else if (inputCriteria == 2){
        if (inputElement === ""){
            console.log("invalid");
            inputAlert.text("Please Enter a City")
            inputAlert.attr("class", "alert alert-dark fade-in");
        
            setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
            }, 1000)
        }else {
            console.log("city");
            var filteredCity = data.filter(entry => entry.city === inputElement);
            console.log(filteredCity)
            r = d3.select("tbody").selectAll("tr");;
            t = d3.select("tbody").selectAll("td");;

            console.log(r);
            r.remove();
            t.remove();

            filteredCity.forEach((sightings) => {
                var row = d3.select("tbody").append("tr");
                Object.entries(sightings).forEach(([key, value]) => {
                    var cell = d3.select("tbody").append("td");
                    cell.text(value);
                    console.log(value);
                })
            })
        }
    }else if (inputCriteria == 3) {
        if (inputElement === ""){
            console.log("invalid");
            inputAlert.text("Please Enter a State")
            inputAlert.attr("class", "alert alert-dark fade-in");
        
            setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
            }, 1000)
        }else {
            console.log("state");
            var filteredState = data.filter(entry => entry.state === inputElement);
            console.log(filteredState)
            r = d3.select("tbody").selectAll("tr");;
            t = d3.select("tbody").selectAll("td");;

            console.log(r);
            r.remove();
            t.remove();

            filteredState.forEach((sightings) => {
                var row = d3.select("tbody").append("tr");
                Object.entries(sightings).forEach(([key, value]) => {
                    var cell = d3.select("tbody").append("td");
                    cell.text(value);
                    console.log(value);
                })
            })
        }
    }else if (inputCriteria == 4) {
        if (inputElement === ""){
            console.log("invalid");
            inputAlert.text("Please Enter a Country")
            inputAlert.attr("class", "alert alert-dark fade-in");
        
            setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
            }, 1000)
        }else {
            console.log("country");
            var filteredCountry = data.filter(entry => entry.country === inputElement);
            console.log(filteredCountry)
            r = d3.select("tbody").selectAll("tr");;
            t = d3.select("tbody").selectAll("td");;

            console.log(r);
            r.remove();
            t.remove();

            filteredCountry.forEach((sightings) => {
                var row = d3.select("tbody").append("tr");
                Object.entries(sightings).forEach(([key, value]) => {
                    var cell = d3.select("tbody").append("td");
                    cell.text(value);
                    console.log(value);
                })
            })
        }
    }else if (inputCriteria == 5) {
        if (inputElement === ""){
            console.log("invalid");
            inputAlert.text("Please Enter a Shape")
            inputAlert.attr("class", "alert alert-dark fade-in");
        
            setTimeout(function(){
            inputAlert.attr("class", "alert alert-dark fade");
            }, 1000)
        }else {
            console.log("shape");
            var filteredShape = data.filter(entry => entry.shape === inputElement);
            console.log(filteredShape)
            r = d3.select("tbody").selectAll("tr");;
            t = d3.select("tbody").selectAll("td");;

            console.log(r);
            r.remove();
            t.remove();

            filteredShape.forEach((sightings) => {
                var row = d3.select("tbody").append("tr");
                Object.entries(sightings).forEach(([key, value]) => {
                    var cell = d3.select("tbody").append("td");
                    cell.text(value);
                    console.log(value);
                })
            })
        }
    }
})