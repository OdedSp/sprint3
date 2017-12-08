import NoteService from '../services/NoteService.js'
import NoteDetailCmp from '../cmps/NoteDetailCmp.js'
export default {
    template: `<section>
    <note-detail-cmp :note="noteToDisplay" @updateNote="updateNote">
    </note-detail-cmp>
    </section>
    `,
    components: {
        NoteDetailCmp
    },
    data() {
        return {
            noteId : +this.$route.params.noteId,
                noteToDisplay: {title:'getting your note..',                
                            imgUrl:'../img/spinner.png'},
            isEdit: false
        }
    },
    created() {
        NoteService.getNoteById(+this.$route.params.noteId)
        .then (note => {
            // console.log({note})
            this.noteToDisplay = note} )
    },
    methods:{
        updateNote(noteUpdated){
            NoteService.updateNote(noteUpdated)
        }
    }
}