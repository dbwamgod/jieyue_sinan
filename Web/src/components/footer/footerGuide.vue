<template>
  <div class="footer" :class="isIphoneX?'iphonex-footer':''">
    <div v-for='(item,index) of tabs' :class='{on:index === footerCurrent}' @click="changeColors(index)">
      <img :src="index===footerCurrent?item.iconSelect:item.icon">
      <p :class="{on:index===footerCurrent}" >{{item.name}}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapActions,mapGetters} from 'vuex'
  import {PubSub} from "pubsub-js"
  export default{
    data(){
      return {
        tabs:[],
        normalTabs:[
          {
            name:"首页",
            push:"/home/msite",
            icon:require('../../assets/images/tabicon/home.png'),
            iconSelect:require('../../assets/images/tabicon/home-blue.png')
          },
          {
            name:"业绩",
            push:"/home/performance",
            icon:require('../../assets/images/tabicon/datas.png'),
            iconSelect:require('../../assets/images/tabicon/datas-blue.png')
          },
          {
            name:"风险",
            push:"/home/riskData",
            icon:require('../../assets/images/tabicon/risk.png'),
            iconSelect:require('../../assets/images/tabicon/risk-blue.png')
          },
          {
            name:"我的",
            push:"/home/personnal",
            icon:require('../../assets/images/tabicon/user.png'),
            iconSelect:require('../../assets/images/tabicon/user-blue.png')
          }
        ],
        timeBattleTabs:[
          {
            name:"首页",
            push:"/timeBattle/index",
            icon:require('../../assets/images/tabicon-xq/shouye-hei@2x.png'),
            iconSelect:require('../../assets/images/tabicon-xq/shouye-lan@2x.png')
          },
           {
             name:"业绩",
             push:"/timeBattle/achievement",
             icon:require('../../assets/images/tabicon-xq/yeji-hei@2x.png'),
             iconSelect:require('../../assets/images/tabicon-xq/yeji-lan@2x.png')
           },
          {
            name:"我的",
            push:"/home/personnal",
            icon:require('../../assets/images/tabicon-xq/wode-hei@2x.png'),
            iconSelect:require('../../assets/images/tabicon-xq/wode-lan@2x.png')
          }
        ]
      }
    },
    computed:{
      ...mapGetters(['footerCurrent','userid','isIphoneX'])
    },
    created(){
      if(localStorage.getItem('timebattle')==1){
        this.tabs = this.timeBattleTabs
      }
      else{
        this.getTabs()
      }
    },
    methods:{
      ...mapActions(['saveFooterCurrent']),
      getTabs(){
        this.$ajax({method: 'post',url: '/mc-data/data/subject/list',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            token: this.userid,
          }),
        }).then(res=>{  // 请求成功
          if(res.data.code == 200){
            let data = res.data.data,
              currentTabs=[];
            data.forEach((item)=>{
              currentTabs.push(this.normalTabs[item.id-1])
            })
            this.tabs = currentTabs
            //业绩的页面tab
            let performanceTabs = res.data.data[1].children; //四个tab的名字
            let performanceTabsId=[],
              performanceTabsName=[];
            performanceTabs.forEach((item)=>{
              performanceTabsId.push(item.id)
              performanceTabsName.push(item.name)
            })
            localStorage.setItem('performanceTabsIds',JSON.stringify(performanceTabsId))
            localStorage.setItem('performanceTabsName',JSON.stringify(performanceTabsName))
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut()
          }else{
            console.log(res.data.msg)
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      changeColors(index){
        this.saveFooterCurrent(index)
        this.$router.push(this.tabs[index].push)
        if(localStorage.getItem('timebattle')==1 && index==1){
          PubSub.publish('stopTimer');
        }
      }
    }
  }

</script>



<style lang="stylus" rel="stylesheet/stylus">
  .footer
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    height: 54px;
    background #ffffff
    width: 100%
    border-top 0.5px solid #f1f1f1
    z-index 99999999
    div
      text-align center
      flex: 1;
      img
        width: 21px;
        height: 20px;
        -webkit-margin-before: 11px;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
      p
       color #29354D
       font-size 10px
       -webkit-margin-before: 5px;
       -webkit-margin-after: 0em;
       -webkit-margin-start: 0px;
       -webkit-margin-end: 0px;
    .on
      color #4E97FF

  .iphonex-footer
    height: 70px;
</style>
