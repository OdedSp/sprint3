import NoteService from '../services/NoteService.js'
import NoteCmp from '../cmps/NoteCmp.js'
import AddNoteModal from '../cmps/AddNoteModal.js'

export default {
    template: `
            <section>
            <button @click="isModal" class="button is-primary">Add a New Note</button>
                <add-note-modal v-if="addNoteModal" @addNewNote="addNote" @closeModal="isModal"></add-note-modal>
                <note-cmp :notesToRender="notes" @noteTodelete="delNote"></note-cmp>
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
            .then(notes => this.notes = notes)
    },
    methods: {
        delNote(noteId) {
            NoteService.delNote(noteId)
        },
        addNote(newNote) {
            console.log('adding',newNote);
        
            NoteService.addNote(newNote)
                .then(note => this.addNoteModal = !this.addNoteModal)
                .catch(err => console.log(err))
        },
        isModal(){
            this.addNoteModal = !this.addNoteModal
        }
    },
    computed: {

    },
    components: {
        NoteCmp,
        AddNoteModal
    }
}