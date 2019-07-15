<template lang="html">
  <nav>
  <v-toolbar>
    <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Menu</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        flat
        @click.stop="dialog2 = true"
        v-if="!userinfo"
        >
        Login
      </v-btn>
        
      
      <v-btn flat v-on:click="Logout" v-else>Logout</v-btn>

      <v-dialog
        v-model="dialog2"
        max-width="400"
        >
        <v-card>
            <v-card-title class="headline">Login</v-card-title>

            <v-card-text>
                <input style="width:100%; height:50px;" type="text" v-model="email" placeholder="Email"><br>
                <input style="width:100%; height:50px;" type="password" v-model="password" placeholder="Password"><br>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog2 = false"
                v-on:click="Login"
            >
                Login
            </v-btn>
            </v-card-actions>
            <v-flex text-xl-center text-lg-center text-md-center text-sm-center text-xs-center>
              <GoogleLogin/>
              <FacebookLogin/>
              You don't have an account? You can 
              <v-btn
                flat
                @click.stop="dialog1 = true"
                >
                create one
              </v-btn>
              <v-dialog
              v-model="dialog1"
              max-width="500"
              >
                <v-card>
                    <v-card-title class="headline">Sign Up</v-card-title>

                    <v-card-text>
                        <input style="width:100%; height:50px;" type="text" v-model="email" placeholder="Email"><br>
                        <input style="width:100%; height:50px;" type="password" v-model="password" placeholder="Password"><br>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog1 = false"
                        v-on:click="SignUp"
                    >
                        Sign Up
                    </v-btn>
                    </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
        </v-card>
      </v-dialog>
   
      <v-btn @click="goto('test')" flat>Test Space</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <v-navigation-drawer app v-model="drawer">
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Application
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
     <v-list-tile
       v-for="item in items"
       :key="item.title"
       router :to="{name: item.routerTo}"
     >
       <v-list-tile-action>
         <v-icon>{{ item.icon }}</v-icon>
       </v-list-tile-action>

       <v-list-tile-content>
         <v-list-tile-title>{{ item.title }}</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>
   </v-list>
  </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'

const axios = require('axios');
export default {
  components: {
    GoogleLogin,
    FacebookLogin,
  },
  data() {
    return {
      email: "",
      password: "",
      userinfo: "",
      dialog1: false,
      dialog2: false,
      weather: [],
      drawer: false,
      items: [{
          title: 'Home',
          icon: 'dashboard',
          routerTo: 'home'
        },
        {
          title: 'article',
          icon: 'question_answer',
          routerTo: 'article'

        },
        {
          title: 'Profile',
          icon: 'question_answer',
          routerTo: 'profile'
        },
        {
          title: 'admin',
          icon: 'question_answer',
          routerTo: 'admin'
        },
        {
          title: 'Test Space',
          icon: 'question_answer',
          routerTo: 'test'
        }
      ]
    }
  },
  methods: {
    goto: function(addr) {
      this.$router.push('/' + addr)
    },
    Login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        alert('Well done ! You are now connected')
      })
    },
    SignUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('created!!')
          },
          function (err) {
            alert('Oops, ' + err.message)
          }
      );
    },
    Logout: function() {
      FirebaseService.Logout()
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.userinfo = user
      } else {
        this.userinfo = ""
      }
    });
  }
}
</script>

<style lang="css" scoped>
</style>
