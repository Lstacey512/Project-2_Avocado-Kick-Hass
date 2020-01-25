
//-------------Creates aggregate data across the two csv's
/**
 * Mutates and returns MarketInfo
 * @param {*} AvocadoMarketData 
 * @param {*} MarketInfo 
 */
function CreateMapData (AvocadoMarketData, MarketInfo){
    
  //filter data just to your year criteria
  //var yearCriteria = "20"+Year;
  //AvocadoMarketData.filter((datum) => datum.Year === yearCriteria);

  for(let yearCriteria = 2015; yearCriteria <= 2018; yearCriteria++)
    for (let i = 0; i < MarketInfo.length; i++) {
      MarketInfo[i][yearCriteria] = {avgPrice: 0, totalVolume: 0, totalPrice: 0, data: []};
    }

  //Loop through each record
  for(let i = 0; i < AvocadoMarketData.length; i++)
  {
    let current = AvocadoMarketData[i];
    let marketID = current.Market_id - 1;
    let yearCriteria = current.Year;
    if(MarketInfo[marketID])
    {
      // console.log(MarketInfo[marketID]);
      // console.log(yearCriteria);
      let me = MarketInfo[marketID][yearCriteria];
      me.data.push(current);
      me.totalVolume += parseFloat(current.Total_vol);
      me.totalPrice += parseFloat(current.AveragePrice);
      me.avgPrice = me.totalPrice / me.data.length;
    }
    else
      console.log(`Put message in me!!!`);
  }

  return MarketInfo;
  
}

///-----------run here

var p1 = d3.csv("../../Resources/Data/Data tables for SQL/avocado_market_data.csv");
var p2 = d3.csv("../../Resources/Data/Data tables for SQL/Markets_for_api.csv");
Promise.all([p1, p2]).then(([avacado, market]) => 
{
  market = CreateMapData(avacado, market);

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  var Markets15 = createMarkers(market, 2015, "Market15");
  var Markets16 = createMarkers(market, 2016, "Market16");
  var Markets17 = createMarkers(market, 2017, "Market17");

  // Create an overlayMaps object to hold the markets and heatmap layers
  var overlayMaps = {
    "Market15": Markets15,
    "Market16": Markets16,
    "Market17": Markets17
  };
  

  // Create the map object with options
  var map = L.map("MarketMap", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [lightmap, Markets15]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

 //------------Creates the MarketsXX overlay maps
  function createMarkers(mapData, desiredYear, Name) {

    // Initialize an array to hold markers
    var Name = [];

    // Loop through the stations array
    for (var index = 0; index < mapData.length-1; index++) {
      var city = mapData[index]
      
      // For each station, create a marker and bind a popup with the station's name
      var cityMarker = L.marker([city.Lat, city.Long])
        .bindPopup("<h2>" + city.Market_name + "<h2></br><h3>Total Volume: " + city[desiredYear].totalVolume.toFixed(2) + "</h3></br><h3> Avg. Price: $" + city[desiredYear].avgPrice.toFixed(2)+"</h3>");
      
      // Add the marker to the bikeMarkers array
      Name.push(cityMarker);
    }
  
  return L.layerGroup(Name);

  }

  var defaultmapcheck = 
  
  //Create listeners on the year and heat map buttons 
  d3.selectAll(".heat-button").on("click", function(){

    var heatSelection = this.value;
    var yearSelection = this.name;
    console.log(`Market heat map selected for ${yearSelection} ${heatSelection}`);

    var url = "../../Resources/Data/Data tables for SQL/Markets_demo_"+yearSelection+".csv";

    d3.csv(url).then((data)=>{

        //console.log(data);

      var diversityArray = [];
      var millenialArray = [];
      var incomeArray = [];

      for (var i = 0; i < data.length; i++){
        
        var lat = parseFloat(data[i].Lat);
        var long = parseFloat(data[i].Long); 
        var diversity = parseInt(parseFloat(data[i]["Diversity%"])*1000);
        var millenials = parseFloat(data[i]["Millenial%"])*1000;
        var income = parseFloat(data[i].Median_income);

        diversityArray.push([lat,long, diversity]);
        millenialArray.push([lat, long, millenials]);
        incomeArray.push([lat,long, income]);     
        }
        
      //Create heat maps from each array
      var diversityHeat = L.heatLayer(diversityArray, {radius: 20, blur: 35});
      var millenialHeat = L.heatLayer(millenialArray, {radius: 20, blur: 35});
      var incomeHeat = L.heatLayer(incomeArray, {radius: 20, blur: 35});

      //Save the heatmaps to an array to call later. heatMapLayer[0] will be the diversityHeat, etc. 
      var heatMapLayer = [diversityHeat, millenialHeat, incomeHeat];
      console.log(heatMapLayer);

      switch (heatSelection){
        //default is diversity (div)
        default:
          heatMapLayer[0].addTo(map);
          console.log("adding");
          break;
        case "mill":
          heatMapLayer[1].addTo(map);
          break;
        case "income":
          heatMapLayer[2].addTo(map);
          break; 
      }

      }) 
    
    });

  });