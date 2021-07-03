<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="warning" >
          <b-container class="p-2">
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                  <b-navbar-brand href="/">
                      <img src="https://static.wikia.nocookie.net/logopedia/images/e/e4/14221627832_d3e633767d_b.jpg" alt="Kitten">
                  </b-navbar-brand>
                     <b-collapse id="nav-collapse" is-nav>
                                <b-navbar-nav > 
                                        <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
                                        <router-link class="nav-link" :to="{name: 'Editar'}">Inventario</router-link>
                                        <router-link class="nav-link" :to="{name: 'Agregar'}">Agregar producto</router-link>      
                                </b-navbar-nav>
                                  <!-- Right aligned nav items -->
                                <b-navbar-nav class="ml-auto">
                                        <b-nav-item-dropdown right>
                                  <!-- Using 'button-content' slot -->
                                        <template #button-content>
                                              <em>Usuario</em>
                                        </template>
                                             <b-dropdown-item  class="nav-link" :to="{name: 'Login'}">Ingresar</b-dropdown-item>
                                            <b-dropdown-item  class="nav-link" @click="salidaOut">Salir</b-dropdown-item>
                                         </b-nav-item-dropdown>
                                </b-navbar-nav>
                      </b-collapse>
          </b-container>
      </b-navbar>
  </div>
</template>
<script>

import firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
      name: 'NavBar',
       
    methods: {
       
       salidaOut(){
          firebase.auth().signOut().then(() => {
            Swal.fire({
               position: 'top-end',
               icon: 'success',
              title: 'Logout con éxito',
              showConfirmButton: false,
              timer: 1500
            
          });
          setTimeout(()=>{
            this.$router.push({name: 'Login'}).catch(error => {
                console.info(error.message)
            });
          },1000)
        }).catch((error) => {
          console.error(error);
        });
      }
    },
}
</script>
<style>
</style>