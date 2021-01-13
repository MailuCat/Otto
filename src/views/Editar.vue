<template>
    <div class="container my-5">
        <h2 >Administración del  Inventario</h2>
        <div class="my-4">
            <!-- Button trigger modal -->
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
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
                        <td><b-button id="show-btn"  class="btn btn-success" v-b-modal="'my-modal'+index">Editar</b-button></td>
                        <td><button type="button" class="btn btn-danger" @click="eliminando(productos)">Eliminar</button></td>
                    </tr>  
                </tbody>
            </table>
            <div>
                <b-modal :id="'my-modal'+index" hide-footer :title="producto.nombre" v-for="(producto,index) in enviarProductos" :key="index">
                    <div class="d-block text-center">
                        <h3>¿Quieres actualizar el producto?</h3>
                        <form >
                            <b-form-group label="Name" label-for="name-input">
                                <b-form-input id="name-input" v-model="nombre" required :placeholder="producto.nombre"></b-form-input>
                            </b-form-group>
                                                
                            <label>Stock </label>
                            <b-form-input v-model="stock" type="number" name="stock" :placeholder="producto.stock"></b-form-input>
                                
                            <label >Precio </label>
                            <b-form-input v-model="precio" type="number" name="precio" :placeholder="producto.precio"></b-form-input>
                        </form>
                    </div>
                    <b-button class="m-3" variant="outline-danger" block  @click.prevent="actualizarProducto(producto)">Aceptar</b-button>
                    <b-button class="m-3" variant="outline-warning" block @click="$bvModal.hide('my-modal'+index)">Cancelar</b-button>
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
        actualizarProducto(item){
            console.log(item);
                if (this.nombre  && this.stock  && this.precio) {
                    let datos = {
                        nombre: this.nombre,
                        stock: this.stock,
                        precio: this.precio,
                        idDoc: item.idDoc
                    };
                    this.$store.dispatch('actualizandoProducto',datos).then(()=>{
                        Swal.fire(
                            'Muy Bien',
                            'Producto modificado',
                            'success'
                        );
                    /*  this.reset(); */
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
            
/*         showModal(valor) {
            console.log(valor);
            this.$refs['valor'].show();
            }, */
        hideModal() {
            this.$refs['my-modal'].hide();
        },
        toggleModal() {
            this.$refs['my-modal'].toggle('#toggle-btn')
        },
    },
}   
</script>
<style scoped>
h2{
    text-align: center;
    padding: 5;
}
</style>