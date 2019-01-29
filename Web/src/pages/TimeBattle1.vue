<template>
  <div>
    <div class="jinfu_wrap"  >
      <div class="jinfu_title"  :class="isIphoneX?'timebattle_iphonex_head':''">
        <p>向前金服实时战报</p>
      </div>
      <mt-loadmore class="loadmorestwo" :class="isIphoneX?'loadmores_iphonex_two':''"  :top-method="loadTop"  @top-status-change="handleTopChange" ref="loadmore">
        <div class="jinfu_content">
          <div class="content_warp">
            <div class="top_one">
              <div class="top_one_first_wrap">
                <p class="today_chujie">{{todayLoan[0].name}}({{todayLoan[0].unit}})</p>
                <div class="top_one_first_right">
                  <span>{{chazhione[0].cha}}</span>
                  <img v-show="chazhione[0].type!==0" :src="chazhione[0].type==1?require('../assets/images/whitetop.png'):require('../assets/images/whitedown.png')">
                </div>
              </div>
              <div class="bijiao"><span>较上次</span></div>
              <div class="top_one_second_wrap">
                <span class="money">￥</span><span class="number">{{todayLoan[0].value|numFormat}}</span>
              </div>
              <div class="top_one_bottom_wrap"><span>{{reshtime}}</span></div>
              <p class="top_one_zuori_chujie_title">昨日出借(元)</p>
              <p class="top_one_zuori_chujie_number">{{yesNumber|numFormat}}</p>
            </div>
            <div class="list_item_wrap">
              <p class="title">{{todayLoan[1].name}}({{todayLoan[1].unit}})</p>
              <p class="number" :class="isIphoneX?'msite_iphonex_number':''" >{{todayLoan[1].value|numFormat}}</p>
              <div class="list_item_wrap_right">
                <img v-show="chazhione[1].type!==0" :src="chazhione[1].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')"/>
                <span>{{chazhione[1].cha}}</span>
              </div>
              <div class="line"></div>
            </div>
            <div class="list_item_wrap">
              <p class="title">{{todayLoan[2].name}}({{todayLoan[2].unit}})</p>
              <p class="number"  :class="isIphoneX?'msite_iphonex_number':''" >{{todayLoan[2].value|numFormat}}</p>
              <div class="list_item_wrap_right">
                <img v-show="chazhione[2].type!==0" :src="chazhione[2].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')"/>
                <span>{{chazhione[2].cha}}</span>
              </div>
              <div class="line"></div>
            </div>
            <div class="list_item_wrap">
              <p class="title">{{todayLoan[3].name}}({{todayLoan[3].unit}})</p>
              <p class="number"  :class="isIphoneX?'msite_iphonex_number':''" >{{todayLoan[3].value|numFormat}}</p>
              <div class="list_item_wrap_right">
                <img v-show="chazhione[3].type!==0" :src="chazhione[3].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')"/>
                <span>{{chazhione[3].cha}}</span>
              </div>
            </div>
          </div>

          <div class="content_warp magin_top" :class="isIphoneX?'msite_iphonex_magin_top':''" >
            <div class="top_two">
              <div class="top_one_first_wrap_two">
                <p class="today_chujie_two">{{monthLoan[0].name}}({{monthLoan[0].unit}})</p>
                <div class="top_one_first_right">
                  <span>{{chazhitwo[0].cha}}</span>
                  <img v-show="chazhitwo[0].type!==0" :src="chazhitwo[0].type==1?require('../assets/images/whitetop.png'):require('../assets/images/whitedown.png')">
                </div>
              </div>
              <div class="bijiao"><span>较上次</span></div>
              <div class="top_one_second_wrap">
                <span class="money">￥</span>
                <span class="number">{{monthLoan[0].value|numFormat}}</span>
              </div>
              <div class="top_one_bottom_wrap"><span>{{reshtime}}</span></div>

            </div>
            <div class="list_item_wrap_two">
              <p class="title_two">{{monthLoan[1].name}}({{monthLoan[1].unit}})</p>
              <p class="number_two" :class="isIphoneX?'msite_iphonex_bottmo_list':''">{{monthLoan[1].value|numFormat}}</p>
              <div class="list_item_wrap_right_two">
                <img v-show="chazhitwo[1].type!==0" :src="chazhitwo[1].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')">
                <span>{{chazhitwo[1].cha}}</span>
              </div>
              <div class="line_two"></div>
            </div>
            <div class="list_item_wrap_two">
              <p class="title_two">{{monthLoan[2].name}}({{monthLoan[2].unit}})</p>
              <p class="number_two" :class="isIphoneX?'msite_iphonex_bottmo_list':''">{{monthLoan[2].value|numFormat}}</p>
              <div class="list_item_wrap_right_two">
                <img v-show="chazhitwo[2].type!==0" :src="chazhitwo[2].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')">
                <span>{{chazhitwo[2].cha}}</span>
              </div>
              <div class="line_two"></div>
            </div>
            <div class="list_item_wrap_two">
              <p class="title_two">{{monthLoan[3].name}}({{monthLoan[3].unit}})</p>
              <p class="number_two" :class="isIphoneX?'msite_iphonex_bottmo_list':''">{{monthLoan[3].value|numFormat}}</p>
              <div class="list_item_wrap_right_two">
                <img v-show="chazhitwo[3].type!==0" :src="chazhitwo[3].type==1?require('../assets/images/shangjiantou.png'):require('../assets/images/greenjiantou.png')">
                <span>{{chazhitwo[3].cha}}</span>
              </div>
            </div>
          </div>
        </div>
        <div  :class="isIphoneX?'iphonex-bottom':'dibu'"><span>— 向前金服 · 向前向未来 —</span></div>
        <div class="dibubottom"></div>
        <div slot="top" class="mint-loadmore-top">
          <div class="top_tip">
            <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
            <span v-show="topStatus !== 'loading'" class='txt' :class="{ 'rotate': topStatus === 'drop' }">&nbsp;&nbsp;松开刷新</span>
            <span v-show="topStatus === 'loading'"  class='txt loading-txt'>正在刷新...</span>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <loadingone :loadingShow='loadingShow'></loadingone>
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {Browser} from '../untils/common'
  import { Loadmore } from 'mint-ui';
  import {PubSub} from "pubsub-js";
  import footerGuide from '../components/footer/footerGuide'
  import loadingone from '../components/loadingone'
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
      battleList(type){
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
              this.$refs.loadmore.onTopLoaded();
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
            this.$refs.loadmore.onTopLoaded();
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
      footerGuide
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
  .loadmorestwo
    background-color #f6f8f9
    margin-bottom 0
    padding-top 70px
    .mint-loadmore-top
      height 50px
      .top_tip
        width 100%
        height 50px
        position relative
        img
          position absolute
          top 10px
          left 3.866667rem
          width 25px
          height 25px
        .txt
          padding-left 30px
          font-size 13px
          color #29354D
        .loading-txt
          padding-left 36px
        .icon
          display inline-block
          position absolute
          top 10px
        .reush_tip
          position absolute
          left 0
          top 16px
          width 100%
          height 20px
          .txt
            padding-left 0px
            font-size 10px
            color #29354D
  .loadmores_iphonex_two
   padding-top  90px
  .jinfu_wrap
    position absolute
    top 0
    left 0
    right 0
    bottom 54px
    background-color  #fff
    .jinfu_title
      width 100%
      height 50px
      line-height 50px
      padding-top 20px
      position fixed
      background-color #fff
      z-index 200
      p
        font-family PingFangSC-Medium
        font-size 18px
        text-align center
        font-weight normal
        font-stretch normal
        letter-spacing 0px
        color #29354D
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
         background-image  url("../assets/images/backgrou.png")
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
         background-image  url("../assets/images/cheng.png")
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
