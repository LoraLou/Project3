// Create the base layers.
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
        '<br> USGS Analyst: Kesha<a bref="past link here">Github Repo</a>'
});

// var graphicMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' +
//         '<br> USGS Analyst: Kesha<a bref="past link here">Github Repo</a>'
// });

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});


var graduationURL = "https://public.tableau.com/app/resources/learn"

var baseMaps = {
    "Street Map View": OpenStreetMap,
};

var University = new L.layerGroup();

var overlayMaps = {
    Univsities: University
};


var myMap = L.map("map", {
    center: [40.09, -90.5],
    zoom: 5,
    layers: [OpenStreetMap, University]
});


L.control.layers(baseMaps, overlayMaps, {
}).addTo(myMap);


