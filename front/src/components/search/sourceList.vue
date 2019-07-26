<template>
     <v-container grid-list-xs>
            <v-layout row wrap>
              <v-flex xs12 class="margin-30" v-for="source in sourceData" :key="source.id">
                
                <v-card absolute fixed>
                   <v-card-title primary-title>
                      <div>
                        <span class="headline">{{source.name}}
                          <Follow
                          :news=source>
                          </Follow>
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
import Follow from '../search/follow'
export default {
    props:['sourceData'],
    components : {
        Follow
    },
    mounted(){
      
    },
    methods :{
     call: async function(source){
        var jsonData = {};
        var jsonKey = source.id;
        var jsonValue = 'news';
        jsonData[jsonKey] = jsonValue;
        var user=firebase.auth().currentUser
        firebase.firestore().collection('Userinfo').doc(user.uid).get()
          .then(r=>{
            jsonData = r.data().follow;
            jsonData[jsonKey] = jsonValue;
            firebase.firestore().collection('Userinfo').doc(user.uid).update({
              follow : jsonData
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
