<template>
<div>
        <vue-drag-tree disableDBClick 
                    :data='followList' 
                    :allowDrag='allowDrag' 
                    :allowDrop='allowDrop' 
                    :defaultText='"New Node"' 
                    @current-node-clicked='curNodeClicked' 
                    @drag="dragHandler" 
                    @drag-enter="dragEnterHandler" 
                    @drag-leave="dragLeaveHandler" 
                    @drag-over="dragOverHandler" 
                    @drag-end="dragEndHandler" 
                    @drop="dropHandler" 
                    v-slot="slotProps">
    <!-- customize your node here if don't like the default / 如果你不喜欢默认样式，可以在这里定制你自己的节点 -->
    <!-- <span :class="[slotProps.isClicked ? 'i-am-clicked' : 'i-am-not-clicked']"></span>
    <span class='i-am-node-name'>{{slotProps.nodeName}}</span> -->
    </vue-drag-tree>
    </div>
</template>
<script>
import firebase from 'firebase'

//라이브러리 npm 주소
//https://www.npmjs.com/package/vue-drag-tree

export default {
    data() {
        return {
            data: [{
                name: 'Tech',
                id: 0,
                children: [{
                        name: 'Source',
                        id: 1,
                        children: [{
                                name: 'abc',
                                id: 2,
                            },
                            {
                                name: 'bbc',
                                id: 6,
                            },
                        ],
                    },
                    {
                        name: 'Keyword',
                        id: 4,
                        children: [{
                            name: 'trump',
                            id: 5,
                        }],
                    },
                ],
            }],
            backup:null,
            draging:null,
            droping:null,
        }
    },
    methods: {
        test(){
            this.data = this.$store.state.followList;
            console.log(this.$store.state.followSource);
            console.log(this.$store.state.userKeyword);
            


        },
        allowDrag(model, component) {
            let keywordSubtitle = this.$store.state.sourceSubTitle;
            let sourceSubtitle = this.$store.state.keywordSubTitle;
            
            if (model.name == 'SOURCE' || model.name == 'KEYWORD') {
                // can't be dragged
                // console.log('cant be dragged');
                // console.log('model',model.name);
                return false;
            }
            // can be dragged
            return true;
        },
        allowDrop(model, component) {
            if (model.name == "" || model.name == "") {
                // can't be placed
                return false;
            }
            // can be placed
            return true;
        },
        curNodeClicked(model, component) {
            // console.log('curNodeClicked', model, component);
            // this.backup = JSON.parse(JSON.stringify(this.$store.state.followList));
        },
        dragHandler(model, component, e) {
            // console.log('dragHandler: ', model, component, e);
            
            //drag하는 항목 저장.
            this.draging = model;
        },
        dragEnterHandler(model, component, e) {
            // console.log('dragEnterHandler: ', model, component, e);
            this.backup = JSON.parse(JSON.stringify(this.$store.state.followList));
        },
        dragLeaveHandler(model, component, e) {
            // console.log('dragLeaveHandler: ', model, component, e);
        },
        dragOverHandler(model, component, e) {
            // console.log('dragOverHandler: ', model, component, e);
        },
        dragEndHandler(model, component, e) {
            // console.log('dragEndHandler: ', model, component, e);
        },
        dropHandler(model, component, e) {
            // console.log('dropHandler: ', model, component, e);

            this.droping = model;   // drop되는 곳 정보 저장.
            
            //키워드는 키워드로만, 소스는 소스로만 이동하도록하기.
            //키워드->소스로 이동하거나, 소스->키워드로 이동시키는 경우 백업본으로 덮어씌어버림
            if( this.draging.type != this.droping.name){
                this.$store.state.followList = this.backup;
                return;
            }

            // drag 요소 데이터베이스, vuex에 반영하기
            let type = this.draging.type;
            let name = this.draging.name;
            let destination = this.droping.category;
            let user = firebase.auth().currentUser;
            let db = firebase.firestore().collection('Userinfo').doc(user.uid);

            if( type == this.$store.state.keywordSubTitle ){
                //keyword 요소를 drag 했을 때.
                this.$store.state.userKeyword[name] = destination
                db.update({
                    keyword:this.$store.state.userKeyword
                })
            }else if( type == this.$store.state.sourceSubTitle){
                // source 요소를 drag 했을 때.
                this.$store.state.followSource[name] = destination;
                db.update({
                    keyword:this.$store.state.followSource
                })
            }
        }
    },
    mounted() {
    },
    computed:{
        followList(){
            return this.$store.state.followList;
        }
    }

}
</script>