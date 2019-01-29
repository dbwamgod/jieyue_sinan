<template>
  <div class="login_wrap">
    <div class="login-main">
      <div class="logo">
        <img src="@/assets/images/logo2x.png">
        <span class="img_content">司南</span>
      </div>
      <div class="phone">
        <img  class="shouji" src="@/assets/images/shouji2.png">
        <input :class="showHuiXian?'inputPhone':'inputPhoneBlue'" type="tel" id="box" placeholder="请输入手机号" v-model.trim="phonenumber" onpaste="return false" @blur="lostFocus" @focus="focus" />
        <img class="del" src="@/assets/images/shanchun.png" @click="deletephone" v-show="showdele">
      </div>
      <div class="pwd">
        <img class="mima" src="@/assets/images/mima2.png">
        <input :class="showMiHuiXian?'inputPassword':'inputPasswordBlue'" :type="pwdType" placeholder="请输入密码" v-model="password" maxlength="20" onpaste="return false" @focus='onFocus' @blur="onBlur" id="pass"/>
        <div class="img-box"><img class="biyan" :src="pwdDefault?require('@/assets/images/biyan.png'):require('@/assets/images/zhengyan.png')" @click="pwdchangetype"></div>
      </div>
      <div class="forget_pwd" @click="forgetPwd">忘记密码</div>
      <!-- <div class="re-pwd">
        <jy-checkbox v-model="rememberStatus" :disabled="false">记住密码</jy-checkbox>
      </div> -->
      <button @click="login()" :class="btndefault?'sure':'sureblue'">登录</button>
      <div :class="emptyShow?'empty-block':'empty-none'"></div>
    </div>
    <img class="hailang" src="@/assets/images/hailang.png">
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {Base64} from 'js-base64'; //加密Base64.encode('123456')，解密Base64.decode(m)
  import {mapActions,mapGetters} from 'vuex';
  import {MessageBox} from 'mint-ui';
  export default {
    data(){
      return{
        phonenumber:'',
        password:'',
        pid:'',
        phoneVersion:'',
        phoneMaxLength: 11,
        showdele:false,
        pwdDefault:true,
        pwdType:'password',
        btnback:true,
        btndefault:true,
        flag:'',
        showHuiXian:true,
        showMiHuiXian:true,
        passwordInputTimer:null,
        emptyShow:false,
        rememberStatus:true,
      }
    },
    computed:{
      ...mapGetters(['deviceinfo','isIOS','isAndroid']),
    },
    created(){
      // 顶部状态栏展示颜色参数说明：type：“0”标识黑色；“1”标识白色
      if(this.isIOS){
        window.webkit.messageHandlers.changeStatusBarColor.postMessage({type:'0'})
      }
      if(this.isAndroid){
        window.messageHandlers.changeStatusBarColor("0")
      }
    },
    mounted(){
      this.pid = this.deviceinfo.pid;//设备id
      this.phoneVersion = this.deviceinfo.phoneVersion;//设备类型
      this.loadUserInfo();
    },
    methods:{
      ...mapActions(['saveUserid','saveOrgCodeList','saveOrgCodeName','saveFirstOrgCodeName','saveSecondOrgCodeName','saveThirdOrgCodeName','saveFooterCurrent']),
      login(){
        if(!this.phonenumber){
          this.$toast({
            message: '请输入手机号',
            position: 'center',
            duration: 1000
          });
          return;
        }
        if(!this.password){
          this.$toast({
            message: '请输入密码',
            position: 'center',
            duration: 1000
          });
          return;
        }
        var phonenumber = this.phonenumber;
        var phone = this.phonenumber.replace(/\s/ig,'');

        if(!this.btndefault){
          //TODO 调登录接口
          this.$ajax({
            method: 'post',
            url: '/mc-auth/auth/login',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data:JSON.stringify({
              phone: phone,
              pwd:md5(this.password),
              deviceUuid:this.pid,
              sysVersion:this.phoneVersion,
              flag:this.flag
            }),

          }).then(res=>{
            if(res.data.code==200){
              this.$toast({message:'登录成功',duration:1000})
              this.saveOrgCodeList([])
              this.saveOrgCodeName('')
              this.saveSecondOrgCodeName('')
              this.saveThirdOrgCodeName('')
              this.saveFirstOrgCodeName('')

              var token = res.data.data.token;
              this.saveUserid(token);
              var userType = "0",//userType: "99"战报页面  , userInfo保存的用户名密码
                mobileVal = '',
                pwdVal = '';
              //记住手机号和密码
              if (this.rememberStatus) {
                mobileVal = Base64.encode(phonenumber)
                pwdVal = Base64.encode(this.password)
                localStorage.setItem('mobile', mobileVal);
                localStorage.setItem('pwd', pwdVal);
              } else {
                mobileVal = ''
                pwdVal = ''
                localStorage.removeItem('mobile');
                localStorage.removeItem('pwd');
              }
              //判断进入哪个页面
              if(res.data.data.masterNo && res.data.data.masterNo === '99'){
                userType="99"
                localStorage.setItem('timebattle',1)
                this.$router.push('/timeBattle/index');
              }else{
                userType="0"
                localStorage.setItem('timebattle',0)
                this.$router.push('/home/msite');
              }
              //与ios原生交互S
              if(this.isIOS){
                window.webkit.messageHandlers.saveUserId.postMessage({type: '1', userId: token,userType: userType,m:mobileVal,p:pwdVal});
              }
              //与安卓原生交互
              if(this.isAndroid){
                window.messageHandlers.saveUserId(JSON.stringify({userId: token,userType: userType}));
              }
            }
            else if(res.data.code==300){
              MessageBox.confirm("是否退出已登录的帐号",
                {confirmButtonText:'是',
                cancelButtonText:'否'}).then(action => {
                this.flag=1
                this.login();
              }).catch(function(err){
              });
            }
            else if(res.data.code == 407){ //被踢出登录，返回登录页
              this.$logOut()
            }
            else{
              this.$toast({message:res.data.msg})
            }
          }).catch(function(err){
            console.log(err)
          })
        }
      },
      loadUserInfo () {
        let mobile = localStorage.getItem('mobile');
        let pwd = localStorage.getItem('pwd');
        if (mobile) {
          this.phonenumber = Base64.decode(mobile);
          this.password = pwd ? Base64.decode(pwd) : '';
        }
      },
      deletephone(){
        this.phonenumber = ''
      },
      pwdchangetype(){
        this.pwdDefault=!this.pwdDefault
        this.pwdType = this.pwdType==='password'?'text':'password'
      },
      onFocus(){
        if(this.isAndroid){
          this.emptyShow=true
          this.passwordInputTimer = setInterval(()=>{  //设置一个计时器，时间设置与软键盘弹出所需时间相近
            document.getElementById("pass").scrollIntoView();
          },100)
        }
        this.showdele=false
      },
      onBlur(){
        if(this.isAndroid){
          this.emptyShow=false
          clearInterval(this.passwordInputTimer)
        }
      },
      forgetPwd(){
        this.$router.push('/findpassword')
      },
      lostFocus(){
        this.showdele=false
      },
      focus(){
        if(this.phonenumber){
          this.showdele=true
        }
      },
    },
    watch:{
      password:function(val,oldval) {
        this.password = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]|\s+/g, "");
        if(val){
          this.showMiHuiXian=false
        }else{
          this.showMiHuiXian = true
        }
        var phone = this.phonenumber.replace(/\s/ig,'');
        if((/^1[0345678]\d{9}$/.test(phone))&&this.phonenumber.length==13){
        }
        else if(this.phonenumber==''&&this.password==""){
        }
        else{
          this.$toast({message:'请输入正确手机号'})
          this.password=""
        }

        if((/^1[0345678]\d{9}$/.test(phone))&&val.length>=6&&this.phonenumber.length==13){
          this.btndefault=false
          return false;
        }else{
          this.btndefault=true
        }
      },
      phonenumber:function(val,oldval) {
        var phone=this.phonenumber.replace(/\s/ig,'');
        // this.showdele= val ? true :false
        var phoneInput=document.getElementById('box')
        if(phoneInput==document.activeElement&&this.phonenumber){
          this.showdele=true
        }else{
          this.showdele=false
        }
        this.showHuiXian= val ?false : true
        this.password= val ? this.password : ''
        if(this.phonenumber.length==0) return;
        if(this.password.length >= 6 && val.length == 13 && (/^1[0345678]\d{9}$/.test(phone))){
          this.btndefault=false
          return false;
        }else{
          this.btndefault=true
        }
        if (val.length > oldval.length) {
          if (val.length === 4 || val.length === 9) {
            var pre = val.substring(0, val.length - 1);
            var last = val.substr(val.length - 1, 1);
            this.phonenumber = pre + ' ' + last;
          } else {
            this.phonenumber = val;
          }
          if(!(/^1/.test(val))){
            this.$toast('请输入正确手机号')
            this.phonenumber = oldval
          }
        }
        // else {
        //   if (val.length === 9 || val.length === 4) {
        //     this.phonenumber = this.phonenumber.trim();
        //   } else {
        //     this.phonenumber = val;
        //   }
        // }
        if(val.length>13){ this.phonenumber = oldval }
      this.phonenumber=this.phonenumber.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4e00-\u9fa5]/g, "");
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login_wrap
    position: fixed;
    top 0
    left 0
    height 100vh
    width 100vw
    text-align center
    background #fff
    overflow-y auto
    .login-main
      background #fff
      position relative
      z-index 20
    .logo
     padding-top 66px
     img
      width 80px
      height 80px
     span
      display block
      font-family FZZZHUNHJW--GB1-0
      color #29354D
      margin-top 15px
      font-weight bold
      font-size 20px
    .phone
     margin-top 80px
     position relative
     z-index 20
     .shouji
      width 24px
      height 24px
      vertical-align middle
     .inputPhone
      width 262px
      height 24px
      margin-left 12px
      font-family PingFangSC-Light
      font-size 18px
      padding-bottom 5px
      color #29354d
      border-radius 0px 0px
      border-bottom  1px solid #E6E6E6
     .inputPhoneBlue
       width 262px
       height 24px
       margin-left 12px
       font-family PingFangSC-Light
       font-size 18px
       padding-bottom 5px
       color #29354d
       border-radius 0px 0px
       border-bottom  1px solid #ADCFFF
     .del
       position absolute
       right 40px
       bottom 5px
       width 20px
       height 20px
    .pwd
      margin-top 46px
      position relative
      z-index 20
      .mima
        width 24px
        height 24px
        vertical-align middle
      .inputPassword
        width 262px
        height 24px
        margin-left 12px
        font-family PingFangSC-Light
        font-size 18px
        padding-bottom 5px
        color #29354d
        border-radius 0px 0px
        border-bottom  1px solid #E6E6E6
      .inputPasswordBlue
        width 262px
        height 24px
        margin-left 12px
        font-family PingFangSC-Light
        font-size 18px
        padding-bottom 5px
        color #29354d
        border-radius 0px 0px
        border-bottom  1px solid #ADCFFF
      .img-box
        display inline-block
        background #fff
        padding 2px 4px
        position absolute
        right 36px
        bottom 3px
      .biyan
        width 20px
        height 20px


    input::-webkit-input-placeholder
      color #999999
      font-size 18px
    .forget_pwd
     margin-top 10px
     margin-right 36px
     font-size 14px
     float right
     color #999999
    .re-pwd
     float:left
     margin-left:40px
     color #999999
     font-size 14px
    .sure
     width 300px
     height 50px
     background #c9dfff
     border white
     font-size 18px
     border-radius 100px
     color white
     margin-top 46px
     z-index 30
    .sureblue
     width 300px
     height 50px
     background #4E97FF
     border white
     font-size 18px
     border-radius 100px
     color white
     margin-top 47px
     z-index 30
    .hailang
     position fixed
     left 0
     right 0
     bottom 0
     height 120px
     width 100%
     z-index 100
    .empty-none
      height 0
      transition all ease-in-out 0.2s
    .empty-block
      width 100%
      height 260px
      background transparent
      transition all ease-in-out 0s
.mint-msgbox-btns
  .mint-msgbox-btn
    font-size 16px

</style>
