<template>
  <div class="singer-detail"></div>
</template>

<script>
  // 取数据也提供语法糖
  import {mapGetters} from 'vuex'

  export default {
    // getters 最终映射的 computed
    computed: {
      // 等于挂载了一个 singer 属性
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log(this.singer)
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