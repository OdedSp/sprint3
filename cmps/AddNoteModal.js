export default {
    template: `
    <section class="add-note">
    <form @submit.prevent="addNote">
            add title:<input type="text" placheholer="note title" v-model="newNote.title"/>
            <textarea  v-model="newNote.txt" rows="4" cols="20">add your notes..</textarea>  
            <label><input type="radio" value="red" v-model="newNote.color">
            red</label>
            <label><input type="radio" value="blue" v-model="newNote.color">
            blue</label>
             
            priority: <select v-model="newNote.priority">
            <option value="1">very low</option>
            <option value="2">low</option>
            <option value="3">o.k</option>
            <option value="4">high</option>
            <option value="5">very high</option>
          </select>       
          <button>add your note</button>   
            </form>
    </section>
    `,
    props: ['value'],
    data (){
        return { newNote :{
            title:'',
            text:'aaaaa',
            color: null,
            time: '11:30',
            priority: 5
        }
        }
    },
    methods: {
        addNote() {
            this.$emit('addNewNote', this.newNote);
        }
    }
}