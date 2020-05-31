<template>
<div class="">
  <kalendar 
    :configuration="calendar_settings" 
    :events.sync="events" />
    </div>
</template>
<script>
import { Kalendar } from 'kalendar-vue';
export default {
    components: {
        Kalendar
    },
    props: {
        calendar_settings: Object,
        events: Array
    },
    watch: {
        events(newValue) {
            return newValue;
        }
    }
  
};
</script>