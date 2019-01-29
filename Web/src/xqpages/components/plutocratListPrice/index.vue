<template>
  <div class="wrapper-plutocratList-price">
    <div class="content-plutocratList-price">
      <div class="plutocratList-price">
        <div class="title">今日富豪排行TOP3</div>
        <div class="plutocratList-price-hd">
          <div class="item">
            <div class="two"></div>
            <div class="person">上海  李</div>
            <p class="price">1000万</p>
            <p class="time">04.12 15:30</p>
          </div>
          <div class="item">
            <div class="one"></div>
            <div class="person">上海  李</div>
            <p class="price">1000万</p>
            <p class="time">04.12 15:30</p>
          </div>
          <div class="item">
            <div class="three"></div>
            <div class="person">上海  李</div>
            <p class="price">1000万</p>
            <p class="time">04.12 15:30</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="table" ref="table">
      <div class="th-block">
        <div class="th">排名</div>
        <div class="th">姓名</div>
        <div class="th">详情</div>
        <div class="th">明细</div>
      </div>
      <div class="content-block" v-for="(item,key) in listData">
        <div class="content-block-hd">
          <div class="td one" v-if="key+1===1"></div>
          <div class="td two" v-else-if="key+1===2"></div>
          <div class="td three" v-else-if="key+1===3"></div>
          <div class="td normal" v-else="key+1<4">{{key+1}}</div>
          <div class="td">{{item.name}}</div>
          <div class="td">
            <span class="city">{{item.city}}</span>
            <span class="price">{{item.price}}<span class="wan">万</span></span>
            <p class="time">{{item.sendTime}}</p>
          </div>
          <div class="td shouqi" :class="isSorrowShow?'zhankai':'shouqi'" @click="toggle(item)"></div>
        </div>
        <div class="content-block-detail" v-show="item.detailShow">
          <div class="content-block-detail-tr" v-for="(item,index) in detailList">
            <div class="item">{{item.name}}</div>
            <div class="item price">{{item.price}}<span class="wan">万</span></div>
            <div class="item time">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom" v-show="bottomLoading">
      <div class="icon"><mt-spinner type="fading-circle" color='#4E97FF'></mt-spinner></div>
      <span>正在加载...</span>
    </div>
    <div v-show="isNomle_bottom && !isNoData" class="bottom_msg" :class="listData.length<13?'bottom_msg_fixed':''">
      <!-- <span class="line line1"></span>我是有底线的<span class="line line2"></span> -->
      <span>—&nbsp;&nbsp;向前金服&nbsp;</span>
        <b class="dots"></b>
        <span>&nbsp;向前向未来&nbsp;&nbsp;—</span>
    </div>
    <div class="bottom_msg" v-show="listData.length<13" :class="listData.length<13?'bottom_msg_fixed':''">
        <span>—&nbsp;&nbsp;向前金服&nbsp;</span>
        <b class="dots"></b>
        <span>&nbsp;向前向未来&nbsp;&nbsp;—</span>
    </div>
    <div class="topBar" :class="isIphoneX?'iphonex-top-bar':''" id="goTop" v-show="goTopShow">
      <img src="@/assets/images/zhiding.png" alt="" class="goTop"  @click="goTop">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data(){
      return {
        listData:[],
        bottomLoading:false,
        isNomle_bottom:false,// 判断到底部标识
        isNoData:false,//暂无数据
        goTopShow:false,// 返回顶部
        isRequested:false,//请求成功后执行下次请求表示
        page:1,
        isSorrowShow:false,
        detailList:[],
      }
    },
    components:{
    },
    computed:{
      ...mapGetters(['userid','isIphoneX'])
    },
    created(){
      this.listData = [
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
        {city:'上海',name:'梁**',price:'2000',sendTime:'04.12 15:30'},
      ];
      this.detailList = [
        {name:'捷e盈90天',price:'2000',time:'04.12 15:30:58'},
        {name:'捷e盈90天',price:'2000',time:'04.12 15:30:58'},
        {name:'捷e盈90天',price:'2000',time:'04.12 15:30:58'},
        {name:'捷e盈90天',price:'2000',time:'04.12 15:30:58'},
      ];
      this.getDataList();
    },
    mounted(){
      this.$nextTick(()=>{
        window.scrollTo(0,0);
        this.addListener();
      })
    },
    methods:{
      ...mapActions(['saveLoadingShow']),
      toggle(item){
        if(item.detailShow){
          this.$set(item,'detailShow',false);
        } else {
          this.$set(item,'detailShow',true);
        }
        console.log(item);
        this.isSorrowShow = !this.isSorrowShow;
      },
      goTop(){
        let timer = null,_that = this;
        cancelAnimationFrame(timer)
        timer=requestAnimationFrame(function fn(){
          if(_that.scrollTop>0){
            _that.scrollTop-=50;
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
            timer=requestAnimationFrame(fn)
          }else {
            cancelAnimationFrame(timer);
            _that.goTopShow=false;
          }
        })
      },
      getDataList(){
        if(this.isRequested) {
          return false;
        }
        this.isRequested = true;
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
          if(res.data.code == 200){
            // 判断没有任何数据的时候显示的是无数据提示
            if(res.data.data && res.data.data.length<1 && this.page===1){
              this.isNoData = true;
               return;
            }
            // 加载到最后一页没有数据的情况
            else if(res.data.data.length<1 && this.page !==1){
              this.isNomle_bottom = true;
              this.bottomLoading = false;
              return;

              // 返回有数据就把 原dataPlanLists和返回数据合并数组
            } else {
              this.listData = this.listData.concat(res.data.data);
              //
              this.listData.forEach((item,index)=>{
                this.$set(item,'detailShow',false);
              })
              this.page++;
            }

          }else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.$logOut();
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.$logOut({
              rememberpwd:'1' 
            }); //退出记住密码
          } else {
            this.$toast(res.data.msg);
          }
          setTimeout(()=>{
            this.isRequested = false;
          },500);
            
        }).catch(function(err){// 请求失败
          console.log(err);
          this.isRequested = false;
        })
      },
      loadBottom() {// 加载更多数据
        if(this.isNomle_bottom) return;
        this.bottomLoading = true;
        setTimeout(()=>{
          this.getDataList();
        },500);
      },
      addListener(){
        window.addEventListener('scroll', this.handleScroll);
      },
      removeListener(){
        window.removeEventListener('scroll', this.handleScroll);
      },
      handleScroll () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        const windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //滚动加载更多
        if(scrollTop + windowHeight >= scrollHeight-100){ this.loadBottom() }
        //回到顶部
        if(scrollTop>400){
          this.goTopShow=false
          this.scrollTop = scrollTop
        }
        else{
          this.goTopShow=false
        }
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
