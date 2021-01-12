<template>
 <div>
 
  <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand  href="#">Otto Krauss</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item :to="{name: 'Editar'}">Editar</b-nav-item>
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
              <b-button @click="$bvModal.show('modal-scoped')" >Agregar Juguetes</b-button>
        </b-collapse>
    </b-navbar>
  <template>
     <!-- Modal Agregar Usuario-->
   <b-modal id="modal-scoped">
      <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
          <b-button size="sm" variant="outline-danger" @click="close()">
            Cerrar
            </b-button>
            <h5>Forumulario para agregar juguetes</h5>
      </template>

        <template #default="{  }">
            
            <form >
                <b-form-group label="Name"  label-for="name-input"
                >
                <b-form-input id="name-input"  v-model="nombre"  required
                   ></b-form-input>
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
        <template #modal-footer="{ validate, cancel, hide }">
      <b></b>
      <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="success"  @click.prevent="agregandoProducto">
              OK
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
      <!-- Button with custom close trigger value -->
          <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
            Forget it
          </b-button>
        </template>
      </b-modal>
    </template>
</div>
</template>
<script>
import {mapGetters} from 'vuex';
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
                this.$store.dispatch('agregandoProducto',datos);
            } else {
                console.log("No se puede agregar curso");
            }
        },
      
},
    
}
</script>
<style>
   


</style>