import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

// 应用初始状态
const state = {
  count: 10,
  singlePointToSinglePoint: {
    startPoint: '0,0',
    endPoint: '3,3',
    delay: '1nS',
    power: '0mW',
    playTime: 1,
    routeAlgorithm: 'XY-Route'
  }
}



// 创建 store 实例
export default new Vuex.Store({
  // actions,
  getters,
  state,
  mutations
})