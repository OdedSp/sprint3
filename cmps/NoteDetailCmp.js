export default {
    template: `
    <section class="note-detail"  :class="{editing: !isEdit}">
        <span @click="setEditMode" v-if="isEdit"> edit {{note.noteId}} note</span>
        <span @click="setEditMode" v-else> done edit</span>
   <div> <h3><input type="text" v-model="note.title" :disabled="isEdit">{{note.date}}</h3></div>
    <hr>
    <textarea v-model="note.text" rows="5" cols="40" :disabled="isEdit"></textarea>
    <p>priority:<input type="number" v-model="note.priority" :disabled="isEdit"></p>
    <img :src="note.imgUrl">
    </section>
    `,
    props: ['note'],
    data () {
        return {
            isEdit:true,
        }
    },
    methods: {
        setEditMode(){
            this.isEdit = !this.isEdit
            this.$emit('updateNote', this.note);
        }
    }
}