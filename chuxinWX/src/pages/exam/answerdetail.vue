<template>
<div class="answerdetail">
  <header>
		<md-icon class='md-size-2x' @click.native="goback">reply</md-icon>
		<span >《{{this.$route.params.data.name}}》</span>
	</header>
  <div class="answerdetail-container">
    <div class="con">
      <div class="textQuestion" v-if="currentQuestion.formate_cls=='文本'">
          <h5>{{currentIndex+1}}、{{currentQuestion.name}}</h5>
          <p class ='image' v-if="currentQuestion.imgpath">
            <img :src="currentQuestion.imgpath" >
          </p>
          <div class="list">
            <p>我的答案：</p>
            <p>
              {{currentQuestion.textAnswer}}
            </p>
          </div>
         <!--  <div class="list">
            <p>老师点评: </p>
            <p>
            {{currentQuestion.comment?currentQuestion.comment:'老师暂未对你点评'}}
            </p>
          </div> -->
      </div>

      <div class="textQuestion records " v-else-if="currentQuestion.formate_cls=='录音'">
          <!-- <h5>{{currentIndex+1}}、{{currentQuestion.name}}</h5> -->
           <div class="text" v-for='(text,index) in currentQuestion.name' :index='index'  :class="{nowpage:index==selectItem}">
                        <!-- <span style='text-indent:.8em;display:inline-block'>{{currentIndex+1}}、</span> -->
                        <p>{{currentIndex+1}}、{{text}}</p>
            </div>
            <i class="iconfont" @click='backs' ref='backs'>&#xe7a5;</i>
                  <i class="iconfont" @click='nexts' ref='nexts'>&#xe798;</i>
          <p class ='image' v-if="currentQuestion.imgpath">
            <img :src="currentQuestion.imgpath" >
          </p>
          <div>
         <div class="answer">
             <p>我的录音：</p>
                <div is="Maudio" class="li"  v-for='(item,inde) in record' :href="item" :inde='inde'>


                </div>
              <!-- {{currentQuestion.textAnswer}} -->
            </div>
          </div>
         <!--  <div class="list">
            <p>老师点评: </p>
            <p>
            {{currentQuestion.comment?currentQuestion.comment:'老师暂未对你点评'}}
            </p>
          </div> -->
      </div>
          <!-- 图片提 -->
      <div class="textQuestion" v-else-if="currentQuestion.formate_cls=='图片'">
          <h5>{{currentIndex+1}}、{{currentQuestion.name}}</h5>
          <p class ='image' v-if="currentQuestion.imgpath">
            <img :src="currentQuestion.imgpath" >
          </p>
          <div class="picbox">
            <p>我的图片：</p>
          <div class="pictlist">
             
                <div is="Mypic" class="li" v-for='(items,index1) in picture' :pict='items' :piclist='picture'> 
                
                </div>
          </div>
          </div>
         <!--  <div class="list">
            <p>老师点评: </p>
            <p>
            {{currentQuestion.comment?currentQuestion.comment:'老师暂未对你点评'}}
            </p>
          </div> -->
      </div>



      <div class="choiceQuestion" v-else>
        <h5>{{currentIndex+1}}、{{currentQuestion.name}}</h5>
        <p class ='image' v-if="currentQuestion.imgpath">
          <img :src="currentQuestion.imgpath" >
        </p>
        <div class="options">
          <p v-for="(item,index) in currentQuestion.questionOption">{{ABC[index]}}、{{item.option}}</p>
        </div>
        <div class="rightOption">
          <p>正确答案</p>
          <p>{{resolvOption.rightOption}}</p>
        </div>
        <div class="selectedOption">
          <p>我的答案</p>
          <p>{{resolvOption.selectedOption}}</p>
        </div>
      <!--   <div class="analysis">
          <p>解析:</p>
          <p>
            {{currentQuestion.description?currentQuestion.description:'该题暂无解析'}}
          </p>
        </div> -->
      </div>

    </div>
    <div class="switch-nav">
      <p>
        <a href='javascript:void(0)' class="icon iconfont icon-xiangzuo zuo" @click="pre"></a>
      </p>
      <p>
        <span >{{currentIndex+1}}</span>/<span>{{allQuestions.length}}</span>
      </p>
      <p>
        <a href='javascript:void(0)' class="icon iconfont icon-xiangyou you" @click="next"></a>
      </p>
    </div>
  </div>
