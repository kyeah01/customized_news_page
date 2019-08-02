<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            v-model="drawer"
            right
            style="width:83vw"
      > 
      <v-btn
      flat
      @click="close">
        X
      </v-btn>
        <section class="container630 centered">
          <h1>
            <div class="kicker">Preview</div>
            <div class="heading">Mark as read</div>
          </h1>
              
              <v-flex xs12 v-for="(item, index) in deleteKey" :key="item.title">
                      <v-card :key="item.title">
                        <v-layout row>
                          <v-flex>
                            <img id="articleImage" v-bind:src="item.urlToImage" style="width:130px; height:78px;" @click="open_Detaildrawer(item)">
                          </v-flex>
                          
                          <v-flex>
                            <v-card-title primary-title>
                                <v-layout row>
                                  <!-- <div> -->
                                    <span class="headline" id="title" v-if="!item.mark_as_read" @click="open_Detaildrawer(item)">{{item.title}}</span>
                                    <span class="headline" id="title" v-else style="color:#888888;" @click="open_Detaildrawer(item)">{{item.title}}</span>
                                  <!-- </div> -->
                                  <v-spacer></v-spacer>
                                  <div>
                                    <v-icon @click="delete_from_DB(item, index)">fas fa-trash-alt</v-icon>
                                      <!-- <v-icon id="check" @click="mark_as_read(item)">fas fa-check</v-icon> -->
                                      <!-- <v-icon id="bookmark" v-if="!item.read_later" @click="read_later(item)">far fa-bookmark</v-icon> -->
                                      <!-- <v-icon id="bookmark" v-else @click="read_later(item)" style="color:#2bb24c;">far fa-bookmark</v-icon> -->
                                      <!-- <v-icon @click="read_later(item)">far fa-bookmark</v-icon>
                                      <v-icon @click="read_later(item)">far fa-bookmark</v-icon> -->
                                      <!-- <v-btn class="border-green" flat color="light-green accent-4">Follow</v-btn> -->
                                  </div>
                                </v-layout>
                                
                                  <div id="author" @click="open_Detaildrawer(item)">
                                    <span id="read_later" v-if="item.read_later">Read later</span>
                                    <span id="dot" v-if="item.read_later">·</span>
                                    {{item.author}}
                                  </div>
                                  <!-- <span id="description">{{item.description}}</span> -->
                                  <span id="description" @click="open_Detaildrawer(item)">{{item.description}}</span>

                            </v-card-title>
                          </v-flex>
                          
                        </v-layout>

                        <v-card-actions>

                        </v-card-actions>
                      </v-card>
                    
                    </v-flex>
        
        </section>
      </v-navigation-drawer>
    </div>
    
    <div v-else>
          <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
          >
          </v-navigation-drawer>
    </div>
    <ArticleDetail 
      v-if="detailDrawer === true"
      :drawer = detailDrawer
      :detail = detailItem
      @right_drawer = "closeDetail"
    >
    </ArticleDetail>
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import { watch } from 'fs';
import ArticleDetail from '@/components/article/ArticleDetail'

export default {
  props : ['drawer', 'markasreadarticles'],
  components : {
    ArticleDetail
  },
  data(){
    return{
      detailDrawer : false,
      detailItem : null
    }
  },
  watch: {
    drawer : function() {
      if (!this.drawer) {
          this.$emit('right_drawer', 'update')
      }
    }
  },
  methods: {
    delete_from_DB(item, index) {
      firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('Userinfo').doc(user.uid).update({
          markasread : firebase.firestore.FieldValue.arrayRemove(item)
          })
        })
        this.$emit("deleteMark")
      },
      open_Detaildrawer(item){
        this.detailItem=item
        this.detailDrawer=!this.detailDrawer
      },
      close(){
        this.drawer = !this.drawer
        if(this.detailDrawer){
          this.closeDetail()
        }
      },
      closeDetail(){
        this.detailDrawer=!this.detailDrawer
      },
  },
  computed : {
    deleteKey(){
      return this.markasreadArticles
    }
  }

}
</script>