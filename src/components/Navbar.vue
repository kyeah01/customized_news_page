<template lang="html">
  <nav>
  <v-toolbar>
    <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Menu</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
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
const axios = require('axios');
export default {
  data() {
    return {
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
    }
  },
}
</script>

<style lang="css" scoped>
</style>
