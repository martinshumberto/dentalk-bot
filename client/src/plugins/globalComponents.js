import { FormGroupInput, Card, DropDown, Button } from '../components/index';
import PortalVue from 'portal-vue';
import { Kalendar } from 'kalendar-vue';

const GlobalComponents = {
    install(Vue) {
        Vue.component('fg-input', FormGroupInput);
        Vue.component('drop-down', DropDown);
        Vue.component('card', Card);
        Vue.component('p-button', Button);
        Vue.component('kalendar', Kalendar);
        Vue.use(PortalVue);
    }
};

export default GlobalComponents;
