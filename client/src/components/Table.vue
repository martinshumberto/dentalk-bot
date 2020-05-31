<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th 
          v-for="item in titles" 
          :key="item">{{ item }}</th>
      </slot>
    </thead>
    <tbody>
      <tr 
        v-for="(item, index) in data" 
        :key="index">
        <slot :row="item">
          <td 
            v-for="(column, index) in columns"
            :key="index">
            {{ itemValue(item, column) }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
    name: 'TableCard',
    props: {
        columns: Array,
        titles: Array,
        data: Array,
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        }
    },
    methods: {
        hasValue(item, column) {
            return item[column] !== 'undefined';
        },
        itemValue(item, column) {
            return item[column];
        }
    }
};
</script>
<style>
</style>
