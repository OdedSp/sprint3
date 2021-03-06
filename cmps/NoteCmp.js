export default {
    template: `
    <section class="note-card">
    <div class="card one-card" v-for="note in notesToRender">
        <header class="card-header" :class="'card-' + note.color">
            <p class="card-header-title">
                {{note.title}}
            </p>
            <span v-for="priorit in note.priority">🎌</span>
        </header>
        <div class="card-content">
        <div class="content">
            <p class="subtitle">
                {{note.text}}
             </p>
             <time>created: about   {{note.date}}</time>
        </div>
        </div>
        <div class="card-footer">
            <p class="card-footer-item"> <span>
                <button  @click="noteTodelete(note.noteId)"  class="button is-danger">  🗑 </button>
            </span></p>
                <p class="card-footer-item"><span>
                <router-link :to="'/note/' + note.noteId" class="button is-link">More Info</router-link>
                 </span> </p>
        </div>
          </div>
    </section>
    `,
    props: ['notesToRender'],
    methods: {
        noteTodelete(noteId) {
            this.$emit('noteTodelete', noteId)
        }
    }
}