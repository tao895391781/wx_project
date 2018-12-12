<template>
  <div class="bigboxB">
    <img src='../assets/images/top.png' alt="" class="shareimg" v-show='showimg'>
   
    <!-- <div v-show='showBoxA'> -->
    <div class="timer" v-show='bigbox' >
      <div>
        <i class="iconfont" :class="{color:color}">&#xe629;</i>
        <span :class="{color:color}">0</span>
        <span :class="{color:color}">0</span>
        <span :class="{color:color}">:</span>
        <span :class="{color:color}">{{(timecount<10?'0'+timecount:timecount)}}</span>
        <p class="checkQuestion">
          当前答对题数&nbsp;
          {{trueResult}}/{{totalquestion-1}}
        </p>
      </div>
    </div>
 <!-- <audio controls="controls" id='audios'>
      <source src="../../src/assets/music/1069.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio> -->
    <div class="trueAnswerBox" v-if='showRight'>
    <div class="trueAnswer" v-if='showRight'>
      <p v-show="!rightAnswerA">错误<br>
     <!--  <i></i>{{selected[currentIdex]['trueAnswer'].length>1?selected[currentIdex]['trueAnswer'].toString().replace(/,/g, ""):selected[currentIdex]['trueAnswer']}} -->
      </p>
     <p v-show="rightAnswerA">
       正确
     </p>
    </div>
    </div>
    <!-- </div> -->
    <!-- <div v-show='showBoxA'> -->
  <div class="bigboxA" v-show='bigbox'>
    
      <div class="qst-box" v-show="renderSuccess">
 
          <div class="padding-space">
              <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
              <!-- <p>《{{booknames}}》</p> -->
              <p>阅读闯关</p>
              <p><img src="../assets/images/katoon.png" alt=""></p>
          </div>

<!-- 单选 -->
  <section class="radio-question" v-if="question.type=='Radio'">
    <h5>
      <strong>{{currentIdex+1}}、</strong>{{question.content}}
      <span></span>
    </h5>
    <fieldset>
      <p v-for="(item,index) in question.optionList" >
        <input type="radio" :id="'radio'+item.id" name="radio" :value="item.id" v-model="selected[currentIdex]['answer']" :disabled="disClick">
        <label :for="'radio'+item.id" >
          &nbsp;&nbsp;{{aBC[index]}}、{{item.content}}
        </label>
      </p>
    </fieldset>
  </section>
<!-- 多选 -->
  <section class="checkbox-question" v-if="question.type=='MultiSelect'">
    <h5>
      <strong>{{currentIdex+1}}、</strong>&nbsp;{{question.content}}

    <span>(多选)</span>
    </h5>
    <fieldset>
      <p v-for="(Mitem,Mindex) in question.optionList" >
        <input type="checkbox" name="checkbox" :id="'checkbox'+Mitem.id" :value="Mitem.id" v-model="selected[currentIdex]['answer']" :disabled="disClick"> 
        <label :for="'checkbox'+Mitem.id">
          {{aBC[Mindex]}}、{{Mitem.content}}
        </label>
      </p>
    </fieldset>
  </section>
  <!-- <p class="questiontype">本题考查：{{question.kind}}</p> -->
   <p v-if="!isLast " class="submitA">
    <span type="button"  @click="subSelection" >下一题</span>
  </p>

  <p v-if="isLast " class="over">
    <span type="button"  @click="toResultPage" >结束闯关</span>
    <!-- <button @click='continueBook'>继续下一本</button> -->
  </p>
 <!--  <p v-if='isLast' class="complete">
    <img src="../assets/images/katoon.png" alt="">

  我已完成本次挑战!</p> -->
   <div class="advise">  
    <p v-for='(p,index) in advise' :index='index' v-if='index==indexA'>{{p}}</p>
  </div>
  <transition name="queryOK">
    <div class="queryOK" v-if="showQuery">
      <!-- <span @click="closeQuery">此手机号已答题，请更换</span> -->
      <!-- <span @click="toResultPage">查看已答结果</span> -->
    </div>
  </transition>
  <div class="grayBackground" v-if="showQuery">
  </div>
