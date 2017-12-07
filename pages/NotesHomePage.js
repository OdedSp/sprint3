import NoteService from '../services/NoteService.js'
import NoteCmp from '../cmps/NoteCmp.js'
import AddNoteModal from '../cmps/AddNoteModal.js'

export default {
    template: `
        <section>
        <h2> Mister Keeper HomePage </h2>
        <button @click="addNoteModal = !addNoteModal">Add Your Note</button>
            <add-note-modal v-if="addNoteModal" @addNewNote="addNote"></add-note-modal>
            <note-cmp v-for="note in notes" :noteToRender="note" @noteTodelete="delNote"></note-cmp>
        </section>
    
    `,
    data() {
        return {
                notes: ['no notes yet'],
                addNoteModal: false,
                newNote: null
        }
    },
    created() {
        NoteService.getNotes()
        .then (notes => this.notes = notes )

    },
    methods: {
        delNote (noteId){
            NoteService.delNote(noteId) 
        },
        addNote(newNote){
            NoteService.addNote(newNote)
            .then( this.addNoteModal = !this.addNoteModal)
        }
    },
    computed : {
       
    },
    components: {
        NoteCmp,
        AddNoteModal
    }
}