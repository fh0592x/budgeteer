import * as axios from '../http/user';

export default {
    state: {
        auth: {}
    },
    getters: {
        auth: state => state.auth
    },
    mutations: {
        auth: (state, auth) => state.auth = auth
    },
    actions: {
        login: ({ commit }, credentials) => {
            return new Promise((resolve, reject) => {
                axios.login(credentials)
                .then(response => {
                    localStorage.setItem('auth', JSON.stringify(response.data.payload));
                    commit('auth', { ...response.data.payload });
                    return resolve();
                })
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        },
        signup: (_, credentials) => {
            return new Promise((resolve, reject) => {
                axios.signup(credentials)
                .then(() => resolve())
                .catch(err => reject(err.response.data.message || err.message || err));
            });
        },
        refreshAuth: ({ commit }) => {
            const auth = localStorage.getItem('auth');
            commit('auth', JSON.parse(auth));
        },
        logout: ({ commit }) => {
            localStorage.clear();
            commit('auth', {});
        }
    }
}