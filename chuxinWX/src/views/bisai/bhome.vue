<template>
  <div class="bhome">
   <section class="paihang" v-if='paihang'>
    <i class="iconfont" @click='closepaihang'>&#xe633;</i>
    <span >关闭</span>
    <div class="topCenter">让红包飞</div>
     <h2>本场答题排行</h2>
     <!-- <p>您获得分享红包 <b></b>元！</p> -->
    <div v-if='paihangBox'>
        
        <ul class="ranklist">
          <li v-for='(p,index) in phList'>
            <p>{{index+1<10?'0'+(index+1):index+1}}.</p>&nbsp;<p>恭喜</p><p>'{{p.name}}'</p><p>获得红包&nbsp;{{p.amount}}&nbsp;元！</p></li>
          
        </ul>
        <p>分享阅读答题活动给小伙伴<br>大家一起来赢红包吧！</p>

        <p>更多阅读活动场次红包，请关注"文升阅读"</p>
        

      </div>
      <div v-if='!paihangBox' class="noresult"><br><br>比赛尚未结束，请耐心等待</div>
   </section>
    <div id="ul">
   
    </div>
<img src="../../assets/images/logo.png" alt="" class="indexLogo">
<div @click='ranking'  v-show='paihanglist' class="ph">排行榜</div>
    <div class="activeOver" v-if='showOver'>
      代码无效或过期^_^
    </div>
      <div class="top-padding">
      </div>
      <div class="competitionInfo">
        <transition name='infoText'>
          <div v-if="infoText" class="infoText">
            <!-- 您好，{{nicknames}} -->
            ”读书才会赢“<br>
            文升阅读新春答题抢红包
          </div>

        </transition>
       <!--  <transition name='infoLogo'> -->
          <!-- <div v-if="infoLogo" class="infoLogo" :style="{backgroundImage: 'url(' + img + ')'}"> -->
            
          <!-- </div> -->
        <!-- </transition> -->
      </div>
      <div class="selGrade">
       <!--  
        <div class="selected" @click="show">
          <span>选择年级：</span>
          {{selected.text}}
        </div> -->
         <div class="selected">
          <span>活动代码：</span>
          <form action="">        
            <input type="text" v-model='classcode' id="gb" autofocus placeholder="请输入代码">
         </form>

        </div>
        <transition name="options">
          <div class="options" v-if="showOptions">
            <span v-for="item in options" @click="selGrade(item)"  v-bind:class="{ active: item.value == selected.value }">{{item.text}}</span>
          </div>
        </transition>

      </div>
      <p class="wsinformation">*关注订阅号&nbsp;“文升阅读”<br>获取活动代码</p>
      <div class="buttonContainer">
        <span @click="goexam">进入闯关</span>
        
      </div>
      <div class="img">
        <img src="../../assets/images/bisaibg1.png" alt="">
      </div>
  </div>
</template>

<script>
import { bus } from '../../bus.js'

