// create chart
function createChart(id) {
    d3.json("samples.json").then(function(data) {
        // console.log(data);
        var samples = data.samples
        var filteredData = samples.filter(sample => {

            return id == sample.id

        });
        var filteredID = filteredData[0];
        // console.log(filteredID);
        // variables for createChart function
        var sample_values = filteredID.sample_values;
        var otu_ids = filteredID.otu_ids;
        var otu_labels = filteredID.otu_labels;
        
        // create the horizontal bar chart to show top 10 OTUs found in individual
        var trace1 = {
            type: "bar",
            x: sample_values,
            y: otu_ids,
            orientation: 'h'
        };

        //create the bubble chart that displays each sample
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids
            }
        };

        // create layouts for plots
        // bar chart layout
        var layout1 = {
            title: "Top 10 OTU's",
            xaxis: { title: "Number of OTU's"},
            yaxis: { title: "OTU Types"}
        };

        // bubble chart layout
        var layout2 = {
            title: "Amount of OTU's in Sample",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Number of OTU's"}
        }

      
        Plotly.newPlot("bar", [trace1], layout1);
        Plotly.newPlot("bubble", [trace2], layout2);
    });

};

// Use the D3 library to read in `samples.json`.
function init() {
    var dropdown = d3.select("#selDataset");

    // console.log(dropdown);
    // console.log(metadata);

    d3.json("samples.json").then(function(data) {
        var names = data.names;
        names.forEach(name => {
            // console.log(name);
            dropdown.append("option").text(name).property("value", name);
        });
        // console.log(names);
        // console.log(data);
        var initName = names[0];
        displayMetadata(initName);
        // console.log(initName);
        createChart(initName);
    });
};

function displayMetadata(id) {
    var metadata = d3.select("#sample-metadata");

    d3.json("samples.json").then(function(data) {
        var samples = data.metadata;
        var filteredData = samples.filter(sample => {
            // console.log(sample.id);
            // console.log(id);

            return id == sample.id


        });
        // console.log(filteredData);
        metadata.html("");

        var filteredID = filteredData[0];
        // console.log("sample", sample);
        Object.entries(filteredID).forEach(stat => {
            // console.log(stat);
            metadata.append("p").text(stat[0] + " " + stat[1]);
        });

    });
}

function optionChanged(id) {
    // console.log(id);
    displayMetadata(id);
    createChart(id);

};

init();