<template>
  <div class="today_lend_content">
    <div class="tlc_title">
      <p class="tc_left" v-html="currentType?'今日出借计划分布':'本月出借计划分布'">今日出借计划分布</p>
      <div class="tc_right" @click="toList">
        <span>更多</span>
        <img src="../../assets/images/youjiantou1.png" alt="">
      </div>
    </div>
    <div class="tcl_content">
      <lend-plan-gauge v-for="(item,index) in dataList" :chartData="item" :key="index"></lend-plan-gauge>
    </div>
  </div>
</template>
<script>
  import lendPlanGauge from '../components/lendPlanGauge'
  export default {
    data(){
      return{
        dataList:[
          {
            percent:'90',
            produceTitle:'捷e盈365期',
            time:'04.12 15:30'
          },
          {
            percent:'50',
            produceTitle:'',
            time:'04.12 15:30'
          },
          {
            percent:'10',
            produceTitle:'捷e盈24月期',
            time:''
          }
        ]
      }
    },
    mounted(){

    },
    components:{
      lendPlanGauge
    },
    methods: {
      //查看出借计划分布列表
      toList(){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop =0;
        this.$router.push('/timeBattle/lendPlanList')
      }
    },
    props:{
      currentType:Boolean
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tcl_content
    display: flex
    justify-content: space-between
  .today_lend_content
    width: 93.3%
    padding:14px 20px 15px 17px
    box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
    border-radius: 4px
    background:#fff
    box-sizing: border-box
    margin: 14px auto 70px
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
</style>