</div>
</div>
<section class="studentname" v-show='!bigbox'>
   <div id="ul">
   
    </div>
  <div class="top"> 
  </div>
   <div class="resultCon">
    <p class='headName'>您好,<span>
    {{postParams.nickname}}
  </span></p>
      <p>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
      </p>
      <h3>您当前答对题数<br><span>{{trueResult}}</span></h3>
      <h3>综合排名<br> <span>{{data.ranking}}</span>
      </h3>
    </div>
     <!-- <p class="pic">
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
        <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
        <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
        <i class="iconfont"> &#xe769;</i>
    </p> -->
    <div class="readstyle">
      <p>恭喜您，您累积答题正确数</p>
      <div>
     <p>{{data.total}}</p>
     <!-- <p>当前奖金池&nbsp;{{data.totalnum}}&nbsp;￥</p> -->
      </div>
    </div>
    <div class="seeData">
       <!-- <p></p> -->
      <p @click='sharecomment'>第1~{{sharetime}}名<br>点击分享领一元微信红包
     
    </p>
    
      
      <!-- <p @click='testDetail'>查看测试<br>详情</p>  -->
    </div>  
    <p @click='continueAsk' class="continueAsk"> 继续答题</p>
<!--   <p>学生姓名:<input type="text" v-model='postParams.name'></p> -->
  <!-- <p @click='toResultPage'>提交</p> -->
</section>
<!-- </section> -->
</div>
</template>


<script>

import { mapActions } from 'vuex'
import { bus } from '../bus.js'
import Vue from 'vue'