</div>


</template>

<script>


export default {

  data() {
  	return {
      allQuestions:'',
      currentQuestion:'',
      currentIndex:'',
      ABC:['A','B','C','D','E','F','G'],
      picture:[],
      record:[],
       selectItem:0,
    nameLength:'',
  	}
  },
  components:{
    'Maudio':{
      template:`
      <section>
                <section class="Audio">
                    <audio id="audioTag" :index='inde'>
                      <source :src='href' type="audio/mpeg" >
                    </audio>
                    <p class="play-pause" id="playPause">
                         <i class="icon-btn icon-play iconfont" @click="plays" v-show="showPlay" >&#xe64e;</i>
                          <i class="iconfont icon-btn icon-pause" @click="pauses" v-show="showPause" >&#xe672;</i>
                      </p>
                      <section class="controls">
                       &nbsp;&nbsp;&nbsp;<span class="played-time">0"</span>&nbsp;
                        <span class="audio-time" id="audioTime"></span>
                      </section>
                    <section class="pgs">
                        <div class="pgs-play" id="progress" style="width: 0%;">
                        </div>
                    </section>

                </section>
      </section>
      `,
      data(){
        return{
      showPlay:true,
      showPause:false,
      isplaying:false,
      recording:[],
      isPlay:false,
        }
      },
      props:['href','inde'],

      methods:{
      plays(){
      var audio=this.$el.children[0].children[0];
      console.log(this.$el)
      console.log(audio);   
      audio.play();
        this.showPause=true;
        this.showPlay=false;
      console.log($(this.$el).siblings('.li').find('#audioTag'))
      let au= $(this.$el).siblings('.li').find('#audioTag')
      console.log(au)
            for(let i=0;i<au.length;i++){
              console.log(au[i])
               au[i].pause();
               // if(au[i].pause()){}
              $(au[i]).siblings('p').find('.icon-pause').css('display','none')
              $(au[i]).siblings('p').find('.icon-play').css('display','block')
               au[i].currentTime = 0;
          }
    },
    //停止播放录音
    pauses(){
      var audio=this.$el.children[0].children[0]
      audio.pause();
        this.showPause=false;
        this.showPlay=true;
        audio.currentTime = 0;  
    },

      },
      computed:{
     
      },
    created(){
      console.log(this)
        var _this_=this;
     $(function(){
    //播放暂停控制
    console.log('jquery')
    var audio=$(_this_.$el).find('#audioTag').get(0)
    console.log(audio)
    console.log(_this_)
    $(_this_.$el).find("#playPause").click(function(){
        console.log(1111111111+_this_.$el.children[0])
        //监听音频播放时间并更新进度条
       audio.addEventListener('timeupdate',updateProgress,false);
        //监听播放完成事件
       audio.addEventListener('ended',audioEnded,false);

    })

    //读取视频长度,设置页面时长显示-loadedmetadata:指定视频/音频（audio/video）的元数据加载后触发
    //audio.duration 获取音频的时长，单位为秒
    // console.log(_this_.$el.children[0].children[0])
   
    // console.log(_this_)
        $(_this_.$el).find("#audioTag").on("loadedmetadata",function () {
            console.log(this);
            console.log(this.duration)
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                $(_this_.$el).find('#audioTime').text((transTime(this.duration))+'″')
              }else if (isAndroid) {
                $(_this_.$el).find('#audioTime').text((transTime(this.duration))+'″')
         }
    });
})
//转换音频时长显示
function transTime(time) {
    var duration = Math.round(time);
    return duration;
}
//更新进度条
function updateProgress() {
var audio =$(_this_.$el).find('#audioTag').get(0);
           var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
           console.log('这是ios还是android?'+isiOS+isAndroid)
           // $(_this_.$el).find('.played-time').html(transTime(audio.currentTime)+'″');
   if (isiOS) {
    // var audio =$(_this_.$el).find('#audioTag').get(0);
    var value= Math.round((Math.floor(audio.currentTime) / (Math.round(audio.duration))* 100), 0);
    // console.log(value)
    console.log(audio.currentTime)
     $(_this_.$el).find('.pgs-play').css('width', value * 1 + '%');
     $(_this_.$el).find('.played-time').html(transTime(audio.currentTime)+'″');
     }else if(isAndroid) {
      console.log(isAndroid)
      // var audio =$(_this_.$el).find('#audioTag').get(0);
    var value1 = Math.round((Math.floor(audio.currentTime)/ (Math.round(audio.duration))* 100), 0);
    // console.log(value)
    console.log(audio.currentTime)
     $(_this_.$el).find('.pgs-play').css('width', value1 * 1 + '%');
     $(_this_.$el).find('.played-time').html(transTime(audio.currentTime)+'″');
  }
}
//播放完成
function audioEnded(){
    var audio =$(_this_.$el).find('#audioTag').get(0);
    // console.log("111111111"+audio)
    audio.currentTime=0;
    audio.pause();
    console.log(_this_+11111)
    _this_.showPause=false;
    _this_.showPlay=true;
     }
   }, 
   watch:{
   },
   //图片答案组件
 },
 'Mypic':{
  template:`
    <div @click='preview'>
        <img :src="pict" alt="loading">
    </div>
  `,
  data(){
    return {
    }
  },
  props:['pict','piclist'],
  methods:{
     preview(index){
          console.log(event.target)
          var tar=event.target
          // var tar1=$(tar).child()
          // console.log(tar)
          console.log('当前预览图片的地址');
          var imgSrc= tar.getAttribute('src');
          console.log(this.piclist);
          console.log(imgSrc)
                WX.previewImage({
                   current: imgSrc, // 当前显示图片的http链接
                    urls: this.piclist // 需要预览的图片http链接列表
                })
        },
  },
  created(){
    this.config();
    // console.log(this.piclist)
  },
 },
},
  methods:{
     backs(){
     this.selectItem--;
     if(this.selectItem<0){
           this.selectItem=0;
     }
     // console.log(this.$refs.backs)

   },
   nexts(){
    // console.log('下一页')
    this.selectItem++;
    // console.log(this.nameLength)
    if(this.selectItem>this.nameLength-1){
       this.selectItem=this.nameLength-1;
    }
   },
    goback(){
      this.$router.go(-1)
    },
    pre(){
      if(this.currentIndex==0){
        return false
      }else{
        this.currentIndex--
        this.currentQuestion=this.allQuestions[this.currentIndex];
        if(this.currentQuestion.formate_cls=='录音'||this.currentQuestion.formate_cls=='图片'){
          this.getImg(this.currentQuestion.textAnswer)
        this.getUrl(this.currentQuestion.textAnswer)
        }  
      }
    },
    next(){
      // console.log(this.picture)
      if(this.currentIndex >= this.allQuestions.length-1){
        return false
        }else{
        console.log('obj');
        this.currentIndex++
        this.currentQuestion=this.allQuestions[this.currentIndex];
        if(this.currentQuestion.formate_cls=='录音'||this.currentQuestion.formate_cls=='图片'){
          this.getImg(this.currentQuestion.textAnswer)
          this.getUrl(this.currentQuestion.textAnswer)
        }
      }
    },
    getUrl(RecordId){
      var thiss=this;
      let items = []
      let itemList = RecordId.split(",")
      $http.axios.get(this.ip.filePath+"rest/download/links?ids="+RecordId)
      .then(function(res3){
          itemList.forEach(v => {
             v = thiss.ip.filePath1+res3.data[v].href
             items.push(v);  
              thiss.record=items; 
          })
      })
      .catch(err=>{
        console.log(err)
      })
      console.log("这是===" +items.toString())
      return items
    },
    getImg(imageId){
      let this_ = this;
      // console.log(this)
      // console.log(122132134)
      let items=[];
      let itemsList = imageId.split(',')
      $http.axios.get(this.ip.filePath+"rest/download/links?ids="+imageId)
      .then(function(res4){
        // console.log(res4)
        itemsList.forEach(v=>{
          v=this_.ip.filePath1+res4.data[v].href;
          items.push(v);
          // console.log(items)
          this_.picture=items;
          console.log(this_.picture)
        })
      })
      .catch(function(err){
        console.log(err)
      })
        console.log("这是===111111111111"+items.toString())
      return items
    },
  },
	computed: {
    resolvOption(){
      //正确的答案
      var result = {
        rightOption:'',
        selectedOption:'',
       
      };
      var temp={};
      for(var i=0;i<this.currentQuestion.questionOption.length;i++){
        temp[this.currentQuestion.questionOption[i].id]=this.ABC[i];
        if(this.currentQuestion.questionOption[i].flag){
          result.rightOption+=this.ABC[i];
        }
      
      }
      for(var j=0;j<this.currentQuestion.questionResult.length;j++){
        result.selectedOption+=temp[this.currentQuestion.questionResult[j]];
      }
      return result;
    },
    transform(){
       var srcs={ src:''};
       srcs.src=this.currentQuestion.textAnswer;
       console.log(srcs.src)
       return srcs;
    },
	}, 
  mounted(){
  },
  created(){

    this.allQuestions = this.$route.params.data.questions;
    console.log(this.allQuestions)
   
    this.allQuestions1 = this.$route.params.data.questions;
     console.log(this.allQuestions1)
    this.allQuestions1.forEach((v,index) =>{
      console.log(v)
        // if(v.formate_cls == "录音"){
        //   console.log('这是录音')
        //   this.allQuestions[index].textAnswer = this.getUrl(v.textAnswer)
        // }
        // else if(v.formate_cls == "图片"){
        //   console.log('这是图片')
        //   console.log(this.allQuestions[index].textAnswer)
        //   this.allQuestions[index].textAnswer = this.getImg(v.textAnswer)
        // }
    })
    
    
    this.currentIndex=this.$route.params.index;
    this.currentQuestion=this.allQuestions[this.currentIndex];
    this.nameLength=this.currentQuestion.name.length;
    console.log(this.nameLength)
    console.log(this.currentQuestion);
    if(this.currentQuestion.formate_cls=='录音'){
      this.getUrl(this.currentQuestion.textAnswer)
    }else if(this.currentQuestion.formate_cls=='图片'){
      this.getImg(this.currentQuestion.textAnswer)
    }
    
    


  },

}
</script>
<style lang='less' >
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
   
    body{height:100%;
      // padding-top:10rem;

    }
    .showPlay{
      display: none;
    }
