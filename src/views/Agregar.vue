<template>
    <div>
         <b-container>
                <h1>Agrega nuevos juguetes</h1>

            <form >
                 <label >Código</label>
                    <b-form-input v-model="nombre"   type="text"  name="nombre" ></b-form-input>
                <label >Código</label>
                    <b-form-input v-model="codigo"   type="text"  name="codigo" ></b-form-input>
                <label>Stock </label>
                    <b-form-input v-model="stock"   type="number"    name="stock"  ></b-form-input>
                <label >Precio </label>
                    <b-form-input v-model="precio" type="number"  name="precio"></b-form-input>
                <label>Imagen:</label>
                    <b-form-input v-model="imagen"   type="url"    name="imagen"></b-form-input>
            </form>
                <b-button class="boton" size="sm" variant="warning"  @click.prevent="agregandoProducto">
                      Aceptar</b-button>
                <b-button  class="boton" size="sm" variant="info" @click="cancel()">
                      Cancelar</b-button>
      <!-- Button with custom close trigger value -->
            </b-container>
      </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';
export default {
    name: "Agregar",
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
                if (this.nombre.length && this.codigo && parseInt (this.stock) >= 0 && parseInt (this.precio) >= 0) {
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
                    text: 'Revisa los datos y recuerda que los números deben ser positivos',
                    footer: 'Intenta nuevamente'
                });
            }
        }
    }
}
</script>
<style>
h1{
    padding: 5;
    text-align: center;
    margin-top: 10px;
    
}
.b-container{
    margin-left: 20%;
    margin-right: 20%;
}
.boton{
    margin: 15px;
}
</style>