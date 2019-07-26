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
    loadFollow(state, fromDB){
      state.followKeyword=fromDB
    },
    loadSource(state, fromDB){
      state.followSource=fromDB
    },
    loadRes(state){
      for(var i in state.followKeyword){
        state.followReturn[state.followKeyword[i]]=[]
      }

      for(var j in state.followSource){
        state.followReturn[state.followSource[j]].push(j)
       }

       console.log(state.followReturn)
    },
    loadFollowInfo(state, fromDB){
      state.followinfo=fromDB
    },

  },
  actions: {

  }
})
