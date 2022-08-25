<template>
  <div>
    <input type="email" v-model="email">
    <input type="password" v-model="password">
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
// import * as firebase from 'firebase/app'
// import 'firebase/auth'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$fire.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push('/private')
      }).catch()
    }
  }
}
</script>