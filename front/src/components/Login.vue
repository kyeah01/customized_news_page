<template>
  <div>
    <v-template v-if="!userInfo" style="line-height: 60px;">
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
                  <input style="width:100%; height:50px;" type="text" v-model="signupemail" placeholder="Email"><br>
                  <input style="width:100%; height:50px;" type="password" v-model="signuppassword" placeholder="Password"><br>
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
    </v-template>
    <v-template v-else style="line-height: 60px;">
      <NavbarAvatar v-if="userInfo"/>
    </v-template>
  </div>
</template>


<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import NavbarAvatar from './NavbarAvatar'


export default {
    components: {
      GoogleLogin,
      FacebookLogin,
      NavbarAvatar,
    },
    data () {
      return {
        userInfo: '',
        email: '',
        password: '',
        dialog1: false,
        dialog2: false,
      }
    },
    methods: {
      Login: async function() {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            alert('Well done ! You are now connected')
            sessionStorage.setItem('userInfo', JSON.stringify(user))
            this.$store.commit('imageSoruceUpdate', user.user.photoURL)
            this.email = ''
            this.password = ''
            window.location.href = '/';
          },
          (err) => {
            alert('Oops, ' + err.message)
            this.dialog2 = true
          }
        )

        
      },
    },
    created () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }
}
</script>
