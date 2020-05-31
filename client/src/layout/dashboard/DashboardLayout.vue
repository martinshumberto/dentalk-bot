<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link 
          to="/dashboard" 
          name="Dashboard" 
          icon="fa fa-tachometer-alt"/>
        <sidebar-link 
          to="/agenda" 
          name="Agenda" 
          icon="far fa-calendar"/>
        <sidebar-link 
          to="/leads" 
          name="Leads" 
          icon="far fa-user-circle"/>
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a 
            class="nav-link" 
            href="/leads">
            <i class="fa fa-user"/>
            <p>Meus Dados</p>
          </a>
        </li>
        <drop-down 
          class="nav-item"
          title="5 Notificações"
          title-classes="nav-link"
          icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"/>
            <p>Configurações</p>
          </a>
        </li>
        <li class="divider"/>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar/>

      <dashboard-content @click.native="toggleSidebar"/>

      <content-footer/>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from './MobileMenu';
export default {
    components: {
        TopNavbar,
        ContentFooter,
        DashboardContent,
        MobileMenu
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        }
    }
};
</script>
