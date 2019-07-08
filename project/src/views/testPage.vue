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
}
</script>

<style lang="css" scoped>
</style>
