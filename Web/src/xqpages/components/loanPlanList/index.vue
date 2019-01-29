<template>
  <div class="wrapper">
    <div class="fixed-top">
      <xqheader :arrShow="true" :messageIconShow="false"></xqheader>
      <div class="nav-tab">
        <mt-navbar v-model="selected" class="tab">
            <mt-tab-item id="today" @click="toggleTabs('today');">
              <span class="tab-name">今日</span>
              <span class="selected_line"></span>
            </mt-tab-item>
            <mt-tab-item id="month" @click="toggleTabs('month');">
              <span class="tab-name">本月</span>
              <span class="selected_line"></span>
            </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <choose-area></choose-area>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import chooseArea from '@/components/chooseArea'
  import xqheader from '@/xqpages/components/xqHeaderSelectCity.vue';
  export default {
    data(){
      return {
        selected:'price',
      }
    },
    components:{
      chooseArea,
      xqheader
    },
    computed:{
      
    },
    created(){
      if(this.$route.path == '/loanPlanList/today'){
        this.selected = 'today'
      }
      else if(this.$route.path == '/loanPlanList/month'){
        this.selected = 'month'
      }
      else{
        this.selected = 'today'
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
        this.$router.push('/loanPlanList/'+tabText)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './index.styl';
</style>
