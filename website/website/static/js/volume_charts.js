d3.csv("../../Resources/Data/Data tables for SQL/avocado_totalus_data.csv").then(dataset =>{

    // console.log(dataset)
    
    //VOLUME: Extract data to variables. NOTE: exclude 2018 b/c not full year, so total volume isn't comparable----
    var exclude2018 = dataset.filter((entry) => {return entry.Year != 2018})

    var totalVol = exclude2018.map(datum => datum.Total_vol);

    var smallVol = exclude2018.map(datum => datum.Small_vol);
    var largeVol = exclude2018.map(datum => datum.Large_vol);
    var XlVol = exclude2018.map(datum => datum.XLarge_vol);

    var conventional = exclude2018.filter((d) => {return d.Type === "conventional"});
    var organic = exclude2018.filter((d)=>{return d.Type === "organic"});

    var conventionalVol = conventional.map(datum => datum.Total_vol);
    var conVYear = conventional.map(datum => datum.Year);
    var organicVol = organic.map(datum => datum.Total_vol);
    var orgVYear = organic.map(datum => datum.Year);
    
    var yearV = exclude2018.map(datum => datum.Year);

    //VOLUME: set defaults//
    var defaultX = [yearV, "na", "na"];
    var defaultY = "overall";
    var labels = ["overall", "na", "na"];

    volumeBarChart(totalVol, defaultX, labels, defaultY);

    //---VOLUME: Event listener on y buttons--
    d3.selectAll(".volume-y-button").on("click", function(){
        defaultY = this.value;
        console.log("Y Button was clicked. New default:" + defaultY);

    //VOLUME: switch based on y-axis change//
    switch (defaultY){
        default:
            labels = ["overall", "na", "na"];
            defaultX = [yearV, "na", "na"];
            volumeBarChart(totalVol, defaultX, labels, defaultY);
            break;
        case "size":
            labels = ["small","large", "extra large"];
            defaultX = [yearV, yearV, yearV];
            volumeBarChart(smallVol, defaultX, labels, defaultY, largeVol, XlVol);
            break;
        case "production":
            labels = ["traditional", "organic", "na"];
            defaultX = [conVYear, orgVYear, "na"];
            volumeBarChart(conventionalVol, defaultX, labels, defaultY, organicVol)
        };
    });

    //SHARE: Extrace data by each year 
    var year2015 = dataset.filter((entry) => {return entry.Year == 2015});
    var year2016 = dataset.filter((entry) => {return entry.Year == 2016});
    var year2017 = dataset.filter((entry) => {return entry.Year == 2017});
    var year2018 = dataset.filter((entry) => {return entry.Year == 2018});

    //sum function 
    function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b; }, 0);
    }


    //sharedata
    var smallShare18 = sum(year2018.map(datum => datum.Small_vol).map(Number));
    var largeShare18 = sum(year2018.map(datum => datum.Large_vol).map(Number));
    var XlShare18 = sum(year2018.map(datum => datum.XLarge_vol).map(Number));

    var smallShare17 = sum(year2017.map(datum => datum.Small_vol).map(Number));
    var largeShare17 = sum(year2017.map(datum => datum.Large_vol).map(Number));
    var XlShare17 = sum(year2017.map(datum => datum.XLarge_vol).map(Number));

    var smallShare16 = sum(year2016.map(datum => datum.Small_vol).map(Number));
    var largeShare16 = sum(year2016.map(datum => datum.Large_vol).map(Number));
    var XlShare16 = sum(year2016.map(datum => datum.XLarge_vol).map(Number));

    var smallShare15 = sum(year2015.map(datum => datum.Small_vol).map(Number));
    var largeShare15 = sum(year2015.map(datum => datum.Large_vol).map(Number));
    var XlShare15 = sum(year2015.map(datum => datum.XLarge_vol).map(Number));

    var conventionalShare18 = sum(year2018.filter((d) => {return d.Type === "conventional"}).map(datum => datum.Total_vol).map(Number));
    var organicShare18 = sum(year2018.filter((d) => {return d.Type === "organic"}).map(datum => datum.Total_vol).map(Number));

    var conventionalShare17 = sum(year2017.filter((d) => {return d.Type === "conventional"}).map(datum => datum.Total_vol).map(Number));
    var organicShare17 = sum(year2017.filter((d) => {return d.Type === "organic"}).map(datum => datum.Total_vol).map(Number));

    var conventionalShare16 = sum(year2016.filter((d) => {return d.Type === "conventional"}).map(datum => datum.Total_vol).map(Number));
    var organicShare16 = sum(year2016.filter((d) => {return d.Type === "organic"}).map(datum => datum.Total_vol).map(Number));

    var conventionalShare15 = sum(year2015.filter((d) => {return d.Type === "conventional"}).map(datum => datum.Total_vol).map(Number));
    var organicShare15 = sum(year2015.filter((d) => {return d.Type === "organic"}).map(datum => datum.Total_vol).map(Number));
    
    //Draw default charts
    
    var shareLabels = ["small", "large", "extra large"];
    var defaultShare = "type";

    var default2018 = [smallShare18, largeShare18, XlShare18];
    var default2017 = [smallShare17, largeShare17, XlShare17];
    var default2016 = [smallShare16, largeShare16, XlShare16];
    var default2015 = [smallShare15, largeShare15, XlShare15];

    sharePieChart (default2018, shareLabels, "pie-2018", "2018");
    sharePieChart (default2017, shareLabels, "pie-2017", "2017");
    sharePieChart (default2016, shareLabels, "pie-2016", "2016");
    sharePieChart (default2015, shareLabels, "pie-2015", "2015");


        //---SHARE: Event listener on y buttons--
    d3.selectAll(".share-button").on("click", function(){
        defaultShare = this.value;
        console.log("Share Button was clicked. New default:" + defaultShare);

    //SHARE: switch based on y-axis change//
    switch (defaultShare){
        default:
            shareLabels = ["conventional", "organic"];

            default2018 = [conventionalShare18, organicShare18];
            default2017 = [conventionalShare17, organicShare17];
            default2016 = [conventionalShare16, organicShare16];
            default2015 = [conventionalShare15, organicShare15];

            sharePieChart (default2018, shareLabels, "pie-2018", "2018");
            sharePieChart (default2017, shareLabels, "pie-2017", "2017");
            sharePieChart (default2016, shareLabels, "pie-2016", "2016");
            sharePieChart (default2015, shareLabels, "pie-2015", "2015");
            
            break;
        case "type":
            shareLabels = ["small","large", "extra large"];

            default2018 = [smallShare18, largeShare18, XlShare18];
            default2017 = [smallShare17, largeShare17, XlShare17];
            default2016 = [smallShare16, largeShare16, XlShare16];
            default2015 = [smallShare15, largeShare15, XlShare15];

            sharePieChart (default2018, shareLabels, "pie-2018", "2018");
            sharePieChart (default2017, shareLabels, "pie-2017", "2017");
            sharePieChart (default2016, shareLabels, "pie-2016", "2016");
            sharePieChart (default2015, shareLabels, "pie-2015", "2015");
            break;
        };
    });

});

