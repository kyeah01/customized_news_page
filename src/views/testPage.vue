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
  data() {
    return {
      words:null
    }
  },
  mounted() {
    this.loadAutoComplete()

    var filePath = 'https://raw.githubusercontent.com/dwyl/autocomplete/master/words.txt'
    var words = this.loadFile(filePath)
    words = words.split('\n')

    // this.words['a'].push('hi')
    var that = this
    var ascii = 'A'.charCodeAt();
    var alphabet = String.fromCharCode(ascii);

    that.words = new Object();
    that.words['A'] = new Array();
    words.forEach(function(element){

      if(element.toUpperCase()[0].charCodeAt() === ascii){
        that.words[alphabet].push(element)
      }
      else{
        alphabet = String.fromCharCode(ascii++);
        that.words[alphabet] = new Array();
        that.words[alphabet].push(element)

      }
    })


  },
  methods: {
    loadAutoComplete: function() {
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 1) {
            return []
          }


          return this.words.filter(country => {
            return country.toLowerCase()
              .startsWith(input.toLowerCase())
          })
        }
      })
    },
    loadFile : function(filePath) {
      var result = null;
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", filePath, false);
      xmlhttp.send();
      if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
      }
      return result;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
