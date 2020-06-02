import axios from '../../axios/index.js';

export default {
    listLeads() {
        return axios.get('/leads');
    },
};