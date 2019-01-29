<template>
  <div>
    <transition :name='transitionName'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <choose-area></choose-area>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
  import footerGuide from '../components/footer/footerGuide'
  import chooseArea from '../components/chooseArea'
  export default {
    components:{
      footerGuide,
      chooseArea
    },
    data() {
      return {
        transitionName:''
      };
    },
    watch: {
      $route(to, from) {
        this.transitionName= '';
        const cj = {
          '/home/msite': 1,
          '/home/performance': 2,
          '/home/timebattle': 3,
          '/home/personnal': 4,
          '/home/personaldetail': 5,
          '/home/personalAbout': 6,
          '/home/setting': 7,
          '/news/newList': 8,
          '/news/newRemind': 9,
          '/news/newNotice': 10,
          '/news/newPlan': 11,
          '/news/newDetail': 12,
          '/login': 13,
          '/findpassword': 19,
          '/resetpassword': 15,
          '/app': 16,
          '/guidePage': 17,
          '/brokennetwork': 18,
          '/home/modifyloginpwd': 14,
        };
        const fromPage = from.fullPath;
        const toPage = to.fullPath;
        if(toPage.indexOf('/news/newDetail')>=0){
          this.transitionName ='slide-left'
        }else if(toPage.indexOf('/resetpassword?phone')>=0){
          this.transitionName ='slide-left'
        }else if(toPage =='/home/msite' && fromPage !='/home/performance' &&  fromPage !='/home/personnal'){
          this.transitionName ='slide-right'
        }else if(toPage =='/home/performance' && fromPage !='/home/msite' &&  fromPage !='/home/personnal'){
          this.transitionName ='slide-right'
        }else if(toPage =='/home/personnal' && fromPage !='/home/msite' &&  fromPage !='/home/performance'){
          this.transitionName ='slide-right'
        }else if(toPage =='/home/msite' || toPage =='/home/performance' || toPage =='/home/personnal' || toPage =='/login'){
          this.transitionName= '';
        }else{
          this.transitionName = cj[toPage] > cj[fromPage] ? 'slide-left' : 'slide-right';
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
 /* .slide-left-enter-active, .slide-right-enter-active {
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }*/
</style>
