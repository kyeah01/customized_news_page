<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            temporary
            v-model="drawer"
            right
            style="width:83vw"
      > 
      <v-btn
      flat
      @click="test2">
        X
      </v-btn>
        <section class="container630 centered">
          <h1>
            <div class="kicker">Preview</div>
            <div class="heading">Mark as read</div>
          </h1>
          {{items}}


          
              
              
              <v-flex xs12 v-for="(item, index) in items" :key="item.title">
                      <v-card :key="item.title">
                        <v-layout row>
                          <v-flex>
                            <img id="image" v-bind:src="item.urlToImage" style="width:130px; height:78px;" @click="call(item)">
                          </v-flex>
                          
                          <v-flex>
                            <v-card-title primary-title>
                                <v-layout row>
                                  <!-- <div> -->
                                    <span class="headline" id="title" v-if="!item.mark_as_read" @click="call(item)">{{item.title}}</span>
                                    <span class="headline" id="title" v-else style="color:#888888;" @click="call(item)">{{item.title}}</span>
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
                                
                                
                                
                                  <div id="author" @click="call(item)">
                                    <span id="read_later" v-if="item.read_later">Read later</span>
                                    <span id="dot" v-if="item.read_later">·</span>
                                    {{item.author}}
                                  </div>
                                  <!-- <span id="description">{{item.description}}</span> -->
                                  <span id="description" @click="call(item)">{{item.description}}</span>

                            </v-card-title>
                          </v-flex>
                          
                        </v-layout>

                        <v-card-actions>

                        </v-card-actions>
                      </v-card>

                    </v-flex>

            
          


         
        
        <v-btn class="green white--text" @click="test1">Save changes</v-btn>
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
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'

export default {
  props : ['drawer', 'items', 'dir'],
  watch: {
    drawer: function() {
      if (!this.drawer) {
        console.log(this.val)
        if (this.val) {
          this.$emit('right_drawer', 'close')
        } else {
          this.$emit('right_drawer', 'save')
        }
      }
    }
  },
  
  methods: {
      test1() {
        this.val = false
        this.drawer = !this.drawer
      },
      test2(){
        this.val = true
        this.drawer = !this.drawer
      },
      delete_from_DB(item, index) {
        console.log(item)
        console.log(index)
        // console.log(userid)

        firebase.auth().onAuthStateChanged((user) => {
          console.log(user.uid)
          // var FieldValue = require('firebase-admin').firestore.FieldValue;
          const db = firebase.firestore();
          db.collection('Userinfo').doc(user.uid).update({
            markasread : FieldValue.delete()
          })
          // db.collection('Userinfo').doc(user.uid).get()
          //   .then(doc => {
          //     console.log(doc.data().markasread)
          //     console.log(doc.data().markasread[0])
          //     // doc.data().markasread[index]
          //     this.items = doc.data().markasread
          //     console.log('items1', this.items)
          //     // console.log('length', this.items.length)
          //   })
          //   .catch((err) => {
          //     console.log('Error getting documents', err);
          //   });
        })
        // this.markasread_length = this.items.length
        // console.log('markasread_length', this.markasread_length)
      }
  },
  data(){
    return{
      val: true,
      data2 : true,
      markasread_length : null,
      // articles: [123]
    }
  },
  // mounted() {
  //   let _article = this.articles
  //   _article = this.items
  //   console.log('this.articles', _article)
  // }  
}
</script>