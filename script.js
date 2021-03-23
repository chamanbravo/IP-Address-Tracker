//Leaflet.js

var mymap = L.map('mapid').setView([27.677512, 85.331790], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
}).addTo(mymap);


const icon = L.icon({
    iconUrl: './images/icon-location.png',
    iconSize: [50, 55],
    iconAnchor: [23, 56],
    });

const marker = L.marker([27.677512, 85.331790],{icon: icon}).addTo(mymap);

//Ipify//
