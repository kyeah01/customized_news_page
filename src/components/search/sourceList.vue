<template>
     <v-container grid-list-xs>
            <v-layout row wrap>
              <v-flex xs12 class="margin-30" v-for="source in sourceData" :key="source.id">
                
                <v-card>
                   <v-card-title primary-title>
                      <div>
                        <span class="headline">{{source.name}}</span>
                      <span>
                          <v-btn  
                                  class="border-green" 
                                  flat color="light-green accent-4"
                                  @click="follow(source.id)"
                                  >Follow</v-btn>
                          <v-btn class="border-green" flat color="light-green accent-4" @click="call(source)">Follow</v-btn>
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
import firebase from 'firebase'
import FirebaseService from '@/services/FirebaseService'
import eventBus from '../../eventBus'
export default {
    props:['sourceData'],
    mounted(){
      
    },
    methods :{
      call: async function(source){
        alert(source.name)
        eventBus.$emit('contents',source)
        alert("sl end")
        var user=firebase.auth().currentUser
        await firebase.firestore().collection('User').doc(user.id).update({
          sourceFollow : firebase.firestore.FieldValue.arrayUnion({
            name : source.name,
            url : source.url,
            descrip : source.description
          })
        })
      },
      follow(sourceId){
          // 현재 구독중인 정보를 받아오고 구독할 신문사를 추가하여 db에 update한다.
          var userId = firebase.auth().currentUser.email;
          var userSources = [];
          firebase.firestore().collection('Userinfo').doc(userId).get()
          .then(doc=>{
            userSources = doc.data().sources;
            userSources.push(sourceId);
            firebase.firestore().collection('Userinfo').doc(userId).update({
              sources : userSources
            })
          })
      }
    }
}
</script>
