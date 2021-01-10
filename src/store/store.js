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
    }
  },
})
