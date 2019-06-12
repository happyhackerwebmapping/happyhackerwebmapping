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
let jsonpResponse = function (data) {
    // console.log(data);
    for (let i in data) {
        // console.log(data[i].lat);
        let lat = data[i].lat
        let lng = data[i].lon
        let ozon1h = data[i].ozon1h
        let ozon1hmax = data[i].ozon1hMax
        let name = data[i].name
        let timestamp = data[i].timestamp_utc

        // Marker
        let ozonMarker = L.marker([lat, lng], {}).addTo(karte)
        ozonMarker.bindPopup(`
        Name: ${name}
        Timestamp: ${timestamp}<br>
        Ozon 1h Max: ${ozon1hmax}
        `)

        var ozonPoints = [lat, lng, ozon1hmax/300]
        console.log(ozonPoints)

        // var idw = L.idwLayer([ozonPoints],{
        //     opacity: 0.3,
        //     maxZoom: 18,
        //     cellSize: 10,
        //     exp: 3,
        //     max: 50
        // }).addTo(karte);


        // var cfg = {
        //     // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        //     // if scaleRadius is false it will be the constant radius used in pixels
        //     "radius": 2,
        //     "maxOpacity": .8, 
        //     // scales the radius based on map zoom
        //     "scaleRadius": true, 
        //     // if set to false the heatmap uses the global maximum for colorization
        //     // if activated: uses the data maximum within the current map boundaries 
        //     //   (there will always be a red spot with useLocalExtremas true)
        //     "useLocalExtrema": true,
        //     // which field name in your data represents the latitude - default "lat"
        //     latField: 'lat',
        //     // which field name in your data represents the longitude - default "lng"
        //     lngField: 'lng',
        //     // which field name in your data represents the data value - default "value"
        //     valueField: 'count'
        //   };
        //   var heatmapLayer = new HeatmapOverlay(cfg);



        //   heatmapLayer.setData(ozonPoints);

        var heat = L.heatLayer([
                ozonPoints
            ], // lat, lng, intensity

            {
                radius: 50,
                opacity: 0.5,
                
                //Grenzwerte
                //300µg: 1
                //270µg: 0.9
                //240µg: 0.8
                //210µg: 0.7
                //180µg: 0.6
                //150µg: 0.5
                //120µg: 0.4
                //90µg: 0.3
                //60µg: 0.2
                //30µg: 0.1


                gradient: {   
                    0.1: "green",
                    0.2: "yellow",
                    0.3: "orange",
                    0.4: "red",
                    
                    

                }
            }).addTo(karte);
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