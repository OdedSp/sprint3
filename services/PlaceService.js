const GOOGLE_KEY = 'AIzaSyCkW09cs2RDYMvyqpJBkZVQGkHjBi3R3VA';
var places = [{},{}];
function initMap() {
     var myLatlng = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatlng
        });
        // var marker = new google.maps.Marker({
        //     position: gUserCords,
        //     map: map
        // });
    }
    

function genratePlace() {
    return {
        name:'',
        desc: '',
        mapId: _getNextId(),
        photos: [],
        lat:0,
        lng:0,
        tags: [fun, work],
    }
}
function _getNextId(){
    var maxId = places.reduce((acc, place) => {
    return (place.mapId > acc) ? place.mapId : acc
}, 0);
return maxId + 1;
}

function genratePlaces() {
    places.forEach((place,idx) => {
        place.name = 'Lorem',
        place.desc = 'lorem ipsum bla bla',
        place.lat = 37.4224764+idx,
        place.lng = -122.0842499*idx
    } )
}

function getPlaces() {
    genratePlaces()
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(places) }, 500)
    });
}


export default{
    getPlaces,
    genratePlace,
    initMap
}