//----------Functions------//
function volumeBarChart (yData1, xData, labels, defaultY, yData2 = "na", yData3 = "na",){

    var trace1 = {
        x: xData[0], 
        y: yData1,
        type: "bar",
        marker:{
            color:'rgb(130,154,88)'
        },
        transforms: [{
            type: 'aggregate',
            groups: xData[0],
            aggregations: [
              {target: 'y', func: 'sum', enabled: true}]
        }],
        name: labels[0]
    };

    var trace2 = {
        x: xData[1], 
        y: yData2,
        type: "bar",
        marker:{
            color:'rgb(241,165,27)'
        },
        transforms: [{
            type: 'aggregate',
            groups: xData[1],
            aggregations: [
              {target: 'y', func: 'sum', enabled: true}]
        }],
        name: labels[1]
    };

    var trace3 = {
        x: xData[2], 
        y: yData3,
        type: "bar",
        marker:{
            color:'rgb(242,240,148)'
        },
        transforms: [{
            type: 'aggregate',
            groups: xData[2],
            aggregations: [
              {target: 'y', func: 'sum', enabled: true}]
        }],
        name: labels[2]
    };

    if (defaultY === "overall") { var data = [trace1] }
    else if (defaultY === "size"){ var data = [trace1, trace2, trace3] }
    else {var data = [trace1,trace2]}
    
    var layout = {
        title: "<b>Volume of Avocados Sold over Time</b>",
        titlefont:{
            size: 16,
            family: 'arial',
            color: "#FFF"
            },
        margin: {
            l: 50,
            r: 50,
            b: 40,
            t: 40,
            pad: 3
          },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            tickmode: "linear", 
            tick0: 2014,
            dtick: 1,
            tickfont: {
                family: 'arial',
                size: 10,
                color: '#000'
            }
            },
        yaxis: {
            autotick: true,
            range: [0, 2000000000],
            tickfont:{
                family: 'arial',
                size: 10,
                color: '#000'
                }
            },
        showlegend: true,
        legend: {
            orientation: "h",
            xanchor: "center",
            x: 0.5,
            font:{
                family: 'arial',
                size: 11,
                color: '#000'
              }
            },
    }

    Plotly.newPlot("volume-over-time", data, layout, {displayModeBar: false});
};

function sharePieChart (data, labels, div, yearTitle){

    var data = [{
        values: data,
        labels: labels,
        type: 'pie',
        marker: {
            colors: ['rgb(130,154,88)','rgb(241,165,27)','rgb(242,240,148)']
        },
        textinfo: "label+percent",
        sort: false
      }];

    var layout = {
        title: "<b>"+ yearTitle +"</b>",
        titlefont:{
            size: 18,
            family: 'Questrial',
            color: "rgb(110,110,110)"
            },
        showlegend: false,
        height: 250,
        width: 250,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
            l: 50,
            r: 50,
            b: 40,
            t: 40,
            pad: 3
          },
    }

    Plotly.newPlot(div, data, layout, {displayModeBar: false});
};