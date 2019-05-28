let karte = L.map("map");

karte.setView([51.505, 17.09], 13);

const kartenLayer = {
        osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }),
    }
    
kartenLayer.osm.addTo(karte);