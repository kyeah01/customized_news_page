<template lang="html">
  <nav>
  <v-toolbar app color="white">
    <v-toolbar-side-icon
    @click="call"
    ></v-toolbar-side-icon>
    <v-toolbar-title @click="goto('')" style="cursor:pointer">Idle</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      
      <!-- <v-btn flat input-value disabled> -->
        <div class="box" v-if="user">
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

      <v-btn @click="goto('test')" flat>Test Space</v-btn>
      <Login/>
      
   
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
      <!-- 최상위 1 그룹-->
      <v-list-group
      prepend-icon="account_circle"
      value="true"
      >
      <template v-slot:activator>
        <v-list-item-title>Feeds</v-list-item-title>
      </template>
      
      <!-- 1-1 그룹 시작-->
      
      <v-list-group
        no-action
        sub-group
        value="true"
        v-for="key in $store.state.followKeyword"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{key}}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-tile
        v-for="j in $store.state.followReturn[key]"
        @click="moveSourceDetail(j)">
          <!-- <v-list-tile-action>
          <v-icon>{{ content.icon }}</v-icon>
        </v-list-tile-action> -->

        <v-list-tile-content>
          <v-list-tile-title>{{j}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      </v-list-group>
      <!-- 1-1 그룹 끝-->
      
      </v-list-group>
      <!-- 최상위 1 그룹 끝-->
    </v-list>

    <v-spacer></v-spacer>
    <v-footer class="justify-center pl-0" height="51" inset app style="background-color: #2bb24c">
      <v-btn to="/addcontent" block flat color="#2bb24c">
        <v-icon class="white--text mr-1">add</v-icon>
          <span class="white--text" style="font-size: 12px;">ADD CONTENT</span>
      </v-btn>
    </v-footer>
   </v-list>
    <v-spacer></v-spacer>
  </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import eventBus from '../eventBus'
import Login from './Login'

const axios = require('axios');

export default {
  components: {
    GoogleLogin,
    FacebookLogin,
    Login,
  },
  data() {
    return {
      user: '',
      signupemail: "",
      signuppassword: "",
      email: "",
      password: "",
      dialog1: false,
      dialog2: false,
      weather: [],
      drawer: false,
      write : false,
      // navbar search
      searchWord:"",
    }
  },
  methods: {
    search:function(){
      this.$router.push('/addcontent/' + this.searchWord)
    },
    goto: function(addr) {
      this.$router.push('/' + addr)
    },
    Login: async function() {
      await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          alert('Well done ! You are now connected')
          this.email = ""
          this.password = ""

          // this.init()

        },
        (err) => {
          alert('Oops, ' + err.message)
          this.dialog2 = true
        }  
      )

    },
    init : function(){
      var user=firebase.auth().currentUser
      var tmp=firebase.firestore().collection("Userinfo").doc(user.uid).get()
        .then(r=> {tmp = r.data()

      this.$store.commit('loadFollowData',tmp)
      this.$store.commit('loadRes')
      })
    },
    call : function(){
      if(this.drawer ==false && firebase.auth().currentUser!=null){
        this.init()
      }else{
        this.items=null
      }
      this.drawer=!this.drawer
    },
    moveSourceDetail : function(j){
      alert(j)
      this.$router.push('/article/' + j)
      eventBus.$emit("article",j)
    }
  },
  created() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo')) ? true : false
  },
  watch : {
    drawer : function(drawer){
    eventBus.$on("leftDrawer", navSign=>{
      if(navSign){
        this.drawer=false
      }
    })
    },
    write : function(source){
      alert("nav source")
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
