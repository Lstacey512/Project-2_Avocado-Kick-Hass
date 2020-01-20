d3.csv("../../Resources/Data/Data tables for SQL/avocado_totalus_data.csv").then(dataset =>{

    // console.log(dataset)
    
    //PRICING TRENDS: Extract data to variables. Using Avg aggregates so don't need to exclude 2018
    //Also, pricing is not given by PLU. So we can only display overall & by production 
    var avgPrice = dataset.map(datum => datum.AveragePrice);
    var yearP = dataset.map(datum => datum.Year);
    
    var conventionalP = dataset.filter((d) => {return d.Type === "conventional"});
    var organicP = dataset.filter((d)=>{return d.Type === "organic"});

    var conventionalPrice = conventionalP.map(datum => datum.AveragePrice);
    var conPYear = conventionalP.map(datum => datum.Year);
    var organicPrice = organicP.map(datum => datum.AveragePrice);
    var orPYear = organicP.map(datum => datum.Year);

    //PRICING TREND: set defaults//
    var defaultXPrice = [yearP];
    var defaultYPrice = "overall";
    var Pricelabels = ["overall", "na"];

    pricingLineChart(avgPrice, defaultXPrice, Pricelabels, defaultYPrice);

    //---PRICING: Event listener on y buttons--
    d3.selectAll(".price-button").on("click", function(){
        defaultYPrice = this.value;
        console.log("Price Button was clicked. New default:" + defaultYPrice);

    //VOLUME: switch based on y-axis change//
    switch (defaultYPrice){
        default:
            console.log("rewriting price chart");
            Pricelabels = ["overall", "na"];
            defaultXPrice = [yearP, "na"];
            pricingLineChart(avgPrice, defaultXPrice, Pricelabels, defaultYPrice);
            break;
        case "production":
            console.log("rewriting price chart");
            Pricelabels = ["traditional", "organic"];
            defaultXPrice = [conPYear, orPYear];
            pricingLineChart(conventionalPrice, defaultXPrice, Pricelabels, defaultYPrice, organicPrice);
            break;
        };
    });

    //PRICE X VOLUME SHARE: Extrace data by each year 
    var exclude2018 = dataset.filter((entry) => {return entry.Year != 2018})
    
    //function to append Quarter and Year together:
    function CreateKeyValue (dataset){
        return dataset.map((record) => {
            record.QYear = record.Quarter + " "+ record.Year;
            return record
        });
    }
    var QuarterDataset = CreateKeyValue(exclude2018);

    // console.log(QuarterDataset);

    var totalQrtVol = QuarterDataset.map(datum => datum.Total_vol);
    var totalQrtP = QuarterDataset.map(datum => datum.AveragePrice);
    var totalQY = QuarterDataset.map(datum => datum.QYear);

    var smallQrtVol = QuarterDataset.map(datum => datum.Small_vol);
    var largeQrtVol = QuarterDataset.map(datum => datum.Large_vol);
    var XlQrtVol = QuarterDataset.map(datum => datum.XLarge_vol);

    var conQY = QuarterDataset.filter((d) => {return d.Type === "conventional"});
    var orgQY = QuarterDataset.filter((d)=>{return d.Type === "organic"});

    var conventionalQrtVol = conQY.map(datum => datum.Total_vol);
    var conventionalQrtP = conQY.map(datum => datum.AveragePrice)
    var conQYear = conQY.map(datum => datum.QYear);
    var organicQrtVol = orgQY.map(datum => datum.Total_vol);
    var organicQrtP = orgQY.map(datum => datum.AveragePrice);
    var orgQYear = orgQY.map(datum => datum.QYear);

    //Draw default charts
    
    var defaultXforQY = totalQY;
    var defaultQYVol = totalQrtVol;
    var defaultQYPrice = totalQrtP;
    var title = "overall" 

    priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);

    //PRICE X VOLUME: Event listener on y buttons--
    d3.selectAll(".vol-p-button").on("click", function(){
        title = this.value;
        console.log("Share Button was clicked. New default:" + title);

    //PRICE X VOLUME: switch based on buttons. Defaul = overall //
    switch (title){
        default:
            defaultXforQY = totalQY;
            defaultQYVol = totalQrtVol;
            defaultQYPrice = totalQrtP;

            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        case "small":
            defaultXforQY = totalQY;
            defaultQYVol = smallQrtVol;
            defaultQYPrice = totalQrtP;

            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        case "large":
            defaultXforQY = totalQY;
            defaultQYVol = largeQrtVol;
            defaultQYPrice = totalQrtP;
    
            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        case "Xlarge":
            defaultXforQY = totalQY;
            defaultQYVol = XlQrtVol;
            defaultQYPrice = totalQrtP;
    
            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        case "conventional":
            defaultXforQY = conQYear;
            defaultQYVol = conventionalQrtVol;
            defaultQYPrice = conventionalQrtP;
        
            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        case "organic":
            defaultXforQY = orgQYear;
            defaultQYVol = organicQrtVol;
            defaultQYPrice = organicQrtP;
            
            priceXvolumeComboChart(defaultQYVol, defaultQYPrice, defaultXforQY, title);
            break;
        };
    });

 });