.answerdetail{
  width: 100%;
	height: 100%;
  position: fixed;z-index: 99;
	header{
		width: 100%;
		height: 10%;
		display: -webkit-flex; /* Safari */
		display: flex;
		align-items:center;
		position: relative;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
		i{
			color:#35b4ca;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto;
		}
		span{
			display: block;
			width: 100%;
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			color: #514848;
		}
	}
  .answerdetail-container{
    width: 100%;
    height: 90%;
    background-color: #fff;
    .con{
      width: 100%;
      height: 90%;
      overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
      padding: 15px 15px 0 15px;
      .records{
          position: relative;
          height:41rem;
         
           .text{
            position: absolute;
            left:0;
            top:0;
            height:85%;
            width:100%;
            margin:0 auto;
            display: none;
            background: rgba(0,0,0,.005);
            p{
              font-size: 1.7rem;
              line-height: 2rem;
              color:#666;
              letter-spacing: 3px;
              text-indent: 2em;
              font-family: '微软雅黑';
              // font-weight: 200;

            }
  
          }
           .nowpage{
            display: block;
          }
          .list{
              width:100%;
              height:15%;
           
               border:1px solid #cceff5;
               background:#fafcfd;
               border-radius: 3px;
               position: absolute;
               top:110%;
               left:0;
               margin-bottom: 1rem;

          }
          .answer{
             width:100%;
              min-height: 8rem; 
           
               border:1px solid #cceff5;
               background:#fafcfd;
               border-radius: 3px;
               position: absolute;
               top:85%;
               left:0;
               margin-bottom: 1rem;
          }
          .iconfont{
              position: absolute;
              top:0rem;
              font-size: 3.5rem;
              height:85%;
              line-height: 34rem;
              width:30%;
              color:#ddd;
              z-index: 999;
              text-align: center;
              opacity: 0.3;
              &:nth-of-type(1){
                left:0%;
              }
              &:nth-of-type(2){
                right:0%;
              }
            }}
      p.image{
            padding: 0 2%;
            margin: 10px 0;
            img{
              width: 100%;
              height: auto;
              margin: 0 auto;
            }
          }
      .choiceQuestion{
        h5{
          font-size: 18px;
          min-height: 2rem;
          line-height: 2rem;
        }
        .options{
          border:1px solid #eee;
          border-radius: 3px;
          margin-top: 10px;
          padding:.5rem 0;
          p{
            margin-top: 5px;
            text-indent: 1em;
            font-size: 16px;
          }
        }
        .rightOption{
          border:1px solid #eee;
          border-radius: 3px;
          margin-top: 10px;
          padding:.5rem 0;
          p{
            text-indent: 1em;
            font-size: 16px;
            color: #27b0b3;
          }
        }
        .selectedOption{
          border:1px solid #eee;
          border-radius: 3px;
          margin-top: 10px;
          padding:.5rem 0;
          p{
            text-indent: 1em;
            font-size: 16px;
            
          }
        }
        .analysis{
          margin-top: 10px;
          p{
            font-size: 16px;
            &:last-child{
              margin-top:10px;
              border:1px solid gray;
              min-height: 3em;
              border:1px solid #cceff5;background:#fafcfd;
               border-radius: 3px;
            }
          }
        }
      }
      .textQuestion{
        h5{
          font-size: 18px;
          min-height: 2rem;
          line-height: 2rem;
        }
        .picbox{
           border:1px solid #cceff5;background:#fafcfd;
             .pictlist{
                width:90%;
                 display:flex;
                -moz-display:flex;
                -webkit-display:flex;
                // justify-content: space-between;
                flex-wrap: wrap;
                margin-left:2rem;
                margin-top: .1rem;
                  .li{
                  background:  #cceff5;
                  height: 11.5rem;
                  width:11.5rem;
                  margin: .2rem;
                  border:1px solid #ddd;
                  overflow:hidden;
                  img{
                    display: inline-block;
                   width:100%;
                   height:100%;
                  }
                  }

                }
          }
          .answer{
            margin-top: 1rem;
              min-height: 8rem;
              // border: 1px solid gray;
              padding: 4px 6px;
              border:1px solid #cceff5;background:#fafcfd;
               border-radius: 3px;

              .li{
                  background: #d9f4fe;
                  height: 2rem;
                  width:55%;
                  margin: 0 2rem;
                  border-radius: 3px;
                  position: relative;

                .Audio{
                    position: relative; 
                    height:80%;
                    width: 100%; 
                    margin: .5rem auto;
                        .play-pause{
                          margin:.5rem .45rem;
                          width:2rem;
                          height:2rem;
                          position:relative;
                          border-style: none;
                          background: #d9f4fe;
                        .icon-play{
                          position: absolute;
                          left:0;
                          top:.1rem;
                          width: 100%; 
                          height: 100%;
                          display: block; 
                          color: #11b7f5; 
                          line-height: 2rem;
                          font-size: 1.8rem;
                          opacity: 1;}
                        .icon-pause{
                          position: absolute;
                          left:0;
                          top:.1rem;
                          width: 100%;
                          height: 100%; 
                          display: block; 
                          color: #11b7f5;
                          line-height: 2rem;
                          font-size: 1.8rem;
                          opacity: 1;}
                        }
                        .controls{position: absolute;
                                  right:.2rem;
                                  top:0.15rem;
                                  width: 6rem; 
                                  height: 100%;
                                  padding: 0;
                                  text-align: center;
                                span{color: #b3b5b7; 
                                    font-size: 12px; 
                                    width: 34px;
                                    // display: inline-block;
                                  }
                           }
                        .pgs{
                          width: 45%; 
                          position: absolute;
                          top:0.92rem;
                          left:1rem;
                          background-color: #11b7f5;
                          height: 2px;
                          margin-left: 1.5rem;
                          overflow:hidden;
                        .pgs-play{ 
                          height: 2px; 
                          background-color: #fff; 
                          z-index: 1;
                  }
                }
             }
              
            
          }
          
        }
      }
    }
    .switch-nav{
      width: 100%;
      height: 10%;
      overflow: hidden;
      width: 100%;
      box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
      background-color: #fff;
    p{
      float: left;
      height: 5.6rem;
      text-align: center;
      line-height: 5.6rem;
      a{
        text-decoration: none;
        color: #35b4ca;
        font-size: 3.6rem;
      }
    }
    p:nth-child(1){
      width: 20%;

    } 
    p:nth-child(2){
      width: 60%;
      font-size: 1.7rem;
      span{
        color: #675b5b;
        font-weight: 500;
      }
      span:nth-child(1){
        color: #35b4ca;
      }
    } 
    p:nth-child(3){
      width: 20%;

    }
    }
  }
}

</style>
