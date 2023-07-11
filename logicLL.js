// check the links 
console.log("Map Check");
//base layer
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
        '<br> Data Analysts: Lora, Kesha, Hima, Juhi <a href="https://github.com/LoraLou/Project3/tree/main">Github Repo</a>'
});
// base map objects 
let baseMaps = {
    "Street Map": street,
};
// empty layer
let University = new L.layerGroup();
//overlay oject
let overlayMaps = {
    "University Graduation Rate": University
};
// create map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street, University]
});
// layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
// perform d3
d3.json("IPEDS_data.geojson").then(function (Name) {
    console.log(Name.features[0]);
    // marker function
    function markerColor(rate) {
        return rate > 70 ? '#1a9850' : 
            rate > 50 ? '#66bd63' :
                rate > 40 ? '#a6d96a' : 
                    rate > 30 ? '#d9ef8b' : 
                        rate > 20 ? '#fee08b' : 
                            rate > 10 ? '#fdae61' : 
                                rate > 2 ? '#f46d43' : 
                                    '#d73027'; 
    }
    //marker style
    function styleInfo(feature) {
        console.log(feature.properties.GraduationRateBachelorDegreeWithin4YearsTotal);
        return {
            radius: 5,
            color: markerColor(feature.properties.GraduationRateBachelorDegreeWithin4YearsTotal),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5
        };
    }
    // GeoJSON layer
    L.geoJSON(Name, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        // create style
        style: styleInfo,
        // create pop-ups
        onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(`
        <h3>${feature.properties.Name}</h3>
        <hr>
        <h3>Graduation Rate Within 4 Years(%): ${feature.properties.GraduationRateBachelorDegreeWithin4YearsTotal.toLocaleString()}</h3>
        <h3>Total Enrollment: ${feature.properties.TotalEnrollment}</h3>
        `);
        }
    }).addTo(myMap);
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map) {
        let div = L.DomUtil.create('div', 'info legend'),
            grades = [98, 75, 62, 50, 38, 25, 2, 0],
            labels = [];
        // loop
        div.innerHTML += 'Rate (%) <br>'
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(grades[i] + 1) + ' "><' +
                grades[i] + (grades[i+1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
    //info control
    let info = L.control();
    info.onAdd = function (myMap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    info.update = function (props) {
        this._div.innerHTML = '<h3>2013 Graduation Rates Across United States Universities for the Year</h3>'
    };
    info.addTo(myMap);
});
