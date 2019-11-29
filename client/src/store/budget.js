import * as axios from '../http/budget';

export default {
    state: {
        budgets: []
    },
    getters: {
        budgets: state => state.budgets
    },
    mutations: {
        budgets: (state, budgets) => state.budgets = budgets,
        budget: (state, budget) => state.budgets.push(budget)
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
        },
        getBudget: (_, payload) => {
            return new Promise((resolve, reject) => {
                axios.getBudget(payload)
                .then(response => {
                    return resolve(response.data.payload.budget);
                })
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        },
        editBudget: ({ commit, state }, payload) => {
            return new Promise((resolve, reject) => {
                axios.getBudget(payload)
                .then(response => {
                    const { budgets } = state;
                    const idx = state.budgets.map(x => x._id).indexOf(payload.budget._id);
                    if (idx !== -1) {
                        budgets.splice(idx, 1, response.data.payload.budget);
                    }
                    commit('budgets', budgets);
                    return resolve(budgets[idx]);
                })
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        },
        addBudget: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios.addBudget(payload)
                .then(response => {
                    commit('budget', response.data.payload.budget);
                    return resolve();
                })
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        }
    }
}