<template>
  <div>
    <v-container>

        <v-layout row header>
          <v-flex xs6 md6>
          <h1>
            <span class="heading" id="header-title">Manage account</span>
            <div class="sub">Logged in using Google</div>
          </h1>
          </v-flex>

          <v-flex xs6 md6>
            <div>
              <v-btn>upgarade</v-btn>
              <v-btn>delete account</v-btn>
              <v-btn fab small flat><v-icon>fas fa-redo</v-icon></v-btn>

              <!-- modal start -->
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
                  <v-btn fab small flat v-on="on"><v-icon>fas fa-redo</v-icon></v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">Your Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap xs6>

                        <div>
                        <v-flex xs12>
                          <v-text-field mb-1 label="Your given name"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Your family name"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="E-mail address"></v-text-field>
                        </v-flex>
                        </div>

                        <div>
                          <v-flex xs12>Your profile picture</v-flex>
                          <v-flex xs12>Image</v-flex>
                          <!-- Image Upload using Imgur api -->
                          <v-flex xs12><router-link to="/imageupload"><v-btn>Choose file</v-btn></router-link></v-flex>
                          <v-flex xs12>Remove image</v-flex>

                        </div>



                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- modal end -->

            </div>
          </v-flex>
        </v-layout>

        <!-- card -->
        <v-layout row>
            <v-flex d-flex xs12 sm6 md3 offset-sm1>
                <v-card>
                    <!-- <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    aspect-ratio="2.75"
                    ></v-img> -->

                    <v-card-title primary-title>
                    <!-- <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div> {{ card_text }} </div>
                    </div> -->
                    </v-card-title>

                    <v-card-actions>
                    <!-- <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn> -->
                      <v-btn flat>Your Profile</v-btn>
                      <v-btn fab small flat><v-icon>fas fa-cog</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm6 md3 offset-sm1>
                <v-card>
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div> {{ card_text }} </div>
                    </div>
                    </v-card-title>

                    <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <!-- 3 -->
            <!-- <v-flex d-flex xs12 sm6 md3 offset-sm1>
                <v-card>
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    aspect-ratio="2.75"
                    ></v-img>

                    <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div> {{ card_text }} </div>
                    </div>
                    </v-card-title>

                    <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex> -->

        </v-layout>
    </v-container>

     <v-layout
        wrap
        style="height: 200px;"
      >
        <v-container>
          <v-layout justify-center>
            <v-btn
              color="pink"
              dark
              @click.stop="right_drawer = !right_drawer"
            >
              Toggle
            </v-btn>
          </v-layout>
        </v-container>

        <div v-if="right_drawer">
          <v-navigation-drawer
            app
            v-model="right_drawer"
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
                        <!-- <div class="fx-input">
                          <input id placeholder type="text" value="test">
                        </div> -->
                      </div>
                      <div class="field">
                        <label>Your family name</label>
                        <v-text-field label="Outline" single-line outline style="color: #757575; border: 1px solid rgba(0, 0, 0, 0.15);"></v-text-field>
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
                  <!-- <div class="picture" style="background-image: url(https://source.unsplash.com/random);">
                  </div> -->
                  <!-- <button class="secondary small" type="button">Choose File</button><br>
                  <button class="secondary small" type="button">Remove Image</button><br> -->
                </div>
                </v-flex>
              </v-layout>
              <v-btn class="green white--text" @click.stop="right_drawer=false">Save changes</v-btn>
              <!-- <button class="primary" type="button">Save changes</button> -->
            </section>
          </v-navigation-drawer>
        </div>
        
        <div v-else>
          <v-navigation-drawer
            app
            v-model="right_drawer"
            right
          >
            <v-list class="pa-1">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>John Leider</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
              <v-divider></v-divider>

              <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click=""
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
        </div>
      </v-layout>

  </div>

</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import ImgUpload from '../components/ImgUpload'

    export default {
      components: {
        ImgUpload
      },
      data () {
        return {
          email: '',
          dialog: false,
          right_drawer: false,
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
          }
        }
      },  
        created (){
          var date= new Date();
          this.sDate.hour=date.getHours()
          this.sDate.min=date.getMinutes()
          this.sDate.second=date.getSeconds()

          firebase.auth().onAuthStateChanged((user) => {
                      if (!user) {
                          this.$router.push("/")
                      } else {
                        this.email = user.email
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

<style>
  .header {
    margin-bottom: 3rem;
  }

  .header h1 .sub {
    color: #757575;
    font-size: 1.25rem;
    font-weight: normal;
  }

  .kicker {
    color: #9e9e9e;
    font-size: 11px;
    font-weight: normal;
    letter-spacing: 0;
    line-height: 1em;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .v-navigation-drawer--right h1 {
    font-size: 2.125rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.25em;
    margin-bottom: 3rem;
    margin-top: 3rem;
    text-transform: none;
  }

  .container630 {
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    max-width: 654px;
  }

  .field label {
    margin: 0 0 8px;
  }

  .text-fields {
    display: inline-block;
    padding-right: 4rem;
    width: 100%;
  }

  .text-fields .field {
    margin-bottom: 1.5rem;
  }

  .text-fields .field label {
    display: block;
    margin: 0 0 8px;
    font-size: 14px;
    /* font-size: 0.875rem; */
    line-height: 20px;
    font-weight: 700;
    text-transform: none;
  }

  .container630 .picture-upload label {
    margin: 0 0 8px;
    font-weight: 700;
    /* font-size: 14px; */
  }

  /* .text-fields .field label .fx-input {
    border: 1px;
  } */
  
  /* .text-fields .field label input {
    height: 2.5rem;
  } */
  
  /* .field label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  } */
</style>
