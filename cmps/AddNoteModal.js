export default {
    template: `
    <section class="add-note modal is-active" >
<div class="modal-background"  @click="close"></div>
    <div class="modal-card">
        <header class="modal-card-head">
        <form @submit.prevent="addNote" id="add-note-form" class="modal-card-title"> 
           <p><input type="text" placeholder="add a title" v-model="newNote.title" class="input" autofocus/></p>
            </form> 
        </header>
        <section class="modal-card-body">
            <textarea  v-model="newNote.text" form="add-note-form"  placeholder="add your notes." class="textarea is-info"></textarea>  
            <label><input type="radio" value="red" v-model="newNote.color">
            red</label>
            <label><input type="radio" value="blue" v-model="newNote.color">
            blue</label>
        <p>            priority: <select v-model="newNote.priority" form="add-note-form" class="select">
            <option value=1>very low</option>
            <option value=2>low</option>
            <option value=3>o.k</option>
            <option value=4>high</option>
            <option value=5>very high</option>
          </select>  </p>
        </section>


        
        <footer class="modal-card-foot"> 
        <button class="button is-success" form="add-note-form">Save your Note</button> 
            <button class="button delete" @click="close" >Cancel</button>  
        </footer>
    
    </div>
    </section>
    `,
    props: ['value'],
    data (){
        return { newNote :{
            title:'',
            text:'',
            color: null,
            time: '11:30',
            priority: 5
        }
        }
    },
    methods: {
        addNote() {
            this.$emit('addNewNote', this.newNote);
        },
        close(){
            this.$emit('closeModal')
        }
    }
}