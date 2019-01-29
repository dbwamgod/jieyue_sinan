<template>
  <div class="wrapper">
    <div class="fixed-top">
      <xqheader :arrShow="true" :messageIconShow="false"></xqheader>
      <div class="nav-tab">
        <mt-navbar v-model="selected" class="tab">
            <mt-tab-item id="price" @click="toggleTabs('price');">
              <span class="tab-name">金额</span>
              <span class="selected_line"></span>
            </mt-tab-item>
            <mt-tab-item id="time" @click="toggleTabs('time');">
              <span class="tab-name">时间</span>
              <span class="selected_line"></span>
            </mt-tab-item>
        </mt-navbar>
      </div>

    </div>
    <choose-area></choose-area>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import chooseArea from '@/components/chooseArea';
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
      ...mapGetters(['isIphoneX','orgCodeName'])
    },
    created(){
      if(this.$route.path == '/cityList/price'){
        this.selected = 'price'
      }
      else if(this.$route.path == '/cityList/time'){
        this.selected = 'time'
      }
      else{
        this.selected = 'price'
      }

    },
    watch:{
      selected(){
        this.toggleTabs(this.selected)
      }

    },
    methods : {
      ...mapActions(['saveFooterCurrent']),
      //今日
      toggleTabs(tabText) {
        window.scrollTo(0,0)
        this.selected = tabText
        this.$router.push('/cityList/'+tabText)
      },
      chooseArea(){
        Bus.$emit('msg','打开选择机构弹框');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './index.styl';

</style>
