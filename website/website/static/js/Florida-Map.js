var mapFL = L.map("mapFL", {
    center:[28.2, -82.4],
    zoom:7});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    accessToken: API_KEY
    }).addTo(mapFL);


//Load geojson 
d3.json("static/js/Farm_Info_Florida_Counties.json").then(function(data) {
    console.log(data);
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
    }).addTo(mapFL);
});

function chooseColor(variable) {
    if (variable == 1) {
        return "green";
    } else {
        return "white";
    }
};



// Fetch some data from a GeoJSON file
$.getJSON("../../Resources/Data/flRain20152018.json", function (json) {
    var testlayer2 = L.geoJson(json);
    
    let sliderControlFL = L.control.sliderControl({
        // position: "bottomright",
        layer: testlayer2,
        // range: true
        });

    // Make sure to add the slider to the map ;-)
    mapFL.addControl(sliderControlFL);
    
    // And initialize the slider
    sliderControlFL.startSlider();
            
});