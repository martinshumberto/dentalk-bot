import axios from '../../axios/index.js';

export default {
    listEvents() {
        return axios.get('/events');
    },
};