<template>
  <div class="personnal_wrap" >
    <white-header :title="pageTitle"></white-header>
    <div class="defendD">
      <div class="defendD1">{{datas.title}}</div>
      <div class="defendD2">
        <p class="defendD2-1">{{datas.sendTime}}</p>
        <p class="defendD2-2" v-html="datas.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions ,mapGetters} from 'vuex'

  export default {
    data(){
      return {
        pageTitle:"",
        datas:[]
      }
    },
    computed:{
      ...mapGetters(['userid'])
    },
    created(){
      let from = this.$route.query.from;
      let to = this.$route.query.to;
      if(from && from=='app'){
        if(this.userid==''){
          this.$router.push('/login');
        }
        else{
          this.appMsg();
        }
      }
      else if(to == 'newsDetail'){
        this.pageTitle = '消息详情'
        this.msgNews();
      }
      else{
        this.pageTitle = '公告详情'
        this.msgPlan();
      }
      this.toGetUnReadMsgNum()
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      msgPlan(){
        this.saveLoadingShow(true);
        let itemid = this.$route.query.itemid;
        let token= this.userid;
        this.$ajax({
          method: 'get',
          url: 'mc-message/message/notice/' + itemid+'/'+token ,
          dataType: 'json',
        }).then(res=>{  // 请求成功
          if(res.data.code != 500){this.saveLoadingShow(false);}
          if(res.data.code == 200){
            this.datas = res.data.data
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            this.$toast(res.data.msg);
          }
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      },
      msgNews(){
        let itemid = this.$route.query.itemid;
        let token= this.userid;
        this.saveLoadingShow(true)
        this.$ajax({
          method: 'get',
          url: 'mc-message/message/' + itemid+'/'+token ,
          dataType: 'json',
        }).then(res=>{  // 请求成功
          if(res.data.code != 500){this.saveLoadingShow(false)}
          if(res.data.code == 200){
            this.datas = res.data.data
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }
          else{
            this.$toast(res.data.msg)
          }
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      },
      appMsg(){
        let itemid = this.$route.query.itemid;
        let token= this.userid;
        this.saveLoadingShow(true)
        this.$ajax({
          method: 'get',
          url: 'mc-message/message/sendId/' + itemid+'/'+token ,
          dataType: 'json',
        }).then(res=>{  // 请求成功
          if(res.data.code != 500){this.saveLoadingShow(false)}
          if(res.data.code == 200){
            this.datas = res.data.data;
            let msgType = res.data.data.msgType; //9是 系统公告，其他都是 业务消息
            if(msgType==9){
              this.pageTitle = '公告详情'
            }
            else{
              this.pageTitle = '消息详情'
            }
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }
          else{
            this.$toast(res.data.msg)
          }
        }).catch(function(err){// 请求失败
          console.log(err)
        })
      },
      toGetUnReadMsgNum(){ //告诉原生未读消息数量
        this.$ajax({
          method: 'get',
          url: '/mc-message/message/unread'+'/'+this.userid,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res=>{
          if(res.data.code == 200){
            let num = res.data.data.total;
            if(num!=null){
              let numStr = num.toString();
              //调用原生方法
              if(window.webkit){
                window.webkit.messageHandlers.unreadMsgNum.postMessage({num:numStr})
              }
              if(window.messageHandlers){
                window.messageHandlers.unreadMsgNum(numStr)
              }
            }
          }
        }).catch(function(err){
          console.log(err)
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'detail.styl'
</style>