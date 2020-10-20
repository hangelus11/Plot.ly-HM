let metadata;
let names;
var samples;


d3.select(window).on("load", get_data);

async function get_data() {
  await d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    names = data.names;
    samples = data.samples;
  });
  fill_option();
}

async function fill_option() {
  options = d3.select("#selDataset")
  await names.map(function (op) {
    options.append("option").property("value", op).text(op);
  });
}

function optionChanged(option) {
  charts(option);
}

function charts(option) {
  var dataFind = samples.find(function (data) {
    return data.id == option
  })
  var otu_ids = dataFind.otu_ids;
  var otu_labels = dataFind.otu_labels;
  var sample_values = dataFind.sample_values;
  var y=[]

  for(let i=0; i<10; i++){
    y.push("ID "+otu_ids[i])
  }

  var yticks = y
  var data = [
    {
      y: yticks,
      x: sample_values.slice(0, 10),
      text: otu_labels.slice(0, 10),
      type: "bar",
      orientation: "h",
    }
  ];

  var config = {
    title: "Bacteria Relation",
    xaxis: { title: "Bacteria" },
    yaxis : {title:"OTU"}

  };

  Plotly.newPlot("bar", data, config);

  
  var config = {
    title: "Bacteria",
    // xaxis: { title: "ID" },
    hovermode: "closest",
    dragmode:"zoom",
  };

  var dataS = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }
  ];

  Plotly.newPlot("bubble", dataS, config);

insertData(option)

}

function insertData (option){

  var meta = metadata.find(function (data) {
    return data.id == option
  })
  
  dataMeta = d3.select("#sample-metadata")
  dataMeta.html("")

  for (const [key, value] of Object.entries(meta)) {
    dataMeta.append("p").text(key + ":" +value);
    console.log(key, value);
  }

console.log(meta)
  
}
