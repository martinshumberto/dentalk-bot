import Vue from 'vue';
import App from './App';
import Axios from 'axios';
import router from './router/index';
import store from './store/index';
import 'register-service-worker';

import Dashboard from './plugins/dashboard';
import 'vue-notifyjs/themes/default.css';


Vue.prototype.$axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:2000/api' : '/api'
});

Vue.use(Dashboard);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
