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
    imgSrc: ''
  },
  mutations: {
    loadFollowData(state, fromDB){
      state.followSource = fromDB.follow;
      state.followinfo = fromDB.followInfo;
      state.followKeyword = Object.keys(state.followinfo);
    },
    loadRes(state){
      for(var i in state.followKeyword){
        state.followReturn[state.followKeyword[i]]=[]
      }
      for(var j in state.followSource){
        state.followReturn[state.followSource[j]].push(j)
      }
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
