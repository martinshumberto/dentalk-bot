import FormGroupInput from './Inputs/formGroupInput.vue';

import DropDown from './Dropdown.vue';
import Table from './Table.vue';
import Button from './Button';

import Card from './Cards/Card.vue';
import ChartCard from './Cards/ChartCard.vue';
import StatsCard from './Cards/StatsCard.vue';

import SidebarPlugin from './SidebarPlugin/index';

let components = {
    FormGroupInput,
    Card,
    ChartCard,
    StatsCard,
    Table,
    DropDown,
    SidebarPlugin
};

export default components;

export {
    FormGroupInput,
    Card,
    ChartCard,
    StatsCard,
    Table,
    DropDown,
    Button,
    SidebarPlugin
};
