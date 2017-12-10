export default {
    template: `
    <section class="note-detail content"  :class="{editing: !isEdit}">
    <span class="modal-card-head" :class="'card-' + note.color">Note {{note.noteId}}</span>
        <h1><input type="text" v-model="note.title" :disabled="isEdit"><time>{{note.date}}</time></h1>
    <p ><textarea v-model="note.text" rows="5" cols="40" :disabled="isEdit"></textarea></p>
    <p><span v-for="priorit in note.priority">🎌</span></p>
    <img :src="note.imgUrl">
    <span @click="setEditMode" v-if="isEdit" class="button is-primary is-outlined" > edit {{note.noteId}} note</span>
    <span @click="setEditMode" class="button is-primary is-danger" v-else> done edit</span>
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