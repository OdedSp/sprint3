export default {
    template: ` <section class="add-place-modal modal">
    <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                    <p class="modal-card-title">adding {{placeToAdd.name}}</p>
            </header>
            <div class="modal-card-body">
                <form  @submit.prevent="addPlace" id="add-place-form">
                    <input type="text" v-model="placeToAdd.name" class="input" required >
                </form>
                    <textarea v-model="placeToAdd.desc" class="textarea" placeholder="add your description"></textarea> 
                        <span>lat: <input type="number" v-model="placeToAdd.lat" disabled class="disabled-input cords"></span>
                        <span>lng: <input type="number" v-model="placeToAdd.lng" disabled class="disabled-input cords"></span>
                    <div>
                            <datalist id="placeTag">
                            <option @change="addTag(tag)" v-for="tag in placeToAdd.tags" :value="tag" class="input"></option>
                            <p> tags:<input list="placeTag" />
                            </p>
                            </datalist>
                    </div>  
            <footer class="modal-card-foot">
                    <button form="add-place-form"  class="button">save</button>
                    <button class="button is-text" @click="closeModal">Cancel</button>
            </footer>
        </div>
    </div>
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
        closeModal() {
            this.$emit('closeModal')
        }
    }
}

