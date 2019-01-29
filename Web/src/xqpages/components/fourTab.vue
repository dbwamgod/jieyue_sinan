<template>
  <div class="four_tab_content">
    <div class="ftc_ul">
      <div class="ftc_li" v-for="(item,index) in fourTabData">
        <div class="tags" :style="{'background':item.color}"></div>
        <p class="title">{{item.title}}</p>
        <p class="num">{{item.num}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        fourTabData:[
          {
            title:'今日注册用户(位)',
            num:'565,566',
            color:'#e77296'
          },
          {
            title:'今日出借用户 (位)',
            num:'565,566',
            color:'#75d79b'
          },
          {
            title:'本月人均出借金额(元)',
            num:'565,566',
            color:'#9a98f2'
          },
          {
            title:'今日累计出借金额 (元)',
            num:'565,566',
            color:'#f6c583'
          }
        ]
      }
    },
    mounted(){

    },
    methods: {}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .four_tab_content
    width: 93.3%
    border-radius: 4px
    box-sizing: border-box
    margin: 0 auto
    .ftc_ul
      width:100%
      overflow:hidden
    .ftc_ul>div:nth-child(2n)
      float:right
    .ftc_li
      float:left
      width:43%
      position:relative
      background:#fff
      padding:21px 0px 17px 19px
      box-shadow: 0 4px 8px 2px rgba(137,174,240,0.15)
      border-radius: 4px
      overflow:hidden
      margin:0 0 14px 0
      .tags
        width:4px
        height: 20px
        background:red
        position:absolute
        top:0px
        left:0px
      .title
        font-size: 14px
        color: #A6A6A6
      .num
        margin:13px 0 0 0
        font-size: 24px
        color: #010E4F
</style>

