import axios from './index';

export const login = (credentials) => axios.post('/users/login', { ...credentials });
export const signup = (credentials) => axios.post('/users/signup', { ...credentials });