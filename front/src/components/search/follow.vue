<template>
  <v-layout
    wrap
    overflow
  >
    <v-flex shrink>
      <v-btn
        class="ma-2"
        color="primary"
        @click="open"
      >
        Follow
      </v-btn>

      <v-expand-transition>
        <v-card
          v-show="expand"
          height="200"
          width="300"
          class="scroll"
        >
        <div v-if="addopen===false">
          <input
            v-model="searchFeed" 
            class="autocomplete-input" 
            placeholder="Search by topic" 
            aria-label="Search by topic" 
            autofocus
          >
            <v-list flat >
              <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click="create(item)"
              >
              <v-list-tile-action>
              <v-icon>fas fa-rss</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider/>
          <v-list-tile @click="addFeed">
              <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>add New Feed</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          </v-list>
        </div>

        <div v-else>
          <span class="grey--text">Feed Name</span>
          <input 
            v-model="newFeed" 
            class="autocomplete-input" 
            placeholder="Search by topic" 
            autofocus
          >
          <v-btn @click="create(newFeed)">Create</v-btn>
          <v-btn @click="before">Before</v-btn>
        </div>
        </v-card>
      </v-expand-transition>
    </v-flex>

   
  </v-layout>
</template>
<script>
import firebase from 'firebase'
  export default {
    props : ['news'],
    data: () => ({
      expand : false,
      addopen : false,
      items : null,
      searchFeed:"",
      newFeed:""
    }),
    methods : {
      open : function(){

      this.items=this.$store.state.followKeyword
      this.expand=!this.expand
        
      },
      addFeed : function(){
        this.addopen=true
      },
      before : function(){
        this.addopen=false
      },
      create : async function(newFeed){
        
        // follow (abc - IT)
        var newsId = this.news.id;
        this.$store.state.followSource[newsId] = newFeed

        var user=firebase.auth().currentUser

        if(this.$store.state.followKeyword.includes(newFeed)){
          this.$store.state.followinfo[newFeed]++
        }else{
          this.$store.state.followinfo[newFeed]=1       
        }
        
        firebase.firestore().collection('Userinfo').doc(user.uid).update({
          follow : this.$store.state.followSource,
          followInfo : this.$store.state.followinfo
        })
        this.$store.state.followKeyword = Object.keys(this.$store.state.followinfo)
        this.$store.commit('loadRes')


        this.addopen=false
        this.expand=!this.expand
      }
    }
  }
</script>

<style>
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
    background-image:url('../../assets/search-solid.svg');
    
    background-repeat:no-repeat;
    background-position:12px
}
    .scroll {
      overflow-y: auto;
    }

</style>