export default {

  data() {
  	return {
      infoText:false,
      infoLogo:false,
      showOptions:false,
      options:[
        {text:'一年级',value:1},
        {text:'二年级',value:2},
        {text:'三年级',value:3},
        {text:'四年级',value:4},
        {text:'五年级',value:5},
        {text:'六年级',value:6},
        {text:'七年级',value:7},
        {text:'八年级',value:8},
        {text:'九年级',value:9}
      ],
      selected:{text:'',value: 0},
      classcode:'',
      showOver:false,
      nicknames:'',
      paihang:false,
      paihanglist:true,
      moneyData:'',
      paihangBox:false,
      phList:[],
  	}
  },
  methods: {
//     load(){  
//     var oInp = document.getElementById("gb");  
//     console.log(oInp)
//     if(oInp.autofocus != true){  
//         oInp.focus();  
//     }  
// },

    closepaihang(){
      this.paihang=false;
      // clearInterval(timer6)
    },
    //排行榜无缝滚动效果
    // listScroll(){
     
    //   var firstli=$('.ranklist').find('li:first');
    //   var height = firstli.height();
    //     firstli.animate({
    //       marginTop:-height + 'px',
    //         height:0
    //   },500,function(){
    //     console.log('执行动画')
    //     firstli.css('marginTop',height);
    //   });
       
    // },
    ranking(){ 
      var this_=this;
     console.log('显示')
      bus.$emit('loading')
      // let openid=JSON.parse(sessionStorage.getItem('u'))['openid'];
      this.axios.get(this.ip.RESTPATH+'rest/getSendRedPackResultByCode?name=')
      .then(res=>{
        this.paihang=true;
        console.log(res)
        bus.$emit('closeloading')
        if(res.data.flag==false){
            this.paihangBox=false;
        }else{
            this.paihangBox=true;
            this.phList=res.data;
          //  window.timer6=setInterval(function(){
          //   this_.listScroll();
          //   console.log(11)
          // },1000);
      }
      })
    },
    draw(o){
        var speed = 0;

         var ul = document.getElementById('ul')
        var startPosLeft=Math.ceil(Math.random()*document.documentElement.clientWidth);
        o.style.opacity=(Math.ceil(Math.random()*3)+7)/10;
        o.style.left=startPosLeft+'px';
        // o.style.color='#fff';
        // o.style.width='4rem';
        // o.style.height='4rem';
        // o.src=this.imgArr[0]
        o.style.fontSize=40+Math.ceil(Math.random()*14)+'px';
        setInterval(function(){
          if(speed<document.documentElement.clientHeight*0.8){
            o.style.top=speed+'px';
            // o.style.left=startPosLeft+Math.ceil(Math.random()*8)+'px';
            speed+=1.5;
          }else{
            o.style.display='none';
          }
        },50)
    },
    createSnow(){
      var this_=this;
      // var i =
     var timer2=setInterval(function(){
        var div = document.getElementById('ul')
          var li =document.createElement('li');
          var colorArr=['#ea330f','#ea0f66','#fff','#bc0e54','#f7da1a','#fff','#7235f0','#f0359a','#35c3f0','#fff','#ff0']
          li.innerHTML='*';
          li.style.position='absolute';
          ul.appendChild(li);
          this_.draw(li)
         
          var liL=document.getElementsByTagName('li');
          for(var i = 0;i<liL.length;i++){
            li.style.color=colorArr[Math.floor(Math.random()*11)]
            if(i>15){
             
              ul.removeChild(liL[i-15]);
            }
          }
         
      },2000)
    },

    goexam(){
      console.log(sessionStorage)
      sessionStorage.setItem('classcode',this.classcode)
      console.log(sessionStorage.getItem('classcode'))
      // sessionStorage.setItem('u',1);
      //分享出去的链接并不是/home
      // if(this.selected.value){
      //   this.$router.push({name:'bdoexam', params: { grade:this.selected.value}})
      // }
      console.log(this.classcode)
      var _this=this;
      this.axios.get(this.ip.RESTPATH+'rest/getCodeIsValid/'+this.classcode)
      .then(res=>{
        console.log(res)
        console.log(res.data.flag)
          if(res.data.flag==true){
                this.$router.push({name:'bselectbook',params:{classcode:this.classcode}})
            }else if(res.data.flag==false){
            bus.$emit('tip','代码失效!') 
            }else if(res.data.flag=='invalid'){
            bus.$emit('tip','代码无效!')   
            }else if(res.data.flag=='noStart'){
              bus.$emit('tip','活动还未开始!') 
            }else if(res.data.flag=='finish'){
              bus.$emit('tip','活动已经结束!')
            }
      })
    },
    show(){
      this.showOptions=true;
    },
    selGrade(item){
      this.selected=item;
      console.log(sessionStorage)
      sessionStorage.setItem('grade',item.text);//存当前年级
      this.showOptions=false;
    },
    getQueryString(){
      var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null){
        return unescape(r[2]);

      }else{
            return null;
      }
    },
   

  },
  computed:{

  },
  components:{

  },

  created:function () {
   let id= window.location.href;
   let index=id.indexOf('/bisai');
   console.log(id.charAt(index+7))
   console.log(id.indexOf('/bisai'))
    sessionStorage.setItem('ids',id.charAt(index+7))
    console.log(sessionStorage.getItem('ids'))
    this.configs();
    this.config();
    var this_=this;
    this.$store.state.answerStore=[];
    setTimeout(function () {
      this.infoText=true;
      this.infoLogo=true;
    }.bind(this),500)
     
  

  }
}
</script>

