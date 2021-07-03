<template>
<div>
<div id="app">
   <nav-bar></nav-bar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';


export default {
  components:  {NavBar},
  name: 'App',
   mounted() {
    this.$store.dispatch('traerProductosDb');
  },
}
</script>
<style>
#app {
  padding: 0;
  margin: 0;
}

</style>
