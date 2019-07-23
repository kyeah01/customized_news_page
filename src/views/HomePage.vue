<template lang="html">
<div>
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


          <!-- search-box start -->
          <div id="autocomplete" class="autocomplete">
            <input class="autocomplete-input" placeholder="Search by topic" aria-label="Search by topic">
            <ul class="autocomplete-result-list"></ul>
          </div>
          <!-- search-box end -->
        </v-form>
      </v-flex>
    </v-layout>
  <GitGraph/>

  </v-container>
  <Footer/>
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import GitGraph from '../components/GitGraph'
import Footer from '../components/Footer'

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
    GitGraph,
    Footer,
  },
  created (){
    this.sDate = timeCheck()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/article')
      }
    })
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
    background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+");
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