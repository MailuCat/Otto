<template>
  <div>
  <h1>Ingreso</h1>
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="4">
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
  <div>
  <b-button>Entrar</b-button>
  
</div>
  </div>
</template>

<script>
import firebase from 'firebase';
  export default {
    name:'Loguin',
    data() {
      return {
        email: '',
        password: '',
        types: [
          
          'email',
          'password'
          
        ]
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
          console.error(error.code);
          console.error(error.message);
        });
      } else {
        console.log("no se puede");
      }
    },
  }
  }
</script>