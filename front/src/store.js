import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    followKeyword: [],
    followSource : {},
    followReturn : {},
    followinfo : {}
  },
  mutations: {
    loadFollowData(state, fromDB){
      state.followSource = fromDB.follow;
      state.followinfo = fromDB.followInfo;
      state.followKeyword = Object.keys(state.followinfo);


      // state.followKeyword=fromDB
    },
    loadRes(state){
      for(var i in state.followKeyword){
        state.followReturn[state.followKeyword[i]]=[]
      }
      for(var j in state.followSource){
        state.followReturn[state.followSource[j]].push(j)
      }
    }
  },
  actions: {

  }
})
