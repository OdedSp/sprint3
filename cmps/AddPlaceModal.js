export default {
    template: ` <section class="add-place-modal">
    <h1>add-place-modal</h1>
    <input type="text" v-model="placeToAdd.name">
    tags:<input list="placeTag" />
    <datalist id="placeTag">
     <option @change="addTag(tag)" v-for="tag in placeToAdd.tags" :value="tag"></option>
    </datalist>
    <textarea v-model="placeToAdd.desc">add desc</textarea> 
    <span>lat: <input type="number" v-model="placeToAdd.lat" disabled class="disabled-input"></span>
    <span>lng: <input type="number" v-model="placeToAdd.lng" disabled class="disabled-input"></span>
    <button @click="addPlace">save</button>
    </section>
    `,
    props: ['placeToAdd'],
    data() {
        return {
            newPlace: { name:'',
            desc: '',
            lat:0,
            lng:0,
            tags: ['israel']}
        }
    },
    methods: {
        addPlace() {
            this.newPlace
            this.$emit('addPlace', this.placeToAdd)
        },
    }
}

