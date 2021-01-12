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
              id: element.data().id,
              idDoc: element.id,
            })
          });
          commit('mutandoProductos', productosLocal);
      })
    },
    agregandoProducto(context,productoNuevo){
      return firebase.firestore().collection('productos').add({...productoNuevo});
    },
    borrandoProductos(context,idDoc){
      return firebase.firestore().collection('productos').doc(idDoc).delete();
    },
    actualizandoProducto(context,datos){
      
        // el update se utiliza para actualizar un documento en especifico, se debe indicar cual es el id del documento. Se puede pasar uno o todos los valores a actualizar, no borrar los valores que no se actualicen.
        firebase.firestore().collection('productos').doc(datos.idDoc).update({
          nombre: datos.nombre,
          stock: datos.stock,
          precio: datos.precio,
         
        })
          .then(()=> console.log("Se actualizo"))
          .catch(error => console.error(error));
      },
    }
  
})
