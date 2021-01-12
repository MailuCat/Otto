102 sloc) 3.79 KB
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
                     <td> <b-button v-b-modal.modal-center>Editar</b-button></td>
                    <td><button type="button" class="btn btn-danger" @click="eliminando(productos)">Eliminar</button></td>
                  </tr>  
            </tbody>
        </table>
        <b-modal id="modal-center" centered title="">

        <form @submit.prevent="actualizarProducto">
          <p class="my-4">Editando </p>
       
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" v-model="nombre">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Stock</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model="stock">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Precio</label>
                    <input type="text" class="form-control" id="edad" v-model="precio">
                </div>
                
            <td><button type="submit" class="btn btn-info" >Editar</button></td>
            </form>
            </b-modal>
       
       
        </div>
    
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

        export default {
            name: 'ListaProductos',
            props: ['id'],
            
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
},

        actualizarProducto(){
            if (this.nombre  && this.stock  && this.precio) {
                let datos = {
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio,
                    idDoc: this.id
                };
                this.$store.dispatch('actualizandoProducto',datos);
                
            } else {
                console.log("No se puede actualizar");
            }
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
}

    
</script>