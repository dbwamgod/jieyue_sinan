<template>
  <div class="jinfu_title">
    <div class="jt_left" v-if="arrShow">
      <img src="./images/backnew.png" alt="">
    </div>
    <div class="jt_center" @click="chooseArea">
      <span>{{this.orgCodeName}}</span>
      <img src="./images/zhankai@2x.png" alt="">
    </div>
    <div class="jt_right">
      <div class="right" @click="news()">
        <img class="msg_right" src="./images/mesage.png"/>
        <div class="dian"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return {
        arrShow:true,
      }
    },
    components:{
    },
    computed:{
      ...mapGetters(['isIphoneX','orgCodeName'])
    },
    created(){
    },
    mounted(){
    },
    methods:{
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框')
      },
      news(){//进入消息列表
        this.$router.push('/news/newList')
      },
    },
    watch:{
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './index.styl';
</style>
