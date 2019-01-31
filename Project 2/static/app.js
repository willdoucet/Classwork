console.log("asdfttz")
var lfa_data = lfa_data
var lfg_data = lfg_data
var un_data = un_data
var wage_data = wage_data
var job_data = job_data

var total_data = [lfa_data, lfg_data, un_data, wage_data, job_data]
var collapseIDs = ["collapseOne", "collapseTwo", "collapseThree", "collapseFour", "collapseFive"]
var headerIDs = ["headingOne", "headingTwo", "headingThree", "headingFour", "headingFive"]
var buttonIDs = ["buttonOne", "buttonTwo", "buttonThree", "buttonFour", "buttonFive"]
var targetIDs = ["#collapseOne", "#collapseTwo", "#collapseThree", "#collapseFour", "#collapseFive"]
var titles = ["Labor Force Data by Age", "Labor Force Data by Gender", "Unemployment Data by Level of Education",
                "Wage - Salary and Benefits Data", "Job Vacancy vs. Hires Data"]


var eventHandler = function(event) {
    width = window.innerWidth;
    console.log(width);
    if (width < 993 ) {
        d3.select('#viz-list').attr('class', 'nav-item dropdown');
        d3.select('#viz-link').attr('class', 'nav-link dropdown-toggle');
        d3.select('#viz-link').attr('data-toggle', 'dropdown');
        d3.select('#viz-link').attr('href', '#')

        d3.select('#data-list').attr('class', 'nav-item dropdown');
        d3.select('#data-link').attr('class', 'nav-link dropdown-toggle');
        d3.select('#data-link').attr('data-toggle', 'dropdown');
        d3.select('#data-link').attr('href', '#')
        console.log("small");
    }else {
            d3.select('#viz-list').attr('class', 'nav-item');
            d3.select('#viz-link').attr('class', 'nav-link');
            d3.select('#viz-link').attr('data-toggle', '');
            d3.select('#viz-link').attr('href', "/visualizations")

            d3.select('#data-list').attr('class', 'nav-item');
            d3.select('#data-link').attr('class', 'nav-link');
            d3.select('#data-link').attr('data-toggle', '');
            d3.select('#data-link').attr('href', "/data_page")
            console.log('big')
        }
};
window.addEventListener('resize', eventHandler, false);
window.addEventListener('load', eventHandler, false);


var datapageHandler = function(event) {
    console.log("yay!")
    var i = 0;
    var dataPage = d3.select("#datapage");
    if (typeof d3.select("#datapage").nodes()[0] !== 'undefined'){
        var dataAccordion = dataPage.append("div");
        dataAccordion.attr("id", "accordion");

        total_data.forEach((table) => {
        
            /*console.log("yabba dabba doo")*/
            

            var dataCard = dataAccordion.append("div");
            dataCard.attr("class", "card");

            var dataCardHeader = dataCard.append("div");
            dataCardHeader.attr("class", "card-header");
            dataCardHeader.attr("id", headerIDs[i]);

            var dataH5 = dataCardHeader.append("h5");
            dataH5.attr("class, mb-0");

            var dataButton = dataH5.append("button");
            dataButton.attr("class", "btn btn-link collapsed");
            dataButton.attr("id", buttonIDs[i]);
            dataButton.attr("data-toggle", "collapse");
            dataButton.attr("data-target", targetIDs[i]);
            dataButton.text(titles[i]);

            var dataMain = dataCard.append("div");
            dataMain.attr("id", collapseIDs[i]);
            dataMain.attr("class", "collapse");
            dataMain.attr("data-parent", "#accordion");

            var dataBody = dataMain.append("div");
            dataBody.attr("class", "card-body");



            var dataTable = dataBody.append("table");
            dataTable.attr("class", "table table-striped");
            var dataHead = dataTable.append("thead");
            var dataRow = dataHead.append("tr");

            Object.entries(table[0]).forEach(([key, value]) => {
                var tableCol = dataRow.append("th")
                tableCol.attr("scope", "col");
                tableCol.text(key);
                tableCol.style("font-size", ".7rem");

            })
            var dataBody = dataTable.append("tbody");
            table.forEach((entry) => {
                /*console.log(entry)*/
                var dataRow = dataBody.append("tr");
                Object.entries(entry).forEach(([key, value]) => {
                    if (key == "DATE") {
                        tableCell = dataRow.append("td");
                        tableCell.text(value);
                    }else{
                    tableCell = dataRow.append("td");
                    tableCell.style("text-align", "center");
                    tableCell.text(value + "%");
                    }
                });

            })
        i += 1;
        })
        
    }
}
var dataButtonHandler = function(){
    var lfa_button = d3.select("#lf_a");
    console.log(lfa_button);
    lfa_button.on("click", function() {
        /*d3.event.preventDefault();*/
        console.log("clicked");
        console.log("this");

        var lfa_div = d3.select("#collapseOne");
        console.log("sdf" + lfa_div)
        lfa_div.classed("show", true)
    });

    var lfg_button = d3.select("#lf_g")
    lfg_button.on("click", function(){
        var lfg_div = d3.select("#collapseTwo");
        lfg_div.classed("show", true);

        var scrollheight = lfg_div.property("scrollHeight");
        console.log(scrollheight);


    });
};


window.addEventListener('load', datapageHandler, false)
window.addEventListener('load', dataButtonHandler, false)