//----------Functions------//
function pricingLineChart (yData1, xData, labels, defaultY, yData2 = "na"){

    var trace1 = {
        x: xData[0], 
        y: yData1,
        mode: "lines+markers",
        marker:{
            color:'rgb(130,154,88)'
        },
        transforms: [{
            type: 'aggregate',
            groups: xData[0],
            aggregations: [
              {target: 'y', func: 'avg', enabled: true}]
        }],
        name: labels[0],
        hovertemplate: "Price: %{y:$.2f}"
    };

    var trace2 = {
        x: xData[1], 
        y: yData2,
        mode: "lines+markers",
        marker:{
            color:'rgb(241,165,27)'
        },
        transforms: [{
            type: 'aggregate',
            groups: xData[1],
            aggregations: [
              {target: 'y', func: 'avg', enabled: true}]
        }],
        name: labels[1],
        hovertemplate: "Price: %{y:$.2f}"
    };

    if (defaultY === "overall") { var data = [trace1] }
    else {var data = [trace1,trace2]}
    
    var layout = {
        title: "<b>Average Price per Avocado over Time</b>",
        titlefont:{
            size: 16,
            family: 'Questrial',
            color: "rgb(110,110,110)"
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
            range: [0, 3],
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

    Plotly.newPlot("Pricing-over-time", data, layout, {displayModeBar: false});
};

function priceXvolumeComboChart(barData, lineData, xData, title){

    var trace1 = {
        x: xData,
        y: barData,
        type: "bar",
        transforms: [{
            type: 'aggregate',
            groups: xData,
            aggregations: [{target: 'y', func: 'sum', enabled: true}]
        }],
        name: "volume",
        marker:{
            color: "rgb(130, 154,88)"
            }
      };
      
      var trace2 = {
        x: xData, 
        y: lineData,
        mode: "markers",
        transforms: [{
            type: 'aggregate',
            groups: xData,
            aggregations: [{target: 'y', func: 'avg', enabled: true}]
        }],
        name: "avg. price",
        yaxis: "y2",
        marker:{
            size: 12,
            color: "rgb(241,165,27)"
            },
        hovertemplate: "%{y:$.2f}"
      };
    
      var data = [trace1, trace2];

      var layout ={
        title: "<b>Avocago Volume & Price Trends - " + title + "</b>",
        titlefont:{
            size: 16,
            family: 'Questrial',
            color: "rgb(110,110,110)"
            },
        height: 320,
        margin: {
            l: 70,
            r: 70,
            b: 50,
            t: 50,
            pad: 3
          },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            categoryorder: "array",
            categoryarray: ["Q1 2015", "Q2 2015", "Q3 2015", "Q4 2015", "Q1 2016", "Q2 2016", "Q3 2016", "Q4 2016", "Q1 2017", "Q2 2017", "Q3 2017", "Q4 2017" ], 
            tickfont: {
                family: 'arial',
                size: 10,
                color: '#000'
            }
            },
        yaxis: {
            title: 'Total Avocados Sold',
            titlefont: {size: 12, family: 'arial'},
            tickfont: {
                family: 'arial',
                size: 10,
                color: '#000'
                }
            },
        yaxis2: {
              title: 'Avg. Price per Avocado',
              titlefont: {size: 12, family: 'arial'},
              overlaying: 'y',
              side: 'right',
              tickfont: {
                family: 'arial',
                size: 10,
                color: '#000'
                }
            },
        legend:{
            orientation: "h",
            xanchor: "center",
            x: 0.5,
            font:{
            family: 'arial',
            size: 11,
            color: '#000'
                }
            }, 
        };

      Plotly.newPlot("Pricing-by-volume", data, layout, {displayModeBar: false})


}