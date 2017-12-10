export default {
    template: `
    <nav class="navbar">
    <div>  <router-link to="/" exact><h1>Appsus</h1></router-link> </div>
        <button class="button navbar-burger" @click="showLinks">
        <span></span>
        <span></span>
        <span></span>
        </button>       
<div class="nav-links" :class="{ mobile:  isLinks}" @click="showLinks">
        <router-link to="/" exact >Home</router-link>
        <router-link to="/notes">My Notes</router-link>
        <router-link to="/mail" >My Mail</router-link>
        <router-link to="/places" >My Places</router-link>
    </div>
</nav>
    `,
    data() {
        return {
            isLinks: false
        }
    },
    methods: {
        showLinks() {
            console.log(this.isLinks);
            this.isLinks = !this.isLinks
        }
    }
}