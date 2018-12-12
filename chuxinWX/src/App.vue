<template>
  <div id="app" v-show='showThis'>
    <div class="tipsstatus" v-show='showTipS'>
      {{tipsstatus}}
    </div>
    <md-spinner md-indeterminate :md-size="60" v-if="loading"></md-spinner>
    <transition name='tiptext'>
      <h3 v-show="tipError" class="tiptext"><i class="iconfont">&#xe647;</i><span>{{tiptext}}</span></h3>
    </transition>
    <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>

  <div class="share" v-show='share' @click = 'share =false'>
    <img src="../src/assets/images/sharebg4.png" alt="">
    <p>点击右上角分享给好友</p>
  </div>

  <div class="twoCode" v-show='showTwoCode' @click='showTwoCode= false'> 
    <p>请先关注公众号参加团报</p>
    <div>
      <img src="../src/assets/images/shareB2.jpg" alt="">
      <p>长按二维码识别关注公众号<span>"文升阅读"</span></p>
      </div>   
  </div>

  <div class="tipClub" v-show='showTipClub'>
    <p>{{text}}</p> 
    <p> 
      <span @click='cancle'>取消</span>
      <span @click='argeen'>确定</span>
    </p>
  </div>
 <div class="showTips1 tipClub" v-show='showTips1'>
    <p>{{texts1}}</p> 
    <p> 
      <span @click='sures1'>确定</span>
    </p>
  </div>
  <div class="submitHuimu" v-show='showSubmitHuimu'>
    <p>{{submitText}}</p>
  </div>

  <div class="nextTips" v-show='nextTip'>
       <!-- <p><i class="iconfont">&#xe7ad;</i></p> -->
      <!-- <button @click='leave'> 返回</button> -->
      <button @click='goNext'>下一关</button>
  </div>
  <div class="haveOver" v-show='haveOver'>
    
          <i class="iconfont">&#xe7ad;</i>
          <br>
          已完成
  
  </div>
  <div class="overTask" v-show='showOverTask'>
    <div>
      <p>你已经完成本次阅读任务</p>
      <button @click='showOverTask = false'>确定</button>
    </div>    
  </div>
<div class="nextTip" v-show='showMyCourse'>
  <div class="goMyCourse">
    <p>你已经购买了此课程<br>是否去学习？</p>
    <button @click='canclego'>取消</button>
    <button @click='goCourse'>去我的课程</button>
    
  </div>
</div>
<div class="overTips" v-show='overTips'>
  <div>
    {{overTipsText}}
</div>
</div>
<div v-show='showErr' class="requestErr">
  <div>
      <p>哎呀，出错了...</p>
      <button @click='errBack'>返回</button>
      <button @click='newWeb'>刷新</button>
  </div>
  
</div>

<!-- <div class="setTimeTip" v-show='setTimeTip'>
  设置成功
</div> -->

  </div>
</template>

<script>
import { bus } from './bus.js'


