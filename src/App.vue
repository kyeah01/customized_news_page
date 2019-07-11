<template>
  <v-app>
    <Navbar></Navbar>
    <Login/>
    <LoginCheck/>
    <GoogleLogin/>
    <FacebookLogin/>
    <SignUp/>
    <router-view></router-view>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './components/Login'
import LoginCheck from './components/LoginCheck'
import GoogleLogin from './components/GoogleLogin'
import FacebookLogin from './components/FacebookLogin'
import SignUp from './components/SignUp'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Login,
    LoginCheck,
    GoogleLogin,
    FacebookLogin,
    SignUp,
    Footer,
  },
  data () {
    return {
      //
    }
  },
  methods: {
    translater: async function () {
      const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')
      googleTranslate.translate('My name is Brandon', 'ko', function(err, translation) {
        console.log(translation.translatedText);
      });
    }
  },
  created () {
    this.translater()
  }
}
</script>
