<template>
  <card>
    <div>
      <div class="row">
        <div 
          v-if="$slots.header" 
          class="col-5">
          <slot name="header"/>
        </div>
        <div 
          v-if="$slots.content" 
          class="col-7">
          <slot name="content"/>
        </div>
      </div>
      <div v-if="$slots.footer">
        <hr>
        <slot name="footer"/>
      </div>
    </div>

  </card>
</template>
<script>
import Card from './Card.vue';

export default {
    name: 'StatsCard',
    components: {
        Card
    }
};
</script>
<style>
</style>
