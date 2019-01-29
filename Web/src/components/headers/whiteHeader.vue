<template>
  <div class="white-header" :class="isIphoneX?'iphonex-header':''">
    <div class="top">
      <img src="../../assets/images/backnew2.png" class="jiantou" @click="goBack" >
      <span class="news">{{title}}</span>
    </div>
    <div class="top-bg"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props:['title'],
  computed:{
    ...mapGetters(['isIphoneX'])
  },
  methods:{
    goBack(){
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.white-header
  .top
    width 100%
    height 70px
    background-color #fff
    position fixed
    text-align center
    z-index:999
    .jiantou
      position absolute
      left 21px
      top 37px
      width 22px
      height 22px
    .news
      font-size 18px
      color #29354D
      font-family PingFangSC-Medium
      position absolute
      top 40px
      left 50%
      transform translateX(-50%)
  .top-bg
    width 100%
    height 86px
.iphonex-header
  .top
    height 90px
    .jiantou
      top 57px
    .news
      top 60px
  .top-bg
    width 100%
    height 106px
</style>

