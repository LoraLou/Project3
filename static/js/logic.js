// Create the base layers.
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
        '<br> USGS Analyst: Kesha<a bref="past link here">Github Repo</a>'
});

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

// getting geojson data

var baseMaps = {
    "Street Map View": OpenStreetMap,
};

var University = new L.layerGroup();

var overlayMaps = {
    Univsities: University
};


var myMap = L.map("map", {
    center: [40.09, -90.5],
    zoom: 7,
    layers: [OpenStreetMap, University]
});


L.control.layers(baseMaps, overlayMaps, {
}).addTo(myMap);


d3.json("IPEDS_data.geojson").then(function (Name) {
    console.log(Name.features[0])

    var universityMarker = {
        radious: 8,
        fillcolor: "coral",
        color: "darkgreen",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5
    
    };


    L.geoJSON(Name, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, universityMarker);
        },
    // add hoverover information can go here
    onEachFeature: function onEachFeature(feature, layer){
        layer.bindPopup('test')
    }

    }).addTo(myMap);
});



