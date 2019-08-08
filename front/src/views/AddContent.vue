<template lang="html">
  <v-container>
    <v-layout>
      <v-flex>
            <div class="discover">
                <div class="tabs" style="height: 40px;">
                    <a class="item">
                        <span style="font-size: 16px;"><v-icon class="grey--text" id="rss">fas fa-rss</v-icon>Websites</span>
                    </a>
                    <a class="active item">
                        <span style="font-size: 16px;"><v-icon class="grey--text" id="google">fab fa-google</v-icon>Keyword alerts</span>
                    </a>
                </div>

                <v-flex mt-5>
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
            </div>
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
import sourceList from '@/components/search/source/sourceList'


//user log
import timeCheck from '../timeCheck'
import userLog from '../userLog'
export default {
  components:{
    sourceList
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
  methods: {
    async getSources(){
    await this.$axios.get('https://newsapi.org/v2/sources?apiKey=2dc4b8b9d26f4a6b97e21a1f282bac9d')
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
.discover .tabs {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 36px;
}

.discover .tabs .item {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    display: block;
    float: left;
    font-weight: normal;
    margin-right: 16px;
    margin-bottom: -1px;
    border-bottom: 1px solid transparent;
}

input::-webkit-input-placeholder { 
    color: #9e9e9e; 
}

.fa-rss:before {
    width: 24px;
    margin-right: 4px;
}

.discover .description {
    color: #757575;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.discover .tabs .active {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    font-weight: normal;
    margin-left: 1rem;
    margin-right: 1rem;
}

.fa-google:before {
    width: 24px;
    margin-right: 4px;
}

/* #autocomplete {
  width: 100%;
  height: 56px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.autocomplete-input {
  width: 100%;
} */

.autocomplete-input{
    border:1px solid #eee;
    border-radius:8px;
    width:100%;
    padding:12px 12px 12px 48px;
    box-sizing:border-box;
    position:relative;
    font-size:16px;
    line-height:1.5;
    flex:1;
    background-color:#fff;
    /* background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+"); */
    background-image:url("../assets/search-solid.svg");
    
    background-repeat:no-repeat;
    background-position:12px
}
    
.autocomplete-input:focus,.autocomplete-input[aria-expanded=true]{
    /* border-color:rgba(0,0,0,.12); */
    border-color: #2bb24c;
    background-color:#fff;
    outline:none;
    box-shadow:0 2px 2px rgba(0,0,0,.16)
}[data-position=below] 

.autocomplete-input[aria-expanded=true]{
    border-bottom-color:transparent;
    border-radius:8px 8px 0 0
}[data-position=above] 

.autocomplete-input[aria-expanded=true]{
    border-top-color:transparent;
    border-radius:0 0 8px 8px;
    z-index:2
}

.autocomplete[data-loading=true]:after{
    content:"";
    border:3px solid rgba(0,0,0,.12);
    border-right-color:rgba(0,0,0,.48);
    border-radius:100%;
    width:20px;
    height:20px;
    position:absolute;
    right:12px;
    top:50%;
    transform:translateY(-50%);
    animation:rotate 1s linear infinite
}

.autocomplete-result-list{
    margin:0;
    /* border:1px solid rgba(0,0,0,.12); */
    padding:0;
    box-sizing:border-box;
    max-height:296px;
    overflow-y:auto;
    background:#fff;
    list-style:none;
    box-shadow:0 2px 2px rgba(0,0,0,.16)
}[data-position=below] 

.autocomplete-result-list{
    margin-top:-1px;
    border-top-color:transparent;
    border-radius:0 0 8px 8px;
    padding-bottom:8px
}[data-position=above] 

.autocomplete-result-list{
    margin-bottom:-1px;
    border-bottom-color:transparent;
    border-radius:8px 8px 0 0;
    padding-top:8px
}

.autocomplete-result{
    cursor:default;
    padding:12px 12px 12px 48px;
    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+");
    background-repeat:no-repeat;
    background-position:12px
}
    
.autocomplete-result:hover,.autocomplete-result[aria-selected=true]{
    /* background-color:rgba(0,0,0,.06) */
    background-color: #fff
}

@keyframes rotate{0%{transform:translateY(-50%) rotate(0deg)}to{transform:translateY(-50%) rotate(359deg)}}
</style>