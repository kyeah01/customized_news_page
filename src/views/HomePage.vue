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

export default {
  data (){
    return {
      sDate : {
        hour : null,
        min : null,
        second : null
      },
      eDate : {
       hour : null,
       min : null,
       second : null
      },
      diffDate : {
       hour : null,
       min : null,
       second : null
      }
    }
  },
  created (){
    var date= new Date();
    this.sDate.hour=date.getHours()
    this.sDate.min=date.getMinutes()
    this.sDate.second=date.getSeconds()
   },
  destroyed(){
    var user=firebase.auth().currentUser

    var date= new Date();
    this.eDate.hour=date.getHours()
    this.eDate.min=date.getMinutes()
    this.eDate.second=date.getSeconds()

    this.diffDate.hour=this.eDate.hour-this.sDate.hour
    this.diffDate.min=this.eDate.min-this.sDate.min
    this.diffDate.second=this.eDate.second-this.sDate.second
    
    console.log('before')
    firebase.firestore().collection('Users').add({
      Email : user.email,
      Uid : user.uid,
      Path : '/',
      enterTime : this.sDate,
      exitTime : this.eDate,
      diffTime : this.diffDate
    })
    console.log('end')
  }

}
</script>
<style lang="css" scoped>
</style>
