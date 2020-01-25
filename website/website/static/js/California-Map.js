var mapCA = L.map("mapCA", {
    center:[36.7783, -119.4179],
    zoom:6});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    accessToken: API_KEY
    }).addTo(mapCA);


//Load geojson 
d3.json("static/js/Farm_Info_California_Counties.json").then(function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
        style: function(feature) {
        return {
            color: "gray",
            fillColor: chooseColor(feature.properties.HasAvocadoFarm),
            fillOpacity: 0.25,
            weight: 1.0
        };
        }
    }).addTo(mapCA);
});

function chooseColor(variable) {
    if (variable == 1) {
        return "green";
    } else {
        return "white";
    }
};



// Fetch some data from a GeoJSON file
$.getJSON("../../Resources/Data/caRain20152018.json", function (json) {
            
var testlayer = L.geoJson(json);

let sliderControlCA = L.control.sliderControl({
    position: "topright",
    layer: testlayer,
    range: true
    });

// Make sure to add the slider to the map ;-)
    mapCA.addControl(sliderControlCA);

// And initialize the slider
    sliderControlCA.startSlider();
    });
