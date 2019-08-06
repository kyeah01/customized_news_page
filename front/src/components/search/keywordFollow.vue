<template>
<v-layout wrap overflow>
    <v-flex shrink>
        <div>
            <v-btn class="white green--text" @click="open">
                Follow
            </v-btn>
        </div>
        <div class="followContent">
            <v-expand-transition>
                <v-card v-show="expand" class="scroll">
                    <div v-if="addopen===false">
                        <v-list flat>
                            <v-list-tile v-for="item in items" :key="item" @click="create(item)">
                                <v-list-tile-action>
                                    <v-icon>fas fa-rss</v-icon>
                                </v-list-tile-action>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{item}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-divider />
                            <v-list-tile @click="addFeed">
                                <v-list-tile-action>
                                    <v-icon>add</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>add New Feed</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>

                    <div v-else>
                        <span class="title font-weight-bold.font-italic">Feed Name</span>
                        <input v-model="newFeed" class="autocomplete-input" placeholder="New Topic Name" autofocus>
                        <v-btn @click="create(newFeed)" class="success">Create</v-btn>
                        <v-btn @click="before" class="normal">Before</v-btn>
                    </div>
                </v-card>
            </v-expand-transition>
        </div>
    </v-flex>

</v-layout>
</template>

<script>
import firebase from 'firebase'
export default {
    props: ['keyword'],
    data: () => ({
        expand: false,
        addopen: false,
        items: null,
        searchFeed: "",
        newFeed: "",
        isFollowing: false,
        search: null,
        caseSensitive: false,
    }),
    methods: {
        open: function () {
            if (this.addopen == true) {
                this.addopen = false
            }
            this.items = this.$store.state.userCategorys
            this.expand = !this.expand
        },
        addFeed: function () {
            this.addopen = true
        },
        before: function () {
            this.addopen = false
        },
        create: async function (category) {

            // follow (abc - IT);
            var userKeyword = this.$store.state.userKeyword

            userKeyword[this.keyword] = category

            var user = firebase.auth().currentUser

            firebase.firestore().collection('Userinfo').doc(user.uid).update({
                keyword: userKeyword
            })

            this.keywordManage(this.keyword, user);

            this.$store.commit('loadRes')
            this.addopen = false
            this.expand = !this.expand

        },
        async keywordManage(keyword, user) {
            var db = firebase.firestore().collection('Keyword');
            db.where("word", "==", keyword).get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        //지금 follow 한 키워드가 데이터베이스에 없으면 새로 만들고 등록시킴.
                        var users = [];
                        users.push(user.email);
                        db.doc(keyword).set({
                            word: keyword,
                            users: users,
                            users_num: 1
                        })
                    } else {
                        // follow하는 키워드가 데이터베이스에 저장되어 있는 경우
                        // follow user정보와 follow 수치를 update. 
                        var data = querySnapshot.docs[0].data(); //db에 저장된 키워드 정보
                        if (!data.users.includes(user.email)) {
                            // 해당 키워드를 구독중이지 않을 경우에만!
                            // data.users는 특정 키워드를 구독하고 있는 user목록을 반환
                            db.doc(keyword).update({
                                users: firebase.firestore.FieldValue.arrayUnion(user.email),
                                users_num: firebase.firestore.FieldValue.increment(1)
                            })
                        }

                    }

                })
        }
    }
}
</script>

<style>
</style>
