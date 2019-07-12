<template>
  <v-app>
    <Navbar></Navbar>
    <LoginCheck/>
    <router-view></router-view>
    <GitGraph/>
    <!-- <Footer/> -->
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LoginCheck from './components/LoginCheck'
import SignUp from './components/SignUp'
import Footer from './components/Footer'
import GitGraph from './components/GitGraph'

export default {
  name: 'App',
  components: {
    Navbar,
    LoginCheck,
    Footer,
    GitGraph,
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
    }
  },
  created () {
    this.translater()
  }
}
</script>
