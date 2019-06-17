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

const layerControl = L.control.layers({
    "Basemap Grau": kartenLayer.bmpgrau,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "OSM": kartenLayer.osm,
}).addTo(karte);

const heatgruppe = L.featureGroup();
const markergruppe = L.featureGroup();

// Jsonp abfragen
let jsonpResponse = function (data) {
    // console.log(data);
    for (let i in data) {
        // console.log(data[i].lat);
        let lat = data[i].lat;
        let lng = data[i].lon;
        let ozon1h = data[i].ozon1h;
        let ozon8h = data[i].ozon8h;
        let ozon1hmax = data[i].ozon1hMax;
        let name = data[i].name;
        let timestamp = data[i].timestamp_utc;


        //Thu, 13 Jun 2019 23:00:00 GMT
        //Zeitzone entfernen
        let date = timestamp.substring(0, timestamp.length-12);
        //Uhrzeit auslesen
        let time = timestamp.substring(timestamp.length-12, timestamp.length-4);
        
        

        // Marker

      
        let ozonMarker = L.marker([lat, lng], {}).addTo(karte)
        
        ozonMarker.bindPopup(`
        <h4 class = "marker" >Name: ${name}</h4>
        
        <p class = "marker" >
        <strong>Datum:</strong> ${date}<br>
        <strong>Uhrzeit:</strong> ${time}<br>
        <strong>Ozon 1h max:</strong> ${ozon1hmax}<br>
        <strong>Ozon 8h:</strong> ${ozon8h}</p>
        `).addTo(markergruppe);

        markergruppe.addTo(karte)
       
        
        // Heatmap

        var ozonPoints = [lat, lng, parseFloat(ozon1h/300)]
        console.log(ozonPoints)

        

        L.heatLayer([
                ozonPoints
            ], // lat, lng, intensity

            {
                radius: 25,
                minOpacity: 0.4,
                
                
                
                
                
                
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
                    0.0: "blue",
                    0.1: "black",
                    0.2: "yellow",
                    0.3: "orange",
                    0.4: "red",
                    0.5: "purple",
                    
                    

                }
            }).addTo(heatgruppe);
    }
    
    layerControl.addOverlay(markergruppe, "Ozonmessstationen")
    layerControl.addOverlay(heatgruppe, "Heatmap")
    




}



// // Ozonwerte
//http://luft.umweltbundesamt.at/pub/ozonbericht/aktuell.json



// Fullscreen
karte.addControl(new L.Control.Fullscreen());


//// ImageSlides
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

