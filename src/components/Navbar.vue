<template lang="html">
  <nav>
  <v-toolbar app color="white">
    <v-toolbar-side-icon
    @click="drawer=!drawer"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Idle</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      
      <!-- <v-btn flat input-value disabled> -->
        <div class="box">
          <div class="container-1">
              <br style="height: 20.8px;">
              <span class="icon"><i class="fa fa-search"></i></span>
              <input 
                      v-model="searchWord"
                      type="search" 
                      id="search" 
                      placeholder="Search..." 
                      @keydown.enter="search"/>
          </div>
        </div>


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
   
      <v-btn @click="goto('test')" flat>Test Space</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <v-navigation-drawer app stateless v-model="drawer" style="background-color: #d9d9d9;">
    <!-- <v-toolbar flat> -->
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="title">
              Application
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    <!-- </v-toolbar> -->

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
    <v-spacer></v-spacer>
    <!-- <v-footer class="justify-center pl-0" height="51" inset app style="background-color: #2bb24c"> -->
    <v-btn to="/addcontent" flat color="#2bb24c" class="test">
      <v-icon class="white--text mr-1">add</v-icon>
        <span class="white--text" style="font-size: 12px;">ADD CONTENT</span>
    </v-btn>
    <!-- </v-footer> -->
  </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import eventBus from '../eventBus'
const axios = require('axios');

export default {
  components: {
    GoogleLogin,
    FacebookLogin,
  },
  data() {
    return {
      signupemail: "",
      signuppassword: "",
      email: "",
      password: "",
      userinfo: "",
      dialog1: false,
      dialog2: false,
      weather: [],
      drawer: false,
      // navbar search
      searchWord:"",
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
          title: 'addContent',
          icon: 'question_answer',
          routerTo: 'addcontent'
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
    search:function(){
      this.$router.push('/addcontent/' + this.searchWord)
    },
    goto: function(addr) {
      this.$router.push('/' + addr)
    },
    Login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert('Well done ! You are now connected')
          this.email = ""
          this.password = ""
        },
        (err) => {
          alert('Oops, ' + err.message)
          this.dialog2 = true
        }  
      )
    },
    SignUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.signupemail, this.signuppassword).then(
        (cred, user) => {
          alert('created!!')
          this.dialog2 = false
          this.signupemail = ""
          this.signuppassword = "" 
          console.log(1)
          console.log(cred)
          firebase.firestore().collection('Userinfo').doc(cred.user.uid).set({
            keyword: []
          })      
        },
        (err) => {
          alert('Oops, ' + err.message)
          this.dialog1 = true
        }
      );
    },
    Logout: function() {
      FirebaseService.Logout()
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.userinfo = user
          console.log(user)
      } else {
        this.userinfo = ""
        console.log("Logout")
      }
    })
  },
  watch : {
    drawer : function(drawer){
    eventBus.$on("leftDrawer", navSign=>{
      if(navSign){
        this.drawer=false
      }
    })
    }
  }
}
</script>

<style lang="css" scoped>
.test{
  display: block;
   width: 100%;
}
.box{
  /* margin: 100px auto; */
  width: 192px;
  height: 50px;
}

.container-1{
  width: 192px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}

.container-1 input#search{
  width: 192px;
  height: 32px;
  position: absolute;
  top: 85%;
  /* background: #2b303b; */
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 10pt;
  float: left;
  /* color: #63717f; */
  /* padding-left: 45px; */
  padding-left: 35px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  -webkit-transition: background .55s ease;
  -moz-transition: background .55s ease;
  -ms-transition: background .55s ease;
  -o-transition: background .55s ease;
  transition: background .55s ease;
}



.container-1 input#search::-webkit-input-placeholder {
   color: #65737e;
}
 
.container-1 input#search:-moz-placeholder { /* Firefox 18- */
   color: #65737e;  
}
 
.container-1 input#search::-moz-placeholder {  /* Firefox 19+ */
   color: #65737e;  
}
 
.container-1 input#search:-ms-input-placeholder {  
   color: #65737e;  
}

.container-1 .icon{
  position: absolute;
  top: 35%;
  margin-left: 17px;
  margin-top: 17px;
  z-index: 1;
  color: #4f5b66;
}

/* .container-1 input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  background: #ffffff;
}

.container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  width: 300px;
}
 
.container-1:hover input#search{
width: 300px;
}
 
.container-1:hover .icon{
  color: #93a2ad;
} */

</style>
