<template lang="html">
  <v-container>
    <v-layout>
      <v-flex>
                <searchOptionSelector/>

                <v-flex my-5>
                    <div>
                        <p class="description">Discover the best sources for any topic</p>
                    </div>
                    <!-- search-box start -->
                    <div id="autocomplete" class="autocomplete">
                        <input v-model="input" 
                              id="input-search"
                              class="autocomplete-input" 
                              placeholder="Search by topic" 
                              aria-label="Search by topic" 
                              autofocus
                              @keyup.enter="search">
                        <ul class="autocomplete-result-list"></ul>
                    </div>
                    <!-- search-box end -->
                </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
         <sourceList :sourceData="resultSearch"></sourceList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import sourceList from '@/components/search/sourceList'
import searchOptionSelector from '@/components/search/searchOptionSelector'



//user log
import timeCheck from '@/timeCheck'
import userLog from '@/userLog'
export default {
  components:{
    sourceList, searchOptionSelector
  },
  props:['searchWord'],
  data (){
    return {
      sDate : null,
      eDate : null,
      path : '/',
      words:null,
      
      // autocomplete
      input:"",
      sources:[],
      sourceNames:[],
      resultSearch:[]
    }
  },
  watch:{
    searchWord:function(newVal){
      this.search();
    }
  },
  created (){
    this.sDate = timeCheck()
    window.onload = function() {
        var input = document.getElementById("autocomplete").focus();
    }
   },
   async mounted(){
      //  신문사 정보 axios로 받아오기
     await this.getSources()
     this.loadAutoComplete()
    //  var filePath = 'https://raw.githubusercontent.com/dwyl/autocomplete/master/words.txt'
    //  var words = this.loadFile(filePath)
    //  this.words = words.split('\n')

  //navbar에서 검색했을 때 router url 파라메터로 어떤 입력했는지 받아와서 검색실행
    this.input = this.searchWord;
    if( this.searchWord != null){
      this.search();
      this.searchWord = null;
    }
   },
  destroyed(){
    this.eDate = timeCheck()
    //save user log on firebase
    var user=firebase.auth().currentUser
    userLog(user, this.path, this.sDate, this.eDate)
  },
  // const newsapi = new NewsAPI('8b64e14d415f40f2a7d2969321afc5f9'); // 07/13 16:00
// const newsapi = new NewsAPI('2dc4b8b9d26f4a6b97e21a1f282bac9d'); //hojin : 07/31 23:00
  methods: {
    async getSources(){
    await this.$axios.get('https://newsapi.org/v2/sources?apiKey=8b64e14d415f40f2a7d2969321afc5f9')
      .then( r=> {
        this.sources = r.data.sources           
        })
        this.sourceNames = []
        this.sources.forEach(element => {
        this.sourceNames.push(element.name)
        });
    },
    search(){      
      var input = document.getElementById("input-search").value
      console.log(input);
      
      if( this.searchWord != null ) input = this.searchWord;
      
      this.resultSearch = []
      this.sources.forEach(element =>{
        if( element.name.toLowerCase().indexOf(input.toLowerCase()) != -1 ){
          this.resultSearch.push(element)
        }
      })
    },
    loadAutoComplete: function() {
      // console.log(this.sourceNames);
      
      new Autocomplete('#autocomplete', {
        search: input => {
          if (input.length < 2) {
            return []
          }
          return this.sourceNames.filter(source => {
            return source.toLowerCase()
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