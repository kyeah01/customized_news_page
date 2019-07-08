<template lang="html">
  <nav>
  <v-toolbar>
    <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn @click="goto('test')" flat>Test Space</v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <v-navigation-drawer app v-model="drawer" class="gray lighten-2">
    <v-toolbar>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">Menu</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="item.routerTo">
        <v-list-tile-action>

        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [{
          title: 'Home',
          icon: 'dashboard'
        },
        {
          title: 'About',
          icon: 'question_answer'
        }
      ]
    }
  },
  methods:{
    goto: function(addr){
      this.$router.push('/' + addr)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
