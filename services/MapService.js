const GOOGLE_KEY = 'AIzaSyCkW09cs2RDYMvyqpJBkZVQGkHjBi3R3VA';
var currCords = {lat: -25.363, lng: 131.044};
var placeSearchedMap ={}

function initMap(zoom,cords) {
    var cords = cords || currCords
    console.log('',cords);
       var map = new google.maps.Map(document.getElementById('map'), {
           zoom: zoom || 4,
           center: cords
       });
       var marker = new google.maps.Marker({
           position: cords,
           map: map
       });
   }
   
function geoFindMe() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        console.log(position)
        currCords.lat = position.coords.latitude;
        currCords.lng = position.coords.longitude;
        initMap(16);
    }
    function error() {
        console.log('Plesae allow geo Location on your browser');
    }
}

function getGeoByAddress(placeSearched) {
    return new Promise((resolve, reject)=>{
    var get = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${placeSearched}&key=${GOOGLE_KEY}`)
    .then(res => {
        currCords.lat = res.data.results[0].geometry.location.lat;
        currCords.lng = res.data.results[0].geometry.location.lng;
            placeSearchedMap = res.data.results[0]
        initMap(10);
        resolve({
        name: res.data.results[0].address_components[0].long_name,
           tags: res.data.results[0].address_components[0].types,
           desc: res.data.results[0].formatted_address,
           lat: res.data.results[0].geometry.location.lat,
           lng: res.data.results[0].geometry.location.lng
                   })
        })
    })
}

export default{
    geoFindMe,
    initMap,
    getGeoByAddress
}