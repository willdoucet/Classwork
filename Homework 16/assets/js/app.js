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
    .attr("data-value", "poverty")
    .style("opacity", 0.6)
    .text("In Poverty (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "yAxisText")
    .attr("data-value", "smokes")
    .style("opacity", 0.6)
    .text("Smokes (%)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 30)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "yAxisText")
    .attr("data-value", "obesity")
    .style("opacity", 0.6)
    .text("Obese (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 10})`)
      .attr("class", "xAxisText")
      .attr("data-value", "age")
      .style("opacity", 0.6)
      .text("Median Age");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 30})`)
      .attr("class", "xAxisText")
      .attr("data-value", "income")
      .style("opacity", 0.6)
      .text("Median Household Income");

    chartGroup.append("text")
      .attr("transform", `translate(${(chartWidth / 2) -45}, ${chartHeight + margin.top - 50})`)
      .attr("class", "xAxisText")
      .attr("data-value", "healthcare")
      .style("opacity", 0.6)
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
            var xScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[xData]) - 1, d3.max(data, d => d[xData]) + 1])
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
            .attr("r", "15")
            .attr("fill", "lightblue")
            .attr("opacity", ".6");

            var circleText = chartGroup.selectAll(null)
            .data(data)
            .enter()
            .append("text")
            .attr("x", d => xScale(d[xData]))
            .attr("y", d => yScale(d[yData]) + 5)
            .text(d => d["abbr"])
            .attr("id", "circle-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", ".6em")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("padding-top", "10px");


            d3.select(`[data-value = ${yData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select(`[data-value = ${xData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select("#scatter")
            .style("height", "100%")
        }
        function transitionGraph(xData, yData) {
            var xScale = d3.scaleLinear()
            .domain([d3.min(data, d=> d[xData]) - 1, d3.max(data, d => d[xData]) + 1])
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
            .attr("y", d => yScale(d[yData]) + 5)

            d3.select(`[data-value = ${yData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);

            d3.select(`[data-value = ${xData}]`)
            .style("font-weight", "bold")
            .style("opacity", 1.0);
        }
        yLabelGroup = d3.selectAll(".yAxisText")

        yLabelGroup.on("mouseover", function() {
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
