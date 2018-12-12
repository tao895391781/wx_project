<template>
  <div id="banner-component">
    <transition-group name="banner-component-ani">
      <div class="banner-item" :key ="index" v-for="(item,index) in imglist" v-show="index == show" :style="{backgroundImage:'url(' + item + ')'}"
          >{{item.num}}
      </div>
    </transition-group>
    <ul class="banner-component-indicators">
      <li v-for="(item,index) in imglist">
        <span :class="{'active':show==index}" @click="switchitem(index)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['imglist'],
  data () {
    return {
      show:0
    }
  },
  methods: {
    switchitem(index){
      this.show=index;
    }
  }
}
</script>

<style lang="less">
#banner-component{
  overflow-x:hidden;
  position:relative;
  height: 100%;
  .banner-item{
    position:absolute;
    top:0;
    left:0;
    display:inline-block;
    overflow:hidden;
    z-index:0;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .banner-component-indicators{
    position: absolute;
    left:0;right: 0;margin: auto;
    bottom: 5px;
    width: 100%;
    list-style: none;
    text-align: center;
    li{
      width: 1.5rem;
      height: 1.5rem;
      display: inline-block;
      box-sizing: content-box;
      padding: 0 2px;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(35, 33, 33, 0.3);
        border-radius: 50%;
        &.active{
          background-color: rgba(35, 33, 33, 0.7);
        }
      }
    }
  }
  .banner-component-ani-enter-active {
    animation: banner-in .5s ease;
  }
  .banner-component-ani-leave-active {
    animation: banner-out .5s ease;
  }
  @keyframes banner-in {
    0% {
      left:100%;
    }
    100% {
      left:0;
    }
  }
  @keyframes banner-out {
    0% {
      left: 0;
    }
    100% {
      left:-100%;
    }
  }
}
</style>
