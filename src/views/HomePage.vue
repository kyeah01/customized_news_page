<template lang="html">
  <v-container>

    <!-- title -->
    <v-layout row>
      <v-flex xs12>
        Discover the best sources for any topic
      </v-flex>

    </v-layout>
    <v-layout>
      <v-flex>
        <v-form>
          <v-text-field
            outline
            label="Prepend inner"
            prepend-inner-icon="place"
          ></v-text-field>

          <div id="autocomplete" class="autocomplete">
            <input class="autocomplete-input" placeholder="Search for a country" aria-label="Search for a country">
            <ul class="autocomplete-result-list"></ul>
          </div>
        </v-form>
      </v-flex>
    </v-layout>
  <GitGraph/>
  </v-container>


</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import GitGraph from '../components/GitGraph'

//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'



export default {
  data (){
    return {
      sDate : null,
      eDate : null,
      path : '/',
      words:null
    }
  },
  components: {
    GitGraph
  },
  created (){
    this.sDate = timeCheck()
   },
   mounted(){
     this.loadAutoComplete()

     var filePath = 'https://raw.githubusercontent.com/dwyl/autocomplete/master/words.txt'
     var words = this.loadFile(filePath)
     this.words = words.split('\n')

   },
  destroyed(){
    this.eDate = timeCheck()

    //save user log on firebase
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)

  },
  methods: {
    loadAutoComplete: function() {
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 2) {
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
