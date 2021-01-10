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
import firebase from 'firebase';

export default {
  components:  {NavBar},
  name: 'App',
   mounted() {
    
    this.$store.dispatch('traerProductosDb');
  },
}
</script>
<style>

</style>
