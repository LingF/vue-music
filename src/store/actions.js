/**
 * - 异步操作
 * - mutation做一些封装（多个mutation时）
 */
import * as types from './mutation-types'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list) // 设置顺序播放列表
  commit(types.SET_PLAYLIST, list)      // 设置播放列表
  commit(types.SET_CURRENT_INDEX, index)// 设置播放索引
  commit(types.SET_FULL_SCREEN, true)   // 设置全屏
  commit(types.SET_PLAYING_STATE, true) // 设置播放状态ing
}