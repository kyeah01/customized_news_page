<template>
  <v-app>
    <NavBar></NavBar>

    <h1>Hello App!</h1>
    <p>
      <router-link to="/">Go to home</router-link>
      <router-link to="/login">Go to login</router-link>
    </p>

    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'




export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      //
    }
  }
}
</script>
