<template>
  <div class="top" :class="isIphoneX?'iphonex-top':''">
    <img src="../../assets/images/backnew.png" class="jiantou" @click="goBack">
    <span class="aBout">{{title}}</span>
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
.top
  width 100%
  height 70px
  background-color dodgerblue
  text-align center
  position relative
  .jiantou
    position absolute
    left 21px
    top 37px
    width 22px
    height 22px
  .aBout
    font-size 18px
    color #FFFFFF
    position absolute
    top 40px
    left 50%
    transform translateX(-50%)
    font-family PingFangSC-Medium
.iphonex-top
  padding-top 20px
  .jiantou
    top 57px
  .aBout
    top 60px
</style>

