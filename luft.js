let karte = L.map("map", {
    center: [47, 11],
    zoom: 9
});

var kartenLayer = {



    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
};



kartenLayer.osm.addTo(karte);

L.control.layers({
    "OSM": kartenLayer.osm,
}).addTo(karte);

// Ozonwerte
const url = "http://luft.umweltbundesamt.at/pub/ozonbericht/aktuell.json";

async function OzonLaden(url) {
    console.log("lade", url);

    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();
};
OzonLaden();

// Fullscreen
karte.addControl(new L.Control.Fullscreen());