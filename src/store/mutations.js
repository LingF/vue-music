// 3.
import * as types from './mutation-types'

// 挂载一些修改的方法
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations