<template>
    <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
        <v-layout wrap row>
          <v-flex xs6 md6>
          <h1>
            <span class="heading" id="header-title">Manage account</span>
            <div class="sub">Logged in using {{ log }}</div>
          </h1>
          </v-flex>
        </v-layout>
        <!-- card -->
        <v-layout wrap 3>
          <v-flex d-flex xs12 sm4 v-for="p in pCards" :key=p.title class="pb-2">
             <ProfileCard
              :title= p.title
              :icon = p.icon
              :event= p.event
              >
              </ProfileCard>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import ProfileCard from '@/components/profile/ProfileCard'

    export default {
      components: {
        ProfileCard
      },
      data () {
        return {
          log: '',
          email: '',
          dialog: false,
          items: [
            { title: 'Home', icon: 'dashboard' },
            { title: 'About', icon: 'question_answer' }
          ],
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
          },
          pCards :[
            { title : 'General' , icon : 'close', event : 1},
            { title : 'Preview' , icon : 'check', event : 2},
            { title : 'Intergrations' , icon : 'details', event : 3},
            { title : 'read' , icon : 'crop', event : 4},
            { title : 'Appearance' , icon : 'edit', event : 5},
            { title : 'Your Profile' , icon : 'person', event : 6},
          ]
        }
      },  
        created (){
          var date= new Date();
          this.sDate.hour=date.getHours()
          this.sDate.min=date.getMinutes()
          this.sDate.second=date.getSeconds()

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              if (!user.photoURL) {
                this.log = 'Idle'
              }else if (user.photoURL.slice(0, 10) === 'https://lh') {
                this.log = 'Google'
              } else if (user.photoURL.slice(0, 27) === 'https://graph.facebook.com/') {
                this.log = 'Facebook'
              } else {
                this.log = 'Idle'
              }
            }
          })
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
            Path : '/profile',
            enterTime : this.sDate,
            exitTime : this.eDate,
            diffTime : this.diffDate
          })
          console.log('end')
        }
  }
</script>