<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <a href="#"><i :class="stats.footerIcon"></i> {{stats.footerText}}</a>
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-12">
        <chart-card title="Horários de pico"
                    sub-title="Perfomance dentro de 24 horas"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <span slot="footer">
            <a href="#"><i class="ti-reload"></i> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Iniciou
            <i class="fa fa-circle text-warning"></i> Telefone
            <i class="fa fa-circle text-danger"></i> Telefone & E-mail
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Estastísticas de SMS"
                    sub-title="Dados totais desde o início"
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <a href="#"><i class="ti-reload"></i> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Abriu
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Cancelou
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Comparação de contatos e avaliações"
                    sub-title="Perfomance anual da quantidade de avaliações e contatos"
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <a href="#"><i class="ti-reload"></i> Atualizar agora</a>
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Contatos
            <i class="fa fa-circle text-warning"></i> Avaliações
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
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
      statsCards: [
        {
          type: "warning",
          icon: "ti-user",
          title: "Leads",
          value: "105",
          footerText: "Atualizar agora",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-calendar",
          title: "Avaliações",
          value: "2",
          footerText: "Atualizar agora",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Errors",
          value: "23",
          footerText: "Atualizar agora",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-mobile",
          title: "Contatos",
          value: "45",
          footerText: "Atualizar agora",
          footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00 AM",
            "12:00 AM",
            "15:00 PM",
            "18:00 PM",
            "19:00 PM",
            "00:00 PM",
            "03:00 AM",
            "06:00 AM"
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
          height: "245px",
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
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
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
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6]
        },
        options: {}
      }
    };
  }
};
</script>
<style>
</style>
