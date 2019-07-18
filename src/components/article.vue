<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
        <v-card v-infinite-scroll="leadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
        <v-list two-line>
          <template v-for="(item, index) in article">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click="translater(item.title)"
            >
              <v-list-tile-avatar>
                <!-- <img :src="item.avatar"> -->
                  <!-- <v-switch v-model="item.switch"></v-switch> -->
                  <v-btn flat icon color="green" @click="translater(index)">
                    <v-icon>cached</v-icon>
                  </v-btn>

              </v-list-tile-avatar>


              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title>
                <span class="text--primary">{{item.author}}</span>
                  &mdash;
                  {{item.description}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import 'firebase/firestore'
import { async, Promise } from 'q';

// news api 로드
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8b64e14d415f40f2a7d2969321afc5f9');

  export default {
    data () {
      return {
        article : [{header:'today'}],
        country: 'us',
        category: 'entertainment',
        busy: false,
        limit: 20,
        pageSize: 20,
        page: 0
      }
    },
    created(){
      this.leadMore()
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
        }
     }  
  }
</script>
