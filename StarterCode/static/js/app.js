 function unpack(rows, index) {
     return rows.map(function(row) {
     return row[index];
    });
  };


  function dropDownEvents(){
    d3.json("static/samples.json").then((jsondataD)=>{
        let dataDrop = jsondataD.samples;
        dataDrop = dataDrop.map(d=>d.id);
        let dropDownMenu = d3.select("#selDataset");

        dataDrop.forEach(d=>{
            let option = dropDownMenu.append("option");
            option
            .text(`${d}`)
            .attr("value", `${d}`);
        })

    })
  };


  function init(){
    d3.json("static/samples.json").then((jsondata)=>{

        let data = jsondata;
        // the next function will filter the data according to the Id 
        function filterId(d) {
            return parseInt(d.id)== number;
          };

        //extract only the sample data from json  
        let samples = data.samples;
        let number = 958;
        // filter the data to only get the row with the selected id   
        let filterSample = samples.filter(filterId);
        filterSample=filterSample[0];
        let xBarplot = filterSample.otu_ids.slice(0,10).map(d=>`OTU ${d}`).reverse();
        let yBarplot = filterSample.sample_values.slice(0,10).reverse();
        let textBarplot = filterSample.otu_labels.slice(0,10).reverse();

        console.log(yBarplot);
        console.log(xBarplot);
        console.log(textBarplot);
        // Build the bar plot Horizontal   
        let trace1 = {

            x: yBarplot,
            y: xBarplot,
            text: textBarplot,
            type:"bar",
            orientation:"h"
        };


        let config = {responsive: true}

        let plotData=[trace1];

        Plotly.newPlot("bar", plotData,config);

        // Extract the data for the buble chart

        let xBubleChart = filterSample.otu_ids;
        let yBubleChart = filterSample.sample_values;
        let textBubleChart = filterSample.otu_labels;

        //Log the data of the Buble Chart to check it 
        console.log(xBubleChart);
        console.log(yBubleChart);
        console.log(textBubleChart);

        //Bulid the Buble chart

        let trace2 = {
            x: xBubleChart,
            y: yBubleChart,
            text: textBubleChart,
            mode: 'markers',
            marker: {
              color: xBubleChart,
              size: yBubleChart
            }
          };

        let dataBubleChart = [trace2];

        let config2 = {responsive: true};

        Plotly.newPlot('bubble', dataBubleChart,config2);
        
  
        // Find the data for demographics info  
        let metaData = data.metadata;
        let filterMetaData = metaData.filter(filterId);
        filterMetaData= filterMetaData[0];
        
        //log the data to check is the right data 
        console.log(filterMetaData);

        //use d3 to select the demographics data
        let div= d3.select("#sample-metadata");

        //Append the Key and the value for each value 
        Object.entries(filterMetaData).forEach(([key, value]) => {
            //append a new parahraph in the for each loop 
            let paragraph = div.append("p");
            //Replicate the text in the created Paragraph 
            paragraph.text(`${key} : ${value}`)
            console.log(`${key} : ${value}`);

        })



    });
  }




    function dashboardUpdate(){
        let userOption=d3.select("#selDataset").property("value");

        d3.json("static/samples.json").then((jsondata)=>{

            let data = jsondata;
            // the next function will filter the data according to the Id 
            function filterId(d) {
                return parseInt(d.id)== number;
              };
    
            //extract only the sample data from json  
            let samples = data.samples;
            let number = parseInt(userOption);
            // filter the data to only get the row with the selected id   
            let filterSample = samples.filter(filterId);
            filterSample=filterSample[0];
            let xBarplot = filterSample.otu_ids.slice(0,10).map(d=>`OTU ${d}`).reverse();
            let yBarplot = filterSample.sample_values.slice(0,10).reverse();
            let textBarplot = filterSample.otu_labels.slice(0,10).reverse();
    
            console.log(yBarplot);
            console.log(xBarplot);
            console.log(textBarplot);
            // Build the bar plot Horizontal   
            let trace1 = {
    
                x: yBarplot,
                y: xBarplot,
                text: textBarplot,
                type:"bar",
                orientation:"h"
            };
    
    
            let config = {responsive: true}
    
            let plotData=[trace1];
    
            Plotly.newPlot("bar", plotData,config);
    
            // Extract the data for the buble chart
    
            let xBubleChart = filterSample.otu_ids;
            let yBubleChart = filterSample.sample_values;
            let textBubleChart = filterSample.otu_labels;
    
            //Log the data of the Buble Chart to check it 
            console.log(xBubleChart);
            console.log(yBubleChart);
            console.log(textBubleChart);
    
            //Bulid the Buble chart
    
            let trace2 = {
                x: xBubleChart,
                y: yBubleChart,
                text: textBubleChart,
                mode: 'markers',
                marker: {
                  color: xBubleChart,
                  size: yBubleChart
                }
              };
    
            let dataBubleChart = [trace2];
    
            let config2 = {responsive: true};
    
            Plotly.newPlot('bubble', dataBubleChart,config2);
            
      
            // Find the data for demographics info  
            let metaData = data.metadata;
            let filterMetaData = metaData.filter(filterId);
            filterMetaData= filterMetaData[0];
            
            //log the data to check is the right data 
            console.log(filterMetaData);
    
            //use d3 to select the demographics data
            let div= d3.select("#sample-metadata");

            //Clean the previous data

            d3.select("#sample-metadata").selectAll("p").text("")

    
    
            //Append the Key and the value for each value 
            Object.entries(filterMetaData).forEach(([key, value]) => {
                //append a new parahraph in the for each loop 
                let paragraph = div.append("p");
                //Replicate the text in the created Paragraph 
                paragraph.text(`${key} : ${value}`)
                console.log(`${key} : ${value}`);
    
            })
    
    
    
        });
    }



dropDownEvents();
init();
d3.selectAll("#selDataset").on("change", dashboardUpdate);