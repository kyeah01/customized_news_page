<template lang="html">
  <div class="tabs">
    <v-tabs v-model="active"
    color="syan"
    slider-color="yellow"
    >
      <v-tab
        v-for="n in 3"
        :key="n"
      >
        Item{{n}}
      </v-tab>
      <v-tab-item
        v-for="n in 3"
        :key="n"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

  </div>
</template>

<script>
export default {
data(){
  return {
    active:null,
    text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',


  }
}

}
</script>

<style lang="css" scoped>


</style>
