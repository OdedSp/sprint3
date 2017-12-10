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
                    <div class="dropdown" :class="{'is-active': dropDownTag}">
                    <div class="dropdown-trigger" @click="dropDownTag = !dropDownTag">
                                    <button class="button" >
                                        <span>chose a tag</span>
                                        <span class="icon is-small">
                                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div class="dropdown-content">
                                        <a  class="dropdown-item" v-for="tag in placeToAdd.tags" @click="addTag(tag), dropDownTag = !dropDownTag">
                                        {{tag}}
                                        </a>
                                    </div>
                                </div>
                            <input type="text" v-model="placeToAdd.imgUrl" class="input" placeholder="add image url">
                    </div>  
            <div class="modal-card-foot">
                    <button form="add-place-form"  class="button">save</button>
                    <button class="button is-text" @click="closeModal">Cancel</button>
            </div>
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
            tags: []
        },
            dropDownTag : false
        }
    },
    methods: {
        addPlace() {
            this.newPlace
            this.$emit('addPlace', this.placeToAdd)
        },
        closeModal() {
            this.$emit('closeModal')
        },
        addTag(tag){
            this.placeToAdd.tags = tag
            console.log(this.placeToAdd.tags);
        }
    }
}

