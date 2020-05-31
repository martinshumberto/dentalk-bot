<template>
  <div class="card">
    <div 
      v-if="$slots.image" 
      class="card-image">
      <slot name="image"/>
    </div>
    <div 
      v-if="$slots.header || title" 
      class="card-header">
      <slot name="header">
        <h4 class="card-title">{{ title }}</h4>
        <p 
          v-if="subTitle" 
          class="card-category">{{ subTitle }}</p>
      </slot>
    </div>
    <div 
      v-if="$slots.default" 
      class="card-body">
      <slot/>
    </div>
    <slot name="raw-content"/>
    <div 
      v-if="$slots.footer" 
      class="card-footer">
      <hr>
      <slot name="footer"/>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Card',
    props: {
        title: String,
        subTitle: String
    }
};
</script>
<style>
</style>
