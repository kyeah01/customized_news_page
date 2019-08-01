<template>
  <v-app>
    <Navbar></Navbar>
    <LoginCheck/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginCheck from './components/LoginCheck'
import SignUp from './components/SignUp'
import FirebaseService from '@/services/FirebaseService'
import { firestore } from 'firebase'

export default {
  name: 'App',
  components: {
    Navbar,
    LoginCheck,
  },
  data () {
    return {
      //
    }
  },
  methods: {
    translater: async function () {
      // const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')
      // googleTranslate.translate('My name is Brandon', 'ko', function(err, translation) {
      //   console.log(translation.translatedText);
      // });
    },
    isLogin: function () {
      if (!sessionStorage.getItem('userInfo')) {
        FirebaseService.logout()
      } else {
        this.$store.commit('imageSoruceUpdate', JSON.parse(sessionStorage.getItem('userInfo')).user.photoURL)
      }
    },
  },
  created () {
    this.translater()
    this.isLogin()
  },
  mounted () {
  },
  computed : {
  },
}
</script>

<style>
.theme--light.application {
  background: #fff;
}
</style>