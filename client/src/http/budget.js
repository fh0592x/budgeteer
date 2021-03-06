import axios from './index';

export const getBudgets = (payload) => axios.get('/budgets', {
    headers: {
        'authorization': payload.token
    }
});

export const getBudget = (payload) => axios.get(`/budgets/${ payload._id }`, {
    headers: {
        'authorization': payload.token
    }
});

export const removeBudget = (payload) => axios.delete(`/budgets/${ payload._id }`, {
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

export const editBudget = (payload) => axios.put(`/budgets/${ payload._id }`, {
        ...payload.budget
    }, {
        headers: {
            'authorization': payload.token
        }
    });