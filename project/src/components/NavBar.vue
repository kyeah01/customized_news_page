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

  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
        </template>

        <script>
        export default {
        }
        </script>

        <style lang="css" scoped>
        </style>

      </v-list-group>
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
          icon: 'dashboard',
          routerTo:this.goto('')
        },
        {
          title: 'Test Space',
          icon: 'question_answer',
          routerTo:this.goto('test')

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
