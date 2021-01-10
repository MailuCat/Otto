<template>
 <div>
 <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Otto Krauss</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/">Home</router-link>
        </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        
        <b-nav-item-dropdown right>
           
    
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Usuarior</em>
          </template>
          <router-link :to="{name: 'Loguin'}">Loguin</router-link>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
    
    

   
  
     
  
</div>
 </div>
</template>

<script>
export default {
        name: 'NavBar',
       
}
</script>

<style>

</style>