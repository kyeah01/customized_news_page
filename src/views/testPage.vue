<template lang="html">

<div class="">

  <div id="autocomplete" class="autocomplete">
    <input class="autocomplete-input" placeholder="Search for a country" aria-label="Search for a country">
    <ul class="autocomplete-result-list"></ul>
  </div>

</div>


</template>

<script>
export default {
  data(){
    return {
      countries :[
        'korea',
        'america'
      ]
    }
  },
  mounted(){
    this.loadAutoComplete()
  },
  methods:{
    loadAutoComplete:function(){
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 1) { return [] }
          return this.countries.filter(country => {
            return country.toLowerCase()
              .startsWith(input.toLowerCase())
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
