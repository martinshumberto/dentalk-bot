<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    :class="[
      {'btn-round': round},
      {'btn-block': block},
      {'btn-just-icon': icon},
      {[`btn-${type}`]: type && !outline},
      {[`btn-outline-${type}`]: type && outline},
      {[`btn-${size}`]: size},
      {'btn-link': simple}
    ]"
    class="btn">
    <slot name="loading">
      <i 
        v-if="loading" 
        class="fa fa-spinner fa-spin"/>
    </slot>
    <slot/>
  </component>
</template>
<script>
export default {
    name: 'PButton',
    props: {
        tag: {
            type: String,
            default: 'button'
        },
        round: Boolean,
        icon: Boolean,
        outline: Boolean,
        block: Boolean,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            default: 'default'
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        size: {
            type: String,
            default: ''
        },
        simple: Boolean
    }
};
</script>
<style>
</style>
