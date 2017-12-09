
import EventBusService, {MAP_CLICKED} from './EventBusService.js'
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
    map.addListener('click', function (e) {
        addCLieckedPlace(e.latLng, map);
    });
}

function addCLieckedPlace(latLng, map) {
    var cords = {lat: latLng.lat() ,lng: latLng.lng()}  
    EventBusService.$emit(MAP_CLICKED, cords)
};


function getGeoByCords(cords) {
    return new Promise((resolve, reject) => {
        var get = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${cords.lat},${cords.lng}&location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_KEY}`)
            .then(function (res) {
                console.log('res', res.data.status === "ZERO_RESULTS");
                if (res.data.status === "ZERO_RESULTS") resolve({ lat: cords.lat, lng: cords.lng })
                else {
                    resolve(
                        {
                            name: res.data.results[0].formatted_address,
                            tags: ['my place'],
                            desc: 'my currnet place',
                            lat: res.data.results[0].geometry.location.lat,
                            lng: res.data.results[0].geometry.location.lng
                        }
                    )
                }
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
                    desc: res.data.results[0].formatted_address,
                    lat: res.data.results[0].geometry.location.lat,
                    lng: res.data.results[0].geometry.location.lng
                })
            })
    })
}

export default {
    geoFindMe,
    initMap,
    getGeoByAddress,
    getGeoByCords,
    addCLieckedPlace
}