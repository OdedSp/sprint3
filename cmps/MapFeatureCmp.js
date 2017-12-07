export default {
    template: ` <section>
    <button @click="geoFindMe">geoFindMe</button>
    <form @submit.prevent="getGeoByAddress">
         <input type="text" v-model="searchInput">
    </form>
    </section>
    `,
    data (){
        return{
            searchInput:null,
            searched:false,
        }
    },
    props:  [],
    methods: {
        geoFindMe(){
            this.$emit('geoFindMe')
        },
        getGeoByAddress(){
            this.$emit('searchPlace', this.searchInput)
        },
        addPlace(){
            this.$emit('addPlace')
        }
    },
    computed: {
    }
}