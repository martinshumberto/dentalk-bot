import axios from 'axios';

const baseURL = `${process.env.VUE_APP_BASE_API}/api`;

export default axios.create({
    baseURL: baseURL,
    headers: { 
        'Content-Type': 'application/json'
    }
});