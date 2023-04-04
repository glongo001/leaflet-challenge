//Part 1: Create the Earthquake Visualization
//get dataset, selected all earthquakes for the last 7 days, saved to url constant
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

//create map function
function createMap(earthquakeLayer) {
    //create tile layer that will be the background of our map
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    //create baseMaps object to hold the streetmap layer
    var baseMaps = {
      "Street Map": streetmap
    };
    //create overlayMaps object to hold the earthquake locations layer
    var overlayMaps = {
      "Earthquake Locations": earthquakeLayer
    };
    //create the map object with options
    var map = L.map("map", {
      center: [10, -70],
      zoom: 4,
      layers: [streetmap, earthquakeLayer]
    });
    //create layer control, pass it baseMaps and overlayMaps, add layer control to map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
    //call createLegend() function to add legend to the map
    createLegend().addTo(map);
};

//create markers function
function createMarkers(response) {
    //pull the "features" property from response
    var features = response.features;
    //initialize array to hold earthquake markers
    var earthquakeMarkers = [];
    //loop through the features array
    for (var index = 0; index < features.length; index++) {
        var feature = features[index];
        //for each feature, create a marker, and bind a popup with the earthquake's details
        //use circleMarker() for marker to look like circles intead of location symbols, use coordinates to place circles
        var earthquakeMarker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            //use the earthquake magnitude to determine circle radius
            radius: feature.properties.mag * 5,
            fillOpacity: 0.7,
            color: "black",
            //color will be determined by getColor function based on depth of earthquake (3rd coordinate)
            fillColor: getColor(feature.geometry.coordinates[2]),
            weight: 1
        //bind popup with earthquake details
        }).bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " + feature.properties.mag.toFixed(2)
        + "</h3><p>Latitude: " + feature.geometry.coordinates[1].toFixed(2) + "</h3><p>Longitude: " + feature.geometry.coordinates[0].toFixed(2)
        + "</h3><p>Depth in km: " + feature.geometry.coordinates[2].toFixed(2) + "</p>");
        //add the marker to the earthquakeMarkers array
        earthquakeMarkers.push(earthquakeMarker);
    }
    //create layer group that's made from the earthquake markers array
    var earthquakeLayer = L.layerGroup(earthquakeMarkers);
    //pass earthquake layer to the createMap function.
    createMap(earthquakeLayer);
};

//determine colors of each magnitude
function getColor(depth) {
    if (depth > 400) {return "#490000";}
    else if (depth > 350) {return "#6e0101";}
    else if (depth > 300) {return "#a10303";}
    else if (depth > 250) {return "#d50707";}
    else if (depth > 200) {return "#ea2c2c";}
    else if (depth > 150) {return "#ea822c";}
    else if (depth > 100) {return "#ee9c00";}
    else if (depth > 50) {return "#eecc00";}
    else if (depth > 25) {return "#d4ee00";}
    else {return "#98ee00";}
};
  
//create legend
function createLegend() {
    //set the position of the legend on the bottom right
    var legend = L.control({ position: "bottomright" });
    //add colors and limits to legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        //define limits of legend and colors
        div.innerHTML += "<h4>Depth (km)</h4>";
        div.innerHTML += '<i style="background:' + getColor(0) + '"></i><span>0 - 25</span><br>';
        div.innerHTML += '<i style="background:' + getColor(25) + '"></i><span>25 - 50</span><br>';
        div.innerHTML += '<i style="background:' + getColor(50) + '"></i><span>50 - 100</span><br>';
        div.innerHTML += '<i style="background:' + getColor(100) + '"></i><span>100 - 150</span><br>';
        div.innerHTML += '<i style="background:' + getColor(150) + '"></i><span>150 - 200</span><br>';
        div.innerHTML += '<i style="background:' + getColor(200) + '"></i><span>200 - 250</span><br>';
        div.innerHTML += '<i style="background:' + getColor(250) + '"></i><span>250 - 300</span><br>';
        div.innerHTML += '<i style="background:' + getColor(300) + '"></i><span>300 - 350</span><br>';
        div.innerHTML += '<i style="background:' + getColor(350) + '"></i><span>350 - 400</span><br>';
        div.innerHTML += '<i style="background:' + getColor(400) + '"></i><span>400+</span><br>';
      return div;
    };
    return legend;
};
  
      
//perform API call to the USGS earthquake API, call createMarkers function
d3.json(url).then(createMarkers);
