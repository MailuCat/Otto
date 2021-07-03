<template>
  <div class="my-5 container">
     <b-row>
        <b-col></b-col>
        <b-col  md="6">
        <h1>Iniciar sesión</h1>
              <form @submit.prevent="loginUser">
                <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                      <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                      <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
                </div>
                    <b-row>
                      <b-col>
                      <b-button type="submit" class="btn btn-warning"  >Entra</b-button>
                      </b-col>
                      <b-col>
                      <a type="button" class="btn btn-secondary" @click="recuperarEmail">Olvide mi contraseña</a>
                      </b-col> 
                      <b-col></b-col>                 
                   </b-row>
               </form>
        </b-col>
        <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from 'firebase';
import Swal from 'sweetalert2';
export default {
  name: 'Loguin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser(){
      if (this.email && this.password.length >= 6) {
        // metodo que permite ingresar con usuario(correo electrónico) y contraseña
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result.user.uid);
          console.log(result.user.photoURL);
          console.log(result.user.email);
          console.log(result.user.displayName);
          console.log(result.user.emailVerified);
          console.log("login");
          this.$router.push({name: 'Home'}); // enviamos al usuario a la vista de home
        })
        .catch((error) => {
          Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Existen errores en los datos',
                        footer: 'Intenta nuevamente'
                    });
          console.error(error.code);
          console.error(error.message);
        });
      } else {
        console.log("no se puede");
      }
    },
     recuperarEmail(){
      // metodo que permite enviar al correo un enlace para reiniciar contraseña (el correo debe ser real)
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        console.log("correo enviado.");
      }).catch((error) => {
        console.error(error);
      });
    }
  },
}
</script>
<style scoped>
h1{
  margin-bottom: 2em;
  font-size: 2em;
  text-align: center;
}
a{
  margin-left: 0 !important;
  font-size: 12px;
  
}
</style>


