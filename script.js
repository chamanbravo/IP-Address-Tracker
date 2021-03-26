
const outputIp = document.querySelector(".ip-address");
const outputlocation = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const button = document.querySelector(".sumbit");
const userInput = document.querySelector(".myInput");

const icon = L.icon({
	    iconUrl: './images/icon-location.png',
	    iconSize: [50, 55],
	    iconAnchor: [23, 56],
	}
);

let mymap = '';
let marker = '';

//Ipify//
async function getMyIp(){
	const geoLocation = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_bOCEyrwTfQSxAHyZ7CypYXPaSQQXC`);
	const dataGeoLocation = await geoLocation.json();

	outputIp.innerHTML = dataGeoLocation.ip;
	outputlocation.innerHTML = `${dataGeoLocation.location.city}, ${dataGeoLocation.location.country}`;
	timezone.innerHTML = dataGeoLocation.location.timezone;
	isp.innerHTML = dataGeoLocation.isp;

	const lat = dataGeoLocation.location.lat;
    const lng = dataGeoLocation.location.lng;

	//Leaflet.js
	mymap = L.map('mapid').setView([lat, lng], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 20,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1
	}).addTo(mymap);

	marker = L.marker([lat, lng],{icon: icon}).addTo(mymap);

}


getMyIp();


const search = async () => {

    const geoLocation = await fetch (`https://geo.ipify.org/api/v1?apiKey=at_bOCEyrwTfQSxAHyZ7CypYXPaSQQXC&domain=${userInput.value}`);
    const dataGeoLocation = await geoLocation.json();

	outputIp.innerHTML = dataGeoLocation.ip;
	outputlocation.innerHTML = `${dataGeoLocation.location.city}, ${dataGeoLocation.location.country}`;
	timezone.innerHTML = dataGeoLocation.location.timezone;
	isp.innerHTML = dataGeoLocation.isp;

	const lat = dataGeoLocation.location.lat;
    const lng = dataGeoLocation.location.lng;

    //Leaflet.js
    var container = L.DomUtil.get('mapid');
		if(container != null){
		mymap.remove();
	}

    mymap = L.map('mapid').setView([lat, lng], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 20,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1
	}).addTo(mymap);

	marker = L.marker([lat, lng],{icon: icon}).addTo(mymap);

};


button.addEventListener('click', () => {
	search();
});


