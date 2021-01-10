// create chart
function createChart(id) {
    d3.json("samples.json").then(function(data) {
        // variables for createChart function
        var names = data.names;
        var sample_values = data.sample_values;
        var otu_ids = data.otu_ids;
        var otu_labels = data.otu_labels;
        
        // create the horizontal bar chart
        var trace1 = {
            type: "bar",
            name: names,
            x: [sample_values],
            y: [otu_ids],
            orientation: 'h'
        };
      
        Plotly.newPlot("bar", trace1);
    });

};

// Use the D3 library to read in `samples.json`.
function init() {
    var dropdown = d3.select("#selDataset");
    // console.log(dropdown);


    d3.json("samples.json").then(function(data) {
        var names = data.names;
        names.forEach(name => {
            console.log(name);
            dropdown.append("option").text(name).property("value", name);
        });
        console.log(names);
        console.log(data);
        var initName = names[0];

        createChart(initName);
    });
};

init();
