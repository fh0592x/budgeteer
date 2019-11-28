import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../views/Login.vue';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
});