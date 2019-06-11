let karte = L.map("map", {
    
});
karte.setView(
    [48, 13], 7
);

var kartenLayer = {



    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
        bmpgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
};



kartenLayer.bmpgrau.addTo(karte);

L.control.layers({
    "Basemap Grau": kartenLayer.bmpgrau,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "OSM": kartenLayer.osm,
}).addTo(karte);

// Jsonp abfragen
let jsonpResponse = function(data) {
    // console.log(data);
    for (let i in data){
        // console.log(data[i].lat);
        let lat = data[i].lat
        let lng = data[i].lon
        let ozon1h = data[i].ozon1h 
        let ozon1hmax = data[i].ozon1hMax
        let name = data[i].name
        let timestamp = data[i].timestamp_utc
        
        // Marker
        let ozonMarker = L.marker([lat,lng], { 
        }).addTo(karte)
        ozonMarker.bindPopup(`
        Name: ${name}
        Timestamp: ${timestamp}`)

        var ozonPoints = [lat, lng, ozon1hmax]
        console.log(ozonPoints)
        
        // var idw = L.idwLayer([ozonPoints],{
        //     opacity: 0.3,
        //     maxZoom: 18,
        //     cellSize: 10,
        //     exp: 3,
        //     max: 50
        // }).addTo(karte);


        
    }

    
    
    

}



// // Ozonwerte
// const url = "http://luft.umweltbundesamt.at/pub/ozonbericht/aktuell.json";

// async function OzonLaden(url) {
//     console.log("lade", url);

//     const antwort = await fetch(url);
//     const jsonDaten = await antwort.json();
// };
// OzonLaden();

// Fullscreen
karte.addControl(new L.Control.Fullscreen());