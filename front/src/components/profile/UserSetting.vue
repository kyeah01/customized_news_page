<template>
    <div>
    <div v-if="drawer">
    <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
            style="width:83vw"
          >
            <section class="container630 centered">
                <h1>
                  <div class="kicker">Manage account</div>
                  <div class="heading">Your profile</div>
                </h1>

              <v-layout row wrap>
                <v-flex xs8>
                  <div class="form profile mb-2">
                    <div class="text-fields">
                      <div class="field">
                        <label>Your given name</label>
                        <v-text-field label="Outline" single-line outline style="border-color: rgba(0, 0, 0, 0.15)"></v-text-field>
                      </div>
                      <div class="field">
                        <label>Your family name</label>
                        <v-text-field label="Outline" single-line outline style="border-color: rgba(0, 0, 0, 0.15)"></v-text-field>
                      </div>
                      <div class="field">
                        <label>Email address</label>
                        <v-text-field label="Outline" v-bind:value=email single-line outline></v-text-field>
                      </div>
                    </div>
                  </div>
                </v-flex>

                <v-flex xs4>
                  <div>
                  <div class="field picture-upload">
                    <label>Your profile picture</label>
                  </div>
                  
                  <ImgUpload></ImgUpload>
                  
                </div>
                </v-flex>
              </v-layout>
                <v-btn class="green white--text" @click="saveTheChange">Save changes</v-btn>
                <v-btn class="red white--text" @click="dontSaveNClose">Close</v-btn>
            </section>
          </v-navigation-drawer>
    </div>
    <div v-else>
          <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
          >
          </v-navigation-drawer>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import ImgUpload from '@/components/profile/ImgUpload'
import('@/assets/profileCss.css')
import eventBus from '../../eventBus'

export default {
  props : ['drawer'],
    components : {
      ImgUpload
    },
    data(){
      return{
        email : '',
        imageSrc: ''
      }
    },
    mounted () {
      eventBus.$on('imgUpdate', (imgSrc) => {
        this.imageSrc = imgSrc
      })
    },
    methods :{
      saveTheChange(){
        // drawer 값 전달하여 navigation drawer를 작동하게 함.
        this.saveTheImg()
        this.$emit('right_drawer')
      },
      saveTheImg (){
        var userinfo = firebase.auth().currentUser
        Object.defineProperty(userinfo, 'photoURL', {
          writable: true
        })
        userinfo.updateProfile ({
          photoURL: this.imageSrc
        })
        // 업로드는 끝났고, navbar avatar와의 동기화를 위한 코드
        this.$store.commit('imageSoruceUpdate', this.imageSrc)
      },
      dontSaveNClose (){
        this.$emit('right_drawer')
      },
    },
    created(){
       firebase.auth().onAuthStateChanged((user) => {                   
        this.email = user.email
      })
    }
    
}
</script>
