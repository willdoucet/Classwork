//svg area
function init() {
    var $container = $('#scatter')
        
    var svgWidth = $container.width();
    var svgHeight = $container.height();

    console.log(svgWidth);
    console.log(svgHeight);
    console.log(Math.min(svgWidth, svgHeight));
    console.log($('#scatter').height())
    //margins
    var margin = {
        top: 100,
        right: 40,
        bottom: 100,
        left: 120
    };

    //chart area
    var chartWidth = svgWidth - margin.left - margin.right;
    var chartHeight = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','375 400 '+svgWidth +' '+svgHeight )
        .attr('preserveAspectRatio','xMinYMin')


    var chartGroup = svg.append("g")
        /*.attr("transform", `translate(${margin.left}, ${margin.top})`);*/
        .attr("transform", "translate(" + Math.min(svgWidth,svgHeight) / 2 + "," + Math.min(svgWidth,svgHeight) / 2 + ")");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 70)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "yAxisText")
    .attr("font-family", "Segoe UI Light")
    .attr("font-size", "1.2em")
    .attr("data-value", "poverty")
    .style("opacity", 0.6)
    .style("cursor", "default")
    .text("In Poverty (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "yAxisText")
    .attr("font-family", "Segoe UI Light")
    .attr("font-size", "1.2em")
    .attr("data-value", "smokes")
    .style("opacity", 0.6)
    .style("cursor", "default")
    .text("Smokes (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 30)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "yAxisText")
    .attr("font-family", "Segoe UI Light")
    .attr("font-size", "1.2em")
    .attr("data-value", "obesity")
    .style("opacity", 0.6)
    .style("cursor", "default")
    .text("Obese (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 10})`)
      .attr("class", "xAxisText")
      .attr("font-family", "Segoe UI Light")
      .attr("font-size", "1.2em")
      .attr("data-value", "age")
      .style("opacity", 0.6)
      .style("cursor", "default")
      .text("Median Age");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 30})`)
      .attr("class", "xAxisText")
      .attr("font-family", "Segoe UI Light")
      .attr("font-size", "1.2em")
      .attr("data-value", "income")
      .style("opacity", 0.6)
      .style("cursor", "default")
      .text("Median Household Income");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 50})`)
      .attr("class", "xAxisText")
      .attr("font-family", "Segoe UI Light")
      .attr("font-size", "1.2em")
      .attr("data-value", "healthcare")
      .style("opacity", 0.6)
      .style("cursor", "default")
      .text("Lacking Healthcare (%)");

    

    d3.csv("assets/data/data.csv").then((data) => {
        var xName = "age";
        var yName = "poverty";
        data.forEach((row) => {
            
            row.poverty = +row.poverty;
            row.age = +row.age;
            row.obesity = +row.obesity;
            row.smokes = +row.smokes;
            row.income = +row.income;
            row.healthcare = +row.healthcare;
        })
        function buildGraph(xData, yData) {
            var xAdjust = 1/40
            var xScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[xData]) - (d3.min(data, d=> d[xData]) * xAdjust) - 1,
                d3.max(data, d => d[xData]) + (d3.max(data, d=> d[xData]) * xAdjust) + 1])
            .range([0, chartWidth]);

            var yScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[yData]) - 1, d3.max(data, d=> d[yData]) + 1])
            .range([chartHeight, 0]);

            var botAxis = d3.axisBottom(xScale);
            var leftAxis = d3.axisLeft(yScale);

            chartGroup.append("g")
            .attr("id", "x-axis")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(botAxis);
            chartGroup.append("g")
            .attr("id", "y-axis")
            .call(leftAxis);

            var circleGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[xData]))
            .attr("cy", d => yScale(d[yData]))
            .attr("r", "20")
            .attr("fill", "rgb(124, 144, 175)")
            .attr("opacity", ".6");

            var circleText = chartGroup.selectAll("#circle-text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", d => xScale(d[xData]))
            .attr("y", d => yScale(d[yData]))
            .text(d => d["abbr"])
            .attr("id", "circle-text")
            .attr("font-family", "'Roboto', sans-serif")
            .attr("font-size", ".8em")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr("dy", "5px")
            .attr("text-anchor", "middle")
            .style("padding-top", "10px")
            .style("cursor", "default");


            d3.select(`[data-value = ${yData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select(`[data-value = ${xData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select("#scatter")
            .style("height", "100%")

            var toolTip = d3.tip()
                .attr("class", "tooltip")
                .html(function(d) {

                    return (`<strong>${d["state"]}</strong><br>${yName}: ${d[yName]}<br>${xName}: ${d[xName]}`);
                })
            chartGroup.call(toolTip);

            circleGroup.on("mouseover", function(d) {

                toolTip
                .offset([-10, 0])
                .show(d, this);
                console.log(d[xData])
                console.log(xData)
                console.log(xName)
                console.log(d[xName])
            })
            .on("mouseout", function(d) {

                toolTip.hide(d);
            })

            circleText.on("mouseover", function(d) {

                d3.select(this).style("cursor", "default")

                toolTip
                .offset([-22.5,0])

                .show(d, this);
                console.log(d[xData])
                console.log(xData)
                console.log(xName)
                console.log(d[xName])
            })
            .on("mouseout", function(d) {

                toolTip.hide(d);
            })
        

        }
        function transitionGraph(xData, yData) {
            var xAdjust = 1/40
            console.log(xData)
            var xScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[xData]) - (d3.min(data, d=> d[xData]) * xAdjust) - 1,
                d3.max(data, d => d[xData]) + (d3.max(data, d=> d[xData]) * xAdjust) + 1])
            .range([0, chartWidth]);

            var yScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[yData]) -1, d3.max(data, d=> d[yData]) + 1])
            .range([chartHeight, 0]);

            var botAxis = d3.axisBottom(xScale);
            var leftAxis = d3.axisLeft(yScale);

            d3.select("#x-axis")
            .transition()
            .call(botAxis);

            d3.select("#y-axis")
            .transition()
            .call(leftAxis);

            chartGroup.selectAll("circle")
            .transition()
            .duration(1000)
            .attr("cx", d => xScale(d[xData]))
            .attr("cy", d => yScale(d[yData]));

            d3.selectAll("#circle-text")
            .transition()
            .duration(1000)
            .attr("x", d => xScale(d[xData]))
            .attr("y", d => yScale(d[yData]))

            d3.select(`[data-value = ${yData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select(`[data-value = ${xData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

        }
        yLabelGroup = d3.selectAll(".yAxisText")

        yLabelGroup.on("mouseover", function() {
            d3.select(this).style("cursor", "default")

            if (d3.select(this).attr("data-value") != yName ) {
                d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 1.0);
            }
        });
        yLabelGroup.on("mouseout", function() {
            if (d3.select(this).attr("data-value") != yName ) {
                d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 0.6);
            }
        });
        yLabelGroup.on("click", function() {
            d3.selectAll(".yAxisText")
            .style("opacity", 0.6)
            .style("font-weight", "normal");

            yName = d3.select(this).attr("data-value");
            console.log(yName);
            transitionGraph(xName, yName);
        });

        xLabelGroup = d3.selectAll(".xAxisText");

        xLabelGroup.on("mouseover", function() {

            d3.select(this).style("cursor", "default")

            if (d3.select(this).attr("data-value") != xName ) {
                d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 1.0);
            }
        });
        xLabelGroup.on("mouseout", function() {
            if (d3.select(this).attr("data-value") != xName ) {
                d3.select(this)
                .transition()
                .duration(500)
                .style("opacity", 0.6);
            }
        });
        xLabelGroup.on("click", function() {
            d3.selectAll(".xAxisText")
            .style("opacity", 0.6)
            .style("font-weight", "normal");

            xName = d3.select(this).attr("data-value");
            console.log(xName);
            transitionGraph(xName, yName);
        });


        
    buildGraph(xName, yName);



    });

    

}
window.addEventListener('load', init, false);
