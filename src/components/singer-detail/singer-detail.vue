<template>
  <div class="singer-detail"></div>
</template>

<script>
  // 取数据也提供语法糖
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    // getters 最终映射的 computed
    computed: {
      // 等于挂载了一个 singer 属性
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      // 当前子路由刷新是拿不到数据的
      // 因为我们通过 vuex set singer
      // 而 singer 是在列表页点击后去设置的（SET_SINGER）
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      this._getDetail()
    },
    methods: {
      _getDetail() {
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
</style>