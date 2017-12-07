var places = [{desc : 'lorem ipsum bla bla',
name:'London',
    lat : 37.4224764,
    lng : -122.0842499,
    placeId : 1,
    tags : ['israel', 'sky'],
    },
    {
        name:'naaman',
   desc : 'lorem ipsum bla bla',
    lat : 37.4224764,
    lng : -122.0842499,
    placeId : 3,
    tags : ['israel', 'sky'],
    }
];

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
    if (places.length === 0) {
        genratePlaces()
    } 
        
    return new Promise((resolve, reject)=>{
        var findedPlace = places.find(place => place.placeId === placeId)
        if (findedPlace) {
            resolve(findedPlace)
        } else {
            reject('no place with this id')
        }             
    })    
}



function getPlaces() {
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
            var placeToUpdateIdx = places.findIndex(currPlace => currPlace.placeId === place.placeId)
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
    savePlace,
    getPlaceById
}