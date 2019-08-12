<template>
    <v-container>
        <h1>Category Setting</h1>
        <v-select
            v-model="select_name_model"
            return-object
            :items="select_name"
            solo
        ></v-select>
        <v-card
            class="mx-auto"
            tile
        >
            <v-list three-line v-if="select_name_model == 'ALL'">
                <v-subheader>SOURCE NAME</v-subheader>
                <div v-for="item in category_structure_source"> 

                    <v-list-tile>

                        <v-list-tile-content>
                            <v-list-tile-title>{{item[0]}}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary"><v-chip small color="green" text-color="white">{{item[1]}}</v-chip></v-list-tile-sub-title>
                        </v-list-tile-content>   
                        <v-list-tile-action> 
                            <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                        </v-list-tile-action>
        
                    </v-list-tile>
                </div>

                <v-divider></v-divider>

                <v-subheader>KEYWORD NAME</v-subheader>

                <div v-for="item in category_structure_keyword">
                    <v-list-tile>
                
                        <v-list-tile-content>
                            <v-list-tile-title>{{item[0]}}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary"><v-chip small color="green" text-color="white">{{item[1]}}</v-chip></v-list-tile-sub-title>
                        </v-list-tile-content>    
                        <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                        
                    
                    </v-list-tile>
                </div>
    
            </v-list>


            <v-list three-line v-else>
                <v-subheader>SOURCE NAME</v-subheader>
                <div v-for="item in category_structure_source"> 

                    <v-list-tile v-show="select_name_model == item[1]">

                        <v-list-tile-content>
                            <v-list-tile-title>{{item[0]}}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary"><v-chip small color="green" text-color="white">{{item[1]}}</v-chip></v-list-tile-sub-title>
                        </v-list-tile-content>   
                        <v-list-tile-action> 
                            <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                        </v-list-tile-action>
        
                    </v-list-tile>
                </div>

                <v-divider></v-divider>

                <v-subheader>KEYWORD NAME</v-subheader>

                <div v-for="item in category_structure_keyword">

                    <v-list-tile v-show="select_name_model == item[1]">
                
                        <v-list-tile-content>
                            <v-list-tile-title>{{item[0]}}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary"><v-chip small color="green" text-color="white">{{item[1]}}</v-chip></v-list-tile-sub-title>
                        </v-list-tile-content>    
                        <v-icon @click="category_delete(item[0], item[2])" size="20">fas fa-trash-alt</v-icon>
                        
                    
                    </v-list-tile>
                </div>
    
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import firebase from 'firebase'
import { async } from 'q';

export default {
    data() {
        return {
            items: [],
            selection: [],
            category_name: [],
            category_structure_source: [],
            category_structure_keyword: [],
            select_name: ["ALL"],
            select_name_model: "ALL",
        }
    },
    methods: {
        category_delete(name, type) {
            let user = firebase.auth().currentUser;
            let db = firebase.firestore().collection('Userinfo').doc(user.uid);
            const select = confirm('삭제하시겠습니까?')
            if (select) {
                // vuex에서 삭제하는 코드
                if (type == this.$store.state.keywordSubTitle) {
                    //keyword 요소를 drag 했을 때.
                    delete this.$store.state.userKeyword[name]
                    db.update({
                        keyword: this.$store.state.userKeyword
                    })
                    this.$store.commit('loadRes')
                } else if (type == this.$store.state.sourceSubTitle) {
                    // source 요소를 drag 했을 때.
                    delete this.$store.state.followSource[name]
                    db.update({
                        keyword: this.$store.state.followSource
                    })
                    this.$store.commit('loadRes')
                }

                sessionStorage.setItem('categories' , JSON.stringify(this.$store.state.followList))
                this.items = JSON.parse(sessionStorage.getItem('categories'))
                // db에서 삭제하는 코드
            }
        },
        init: function() {
            this.items = JSON.parse(sessionStorage.getItem('categories'))

        },
        vuexdata: async function() {
            sessionStorage.setItem('categories' , JSON.stringify(this.$store.state.followList))
            this.items = JSON.parse(sessionStorage.getItem('categories'))
            this.items.forEach(res => {
                this.select_name.push(res.name)
                res.children.forEach(data => {
                    data.children.forEach(children => {
                        if (children.type === 'source') {
                            this.category_structure_source.push([children.name, res.name, children.type])
                        } else if (children.type === 'keyword') {
                            this.category_structure_keyword.push([children.name, res.name, children.type])
                        }
                        
                    })
                })
            })
            return this.category_structure
        }
    },
    created() {
        this.vuexdata()
    },
    computed: {
    },
    watch: {
        items: async function() {
            this.category_structure_source = []
            this.category_structure_keyword = []
            sessionStorage.setItem('categories' , JSON.stringify(this.$store.state.followList))
            this.items.forEach(res => {
                this.select_name.push(res.name)
                res.children.forEach(data => {
                    data.children.forEach(children => {
                        if (children.type === 'source') {
                            this.category_structure_source.push([children.name, res.name, children.type])
                        } else if (children.type === 'keyword') {
                            this.category_structure_keyword.push([children.name, res.name, children.type])
                        }
                        
                    })
                })
            })
        }
    }
}
</script>