export default {

  data(){
    return{
      tipError:false,
      tiptext:'操作有误',
      loading:false,
      share:false,
      showTwoCode:false,
      text:'',
      showTipClub:false,
      showThis:true,
      submitText:'正在提交中...',
      showSubmitHuimu:false,
      nextTip:false,
      showOverTask:false,
      showMyCourse:false,
      setTimeTip:true,
      tipsstatus:'',
      showTipS:false,
      overTips:false,
      overTipsText:'',
      showErr:false,
      showTips1:false,
      texts1:'',
      haveOver:false
    }
  },
  methods:{
    sures1(){
      this.showTips1 = false;
    },
    errBack(){
    this.$router.go(-1);
    this.showErr = false;
    },
    newWeb(){
      location.reload();
      this.showErr = false;
    },
    //购买成功去我的课程
    goCourse(){
        this.showMyCourse = false;
        this.$router.push({name:'myCourse',query:{from:'myCourse'}})
    },
    canclego(){
      this.showMyCourse = false;
   },
    argeen(){
      this.showTipClub = false;
      bus.$emit('goIndex')
    },
    cancle(){
      bus.$emit('not2')
      this.showTipClub = false;
    },
    //阅读模块进入下一关
    goNext(){
      this.nextTip = false;
      bus.$emit('goNext');
    },
    leave(){
      this.nextTip = false;
    },
    show(text){
      this.tiptext=text;
      this.tipError=true
      setTimeout(function () {
        this.tipError=false;
      }.bind(this),1200)
    }
  },
  components:{
  },
  created:function(){
      // bus.$on('follow',()=>{
    //     console.log('验证是否关注了公众号');
    //      if(!this.$root.isfollow){
    //         bus.$emit('showTwoCode');
    //             bus.$emit('lazyloads')
    //      }else{
    //       bus.$emit('lazyloads')
    //       bus.$emit('showTwoCode');
    //      }
    //   });
    bus.$on('hidetips1',()=>{
       this.showTips1 = false;
    })
    bus.$on('showtips1',(text)=>{
      this.showTips1 = true;
      this.texts1 = text;
    })
    bus.$on('showErrs',()=>{
      this.showErr = true;
      this.loading = false;
    });
    bus.$on('hideErrs',()=>{
      this.showErr = false;
      this.loading = false;
    })
    bus.$on('overTips',(text)=>{
      this.loading = true;
      this.overTips = true;
      this.overTipsText = text;
      setTimeout(function(){
        this.loading = false;
          this.overTips = false;
      }.bind(this),800)
    })
    bus.$on('showTipsStatus',(text)=>{
       this.loading= true ;
      this.tipsstatus = text;
      this.showTipS = true;
    })
     bus.$on('closeTipsStatus',()=>{
      this.showTipS = false;
       this.loading= false;
    })
    bus.$on('showMyCourse',(text)=>{
      if(text == 'noT'){
         this.showMyCourse = true;
       }else{
         setTimeout(function(){
       this.showMyCourse = true;
       }.bind(this),1000)
       }
     
    })
    bus.$on('showOverTask',()=>{
      setTimeout(function(){
       this.showOverTask = true;
       }.bind(this),1000)
      
    })
    bus.$on('showTipNext',()=>{
      this.nextTip = true;
      this.haveOver = true;
      setTimeout(function(){
        this.haveOver = false;
       }.bind(this),1000)

    });
     bus.$on('hideTipNext',()=>{
      this.nextTip = false;
    });

    bus.$on('submithuimu',(text)=>{
      this.showSubmitHuimu = true;
      this.submitText = text;
      this.loading= true ;

    });
    bus.$on('closesubmithuimu',(text)=>{
      this.loading= true ;
      this.submitText = text;
        setTimeout(function(){
        this.loading= false;
        this.showSubmitHuimu = false;
       }.bind(this),500)
      
    });
    bus.$on('closesubmithuimus',()=>{
        this.loading= false;
        this.showSubmitHuimu = false;
      
    });
    bus.$on('tipClub',(text)=>{
      this.text = text;
      this.showTipClub = true;

    })
    bus.$on('lazyloads',()=>{
      bus.$emit('closeloading');
      
    });
    bus.$on('showTwoCode',()=>{
      this.showTwoCode = true;
    })
    bus.$on('share',() =>{
      this.share = true;
    })

    bus.$on('tip', (text) => {
        this.show(text);
    })
    bus.$on('loading',() => {
        this.loading= true ;
    })
    bus.$on('closeloading',() => {
        this.loading=false;
    })
  }
}
</script>

