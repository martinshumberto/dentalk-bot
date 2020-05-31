<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/'}">Voltar para Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        Desenvolvido por <a 
          href="https://vendaporchat.com.br" 
          target="_blank">&nbsp;Venda por Chat.</a>&nbsp;
          &copy; Uma empresa <a 
            href="https://github.com/cristijora" 
            target="_blank">&nbsp;Consilio</a>.
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
