<template>
  <v-app>
    <Navbar></Navbar>
    <Login/>
    <LoginCheck/>
    <GoogleLogin/>
    <FacebookLogin/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import LoginCheck from './components/LoginCheck'
import GoogleLogin from './components/GoogleLogin'
import FacebookLogin from './components/FacebookLogin'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    LoginCheck,
    GoogleLogin,
    FacebookLogin,
  },
  data () {
    return {
      //
    }
  }
}
</script>
