<template>
  <div class="performance_ranking_content">
    <div class="tlc_title">
      <p class="tc_left" v-html="currentType?'今日业绩排行':'本月业绩排行'"></p>
    </div>
    <div class="tcl_content">
      <div class="tc_li" v-for="(item,index) in todayPerData">
        <div class="tl_money">
          <span>{{item.money}}</span>元
        </div>
        <span class="tl_title">{{item.areaType}}</span>
        <div class="tl_hr_content">
          <span>
            <div class="tl_hr_bar" :style="{'width':item.percent}"></div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        todayPerData:[
          {
            areaType:'北部',
            money:'850,9888,83',
            percent:'80%'
          },
          {
            areaType:'西部',
            money:'850,9888,83',
            percent:'100%'
          }
        ]
      }
    },
    mounted(){

    },
    methods: {

    },
    props:{
      currentType:Boolean
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .performance_ranking_content
    width: 93.3%
    padding:14px 20px 36px 17px
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    border-radius: 4px
    background:#fff
    box-sizing: border-box
    margin: 14px auto 0
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
        margin:0 0 11px 0
        float:left
    .tcl_content
      .tc_li
        .tl_money
          text-align:right
          font-size: 12px
          color: #29354D
          margin:20px 0 10px 0
          span
            font-size: 16px
        position:relative
        .tl_title
          position:absolute
          bottom: 0px
          font-size: 14px
          color: #29354D
        .tl_hr_content
          span
            display:block
            overflow:hidden
            box-shadow: 0 0 1px 1px rgba(39,114,255,0.30) inset
            border-radius:10px
          padding:0 0 0 45px
        .tl_hr_bar
          height: 10px
          -webkit-border-radius: 10px
          -moz-border-radius: 10px
          border-radius: 10px
          background-image: linear-gradient(225deg, #65B2FF 0%, #7DC9FF 100%)
</style>

