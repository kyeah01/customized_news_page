<template>
<v-container grid-list-xs>
    <v-layout column wrap>

    </v-layout>
    <v-layout row wrap>

        <v-flex xs9>
            <v-layout row wrap>
                <v-flex xs9>
                    <span>SORTING BY FEEDLY SCORE</span>
                    <v-icon>expand_more</v-icon>
                </v-flex>
                <v-flex xs12 class="my-3" v-for="source in sourceData" :key="source.id">
                    <Source :source="source" class="source">
                    </Source>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs3>
            <topSource></topSource>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
import Source from '../search/Source'
import topSource from '../search/topSource'
export default {
    props: ['sourceData'],
    components: {
        Source,
        topSource,
    },
    mounted() {

    },
    methods: {
        call: async function (source) {
            var jsonData = {};
            var jsonKey = source.id;
            var jsonValue = 'news';
            jsonData[jsonKey] = jsonValue;
            var user = firebase.auth().currentUser
            firebase.firestore().collection('Userinfo').doc(user.uid).get()
                .then(r => {
                    jsonData = r.data().follow;
                    jsonData[jsonKey] = jsonValue;
                    firebase.firestore().collection('Userinfo').doc(user.uid).update({
                        follow: jsonData
                    })
                })
        },
        follow(sourceId) {
            // 현재 구독중인 정보를 받아오고 구독할 신문사를 추가하여 db에 update한다.
            var userId = firebase.auth().currentUser.email;
            var userSources = [];
            firebase.firestore().collection('Userinfo').doc(userId).get()
                .then(doc => {
                    userSources = doc.data().sources;
                    userSources.push(sourceId);
                    firebase.firestore().collection('Userinfo').doc(userId).update({
                        sources: userSources
                    })
                })
        }
    }
}
</script>
