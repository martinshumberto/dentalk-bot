<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a 
        class="navbar-brand" 
        href="#">{{ routeName }}</a>
      <button 
        :aria-expanded="$sidebar.showSidebar"
        class="navbar-toggler navbar-burger"
        type="button"
        aria-label="Toggle navigation"
        @click="toggleSidebar">
        <span class="navbar-toggler-bar"/>
        <span class="navbar-toggler-bar"/>
        <span class="navbar-toggler-bar"/>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a 
              href="#" 
              class="nav-link">
              <i class="fa fa-user"/>
              <p>Meus Dados</p>
            </a>
          </li>
          <drop-down 
            class="nav-item"
            title="5 Notificações"
            title-classes="nav-link"
            icon="fa fa-bell">
            <a 
              class="dropdown-item" 
              href="#">Notificações 1</a>
            <a 
              class="dropdown-item" 
              href="#">Notificações 2</a>
            <a 
              class="dropdown-item" 
              href="#">Notificações 3</a>
            <a 
              class="dropdown-item" 
              href="#">Notificações 4</a>
            <a 
              class="dropdown-item" 
              href="#">Outras notificações</a>
          </drop-down>
          <li class="nav-item">
            <a 
              href="#" 
              class="nav-link">
              <i class="fa fa-cog"/>
              <p>Configurações</p>
            </a>
          </li>
        </ul>
      </div>
  </div></nav>
</template>
<script>
export default {
    data() {
        return {
            activeNotifications: false
        };
    },
    computed: {
        routeName() {
            const { name } = this.$route;
            return this.capitalizeFirstLetter(name);
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications;
        },
        closeDropDown() {
            this.activeNotifications = false;
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        }
    }
};
</script>
<style>
</style>
