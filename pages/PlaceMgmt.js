import MapService from '../services/MapService.js'
import PlaceService from '../services/PlaceService.js'
import GoogleMap from '../cmps/GoogleMap.js'
import PlaceCmp from '../cmps/PlaceCmp.js'
import MapFeatureCmp from '../cmps/MapFeatureCmp.js'
import AddPlaceModal from '../cmps/AddPlaceModal.js'

export default {
    template: `
        <section> 
        <h1> place Mgmt-new branch</h1>
        <map-feature-cmp  @geoFindMe="geoFindMe"
         @searchPlace="getGeoByAddress">
        </map-feature-cmp>
        <button @click="addingPlace = !addingPlace" v-if="placeSearchedMap">save to my places</button>
        <add-place-modal v-if="addingPlace" :placeToAdd="placeSearchedMap" @addPlace="addNewPlace"></add-place-modal>
        <google-map></google-map>
            <place-cmp :myPlaces="places" @delPlace="removePlace">
            </place-cmp>
            
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
    computed :{
    },
    components:{
        GoogleMap,
        PlaceCmp,
        MapFeatureCmp,
        AddPlaceModal
    },
    methods:{
        geoFindMe(){
            MapService.geoFindMe()
        },
        removePlace(placeId){
            PlaceService.removePlace(placeId)
        },
        getGeoByAddress(searchInput){
            MapService.getGeoByAddress(searchInput)
            .then(placeSearchedMap => {
                this.placeSearchedMap =   Object.assign({}, placeSearchedMap)
                // console.log('get place from servie', this.placeSearchedMap);
            })
        },
        addNewPlace(newPlace){
            PlaceService.savePlace(newPlace)
        }
    },
    mounted: function () {
        MapService.initMap()
    }
}