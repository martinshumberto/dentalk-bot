<template>
  <component 
    :is="tag"
    v-bind="$attrs"
    class="nav-item"
    tag="li"
    @click.native="hideSidebar">
    <a class="nav-link">
      <slot>
        <i 
          v-if="icon" 
          :class="icon"/>
        <p>{{ name }}</p>
      </slot>
    </a>
  </component>
</template>
<script>
export default {
    name: 'SidebarLink',
    inheritAttrs: false,
    inject: {
        autoClose: {
            default: true
        },
        addLink: {
            default: ()=>{}
        },
        removeLink: {
            default: ()=>{}
        }
    },
    props: {
        name: String,
        icon: String,
        tag: {
            type: String,
            default: 'router-link'
        }
    },
    mounted() {
        if (this.addLink) {
            this.addLink(this);
        }
    },
    beforeDestroy() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        if (this.removeLink) {
            this.removeLink(this);
        }
    },
    methods: {
        hideSidebar() {
            if (this.autoClose) {
                this.$sidebar.displaySidebar(false);
            }
        },
        isActive() {
            return this.$el.classList.contains('active');
        }
    },
};
</script>
<style>
</style>
