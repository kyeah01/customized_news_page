<template>
    <v-card absolute fixed>
    <v-card-title primary-title>
        <v-layout row wrap>
            <v-flex xs12>
                <span class="headline">{{keywordInfo.word}}</span>
                <follow class="testFollow" :kind="keyword" :news="source">
                </follow>
            </v-flex>
            <v-flex xs12>
                <v-layout column wrap>
                    <v-flex xs12 class="test">
                        Track mentions of cc across the world's top news publications
                        <ul>
                            <li v-for="news in keywordNews">{{news.title}}</li>
                        </ul>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap>
                            <v-flex xs1>
                                <v-layout column wrap>
                                    <v-flex xs1>
                                        {{keywordInfo.users_num}}
                                    </v-flex>
                                    <v-flex xs1>
                                        follower
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                                <v-layout column wrap>
                                    <v-flex xs1>
                                        {{keywordInfo.apiResponse.totalResults}}
                                    </v-flex>
                                    <v-flex xs1>
                                        articles
                                    </v-flex>
                                </v-layout>
                            <v-flex xs1>
                                
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card-title>
    <v-card-actions>
    </v-card-actions>
</v-card>    
</template>
<script>
export default {
    props:['keywordInfo'],
    watch:{
        keywordInfo:function(){
            console.log('watch', this.keywordInfo);
            
        }
    },
    computed:{
        keywordNews:function(){
            console.log('hi',this.keywordInfo.apiResponse.articles);
            
            return this.keywordInfo.apiResponse.articles.slice(0, 3);
        }
    }
}
</script>
<style>
.test{
    color: #757575;
}
</style>
