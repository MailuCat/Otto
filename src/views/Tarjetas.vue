<template>
<div>
  <b-card   v-for="(productos,index) in enviarProductos" :key="index" no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="productos.imagen" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col>
    <template #header>
      <h4 class="mb-0">Hello World</h4>
    </template>

    <b-card-body>
      <b-card-sub-title class="mb-2">Juego:</b-card-sub-title>
      <b-card-title>{{productos.nombre}}</b-card-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </b-card-text>
      
   </b-card-body>

    <b-list-group flush >
      <b-list-group-item>Código : {{productos.codigo}} </b-list-group-item>
      <b-list-group-item>Productos: {{productos.stock}}</b-list-group-item>
      <b-list-group-item>Precio :{productos.precio}}</b-list-group-item>
    </b-list-group>
    <b-card-body>
      <button type="button" class="btn btn-danger" @click="eliminando(productos)">Eliminar</button>
  
     </b-card-body>
    </b-col>
    </b-row>
  </b-card>
</div>
</template>
<script>
import { mapGetters } from "vuex";



export default {
    name: 'Tarjetas',
    data() {
      return {
      fields: ['nombre', 'codigo',  'producto', 'precio', 'imagen'],
            item: []
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
     }
}
            

    
</script>
