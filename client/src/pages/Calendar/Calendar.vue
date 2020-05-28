<template>
    <div class="row">
      <div class="col-12">
        <card :title="table.title" :subTitle="table.subTitle">
          <kalendar :configuration="calendar_settings" :events.sync="events" />
        </card>
      </div>

    </div>
</template>
<script>

export default {
  data: () => ({
    table: {
      title: "Agenda de avaliações",
      subTitle: "Nessa agenda você encontrará todos os eventos agendandos pela atendente virtual",
      data: []
    },
    calendar_settings: {
      style: 'material_design',
      view_type: 'month',
      cell_height: 20,
      scrollToNow: true,
      start_day: new Date().toISOString(),
      read_only: false,
      day_starts_at: 0,
      day_ends_at: 24,
      overlap: true,
      hide_dates: ['2019-10-31'], // Spooky
      hide_days: [6],
      past_event_creation: true
    },
    eventsTest: [],
    events: [
      {
        from: '2020-03-18T18:00:00Z',
        to: '2020-03-18T19:00:00Z',
        data: 'Event 1',
      },
      {
        from: '2020-03-18T19:00:00Z',
        to: '2020-03-18T21:00:00Z',
        data: 'Olive & Friends',
      },
    ],
  }),
  async created() {
    const data = await this.$axios.get("/events")
    this.eventsTest = data.data;
  },
};
</script>
<style>
</style>
