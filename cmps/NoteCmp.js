export default {
    template: `
    <section class="note-card">
    <h4> this is note card</h4>
            {{noteToRender}}
            <button  @click="noteTodelete(noteToRender.noteId)">  X </button>
            <router-link :to="'/note/' + noteToRender.noteId">More Info</router-link>
    </section>
    `,
    props:['noteToRender'],
    methods: {
        noteTodelete(noteId){
            this.$emit('noteTodelete',noteId)
        }
    }
}