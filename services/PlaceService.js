var places = [{},{}];


function genratePlace() {
    return {
        name:'',
        desc: '',
        placeId: _getNextId(),
        photos: [],
        lat:0,
        lng:0,
        tags: [fun, work],
    }
}
function _getNextId(){
    var maxId = places.reduce((acc, place) => {
    return (place.placeId > acc) ? place.placeId : acc
            }, 0);
    if (!maxId) return 101
    else return maxId + 1;
}

function getPlaceById(placeId) {
    return new Promise((resolve, reject)=>{
        var findedPlace = places.find(place => place.placeId === placeId)
        if (findedPlace) resolve(findedPlace)
        else reject();
    })   
}
function genratePlaces() {
    places.forEach((place,idx) => {
        place.name = 'Lorem',
        place.desc = 'lorem ipsum bla bla',
        place.lat = 37.4224764+idx,
        place.lng = -122.0842499*idx
        place.placeId = _getNextId()
    } )
}

function getPlaces() {
    genratePlaces()
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(places) }, 500)
    });
}

function removePlace(placeId) {
    return new Promise((resolve, reject)=>{
        var placeId = places.findIndex(place => place.placeId === placeId)
        places.splice(placeId, 1);
        resolve()
    });
}

function savePlace(place) {
    console.log('adding place', place);
    return new Promise((resolve, reject)=>{
        if (place.placeId) {
            var placeToUpdateIdx = places.findIndex(currPlace => currPlace .placeId === place.placeId)
            place.splice(placeToUpdateIdx, 1, place);
        }  else {
            place.placeId = _getNextId();
            places.push(place);
        }
        resolve(place)
        // reject('failed to save/update place')
    });
}


export default{
    getPlaces,
    genratePlace,
    removePlace,
    savePlace
}