let karte = L.map('map', {
    center: [47.238, 11.22],
    zoom: 10
});

const hash = new L.Hash(karte);

var kartenLayer = {
    VIIRS_2019: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2019',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2018: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2018',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2017: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2017',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2016: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2016',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2015: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2015',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2014: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2014',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>',
        opacity: 0.5,
    }),
    VIIRS_2013: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2013',
        attribution: 'Map tiles by <a href="https://www.lightpollutionmap.info">lightpollutionmap.info</a>'
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
    NNASAGIBS_ViirsEarthAtNight2012: L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    })
};

karte.addLayer(
    kartenLayer.osm,
);

new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true,
        minimized: true
    }
).addTo(karte);





function createCustomIcon(feature, latlng) {
    let myIcon = L.icon({
        iconUrl: 'images/milky_way.jpg',
        iconSize: [25, 25], // width and height of the image in pixels
        shadowSize: [35, 20], // width, height of optional shadow image
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 6], // anchor point of the shadow. should be offset
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    let marker =  L.marker(latlng, {
        icon: myIcon
    })
    marker.bindPopup(`<h3> Cloud Cover: </h3>${feature.properties.CloudCover}<br>
    <h3>Limiting Mag </h3> ${feature.properties.LimitingMag}`)
   // console.log(feature)
    return marker
}


// create an options object that specifies which function will called on each feature
let myLayerOptions = {
    pointToLayer: createCustomIcon
}
// create the GeoJSON layer
let citiesatNight = L.geoJSON(GLOBEATNIGHT, myLayerOptions)



let Stiegelreith = L.marker([47.238, 11.223]).bindPopup(
    `<h1>Standtort: Stiegelreith
        <img src="images/milky_way.jpg">`
);
let Innsbruck = L.marker([47.265351, 11.384622]).bindPopup('Innsbruck');




let Hotspots = L.layerGroup([Stiegelreith, Innsbruck])

objBasemaps = {

    "osm": kartenLayer.osm,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Basemap Gelände": kartenLayer.bmapgelaende,
    "NASA Provider": kartenLayer.NNASAGIBS_ViirsEarthAtNight2012,
};

objOverlays = {
    "Hotspots": Hotspots,
    "Globe at Night": citiesatNight,
    "VIIRS_2019": kartenLayer.VIIRS_2019,
    "VIIRS_2018": kartenLayer.VIIRS_2018,
    "VIIRS_2017": kartenLayer.VIIRS_2017,
    "VIIRS_2016": kartenLayer.VIIRS_2016,
    "VIIRS_2015": kartenLayer.VIIRS_2015,
    "VIIRS_2014": kartenLayer.VIIRS_2014,
    "VIIRS_2013": kartenLayer.VIIRS_2013,
}

ctlLayers = L.control.layers(objBasemaps, objOverlays).addTo(karte);

karte.addControl(new L.Control.Fullscreen());

let karte2 = L.map(`map2`).setView(new L.LatLng(0,0), 0); 

L.tileLayer.zoomify(`images/TileGroup`, { 
            width: 5472, 
            height: 3648,
            tolerance: 0.8,
            attribution: 'Photo: Bjørn Sandvik'
        }).addTo(karte2);
