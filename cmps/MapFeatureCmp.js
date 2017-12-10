export default {
    template: ` <section class="wraper map-feature">
    <button @click="geoFindMe" class="button is-link is-outlined">📌 Me</button>
    <form @submit.prevent="getGeoByAddress" class="wraper">
         <input type="text" v-model="searchInput"  class="input search-input"  @input="getSearchRes">
         <button class="button is-info">search</button>
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
        },
        getSearchRes(){
            this.$emit('search')
        }
    },
    computed: {
    }
}