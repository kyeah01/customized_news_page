<template lang="html">
  <v-container>{{ user }}
    <div><br><br><br><br><br></div>
  </v-container>
  
</template>

<script>
import firebase from 'firebase'

export default {
  data(){
    return {
      user: ''
    }
  },
  created() {
    this.user = firebase.auth.importUsers()
    console.log(this.user)
  }


}
</script>

<style lang="css" scoped>
</style>
