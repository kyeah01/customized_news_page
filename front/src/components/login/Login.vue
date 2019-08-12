<template>
  <div>
    <div v-if="!userInfo" style="line-height: 60px;">
      <v-btn
        flat
        @click.stop="dialog2 = true"
        >
        Login
      </v-btn>
      <v-dialog
        v-model="dialog2"
        max-width="400"
        >
        <v-card>
          <v-card-title class="headline">Login</v-card-title>

          <v-card-text>
            <input style="width:100%; height:50px;" type="text" v-model="email" placeholder="Email" @keyup.enter="Login"><br>
            <input style="width:100%; height:50px;" type="password" v-model="password" placeholder="Password" @keyup.enter="Login"><br>
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
            <p>You don't have an account? You can 
              <v-btn flat @click.stop="dialog1 = true">
                create one
              </v-btn>
            </p>
            <v-dialog
            v-model="dialog1"
            max-width="500"
            >
              <v-card>
                <v-card-title class="headline">Sign Up</v-card-title>
                <v-card-text>
                  <input style="width:100%; height:50px;" type="text" v-model="email" placeholder="Email" @keyup.enter="SignUp"><br>
                  <input style="width:100%; height:50px;" type="password" v-model="password" placeholder="Password" @keyup.enter="SignUp"><br>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                      color="green darken-1"
                      flat="flat"
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
    </div>
    <div v-else style="line-height: 60px;">
      <NavbarAvatar v-if="userInfo"/>
    </div>
  </div>
</template>


<script>
import firebase from 'firebase'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import NavbarAvatar from '../NavbarAvatar'
import { async } from 'q';
// import eventBus from '../eventBus'


export default {
    components: {
      GoogleLogin,
      FacebookLogin,
      NavbarAvatar,
    },
    data () {
      return {
        user: '',
        userInfo: '',
        email: '',
        password: '',
        signupemail: '',
        signuppassword: '',
        dialog1: false,
        dialog2: false,
      }
    },
    methods: {
      init: async function() {
        var user = firebase.auth().currentUser
        await firebase.firestore().collection("Userinfo").doc(user.uid).get()
          .then(r => {
            const tmp = r.data()

            this.$store.commit('loadUserinfoData', tmp)
            this.$store.commit('loadRes')
            sessionStorage.setItem('categories' , JSON.stringify(this.$store.state.followList))
          })
        window.location.href = '/';
        
      },
      Login: async function() {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            alert('Well done ! You are now connected')
            sessionStorage.setItem('userInfo', JSON.stringify(user))
            this.user = user.user
            const time = new Date()
            const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth()+1 : '0'+(time.getMonth()+1)) + (time.getDate()>9 ? time.getDate() : '0'+time.getDate())
            firebase.firestore().collection('visitorStat').doc(date).update({
              totalUser: firebase.firestore.FieldValue.arrayUnion(user.user.email),
            })
            this.$store.commit('imageSoruceUpdate', user.user.photoURL)
            this.email = ''
            this.password = ''
            this.init()
            // this.$router.push('/article')
            // window.location.href = '/';
          },
          (err) => {
            alert('Oops, ' + err.message)
            this.dialog2 = true
          }
        )
      },
      SignUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (cred, user) => {
            alert('created!!')
            const time = new Date()
            const date = time.getFullYear() + (time.getMonth() > 8 ? time.getMonth()+1 : '0'+(time.getMonth()+1)) + (time.getDate()>9 ? time.getDate() : '0'+time.getDate())
            firebase.firestore().collection('visitorStat').doc(date).update({
              newCreatedUser: firebase.firestore.FieldValue.increment(1),
            })
            this.Login()
            this.dialog1 = false
            firebase.firestore().collection('Userinfo').doc(cred.user.uid).set({
              keyword: {},
              markasread: [],
              readlater: [],
              sourceFollow : [],
              follow : {},
              followInfo : {}
            })      
          },
          (err) => {
            alert('Oops, ' + err.message)
            this.dialog1 = true
          }
        );
      },
      Enter: function() {
        if (window.event.keyCode == 13) {
            Login();
        }
      }
    },
    created () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    watch: {
      dialog1: function() {
        if (!this.dialog1) {
          this.email = ''
          this.password = ''
        }
      },
      dialog2: function() {
        if (!this.dialog2) {
          this.email = ''
          this.password = ''
        }
      }
    }

}
</script>