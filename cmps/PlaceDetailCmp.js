export default {
    template: ` <section>
    <div class="place-deatil card">
        <div  :class="{editing: !isEdit}"  class="content">
            <h2><input type="text" :disabled="isEdit" v-model="currPlace.name"/></h2>
                <textarea :disabled="isEdit" v-model="currPlace.desc"></textarea>
            <p>Tags:
            <span v-for="tag in currPlace.tags"> {{tag}}</span></p>
            <p v-if="!isEdit"> add tags:<input type="text"></p>
        </div>
        <form @submit.prevent="updatePlace">  <button v-if="!isEdit"class="button" autofocus>Change Place</button></form>
    </div>
    <button @click="setEditMode" class="button edit-btn">Edit {{currPlace.placeId}}</button>
   </section>
    `,
    props: ['currPlace']
    , methods: {
        setEditMode(){
            this.isEdit = !this.isEdit
        },
        updatePlace(){
            this.$emit('updatePlace', this.currPlace);
            this.isEdit = !this.isEdit
        }
    },
    data(){
        return{isEdit : true}
    }
}
    