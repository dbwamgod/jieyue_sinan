<template>
  <div class="performance-box">
    <div v-show="fixedHeader" class="fixed-header">
      <common-header :newsShow='false'></common-header>
      <mt-navbar v-model="selected" class="tab">
          <mt-tab-item id="fox" @click="toggleTabs('fox');"><span class="tab-name">{{datas.a}}</span><span
                  class="selected_line"></span></mt-tab-item>
          <mt-tab-item id="prince" @click="toggleTabs('prince');"><span
                  class="tab-name">{{datas.b}}</span><span class="selected_line"></span></mt-tab-item>
          <mt-tab-item id="rose" @click="toggleTabs('rose');"><span
                  class="tab-name">{{datas.c}}</span><span class="selected_line"></span></mt-tab-item>
          <mt-tab-item id="loan" @click="toggleTabs('loan');"><span
                  class="tab-name">{{datas.d}}</span><span class="selected_line"></span></mt-tab-item>
      </mt-navbar>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

  export default {
    data () {
      return {
        selected:'fox',
        datas:{
          a:JSON.parse(localStorage.getItem('performanceTabsName'))[0],
          b:JSON.parse(localStorage.getItem('performanceTabsName'))[1],
          c:JSON.parse(localStorage.getItem('performanceTabsName'))[2],
          d:JSON.parse(localStorage.getItem('performanceTabsName'))[3]
        },
        fixedHeader:true,
        loadingShow:false
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    created() {
      this.saveFooterCurrent(1)
    },
    activated(){
      if(this.$route.path == '/home/performance/prince'){
        this.selected = 'prince'
      }
      else if(this.$route.path == '/home/performance/rose'){
        this.selected = 'rose'
      }
      else if(this.$route.path == '/home/performance/loan'){
        this.selected = 'loan'
      }
      else{
        this.selected = 'fox'
      }
    },
    watch:{
      selected(){
        this.toggleTabs(this.selected)
      }
    },
    methods : {
      ...mapActions(['saveFooterCurrent']),
      toggleTabs(tabText) {
        window.scrollTo(0,0)
        this.selected = tabText
        this.$router.push('/home/performance/'+tabText)
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .performance-box
    .tab
      width 100%
      height 44px
      margin-top 10px
      background-color #FFFFFF
      border-bottom 1px solid #F1F3F8
      position relative
      z-index 9
      .tab-name
        font-size 16px
        color #909090
    .mint-navbar .mint-tab-item.is-selected
      border none
      position relative
      .tab-name
          color #29354D
      .selected_line
          display inline-block
          width 18px
          height 0
          border-bottom 2px solid #4E97FF
          position absolute
          bottom 3px
          left 50%
          margin-left -9px
    .fixed-header
      position fixed
      top 0
      left 0
      z-index 999999999999
      width 100%
      background #f6f8f9
    .fixed-ios-header
      position -webkit-sticky
      position sticky
      top 0
      left 0
      z-index 999999999999
      width 100%
      background #f6f8f9 
</style>
