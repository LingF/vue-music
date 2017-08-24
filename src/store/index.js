/**
 * 入口
 */

// 5.
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 通过 mutations 修改 state 时，控制台会输出logger
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// dev true
const debug = process.env.NODE_ENV !== 'production'

// 相当于单例模式
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 开发环境：严格模式，检测 state 修改是否来自于 mutations，否则警告
  plugins: debug ? [createLogger()] : []
})