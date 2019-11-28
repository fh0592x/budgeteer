import * as axios from '../http/budget';

export default {
    state: {
        budgets: []
    },
    getters: {
        budgets: state => state.budgets
    },
    mutations: {
        budgets: (state, budgets) => state.budgets = budgets
    },
    actions: {
        getBudgets: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios.getBudgets(payload)
                .then(response => {
                    commit('budgets', response.data.payload.budgets);
                    return resolve(response.data.payload.budgets);
                })
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        }
    }
}