<style lang='less'>
@font-face {font-family: 'iconfont';
    src: url('../static/fonttask/iconfont.eot');
    src: url('../static/fonttask/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../static/fonttask/iconfont.woff') format('woff'),
    url('../static/fonttask/iconfont.ttf') format('truetype'),
}
@keyframes tipsStatus{
  0%{
    transform: scale(1) translate(-50%,-50%);
    -webkit-transform: scale(1) translate(-50%,-50%);
  }50%{
    transform: scale(1) translate(-50%,-50%);
    -webkit-transform: scale(1) translate(-50%,-50%);
  }
  100%{
    transform: scale(1) translate(-50%,-50%);
    -webkit-transform: scale(1) translate(-50%,-50%);
  }
}
.iconfont{
    font-family:"iconfont";
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
#app {
  width: 100%;
  height: 100%;
  &>.tipsstatus{
    position: fixed;
    left:50%;
    top:50%;
    z-index: 1003;
    width:8rem;
    text-align: center;
    height:8rem;
    line-height: 8rem;
    border-radius: 8px;
    color:#fff;
    background: rgba(0,0,0,.4);
    animation: tipsStatus 2s ease infinite;


  }
  &>.md-spinner{
    position: fixed;
    left: 0;right: 0;top: 0;bottom: 0;
    margin: auto;
    z-index: 1004;
    
  }
  .tiptext{
    position: fixed;
    width: auto;
    left: 50%;
    transform:translateX(-50%);
    font-size: 18px;
    height: 25px;
    top:15px;
    // overflow: hidden;
    z-index: 999;
    color: red;
    padding-right: 10px;
    background-color: white;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    display: flex;
    z-index: 1001;
    span{
      // float: left;
      font-weight: 500;
      display: inline-block;
    }
    &>i:nth-child(1){
      font-size: 20px;
      width: 10px;
      height: 100%;
      line-height: 25px;
      margin-left: 7px;
      margin-right: .5rem;
      text-align:center;
    }
    &>span:nth-child(2){
      margin-left: 5px;
      height: 100%;
      line-height: 25px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      // font-size: 1.6rem;

    }
  }

  .tiptext-enter-active {
    animation: bounce-in .5s ;
  }
  .tiptext-leave-active {
    animation: bounce-out 1.5s cubic-bezier(0,.5,1,.5);
  }
  @keyframes bounce-in {
    0% {
      top:-30px;
      opacity: 0;
    }
    100% {
      top:15px;
      opacity: 1;
    }
  }
  @keyframes bounce-out {
    0% {
      top:15px;
      opacity: 1;
    }
    100% {
      top:-30px;
      opacity: 0;
    }
  }
  .share{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    left:0;
    top:0;
    z-index:999;
    &>img{
      width:58%;
      height:30%;
      display: inline-block;
      margin-left: 21%;
      margin-top: 20%;
    }
    &>p{
      text-align: center;
      color:#fff;
      font-size:2rem;
      position: relative;
      top:0rem;
      letter-spacing: 3px;
    }
  }
  .twoCode{
     position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    left:0;
    top:0;
    z-index: 999;
    &>p{
    text-align: center;
    color:#fff;
    margin-top: 2rem;
    font-size:2rem;
    }
    div{
      width: 26rem;
      height: 50%;
      margin:40% auto 0;
      &>img{
         width: 12rem;
         height: 12rem;
         display: inline-block;
         margin-left: 7rem;
         margin-top: 3rem;
      }
      &>p{
        color:#fff;
        text-align: center;
        margin-top: .5rem;
        &>span{
          color:#f60;
          font-size: 1.7rem;
        }
      }
    }
  }
  .tipClub{
    position: fixed;
    width:70%;
    height:13rem;
    left:15%;
    top:35%;
    background: #409eff;
    display: flex;
    -webkit-display:flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    border-radius: 5px;
    p{
      color:#fff;
      &:first-child{
      flex:1;
      -webkit-flex:1;
      line-height: 9rem;
      text-align:center;
      }
      &:last-child{
        height:4rem;
        line-height:4rem;
        span{
          display: inline-block;
          float: left;
          width:50%;
          text-align: center;
          border-top:1px solid rgba(238, 238, 238, 0.7);
          &:first-child{
            border-right:1px solid rgba(238, 238, 238, 0.4);

          }
        }
      }
    }
  }
  .showTips1{
    background: #fcfcfc;
    border:1px solid #eee;
    box-shadow: 2px 2px 2px #eee;
    p{
      color:#666;
       font-size:1.6rem;
      span{
        color:#333;
        width:100%!important;
        font-size:1.6rem;
        letter-spacing: 5px;
      }
    }
  }
  .submitHuimu{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background: rgba(0,0,0,.3);
    z-index: 1003;
    p{
      margin-top: 60%;
      text-align: center;
      color:#fff;
      font-size: 2rem;
    }
  }
  .nextTip,.overTask{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background: rgba(0,0,0,.2);
    z-index: 1003;
    &>div{
      position: absolute;
      width:70%;
      left:15%;
      top:35%;
      height:12.5rem;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;
      -webkit-animation:showTips .5s forwards;
      animation:showTips .5s forwards;
      &>p{
        line-height: 8.5rem;
        height: 8.5rem;
        text-align: center;
        i{
          font-size: 4rem;
          color:#8bc34a;
        }
      }
      &>button{
        width:50%;
        line-height: 4rem;
        color:#333;
        float: left;
        background: rgba(158, 158, 158, 0.12156862745098039);
        &:last-child{
        color:#f60;
        border-left: 1px solid #eee;
       }
      }
    }
    .goMyCourse{
      p{
        line-height: 3rem;
      }
      button{
        /*margin-top: 2.5rem;*/
      }
    }
  }
  .nextTips{
    position: fixed;
    width:100%;
    height:4.2rem;
    left:0;
    bottom:0;
    button{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        background: #62cc6b;
        color: #fff;
        height: 100%;
        font-weight: 550;
        letter-spacing: 2px;
        -webkit-animation: toBottom .7s forwards;;
        animation: toBottom .7s forwards;
        border: 1px solid #eee;
    }
  }
  .haveOver{
     position: fixed;
    width:30%;
    border-radius: 3px;
    -webkit-transform: translate(-50% -50%);
    transform: translateY(-50%);
    left:35%;
    bottom:50%;
    background: rgba(0,0,0,.2);
    text-align: center;
    padding: .7rem 0;
    color: #fff;
    i{
      color:#fff;
    }
  }
  .overTips{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background: rgba(0,0,0,.2);
    color:#666;
    div{
      position: absolute;
      width:10rem;
      height:10rem;
      left:50%;
      top:50%;
      background: #fff;
      line-height: 10rem;
      border-radius: 5px;
      text-align: center;
      font-size:1.7rem;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
    }
  }
  .setTimeTip{
      position:fixed;
      width:10rem;
      height:10rem;
      left:50%;
      top:50%;
      transform: translateX(-50%);
      background: red;
      border-radius: 5px;
      -webkit-animation:showTips .5s forwards;
      animation:showTips .5s forwards;

  }
  .overTask{
    &>div{
      height:10rem;
       &>p{
        line-height: 6rem;
      }
      &>button{
        width:100%;
        margin-left: 0;
        line-height: 4rem;
        color:#333!important;
        margin-top: 0!important;
        font-size: 1.6rem;
    }
    }
    

  }
  /*请求异常*/
  .requestErr{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    &>div{
      width:80%;
      height:15rem;
      position: absolute;
      left:10%;
      top:25%;
      background: #fff;
      box-shadow: 0 0 4px #ddd;
      border:1px solid rgba(238,238,238,.58);
      overflow: hidden;
      border-radius: 10px;
      p{
        line-height: 11rem;
        text-align: center;
    }
    button{
      float: left;
      width:50%;
      line-height: 4rem;
      height:4rem;
      border-top:1px solid rgba(238,238,238,.58);
      border-right:1px solid rgba(238,238,238,.58);
    }
    }
    
  }
}
.picker{
  li{
    margin-top: 0!important;
  }
}
@keyframes showTips{
  from{
    transform: scale(.5);
    -webkit-transform: scale(.5);

  }
  to{
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
@keyframes toBottom{
  from{
    bottom:-2.5rem;
  }
  to{
    bottom: 0;
  }
}
.el-message{
      top:0;
    }
</style>
