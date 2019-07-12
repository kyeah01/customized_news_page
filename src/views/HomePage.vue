<template lang="html">
  <v-container>

    <!-- title -->
    <v-layout row>
      <v-flex xs12>
        Discover the best sources for any topic
      </v-flex>

    </v-layout>
    <v-layout>
      <v-flex>
        <v-form>
          <v-text-field
             outline
             label="Prepend inner"
             prepend-inner-icon="place"
           ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'



export default {
  data (){
    return {
      sDate : null,
      eDate : null,
      path : '/'
    }
  },
  created (){
    this.sDate = timeCheck()
   },
  destroyed(){
    this.eDate = timeCheck()

    //save user log on firebase
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)

  }

}
</script>
<style lang="css" scoped>
</style>
