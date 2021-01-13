<template>
  <div>
|     <b-navbar toggleable="lg" type="light" variant="warning" >
          <b-container class="p-4">
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                  <b-navbar-brand href="/">
                      <img src="https://static.wikia.nocookie.net/logopedia/images/e/e4/14221627832_d3e633767d_b.jpg" alt="Kitten">
                  </b-navbar-brand>
                     <b-collapse id="nav-collapse" is-nav>
                                <b-navbar-nav > 
                                      <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
                                       <router-link class="nav-link" :to="{name: 'Editar'}">Inventario</router-link>
                                </b-navbar-nav>
                                  <!-- Right aligned nav items -->
                                <b-navbar-nav class="ml-auto">
                                        <b-nav-item-dropdown right>
                                  <!-- Using 'button-content' slot -->
                                        <template #button-content>
                                              <em>Usuario</em>
                                        </template>
                                             <router-link class="nav-link" :to="{name: 'Loguin'}">Login</router-link>
                                            <b-dropdown-item  @click="salidaOut">Salir</b-dropdown-item>
                                         </b-nav-item-dropdown>
                                </b-navbar-nav>
                           </b-collapse>
                    <b-button pill variant="success" size="sm p-1" @click="$bvModal.show('modal-scoped')" >Agregar Juguetes</b-button>
          </b-container>
      </b-navbar>

  <template>
     <!-- Modal Agregar Usuario-->
   <b-modal id="modal-scoped">
          <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
                  <b-button size="sm" variant="outline-danger" @click="close()">
                      Cerrar</b-button>
                        <h5>¿Desea agregar este juguete?</h5>
          </template>

        <template #default="{  }">
                <form >
                      <b-form-group label="Nombre"  label-for="name-input">
                            <b-form-input id="name-input"  v-model="nombre"  required></b-form-input>
                      </b-form-group>
                      <label >Código</label>
                            <b-form-input v-model="codigo"   type="text"  name="codigo" ></b-form-input>
                      <label>Stock </label>
                            <b-form-input v-model="stock"   type="number"    name="stock"  ></b-form-input>
                      <label >Precio </label>
                            <b-form-input v-model="precio" type="number"  name="precio"></b-form-input>
                      <label>Imagen:</label>
                            <b-form-input v-model="imagen"   type="url"    name="imagen"></b-form-input>
                  </form>
          </template>

          <template #modal-footer="{ validate, cancel, hide }"> <b></b>
      <!-- Emulate built in modal footer ok and cancel button actions -->
                    <b-button size="sm" variant="primary"  @click.prevent="agregandoProducto">
                      Aceptar</b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">
                      Cancelar</b-button>
      <!-- Button with custom close trigger value -->
                    <b-button size="sm" variant="outline-secondary" @click="hide('Volver')">
                      Olvídalo</b-button>
            </template>
      </b-modal>
    </template>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
      name: 'NavBar',
       data() {
        return {
            nombre: '',
            codigo: '',
            stock: '',
            precio:'',
            imagen: ''
        }
       },
        computed: {
    ...mapGetters(['enviarProductos'])
    },
        methods: {
        agregandoProducto () {
                if (this.nombre.length && this.codigo && this.stock && this.precio) {
                let datos = {
                    nombre: this.nombre,
                    codigo: this.codigo,
                    stock: this.stock,
                     precio: this.precio,
                    imagen: this.imagen
                    
                };
                this.$store.dispatch('agregandoProducto',datos).then(()=>{
                  Swal.fire(
                        'Producto agregado',
                       
                    );
                    this.reset();
                });
            } else { Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Falta un dato',
                    footer: 'Intenta nuevamente'
                });
            }
        },
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
            this.$router.push({name: 'Loguin'}).catch(error => {
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