<template>
     <v-container grid-list-xs>
            <v-layout row wrap>
              <v-flex xs12 class="margin-30" v-for="source in data" :key="source.id">
                
                <v-card>
                   <v-card-title primary-title>
                      <div>
                        <span class="headline">{{source.name}}</span>
                      <span>
                          <v-btn class="border-green" flat color="light-green accent-4">Follow</v-btn>
                      </span>
                        <div><a href="source.url">{{source.url}}</a></div>
                        <span>{{source.description}}</span>
                      </div>
                    </v-card-title>
                    <v-card-actions>

              </v-card-actions>
                </v-card>

              </v-flex>
            </v-layout>
          </v-container>
</template>
<script>
export default {
    props:['data'],
    data(){
        
    },
    mounted(){

      
    }
}
</script>
