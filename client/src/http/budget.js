import axios from './index';

export const getBudgets = (payload) => axios.get('/budgets', {
    headers: {
        'authorization': payload.token
    }
});