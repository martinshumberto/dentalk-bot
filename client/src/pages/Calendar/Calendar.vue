<template>
  <div class="row">
    <div class="col-12">
      <card 
        :title="table.title" 
        :sub-title="table.subTitle">
        <calendar v-if="dataFetched" :calendar_settings="calendar_settings" :events="events" />
      </card>
    </div>

  </div>
</template>
<script>
import axios from '../../axios';
import calendar from '../../components/Calendar/Calendar.vue';

export default {
    components: {
        calendar
    },
    data: () => ({
        table: {
            title: 'Agenda de avaliações',
            subTitle: 'Nessa agenda você encontrará todos os eventos agendandos pela atendente virtual',
            data: []
        },
        calendar_settings: {
            style: 'material_design',
            view_type: 'week',
            cell_height: 10,
            scrollToNow: true,
            start_day: new Date().toISOString(),
            read_only: true,
            day_starts_at: 0,
            day_ends_at: 24,
            overlap: true,
            hide_dates: ['2019-10-31'], // Spooky
            hide_days: [6],
            past_event_creation: true
        },
        events: [],
        dataFetched: false
    }),
    async beforeRouteEnter(to, from, next) {
        const calendar = await axios.get('/events');
        next(vm => {
            const events = calendar.data;
            vm.setEvents(events);
        });
    },
    methods: {
        setEvents(events){
            let filtered = [];
            const eventsAll = events;
            eventsAll.forEach(item => {
                filtered.push({ from: item.start, to: item.end, data: item.summary });
            });
            this.events = filtered;
            this.dataFetched = true;
        }
    },
};
</script>
<style>
</style>
