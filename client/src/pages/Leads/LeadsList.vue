<template>
  <div class="row">
    <div class="col-12">
      <card 
        :title="table.title" 
        :sub-title="table.subTitle">
        <div 
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
                  {{ dateFormat(item.created) }}
                </td>
                <td>
                  {{ dateFormat(item.updated) }}
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
import moment from 'moment';

export default {
    data() {
        return {
            table: {
                title: 'Leads',
                subTitle: 'Nessa listagem você encontrará todos os leads gerados.',
                data: []
            },
        };
    },
    async created() {
        const data = await this.$axios.get('/leads');
        this.table.data = data.data;
    },
    methods: {
        dateFormat(date) {
            var dateParse = moment(date).format('DD/MM/YYYY HH:mm');
            return dateParse;
        }
    }
};
</script>
<style>
</style>
