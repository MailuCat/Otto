import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
     productos:[]
  },
   getters: {
    enviarProductos (state){
          return state.productos;
    }
  },
  mutations: {
    mutandoProductos (state, productosLocal) {
        state.productos= productosLocal
    }
  },
  actions: {
    traerProductosDb({commit}){

      firebase.firestore().collection('productos').onSnapshot( result =>{
        let productosLocal = [];
        result.forEach (element => {
            productosLocal.push ({
              codigo: element.data().codigo,
              nombre: element.data().nombre,
              precio: element.data().precio,
              stock: element.data().stock,
              imagen: element.data().imagen,
              idProductos: element.data().id,
              idDoc: element.id,
            })
          });
          commit('mutandoProductos', productosLocal);
      })
    },
    agregandoProducto(context,productoNuevo){
      return firebase.firestore().collection('productos').add({...productoNuevo});
    },
    borrandoProductos(context,id){
      firebase.firestore().collection('productos').doc(context.state.id).collection('productos').doc(id).delete().then(()=>console.log("producto borrado")).catch(error => console.error(error));
    },
  },
})
