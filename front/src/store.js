import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    followKeyword: [],
    followSource : {},
    followReturn : {},
    followinfo : {},
    imgSrc: '',

    userKeyword : {},
    userCategorys :[],
    followList:[],

    //
    sourceSubTitle:"SOURCE",
    keywordSubTitle:"KEYWORD"
  },
  mutations: {
    loadUserinfoData(state, fromDB){
      state.followSource = fromDB.follow;
      state.followinfo = fromDB.followInfo;
      state.userKeyword = fromDB.keyword;
      state.followKeyword = Object.keys(state.followinfo);

    },
    loadRes(state){
      console.log('loadRes start');
      
      state.userCategorys = [];
      let followList = [];
      let sequenceId = 0;
        // firebase.firestore().collection('Userinfo').doc(this.userInfo.user.uid).get()
        //   .then(docs => {
          let res = state.followSource
            for (let key in res) {
              // 여기서 받는 key는 source의 name들임
              // name들에 category있는지 확인해야함.
              let judge = -1;
              followList.find((v, i) => {
                if (v.name == res[key]) {
                  judge = i
                }
                })
              
              if (judge == -1) {
                // 카테고리가 없는 경우
                followList.push({
                  name: res[key],
                  id:sequenceId++,
                  children: [
                    {
                    name: state.sourceSubTitle,
                    id:sequenceId++,
                    category:res[key],
                    children: [
                      {
                        name: key,
                        id:sequenceId++,
                        type: state.sourceSubTitle
                      }
                    ]
                  },
                  {
                    name: state.keywordSubTitle,
                    id:sequenceId++,
                    category:res[key],
                    children: []
                  },
                ]
              })
                state.userCategorys.push(res[key])
                
              } else {
                // 카테고리가 있는 경우
                followList[judge].children[0].children.push({
                  name: key,
                  id:sequenceId++,
                  type: state.sourceSubTitle
                })
              }
            }
            let resK = state.userKeyword
            for (let key in resK) {
              // 여기서 받는 key는 source의 name들임
              // name들에 category있는지 확인해야함.
              let judge = -1;
              followList.find((v, i) => {
                if (v.name == resK[key]) {judge = i}
                })
              if (judge == -1) {
                // 카테고리가 없는 경우
                followList.push({
                  name: resK[key],
                  id:sequenceId++,
                  children: [
                    {
                      name: state.sourceSubTitle,
                      id:sequenceId++,
                      category: resK[key],
                      children: []
                    },
                    {
                    name: state.keywordSubTitle,
                    id:sequenceId++,
                    category: resK[key],
                    children: [
                      {
                        name: key,
                        id:sequenceId++,
                        type: state.keywordSubTitle
                      }
                    ]
                  }]
                })
                state.userCategorys.push(resK[key])
              } else {
                // 카테고리가 있는 경우
                // if (folliwList[judge].children.find((v,i)=> {
                //   if (v.name == 'key')
                // })
                followList[judge].children[1].children.push({
                  name: key,
                  id:sequenceId++,
                  type: state.keywordSubTitle
                })
              }
            }
        //   })
        state.followList = followList

        //followList
            console.log(followList);
            
        console.log('loadRes end');
        
        
      // state.userCategorys = [];
      // var userCategorys = state.userCategorys;

      // state.followKeyword.forEach(element=>{
      //   userCategorys.push(element);
      // })

      // Object.values(state.userKeyword).forEach(element=>{
      //   if( !state.userCategorys.includes(element))
      //     userCategorys.push(element)
      // })


      // for(var i in state.followKeyword){
      //   state.followReturn[state.followKeyword[i]]=[]
      // }
      // for(var j in state.followSource){
      //   state.followReturn[state.followSource[j]].push(j)
      // }
    },
    updateFollowList(state, data) {
      state.followList = data
    },
    imageSoruceUpdate(state, image){
      state.imgSrc = image
    },
    imageSoruceDestroy(state) {
      state.imgSrc = ''
    }
  },
  actions: {

  }
})
