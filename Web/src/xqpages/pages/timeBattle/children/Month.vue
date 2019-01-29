<template>
  <div class="month_wrap" :class="isIphoneX?'month_wrap_iphonex_head':''">
    <mt-loadmore class="loadmorestwo"   :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore">
      <div class="tab">
      <div class="today" @click="changeRouterOne"><span :class="selectActiveDay?'active':''">今日</span></div>
      <div class="month" @click="changeRouterTwo"><span :class="selectActiveMonth?'active':''">本月</span></div>
    </div>
      <look-lend-money :tagsType="true"  :lendTitle="'本月出借 (元)'"></look-lend-money>
      <financial-list-item v-for="(item,index) in monthLoan" :financialData="item" :key="index"></financial-list-item>
      <div slot="top" class="mint-loadmore-top">
        <div class="top_tip">
          <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
          <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
          <span v-show="topStatus === 'loading'"  class='txt loading-txt'>正在刷新...</span>
        </div>
      </div>
    </mt-loadmore>
    <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop">
      <img src="../../../assets/image-xq/fhdb.png" alt="" class="goTop" v-show="goTopShow" @click="goTop">
    </div>
  </div>
</template>

<script>
  import {Browser} from '../../../../untils/common'
  import { Loadmore } from 'mint-ui'
  import financialListItem from '../../../components/financialListItem'
  import lookLendMoney from '../../../components/lookLendMoney'
  export default {
    data(){
      return{
        isIphoneX:false,
        topStatus: '',
        goTopShow:false,
        selectActiveDay:false,
        selectActiveMonth:true,
        monthLoan:[
          [{"name":"实际赎回金额","value":"565566","unit":"元"},{"name":"到期申请赎回金额","value":"423432423","unit":"元"},{"name":"到期实际赎回金额","value":"4534534534","unit":"元"},{"name":"申请紧急赎回金额","value":"43242","unit":"元"},{"name":"实际紧急赎回金额","value":"43242","unit":"元"}],
          [{"name":"实际回款金额","value":"234555","unit":"元"},{"name":"到期申请赎回金额","value":"423432423","unit":"元"},{"name":"到期实际赎回金额","value":"4534534534","unit":"元"},{"name":"申请紧急赎回金额","value":"43242","unit":"元"},{"name":"实际紧急赎回金额","value":"43242","unit":"元"}],
          [{"name":"净流入金额","value":"234555","unit":"元"},{"name":"到期申请赎回金额","value":"423432423","unit":"元"},{"name":"到期实际赎回金额","value":"4534534534","unit":"元"},{"name":"申请紧急赎回金额","value":"43242","unit":"元"},{"name":"实际紧急赎回金额","value":"43242","unit":"元"}],
          [{"name":"累计申请未完成债权","value":"234555","unit":"元"},{"name":"到期申请赎回金额","value":"423432423","unit":"元"},{"name":"到期实际赎回金额","value":"4534534534","unit":"元"},{"name":"申请紧急赎回金额","value":"43242","unit":"元"},{"name":"实际紧急赎回金额","value":"43242","unit":"元"}]
        ],//当月出借
      }
    },
    created(){
      this.isIphoneX=(Browser.iPhoneX?true:false)
    },
    mounted(){
      window.scrollTo(0,0)
      this.addListener()
    },
    deactivated(){
      this.removeListener()
    },
    methods:{
      addListener(){
        window.addEventListener('scroll', this.handleScroll)
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll)
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        const windowHeight = document.body.clientHeight || document.documentElement.clientHeight
        //滚动加载更多
        // if(scrollTop + windowHeight >= scrollHeight-100){this.loadBottom() }
        //回到顶部
        if(scrollTop>400){
          this.goTopShow=true
          this.scrollTop = scrollTop
        }
        else{
          this.goTopShow=false
        }
      },
      goTop(){
        let timer=null,_that=this;
        cancelAnimationFrame(timer)
        timer=requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer=requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow=false;
          }
        })
      },
      changeRouterOne(){
        this.selectActiveMonth = false;
        this.selectActiveDay = true;
        this.$router.push('/timeBattle/index/today')
      },
      changeRouterTwo(){
        this.selectActiveDay = false;
        this.selectActiveMonth = true;
      },
      loadTop() {//下拉刷新
         setTimeout(()=>{
           this.$refs.loadmore.onTopLoaded();
         },1000)
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
    },
    components:{
      Loadmore,
      financialListItem,
      lookLendMoney
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus"  scoped>
.month_wrap
  position absolute
  top 68px
  left 0
  right 0
  bottom 0
  background-color #f6f8f9
  .tab
    height 40px
    width 100%
    line-height 40px
    background-image url("../../../assets/images/bj2.png")
    background-repeat no-repeat
    background-size 100% 100%
    display flex
    .today
      text-align right
      flex 1
      padding-right 15px
      span
        font-size 16px
        color #D0ECFF
        padding-bottom 2px
        font-family PingFangSC-Semibold
      .active
       padding-bottom 2px
       font-family PingFangSC-Semibold
       border-bottom 2px solid #fff
       color #fff
    .month
      flex 1
      text-align left
      padding-left 15px
      span
        font-size 16px
        color #D0ECFF
        font-family PingFangSC-Semibold
        padding-bottom 2px
      .active
       padding-bottom 2px
       font-family PingFangSC-Semibold
       border-bottom 2px solid #fff
       color #fff
  .loadmorestwo
    background-color #f6f8f9
    margin-bottom 0
    padding-bottom 68px
    .mint-loadmore-top
      height 50px
      .top_tip
        width 100%
        height 50px
        position relative
        img
          position absolute
          top 10px
          left 3.866667rem
          width 25px
          height 25px
        .txt
          padding-left 30px
          font-size 13px
          color #29354D
        .loading-txt
          padding-left 36px
        .icon
          display inline-block
          position absolute
          top 10px
        .reush_tip
          position absolute
          left 0
          top 16px
          width 100%
          height 20px
          .txt
            padding-left 0px
            font-size 10px
            color #29354D
  .topBar
    position fixed
    bottom 60px
    right 20px
    img
      width 40px
      height 40px
  .iphonex-top-bar
    bottom 80px
.month_wrap_iphonex_head
  top 88px
</style>
