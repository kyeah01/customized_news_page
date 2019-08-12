<template>
<v-container>
  <v-layout>
    <v-flex offset-xs1>
      <div id="sourceName"> {{search}}</div>
      <div id="sourceInfo"> Follower : {{follower}} / today {{(article.length-1)/2}} articles</div>
    </v-flex>
  </v-layout>

  <v-layout row wrap>
  <!-- <v-layout row> -->
    <v-flex offset-xs1>
    <!-- <v-flex xs3 id="headerExtra">
      <v-icon>fas fa-redo-alt</v-icon>
      <v-icon>fas fa-ellipsis-h</v-icon>
    </v-flex> -->
      <v-card v-infinite-scroll="leadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">  
      <v-flex xs12 v-for="(item, index) in article" :key="item.title">
        <v-subheader v-if="item.header" :key="item.header">
          {{ item.header }}
        </v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-card v-else :key="item.title">
          <v-layout row>
            <v-flex>
              <img id="articleImage" v-bind:src="item.urlToImage" style="width:130px; height:78px;" @click="call(item)">
            </v-flex>
                    
            <v-flex>
              <v-card-title primary-title>
              <v-layout row>
                <!-- <div> -->
                  <span class="headline pointer" id="title" v-if="!item.mark_as_read" @click="call(item)">{{item.title}}</span>
                  <span class="headline pointer" id="title" v-else style="color:#888888;" @click="call(item)">{{item.title}}</span>
                <!-- </div> -->
              <v-spacer></v-spacer>
                <div>
                  <v-icon id="check" @click="mark_as_read(item)">fas fa-check</v-icon>
                  <v-icon id="bookmark" v-if="!item.read_later" @click="read_later(item)">far fa-bookmark</v-icon>
                  <v-icon id="bookmark" v-else @click="read_later(item)" style="color:#2bb24c;">far fa-bookmark</v-icon>
                  <!-- <v-icon @click="read_later(item)">far fa-bookmark</v-icon>
                  <v-icon @click="read_later(item)">far fa-bookmark</v-icon> -->
                  <!-- <v-btn class="border-green" flat color="light-green accent-4">Follow</v-btn> -->
                </div>
              </v-layout>

                          
                          
                          
              <div id="author" @click="call(item)">
                <span id="read_later" v-if="item.read_later">Read later</span>
                <span id="dot" class="pointer" v-if="item.read_later">·</span>
                {{item.author}}
              </div>
                            <!-- <span id="description">{{item.description}}</span> -->
              <span id="description" @click="call(item)" class="pointer">{{item.content}}</span>

            </v-card-title>
              </v-flex>
                    
            </v-layout>

          <v-card-actions>

        </v-card-actions>
      </v-card>

    </v-flex>

      </v-card>
    </v-flex>

    <v-flex xs4 v-if="search=='Main'" hidden-md-and-down>
      <weather/>
      <br>
      <v-card style="border-radius: 10px; width:100%;">
        <topSource/>
      </v-card>
      <br>
      <v-card style="border-radius: 10px; width:100%;">
        <topKeyword/>
      </v-card>
    </v-flex>

    <div v-if="this.parentDrawer===true">
      <ArticleDetail
       :drawer = parentDrawer
       :detail = parentDetail
       @right_drawer = "update"
       >
      </ArticleDetail>
    </div>
  <!-- </v-layout> -->
  </v-layout>
</v-container>
</template>

<script>
import eventBus from '../../eventBus'
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import { async, Promise } from 'q'
import ArticleDetail from '@/components/article/ArticleDetail'
import topSource from '@/components/search/source/topSource'
import topKeyword from '@/components/search/keyword/topKeyword'
import weather from '../weather'
import env from '../../../env.js'

// const dotenv = require('dotenv');



