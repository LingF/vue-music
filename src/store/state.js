/**
 * 状态管理
 */
import {playMode} from 'common/js/config'

// 1.
// 设计：保存最原始的数据，可计算而来的不需要（可放入getters）
const state = {
  singer: {},
  // 播放器 播放／暂停
  playing: false,
  // 全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 歌曲列表
  // 顺序播放时，与 playlist 一样
  // 随机播放不一样
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 播放索引
  currentIndex: -1
}

export default state