export default {
  props: ['question','classIds','codeId','booknames'],
  data() {
  	return {
      renderSuccess:true,
      rightOptions:'',
      aBC:['A','B','C','D','E','F'],
      phoneReg:/^1[3578]\d{9}$/,
      showQuery:false,
      // bigbox:true,
      postParams:{
        code:this.codeId,
        name:'',
        nickname:'',
        courseList:[],  
      },
        courseLists:{
        courseId:this.classIds,
        questionList:[],
      },
          selected:'',
          questionli:'',
          indexA:0,
          click:false,
          timecount:15,
          clearInter:'',
          timeout:false,
          timer:'',
          color:false,
          trueResult:0,
          showRight:false,
          rightAnswerA:false,
          showLast:false,
          data:{},
          showimg:false,
          title:'',
          flag:true,
          disClick:false,
          advise:['文升·百部名著分级阅读课程','文升·古文素养提升专项课程','文升·“跟孩子一起读诗”主题阅读活动','文升·寻访文学北京主题夏令营','更多精彩课程...尽在文升阅读'],
          sharetime:sessionStorage.getItem('sharetime'),

  	}
  },
  methods:{
    continueAsk(){
      this.$router.go(-1);
    },
     draw(o){
        var speed = 0;
        var ul = document.getElementById('ul')
        var startPosLeft=Math.ceil(Math.random()*document.documentElement.clientWidth);
        o.style.opacity=(Math.ceil(Math.random()*3)+7)/10;
        o.style.left=startPosLeft+'px';
        o.style.color='#fff';
        o.style.fontSize=40+Math.ceil(Math.random()*14)+'px';
        window.timer3=setInterval(function(){
          if(speed<document.documentElement.clientHeight*0.7){
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
      window.timer2=setInterval(function(){
          var div = document.getElementById('ul')
          var li =document.createElement('li');
          var colorArr=['#ea330f','#ea0f66','#fff','#bc0e54','#f7da1a','#fff','#7235f0','#f0359a','#35c3f0','#fff','#ff0']
          li.innerHTML='*';
          li.style.position='absolute';
          ul.appendChild(li);
          this_.draw(li)
          var liL=document.getElementsByTagName('li');
          for(var i = 0;i<liL.length;i++){
            li.style.color=colorArr[Math.floor(Math.random()*10)]
            if(i>15){
              ul.removeChild(liL[i-15]);
            }
          }
         
      },2000)
    },
      testDetail(){
      this.$router.push({name:'btestdetail'})
    },
     sharecomment(){
      this.showimg=!this.showimg;
          var title='"'+this.postParams.nickname+'"'+"完成了名著阅读答题闯关,累积答对了"+'"'+this.data.total+'"'+'题，你也来试试吧！'
          this.savetitle({
              title:title,
              self:this
              });
          console.log(title)
          this.config()
    },
      continueBook(){
      if(Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object Number]'||this.selected[this.indexA]['answer'].length>0 ||Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object String]'){
      console.log('继续下一本书');
      this.compareResult();
      this.courseLists.questionList=this.selected;//具体答案
      this.postParams.courseList.push(this.courseLists);//答案列表
      this.$router.push({name:'bselectbook',params:{classcode:this.codeId}})
      this.saveAnswers(this);//存到answerStore
      this.nextBook();
      
      }
       // }
      else{
          bus.$emit('tip', '请选择选项');
          // this.clicked=false;
          return false
      }
    },
      goback(){
        this.$router.go(-1);
      },
      subAnswer(){ 
        this.showLast=true;
        clearInterval(window.timer);
        if(Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object Number]'||this.selected[this.indexA]['answer'].length>0 ||Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object String]'){
          this.showRight=true;
          this.showRightAnswer();
          // this.bigbox=false;
          this.compareResult();
    }else{
       bus.$emit('tip', '请选择选项')
        return false;
    }
  },
    subSelection(){
      if(Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object Number]'||this.selected[this.indexA]['answer'].length>0){
      clearInterval(window.timer);
      this.showRight=true;
      this.compareAnswer();
      this.showRightAnswer();  

    }else {
      bus.$emit('tip', '请选择选项')
    }
    },
    toResultPage(){
    
      this.showLast=true;
      // clearInterval(window.timer);
      if(Object.prototype.toString.call(this.selected[this.indexA]['answer'])=='[object Number]'||this.selected[this.indexA]['answer'].length>0){
          this.showRight=true;
          // this.showRightAnswer();
          // this.compareResult();
          this.compareAnswer();
          this.showlast();
          this.courseLists.questionList=this.selected;//具体答案
          this.postParams.courseList.push(this.courseLists);//答案列表
          this.saveAnswers(this);
          //存到answerStore
          this.postParams.courseList=this.$store.state.answerStore;
          console.log(this.postParams) 
          // this.saveAnswers(this)
          //比较答案正确
          this.postParams.courseList.forEach(function(v,index){
          for(var i=0;i<v.questionList.length;i++){
            if(v.questionList[i].kind=='Radio'){
                if(v.questionList[i]['answer']==v.questionList[i]['right']){
                  console.log('单选答案正确');
                  Vue.set(v.questionList[i],'isRight',true);
              
                  }else{
                      Vue.set(v.questionList[i],'isRight',false);}
            }else if(v.questionList[i].kind=='MultiSelect'){
                if(v.questionList[i]['answer'].sort(function (a,b) {return a - b }).join(',')==v.questionList[i]['right']){
                      console.log('多选答案正确')
                      Vue.set(v.questionList[i],'isRight',true);
                      console.log(v.questionList[i])
              }else {
                   Vue.set(v.questionList[i],'isRight',false);
                }
              }
            }
        })
          
          let url = this.ip.RESTPATH+'rest/postReadingMatchQuestionResults';
          console.log('提交的数据')
          console.log(this.postParams)
          this.axios.post(url,this.postParams)
           .then(ress=>{
            console.log(ress)
            if(ress.data.flag){
                sessionStorage.setItem('flags',true)
                   //获取分数
              console.log('获取的分数结果')
              this.axios.get(this.ip.RESTPATH+'rest/getReadingMatchQuestionResults?code='+this.postParams.code+'&name='+this.postParams.name)
                .then(res=>{ 
                console.log(res)  
                this.data=res.data; 
          var title='"'+this.postParams.nickname+'"'+"完成了名著阅读答题闯关,累积答对了"+'"'+this.trueResult+'"'+'题，你也来试试吧！'
          this.savetitle({
              title:title,
              self:this
              });
          console.log(title)  
          this.config();
             
                  })
              }
            })
      }else {
          bus.$emit('tip', '请选择选项')
        }
    },
    closeQuery(){
      this.showQuery=false;
    },
    ...mapActions({
      getQData:'getQData',
      nextQuestion:'nextQuestion',
      postData:'postData',
      saveAnswers:'saveAnswers',
      nextBook:'nextBook',
      saveShowAsk:'saveShowAsk',
      timeCount:'timeCount',
      bigboxs:'bigboxs',
      savetitle: 'savetitle'
    }),
    compareResult(){
      console.log('判断答案')
      if(this.selected[this.indexA]['kind']=='Radio'){
         if(this.selected[this.indexA]['answer'].toString() == this.selected[this.indexA]['right']){
              console.log('单选答案正确')
              this.trueResult++;
              this.rightAnswerA=true;
      }else{
        console.log('单选答案错误')
        this.rightAnswerA=false;
       
        
      }
      }else {
          if(this.selected[this.indexA]['answer'].sort(function (a,b) {return a - b }).join(',')==this.selected[this.indexA]['right']){
              console.log('多选答案正确')
               this.trueResult++;
               this.rightAnswerA=true;
      }else{
        console.log('多选答案错误')
               this.rightAnswerA=false;
               
      }
    }
    },
    compareAnswer(){
       console.log('判断答案')
      if(this.selected[this.indexA]['kind']=='Radio'){
         if(this.selected[this.indexA]['answer'].toString() == this.selected[this.indexA]['right']){
              console.log('单选答案正确')    
              this.rightAnswerA=true;
      }else{
              this.rightAnswerA=false;
             
      }
      }else {

      if(this.selected[this.indexA]['answer'].sort(function (a,b) {return a - b }).join(',')==this.selected[this.indexA]['right']){
              console.log('多选答案正确')
               this.rightAnswerA=true;
      }else{
               this.rightAnswerA=false;
              
      }
       }
    },
    showRightAnswer(){
      var this_=this;
      window.timer1=setTimeout(function(){
      this_.compareResult();
      this_.nextQuestion();
       this_.showRight=false;
      this_.indexA++;  
      clearInterval(window.timer);
      this_.timecount=15;
      if(this_.showLast){
        this_.bigbox=false;
        this_.bigboxs(false);
       
        }
      },1000)
    },
    showlast(){
        var this_=this;
        window.timer4=setTimeout(function(){    
        this_.showRight=false;
        this_.compareResult();
        clearInterval(window.timer);
        if(this_.showLast){
        this_.bigbox=false;
        this_.bigboxs(false);
        
        }
      },1000)
    },
    setInter(){ 
      var this_=this;
      window.timer=setInterval(function(){
      this_.timecount--;
      if(this_.timecount<5 && this_.timecount>0){
        this_.color=true;
      }
      else{
        this_.color=false;
      }
      if(this_.timecount==0){
        //答案不为空
         if(Object.prototype.toString.call(this_.selected[this_.indexA]['answer'])=='[object Number]'||this_.selected[this_.indexA]['answer'].length>0){
          console.log(this_.selected)
          //最后一道题
          if(this_.$store.state.bquestionlist.length-this_.$store.state.currentIndex==2){
            clearInterval(window.timer);
            this_.disClick=true;
            this_.showRight=true;
            this_.showlast();
          }else{  
            clearInterval(window.timer);
            this_.showRight=true;
            this_.compareAnswer();
            this_.showRightAnswer();     
          }
          //答案为空
         }else{
         
          if(this_.selected[this_.indexA]['kind']=='Radio'){
              this_.selected[this_.indexA]['answer']=0;
          }else if(this_.selected[this_.indexA]['kind']=='MultiSelect'){
              this_.selected[this_.indexA]['answer'].push(0);
          } 
          console.log(this_.selected)
             if(this_.$store.state.bquestionlist.length-this_.$store.state.currentIndex==2){
              console.log('最后一题');
              clearInterval(window.timer);
              this_.showRight=true;
              this_.disClick=true; 
              this_.compareAnswer(); 
              this_.showlast();
             }else{
                  clearInterval(window.timer);
                  this_.showRight=true;
                  this_.compareAnswer();
                  this_.showRightAnswer();         
        }
    }
      console.log('关闭定s时器')
      clearInterval(window.timer);
    }
   },1000)  
    },

  },
destoryed(){
},
  beforeCreate(){

    console.log('之s前')
  },
  mounted(){
  },
 
  created(){
       
        this.postParams.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
        this.postParams.name=JSON.parse(sessionStorage.getItem('u'))['openid'];
        this.bigbox=this.$store.state.bigbox;
        //存下点击过来之后的书id
        let idArr=sessionStorage.getItem('courseId');
        sessionStorage.setItem('courseId',this.classIds+','+idArr)
        this.setInter();
        console.log('下本书哈哈哈哈哈哈哈')
        this.questionli=this.$store.state.bquestionlist;
        this.selected=this.$store.state.saveAnswer[0].questionList;
        
         


  },
  computed:{
    isLast(){
      return this.$store.state.bquestionlist.length-this.$store.state.currentIndex==2;
    },
    currentQuestion(){
      return this.$store.state.currentQuestion;
    },
    currentIdex(){
      return this.$store.state.currentIndex;
    },
    currentCourseId(){
      return this.$store.state.currentCourseId;
    },
    saveAnswer(){
      return this.$store.state.saveAnswer;
    },
    totalquestion(){
      return this.$store.state.bquestionlist.length;
    },
  },
 	updated:function(){
     this.renderSuccess=true;
     console.log('数据变化');
     console.log(this.rightAnswerA)
    
 	},
  watch: {
    currentQuestion(val){
      //切换到下一题就重新获取正确的选项，并且初始化已选选项和正确选项
      this.rightOptions="";
      console.log('重新获取的问题'); 
      console.log(val)
      this.showRight=false;
      console.log(this.$store.state.bquestionlist.length-this.$store.state.currentIndex)
      // if(this.$store.state.bquestionlist.length-this.$store.state.currentIndex==2){
          // console.log('最后一页')
      // }else{
        if(val.id){
         this.setInter();  
       }else{
        console.log('获取的分数')
       }
      // }
      // console.log(val);
      // if(this.$store.state.bquestionlist.length-this.$store.state.currentIndex!=1){
      //   //最后一题是填写信息，获取不到正确选项
      //   let optionList = val.optionList;
      //   for(var i=0;i<optionList.length;i++){
      //     if(optionList[i].score){
      //       this.rightOptions+=(i+1).toString();
      //     }
      //   }
      // }

    }
  }
}
</script>
<style lang='less'>
@font-face {font-family: 'iconfont';
    src: url('../../static/font/iconfont.eot');
    src: url('../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../static/font/iconfont.woff') format('woff'),
    url('../../static/font/iconfont.ttf') format('truetype'),
    url('../../static/font/iconfont.svg#iconfont') format('svg');
}
.color{
  color:red;
}
.fontSize{
  // font-size: 3.3rem;
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
    @keyframes tops{
      from{
        transform: translateY(1rem);
      }
      to{
         transform: translateY(0);
      }
    }
   
  .bigboxB{ 
  width: 100%;
  box-sizing: border-box;
  #audios{
    height: 0;
  }
  .shareimg{
      position: absolute;
      width: 25%;
      height: 25%;
      left: 80%;
      top: -4%;
      animation: tops 1s .5s infinite;
      // background: rgba(255,255,255,.5)
    }
  .trueAnswerBox{
    position: fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background: rgba(255,255,255,0);
    z-index: 998;
    .trueAnswer{
    position: absolute;
    width:16rem;
    height:10rem;
    // background: rgba(0,0,0,.3);
    border-radius: 10px;
    left:50%;
    top:35%;
    transform: translateX(-50%);
    z-index: 999;
    p{  
      border-radius: 8px;
      color:#FAFAFA;
      line-height: 10rem;
      text-align: center;
      font-size: 2.5rem;
      width:100%;
      height:100%; 
      color:#fff;
      position: relative;
      background:#a63a50;
      i{
        font-size: 1.7rem;
        position: absolute;
        top:5rem;
        left:5rem;
      }
      b{
        font-size: 1.4rem;
        position: absolute;
        left:5.6rem;
        top:3rem;
        display: inline-block;
      
      }
      &:nth-child(2){
        color:#fff;
        background: #54ad54;
        line-height: 10rem;
      }
    }


  }
  }
  
  .timer{
      width:100%;
    div{
      width:98%;
      height:3.2rem;
      margin:0 auto;
      background: rgb(54, 109, 157);
      // text-align: center;
      color:#fff;
      line-height: 3.2rem;
      font-size:2rem;
      border-radius: 3px;
      i{
        font-size:2.7rem; 
        float: left;
        margin:0 1rem 0 .5rem;
        
      }
      span{
        // margin:0 .2rem;
        display: inline-block;
        height: 100%;
        font-size: 3rem;
        &:nth-of-type(3){
          position: relative;
          bottom:.2rem;
          left: 0;
        } 
         
      }
      .checkQuestion{
        display: inline-block;
        height:100%;
        float: right;
        color:#fff;
        margin-right: 1rem;
        font-size: 1.8rem;

      }
    }
  }
}
    .studentname{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      .ul{
      position: fixed;
      width:100%;
      height:2rem;
      &>img{
        display: inline-block;
        position: absolute;
        left:0;
        top:0;
        width:2rem;
        height:2rem;
        background:red;
        z-index: -1;
        // margin-top: 0;

      }
    }
      .resultCon{
        // margin-top: 2rem;
        .headName{
          color:#fff;
          height:30px;
          font-size: 2rem;
          line-height: 30px;
          margin:1rem auto;
        }
        p{
          text-align: center;
          .iconfont{
            font-size: 30px;
            color:#fff;
            // &:first-child{
            //   color:;
            // }
            // &:nth-child(2){}
            // &:nth-child(3){}
            // &:nth-child(4){}
            // &:nth-child(5){}
          }
        }
        h3{
         // margin:0 auto;
          margin:1.3rem auto;
          text-align: center;
          font-size: 22px;
          color: #fff;
          letter-spacing: 2px;
          width:70%;
          &:nth-child(2){
            // text-indent: 4em
          }
          span{
            color:#F70869;
            font-size: 30px;
            margin-top: 1.3rem;
            display: inline-block;
          }
        }
    }
      .top{
        width:100%;
        height: 30px; 
        // display: flex;
        // justify-content: space-around;
        // margin-top: 1%;
     &>p{
      text-align: center;
      color:#fff;
      font-size: 18px;
      height:30px;
      line-height: 30px;
      // width:50%;
      margin: 0 auto;
      background: #3a74a6;
      text-align: center;
      text-indent: .5em;
      // border-radius:3px;
      letter-spacing: 3px;
      // float: left;
      &>.iconfont{
          float: left;
          font-size: 2.5rem;
      }
      // input{
      //   width:33%;
      //   height:100%;
      //   margin-left: 1rem;
      //   outline:none;  
      //   background: transparent;
      //   border-style: none;
      //   color:#fff;

      //   &:focus { outline: none; }   
      // }
       &:nth-child(1){
       text-align: center;
        // margin-top:10%;
        width:100%;
     }
     //  &:nth-child(2){  
     //    // margin-top:20%;  
     //    width:70%;
     // }
     //   &:nth-child(3){
     //    width:30%;
     //    margin-top:30%;
     //    text-align: center;
     // }
   }
     }
     .pic{
    text-align: center;
    font-size: 30px;
    color:#fff;
    margin-top: 1rem;
    .iconfont{
      font-size: 20px;
      color:#16d8bb;
    }
  }
    .readstyle{
      height:23%;
      width:85%;
      margin: 5rem auto 2rem;
      margin-top: .5rem;
      font-size: 22px;
      overflow:hidden;
      position: relative;
      border:1px solid rgba(218, 77, 77, 0.61);
      border-radius: 9px;
      letter-spacing: 2px;
      p{
        text-align: center;
       // line-height: 2.2rem;
        margin-top: 2rem;
        color: #fafcfd;
         text-shadow: 0 0 5px #CCCCCC,
          0 0 10px #CCCCCC, 0 0 15px #CCCCCC,
           0 0 20px #e42222, 0 0 25px #c02a1b,
            0 0 30px #ec0808, 0 0 50px #d45012,
             0 0 80px #d43e12, 0 0 100px #da1922, 
             0 0 150px #e20f0f;
      }
      div{
        height:70%;
        width: 100%;
        font-size: 35px;
        margin-top: 2rem;
        line-height: 40px;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        animation:mymove 1.5s forwards;
        -webkit-animation:mymove 1.5s forwards; /* Safari 和 Chrome */
        p{
          font-size: 4rem;
          &:nth-child(2){
            margin-top: 3rem;
            font-size: 22px;
            text-align: center;
            color:#fff;
          }
        }

      }
    }
    .seeData{
      width:100%;
      // height:25%;
     
      p{
        color:#fff;
        font-size: 16px;
        height:50px;
        line-height: 24px;
        width: 22rem;
        margin:0 auto;
        // padding:0 1rem;
        text-align: center;
        background:#ce2d37;
        color:#fff;
        letter-spacing: 2px;
        border-radius: 6px;
        position: relative;
         animation: share 1.5s infinite;
        -webkit-animation: share 1.5s infinite;
      // &:last-child{
      //   height:25px;
      //   width:60%;
      //   background:#bd4b5d;
      //   margin:2rem auto 3rem;
      //   // animation: share 2s infinite;
      //   // -webkit-animation: share 2s infinite;
      // }

      }
    }
    .continueAsk{
          padding: 1rem 3rem;
          margin:3rem auto;
          width:50%;
          background: red;
          text-align: center;
          border-radius: 5px;
          color:#fff;
          background:#ce2d37;
          letter-spacing: 3px;
          font-size: 1.8rem;

    }
    }  
    .bigboxA{
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
   
.qst-box{
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
   .questiontype{
    // margin-top: 8rem;
      text-align: left;
      height:30px;
      width:50%;
      white-space:nowrap; 
      line-height: 30px;
      background:#3a74a6;
      color:#fff;
      position: relative;
      margin-top: 2rem;
      // border:1px solid #fff;
      &::after{
        content:'';
        width:0;
        height:0;
        position: absolute;
        top:0;
        left:100%;
        width:0;
        height:0;
        border-width:15px 0 15px 15px;
        border-style:solid;
        border-color:transparent transparent transparent #3a74a6;/*透明 透明 透明 灰*/
        // margin:40px auto;
        position:absolute;
        // background: #3a74a6;
        // background:#fff;
    }
  }
  .submitA{
    // margin-top: 4rem;
    // position: absolute;
    // bottom:8rem;
    margin-top: 2.5rem;
  }
  .advise{
    position: relative;
    width:100%;
    height:2.5rem;
    margin-top: 3.5rem;
    p{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      color:#fff;
      font-size: 1.5rem;
      line-height: 2.5rem;
      text-align: center;
      letter-spacing: 2px;
      
    }
  }
  .over{
    margin-top: 4rem;
  }
  .complete{
    img{
      width:6rem;
    }
    margin-top: 2rem;
    height:60px;
    line-height: 60px;
    color:#fff;
    letter-spacing: 2px;
  }
  // .goback{
  //   .iconfont{
  //     height:30px;
  //     font-size: 25px;
  //     line-height: 30px;
  //     margin-right: 85%;
  //     margin-top: 5px;
  //     color:#fff;
  //   }
  // }
  .padding-space{
    width: 100%;
    height:4.3rem;
    // display: flex;
    // justify-content: space-around;
    p{
      float: left;
      // padding:1rem .5rem;
      // width:20%;
      height: 33px;
      line-height: 33px;
      // margin: 3%;
      margin-top: 1rem;
      margin-left: 3%;
      text-align: center;
      border-radius: 5px;
      color:#fff;
      background:#366d9d;
      &:first-child{
        width:20%;
        text-align: center;
        margin-left: .5rem;
    .iconfont{
      height:30px;
      font-size: 25px;
      line-height: 30px;
      margin-top: 5px;
      color:#fff;
      text-align: center;
    
  }
      }
      &:nth-child(2){
      padding:0 1rem;
      width:40%;

    }
    &:nth-child(3){
       padding:0 1rem;
     
    }
     &:nth-child(3){
      position: relative;
      bottom:.5rem;
      left:1rem;
      background:transparent;
      img{
      width:50px;
    }
  }
    
 }
  }
  &>section{
    width: 98%;
    // min-height: 40%;
    margin: 0 auto;
    margin-top: 1rem;
    h5{
      width: 100%;
      min-height: 30px;
      // line-height: 30px;
      font-size: 2.2rem;
      line-height: 2.5rem;
      // margin-bottom: 1rem;
      color: rgb(226, 225, 225);
    }
    fieldset{
      width: 100%;
      height: auto;
      padding-top: 1rem;
      overflow: hidden;
      border: none;
      p{
        width: 100%;
        min-height: 2rem;
        margin: 1.2rem 0;
        line-height: 2.5rem;
        overflow: hidden;
        color: rgb(226, 225, 225);
        input{
          font-size: 1.5rem;
          float: left;
          width: 5%;
          display: none;
          opacity:0;-webkit-appearance:none;
        }
        label{
          font-size: 2rem;
          float: left;
          width: 100%;
          margin-left: 3%;
          padding-left: 10%;
          padding-right: 5%;
          position: relative;
          line-height: 2em;
        }
        input+label:before{
          display: inline-block;
          width: 28px;
          height: 28px;
          line-height: 28px;
          margin-right: 8px;
          content: '';
          color: #fff;
          border: 1px solid #dce4e6;
          border-radius: 3px;
          position: absolute;
          top: .5rem;
          left: 0;
        }
        input[type=radio]+label:before {
            border-radius: 50%;
        }
        input[type=checkbox]+label:before {
            border-radius: 3px;
        }
        input[type=checkbox]:checked+label:before,
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
    &.contactInfo{
      overflow: hidden;

      p{
        width: 80%;
        height:33px;
        line-height: 30px;
        margin: 0 auto;
        text-indent: .5em;
        // border-bottom: 1px solid gray;  
        position: relative; 
        background:#366c9d;
        color:#fff;
        border-radius: 5px;
        font-size: 16px;
        // &:first-child{margin-top: 6rem;}
        // &:last-child{margin-top: 3rem;}
        input{
          border: none;
          display: block;
          background: none;
          width: 58%;
          height: 100%;
          color:rgb(226, 225, 225);
          font-size: 17px;
          position: absolute;
          right:1rem;
          bottom:.1rem;
          color:#fff;
          /*-webkit-appearance:none;*/
          border-style: none;
          &:focus{
            color:FFF;
            outline: none;
          }
        }
      }
    }

  }
  &>p{
    width: 100%;
    text-align: center;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    justify-content: center;
    span,button{
      height: 40px;
      line-height: 40px;
      width: 70%;
      text-align: center;
      background: #bf7016;
      font-size: 19px;
      font-weight: 500;
      margin: 0 1.5%;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
      // box-shadow: 0px 5px #653104;
      box-shadow: 0px 6px  #16336d;
      background: #3a74a6;
      color: #fff;
      font-weight: 600;

      /* so nobody selects the inside text on button */
      user-select: none;

      /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
      transition: all 0.1s ease;
      &:active{
        top:5px;
        box-shadow: 0px 0px #123456;
      }
    }
    button{
      border-style: none;
    }
  }
  .queryOK{
    width: 240px;
    height: 110px;
    position: fixed;
    left: 0;right: 0;top: 0;bottom: 0;margin: auto;
    z-index: 99;
    font-size: 18px;
    cursor: pointer;
    span{
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      background: #bf7016;

      font-weight: 500;
      cursor: pointer;
      border-radius: 10px;
      top:0;
      box-shadow: 0px 6px #653104;
      color: #653104;
      font-weight: 600;
      position: relative;
      /* so nobody selects the inside text on button */
      user-select: none;
      transition: top .1s ease;
      &:active{
        top:6px;
        box-shadow: 0px 0px #123456;
      }
      &:last-child{
        margin-top:20px;
      }
    }
  }
  .queryOK-enter-active {
    animation: query-in .5s ;
    -webkit-animation: query-in .5s ;
  }
  .options-leave-active{
    animation: query-out .2s cubic-bezier(0,.5,1,.5);
    -webkit-animation: query-out .2s cubic-bezier(0,.5,1,.5);
  }
  @keyframes query-in {
    0% {
      width: 180px;
      font-size: 12px;
    }
    30%{
      width: 240px;
      font-size: 18px;
    }
    50%{
      width: 200px;
      font-size: 16px;
    }
    60%{
      width: 240px;
      font-size: 18px;
    }
    100% {
      width: 240px;
      font-size: 18px;
    }
  }
  @keyframes query-out{
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes share{
    from{
      transform:scale(.8);
      // -webkit-transform:scale(.8);
      opacity: .5;
    }
    to{
      transform:scale(1);
      -webkit-transform:scale(1);
      opacity: 1;
    }
  }
  .grayBackground{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;left: 0;
    background-color: rgba(10, 10, 10, 0.89);
    z-index: 9;
  }
}
}

</style>
