<template>
  <div class="nabob_ranking_content">
    <div class="tlc_title">
      <p class="tc_left" v-html="currentType?'今日富豪排行':'本月富豪排行'"></p>
      <div class="tc_right" @click="lookNabobList">
        <span>更多</span>
        <img src="../../assets/images/youjiantou1.png" alt="">
      </div>
    </div>
    <div class="tcl_content">
      <div class="tc_li" v-for="(item,index) in nabobData">
        <img :src="require('../assets/image-xq/'+item.icon+'@2x.png')" alt="">
        <p class="nameArea">{{item.areaName}}</p>
        <div class="money">
          <span>{{item.money}}</span>万
        </div>
        <p class="time">{{item.time}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        nabobData:[
          {
            icon:2,
            areaName:'上海*李',
            money:'1000',
            time:'04.12 15:30'
          },
          {
            icon:1,
            areaName:'上海*李',
            money:'2000',
            time:'04.12 15:30'
          },
          {
            icon:3,
            areaName:'上海*李',
            money:'3000',
            time:'04.12 15:30'
          }
        ]
      }
    },
    mounted(){

    },
    methods: {
      //查看富豪排行榜
      lookNabobList(){
        this.$router.push('../plutocratList/price')
      }
    },
    props:{
      currentType:Boolean
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nabob_ranking_content
    width: 93.3%
    padding:14px 20px 15px 17px
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    border-radius: 4px
    background:#fff
    box-sizing: border-box
    margin: 0 auto
    .tlc_title
      position:relative
      &:after
        content:''
        display:block
        width: 100%
        height: 1px
        background: #F1F1F1
        position:absolute
        bottom: 0px
        right:0px
      overflow:hidden
      .tc_left
        font-size: 16px
        color: #010E4F
        margin:0 0 13px 0
        float:left
      .tc_right
        float:right
        span
          font-size: 12px
          color: #29354D
        img
          width:15px
          vertical-align: text-bottom
    .tcl_content
      display: flex
      justify-content: space-between
      padding:15px 5px 0
      .tc_li
        text-align:center
        img
          width:44px
          height:52px
          margin:0 0 8px 0
        .nameArea
          font-size: 12px
          color: #A6A6A6
        .money
          font-size: 12px
          color: #010E4F
          line-height: 30px
          span
            font-size:18px
        .time
          font-size: 10.8px
          color: #6C7B8A
</style>


