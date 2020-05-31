<template>
  <component 
    v-click-outside="closeDropDown"
    :is="tag"
    :class="{show:isOpen}"
    class="dropdown"
    @click="toggleDropDown">
    <a 
      :class="titleClasses"
      class="dropdown-toggle btn-rotate"
      data-toggle="dropdown">
      <slot name="title">
        <i :class="icon"/>
        <span class="notification">{{ title }}
          <b class="caret"/>
        </span>
      </slot>
    </a>
    <ul 
      :class="{show:isOpen}" 
      class="dropdown-menu">
      <slot/>
    </ul>
  </component>
</template>
<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'li'
        },
        title: String,
        icon: String,
        titleClasses: [String, Object, Array]
    },
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        toggleDropDown() {
            this.isOpen = !this.isOpen;
            this.$emit('change', this.isOpen);
        },
        closeDropDown() {
            this.isOpen = false;
            this.$emit('change', false);
        }
    }
};
</script>
