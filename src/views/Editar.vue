<template>
    <div class="container my-5">
        <h2>Administrando Inventario</h2>
        <div class="my-4">
            <!-- Button trigger modal -->
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(productos,index) in enviarProductos" :key="index" >
                     <td>{{index+1}}</td>
                    <td>{{productos.nombre}}</td>
                    <td>{{productos.stock}}</td>
                    <td>{{productos.precio}}</td>
                     <td><b-button id="show-btn" @click="showModal">Open Modal</b-button></td>
                    <td><button type="button" class="btn btn-danger" @click="eliminando(productos)">Eliminar</button></td>
                  </tr>  
            </tbody>
        </table>
        <div>
            <b-modal ref="my-modal" hide-footer title="">
      <div class="d-block text-center">
        <h3>¿Quieres actualizar el producto?</h3>
        <form >
                <b-form-group label="Name"  label-for="name-input"
                >
                <b-form-input id="name-input"  v-model="nombre"  required
                   ></b-form-input>
                </b-form-group>
                                
                 <label>Stock </label>
                   <b-form-input v-model="stock"   type="number"    name="stock"  ></b-form-input>
                
                <label >Precio </label>
                  <b-form-input v-model="precio" type="number"  name="precio"></b-form-input>
        </form>
      </div>
    
      <b-button class="mt-3" variant="outline-danger" block  @click.prevent="actualizarProducto">Aceptar</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Cancelar</b-button>
    
    </b-modal>
        </div>    
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

        export default {
            name: 'ListaProductos',
           
            
                data() {
                    return {
                        nombre:'',
                        stock: '',
                        precio: '',
                        item: [],
                        
                      }
                },
    computed: {
    ...mapGetters(['enviarProductos'])
    },
     methods: {
      eliminando(item){
            Swal.fire({
                title: '<span class="font-weight-regular">¿Seguro que deseas eliminar?</span>',
                text: 'No se puede volver a recuperar',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#F44336',
                cancelButtonText: '<span style="color: white"><strong>Cancelar</strong></span>',
                confirmButtonText: '<span style="color: white"><strong>Si, borrar!</strong></span>'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch('borrandoProductos',item.idDoc).then(()=>{
                        Swal.fire(
                            'Eliminado',
                            'El Producto fue eliminado',
                            'success'
                        )
                    });
                }
            })
        },
    actualizarProducto(){
            if (this.nombre  && this.stock  && this.precio) {
                let datos = {
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio,
                    idDoc: this.id
                };
                 this.$store.dispatch('actualizandoProducto',datos).then(()=>{
                    Swal.fire(
                        'Muy Bien',
                        'Curso Moduficado',
                        'success'
                    );
                    this.reset();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Existen errores en los datos',
                    footer: 'Intenta nuevamente'
                });
            }
        },
        
                showModal() {
                    this.$refs['my-modal'].show()
                 },
                hideModal() {
                this.$refs['my-modal'].hide()
                },
                toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn')
                },
     
    mounted(){
        let datos = this.enviarProductos.find(productos => productos.idDoc === this.id);
        if (datos !== undefined) {
            this.nombre = datos.nombre;
            this.stock = datos.stock;
            this.precio = datos.precio;
            
        } else {
            console.log("No existe");
            
        }
    }
}}   
</script>