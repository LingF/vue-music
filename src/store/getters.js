/**
 * 对 state 做一些映射
 */

// 4.用 get 从 state 取对应的数据到组件
// - 做一些简单的代理
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

// - 也可以代理计算属性
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}