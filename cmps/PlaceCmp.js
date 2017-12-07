export default {
    template: ` 
    <div class="place-card">
        <ul>
            <li v-for="place in myPlaces">
        {{ place.name }}
        {{ place.desc }}
        {{ place.lat }}   |      {{ place.lng }} 
        <button @click="del(place.placeId)">Del</button>
        <router-link :to="'/places/' +  place.placeId" tag="button">More Info</router-link>
            </li>
        </ul>
    </div>
    `,
    props :['myPlaces']
    ,methods: {
        del (placeId){
            this.$emit('delPlace',placeId)
        }
    }
}

