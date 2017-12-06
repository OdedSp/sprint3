'use strict';

<<<<<<< HEAD
import myRoutes from '/routes.js';
=======
import myRoutes from './routes.js';
>>>>>>> 65577baa0cfdea620972f6d9a1d7181a5ee961d4

Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes });

var myVue = new Vue({
<<<<<<< HEAD
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
=======
    template: `
        <section>
        <nav>
        <router-link to="/" exact>Home</router-link>
        <router-link to="/Place-Mangment">My Place Mangment</router-link>
    </nav>
    <router-view></router-view>           
</section>
        </section>    
        `,
    created() {
        console.log('sprint3- main');
    },
    router: myRouter,
}).$mount('#app')
>>>>>>> 65577baa0cfdea620972f6d9a1d7181a5ee961d4
