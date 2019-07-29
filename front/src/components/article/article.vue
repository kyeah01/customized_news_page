<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm2>
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
                      <img id="image" v-bind:src="item.urlToImage" style="width:130px; height:78px;">
                    </v-flex>
                    
                    <v-flex>
                      <v-card-title primary-title>
                          <v-layout row>
                            <!-- <div> -->
                              <span class="headline" id="title" @click="call">{{item.title}}</span>
                            <!-- </div> -->
                            <v-spacer></v-spacer>
                            <div>
                                <v-icon id="check" @click="mark_as_read(item)">fas fa-check</v-icon>
                                <v-icon id="bookmark" @click="read_later(item)">far fa-bookmark</v-icon>
                                <!-- <v-icon @click="read_later(item)">far fa-bookmark</v-icon>
                                <v-icon @click="read_later(item)">far fa-bookmark</v-icon> -->
                                <!-- <v-btn class="border-green" flat color="light-green accent-4">Follow</v-btn> -->
                            </div>
                          </v-layout>
                          
                          
                          
                            <div id="author">{{item.author}}</div>
                            <!-- <span id="description">{{item.description}}</span> -->
                            <span id="description">{{item.content}}</span>

                      </v-card-title>
                    </v-flex>
                    
                  </v-layout>

                  <v-card-actions>

                  </v-card-actions>
                </v-card>

              </v-flex>

      </v-card>
    </v-flex>
    <div v-if="parentDrawer===true">
      <ArticleDetail
       :drawer = parentDrawer
       :detail = parentDetail
       @right_drawer = "update"
       >
      </ArticleDetail>
    </div>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import { async, Promise } from 'q';
import ArticleDetail from '@/components/article/ArticleDetail'

// news api 로드
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8b64e14d415f40f2a7d2969321afc5f9');

  export default {
    components : {
      ArticleDetail
    },
    data () {
      return {
        article : [{header:'today'}],
        country: 'us',
        category: 'entertainment',
        busy: false,
        limit: 20,
        pageSize: 20,
        page: 0,

        parentDrawer : false,
        parentDetail : ''
      }
    },
    created(){
      this.leadMore()
      console.log('article정보', this.article)
    },
    methods: {
        translater: function (idx) {
            const googleTranslate = require('google-translate')('AIzaSyCWwcfPvVrgAbrDw6urNwinqawQ6WlE_f4')

            googleTranslate.translate(this.article[idx].title, 'ko', (err, translation) => {
            this.article[idx].title = translation.translatedText
            })

            googleTranslate.translate(this.article[idx].description, 'ko', (err, translation) =>   {
            this.article[idx].description = translation.translatedText
            })
        },
        topheadlinesArticle: function () {
          // 한번에 불러 올 수 있는 최대가 1~100사이의 수이고, 한번에 20개를 호출하기때문에 5번만 호출가능.
          if (this.page<5){
          this.page += 1
          this.busy = true

          newsapi.v2.topHeadlines({
            country: this.country,
            category: this.category,
            pageSize: this.pageSize,
            page: this.page
          }).then(res => {
            res.articles.forEach(post => {
              post.switch = false
              this.article.push(post)
              this.article.push({ divider: true, inset: true })
            })
            this.busy = false
          }).catch(err=> {
            this.busy = false
            console.log(err)
          })
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
        call : function(index,item){
          alert(index)
          this.parentDetail=item
          // this.update()
          this.parentDrawer = !this.parentDrawer
          
        },
        update(){
        this.parentDrawer = !this.parentDrawer
        },
        mark_as_read(item) {
          var user = firebase.auth().currentUser
          console.log(user.uid)
          firebase.firestore().collection('Userinfo').doc(user.uid).update({
            markasread: firebase.firestore.FieldValue.arrayUnion({title: item.title, author: item.author, description: item.description})
          })
        },
        read_later(item) {
          var user = firebase.auth().currentUser
          console.log(user.uid)
          firebase.firestore().collection('Userinfo').doc(user.uid).update({
            readlater: firebase.firestore.FieldValue.arrayUnion({title: item.title, author: item.author, description: item.description})
          })
        }

     }  
  }
</script>

<style scoped>
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

#image {
  margin-top: 24px;
  margin-left: 16px;
}

.v-card {
  width: 65vw;
}

#check {
  padding: 0 2px;
  font-size: 16px;
}

#bookmark {
  padding: 0 2px;
  font-size: 16px;
}
</style>
