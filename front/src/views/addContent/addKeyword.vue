<template lang="html">
<v-container>
    <v-layout>
        <v-flex>
            <searchOptionSelector :active_tab=parentActive_tab>
            </searchOptionSelector>
            <v-flex my-5>
                <div>
                    <p class="description">Discover the best sources for any topic</p>
                </div>
                <!-- search-box start -->
                <div id="autocomplete" class="autocomplete">
                    <input v-model="input" id="input-search" class="autocomplete-input" placeholder="Search by topic" aria-label="Search by topic" autofocus @keyup.enter="search">
                    <ul class="autocomplete-result-list"></ul>
                </div>
                <!-- search-box end -->
            </v-flex>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs9>
            <keywordView :isFollowing="isFollowing" v-show="keywordInfo.word != ''" :keywordInfo="keywordInfo" />
        </v-flex>
        <v-flex xs3>
            <topKeyword />
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase'
import searchOptionSelector from '@/components/search/searchOptionSelector'
import keywordView from '@/components/search/keyword/keywordView'
import topKeyword from '@/components/search/keyword/topKeyword'

//user log
import timeCheck from '@/timeCheck'
import userLog from '@/userLog'

export default {
    components: {
        searchOptionSelector,
        keywordView,
        topKeyword
    },
    props: ['searchWord'],
    data() {
        return {
            sDate: null,
            eDate: null,
            path: '/addKeyword',
            words: null,

            // autocomplete
            input: "",
            keywordsName: [],
            keywordInfo: {
                users: [],
                users_num: 0,
                word: '',
                apiResponse: {
                    articles: [],
                }
            },

            parentActive_tab: 1,

            isFollowing: false,
        }
    },
    computed :{
        keywordFollowing(){
            return this.$store.state.keywordFollowing;
        }
    },
    created() {
        this.sDate = timeCheck()
        window.onload = function () {
            var input = document.getElementById("autocomplete").focus();
        }
    },
    mounted() {
        //db에서 keyword list load
        this.getKeywords();
        this.loadAutoComplete();

        this.input = this.searchWord;
        if (this.searchWord != null) this.search();

    },
    watch: {
        //top10 keyword 클릭시 url 바뀜 -> props 변수 searchWord 변함 -> 검색 실행
        searchWord: function (newVal) {
            this.input = newVal;
            this.search();
        }
    },

    destroyed() {
        this.eDate = timeCheck()
        //save user log on firebase
        var user = firebase.auth().currentUser
        userLog(user, this.path, this.sDate, this.eDate)
    },
    methods: {
        getKeywords() {
            firebase.firestore().collection('Keyword').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        this.keywordsName.push(doc.id);
                    })
                });
        },
        async search() {
            // 입력한 키워드 검색결과에 따라 데이터베이스에 키워드 저장하기.
            await this.$axios.get(`https://newsapi.org/v2/everything?q=${this.input}&apiKey=966170e136db43a98338739406d5f48d`)
                .then(response => {
                    this.keywordInfo['apiResponse'] = response.data;
                    this.keywordInfo['word'] = this.input;
                    var db = firebase.firestore().collection('Keyword');
                    if (response.data.totalResults >= 5) {
                        db.doc(this.input).get().then(doc => {
                            if (!doc.exists) {
                                // keyword 생성
                                db.doc(this.input).set({
                                    word: this.input,
                                    users: [],
                                    users_num: 0
                                })
                                this.keywordInfo['users'] = [];
                                this.keywordInfo['users_num'] = 0;
                            } else {
                                var docData = doc.data();
                                this.keywordInfo['users'] = docData.users;
                                this.keywordInfo['users_num'] = docData.users_num
                            }

                        })
                    }
                    this.isFollowElement(this.input);

                });
        },
        isFollowElement(word) {
            this.isFollowing = false;
            let userKeyword = this.$store.state.userKeyword;

            Object.keys(userKeyword).forEach(element => {
                if (element == word) {
                    this.isFollowing = true;
                }
            })

        },
        loadAutoComplete: function () {

            new Autocomplete('#autocomplete', {
                search: input => {
                    if (input.length < 2) {
                        return []
                    }
                    return this.keywordsName.filter(source => {
                        return source.toLowerCase()
                            .startsWith(input.toLowerCase())
                    })
                }
            })
        },
    }
}
</script>

<style>
</style>
