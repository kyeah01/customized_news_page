<template>
  <div class="text-xs-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">

        <v-avatar v-on="on">
            <img
            :src=imgSrc
            alt="Profile Image Button for some settings"
            >
        </v-avatar>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src=imgSrc alt="Profile Image Button for some settings">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ user.email }}</v-list-tile-title>
              <v-list-tile-sub-title>welcome! {{user.displayName}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list flat>
          <!-- <v-subheader>REPORTS</v-subheader> -->
          <v-list-item-group color="primary">
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              :to="item.url"
            >
              <!-- <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action> -->
              <v-list-tile-content>
                <v-list-tile-title> {{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="Logout">
              <v-list-tile-content>
                <v-list-tile-title>Log Out</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item-group>
        </v-list>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="menu = false">Save</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'

  export default {
    data: () => ({
      menu: false,
      imgSrc: "https://source.unsplash.com/random",
      user: '',
      items: [
        { name: 'Profile Page', url: '/profile'}, 
        { name: 'Keyword Setting', url: '/'},
        ],

    }),
    created () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          if (user.photoURL != null) {
            this.imageSrc = user.photoURL
          }
          this.user = user
        }
      })
    },
    methods: {
      Logout: function() {
        FirebaseService.Logout()
      },
    }
  }
</script>