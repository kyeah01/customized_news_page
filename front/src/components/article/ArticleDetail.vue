<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            stateless
            v-model="drawer"
            right
            style="width:83vw"
      >
        <section class="container630 centered">
          <h1>
            <div class="kicker">ArticleDetail</div>
            <div class="heading">Example</div>
          </h1>
          <!-- <img :src="detail.urlToImage"> -->
          <v-layout>
    <v-flex>
      <v-card>
        <v-img
          :src="detail.urlToImage"
          aspect-ratio="2"
        ></v-img>
       

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ detail.title }}</h3>
            <h5 style="color:grey;">{{ detail.source.name }} - {{ detail.author }}</h5>
            <br>
            <div> {{ detail.content }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
        <v-btn class="green white--text" @click="test">Save changes</v-btn>
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
import('@/assets/profileCss.css')
export default {
    props : ['drawer','detail'],
    methods :{
        test(){
          this.$emit('right_drawer')
        }
    },
    mounted() {
      console.log('detail', this.detail)
    },
    data(){
      return{
        data2 : true,
        item :[
          {title : 'title1', 
           subtitle : 'subtitle1',
           checkbox : [
             {
               index : 1,
               content : "test1",
               value : true
             },
            ]
          },
           {title : 'title2', 
           subtitle : 'subtitle2',
           checkbox : [
             {
               index : 4,
               content : "test4",
               value : true
             },
            ]
          },
          {title : 'title3', 
           subtitle : 'subtitle4',
           checkbox : [
             {
               index : 4,
               content : "test6",
               value : false
             },
            ]
          }
        ]
      }
    }
    
}
</script>