<template>
    <div class="today_item">
      <div class="item_wrap"  v-show="isOpen"  >
        <img v-show="financialData[0].name==='实际赎回金额'" class="cart" src="../assets/images/fense.png"/>
        <img v-show="financialData[0].name==='实际回款金额'" class="cart" src="../assets/images/lvse.png"/>
        <img v-show="financialData[0].name==='净流入金额'" class="cart" src="../assets/images/zise.png"/>
        <img v-show="financialData[0].name==='累计申请未完成债权'" class="cart" src="../assets/images/chengse.png"/>
        <div class="item_top">
          <span>{{financialData[0].name}}</span>
          <img src="../assets/images/blackup.png" @click="open"/>
        </div>
        <div class="item_bottom">
          <span class="num">{{financialData[0].value | numToThousands}}</span>
          <div class="zengfu">
            <img src="../assets/images/redup.png"/>
            <span>3424234</span>
          </div>
        </div>
      </div>
      <ul v-show="!isOpen">
        <li  v-for="(item,index) in financialData" :style ="chooseCard(index,item)">
          <!--<img v-show="index===0" class="cart" src="../assets/images/fense.png"/>-->
          <img v-show="item.name==='实际赎回金额'" class="cart" src="../assets/images/fense.png"/>
          <img v-show="item.name==='实际回款金额'" class="cart" src="../assets/images/lvse.png"/>
          <img v-show="item.name==='净流入金额'" class="cart" src="../assets/images/zise.png"/>
          <img v-show="item.name==='累计申请未完成债权'" class="cart" src="../assets/images/chengse.png"/>
          <div class="item_top" :class="index===0?'item_top_two':''" >
            <span :class="index===0?'text_one':''">{{item.name}}</span>
            <img v-show="index===0" @click="open" src="../assets/images/shouqi.png"/>
          </div>
          <div class="item_bottom">
            <span class="num">{{item.value | numToThousands}}</span>
            <div class="zengfu">
              <img src="../assets/images/redup.png"/>
              <span>3424234</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    props:{
      financialData:{
        required:true
      }
    },
    data(){
      return{
        isOpen:true,
        iconArr:[
          {backgroundImage: "url(" + require("../assets/images/card1.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card2.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card3.png") + ")"},
          {backgroundImage: "url(" + require("../assets/images/card4.png") + ")"}
        ]
       }
    },
    mounted(){

    },
    methods:{
      open(){
        this.isOpen=!this.isOpen
      },
      chooseCard(index,item){
        if(index===0){
          return this.iconArr[0]
        }else if(index===1){
          return this.iconArr[1]
        }else if(index===this.financialData.length-1){
          return this.iconArr[3]
        }else{
          return this.iconArr[2]
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.today_item
  padding 0 8px
  .item_wrap
   padding-left 17px
   background-image url("../assets/images/homezd.png")
   background-size 100% 100%
   background-repeat no-repeat
   position relative
   .cart
    position absolute
    top 6px
    left 6px
    width 4px
    height 40px
   .item_top
    padding-top 28px
    span
     font-family PingFangSC-Regular
     font-size 16px
     color #A6A6A6
    img
     width 10px
     height 10px
     float right
     padding-top 3px
     padding-right 20px
   .item_bottom:after{
      content:""
      display:block
      position:absolute
      width: 1px
      border-right:1px dashed #E6E6E6
      height:25px
      top: 15px
      left:47%
    }
   .item_bottom
     position:relative
     padding-top 16px
     padding-bottom 28px
     .num
       font-family CenturyGothic
       font-size 24px
       color #010E4F
       position:relative
     .zengfu
      float right
      padding-top 5px
      padding-right 26px
      img
       width 10px
       height 11px
      span
       font-family PingFangSC-Light
       font-size 16px
       color #FF6666
  ul
    list-style none
    li
      background-repeat no-repeat
      background-size 100% 100%
      padding-left 17px
      position relative
      .cart
        position absolute
        top 6px
        left 6px
        width 4px
        height 40px
      .item_top
        padding-top 16px
        span
          font-family PingFangSC-Light
          font-size 14px
          color #A6A6A6
        .text_one
          font-family PingFangSC-Regular
          font-size 16px
        img
          width 10px
          height 10px
          float right
          padding-top 3px
          padding-right 20px
      .item_top_two
        padding-top 28px
      .item_bottom
        padding-top 16px
        padding-bottom 28px
        position:relative
        .num
          font-family CenturyGothic
          font-size 24px
          color #010E4F
        .zengfu
          float right
          padding-top 5px
          padding-right 26px
          img
            width 10px
            height 11px
          span
            font-family PingFangSC-Light
            font-size 16px
            color #FF6666
      .item_bottom:after{
        content:""
        display:block
        position:absolute
        width: 1px
        border-right:1px dashed #E6E6E6
        height:25px
        top: 15px
        left:47%
      }

</style>
