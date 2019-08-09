<template lang="html">
<nav>
    <v-toolbar app color="white">
        <v-toolbar-side-icon @click="call" v-if="user"></v-toolbar-side-icon>
        <v-toolbar-title @click="goto('')" style="cursor:pointer">Idle</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">

            <!-- <v-btn flat input-value disabled> -->
            <div class="box" v-if="user">
                <div class="container-1">
                    <br style="height: 20.8px;">
                    <span class="icon"><i class="fa fa-search"></i></span>
                    <input v-model="searchWord" type="search" id="search" placeholder="Search..." @keydown.enter="search" />
                </div>
            </div>

            <v-btn @click="goto('test')" flat>Test Space</v-btn>
            <Login />

        </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer height="92vh" app stateless v-model="drawer" style="background-color: #d9d9d9;">
        
        <!-- <v-toolbar flat> -->
        <v-list>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title class="title">
                        Application
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <!-- </v-toolbar> -->

        <v-divider></v-divider>
        <!-- <span style="margin:30px 0px 30px 10px; height:100px"><v-icon>far fa-newspaper</v-icon> Main</span> -->

        <v-flex xs12>
            <v-btn class="ma-1" 
                    :class="[editMode ? 'edit-mode' : 'not-edit-mode']"
                    :outline='editOutline'
                    small
                    absolute 
                    depressed
                    right 
                    :color="editColor"
                    style="z-index: 3"
                    @click="test"
                    >
                Edit
            </v-btn>
        </v-flex>

        <v-template v-if="!editMode">
        <v-treeview :items="vuexItemList" 
                    :active.sync="selectedItems"
                    activatable 
                    transition 
                    open-all 
                    open-on-click
                    item-key="id" 
                    return-object=true>
            <template v-slot:prepend="{ item, open }">
                <v-icon v-if="item.id < 0">
                    fas fa-rss
                </v-icon>
                <v-icon v-else>
                    {{ open ? 'fas fa-folder-open' : 'fas fa-folder' }}
                </v-icon>
            </template>
        </v-treeview>
        </v-template>

        <manageArticleInNavbar v-else></manageArticleInNavbar>

    </v-navigation-drawer>
    <div class="btn-addContent" :class="[drawer ? 'btn-addContent-open' : 'btn-addContent-close']">
        <v-btn to="/addContent" block flat color="#2bb24c" @click="closeLeftDrawer">
            <v-icon class="white--text mr-1">add</v-icon>
            <span class="white--text" style="font-size: 12px;">ADD CONTENT</span>
        </v-btn>
    </div>

</nav>
</template>

<script>
import firebase from 'firebase'
// import GoogleLogin from './GoogleLogin'
// import FacebookLogin from './FacebookLogin'
import eventBus from '../eventBus'
import Login from '@/components/Login'
import manageArticleInNavbar from '@/components/manageArticleInNavbar'

export default {
    components: {
        // GoogleLogin,
        // FacebookLogin,
        Login,
        manageArticleInNavbar
    },
    computed: {
        vuexItemList() {
            return this.$store.state.followList;
        }
    },
    data() {
        return {
            user: '',
            signupemail: "",
            signuppassword: "",
            email: "",
            password: "",
            dialog1: false,
            dialog2: false,
            weather: [],
            drawer: false,
            write: false,
            // navbar search
            searchWord: "",

            items: [],
            userInfo: null,
            selectedItems: [],
            editMode: false,
            editColor: "#999",
            editOutline:true,
        }
    },
    methods: {
        test(){
            this.editMode = !this.editMode
            
            if( this.editMode ){
                this.editColor = "#ff5722";
                this.editOutline = false;
            }else{
                this.editColor = "#999";
                this.editOutline = true;
            }
        },
        search: function () {
            this.$router.push('/addcontent/' + this.searchWord)
        },
        goto: function (addr) {
            this.$router.push('/' + addr)
        },
        Login: async function () {
            await firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    alert('Well done ! You are now connected')
                    this.email = ""
                    this.password = ""
                },
                (err) => {
                    alert('Oops, ' + err.message)
                    this.dialog2 = true
                }
            )
        },

        init: async function () {
            var user = firebase.auth().currentUser
            var tmp = firebase.firestore().collection("Userinfo").doc(user.uid).get()
                .then(r => {
                    tmp = r.data()

                    this.$store.commit('loadUserinfoData', tmp)
                    this.$store.commit('loadRes')
                    this.items = this.$store.state.followList;
                })
        },
        call: function () {
            if (this.drawer == false && firebase.auth().currentUser != null) {
                this.init()
            } else {
                this.items = null
            }
            this.drawer = !this.drawer

        },
        moveSourceDetail: function (j) {
            alert(j)
            this.$router.push('/article/' + j)
            eventBus.$emit("article", j)
        },
        setTheDB() {
            this.$store.commit('loadRes')
        },
        closeLeftDrawer() {
            this.drawer = !this.drawer
        }
    },
    created() {
        this.user = JSON.parse(sessionStorage.getItem('userInfo')) ? true : false
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        
        // this.setTheDB()
        eventBus.$on('closeByFollow', closeDrawer => {
            this.drawer = closeDrawer
        })
    },
    watch: {
        drawer: function (drawer) {
            eventBus.$on("leftDrawer", navSign => {
                if (navSign) {
                    this.drawer = false
                }
            })
        },
        write: function (source) {
            alert("nav source")
        },
        selectedItems: function () {
            var follow = this.selectedItems[0].name
            var type = this.selectedItems[0].type
            this.$router.push('/article/' + type + '/' + follow)
            eventBus.$emit("article", this.selectedItems)
        },
    }
}
</script>

<style lang="css" scoped>
.btn-edit{

}
.edit-mode{
    color:#fff;
}
.not-edit-mode{

}
.btn-addContent {
    width: 300px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #2bb24c;
    height: 8vh;
    transition: all 0.2s;
}

.btn-addContent-open {
    transform: translateX(0px);
}

.btn-addContent-close {
    transform: translateX(-300px);
}

.test {
    display: block;
    width: 100%;
}

.box {
    /* margin: 100px auto; */
    width: 192px;
    height: 50px;
}

.container-1 {
    width: 192px;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
}

.container-1 input#search {
    width: 192px;
    height: 32px;
    position: absolute;
    top: 85%;
    /* background: #2b303b; */
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 10pt;
    float: left;
    /* color: #63717f; */
    /* padding-left: 45px; */
    padding-left: 35px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    -webkit-transition: background .55s ease;
    -moz-transition: background .55s ease;
    -ms-transition: background .55s ease;
    -o-transition: background .55s ease;
    transition: background .55s ease;
}

.container-1 input#search::-webkit-input-placeholder {
    color: #65737e;
}

.container-1 input#search:-moz-placeholder {
    /* Firefox 18- */
    color: #65737e;
}

.container-1 input#search::-moz-placeholder {
    /* Firefox 19+ */
    color: #65737e;
}

.container-1 input#search:-ms-input-placeholder {
    color: #65737e;
}

.container-1 .icon {
    position: absolute;
    top: 35%;
    margin-left: 17px;
    margin-top: 17px;
    z-index: 1;
    color: #4f5b66;
}

/* .container-1 input#search:hover, .container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  background: #ffffff;
}

.container-1 input#search:focus, .container-1 input#search:active{
  outline:none;
  width: 300px;
}

.container-1:hover input#search{
width: 300px;
}

.container-1:hover .icon{
  color: #93a2ad;
} */
</style>
