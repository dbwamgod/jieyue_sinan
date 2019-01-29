<template>
  <div class="personnal_wrap" >
    <xq-header :arrShow="false"></xq-header>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>
<script>
  import {mapActions,mapGetters} from 'vuex'
  import { Loadmore } from 'mint-ui';
  import footerGuide from '@/components/footer/footerGuide'
  import xqHeader from '../../components/xqHeader'
  export default {
    data(){
      return {

      }
    },
    computed:{
    },
    created(){
      this.saveFooterCurrent(1)
    },
    activated(){
      this.saveFooterCurrent(1)
    },
    methods:{
      ...mapActions(['saveFooterCurrent']),
    },
    components:{
      footerGuide,
      xqHeader
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
