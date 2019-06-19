let karte = L.map('map', {
    center: [47.2930, 11.4272],
    zoom: 12
});

const hash = new L.Hash(karte);

var kartenLayer = {
    VIIRS_2019: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2019',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2018: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2018',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2017: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2017',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2016: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2016',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2015: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2015',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2014: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2014',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    VIIRS_2013: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2013',
        attribution: 'Map tiles by Jurij Stare, <a href="https://www.lightpollutionmap.info"> www.lightpollutionmap.info</a> and Earth Observation Group, NOAA National Geophysical Data Center',
        opacity: 0.5,
    }),
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
    }),
    blackmarble2012: L.tileLayer("http://scripts.digital-geography.com/black_marble/2012/{z}/{x}/{y}.png", {
        maxZoom: 8,
        minZoom: 3,
        attribution: "data by Nasa 2012, composition by <a href='http://geolicious.de'>Geolicious</a>"
    }),
    blackmarble2016: L.tileLayer("http://scripts.digital-geography.com/black_marble/2016/{z}/{x}/{y}.png", {
        maxZoom: 8,
        minZoom: 3,
        attribution: "data by Nasa 2016, composition by <a href='http://geolicious.de'>Geolicious</a>"
    })
};

/*var citylights = new L.GIBSLayer('VIIRS_CityLights_2012', {
    date: new Date('2012/04/16'),
    transparent: true
});*/

kartenLayer.stamen_terrain.addTo(karte);
kartenLayer.VIIRS_2019.addTo(karte);



new L.Control.MiniMap(
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true,
        minimized: true
    }
).addTo(karte);





function createCustomIcon(feature, latlng) {
    let myIcon = L.icon({
        iconUrl: 'icons/milkyway_icon.png',
        iconSize: [25, 25], // width and height of the image in pixels
        shadowSize: [35, 20], // width, height of optional shadow image
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    let marker = L.marker(latlng, {
        icon: myIcon
    })
    marker.bindPopup(`<h3> Cloud Cover: </h3>${feature.properties.CloudCover}<br>
    <h3>Limiting Mag </h3> ${feature.properties.LimitingMag} `)
    //console.log(feature.geometry.coordinates)
    return marker
}


function createCustomIcon2(feature, latlng) {
    let myIcon2 = L.icon({
        iconUrl: 'icons/star.png',
        iconSize: [25, 25], // width and height of the image in pixels
        shadowSize: [35, 20], // width, height of optional shadow image
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    let marker2 = L.marker(latlng, {
        icon: myIcon2
    })
    marker2.bindPopup(`<h5> UT_datetime: </h5>${feature.properties.UT_datetime}<br>
    <h5>Brightness </h5> ${feature.properties.Brightness} <h5> Conditions </h5> ${feature.properties.Conditions} `)

    return marker2
}



// create an options object that specifies which function will called on each feature
let myLayerOptions = {
    pointToLayer: createCustomIcon
}

let mysqmLayerOptions = {
    pointToLayer: createCustomIcon2
}

// create the GeoJSON layer
let citiesatNight = L.geoJSON(GLOBEATNIGHT, myLayerOptions)
let sqm = L.geoJSON(SQM, mysqmLayerOptions)



let Stiegelreith = L.marker([47.238, 11.223]).bindPopup(
    `<h1>Standtort: Stiegelreith
        <img src= "images/eigeneAufnahmen/pano_innsbruck.jpg" height="200" width="600">`
);

let Innsbruck = L.marker([47.265351, 11.384622]).bindPopup(
    '<h1> Standtort: Innsbruck <img src = "images/innsbruck.png" height="400" width="600"> '
);

let Griesen = L.marker([47.478624, 10.937590]).bindPopup(
    '<h1> Standort: Griesen <img src="images/griesen.png" height="400" width="600">'
)



let Hotspots = L.layerGroup([Stiegelreith, Innsbruck, Griesen])

objBasemaps = {
    "osm": kartenLayer.osm,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Basemap Gelände": kartenLayer.bmapgelaende,
    "Black Marble 2012": kartenLayer.blackmarble2012,
    "Black Marble 2016": kartenLayer.blackmarble2016,
}

objOverlays = {
  //  "City Lights": citylights,
    "VIIRS_2019": kartenLayer.VIIRS_2019,
    "VIIRS_2018": kartenLayer.VIIRS_2018,
    "VIIRS_2017": kartenLayer.VIIRS_2017,
    "VIIRS_2016": kartenLayer.VIIRS_2016,
    "VIIRS_2015": kartenLayer.VIIRS_2015,
    "VIIRS_2014": kartenLayer.VIIRS_2014,
    "VIIRS_2013": kartenLayer.VIIRS_2013,
}

objOverlays2 = {
    "Hotspots": Hotspots,
    "Globe at Night": citiesatNight,
    "sqm": sqm,
    //  "GLobal Sky Quality Meter": sqm,
}

ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(karte);
ctlLayers2 = L.control.layers(objOverlays2).addTo(karte);

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
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}