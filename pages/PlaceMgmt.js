import PlaceService from '../services/PlaceService.js'
import GoogleMap from '../cmps/GoogleMap.js'
import PlaceCmp from '../cmps/PlaceCmp.js'

export default {
    template: `
        <section>
        <h1> place Mgmt</h1>
        <google-map></google-map>
            <place-cmp :myPlaces="places">
            </place-cmp>
            
        </section>
        `,
    components: {

    },
    data() {
        return {
            places: []
        }
    }, created() {
        PlaceService.getPlaces()
            .then(places => this.places = places)
    },
    components:{
        GoogleMap,
        PlaceCmp
    },
    mounted: function () {
        PlaceService.initMap()
    }
}