// news api 로드
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(env.data().api1);

  export default {
    components : {
      ArticleDetail,
      weather,
      topSource,
      topKeyword
    },
    props : ['type','follow'], // 새로 고침 시 url 파라미터 사용하여 api 호출
    data () {
      return {
        article : [{header:'today'}],
        country: 'us',
        busy: false,
        limit: 20,
        pageSize: 20,
        page: 0,

        parentDrawer : false,
        parentDetail : null,
        search : null,
        type : null,
        today : null,
        beforeTwo : null,

        Dfollow_q : null,
        Dfollow_s : null,
        reqNone : false,
        follower : 'XX',
        defaultImage : 'https://via.placeholder.com/300x300/FFFFFF/000000?text='
      }
    },
    methods: {
        translater: function (idx) {
            // const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')

            // googleTranslate.translate(this.article[idx].title, 'ko', (err, translation) => {
            // this.article[idx].title = translation.translatedText
            // })

            // googleTranslate.translate(this.article[idx].description, 'ko', (err, translation) =>   {
            // this.article[idx].description = translation.translatedText
            // })
        },
        topheadlinesArticle: function () {
          // 한번에 불러 올 수 있는 최대가 1~100사이의 수이고, 한번에 20개를 호출하기때문에 5번만 호출가능.
          if (this.page<5){
          this.page += 1
          this.busy = true

          if(this.reqNone){
             this.search="Main"
              newsapi.v2.topHeadlines({
              language: 'en',
              country: 'us'
            }).then(res => {
                res.articles.forEach(post => {
                  if (post.source.name=='Youtube.com') {
                    post.content = ''
                    post.urlToImage = 'https://img.youtube.com/vi/'+post.url.split('?v=')[1]+'/mqdefault.jpg'
                  }
                   else if(post.urlToImage==null){
                    post.urlToImage=this.defaultImage+post.source.name
                  }
                  post.mark_as_read = false
                  post.read_later = false
                  this.article.push(post)
                  this.article.push({ divider: true, inset: true })
                })
                this.busy = false
              }).catch(err=> {
                this.busy = false
                console.log(err)
              })
          }else{
              newsapi.v2.everything({
                // country: this.country,
                // category: this.category,
                sources : this.Dfollow_s,
                q : this.Dfollow_q,
                pageSize: this.pageSize,
                page: this.page
              }).then(res => {
                res.articles.forEach(post => {
                  if(post.urlToImage==null){
                    post.urlToImage=this.defaultImage+post.source.name
                  }
                  post.mark_as_read = false
                  post.read_later = false
                  this.article.push(post)
                  this.article.push({ divider: true, inset: true })
                })
                this.busy = false
              }).catch(err=> {
                this.busy = false
                console.log(err)
              })
            }
          }
        },

        leadMore: function () {
            this.topheadlinesArticle()
          // 어떤 검색방법을 사용할 것인지 결정하는 함수가 들어가야 합니다.
          // topheadlines를 사용할 것인지, everythig을 사용할 것인지,
          // 어떤 카테고리, 어떤 키워드를 골랐는지에 따라 다른 method를 사용해야 합니다.
          // 만약 topheadlines를 사용하는 것이 적절하다면(ex, 그날 그날의 카테고리별 가장 top 뉴스) topheadlinesArticle를 사용하고
          // 만약 everythig을 사용하는 것이 적절하다면 현재 구현되지 않은 everythigArticle을 구현한 다음 이 부분에서 분기하여주는 것이 적절합니다.

          // 또한, topheadlines는 from, to를 통해 날짜 필터링 검색이 가능합니다.
        },
        call : function(item){
          this.parentDetail=item
          this.parentDrawer = !this.parentDrawer
        },
        update(){
         this.parentDrawer = !this.parentDrawer
        },
        mark_as_read(item) {
          var user = firebase.auth().currentUser
          // item.mark_as_read = !item.mark_as_read
          // console.log('mark_as_read', item.mark_as_read)
          // console.log(user.uid)
          if (!item.mark_as_read) {
            firebase.firestore().collection('Userinfo').doc(user.uid).update({
              markasread: firebase.firestore.FieldValue.arrayUnion(item)
            })
            item.mark_as_read = !item.mark_as_read
          } else {
            let delMarkasreadItemFromDB = firebase.firestore().collection('Userinfo').doc(user.uid).get()
              .then(doc => {
                if (!doc.exists) {
                  console.log('No such document!');
                } else {
                  console.log('Document data:', doc.data());
                  doc.data().markasread.forEach(delItem => {
                    if (item.url == delItem.url) {
                      firebase.auth().onAuthStateChanged((user) => {
                        firebase.firestore().collection('Userinfo').doc(user.uid).update({
                          markasread : firebase.firestore.FieldValue.arrayRemove(item)
                        })
                      })
                    } 
                  })
                }
                item.mark_as_read = !item.mark_as_read
              })
          }
        },
        read_later(item) {
          var user = firebase.auth().currentUser
          // console.log('어떤 index?', index)
          console.log('url check', item.url)

          console.log('정체는?', firebase.firestore().collection('Userinfo').doc(user.uid))
          // item.read_later = !item.read_later
          // this.read_later_value = !this.read_later_value
          // console.log('read_later', item.read_later)
          // console.log('article정보2', this.article)
          // console.log('read_later_value', this.read_later_value)
          // console.log('user정보', user)
          // console.log('userdata', firebase.firestore().collection('Userinfo').doc(user.uid))
          // console.log(user.uid)
          if (!item.read_later) {
            firebase.firestore().collection('Userinfo').doc(user.uid).update({
              readlater: firebase.firestore.FieldValue.arrayUnion(item)
            })
            item.read_later = !item.read_later
          } else {
            let delReadlaterItemFromDB = firebase.firestore().collection('Userinfo').doc(user.uid).get()
            .then(doc => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                console.log('Document data:', doc.data());
                doc.data().readlater.forEach(delItem => {
                  if (item.url == delItem.url) {
                    firebase.auth().onAuthStateChanged((user) => {
                      firebase.firestore().collection('Userinfo').doc(user.uid).update({
                        readlater : firebase.firestore.FieldValue.arrayRemove(item)
                      })
                    })
                  } 
                })
              }
            })
            .catch(err => {
              console.log('Error getting document', err);
            });
            item.read_later = !item.read_later
          }
        },
        load_follower(bool){
          if(bool){
            firebase.firestore().collection('Sources').doc(this.Dfollow_s).get()
            .then(r=>{
              this.follower=r.data().users_num
            })
          }else{
             firebase.firestore().collection('Keyword').doc(this.Dfollow_q).get()
            .then(r=>{
              this.follower=r.data().users_num
            })
          }
        }
      },
      //navbar 클릭 X , 새로고침 시 url get,
      mounted(){
        if(Object.keys(this.$route.params).length === 0 && JSON.stringify(this.$route.params) === JSON.stringify({})){
          this.reqNone=true
        }else {
          if(this.$route.params.type === this.$store.state.sourceSubTitle){
            this.Dfollow_s=this.$route.params.follow//bbc-news
            this.load_follower(true)
          }else{
            this.Dfollow_q=this.$route.params.follow
            this.load_follower(false)
          }
          this.search=this.$route.params.follow
          this.type=this.$route.params.type
        }
      },
      //navbar 클릭으로 article 정보 변환시(eventbus)
      watch : {
          ['search' || 'type'] : function(){
              eventBus.$on('article', r=>{
                if(r[0].type === this.$store.state.sourceSubTitle){
                  this.Dfollow_s=r[0].name
                  this.Dfollow_q=null
                  this.load_follower(true)
                }else{
                  this.Dfollow_q=r[0].name
                  this.Dfollow_s=null
                  this.load_follower(false)
                }
                this.search=r[0].name
              })
              this.article=[{header : 'today'}]
              this.page=0
              this.busy=false
              this.topheadlinesArticle()
          }
      }
  }
