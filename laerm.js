let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "OpenStreetMap": kartenLayer.osm,
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);
karte.addControl(new L.Control.Fullscreen());
karte.setView(
    [47.330707, 11.345558], 11
);


//Positionsmarker hinzufügen
let ursulinen = L.marker(
    [47.262791, 11.368775]
).addTo(karte);
let völs = L.marker(
    [47.253736, 11.319013]
).addTo(karte);
let allerheiligen = L.marker(
    [47.266833, 11.359073]
).addTo(karte);

// Popup hinzufügen
ursulinen.bindPopup(
    `<h1>Standtort: Ursulinen
        <img class='zoom' src="images/laerm/ursulinen.jpg" style="width:300px;height:200px;">`
);
völs.bindPopup(
    `<h1>Standtort: Völs
        <img class='zoom' src="images/laerm/voels.jpg" style="width:300px;height:200px;">`
);
allerheiligen.bindPopup(
    `<h1>Standtort: Allerheiligen
        <img class='zoom' src="images/laerm/allerheiligen.jpg" style="width:300px;height:200px;">`
);


