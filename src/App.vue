<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding-left: 50px;">
    <div class="container-sd">
      <router-link class="navbar-brand" to="/">Empleados</router-link>
      <router-link class="navbar-brand" to="/vehiculos">Vehículos</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
