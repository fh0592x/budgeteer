import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from '../store';

import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

import Home from '../views/Home.vue';
import Budgets from '../views/Budgets.vue';
import AddBudget from '../views/AddBudget.vue';
import Budget from '../views/Budget.vue';

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
        },
        {
            path: '/app',
            component: Home,
            redirect: {
                path: '/app/budgets'
            },
            beforeEnter(to, from, next) {
                store.dispatch('refreshAuth');
                const { auth } = store.getters || '';
                if (auth && auth.token) return next();
                return next('/login');
            },
            children: [
                {
                    path: 'budgets',
                    component: Budgets
                },
                {
                    path: 'new-budget',
                    component: AddBudget
                },
                {
                    path: 'budgets/:id',
                    component: Budget
                }
            ]
        }
    ]
});