import PlaceService from '../services/PlaceService.js'
import GoogleMap from '../cmps/GoogleMap.js'
import MapService from '../services/MapService.js'
import PlaceDetailCmp from '../cmps/PlaceDetailCmp.js'

export default {
    template: `
    <div>
        <place-detail-cmp :currPlace="place" class="place-detail" @updatePlace="changePlace">
        </place-detail-cmp> 
            <div id="map"></div>
        </div>
        `,
    data() {
        return {
            place: {name:'loading your place',
                    desc:'..'},
        }
    },

    mounted() {
        // console.log('',this.$route.params.placeId);
        PlaceService.getPlaceById(+this.$route.params.placeId)
            .then(place => {
                this.place =   Object.assign({}, place)
                MapService.initMap(16,{lat : this.place.lat, lng : this.place.lng})
             })
            .catch(err => {
                console.log('reject, no place in', this.$route.params.placeId)
                // this.$router.push('/')
            })
    },
    methods: {
        changePlace(newPlace){
            PlaceService.savePlace(newPlace)
            .then(console.log('place cupdated'))
        }
    },
    components:{
    PlaceDetailCmp
    }
}