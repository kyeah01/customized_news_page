<template>
  <v-app>
    <Navbar></Navbar>
    <Login/>
    <LoginCheck/>
    <GoogleLogin/>
    <FacebookLogin/>
    <SignUp/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import LoginCheck from './components/LoginCheck'
import GoogleLogin from './components/GoogleLogin'
import FacebookLogin from './components/FacebookLogin'
import SignUp from './components/SignUp'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    LoginCheck,
    GoogleLogin,
    FacebookLogin,
    SignUp,
  },
  data () {
    return {
      //
    }
  }
}
</script>
