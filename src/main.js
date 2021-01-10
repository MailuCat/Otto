import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import firebase from 'firebase';
import { firebaseConfig } from "./config/configFirebase"; //exportando la variable del archivo de configuracion de firebase
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
