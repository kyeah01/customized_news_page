<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <v-list two-line>
          <template v-for="(item, index) in article">
            <v-subheader 
              v-if="index===0"
              :key="index"
            >
              {{ header }}
            </v-subheader>

            <v-list-tile
              :key="index"
              avatar
              @click="translater(item.title)"
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>
                  <span class="text--primary">{{item.writer}}</span>
                  &mdash;
                  {{item.subtitle}}
                </v-list-tile-sub-title>
                
              </v-list-tile-content>
            </v-list-tile>

             <v-divider
              :key="index"
              :inset="true"
            ></v-divider>

          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import { async, Promise } from 'q';

  export default {
    
    data () {
      return {
        header : 'Today',
        article : [

        ]
      }
    },
    mounted(){
      this.allArticle()
      // this.todayArticle()
      $(window).scroll(function(){
           let $window = $(this);
           let scrollTop = $window.scrollTop();
           let windowHeight = $window.height();
           let documentHeight = $(document).height();
            if( scrollTop + windowHeight == documentHeight ){
              console.log("scroll")
              
            }
      })
    },
    methods: {
        translater: async function (text) {
            const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')
            googleTranslate.translate(text, 'ko', function(err, translation) {
            console.log(translation.translatedText);
            });
        },
        allArticle : async function(){
           await firebase.firestore().collection('Article').get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                this.article.push(doc.data())
                // console.log(doc.data())
              })
            })
        },
        todayArticle : async function(){
          await firebase.firestore().collection('Article').where('registerTime','>=',6).get()
            .then(querySnapshot=>{
              if(querySnapshot.empty){
                console.log("empty")
              }else{
                querySnapshot.docs.forEach(doc=>{
                  // console.log(document.data())
                  this.article.push(doc.data())
                })
              }
            })
        }
     }  
  }
</script>
