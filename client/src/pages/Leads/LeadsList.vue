<template>
  <div class="row">
    <div class="col-12">
      <card 
        :title="table.title" 
        :sub-title="table.subTitle">
        <div
          v-if="dataFetched"
          slot="raw-content" 
          class="table-responsive">
          <table class="table">
            <thead>
              <slot name="columns">
                <th>ID</th>
                <th>Foto</th>
                <th>Perfil</th>
                <th>Primeiro nome</th>
                <th>Último nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
              </slot>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in table.data" 
                :key="index">
                <td>
                  {{ item.id }}
                </td>
                <td class="td-photo">
                  <img :src="item.profile_pic" >
                </td>
                <td>
                  <a 
                    :href="`https://facebook.com/dentalkoficial/inbox/${item.senderID}`" 
                    target="_blank">Ver</a>
                </td>
                <td>
                  {{ item.first_name }}
                </td>
                <td>
                  {{ item.last_name }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td>
                  {{ dateFormat(item.createdAt) }}
                </td>
                <td>
                  {{ dateFormat(item.updatedAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>

  </div>
</template>
<script>
import axios from '../../axios';
import moment from 'moment';

export default {
    data() {
        return {
            table: {
                title: 'Leads',
                subTitle: 'Nessa listagem você encontrará todos os leads gerados.',
                data: []
            },
            leads: [],
            dataFetched: false
        };
    },
    async beforeRouteEnter(to, from, next) {
        const fetchLeads = await axios.get('/leads');
        next(vm => {
            const leads = fetchLeads.data;
            vm.setLeads(leads);
        });
    },
    beforeRouteUpdate (to, from, next) {
        const fetchLeads = axios.get('/leads');
        this.setLeads(fetchLeads.data);
        next();
    },
    watch: {
        leads: 'setLeads'
    },
    methods: {
        setLeads(data){
            this.leads = data;
            this.table.data = data;
            this.dataFetched = true;
        },
        dateFormat(date) {
            var dateParse = moment(date).format('DD/MM/YYYY HH:mm');
            return dateParse;
        }
    }
};
</script>
<style>
</style>
