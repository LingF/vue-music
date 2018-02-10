# vue-music
vue练习用

> 音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## vuex 使用
1. 定义state，设计好原始数据结构（组件、模块或项目相关的最底层的数据）<定义数据>
2. getters是对数据的一些映射，可以是函数（例：currentSong）<获得数据>
3. 定义mutations，对数据修改的逻辑。（pre：定义mutation-types，定义需要的修改动作）<修改数据>
4. actions