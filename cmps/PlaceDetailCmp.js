export default {
    template: ` 
    <div  :class="{editing: !isEdit}">
    <button @click="setEditMode">Edit</button>
    <button v-if="!isEdit" @click="updatePlace">Save</button>
   <h2><input type="text" :disabled="isEdit" v-model="currPlace.name"/></h2>
  description: <textarea :disabled="isEdit" v-model="currPlace.desc"></textarea>
   <p v-if="isEdit">Tags:
   <span v-for="tag in currPlace.tags"> {{tag}},</span></p>
   <p>Tags:<input type="text" v-model="currPlace.tags" v-if="!isEdit"></p>
   </div>
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
    