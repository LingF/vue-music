<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="slider-group">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots"
        :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {BROWSER_TIME} from 'base/config'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      // 浏览器刷新 17ms 一次
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, BROWSER_TIME)

      window.addEventListener('resize', () => {
        if (!this.slider) return
        this._setSliderWidth(true) // 不能再去加宽度 -> isResize
        this.slider.refresh()
      })
    },
    methods: {
      // 设置 slider 宽度
      _setSliderWidth(isResize) {
        this.children = this.$refs['slider-group'].children

        let width = 0
        // 父元素宽度，因为子元素都与 slider 相同
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0, c = this.children, j = c.length; i < j; i++) {
          let child = c[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // 循环：多2个sliderWidth
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs['slider-group'].style.width = width + 'px'
      },
      // dots
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      // 初始化
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false, // 惯性
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
          // click: true
          // better-scroll -> 劫持click，派发一个click
          // 然后派发的 click 又被 fastclick 劫持
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) { // 循环会在前面加一个，所以要减1
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1  // 对应的是第几个元素
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed() { // 销毁计时器
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>