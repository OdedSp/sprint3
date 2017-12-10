export default {
    template: ` 
    <div class="place-list-wrapper">
            <div v-for="place in myPlaces" class="place-list">
            <p class="">📌 {{ place.desc }} </p>
        <span class="title"> {{ place.name }}</span>
       <p class="buttons-place"> <button @click="del(place.placeId)" class="button is-danger is-outlined">Delete ✕ </button>
        <router-link :to="'/places/' +  place.placeId" tag="button" class="button is-link">More Info</router-link>
        </p>
            </div>
    </div>
    `,
    props :['myPlaces']
    ,methods: {
        del (placeId){
            this.$emit('delPlace',placeId)
        }
    }
}

