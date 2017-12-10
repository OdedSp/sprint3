import EventBusService, { MAP_CLICKED } from './EventBusService.js'
import PlaceService from './PlaceService.js'

const GOOGLE_KEY = 'AIzaSyCkW09cs2RDYMvyqpJBkZVQGkHjBi3R3VA';
var currCords = { lat: 32.0877246, lng: 34.8031935 };
var placeSearchedMap = {}
var map;

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

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom || 14,
        center: cords || currCords
    });
    map.addListener('click', function (e) {
        addCLieckedPlace(e.latLng, map);
        addMarker(e.latLng);
    });

    function addMarker(location) {
        console.log('location',location);
        var marker = new google.maps.Marker({
          position: location,
          label: 'Temp',
          map: map,
          animation: google.maps.Animation.DROP
        });
      }

  
    PlaceService.getPlaces()
        .then(places => {
             places.forEach(place => {
                 var marker = new google.maps.Marker({
                    position: { lat: place.lat, lng: place.lng },
                    map: map,
                    icon: setIcon(place),
                    label:place.name,
                    animation: google.maps.Animation.BOUNCE,
                    title:  place.desc || ''
                })
            
                marker.addListener('click', function () {
                    console.log('place',place);
                });
            })
        })
}

function markerCLicked(e) {
    console.log(e);
}

function setIcon(place) {
    console.log(place.tags);
    return {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      }
}

// function _setMarkers(map) {
//     PlaceService.getPlaces()
//         .then(places => {
//             console.log('places', places);
//              places.map(place => {
//                  var marker = new google.maps.Marker({
//                     position: { lat: place.lat, lng: place.lng },
//                     map: map,
//                     title: place.name,
//                     label: place.desc || 'my-place',
//                     animation: google.maps.Animation.BOUNCE
//                 },)
//             })
//         })
// }

function addCLieckedPlace(latLng, map) {
    var cords = { lat: latLng.lat(), lng: latLng.lng() }
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
                            tags: ['fun', 'food', 'vacation', 'important'],
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
            // initMap(16);
            map.panTo(currCords)
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
                // initMap(14);
                map.panTo(currCords)
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

function autoComplete() {
    var input = document.querySelector('.search-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    
}


export default {
    geoFindMe,
    initMap,
    getGeoByAddress,
    getGeoByCords,
    addCLieckedPlace,
    autoComplete
}