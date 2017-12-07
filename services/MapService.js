const GOOGLE_KEY = 'AIzaSyCkW09cs2RDYMvyqpJBkZVQGkHjBi3R3VA';
var currCords = { lat: -25.363, lng: 131.044 };
var placeSearchedMap = {}

function setNewPlace(placeApi) {
    return {
        name: address_components[0].long_name,
        tags: address_components[0].types,
        desc: formatted_address,
        lat: geometry.location.lat,
        lng: geometry.location.lng
    }
}

function initMap(zoom, cords) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom || 4,
        center: cords || currCords
    });
    var marker = new google.maps.Marker({
        position: cords || currCords,
        map: map
    });
}

function getGeoByCords(cords) {
    return new Promise((resolve, reject) => {
        var get = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${cords.lat},${cords.lng}&location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_KEY}`)
            .then(function (res) {
                console.log('res', res);
                resolve(
                    {   
                        name: res.data.results[0].formatted_address,
                        tags: ['my place'],
                        desc: 'my currnet place',
                        lat: res.data.results[0].geometry.location.lat,
                        lng: res.data.results[0].geometry.location.lng
                    }
                )
            })
            .catch(function (error) {

            });
    })
}

function geoFindMe() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            currCords.lat = position.coords.latitude;
            currCords.lng = position.coords.longitude;
            initMap(16);
            resolve(currCords)
        }, () => {
            reject(console.log('Nemo -Plesae allow geo Location on your browser'))
        })
    })
}

function getGeoByAddress(placeSearched) {
    return new Promise((resolve, reject) => {
        var get = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${placeSearched}&key=${GOOGLE_KEY}`)
            .then(res => {
                currCords.lat = res.data.results[0].geometry.location.lat;
                currCords.lng = res.data.results[0].geometry.location.lng;
                placeSearchedMap = res.data.results[0]
                initMap(10);
                resolve({
                    name: res.data.results[0].address_components[0].long_name,
                    tags: res.data.results[0].address_components[0].types,
                    desc:  res.data.results[0].formatted_address,
                    lat:  res.data.results[0].geometry.location.lat,
                    lng:  res.data.results[0].geometry.location.lng
                })
            })
    })
}

export default {
    geoFindMe,
    initMap,
    getGeoByAddress,
    getGeoByCords
}