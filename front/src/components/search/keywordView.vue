<template>
<v-card absolute outlined class="test">
    <v-card-title primary-title>
        <v-layout row wrap>
            <v-flex xs12>
                <span class="headline">{{keyword}}</span>
                <keywordFollow class="follow" :keyword="keyword">
                </keywordFollow>
            </v-flex>
            <v-flex xs12 class="search-content-color">
                <v-layout column wrap>
                    <v-flex xs12 class="mb-3">
                        Track mentions of cc across the world's top news publications
                        <ul>
                            <li v-for="news in keywordNews" :key="news.url">{{news.title}}</li>
                        </ul>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap>
                            <v-flex xs2>
                                <v-layout column wrap>
                                    <v-flex xs1>
                                        {{users_num}}
                                    </v-flex>
                                    <v-flex xs1>
                                        follower
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs2>
                            <v-layout column wrap>
                                <v-flex xs1>
                                    {{totalResults}}
                                </v-flex>
                                <v-flex xs1>
                                    articles
                                </v-flex>
                            </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card-title>
</v-card>
</template>

<script>
import keywordFollow from '@/components/search/keywordFollow'
export default {
    props: ['keywordInfo'],
    components: {
        keywordFollow
    },
    watch: {
        keywordInfo: function () {
            // console.log('watch', this.keywordInfo);
        }
    },
    mounted() {
        // console.log('keywordInfo : ', this.keywordInfo);
    },
    computed: {
        keyword() {
            if (this.keywordInfo != null)
                return this.keywordInfo.word;
            else return "";
        },
        keywordNews: function () {
            if (this.keywordInfo != null) {
                return this.keywordInfo.apiResponse.articles.slice(0, 3);
            } else return 3;

        },
        totalResults() {
            if (this.keywordInfo != null)
                return this.keywordInfo.apiResponse.totalResults;
            else return 0;
        },
        users_num() {
            if (this.keywordInfo != null)
                return this.keywordInfo.users_num;
            else return 0;
        }
    }
}
</script>

<style>
.search-content-color {
    color: #757575;
}
.test{
    border-color: blue;
}
</style>
