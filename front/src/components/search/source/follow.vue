<template>
<v-layout wrap overflow>
    <v-flex shrink>
        <div>
        <v-btn small outline class="green green--text" @click="open">
            Follow
        </v-btn>
        </div>
        <div class="followContent">
        <v-expand-transition>
            <v-card v-show="expand" class="scroll">
                <div v-if="addopen===false">
                        <!-- <input v-model="searchFeed" class="autocomplete-input" placeholder="Search by topic" aria-label="Search by topic" autofocus> -->
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
                    <span class="title font-weight-bold.font-italic" >Feed Name</span>
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
    props: ['news'],
    data: () => ({
        expand: false,
        addopen: false,
        items: null,
        searchFeed: "",
        newFeed: "",
        isFollowing : false,
        search: null,
        caseSensitive: false,
    }),
    
    methods: {
        open: function () {
            if(this.addopen==true){
                this.addopen=false
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
        create: async function (newFeed) {

            // follow (abc - IT)
            var newsId = this.news.id;
            this.$store.state.followSource[newsId] = newFeed

            var user = firebase.auth().currentUser

            // if (this.$store.state.followKeyword.includes(newFeed)) {
            //     this.$store.state.followinfo[newFeed]++
            // } else {
            //     this.$store.state.followinfo[newFeed] = 1
            // }

            firebase.firestore().collection('Userinfo').doc(user.uid).update({
                follow: this.$store.state.followSource,
                followInfo: this.$store.state.followinfo
            })
            this.$store.state.followKeyword = Object.keys(this.$store.state.followinfo)
            this.$store.commit('loadRes')

            this.sourcesManage(this.news, user);

            this.addopen = false
            this.expand = !this.expand

        },
        getFollowKeyword(){

        },
        async sourcesManage(news, user) {
            var db = firebase.firestore().collection('Sources');
            db.where("news_id", "==", news.id).get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        //지금 follow 한 신문사가 데이터베이스에 처음 등록되는 지점
                        var users = [];
                        users.push(user.email);
                        db.doc(news.id).set({
                            news_id: news.id,
                            news_title: news.name,
                            users: users,
                            users_num: 1
                        })
                    } else {
                        // follow하는 신문사가 이미 저장있는 경우
                        // follow user정보와 follow 수치를 update. 

                        var data = querySnapshot.docs[0].data(); //db에 저장된 source 정보
                        if (!data.users.includes(user.email)) {
                            // follw하려는 신문사를 현재 구독중이지 않을 경우
                            // data.users는 특정뉴스를 구독하고 있는 user목록을 반환
                            db.doc(news.id).update({
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
.autocomplete-input {
    border: 1px solid #eee;
    border-radius: 8px;
    width: 100%;
    padding: 12px 12px 12px 48px;
    box-sizing: border-box;
    position: static;
    font-size: 16px;
    line-height: 1.5;
    flex: 1;
    background-color: #fff;
    /* background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+"); */
    background-image: url('../../assets/search-solid.svg');

    background-repeat: no-repeat;
    background-position: 12px
}

.scroll {
    overflow-y: auto;
    position: absolute;
    right: 25px;
    height : 200px;
    width : 300px;
    z-index : 1; 
}

.followContent{
    width : 100px;
}

</style>