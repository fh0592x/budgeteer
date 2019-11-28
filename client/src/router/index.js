import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        }
    ]
});