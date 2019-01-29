<template>
  <div>
    <transition :name='transitionName'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition :name='transitionName'>
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
    <loading :loadingShow='loadingShow'></loading>
    <updateAppWin :update="updateApp" :updateData="updateData" :mustUpdate="mustUpdate" :newVersion='newVersion' @closeUpdateWin='closeUpdateWin'></updateAppWin>
  </div>
</template>
<script>
  import {mapActions , mapGetters} from 'vuex'
  import {Base64} from 'js-base64'
  import updateAppWin from './components/updateAppWin'
  export default {
    data() {
      return {
        transitionName:'',
        loadingTimer:null,
        updateApp:false,
        mustUpdate:false,
        updateData:{},//更新app相关数据

        version:'',
        phoneVersion:'',
        newVersion:''
      };
    },
    computed:{
      ...mapGetters(['loadingShow','deviceinfo'])
    },
    components:{
      updateAppWin
    },
    created(){
      window.showNotificationMsg = this.showNotificationMsg //原生调h5的全局方法
      window.getUnReadMsgNum = this.getUnReadMsgNum //原生调h5的全局方法
      this.initPage();
    },
    mounted(){
      this.toUpdateApp()
    },
    methods:{
      ...mapActions(['saveUserid','saveDevice','saveIsAndroid','saveIsIOS','saveIsIphonex','saveLoadingShow']),
      initPage(){ 
        //判断当前机型
        if(window.messageHandlers){ this.saveIsAndroid(true)}else{this.saveIsAndroid(false)}
        if(window.webkit){ this.saveIsIOS(true)}else{this.saveIsIOS(false)}
        if(this.$Browser.iPhoneX){ this.saveIsIphonex(true)}else{this.saveIsIphonex(false)}

        //处理链接带过来的参数
        var userid = this.$route.query.userid;//用户token
        var guidePage = this.$route.query.guidePage;//是否进入向导页面，0不进入，1进入
        var pid = this.$route.query.pid;//设备id
        var phoneVersion = this.$route.query.phoneVersion;//设备类型
        var userType = this.$route.query.userType;//设备类型
        var mobile = this.$route.query.m //记住密码
        var pwd = this.$route.query.p //记住密码
        var version = this.$route.query.version //当前版本号

        if(mobile){
          localStorage.setItem('mobile',mobile)
          localStorage.setItem('pwd',pwd)
        }
        var deviceinfo={
          pid:pid,
          phoneVersion:phoneVersion
        }
        this.saveDevice(deviceinfo)
        this.version = version ? 'v'+version : ''
        this.phoneVersion = phoneVersion ? phoneVersion : ''
        if(userid){
          //如果已经登录,直接进入首页
          this.saveUserid(userid);
          if(userType==99 || userType=="'99'"){
            localStorage.setItem('timebattle',1)
            this.$router.push('/timeBattle/index');
          }else{
            localStorage.setItem('timebattle',0)
            this.$router.push('/home/msite');
          }
        }
        else if(guidePage==1){
          //进入向导页面
          this.$router.push('/guidePage');
        }
        else if(guidePage==0){
          //进入登录界面
          this.$router.push('/login');
        }
        else if(this.$route.path == '/app'){
          //进入登录界面
          this.$router.push('/login');
        }
      },
      showNotificationMsg(msg_id){
        this.$router.push({
          name:'detail',
          query:{
            'from':'app',
            'itemid':msg_id
          }
        })
      },
      getUnReadMsgNum(userid){
        this.$ajax({method: 'get',url: '/mc-message/message/unread'+'/'+userid,dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(res=>{
          if(res.data.code == 200){
            let total = 0;
            if(res.data.data) {
              total = res.data.data.total || 0
            }
            //调用原生方法,告诉原生未读消息和公告总数，供app角标展示
            let numStr = total.toString()
            if(window.webkit){
              window.webkit.messageHandlers.unreadMsgNum.postMessage({num:numStr})
            }
            if(window.messageHandlers){
              window.messageHandlers.unreadMsgNum(numStr)
            }
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      //更新app,updateContent
      toUpdateApp(){
        this.$ajax({
          method: 'post',
          url: '/mc-auth/sys/app/version',
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:{
            sysVersion: this.phoneVersion
          }
        }).then(res=>{
          if(res.data.code == 200){
            let data = res.data.data
            if(this.version && data.version.toLowerCase() != this.version.toLowerCase()){
              this.newVersion = data.version.toLowerCase()
              //需要更新app
              this.updateData = {
                updateContent:data.updateContent.replace(/[;；]/g,'；<br/>'),
                sysType:data.sysType, //1表示ios,2表示安卓
                downloadUrl:data.downloadUrl
              }
              //data.updateType 1表示强制更新
              this.mustUpdate = data.updateType == '1' ? true : false
              this.updateApp = true
            }
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      closeUpdateWin(){
        this.updateApp = false
      },
      UrlDecode(str){ //解码：https://www.xuebuyuan.com/14772.html
        var ret="";
        for(var i=0;i<str.length;i++){
          var chr = str.charAt(i);
          if(chr == "+"){
            ret+=" ";
          }else if(chr=="%"){
            var asc = str.substring(i+1,i+3);
            if(parseInt("0x"+asc)>0x7f){
              ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
              i+=5;
            }else{
              ret+=asc2str(parseInt("0x"+asc));
              i+=2;
            }
          }else{
            ret+= chr;
          }
        }
        return ret;
      }
    },
    watch: {
      loadingShow(){
        if(this.loadingShow){
          if(this.loadingTimer){
            clearTimeout(this.loadingTimer)
          }
          this.loadingTimer = setTimeout(()=>{
            if(this.loadingShow){
              this.$router.push('/brokennetwork')
              this.saveLoadingShow(false)
            }
          },10*1000)
        }
        else{
          if(this.loadingTimer){
            clearTimeout(this.loadingTimer)
          }
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'assets/stylus/reset'
  @import 'assets/fonts/font'
</style>
