// Create the base layers.
var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       
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


d3.json("resources/IPEDS_data.geojson").then(function (Name) {
    console.log(Name.features[0])

    var universityMarker = {
        radious: 8,
        fillcolor: "green",
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
        layer.bindPopup(`
        <h3>${feature.properties.Name}</h3>
        <hr>
        <h3>Graduation Rate Within 4 Years(%): ${feature.properties.GraduationRateBachelorDegreeWithin4YearsTotal}</h3>
        <h3>Total Enrollment: ${feature.properties.TotalEnrollment}</h3>
        `);
    }
    }).addTo(myMap);
});


var info = L.control();

info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h3>2013 Graduation Rates Across American Universities</h3>';
};

info.addTo(myMap);