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
        <p class="color-picker-wrapper" >    
            <label  class="card-red color-picker"><input type="radio" value="red" v-model="newNote.color">
            red</label>
            <label  class="card-blue color-picker"><input type="radio" value="blue" v-model="newNote.color">
            blue</label>
            <label  class="card-green color-picker"><input type="radio" value="green" v-model="newNote.color">
            green</label>
            <label  class="card-cyan color-picker"><input type="radio" value="cyan" v-model="newNote.color">
            cyan</label>
            <label  class="card-yellow color-picker"><input type="radio" value="yellow" v-model="newNote.color">
            yellow</label>
        </p>
        <p>            priority: <select v-model="newNote.priority" form="add-note-form" class="select">
            <option value=1>very low</option>
            <option value=2>low</option>
            <option value=3>o.k</option>
            <option value=4>high</option>
            <option value=5>very high</option>
          </select>  </p>
        </section>


        
        <div class="modal-card-foot"> 
        <button class="button is-success" form="add-note-form">Save your Note</button> 
            <button class="button delete" @click="close" >Cancel</button>  
        </div>
    
    </div>
    </section>
    `,
    props: ['value'],
    data (){
        return { newNote :{
            title:'',
            text:'',
            color: 'yellow',
            date: '11:30',
            priority: 5,
            time: new Date
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