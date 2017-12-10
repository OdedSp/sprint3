'use strict';

import myRoutes from './routes.js';

Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes });

var myVue = new Vue({
    el: '#app',
    template: `
        <section>
        <h1>Appsus</h1> 
        <nav>
            <router-link to="/" exact>Home</router-link>
            <router-link to="/notes" exact>My Notes</router-link>
            <router-link to="/mail" exact>My Mail</router-link>
            <router-link to="/places" exact>My Places</router-link>
        </nav>
        <router-view></router-view>  
        </section>    
    `,
    created() {

    },
    router: myRouter
})
