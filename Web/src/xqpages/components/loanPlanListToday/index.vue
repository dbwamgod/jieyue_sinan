<template>
  <div class="wrapper-plutocratList-price">
    <div class="table">
      <div class="content-block" v-for="(item,key) in listData">
        <div class="content-block-hd">
          <div class="td">{{item.title}}</div>
          <div class="td">{{item.sendTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return {
        listData:[],
        page:1,
      }
    },
    components:{
    },
    computed:{
      ...mapGetters(['userid','isIphoneX'])
    },
    created(){
      this.getDataList();
    },
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0,0);
      })
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      getDataList(){
        this.saveLoadingShow(true)
        let token = this.userid;
        this.$ajax({
          method: 'post',
          url: '/mc-message/message/notice/list',
          dataType: 'json', 
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
            currentPage:this.page,
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code!=500){this.saveLoadingShow(false)}
          if(res.data.code == 200) {
              this.listData = this.listData.concat(res.data.data);
          } else if(res.data.code == 407) { //被踢出登录，返回登录页
            this.$logOut();
          } else if(res.data.code == 301) {//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          } else {
            this.$toast(res.data.msg);
          }
            
        }).catch(function(err){// 请求失败
          console.log(err);
          this.isRequested = false;
        })
      },
    },
    watch:{
      listData:{
　　　  handler(curVal,oldVal){
　　　　 // console.log(curVal,oldVal)
　　　　},
　　　　deep:true
　　　}
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './index.styl';
</style>
