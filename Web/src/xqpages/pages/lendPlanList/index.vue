<template>
  <div class="lend_plan_list_content">
    <div class="lplc_content">
      <div class="jinfu_title">
        <div class="jt_left" @click="goBack">
          <img src="../../assets/images/backnew.png" alt="">
        </div>
        <div class="jt_center">
          <span>出借计划分布</span>
        </div>
      </div>
    </div>
    <div class="content">
      <mt-loadmore class="loadmorestwo"  :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore">
        <div class="tab">
          <div class="today" @click="changeRouterToday"><span :class="selectActiveDay?'active':''">今日</span></div>
          <div class="month" @click="changeRouterMonth"><span :class="selectActiveMonth?'active':''">本月</span></div>
        </div>
        <ul class="ul_content">
          <li v-for="(item,index) in dataItem">
            <div class="li_content">
              <b :style="{'background':item.color}"></b>
              <p>{{item.title}}</p>
              <span>{{item.num}}</span>
            </div>
          </li>
        </ul>
        <div class="bottom_msg" :class="dataItem.length<5?'bottom_msg_fixed':''">
          <span>—　向前金服 </span>
          <b class="dots"></b>
          <span> 向前向未来　 —</span>
        </div>
        <div slot="top" class="mint-loadmore-top">
          <div class="top_tip">
            <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
            <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
            <span v-show="topStatus === 'loading'"  class='txt loading-txt'>正在刷新...</span>
          </div>
        </div>
        </mt-loadmore>
      </div>
  </div>
</template>
<script>
  import { Loadmore } from 'mint-ui'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return{
        topStatus: '',
        isNoData:false,//没有数据
        selectActiveDay:true,
        selectActiveMonth:false,
        dataItem:[
          {
            color:'red',
            title:'捷e盈90天2018082802捷e盈90天2018082802',
            num:'90%'
          },
          {
            color:'green',
            title:'捷e盈36月期 (A型)2018082802',
            num:'80%'
          },
          {
            color:'red',
            title:'捷e盈90天2018082802',
            num:'90%'
          },
          {
            color:'green',
            title:'捷e盈36月期 (A型)2018082802',
            num:'80%'
          },
          {
            color:'red',
            title:'捷e盈90天2018082802',
            num:'90%'
          },
          {
            color:'green',
            title:'捷e盈36月期 (A型)2018082802',
            num:'80%'
          },
          {
            color:'yellow',
            title:'捷e盈90天2018082802',
            num:'70%'
          },
          {
            color:'green',
            title:'捷e盈36月期 (A型)2018082802',
            num:'80%'
          },
          {
            color:'yellow',
            title:'捷e盈90天2018082802',
            num:'70%'
          },
          {
            color:'green',
            title:'捷e盈36月期 (A型)2018082802',
            num:'80%'
          },
          {
            color:'yellow',
            title:'捷e盈90天2018082802',
            num:'70%'
          }
        ]
      }
    },
    mounted(){

    },
    computed:{
      ...mapGetters(['isIphoneX']),
    },
    components:{
      Loadmore
    },
    methods: {
      goBack(){//返回
        this.$router.back(-1)
      },
      changeRouterToday(){//今日
        this.selectActiveMonth = false;
        this.selectActiveDay = true;
      },
      changeRouterMonth(){//本月
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
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bottom_msg_fixed
    position:fixed
    bottom: 0px
    width:100%
  .bottom_msg
    padding:17px 0
    background:#fff
    text-align:center
    span
      color:#8D92A9
      font-size:12px
    .dots
      width:4px
      height:4px
      background:#8d92a9
      border-radius:50%
      display: inline-block
      margin-bottom: 2px
  .content
    overflow: hidden
    position: absolute
    width: 100%
    top: 60px
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
  img
    width 26px
    height 26px
    margin-right 2px
  span
    font-family PingFangSC-Regular
    font-size 14px
    color #29354D
  .msite_wrap
    width 100%
    height 100%
    background-color #f6f8f9
    overflow hidden
    .swiper
      height 130px
      width 100%
      img
        width 100%
        height 100%
  .ul_content
    position:relative
    width:100%
  .lplc_content
    position:fixed
    width:100%
    z-index:1
  .ul_content>li:nth-child(2n)
    background:#fff
  .ul_content
    li
      padding:24px 50px 24px 63px
      box-sizing:border-box
      background:#FBFAFA
      .li_content
        position:relative
      b
        width: 4px
        height:20px
        background:red
        display:inline-block
        position:absolute
        left:-13px
      p
        font-size: 14px
        color: #29354D
        line-height:21px
        width:87%
        /*overflow: hidden*/
        /*text-overflow: ellipsis*/
        /*white-space: nowrap*/
      span
        font-size: 16px
        color: #010E4F
        position:absolute
        right:0px
        top:3px
  .jt_right
    position:absolute
    right:21px
    top:23px
    img
      width:25px
  .jt_center
    text-align:center
    font-size: 20px
    color: #FFFFFF
    line-height:30px
    height:30px
    span
      color:#fff
      font-size: 18px
    img
      width:20px
      vertical-align: text-top
  .jt_left
    position:absolute
    left:21px
  .jt_left img
    width:25px
  .jinfu_title
    position:relative
    width 100%
    height 40px
    line-height 40px
    padding-top 20px
    text-align center
    background-image url("../../assets/images/zhanbaotitle.png")
    background-repeat no-repeat
    background-size 100% 100%
  .tab
    height 40px
    width 100%
    line-height 40px
    background:pink url("../../assets/images/bj2.png")
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
        font-family PingFangSC-Semibold
      .active
        padding-bottom 2px
        font-family PingFangSC-Semibold
        border-bottom 2px solid #fff
        color:#fff
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
        color:#fff

</style>

