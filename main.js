'use strict';
import NavCmp from './cmps/NavCmp.js'

import myRoutes from './routes.js';

Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes });

var myVue = new Vue({
    el: '#app',
    template: `
        <section>
        <nav-cmp>
        </nav-cmp>
        <router-view></router-view>  
        <footer> coffee rights Nemo & Oded</footer>
        </section>    
    `,
    created() {

    },
    components: {
        NavCmp
    },
    router: myRouter
})
