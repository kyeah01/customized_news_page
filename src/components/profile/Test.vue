<template>
  <div>
    <div v-if="drawer">
      <v-navigation-drawer
            app
            v-model="drawer"
            right
            style="width:83vw"
      >
        <section class="container630 centered">
          <h1>
            <div class="kicker">General</div>
            <div class="heading">Gead</div>
          </h1>

          <v-layout row wrap>
            <v-flex xs8>
              <div class="form profile mb-2">
                    <div class="text-fields">
                      <v-container fluid>
                      <v-flex class="field" v-for="i in item" :key=i.num>
                        <label>{{i.title}}</label>
                        <span class="grey--text">{{i.subtitle}}</span>
                         <v-radio-group v-model="column" column>
                          <v-radio v-for="(k,index) in item.content" :key=index label="2" value="2"></v-radio>
                        </v-radio-group>
                      </v-flex>
                      </v-container>
                    </div>
              </div>
            </v-flex>
          </v-layout>

        
        <v-btn class="green white--text" @click="test">Save changes</v-btn>
        </section>
      </v-navigation-drawer>
    </div>
    
    <div v-else>
          <v-navigation-drawer
            app
            v-model="drawer"
            right
          >
          </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
export default {
    props : ['drawer'],
    methods :{
        test(){
          this.$emit('right_drawer')
        }
    },
    data(){
      return{
        column : null,
        item :[
          {title : 'title1', 
           subtitle : 'subtitle1',
           content : ['test1','test2','test3']
          },
          {title : 'title2', 
           subtitle : 'subtitle2',
           content : ['test4','test5','test6']
          },
          {title : 'title3', 
           subtitle : 'subtitle3',
           content : ['test7','test8','test9','test10']
          },
          {title : 'title4', 
           subtitle : 'subtitle4',
           content : ['test11','test12','test13']
          },
          {title : 'title5', 
           subtitle : 'subtitle5',
           content : ['test14','test15','test16']
          }
        ]
      }
    }
    
}
</script>