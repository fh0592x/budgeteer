import axios from './index';

export const getBudgets = (payload) => axios.get('/budgets', {
    headers: {
        'authorization': payload.token
    }
});

export const addBudget = (payload) => axios.post('/budgets', {
        ...payload.budget
    }, {
        headers: {
            'authorization': payload.token
        }
    });