</script>

<style scoped>
/* header */
#sourceName {
  margin-top: 48px;
  color: #333333;
  font-size: 34px;
  font-weight: bold;
}

#sourceInfo {
  margin-top: 8px;
  margin-bottom: 3rem;
  color: #9E9E9E;
  font-size: 12px;
  /* font-size: 0.75rem; */
}

#headerExtra {
  margin-top: 48px;
  /* margin-top: 8px; */
  /* margin-left: 8px; */
}

#headerExtra .v-icon {
  padding-right: 4px;
  font-size: 20px;
}

/* .layout.row {
  margin: auto;
} */

/* list */
#title {
  display: inline-block;
  font-size: 16px !important;
  letter-spacing: -.04em !important;
  line-height: 1.25em !important;
  margin-bottom: 0.25rem !important;
  text-decoration: none !important;
  width: 72% !important;
}

#author {
  color: #9e9e9e;
  font-size: 13px !important;
  line-height: 18px !important;
  margin-bottom: 0 !important;
  margin-top: 0.25rem !important;
  max-height: 54px !important;
}

#read_later {
  margin-right: 8px;
  color: #2bb24c;
}

#dot {
  margin-right: 8px;
  font-weight: 900px;
}

#description {
  /* font-family: sans-serif; */
  color: #9e9e9e;
  font-size: 13px !important;
  line-height: 18px !important;
  margin-bottom: 0 !important;
  margin-top: 0.25rem !important;
  max-height: 54px !important;

  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important; 
  -webkit-box-orient: vertical !important;
  word-break: break-word !important;
  line-height: 1.2em !important;
  height: 3.6em !important;
}

#articleImage {
  border-radius: 0.2rem;
  margin-top: 24px;
  margin-left: 16px;
}

.v-card {
  width: 65vw;
  max-width: 624px;
}

#check {
  padding: 0 2px;
  font-size: 16px;
}

#bookmark {
  padding: 0 2px;
  font-size: 16px;
}

.pointer {
  cursor:pointer
}
</style>