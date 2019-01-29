<template>
  <div class="echarts">
    <div class="nodata" v-if="isNoData">
      <div>
        <img src="../assets/images/wushuju.png"/>
      </div>
      <span>暂无相关数据</span>
    </div>
    <div v-else>
      <div v-if='dataListHeader.length>0'>
        <page-swiper v-for='item in dataListHeader' :pageData="item" :key='item.id'></page-swiper>
      </div>
      <div v-if='dataLists.length>0'>
        <chart-box v-for="(item,index) in dataLists" :chartData="item" :key='item.id' :chartIndex="index"></chart-box>
      </div>
      <div v-show='dataLists.length<=0' class="nodata">
        <div>
          <img src="../assets/images/wushuju.png"/>
        </div>
        <span>暂无图表</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import Vue from 'vue';
  import pageSwiper from "./pageSwiper";
  export default {
    data() {
      return {
        dataListHeader:[],
        dataLists:[],
        pageIndex:0,
        isNoData:false,
        LessThanTwo:false,
        isRequested:false,
        updatePage:true,
        allLoaded:false
      }
    },
    props:['currentView','subjectId'],
    computed:{
      ...mapGetters(['userid','orgCodeList','loadingShow'])
    },
    components: {
      pageSwiper
    },
    watch:{
      orgCodeList(){ //机构切换时，设置所有tab内容为可更新状态，并及时更新当前tab的内容
        this.updatePage = true
        if(this.$route.path == this.currentView && this.updatePage){
          this.saveLoadingShow(true)
          this.dataList(1)
          this.updatePage = false
        }
      },
      $route(to,from){ //页面切换时判断第一个tab是不是需要更新数据，如果需要就加载数据
        if(this.$route.path == this.currentView && this.updatePage){
          this.saveLoadingShow(true)
          this.dataList(1)
          this.updatePage = false
        }
      },
      isNoData(){
        let status = this.isNoData||this.LessThanTwo
        this.$emit('changeNoData',status)
      },
      LessThanTwo(){
        let status = this.isNoData||this.LessThanTwo
        this.$emit('changeNoData',status)
      },
      loadingShow(){
        this.$emit('changeLoadingState',this.loadingShow)
      }
    },
    created(){
      this.saveLoadingShow(true)
      if(this.orgCodeList.length>0){this.dataList(1)}
      this.updatePage = false
    },
    destroyed(){
      this.$destroy();
    },
    methods: {
      ...mapActions(['saveLoadingShow']),
      dataList(pageNum){
        if(pageNum == 1) {this.allLoaded=false}
        if(this.allLoaded) return false; //判断是否加载完毕
        if(this.isRequested) return false;
        this.isRequested = true
        // pageNum 默认不传，下拉刷新和机构选择时传1
        pageNum ? (this.pageIndex=pageNum) : (++ this.pageIndex)

        // 根据不同的组件name决定参数
        let ajaxData = ajaxData = {
            token: this.userid,
            subjectId: this.subjectId,
            orgCodeList:this.orgCodeList,
            currentPage:this.pageIndex
          }
        // ajaxData.pageSize=3 //前端设置每页显示的条数，供测试
        this.$ajax({method: 'post',url: '/mc-data/data/list',dataType: 'json', headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify(ajaxData),
        }).then(res=>{  // 请求成功
          if(res.data.code!=500){
            this.saveLoadingShow(false)
          }
          if(res.data.code == 200){
            //无数据
            if(!res.data.data && this.pageIndex==1){
              this.dataListHeader=[]
              this.dataLists=[]
              this.isNoData=true
              this.changeLoadState(true)
              this.$nextTick(()=>{
                this.isRequested = false
              })
              return;
            }
            if(res.data.data && res.data.data.length<=0 && this.pageIndex==1){
              this.dataListHeader=[]
              this.dataLists=[]
              this.isNoData=true
              this.changeLoadState(true)
              this.$nextTick(()=>{
                this.isRequested = false
              })
              return;
            }
            //有数据
            this.isNoData=false

            //如果page为null,表示无分页;或者当前请求页码大于总页码，表示加载完
            if(this.pageIndex>1&&(!res.data.page || (res.data.page && res.data.page.totalPages <= this.pageIndex))){
              this.changeLoadState(true)
            }else{
              this.changeLoadState(false)
            }

            let chartList=[],
                header = [],
                ajaxData = res.data.data
            if(!ajaxData) ajaxData=[]
            ajaxData.forEach(element => {
              if(element.displayMode && element.displayMode=="11"){ //标签类型
                header.push(element);
              }
              else{//图表类型
                chartList.push(element)
              }
            });
            if(this.pageIndex==1){
              this.dataListHeader=[]
              this.$nextTick(()=>{
                this.dataListHeader=header
              })
              if(this.dataLists.length==0){
                this.dataLists=chartList
                this.dataLists.length<2 ? this.LessThanTwo=true : this.LessThanTwo=false
              }
              else{
                this.dataLists=[]
                this.$nextTick(()=>{
                  this.dataLists = this.dataLists.concat(chartList)
                  this.dataLists.length<2 ? this.LessThanTwo=true : this.LessThanTwo=false
                })
              }
            }
            else{
              this.LessThanTwo=false
              this.dataLists=this.dataLists.concat(chartList);
              this.dataListHeader=this.dataListHeader.concat(header)
            }
            this.$nextTick(()=>{
              setTimeout(()=>{
                this.isRequested = false
              },1000)
            })
          }
          else if(res.data.code == 301){//7天自动退出登录
            this.isRequested = false
            this.$logOut({
              rememberpwd:'1'
            }); //退出记住密码
          }
          else if(res.data.code == 407){ //被踢出登录，返回登录页
            this.isRequested = false
            this.$logOut()
          }
          else{
            this.isRequested = false
            console.log(res.data.msg)
          }
        }).catch((err)=>{// 请求失败
          this.isRequested = false
          console.log(err)
        })
      },
      changeLoadState(status){
        this.$emit('changeLoadState',status)
        if(status){
          this.allLoaded = true
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .echarts
    height 100%
    position relative
  .header
    width 100%
    display flex
    background-color #FFFFFF
    padding 26px 0 21px
  .one1
    width 100px
    color #29354D
    text-align center
    margin-left 5px
    border-right 1px solid #F1F3F8
    flex 1
  .one-1
    flex 1
    font-size 38px
    color #29354d
    font-family DINCondensed-Bold
  .two-1
    flex 1
    font-size 14px
    i
      font-size 10px
      color #909090
      font-style normal
      margin-left 4px
  .nodata
    width 100%
    height 250px
    margin-top 100px
    text-align center
    line-height 20px
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
