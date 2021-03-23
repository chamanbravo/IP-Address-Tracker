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

const getIpAddress = async function(userInput = ``) {
    try {
        let fetchedData;
        const checkDomainRegex = /https:|www|.com/gi;
        const isDomain = userInput.search(checkDomainRegex);

        if(isDomain < 0) fetchedData = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ipzjlV2A3Z9bPVqxPO1v8xUrITfzD&ipAddress=${userInput}`);
        if(isDomain >= 0) fetchedData = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ipzjlV2A3Z9bPVqxPO1v8xUrITfzD&domain=${userInput}`);
        if(!userInput) fetchedData = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ipzjlV2A3Z9bPVqxPO1v8xUrITfzD`);
        if(!fetchedData.ok) {
            throw new Error(`Enter a valid Domain or IP`);
        }

        const userData = await fetchedData.json();

        const {lat, lng, city, country, postalCode, timezone} = userData.location;
        const location = [lat, lng];
        const userInfoArr = [userData.ip, `${country}, ${city} ${postalCode}`, `UTC ${timezone}`, userData.isp];

        allInfos.forEach((info, i) => {
            infoLoaders[i].style.display = 'none'
            info.innerText = userInfoArr[i];
        });
        ipdetails.style.display = 'flex';
        loader.style.display = 'none';
        mapEL.style.display = 'block';
        errorInfo.style.display = 'none'
        if(!userInput) mapLoader(location);
        if(userInput) {
            iconLoader(location);
            map.setView(location, 13, {
                animate: true,
                pan: {
                    duration: 1,
                }}
            )
        }
    } catch(err) {
        ipdetails.style.display = 'none'
        errorInfo.style.display = 'block';
        errorInfo.innerHTML = `<p>${err.message}</p>`;
        mapEL.style.display = 'none'
    }
}
getIpAddress();
searchBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    const searchInput = searchBar.value;
    if(!searchInput) return;
    searchBar.value = ``;
    errorInfo.style.display = 'none'
    loader.style.display = 'flex';
    mapEL.style.display = 'none';
    ipdetails.style.display = 'flex'
    infoLoaders.forEach((load, i) => {
        load.style.display = `inline-block`
        allInfos[i].textContent = ``;
    });
    getIpAddress(searchInput);
})