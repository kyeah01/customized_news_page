<template>
    <v-flex shrink>
        <v-btn class="ma-2" color="success" @click="create">
            Follow
        </v-btn>
    </v-flex>
</template>

<script>
import firebase from 'firebase'
export default {
    props: ['keyword'],
    methods: {
        create: async function () {

            // follow (abc - IT);
            var userKeyword = this.$store.state.userKeyword
            if( !userKeyword.includes(this.keyword))
                userKeyword.push(this.keyword)

            var user = firebase.auth().currentUser

            firebase.firestore().collection('Userinfo').doc(user.uid).update({
                keyword: firebase.firestore.FieldValue.arrayUnion(this.keyword)
            })

            this.keywordManage(this.keyword, user);

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

