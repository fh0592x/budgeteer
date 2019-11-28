import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import budget from './budget';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user, budget
    },
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});