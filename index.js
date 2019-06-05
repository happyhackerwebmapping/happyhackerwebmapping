let karte = L.map('karte')

var kartenLayer = {
    VIIRS_2019: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2019',
    }),
    VIIRS_2014: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2014',
        attribution: 'Map tiles by <a href="https://data.linz.govt.nz/layer/2343-nz-mainland-topo50-gridless-maps/">CC BY 4.0 Land Information New Zealand</a>'
    }),
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
        subdomains: ["a", "b", "c"], //Server
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    VIIRS_2013: L.tileLayer.wms("https://www.lightpollutionmap.info/geoserver/gwc/service/wms?", {
        layers: 'PostGIS:VIIRS_2013',
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
    }),
};

karte.addLayer(
    kartenLayer.stamen_terrain
);

L.control.layers({
    "VIIRS_2019": kartenLayer.VIIRS_2019,
    "osm": kartenLayer.osm,
    "VIIRS_2014": kartenLayer.VIIRS_2014,
    "VIIRS_2013": kartenLayer.VIIRS_2013,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Basemap Gelände": kartenLayer.bmapgelaende,
}).addTo(karte);