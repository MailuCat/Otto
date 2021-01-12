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
                    <td>{{productos.codigo}}</td>
                    <td>{{productos.stock}}</td>
                    <td>{{productos.precio}}</td>
                     <td> <b-button v-b-modal.modal-center>Launch centered modal</b-button></td>
                    <td><button type="button" class="btn btn-danger" @click="eliminando(productos)">Eliminar</button></td>
                  </tr>  
            </tbody>
        </table>
        <b-modal id="modal-center" centered title="BootstrapVue">

        <form @submit.prevent="actualizarProducto">
          <p class="my-4">Editar</p>
       
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
                
            <td><button type="button" class="btn btn-info" >Editar</button></td>
            </form>
            <button type="submit" class="btn btn-info" @click="$router.go(-1)">Regresar</button>
            </b-modal>
       
       
        </div>
    
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
        export default {
            name: 'ListaProductos',
            props: ['id'],
            
                data() {
                    return {
                        item: [],
                        nombre:'',
                        stock: '',
                        precio: '',

                      }
                },
    computed: {
    ...mapGetters(['enviarProductos'])
    },

     methods: {
      eliminando(item){
              this.$store.dispatch('borrandoProductos', item.idDoc).then(()=>{
                console.log('eliminado');
            });
        },
         methods: {
        actualizarProducto(){
            if (this.nombre.length >= 4 && this.stock >=0 && this.precio) {
                let datos = {
                    nombre: this.nombre,
                    stock: this.stock,
                    precio: this.precio,
                    idDoc: this.id
                };
                this.$store.dispatch('actualizandoProducto',datos);
                
            } else {
                console.log("No se puede actualizar el paciente");
            }
        }
    },
    mounted(){
        let datos = this.enviarProductos.find(productos => productos.idDoc === this.id);
        if (datos !== undefined) {
            this.nombre = datos.nombre;
            this.stock = datos.stock;
            this.precio = datos.precio;
            
        } else {
            console.log("No existe el paciente");
            setTimeout(()=>{
                this.$router.push({name: 'productos'});
            },500);
        }
    }
}
}
    
</script>