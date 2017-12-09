import MapService from '../services/MapService.js'
import PlaceService from '../services/PlaceService.js'
import GoogleMap from '../cmps/GoogleMap.js'
import PlaceCmp from '../cmps/PlaceCmp.js'
import MapFeatureCmp from '../cmps/MapFeatureCmp.js'
import AddPlaceModal from '../cmps/AddPlaceModal.js'

export default {
    template: `
        <section class="wraper"> 
        <div class="my-place card">
        <place-cmp :myPlaces="places" @delPlace="removePlace">
        </place-cmp>
        <map-feature-cmp  @geoFindMe="geoFindMe" 
         @searchPlace="getGeoByAddress">
        </map-feature-cmp>
        <button @click="addingPlaceModal" v-if="placeSearchedMap" class="button is-primary save-place">save to my places</button>
        <add-place-modal v-if="addingPlace" :placeToAdd="placeSearchedMap" @addPlace="addNewPlace" @closeModal="addingPlaceModal"></add-place-modal>
        <google-map class="card-image"></google-map>

        </div> 
        </section>
        `,
    components: {
        MapFeatureCmp,
        AddPlaceModal,
        PlaceCmp
    },
    data() {
        return {
            places: [],
            placeSearchedMap: '',
            addingPlace: false
        }
    },
    created() {
        PlaceService.getPlaces()
            .then(places => this.places = places)
    },
    computed: {
    },
    components: {
        GoogleMap,
        PlaceCmp,
        MapFeatureCmp,
        AddPlaceModal
    },
    methods: {
        addingPlaceModal(){
            this.addingPlace = !this.addingPlace
        },
        geoFindMe() {
            MapService.geoFindMe()
            .then(newPosition => {
                console.log('newPosition',newPosition)
                MapService.getGeoByCords(newPosition)
                    .then(newPlace => {
                        console.log('1111', newPlace);
                        this.placeSearchedMap = Object.assign({}, newPlace)
                })
            })       
        },
        removePlace(placeId) {
            PlaceService.removePlace(placeId)
        },
        getGeoByAddress(searchInput) {
            MapService.getGeoByAddress(searchInput)
                .then(placeSearchedMap => {
                    this.placeSearchedMap = Object.assign({}, placeSearchedMap)
                })
        },
        addNewPlace(newPlace) {
            PlaceService.savePlace(newPlace)
            this.addingPlace = false
        }
    },
    mounted: function () {
        MapService.initMap()
    }
}