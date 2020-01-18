// Creating map object
var map = L.map("map", {
  center: [27.7128, -82.0059],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// If data.beta.nyc is down comment out this link
//var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
//"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

// Uncomment this link local geojson for when data.beta.nyc is down
var link = "static/data/Florida_Counties.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function choosecolor(COUNTYNAME) {
  var color = "";

  if (COUNTYNAME = "DADE") {
      color = "darkred";
  }
  else if (COUNTYNAME >= 7.0) {
      color = "red";
  }
  else if (COUNTYNAME >= 6.0) {
      color = "orange";
  }
  else if (COUNTYNAME >= 5.0) {
      color = "yellow";
  }
  else if (COUNTYNAME >= 4.0) {
      color = "lightgreen";
  }
  else {
      color = "white";
  }
  return color
}

// Grabbing our GeoJSON data..
//d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  //L.geoJson(data, {
    //style: function(feature) {
      //return {
        //color: "red",
        //fillColor: chooseColor(feature.properties.COUNTYNAME),
        //fillOpacity: 0.5,
        //weight: 1.5
      //};
    //}
  //}).addTo(map);
//});
var link = "static/data/Florida_Counties.geojson";

// Perform a GET request to the query URL
d3.json(link, function (data) {
    //check data
    console.log(data.features);

    //    add geojson layer
    L.geoJson(data.features, { onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                color: choosecolor(feature.properties.COUNTYNAME),
                fillColor: choosecolor(feature.properties.COUNTYNAME),
                fillOpacity: 0.75,
                radius: (feature.properties.COUNTYNAME)
            });
        }
    }).addTo(map);
});