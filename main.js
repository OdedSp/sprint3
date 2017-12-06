'use strict';

import myRoutes from './routes.js';

Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes });

var myVue = new Vue({
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