<style lang='less'>
@font-face {font-family: 'iconfont';
    src: url('../../../static/font/iconfont.eot');
    src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/iconfont.woff') format('woff'),
    url('../../../static/font/iconfont.ttf') format('truetype'),
    url('../../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}

  .bhome{
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #13274c 0%,#3499d1 100%);
    // background-image: url('../../assets/images/bisaibg.png');
    background-position: bottom;
    background-size: 100% 100%;
    position: relative;
    .ph{
      color:#fff;
      width:5.2rem;
      height: 5.2rem;
      border-radius: 50%;
      line-height: 5.2rem;
      border:1px solid #fff;
      position: absolute;
      right:.5rem;
      top:.5rem;
      text-align: center;
      z-index: 999;
      transition: .8s;
      &:active{
        transform: scale(1.3);
        // transform:rotate(360deg);
      }
    }
    .paihang{
      position: fixed;
      width:90%;
      height:85%;
      left:5%;
      top:12%;
      z-index: 999;
      border-radius: 5px;
      background: linear-gradient(to top ,#bd8bae  0%, #289ede 100%); 
      // background: #299fdf;
      box-shadow:1px 1px 5px 3px #289ede;
      border: 1px solid #a7eceb;
      animation: paihang .5s forwards;
      -webkit-animation: paihang .5s forwards;
     
      .topCenter{
        width: 7rem;
        height:7rem;
        background: #d83491;
        position: absolute;
        letter-spacing: 1px;
        left:40%;
        top:-12%;
        // transform: translate(-50%);
        border-radius: 50%;
        border:2px solid rgba(255,255,255,.7);
        color:#f0e8e8;
        line-height: 7rem;
        text-align: center;
        animation: topss 60s infinite;
        -webkit-animation: topss 60s infinite;
      }
      i,span{
          float: right;
          font-size: 2.5rem;
          position: absolute;
          right:.2rem;
          top:.5rem;
          color:#fff;
          width:2.6rem;
          height:2.6rem;
          line-height: 2.6rem;
          text-align: center;
          border-radius: 50%;
          // background: #fff;
          // border:2px solid #fff;

        }
        &>span{
            font-size: 1.5rem;
            display: none;
        }
      h2{
        text-align: center;
        margin-top: 5rem;
        letter-spacing: 3px;
        color:#fff;
        font-size: 2.5rem;
        // text-indent: 2em;
       
      }
        &>p{
          font-size: 2rem;
          text-align: center;
          color:#fff;
          margin-top: 1rem;
        }
      div{
        margin-top: 1.5rem;
        position: relative;
        width: 100%;
        height:80%;
        &>ul{ 
        width:100%;
        margin:1rem auto 0;
        text-indent: 1rem;
        max-height: 80%;
        color:#f0e8e8;
        border-radius: 5px;
        font-size: 1.8rem;
        // border: 1px solid rgba(255,255,255,.5);
        // overflow-y: hidden; 
        overflow-x: hidden; 
        -webkit-overflow-scrolling: touch;
        overflow-scrolling:touch;
        li{
          width:100%;
          // margin:.4rem 0rem;
          color:#fff;
          font-size: 1.6rem;
          border:none;
          height:2rem;
          line-height: 2rem;
          position: relative;
          // overflow:hidden;
          //   text-overflow:ellipsis;
          //   white-space:nowrap;
          // text-align: left;

        }
        p{ 
          display: inline-block;
          color:#fff;
          font-size: 1.6rem;
         height: 100%;
         line-height: 2rem;
          height: 100%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          &:nth-child(3){
            width:5em;
            text-align: center;
            // margin-right: .5rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            // position: relative;
            // bottom:-.5rem;
            // left:0;
          }
         

        }
      }
      &>p{
          color:#353030;
          text-align: center;
          font-size: 1.4rem;
          position: absolute;
          width:100%;

          &:nth-of-type(2){
          bottom:0rem;
          padding: 0;
        }
        &:nth-of-type(1){
          bottom:2rem;
          line-height: 2.2rem;
          border-bottom:none;
        }
      }
      }
      .noresult{
       text-align: center;
        color:#fff;
        font-size: 1.8rem;

      }
      
    }
    #ul{
      position: fixed;
      left:0;
      top:0;
      width:100%;
      height:2rem;}
    //   &>img{
    //     display: inline-block;
    //     position: absolute;
    //     left:0;
    //     top:0;
    //     width:2rem;
    //     height:2rem;
    //     background:red;
    //     // margin-top: 0;

    //   }
    // }
    .indexLogo{
      position: absolute;
      width:9rem;
      height: 3rem;
      left:1rem;
      top:.5rem;
    }
    .activeOver{
      position: fixed;
      left:25%;
      top:30%;
      width:50%;
      height:10rem;
      background:rgba(255,255,255,1);
      color:#000;
      border-radius: 10px;
      line-height:10rem;
      text-align: center;
      font-size: 2rem;
      z-index: 999;
      animation: over .4s alternate;

    }
    .selGrade{
      .selected{
        height: 40px;
        line-height: 40px;
        width: 70%;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        margin: 25px auto 0;
        top:0;
        letter-spacing: 3px;
        // box-shadow: 0px 6px #653104;
        color: rgba(255,255,255,.9);
        letter-spacing: 3px;
        font-weight: 600;
        position: relative;
        /* so nobody selects the inside text on button */
        user-select: none;
        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all .1s ease;
       
        &:active{
          top:6px;
          box-shadow: 0px 0px #123456;
        }
        span{
          margin-left: 1rem;

        }
        input{
          position: absolute;
          height:100%;
          width:45%;
          top:0;
          left:48%;
          // background:#bf7016;
          border-style: none;
          background:none;  
          outline:none;  
          // border:0px;  
          // border-bottom: 1px solid rgba(255,255,255,.7);
          &:focus { outline: none; }   
           color: #fff;
        }
        ::-webkit-input-placeholder { color:rgba(255,255,255,.5);font-size: 18px }
::-moz-placeholder { color:rgba(255,255,255,.5);font-size: 18px } /* firefox 19+ */
:-ms-input-placeholder { color:rgba(255,255,255,.5);font-size: 18px } /* Internet Explorer 10+ */
:-moz-placeholder { color:rgba(255,255,255,.5);font-size: 18px } /* firefox 14-18 */
      }
       &>p{
          // float: right;
          // display: inline-block;
          width: 70%;
          margin:0 auto;
          color:rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          text-indent: 1rem;
          .remberme{
            width:1rem;
            height: 1rem;
             input[type=radio]:checked+label:before{
          content:'\2713';
          color:#fff;
          background-color: rgba(49, 185, 104, 0);
          font-size:16px;
          text-align: center;
          border-color: #fdfdfd;
        }
          }
        }
      .options{
        width: 242px;
        height: 242px;
        border-radius: 8px;
        position: fixed;
        left: 0;right: 0;top: 0;bottom: 0;
        margin: auto;
        z-index: 99;
        overflow: hidden;
        /*border: 1px solid gray;*/
        cursor: pointer;
        span{
          float: left;
          width: 80px;
          height: 80px;
          background-color: rgb(247, 243, 241);
          line-height: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: gray;
          &.active{
            background-color: #FF9800;
            color: #fff;
          }
          &:nth-child(1){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(2){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(3){border-bottom:1px solid gray;}
          &:nth-child(4){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(5){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(6){border-bottom:1px solid gray;}
          &:nth-child(7){border-right:1px solid gray;}
          &:nth-child(8){border-right:1px solid gray;}
          &:nth-child(9){}
        }

      }
      .options-enter-active {
        animation: showoptions .5s ;
      }
      .options-leave-active {
        animation: hideoptions .2s cubic-bezier(0,.5,1,.5);
      }
      @keyframes showoptions {
        0% {
          width: 142px;
          height: 142px;
        }
        30% {
          width: 272px;
          height: 272px;
        }
        60%{
          width: 242px;
          height: 242px;
        }
        80%{
          width: 252px;
          height: 252px;
        }
        100%{
          width: 242px;
          height: 242px;

        }
      }
      @keyframes hideoptions {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
    .wsinformation{
      width:70%;
      text-align: center;
      margin:20px auto;
      color:#fff;
      letter-spacing: 2px;
      font-size: 1.5rem;
      line-height: 1.8rem;
    }
    .buttonContainer{
      margin-top: 4rem;
      width: 100%;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      span{
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        // background: #bf7016;
        background: #3a74a6;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        top:0;
        box-shadow: 0px 6px  #3a74a6;
        color: #fff;
        font-weight: 600;
        position: relative;
        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 1.3s linear;
       
        &:active{
          top:6px;
          box-shadow: 0px 0px  #3a74a6;
        }

        animation:button-animation 1.3s infinite;
        animation-timing-function: linear;
        animation-direction:alternate;
        
        -webkit-animation:button-animation 1.3s infinite ; /*Safari and Chrome*/
        -webkit-animation-direction:alternate; /* Safari 和 Chrome */
        -webkit-animation-timing-function: linear; 
        &:nth-child(2){
          margin-top: 2rem;
          animation: none;
          height: 30px;
          line-height: 30px;
          box-shadow: none;
        }
      }

      @keyframes button-animation
      {
        0% {
          top:0;
          box-shadow: 0px 6px #131a36;
        }
        50% {
          top:6px;
          box-shadow: 0px 0px  #3a74a6;
        }
        100% {
          top:0;
          box-shadow: 0px 6px  #16336d;
        }
      }

      @-webkit-keyframes button-animation /*Safari and Chrome*/
      {
        0% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
        50% {
          top:6px;
          box-shadow: 0px 0px #123456;
        }
        100% {
          top:0;
          box-shadow: 0px 6px #653104;
        }
      }
    }
    .img{
      // position: absolute;
      // height:32%;
      width:80%;
     margin-left: 12%;
     margin-top:2rem;
     overflow:hidden;

      img{
       // height:100%;
       width:80%;
        display: inline-block;
        margin:0 auto;
        margin-left: 8%;
         // margin-top: 5rem;

      }
    }
    .top-padding{
      height: 5%;
    }
    .competitionInfo{
      height: 20%;
      color: white;
      position: relative;
      overflow: hidden;
      .infoText{
        position: absolute;
        left: 10%;
        top: 50px;
        width: 80%;
        text-align: center;
        line-height: 30px;
        letter-spacing: 3px;
        font-size: 17px;
        padding-bottom: .5rem;
        border-bottom:1px solid #fff;
      }
      .infoLogo{
        position: absolute;
        background: url('../../assets/images/logo.png') no-repeat;
        background-size: 100% 100%;
        width: 20%;
        height: 40px;
        top: 0;
        right: 40%;
      }
      .infoText-enter-active {
        animation: infoText-in .2s  cubic-bezier(.5,1,.5,1);
      }
      .infoLogo-enter-active {
        animation: infoLogo-in .4s  cubic-bezier(.5,1,.5,1);
      }
      /*文字进入动画*/
      @keyframes infoText-in {
        0%{
          left: -60%;
        }
        100%{
          left: 20%;
        }
      }
      /*图片进入*/
      @keyframes infoLogo-in {
        0%{
          right: -100px;
        }

        100%{
          right: 40%;
        }
      }
      @keyframes over{
        0%{
              top:-100%;
              opacity: 0;
              transform: scale(0)
        }
      
        100%{
            top:30%;
            opacity: 1;
            transform: scale(1)
        }
      }
      @keyframes topss{
          from{
            transform: rotate(0);
            -webkit-transform: rotate(0);
          }
          to{
            transform: rotate(3600deg);
            -webkit-transform: rotate(3600deg);
          }
      }
       @keyframes paihang{
          from{
            transform: scale(0);
            -webkit-transform: scale(0);
          }
          to{
            transform: scale(1);
            -webkit-transform: scale(1);
          }
      }

    }
  }
</style>
