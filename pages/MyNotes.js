import NoteService from '../services/NoteService.js'
import NoteCmp from '../cmps/NoteCmp.js'
import AddNoteModal from '../cmps/AddNoteModal.js'

'use strict'
export default {
    template: `
            <section>
            <div class="notes-panel">
                <button @click="isModal" class="button is-primary">Add a New Note</button>
                <button @click="sortByTime" class="button is-primary">sortByTime</button>
                <button @click="sortByPriority" class="button is-primary">sortByPriority</button>
            </div>
                <add-note-modal v-if="addNoteModal" @addNewNote="addNote" @closeModal="isModal"></add-note-modal>
                <note-cmp :notesToRender="notes" @noteTodelete="delNote"></note-cmp>
            </section>
        
        `,
    data() {
        return {
            notes: ['no notes yet'],
            addNoteModal: false,
            newNote: null,
            sortUp: false
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
        },
        sortByTime(){
            this.notes.sort((a, b) => {
                console.log(a.time);
                if (this.sortUp) {  return  b.time - a.time}
                else { return  a.time - b.time}
            });  
            this.sortUp = !this.sortUp
        },
        sortByPriority(){
            this.notes.sort( (a, b) => {
                if (this.sortUp) {  return  b.priority - a.priority}
                else { return  a.priority - b.priority}
            });  
            this.sortUp = !this.sortUp
        }
    },
    computed: {

    },
    components: {
        NoteCmp,
        AddNoteModal
    }
}