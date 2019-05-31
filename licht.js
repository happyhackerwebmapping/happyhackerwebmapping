var layerLicht;

let karte = L.map(`map`, {
    center: [47, 9],
    zoom: 3
});

var kartenLayer = {
    VIIRS_2019: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2019',
        transparent: true,
        opacity: 0.5,
    }),

    VIIRS_2014: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2014',
        transparent: true,
    }),
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
};


layerLicht = L.geoJSON.ajax('GeoJson/map.geojson')

L.control.layers({
    "VIIRS_2019": kartenLayer.VIIRS_2019,
    "osm": kartenLayer.osm,
    "Städte": layerLicht,
}).addTo(karte);



