function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = ("/metadata/" + sample)
  var metadata_card = d3.select("#sample-metadata")
  d3.select("#meta-content").remove()
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then((info) => {
    metadata_list = metadata_card.append("ul").attr("class", "list-group list-group-flush").attr("id", "meta-content")
    Object.entries(info).forEach(([key, value]) => {
      metadata_entry = metadata_list.append("li").attr("class", "list-group-item")
      metadata_entry.append("p").attr("class", "card-text")
        .text(key + ":   " + value)
      /*metadata_entry.append("p")
        .text(value)*/

    })
    /*console.log(info.sample)
    console.log(info.ETHNICITY)*/
  }) 
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  var url = ("/samples/" + sample)
  d3.select("#pie").remove()
  d3.select("#pie-col").append("div").attr("id", "pie")

  d3.select("#bubble").remove()
  d3.select("#bubble-col").append("div").attr("id", "bubble")

  d3.select("#gauge").remove()
  d3.select("#gauge-col").append("div").attr("id", "gauge")

  d3.json(url).then((info) => {
    console.log((info.otu_ids))
    console.log(info.sample_values)
    console.log(info.otu_labels.slice(0,10))
    var trace1 = {
      values: info.sample_values.slice(0,10),
      labels: info.otu_ids.slice(0,10),
      hoverinfo: info.otu_labels.slice(0,10),
      type: "pie"
    }
    var data = [trace1]
    Plotly.plot("pie", data)

    var trace2 = [{
      x: info.otu_ids,
      y: info.sample_values,
      mode: "markers",
      marker: {
        size: info.sample_values,
        color: info.otu_ids,
        showscale: true,
        colorscale: "Jet"
      },
      text: info.otu_labels

    }]

    Plotly.plot("bubble", trace2)

    var meta_url = ("/metadata/" + sample)

    d3.json(meta_url).then((info) => {
      var freq = info.WFREQ
      console.log(freq)
      buildGauge(freq)
    }); 

  });
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
};

function buildGauge(freq) {
  var freqDegrees = freq * 20

  var degrees = 190 - freqDegrees,
   radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  console.log("value is" + freq + "degrees are" +freqDegrees)

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);
  console.log(path)

  var data = [{ type: 'scatter',
     x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'times washed',
    text: freq,
    hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['9', '8', '7', '6', '5',
        '4', '3', '2', '1', ''],
    textinfo: 'text',
    textposition:'inside',    
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
               'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
               'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
               'rgba(39,171,138, .5)', 'rgba(0,143,124, .5)', 'rgba(0,109,113, .5)',
               'rgba(255, 255, 255, 0)']},
    labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '-'],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    title: '<b>Bellybutton Washing Frequency</b> <br> Times Washed Per Week',
    height: 600,
    width: 600,
    xaxis: {zeroline:false, showticklabels:false,
         showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
         showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout, {showSendToCloud:true});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
