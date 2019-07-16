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

        ],
        pageNum : 1,
        totalPage : 1,
        currentPage : 1,
      }
    },
    mounted(){
      //this.todayArticle()
      //this.showPage(1)
      this.allArticle()
      // this.todayArticle()

      $(window).scroll(function(){
           let $window = $(this);
           let scrollTop = $window.scrollTop();
           let windowHeight = $window.height();
           let documentHeight = $(document).height();
            // scrollbar의 thumb가 바닥 전 30px까지 도달 하면 리스트를 가져온다.
           if( scrollTop + windowHeight + 30 > documentHeight ){
              console.log("bb")
              this.allArticle()
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
        allArticle : function(){
           firebase.firestore().collection('Article').get()
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
        },
        totalNum : async function(){
          var tmp=0;
          var db2=await firebase.firestore().collection('Article').get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                this.article.push(doc.data())
                // console.log(doc.data())
                tmp++
              })
            })
            if(tmp%this.length==0){
              this.totalPage=tmp/this.length
            }else{
              this.totalPage=parseInt((tmp/this.length))+1
            }
            console.log(this.totalPage)
        },
        showPage : function(pageNum){
          // console.log(this.totalPage)
          console.log(num)
          let tmp=firebase.firestore().collection('Article').orderBy('registerTime').limit(num*this.length)
          tmp.get()
            .then((snapshot)=>{
              let first=snapshot.docs[(num-1)*this.length]
              let next=firebase.firestore().collection('Article').orderBy('registerTime').startAt(first.data().registerTime).limit(this.length)
              next.get().then((snapshot)=>{
                snapshot.forEach((doc)=>{
                  this.article.push(doc.data())
                })
              })
            })
        }
     }  
  }
</script>