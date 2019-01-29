<template>
  <div>
    <transition :name='transitionName'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition :name='transitionName'>
        <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>
<script>
export default {
  created(){
    // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
    if(window.webkit){
      window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
    }
    if(window.messageHandlers){
      window.messageHandlers.changeStatusBarColor("0")
    }
  },
  data() {
    return {
      transitionName:''
    };
  }
};
</script>
