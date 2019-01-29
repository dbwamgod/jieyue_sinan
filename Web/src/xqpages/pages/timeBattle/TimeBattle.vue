<template>
  <div>
      <div class="jinfu_title"  :class="isIphoneX?'timebattle_iphonex_head':''">
        <div class="left"></div>
        <div class="center">
          <img class="title_zb" src="../../assets/images/zbtitle.png"/>
        </div>
        <div class="right" @click="news()">
          <img class="msg_right" src="../../assets/images/mesage.png"/>
          <div class="dian"></div>
        </div>
      </div>
      <router-view></router-view>
    <loadingone :loadingShow='loadingShow'></loadingone>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {Browser} from '@/untils/common'
  import { Loadmore } from 'mint-ui';
  import {PubSub} from "pubsub-js";
  import footerGuide from '@/components/footer/footerGuide'
  import loadingone from '@/components/loadingone'
  import Today from './children/Today'
  export default {
    data(){
      return {
        loadingShow:true,
        reshtime:'正在读取',
        topStatus: '',
        timer:'',//计时器
        yesNumber:'',
        isIphoneX:false,
        todayLoan:[{"name":"今日出借","value":"0","unit":"元"},{"name":"今日赎回","value":"0","unit":"元"},{"name":"今日净流入","value":"0","unit":"元"},{"name":"今日紧急赎回","value":"0","unit":"元"}],//今日出借
        monthLoan:[{"name":"当月出借","value":"0","unit":"元"},{"name":"今月赎回","value":"0","unit":"元"},{"name":"今月净流入","value":"0","unit":"元"},{"name":"今月紧急赎回","value":"0","unit":"元"}],//当月出借
        chazhione:[{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"}],
        chazhitwo:[{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"},{"value":"0","cha":"0","type":"0"}]
      }
    },

    computed:{
      ...mapGetters(['userid']),
    },
    created(){
      this.saveFooterCurrent(0)
      this.isIphoneX = (Browser.iPhoneX? true :false)
      if(window.webkit){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
      }
      if(window.messageHandlers){
        window.messageHandlers.changeStatusBarColor("0")
      }
   },
    activated(){
      this.saveFooterCurrent(0)
    },
    mounted(){
      this.$nextTick(()=>{
        this.battleList(0)
        this.battleYesterday()
      })

      PubSub.subscribe('stopTimer',(msg,data)=>{
        clearInterval(this.timer)
      })

      this.timer=setInterval(()=>{
        this.battleList(2)
        this.battleYesterday()
      },60000)

    },
    destroyed(){
      this.timer && clearInterval(this.timer)
    },
    methods:{
      ...mapActions(['saveFooterCurrent']),
      news(){//进入消息列表
        this.$router.push('/news/newList')
      },
      battleList(type){
          //订阅接口
          this.$ajax(
            {
              method: 'post',
              url: '/mc-data/data/list',
              dataType: 'json',
              headers: {'Content-Type': 'application/json;charset=UTF-8'},
              data:JSON.stringify({
                token:this.userid,
                subjectId:99,
              }),
            }).then(res=>{ // 请求成功
            if(res.data.code==200){
              this.loadingShow=false
              this.todayLoan=[{"name":"今日出借","value":"0","unit":"元"},{"name":"今日赎回","value":"0","unit":"元"},{"name":"今日净流入","value":"0","unit":"元"},{"name":"今日紧急赎回","value":"0","unit":"元"}]//今日出借
              this.monthLoan=[{"name":"当月出借","value":"0","unit":"元"},{"name":"今月赎回","value":"0","unit":"元"},{"name":"今月净流入","value":"0","unit":"元"},{"name":"今月紧急赎回","value":"0","unit":"元"}]//当月出借
              if(res.data.data.length>0){
                for(var i=0;i<res.data.data.length;i++){
                  if(res.data.data[i].id=="61"){//当月出借
                    this.monthLoan=res.data.data[i].datas;
                  }else if(res.data.data[i].id=="60"){//今日出借
                    this.todayLoan=res.data.data[i].datas;
                  }
                }
              }
              if(type===1){
                this.$toast('刷新成功')
                this.jisuanchazhi(this.todayLoan,this.chazhione);//计算上部差值
                this.jisuanchazhi(this.monthLoan,this.chazhitwo);//计算下部差值
              }else if(type===2){
                this.jisuanchazhi(this.todayLoan,this.chazhione);//计算上部差值
                this.jisuanchazhi(this.monthLoan,this.chazhitwo);//计算下部差值
              }else{//第一次进入
                //设置今日增长数据
                if(this.todayLoan){
                  for(var i=0;i<this.todayLoan.length;i++){
                    var tempobj = {};//临时对象
                    tempobj.cha = 0
                    tempobj.type = 0
                    tempobj.value = this.todayLoan[i].value
                    this.chazhione.push(tempobj)
                  }
                  this.chazhione.splice(0,4);//删除前四个
                }
                //设置当月增长数据
                if(this.monthLoan){
                  for(var i=0;i<this.monthLoan.length;i++){
                    var tempobj = {};//临时对象
                    tempobj.cha = 0
                    tempobj.type = 0
                    tempobj.value =this.monthLoan[i].value
                    this.chazhitwo.push(tempobj)
                  }
                  this.chazhitwo.splice(0,4);//删除前四个
                }
              }
              var date=new Date();
              var h=date.getHours();
              var m=date.getMinutes(); //获取分钟
              var s=date.getSeconds();
              if(h<10){
                h='0'+h;
              }
              if(m<10){
                m='0'+m;
              }
              if(s<10){
                s='0'+s;
              }
              this.reshtime='最近刷新时间 '+h+':'+m+':'+s;
              if(this.$refs.loadmore){
                this.$refs.loadmore.onTopLoaded();
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
          }).catch((err)=>{ // 请求失败
            console.log(err)

            if(this.$refs.loadmore){
              this.$refs.loadmore.onTopLoaded();
            }
            if(type===1) {
              this.$toast('刷新失败')
            }
          })
        },
      battleYesterday(){
         //昨天的时间
        var day1 = new Date();
         day1.setTime(day1.getTime()-24*60*60*1000);
          var month=day1.getMonth()+1
          var day=day1.getDate()
          if(month<10){
              month="0"+month
          }
          if(day<10){
              day="0"+day
          }
         var yesTimer = day1.getFullYear() + month  + day;
          //订阅接口
          this.$ajax(
            {
              method: 'post',
              url: '/mc-data/data/list',
              dataType: 'json',
              headers: {'Content-Type': 'application/json;charset=UTF-8' },
              data:JSON.stringify({
                token: this.userid,
                subjectId:99,
                date:yesTimer
              }),
            }).then(res=>{ // 请求成功
            if(res.data.code==200){
              if(res.data.data&&res.data.data[0]&&res.data.data[0].datas&&res.data.data[0].datas[0]){
                this.yesNumber=res.data.data[0].datas[0].value
              }else{
                this.yesNumber='0'
              }

            }else if(res.data.code == 407){ //被踢出登录，返回登录页
              this.$logOut()
            }
          }).catch((err)=>{ // 请求失败
            console.log(err)
          })
        },
      loadTop() {//下拉刷新
        setTimeout(()=>{
          this.battleList(1)
          this.battleYesterday()
        },500)

        clearInterval(this.timer)

        this.timer=setInterval(()=>{
          this.battleList(2)
          this.battleYesterday()
        },60000)
      },
      //计算差值算法
      jisuanchazhi(datas,datas2){
        if(datas){
          for(var i=0;i<datas.length;i++){
            var newobj = datas[i]//新对象
            var oldobj = datas2[i]//之前对象
            var tempobj = {};//临时对象
            if(newobj.value-oldobj.value>0){//最新的值-之前的值>0  增长
              tempobj.cha = newobj.value-oldobj.value
              tempobj.type = 1
            }else  if(newobj.value-oldobj.value===0){//最新值-之前值=0 稳定
              tempobj.cha = newobj.value-oldobj.value
              tempobj.type = 0
            }else{//最新值-之前值<0 减少
              tempobj.cha = oldobj.value-newobj.value
              tempobj.type = 2
            }
            tempobj.value = newobj.value
            datas2.push(tempobj)//添加到数组当中
          }
          datas2.splice(0,4);//删除前四个
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
    },
    watch:{
      $route(to,from){
        if(to.path == '/home/timebattle'){
          if(window.webkit){
            window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
          }
          if(window.messageHandlers){
            window.messageHandlers.changeStatusBarColor("0")
          }

          this.timer=setInterval(()=>{
            this.battleList(2)
          },60000)
        }
      },
    },
    components:{
      Loadmore,
      loadingone,
      footerGuide,
      Today
    },
    filters:{
    numFormat(num) {
      if(num){
        return num.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
      }
    }

  },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .jinfu_title
      width 100%
      height 50px
      line-height 50px
      padding-top 20px
      position fixed
      display flex
      z-index 200
      background-image url("../../assets/images/zhanbaotitle.png")
      background-repeat no-repeat
      background-size 100% 100%
      .left
       width 50px
       height 50px
      .center
       flex 1
       height 50px
       line-height 50px
       text-align center
       width 100%
       .title_zb
        width 180px
        height 18px
      .right
       height 50px
       width 50px
       position relative
       .msg_right
        width 17px
        height 18px
        float right
        margin-right 20px
        margin-top 10px
       .dian
        width 4px
        height 4px
        background-color red
        border-radius 50px
        position absolute
        right 22px
        top 12px
      .imgRotate
       animation-name go
       animation-duration 1.5s
       animation-iteration-count infinite
       @keyframes go
        0% {transform: rotateZ(0)}
        100% {transform: rotateZ(360deg)}
    .timebattle_iphonex_head
     padding-top 40px
    .jinfu_content
      width 100%
      .content_warp
        width 100%
        background-color  #fff
        .top_one
         width 100%
         background-image  url("../../assets/images/backgrou.png")
         background-repeat no-repeat
         background-size 100%
         height 290px
         .top_one_first_wrap
          display flex
          .today_chujie
           padding-top  27px
           padding-left 32px
           font-family PingFangSC-Medium
           font-size 18px
           font-weight normal
           font-stretch normal
           color #ffffff
          .top_one_first_right
           flex 1
           padding-top  27px
           img
            width 12px
            height 12px
            padding-top 2px
            float right
           span
            font-family PingFangSC-Regular
            font-size 16px
            color #FFFFFF
            float right
            padding-left 8px
            padding-right 27px
         .bijiao
          width 100%
          height 20px
          margin-top 5px
          span
           font-family PingFangSC-Regular
           font-size 14px
           color #FFFFFF
           float right
           padding-right 28px
         .top_one_second_wrap
          width 100%
          margin-top 10px
          text-align center
          .money
           font-size 17px
           color #FFFFFF
          .number
           font-family DINCondensed-Bold
           font-size 60px
           color #FFFFFF
         .top_one_bottom_wrap
          width 100%
          margin-top 15px
          text-align center
          span
           font-family PingFangSC-Regular
           font-size 14px
           color #FFFFFF
         .top_one_zuori_chujie_title
           margin-top 40px
           font-size 13px
           color #2D7DFF
           font-family PingFangSC-Medium
           padding-left 32px
          .top_one_zuori_chujie_number
            padding-left 32px
            font-size 22px
            padding-top 13px
            color #29354D
            font-family DINAlternate-Bold
            padding-bottom 12px
         .today_chujie_number
          font-family DINAlternate-Bold
          font-size 30px
          width 496px
          padding-top 20px
          font-weight normal
          font-stretch normal
          padding-bottom 12px
          color #5c93fa
         .line
          width auto
          margin-right 20px
          height 0.5px
          background-color #e4e4e4
        .top_two
         width 100%
         background-image  url("../../assets/images/cheng.png")
         background-repeat no-repeat
         background-size 100%
         height 220px
         .top_one_first_wrap_two
          display flex
          .today_chujie_two
            padding-top  27px
            padding-left 32px
            font-family PingFangSC-Medium
            font-size 18px
            font-weight normal
            font-stretch normal
            color #ffffff
          .top_one_first_right
           flex 1
           padding-top  27px
           img
            width 12px
            height 12px
            padding-top 2px
            float right
           span
            font-family PingFangSC-Regular
            font-size 16px
            color #FFFFFF
            float right
            padding-left 8px
            padding-right 27px
         .bijiao
          width 100%
          height 20px
          margin-top 5px
          span
           font-family PingFangSC-Regular
           font-size 14px
           color #FFFFFF
           float right
           padding-right 28px
         .top_one_second_wrap
          margin-top 10px
          text-align center
          .money
            font-size 17px
            color #FFFFFF
          .number
            font-family DINCondensed-Bold
            font-size 60px
            color #FFFFFF
         .top_one_bottom_wrap
            width 100%
            margin-top 15px
            text-align center
            span
              font-family PingFangSC-Regular
              font-size 14px
              color #FFFFFF
        .today_chujie_number_two
          color #fca53c
          font-size 25px
          font-family DINAlternate-Bold
          padding-top 10px
          padding-bottom 6px
         .msite_iphonex_bottmo_title
          padding-top 20px
          padding-bottom 12px
         .line
          width auto
          margin-right 20px
          height 0.5px
          background-color #e4e4e4
        .list_item_wrap
         width 100%
         padding-left 10px
         position relative

         .title
          padding-top 12px
          font-size 12px
          color #858585
          font-family PingFangSC-Medium
          padding-left 10px
         .number
          padding-left 12px
          font-size 20px
          padding-top 12px
          color #000
          font-family DINAlternate-Bold
          padding-bottom 12px
         .msite_iphonex_number
          padding-bottom 16px
          padding-top 16px
         .list_item_wrap_right
           position absolute
           right 25px
           top 40px
           img
            width 11px
            height 11px
           span
            font-family PingFangSC-Regular
            font-size 16px
            color #38415C
         .line
           width auto
           margin-right 10px
           height 0.5px
           margin-left  10px
           background-color #e4e4e4
        .list_item_wrap_two
         width 100%
         position relative
         padding-left 10px
         .title_two
          padding-top 10px
          font-size 12px
          color #858585
          padding-left 10px
          font-family PingFangSC-Medium
         .number_two
          padding-left 10px
          font-size 20px
          padding-top 10px
          font-weight bold
          color #000
          font-family DINAlternate-Bold
          padding-bottom 10px
         .msite_iphonex_bottmo_list
          padding-top 14px
          padding-bottom 14px
         .list_item_wrap_right_two
           position absolute
           right 25px
           top 35px
           img
            width 11px
            height 11px
           span
            font-family PingFangSC-Regular
            font-size 16px
            color #38415C
         .line_two
           width auto
           margin-right 10px
           height 0.5px
           margin-left  10px
           background-color #e4e4e4
      .magin_top
        margin-top 5px
      .msite_iphonex_magin_top
        margin-top 10px
    .dibu
      height 40px
      text-align center
      line-height 40px
      span
        color gray
        font-size 12px
    .iphonex-bottom
      height 60px
      text-align center
      line-height 60px
      span
        color gray
        font-size 12px
    .dibubottom
     width 100%
     height 60px
  .nodata
    width 100%
    height 100%
    margin-top 120px
    text-align center
    line-height 30px
    img
      width 214px
      height 157px
    span
      font-family PingFangSC-Regular
      font-size 14px
      color #909090
      letter-spacing 0
      text-align center
</style>
