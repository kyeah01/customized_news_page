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
                          <v-text-field label="Your given name"></v-text-field>
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

            <!-- 4 -->
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
              @click.stop="drawer = !drawer"
            >
              Toggle
            </v-btn>
          </v-layout>
        </v-container>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
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
      </v-layout>

  </div>

</template>

<script>
    export default {
      data () {
        return {
          dialog: false,
          drawer: null,
          items: [
            { title: 'Home', icon: 'dashboard' },
            { title: 'About', icon: 'question_answer' }
          ],
        }
      },
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
  .v-navigation-drawer {
    width: 500px;
  }
</style>