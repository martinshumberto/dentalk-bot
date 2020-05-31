<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div 
        v-for="stats in statsCards" 
        :key="stats.title" 
        class="col-md-6 col-xl-3">
        <stats-card>
          <div 
            slot="header" 
            :class="`icon-${stats.type}`" 
            class="icon-big text-center">
            <i :class="stats.icon"/>
          </div>
          <div 
            slot="content" 
            class="numbers">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div 
            slot="footer" 
            class="stats">
            <a href="#"><i :class="stats.footerIcon"/> {{ stats.footerText }}</a>
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card 
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
          title="Horários de pico"
          sub-title="Perfomance dentro de 24 horas">
          <span slot="footer">
            <a href="#"><i class="ti-reload"/> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"/> Iniciou
            <i class="fa fa-circle text-warning"/> Telefone
            <i class="fa fa-circle text-danger"/> Telefone & E-mail
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card 
          :chart-data="preferencesChart.data"
          title="Estastísticas de SMS"
          sub-title="Dados totais desde o início"
          chart-type="Pie">
          <span slot="footer">
            <a href="#"><i class="ti-reload"/> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"/> Abriu
            <i class="fa fa-circle text-danger"/> Bounce
            <i class="fa fa-circle text-warning"/> Cancelou
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card 
          :chart-data="activityChart.data"
          :chart-options="activityChart.options"
          title="Comparação de contatos e avaliações"
          sub-title="Perfomance anual da quantidade de avaliações e contatos">
          <span slot="footer">
            <a href="#"><i class="ti-reload"/> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"/> Contatos
            <i class="fa fa-circle text-warning"/> Avaliações
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from '@/components/index';
import Chartist from 'chartist';
export default {
    components: {
        StatsCard,
        ChartCard
    },
    /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
    data() {
        return {
            leads: [],
            events: [],
            statsCards: [
                {
                    type: 'warning',
                    icon: 'ti-user',
                    title: 'Leads',
                    value: 0,
                    footerText: 'Atualizar agora',
                    footerIcon: 'ti-reload'
                },
                {
                    type: 'success',
                    icon: 'ti-calendar',
                    title: 'Avaliações',
                    value: 0,
                    footerText: 'Atualizar agora',
                    footerIcon: 'ti-reload'
                },
                {
                    type: 'danger',
                    icon: 'ti-pulse',
                    title: 'Errors',
                    value: 0,
                    footerText: 'Atualizar agora',
                    footerIcon: 'ti-reload'
                },
                {
                    type: 'info',
                    icon: 'ti-mobile',
                    title: 'Contatos',
                    value: 0,
                    footerText: 'Atualizar agora',
                    footerIcon: 'ti-reload'
                }
            ],
            usersChart: {
                data: {
                    labels: [
                        '9:00 AM',
                        '12:00 AM',
                        '15:00 PM',
                        '18:00 PM',
                        '19:00 PM',
                        '00:00 PM',
                        '03:00 AM',
                        '06:00 AM'
                    ],
                    series: [
                        [287, 385, 490, 562, 594, 626, 698, 895, 952],
                        [67, 152, 193, 240, 387, 435, 535, 642, 744],
                        [23, 113, 67, 108, 190, 239, 307, 410, 410]
                    ]
                },
                options: {
                    low: 0,
                    high: 1000,
                    showArea: true,
                    height: '245px',
                    axisX: {
                        showGrid: false
                    },
                    lineSmooth: Chartist.Interpolation.simple({
                        divisor: 3
                    }),
                    showLine: true,
                    showPoint: false
                }
            },
            activityChart: {
                data: {
                    labels: [
                        'Jan',
                        'Fev',
                        'Mar',
                        'Abr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Ago',
                        'Set',
                        'Out',
                        'Nov',
                        'Dez'
                    ],
                    series: [
                        [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
                        [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
                    ]
                },
                options: {
                    seriesBarDistance: 10,
                    axisX: {
                        showGrid: false
                    },
                    height: '245px'
                }
            },
            preferencesChart: {
                data: {
                    labels: ['62%', '32%', '6%'],
                    series: [62, 32, 6]
                },
                options: {}
            }
        };
    },
    async created() {
        const leads = await this.$axios.get('/leads');
        const events = await this.$axios.get('/events');
        this.leads = leads.data;
        this.statsCards[0].value = this.leadsCount;
        this.events = events.data;
        this.statsCards[1].value = this.eventsCount;
        this.statsCards[3].value = this.filterContactsCount;
    },
    methods: {
        isContact(lead) {
            if (lead && lead.phone && lead.email)
                return true;
        }
    },
    computed: {
        leadsCount () {
            return this.leads.length;
        },
        eventsCount () {
            return this.events.length;
        },
        filterContacts () {
            var filtered = this.leads.filter(this.isContact);
            return filtered;
        },
        filterContactsCount () {
            return this.filterContacts.length;
        },
    }
};
</script>
<style>
</style>
