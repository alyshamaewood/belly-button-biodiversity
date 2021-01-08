// create chart
function createChart(id) {
    d3.json("samples.json").then(function(data) {

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

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.