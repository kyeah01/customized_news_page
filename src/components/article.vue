<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card height="500px">
        <v-list two-line>
          <template v-for="(item, index) in todayArticle">
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
        <div class="text-xs-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPage"
            :total-visible="totalPage"
            @click="showPage(currentPage+1)"
          ></v-pagination>
        </div>
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
        todayArticle: [
         
        ],
        totalPage : 1,
        currentPage : 1,
        length : 4,
        allArticle : [

        ]
      }
    },
    mounted(){
      this.totalNum()
      this.showPage(1)
    },
    methods: {
        translater: async function (text) {
            const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')
            googleTranslate.translate(text, 'ko', function(err, translation) {
            console.log(translation.translatedText);
            });
        },
        totalNum : async function(){
          var tmp=0;
          var db2=await firebase.firestore().collection('Article').get()
            .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                this.allArticle.push(doc.data())
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
        showPage : function(num){
          // console.log(this.totalPage)
          this.todayArticle=[]
          console.log(num)
          let tmp=firebase.firestore().collection('Article').orderBy('registerTime').limit(num*this.length)
          tmp.get()
            .then((snapshot)=>{
              let first=snapshot.docs[(num-1)*this.length]
              let next=firebase.firestore().collection('Article').orderBy('registerTime').startAt(first.data().registerTime).limit(this.length)
              next.get().then((snapshot)=>{
                snapshot.forEach((doc)=>{
                  this.todayArticle.push(doc.data())
                })
              })
            })
        }
      }
   }
</script>

<style lang="css" scoped>
</style>