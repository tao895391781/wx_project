<template>
<div class="exam">
  <div class="subBox" v-show='trueSub'>
  <div class="sureSunmit" v-show='trueSub'>
    <p>是否提交答案?</p>
    <ul>
      <li><button @click='trueSub=false'>取消</button></li>
      <li><button @click='goresult'>提交</button></li>
    </ul>
  </div>
</div>
	<div class="doexam">
		<div class="dec">
			{{getbook.description}}
			<div class="progress" >
				<div :style="{'left':progresWidth+'%'}"></div>
			</div>
		</div>
		<div id="form-box" v-if="selected">    
      <div class="noqst" v-show='noqst'>
        暂无题目上传^_^
      </div>
			<div class="qst-box" v-for="(item,questionindex) in questionlist" :indexs='questionindex'>
        <!--  <div class="preTest">预习打卡<br>
      <span>{{questionlist.length}}—{{questionindex+1}}</span>
        </div> -->
        <!--  <div class="writingItem" v-if='writingshow'>
               <div class="writing">   
                      <p>写作任务</p>
                </div>
          </div> -->
        <!-- 课前预习 -->
          <!-- <div class="selectedItem" v-if='prepareShow'> -->
            <div class="radio-question" v-if="item.formate_cls=='单选'">
              <h5>
                 {{questionindex+1}}、{{item.name}}(单选)
              </h5>
               <p v-if="item.imgpath">
                <img :src="item.imgpath" >
               </p>
              <fieldset>
                 <p v-for="(qst,index) in item.questionOption">
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id" :value = "qst.id" v-model="selected[questionindex]['answer']">
                    <label :for="'radio'+qst.id">
                 {{ABC[index]}}、{{qst.option}}
                    </label>
                 </p>
              </fieldset>
            </div>
            <div class="checkbox-question" v-if="item.formate_cls=='多选'">
                    <h5>
                      {{questionindex+1}}、{{item.name}}(多选)
                    </h5>
                    <p v-if="item.imgpath">
                      <img :src="item.imgpath" >
                    </p>
                    <fieldset>
                        <p v-for="(qst,index) in item.questionOption">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value = "qst.id" v-model="selected[questionindex]['answer']">
                        <label :for="'checkbox'+qst.id">
                         {{ABC[index]}}、{{qst.option}}
                        </label>
                        </p>
                    </fieldset>
            </div>
          <!-- </div> -->
          <!-- 朗读 -->
          <!-- <div class="readingItem" v-if='readingShow'> -->
                <div class='audio-question records' v-if="item.formate_cls=='录音'"  >
                 
                  <div class="text" v-for='(text,index) in item.name' :index='index' v-show='showText' :class="{nowpage:index==selectItem}">
                        <h5 style='text-indent:.8em'>{{questionindex+1}}、</h5>
                        <p>{{text}}</p>
                  </div>
                  <i class="iconfont" @click='back' ref='backs'>&#xe7a5;</i>
                  <i class="iconfont" @click='next' ref='nexts'>&#xe798;</i>
                  <div class="answer" :index="questionindex">
                       <Myul class="ul">
                       </Myul>     
                  </div>
                </div>
          <!-- </div> -->
          <!-- 课后思考 -->
          <!-- <div class="ImgItem" v-if='imgItemShow'> -->
            <div class="uploadpic" v-if="item.formate_cls=='图片'">
              <div>
              <h5>{{questionindex+1}}、{{item.name}}</h5>   
              </div>
              <div class="answer" :index="questionindex">
                  <div is='Mypic' class="uppic">
              </div>     
              </div>
            </div>
          <!-- </div> -->
<!-- 整书测试 -->
           <!-- <div class="selectedItem" v-if='totalShow'> -->
          <!--   <div class="radio-question" v-if="item.formate_cls=='单选'">
              <h5>
                 {{questionindex+1}}、{{item.name}}
              </h5>
               <p v-if="item.imgpath">
                <img :src="item.imgpath" >
               </p>
              <fieldset>
                 <p v-for="(qst,index) in item.questionOption">
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id" :value = "qst.id" v-model="selected[questionindex]['answer']">
                    <label :for="'radio'+qst.id">
                 {{ABC[index]}}、{{qst.option}}
                    </label>
                 </p>
              </fieldset>
            </div>
            <div class="checkbox-question" v-if="item.formate_cls=='多选'">
                    <h5>
                      {{questionindex+1}}、{{item.name}}
                    </h5>
                    <p v-if="item.imgpath">
                      <img :src="item.imgpath" >
                    </p>
                    <fieldset>
                        <p v-for="(qst,index) in item.questionOption">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value = "qst.id" v-model="selected[questionindex]['answer']">
                        <label :for="'checkbox'+qst.id">
                         {{ABC[index]}}、{{qst.option}}
                        </label>
                        </p>
                    </fieldset>
            </div> -->
          <!-- </div> -->       
			  <div class="thinking-question" v-if="item.formate_cls=='文本'">
			    <fieldset>
			      <h5>{{questionindex+1}}、{{item.name}}</h5>
			      <p v-if="item.imgpath">
			    	<img :src="item.imgpath" >
				  </p>
			      <textarea v-model="selected[questionindex]['answer']" >
			      </textarea>
			    </fieldset>
			  </div>
			</div>
       <p>
        <md-button class="md-raised" @click='showTrue' v-if='!noqst'>提交</md-button>
       </p>   
			<div class="space-conent" ></div>
		</div>
	</div>
</div>
</template>
<script>
import $ from 'jquery'

import { bus } from '../../bus.js';
var recordTimer,upserverId,voiceId,timer,START,END,voicetime;
export default {
  data() {
  	return {
		selected:[],
		progresWidth:-100,
		ABC:['A','B','C','D','E','F'],
		clicked:false,
    Questionlist:'',
    questionlists:'',
    num:0,
    showText:true,
    selectItem:0,
    nameLength:'',
    noqst:false,
    trueSub:false,
  	}
  },
  //audio数据组件
  components:{
    'Myul':{
      template:`
      <div>
          <Myaudio v-for='(item,index) in items' :Src='item' :key='item.id' :index='index' class='li' :data='items':data1='lists'></Myaudio>
        <button @click="showRe" class="startAsk" >录音答题</button>
        <div class="startRecord" v-show='showRecord'>
            <i class="iconfont" @click='closeRecord'>&#xe633;</i>
          <p class="text-time startVoice" v-show="showclick">{{recordText}}</p>
          <div class="text-time " v-show="showrecording"> 
           <div class='left'>
           <p class="voiceJump"  v-for='v in p'></p>
           </div> 
            &nbsp;&nbsp;&nbsp;
          {{countTime}}'/60' 
          &nbsp;&nbsp;&nbsp;
          <div class='right'>
              <p class="voiceJump" v-for='v in p' ></p>
          </div> 
          </div>
            <div class="clickRecord common" v-show='showclick' @click="startRecord"><div></div></div>
              <div class="recording common" v-show='showrecording' @click="stopRecord"><div></div></div>
          <div class="sendRecord" v-show='showSend'>  
          </div> 
       
      </div>
      </div>
      `,
      data(){
        return {
              showRecord:false,
              showclick:true,
              showrecording:false,
              showpause:false,
              showimg:true,
              showdiv:false,
              recordText:'点击录音',
              showSend:true,
              play:false,
              pause:true,
              countTime:0,
              id:null,
              index:-1,
              items:[],
              lists:[],
              noclick:false,
              p:[1,1,1,1,1,1,1,1],
        }
      },
      props:["indexs"],
      //audio组件
      components:{
      'Myaudio':{
        template:`
         <div>
           <i class='iconfont del' @click='deletes()' v-show='index==this.datas.length-1' :index='index'>&#xe633;</i>
                <div class="Audio">
                    <audio id="audioTag" >
                      <source :src='Src' type="audio/mpeg" preload>
                    </audio>
                    <p class="play-pause" id="playPause">
                         <i class="icon-btn icon-play iconfont" @click="play" v-if="showPlay">&#xe64e;</i>
                         <i class="iconfont icon-btn icon-pause" @click="pause" v-if="showPause">&#xe672;</i>
                      </p>
                      <div class="controls">
                       &nbsp;&nbsp; <span class="played-time">0"</span>&nbsp;
                        <span class="audio-time" id="audioTime"></span>
                      </div>
                    <div class="pgs">
                        <div class="pgs-play" id="progress" style="width: 0%;"></div>
                    </div>
                </div>
              </div>
  `,
  data(){
    return {
      showPlay:true,
      showPause:false,
      isplaying:false,
      datas:this.data,
      data1s:this.data1,
      noshow:true,

    }
  },
  props:['Src','data','data1','index'],
  methods:{
    // 删除录音
    deletes(){
        var Index=$(this.$el).parent().parent().attr('index')
        console.log(Index)
        var indexs=this.$el.getAttribute('index');
        console.log($(this.$el).parent())
        console.log(indexs)
        // console.log(this.$parent.items)
        this.datas.splice(indexs,1);
        console.log(this.datas)
        this.data1s.splice(indexs,1) ;
        console.log(this.data1s)
        this.selected=this.$store.state.rightResult;
        this.selected[Index]['answer']=this.data1s;
        console.log('删除之后的答案列表')
        console.log(this.selected[Index]['answer'])
},
// 播放录音
    play(){
      var audio=this.$el.children[1].children[0];
      console.log(this)
      console.log(audio);  
      this.showPause=true;
      this.showPlay=false;
      // if(!this.isplaying){
      audio.play();
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
      this.isplaying=true;
      // } 
    },
    //停止播放录音
    pause(){
      var audio=this.$el.children[1].children[0]
      this.showPause=false;
      this.showPlay=true;
      // if(this.isplaying){
        audio.pause();
        audio.currentTime = 0; 
       this.isplaying=false;
      // }    
    },
  },
  computed:{
    isLastRecord(){
      return this.datas.length;
    },
  },
  watch:{
   
  },
  updated(){
    // console.log('数据更新之后')
    // console.log(this.$el.children[1].children[0])
    //  var audio=$(this.$el).find('#audioTag').get(0)
    //  console.log(audio)
    //  var thiss=this;
  },
  created(){
    // console.log(datas)
    // console.log(data1s)
    console.log(this)
    var _this_=this;
     $(function(){
    //播放暂停控制
    var audio=$(_this_.$el).find('#audioTag').get(0)
    console.log(_this_)
    $(_this_.$el).find("#playPause").click(function(){
        console.log(_this_.$el.children[0])
        //监听音频播放时间并更新进度条
       audio.addEventListener('timeupdate',updateProgress,false);
        //监听播放完成事件
       audio.addEventListener('ended',audioEnded,false);

    })
    //读取音频长度,设置页面时长显示-loadedmetadata:指定视频/音频（audio/video）的元数据加载后触发
        $(_this_.$el).find("#audioTag").on("loadedmetadata",function () {
            console.log(_this_);
            console.log(this);
            console.log(this.duration);
           var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                console.log(this.duration);
          $(_this_.$el).find('#audioTime').text((transTime(this.duration))+'″')
     }else if(isAndroid) {
      console.log(this.duration)
        $(_this_.$el).find('.played-time').text('0'+'″');
      // if(this.duration>64){
    // $(_this_.$el).find('#audioTime').text(Math.round(transTime(this.duration))+'″')
  // }else{
     // $(_this_.$el).find('#audioTime').text(Math.round((transTime(this.duration))/2)+'″')
  }
  // } 
    });
})
//转换音频时长显示
function transTime(time) {
    var duration = Math.floor(time);
    return duration;
}
//更新进度条
function updateProgress(){
   var u = navigator.userAgent;
   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
 console.log('这是ios还是android?'+isiOS+isAndroid)
 //ios终端
   if (isiOS) {
    var audio =$(_this_.$el).find('#audioTag').get(0);
    console.log(audio.currentTime)
    console.log(audio.duration)
    var value = Math.round((Math.floor(audio.currentTime) / (Math.round(audio.duration))* 100), 0);
    // console.log(value)
    console.log(audio.currentTime)
     $(_this_.$el).find('.pgs-play').css('width', value * 1 + '%');
     $(_this_.$el).find('.played-time').html(transTime(audio.currentTime)+'″');
  //android终端
     }else if (isAndroid) {
      var audio =$(_this_.$el).find('#audioTag').get(0);
    var value = Math.round((Math.floor(audio.currentTime) / (Math.round(audio.duration)/2)* 100), 0);
    console.log(value)
    console.log(audio.currentTime)
     $(_this_.$el).find('.pgs-play').css('width', value * 1 + '%');
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
}
  },

      methods:{
        //显示录音div
        showRe(){
          this.showRecord=true;
          $('#navbar').hide(); 
           console.log(this.$el.parentNode)
        },
        //关闭录音div
        closeRecord(){       
      clearInterval(timer);
      clearTimeout(recordTimer);
      this.countTime=0; 
      this.showRecord=false;
      this.showclick=true;
      this.showrecording=false;
      $('#navbar').show();
      WX.stopRecord({
        success:function(){
          console.log('取消录音');
          // alert('取消录音');
        }

      })
    },
    //开始录音
      startRecord(e){
        // alert(this.items.length)
        if(this.items.length>8){
        bus.$emit('tip','录音已达上限^_^')
        // this.noclick=true;
        }else{
        //录音效果
            voicetime=setInterval(function(){
               var h1=(Math.random()*.8)+'rem';
               // var h2=(Math.random()*.8)+'rem';
               var h2=(Math.random()*.5)+'rem';
              $('.startRecord').find('.left').find('.voiceJump:even').css('height',h1);
              $('.startRecord').find('.left').find('.voiceJump:odd').css('height',h2);
              $('.startRecord').find('.right').find('.voiceJump:even').css('height',h1);
              $('.startRecord').find('.right').find('.voiceJump:odd').css('height',h2);
           },100)

        // console.log(this)
        e.preventDefault();
        this.showrecording=true;
        this.showclick=false;
        let _this=this; 
        //点击录音 
        START=new Date().getTime();
        recordTimer=setTimeout(function(){
           WX.startRecord({
            success:function(){
               var i=0; 
               timer=setInterval(function(){ 
               i++;
              _this.countTime=i;
              if(i>=57){
              clearInterval(timer);
              clearInterval(voicetime)
              //录音到60s清除计时器
              //录音到60s停止录音
              _this.countTime=0; 
               _this.showclick=true;
              _this.showrecording=false;
             WX.stopRecord({
            success:function(res){  
             bus.$emit('loading')
             console.log(this);
              console.log("停止录音"+res)
                voiceId = res.localId;
                //上传语音接口
                 WX.uploadVoice({
                  localId: voiceId, // 需要上传的音频的本地ID，由stopRecord接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res1) {
                      // alert("上传录音::::::::"+res1);     
                      upserverId = res1.serverId; // 返回音频的服务器端ID
                      $http.post('postVoiceByVoiceId',{
                        serviceId:upserverId
                      })
                      .then(function(res2){
                        var RecordId=res2.data.voiceId.attachments[0].uuid;
                        //获取录音音频地址
                        if(RecordId){
                          // alert('开始请求获取音频地址');
                        _this.axios.get(_this.ip.filePath+"rest/download/links?ids="+RecordId)
                      .then(function(res3){
                        bus.$emit('closeloading');
                        var audioHref=_this.ip.filePath1+res3.data[RecordId]['href'];
                        _this.items.push(audioHref);
                        _this.lists.push(RecordId);
                        var index=_this.$el.parentNode.getAttribute('index');
                        _this.selected=_this.$store.state.rightResult;
                        _this.selected[index]['answer']=_this.lists;
                        console.log(_this.selected[index]['answer']);
                        _this.showRecord=false;
                        _this.showclick=true;
                        _this.showrecording=false;
                        $('#navbar').show();
         
                      })
                      .catch(err=>{
                        console.log(err)
                        alert(err)
                      });
                }
                      })
                      .catch(err=>{
                        console.log(err)
                  });
              }
          });
        },
            fail:function(res){
              alert(JSON.stringify(res));
            }
          });       
          }
        },1000)   
              localStorage.rainAllowRecord = 'true';

        },
            cancle:function(){
              alert('用户拒绝录音授权');
        }
          });   
        }
          ,300)
        }   
    
      }, 
      //停止录音
      stopRecord(e){
        // alert(1)
        e.preventDefault();     
        // END=new Date().getTime(); 
        clearInterval(timer);
         clearInterval(voicetime)
        this.showclick=true;
        this.showrecording=false;
        this.countTime=0;
        let that=this;
        END=new Date().getTime();
        if((END-START)<1000){
          END=0;
          START=0;
          clearTimeout(recordTimer);
        }else{
           WX.stopRecord({
            success:function(res){
              bus.$emit('loading');
              console.log("停止录音"+res)
                voiceId = res.localId;
                //上传语音接口
                 WX.uploadVoice({
                  localId: voiceId, // 需要上传的音频的本地ID，由stopRecord接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res1) {

                      // alert("上传录音::::::::"+res1);     
                      upserverId = res1.serverId; // 返回音频的服务器端ID
                      $http.post('postVoiceByVoiceId',{
                        serviceId:upserverId
                      })
                      .then(function(res2){
                        var RecordId=res2.data.voiceId.attachments[0].uuid;
                        //获取录音音频地址
                        if(RecordId){
                          // alert('开始请求获取音频地址');
                        that.axios.get(that.ip.filePath+"rest/download/links?ids="+RecordId)
                      .then(function(res3){
                         bus.$emit('closeloading');
                        var audioHref=that.ip.filePath1+res3.data[RecordId]['href'];
                        that.lists.push(RecordId);
                        // let audios= [];
                        // audios.push(audioHref);
                        that.items.push(audioHref); 
                        var index=that.$el.parentNode.getAttribute('index');
                        that.selected=that.$store.state.rightResult;
                        // that.selected[index]['answer']=that.items;
                         that.selected[index]['answer']=that.lists;
                        // alert(that.selected[index]['answer'])
                        console.log(that.selected[index]['answer'])
                        that.showRecord=false;
                        that.showclick=true;
                        that.showrecording=false;
                        $('#navbar').show();
                        // alert(that.items)

                      })
                      .catch(err=>{
                        console.log(err)
                        // alert(err)
                      });
                }
                      })
                .catch(err=>{
                        console.log(err)
                  });
              }
          });
        },
            fail:function(res){
              console.log(JSON.stringify(res));
            }
          });    

        }
         
      },  
    cancleRecord(){
      this.showRecord=false;
       this.showPause=false;
      this.showPlay=true;
    }
      
    },
      mounted(){
    this.config();
      },
      computed:{
        // questionlist(){
        // return this.$store.state.questionList;

      },
      created(){},
      // beforeUpdate(){console.log(this)}
    },

    //上传图片组件

    'Mypic':{
      template:`
      <div>
        <ul class='piclists'>
           <li v-for='(p,index) in piclist' :index='index' >
              <img :src='p' alt="loading" @click='previewPic(index,$event)'>
            <i @click.stop='deletes(index)' class='iconfont'>&#xe633;</i>
           </li> 
        </ul>
        <button @click='uploadpic'>上传图片</button>

      </div>

      `,
      data(){
        return {

            piclist:[],
            picitem:[],
          
        }
      },
      methods:{
       deletes(index){   
        var Index=$(this.$el).parent().attr('index');
       // console.log()
        this.piclist.splice(index,1);
        this.picitem.splice(index,1);
        this.selected=this.$store.state.rightResult;
        this.selected[Index]['answer']=this.picitem;
        console.log(this.selected[Index]['answer'])
},   
        previewPic(index){
          console.log(event.target)
          var tar=event.target
          console.log('当前预览图片的地址');
          var imgSrc= tar.getAttribute('src')
          console.log(imgSrc)
                WX.previewImage({
                   current: imgSrc, // 当前显示图片的http链接
                    urls: this.piclist // 需要预览的图片http链接列表
                })

        },
        
        uploadpic(){
          if(this.piclist.length>=4){
            bus.$emit('tip','图片已达上限^_^')
          }else{
          //拍照或从手机选择图片
          var this_=this;
          WX.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
                bus.$emit('loading');
            var localIds = res.localIds[0].toString();// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log('成功选取图片shujju');
            console.log(res);
              WX.uploadImage({
              localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res1) {
              console.log('获取到的上传图片id')
              console.log(res1)
              var serverPicId= res1.serverId; // 返回图片的服务器端ID
               $http.post('postImageByImageId',{
                        serviceId:serverPicId
                      })
               .then(function(res2){
                console.log("图片%%%…………返回的数据")
                console.log(res2);
                console.log(res2.data.result)
                if(res2.data.result=='fail'){
                  console.log('上传失败')
                  bus.$emit('closeloading');
                  bus.$emit('tip','上传失败请重新上传^_^')
                }else{
                  console.log(res2.data.imageId.attachments[0].uuid)
                   var imgId=res2.data.imageId.attachments[0].uuid;
                console.log(imgId)
                 this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgId)
                 .then(function(res5){
                  bus.$emit('closeloading');
                  console.log(res5)
                  var pictureUrl=this_.ip.filePath1+res5.data[imgId].href;
                  this_.piclist.push(pictureUrl);
                  this_.picitem.push(imgId);
                  var index=this_.$el.parentNode.getAttribute('index');
                  console.log(index)
                  this_.selected=this_.$store.state.rightResult;
                  this_.selected[index]['answer']=this_.picitem;
                  console.log(this_.selected[index]['answer']);

                 })
                }
                // var imgId=res2.data.imageId.uuid;
               
               })
               .catch(function(err){
                console.log(err);
               })
             },
             fail:function(fail){
              console.log(fail)
             }
              });
          
          }
          });
        }
        },
      },
      created(){
        this.config();
     
        }
        //
      },
  },

  methods:{
   back(){
     this.selectItem--;
     if(this.selectItem<0){
           this.selectItem=0;
     }
     console.log(this.$refs.backs)

   },
   next(){
    // console.log('下一页')
    this.selectItem++;
    // console.log(this.nameLength)
    if(this.selectItem>this.nameLength-1){
       this.selectItem=this.nameLength-1;
    }
   },
   showTrue(){
    this.trueSub=true;

   },
  	goresult(){
		if(!this.clicked){
			//防止连续连续两次点击
			this.clicked=true;
			console.log('去提交数据');
			let USERID=sessionStorage.getItem('i');
		    var  score=0;
			console.log(this.selected);
			let postdata={
				userId:USERID.toString(),
				signId:this.$store.state.currentBook.id.toString(),
				questionResult:[],
        type:this.$route.params.type
			}
			for(var i=0;i<this.selected.length;i++){
				//处理选择的答案
				console.log(this.selected[i]['answer']);
				if(Object.prototype.toString.call(this.selected[i]['answer'])=='[object Array]'){
					var isAnswer=Boolean(this.selected[i]['answer'].join(''))
				}else{
					var isAnswer=Boolean(this.selected[i]['answer'])
				}

				if(!isAnswer){
					bus.$emit('tip','第'+(i+1)+'题未答')
					postdata.questionResult=[];
          this.clicked=false;
					break;
				}else{
					if(this.selected[i]['kind']=='Text'){
						//文本思考题
						postdata.questionResult[i]={
							id:this.selected[i].id.toString(),
							kind:this.selected[i].kind,
							textAnswer:this.selected[i].answer,
							type:this.selected[i].type
						}
					}else if(this.selected[i]['kind']=='Radio'){
						//单选题
						if(this.selected[i].answer==this.selected[i].right){
							// 如果答案正确加2分
							score+=2;
						}
						postdata.questionResult[i]={
							id:this.selected[i].id.toString(),
							kind:this.selected[i].kind,
							isRight:Number(this.selected[i].answer==this.selected[i].right).toString(),
							type:this.selected[i].type,
							questionResult:this.selected[i].answer.toString()
						}
					}else if(this.selected[i]['kind']=="Record"){
            //录音题
            postdata.questionResult[i]={
              id:this.selected[i].id.toString(),
              kind:this.selected[i].kind,
              textAnswer:this.selected[i].answer,
              type:this.selected[i].type
            }
          }else if(this.selected[i]['kind']=="Image"){
              //照片上传题
            postdata.questionResult[i]={
              id:this.selected[i].id.toString(),
              kind:this.selected[i].kind,
              textAnswer:this.selected[i].answer,
              type:this.selected[i].type
            }

          }else{
						//多选题
						if(this.selected[i].answer.sort(function (a,b) {return a - b }).join(',')==this.selected[i].right){
							// 如果答案正确加2分
							score+=2;
						}
						postdata.questionResult[i]={
							id:this.selected[i].id.toString(),
							kind:this.selected[i].kind,
							isRight:Number(this.selected[i].answer.sort(function (a,b) {return a - b }).join(',')==this.selected[i].right).toString(),
							type:this.selected[i].type,
							questionResult:this.selected[i].answer.sort(function (a,b) {return a - b }).join(',')
						}
					}

				}

        //
			}
			console.log('提交的数据');
			console.log(postdata);
      console.log(i)
      console.log(this.selected.length)
			if(i==this.selected.length){
				//所有题目都做了
        console.log("111")
				this.axios.post(this.ip.RESTPATH+'rest/postSignQuestioinResultByUserId',postdata)
				.then(res => {
					console.log(res);
					console.log('提交成功');
					console.log('提交的积分参数');
          console.log(this.$store.state.rightResult)
          this.$store.state.rightResult=[];
          console.log(this.$store.state.rightResult)
					console.log({
							userId:USERID,
							type:'SIGNEXAM',
							score:score,
							foreignKey:this.$store.state.currentBook.id
						});
          if(this.$route.params.type=='prep'){
              console.log('上传预习打卡积分');
              var data={
             userId:USERID,
             type:'PREP',
             score:score,
             foreignKey:this.$store.state.currentBook.id
           }
         }else if(this.$route.params.type=='test'){
              console.log('上传整数测试打卡积分');
              var data={
             userId:USERID,
             type:'TEST',
             score:score,
             foreignKey:this.$store.state.currentBook.id
           }
         }else if(this.$route.params.type=='read'){
              console.log('上传阅读打卡积分');
              var data={
             userId:USERID,
             type:'READ',
             score:score,
             foreignKey:this.$store.state.currentBook.id
           }
         }else if(this.$route.params.type=='think'){
              console.log('上传图片题打卡积分');
              var data={
             userId:USERID,
             type:'THINK',
             score:score,
             foreignKey:this.$store.state.currentBook.id
           }
          }
          this.axios.post(this.ip.RESTPATH+'rest/point',data)
          .then(sres => {
            console.log(sres);
            console.log('积分上传成功');
            this.clicked=false;
            this.$router.push({name:'result',params:{flag:res.data.flag,score:score,type:this.$route.params.type}});
          }) 
          
          
				})
				.catch(err => {
					console.log(err);
				})
			}

		}
  		// this.$router.push({name:'result'})
  	},
	// goback(){
	// 	this.$router.go(-1)
	// },
	getprogress(){
		this.$nextTick(function () {
        var h=document.getElementById("form-box").scrollHeight;
        var w = document.getElementById("form-box").offsetHeight
        var t=document.getElementById("form-box").scrollTop;
        this.progresWidth=Math.floor(t/(h-w)*10000)/100-100;
      })
	}
  },
  computed:{
  prepareShow(){
    return this.$route.params.type=='prep'?true:false;
  },
  readingShow(){
     return this.$route.params.type=='read'?true:false;
  },
  imgItemShow(){
     return this.$route.params.type=='think'?true:false;
  },
  totalShow(){
    return this.$route.params.type=='test'?true:false;
  },
  writingshow(){
    return this.$route.params.type=='writing'?true:false;
  },
	getbook(){
		return this.$store.state.currentBook;
	},
	questionlist(){
		return this.$store.state.questionList;
	},
  },
  mounted(){	
    document.getElementById("form-box").addEventListener('scroll', this.getprogress);
    $("textarea").focus(function(){
  $('#navbar').hide()
});
    $("textarea").blur(function(){
  $('#navbar').show()
});

    // this.config();
    // console.log()
  },
  created(){
    console.log(this.$store.state.currentBook.id)
    console.log(this.$route.params.type)
    console.log(this.questionlists)
    console.log(this.prepareShow)
    console.log(this.readingShow)
    console.log(this.imgItemShow)
    console.log(this.totalShow)
    console.log(this.$store.state.questionList)
    console.log(this.$store.state.questionList.length)
    if(this.$store.state.questionList.length==0){
      console.log('暂无上传题目')
      this.noqst=true;
    }else{
        this.noqst=false;
       this.nameLength=this.$store.state.questionList[0].name.length;

   this.selected=this.$store.state.rightResult;
     console.log('11223'+this.selected.length); 
    this.id=this.index;
    }
   
    // console.log(this.question)
  },

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
   @keyframes subBox{
    from{
      opacity: 0;
      transform: scale(0);
    }
    to{
      opacity: 1;
      transform: scale(1)
    }
   }
    body{height:100%;
      // padding-top:10rem;

    }
.exam{
	width: 100%;
	height: 100%;
  .subBox{
   position: fixed;
   width:100%;
   height:100%;
   background: rgba(0,0,0,.1);
   z-index: 999;
  
.sureSunmit{
   position: absolute;
    width:70%;
    height:12rem;
    left:15%;
    top:30%;
    background: #fff;
    border-radius: 6px; 
    color:#fff;
    z-index: 999;
    animation: subBox .3s forwards;
    p{
      text-align: center;
      height:6rem;
      line-height: 6rem;
      font-size: 2rem;
      letter-spacing: 3px;
      color:#333;
    }
    ul{
      width:100%;
      height:4rem;
      margin-top: 2rem;
      border-top: 1px solid #eee;
      li{
        float: left;
        width:50%;
        height: 100%;
        margin-top: 0;
        color:#666; 
        line-height: 4rem;
        font-size: 2rem;
        button{
          width:100%;
          height:100%;
          line-height: 4rem;
          border-style: none;
          font-size: 2rem;
          color:#666;
          text-align: center;
          background: #fff;
        }
        &:nth-child(2){
          border-left: 1px solid #eee;
          button{
           color:#1892e9; 
          }
          
          
        }
      }
    }
  }
  }
	
	header{
		width: 100%;
		height: 10%;
		display: -webkit-flex; /* Safari */
			display: flex;
			align-items:center;
			position: relative;

		i{
			color:#35b4ca;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto;
      z-index: 99;
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
	.doexam{
		width: 100%;
		height: 100%;
		.dec{
			width: 100%;
			height: auto;
			text-indent: 2em;
			position: relative;
      font-size: 16px;
			// overflow-y: scroll;
			// -webkit-overflow-scrolling: touch;
			.progress{
				width: 100%;
				height: 4px;
				position: absolute;
				bottom: 0;
				overflow: hidden;
				z-index: 99;
				div{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					bottom: 0;
					left: -100%;
					background-color: #2196f3;
					transition: all .4s cubic-bezier(.25,.8,.25,1);
				}
			}
		}
		#form-box{
			width: 100%;
			height: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
 .noqst{
          font-size: 1.8rem;
          text-align: center;
          width: 100%;
          margin-top: 8rem;
          // height:100%;
         }
			.qst-box{
			  width: 100%;
			  padding: 0 1rem;
			  margin: 1rem 0;
			  height: auto;
         border-radius: 3px;
        
          .preTest{
         text-align: center;
         width:40%;
         margin:2rem auto;
         height:5rem;
         line-height: 2rem;
         border-radius:5px;
         background: #5b9bd5;
         color:#fff;
         letter-spacing: 2px;
         font-size: 1.7rem;
         }
         .records{
          position: relative;
          height:40rem;
         
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
          .answer{
              width:100%;
              height:15%;
           
               border:1px solid #cceff5;
               background:#fafcfd;
               border-radius: 3px;
               position: absolute;
               bottom:0;
               left:0;

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
            }
         }
			  .audio-question,.uploadpic{
			    	.answer{
			    		width:100%;
			    		height:auto;
			    		border:1px solid #eee;
               // border:1px solid #cceff5;
               background:rgba(0,0,0,.005);
               border-radius: 3px;

                .uppic{
                  width:100%;

                button{
                  margin-top: 3rem ;
                margin-bottom: .2rem;
                margin-left: 68%;
                padding:.2rem .5rem;
                text-align: center;
                background: #5db8f5;
                color:#fff;
                letter-spacing: .15em;
                border-style: none;
                border-radius: 5px;
                font-size: 1.4rem;
                }
                .piclists{
                width:90%;
                 display:flex;
                -moz-display:flex;
                -webkit-display:flex;
                flex-wrap: wrap;     
                margin:0 auto;
                margin-top: .1rem;
                  li{
                  background:  #cceff5;
                  height: 11.5rem;
                  width:11.5rem;
                  margin: .2rem;
                  border:1px solid #ddd;
                  overflow:hidden;
                  position: relative;
                  img{
                    display: inline-block;
                   width:100%;
                   height:100%;
                  }
                  i{
                    position: absolute;
                    top:.1rem;
                    right:.1rem;
                    color:#fff;
                   
                   padding:.2rem .3rem;
                        
                    text-align: center;
                    z-index: 999;
                    background: rgba(0,0,0,.2);
                    border-radius: 3px;
                  }

                  }

                }
               }
			    		.ul{
                position: relative;
                .startAsk{
                  // margin:0 auto;
                margin-top: 3rem ;
                margin-bottom: .2rem;
                padding:.2rem 1rem;
              
                margin-left: 67%;
                text-align: center;
                background: #5db8f5;
                color:#fff;
                letter-spacing: .15em;
                border-style: none;
                border-radius: 5px;
                font-size: 1.4rem;
              }
  
                .startRecord{
                  .iconfont{
                    position: absolute;
                    color:#ddd;
                    opacity:1;
                    font-size: 2rem;
                    width:2rem;
                    height:2rem;
                    left:90%;
                    top:.5rem;
                    line-height: 2rem
                  }
                    height: 12rem;
                    width: 100%;
                    background: #fff;
                    position:fixed;
                    bottom:0;
                    left:0;
                    z-index: 990;
                    border-top: 1px solid #eee;
                    .startVoice,.text-time{
                    text-align: center;
                    color:#666;
                    margin-top: .6rem;
                    height: 2rem;
                    display: flex;
                    justify-content: center;
                    .left ,.right{
                      height:2rem;
                      // width:10%;
                  
                    .voiceJump{
                      // margin-top: 1rem;
                      background:red;
                      height:1rem;
                      width:2px;
                      display: inline-block;margin-left: 3px;

                    }  
                  }
                  }
                  .next{
                      text-align: center;
                       color:#666;

                    }
          
                
                .common{

                  // float: left;
                    height:6rem;
                    width: 6rem;
                    -moz-border-radius: 3rem; 
                    -webkit-border-radius: 3rem; 
                    border-radius: 3rem; 
                    border:1px solid rgba(189, 189, 189, 0.62);
                    margin:1rem auto 0;
                    position: relative;}
                .clickRecord{
                    div{
                    height: 5rem;
                    width: 5rem;
                    -moz-border-radius: 2.5rem; 
                    -webkit-border-radius: 2.5rem; 
                    border-radius: 2.5rem; 
                    background-color: #f75549;
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right: 0;
                    margin: auto;}
                  }
                .recording{
                    margin-top:1rem;
                    border-top:1px solid #ddd;
                    div{
                    width: 3rem;
                    height: 3rem;
                    -moz-border-radius: 0.3rem; 
                    -webkit-border-radius: 0.3rem; 
                    border-radius: 0.3rem; 
                    background-color: #18b4ed;
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right: 0;
                    margin: auto;}
                  }
                }
              .sendRecord{
                  position: absolute;
                  right:1rem;
                  top:.5rem;
                  // padding:.5rem 1.5rem;
                  i{
                      color:#18b4ed;
                      font-size: 2.2rem;}
                    }
                  
                // }
  			     .li{
			    				background: #d9f4fe;
			    				height: 2rem;
			    				width:60%;
			    				margin: 0 2rem;
                  border-radius: 3px;
                  position: relative;
                  .del{
                      color:rgba(0,0,0,.2);
                      position: absolute;
                      left:78%;
                      top:0;
                      height:100%;
                      font-size: 1rem;
                      line-height: 2rem;
                      z-index: 999;
                      opacity: 1;

                    }
			    				 .Audio{
                    position: relative; 
                    height:100%;
                    width: 100%; 
                    margin: .5rem auto;
                    overflow:hidden;
                    
                        .play-pause{
                          margin:0 .45rem;
                          width:2rem;
                          height:100%;
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
                          opacity: 1;
                          font-size: 1.6rem;}
                        .icon-pause{
                          position: absolute;
                          left:0;
                          top:.1rem;
                          width: 100%;
                          height: 100%; 
                          display: block; 
                          color: #11b7f5;
                          line-height: 2rem;
                          opacity: 1;
                          font-size: 1.6rem;}
                        }
                        .controls{position: absolute;
                                  right:1.5rem;
                                  top:.1rem;
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
                          width: 40%; 
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
			  &>div{
			    width: 100%;
			    height: auto;
			    h5{
			      width: 100%;
			      min-height: 25px;
			      line-height: 25px;
			      font-size: 16px;
			    }
			    &>p{
			    	padding: 0 2%;
			    	margin: 10px 0;
			    	img{
			    		width: 100%;
			    		height: auto;
			    		margin: 0 auto;
			    	}
			    }

			    fieldset{
			      width: 100%;
			      height: auto;
			      margin-top: .5rem;
			      overflow: hidden;
             // border:1px solid #cceff5;
             // background:#fafcfd;
             border-radius: 3px;
             border-color: #eee;
			      p{
			        width: 100%;
			        min-height: 2rem;
			        overflow: hidden;
			        margin-top: .5rem;
			        input{
			          font-size: 1.2rem;
			          float: left;
			          width: 5%;
			          display: none;
			          opacity:0;-webkit-appearance:none;
			        }
			        label{
			          font-size: 1.4rem;
			          float: left;
			          width: 95%;
			          margin-left: 3%;
			          padding-left: 10%;
			          padding-right: 5%;
			          position: relative;
			        }
			        input+label:before{
			          display: inline-block;
			          width: 18px;
			          height: 18px;
			          margin-right: 8px;
			          content: '';
			          color: #fff;
			          border: 1px solid #dce4e6;
			          background-color: #f3f6f8;
			          border-radius: 3px;
			          position: absolute;
			          top: 0;
			          left: 0;
			        }
			        input[type=radio]+label:before {
			            border-radius: 50%;
			        }
			        input[type=checkbox]+label:before {
			            border-radius: 3px;
			        }
			        input[type=checkbox]:checked+label:before,input[type=radio]:checked+label:before{
			          content:'\2713';
			          color:#fff;
			          background-color: #31b968;
			          font-size:16px;
			          text-align: center;
			          border-color: #31b968;
			        }

			      }
			      textarea{
			        width: 100%;
			        min-height: 12rem;
			        font-size: 14px;
			        resize: vertical;
               // border:1px solid #cceff5;background:#fafcfd;
               margin-top:5px;
               border-color:#eee;
               -webkit-appearance:none;
			      }
			    }
			  }
			}
		&>p{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 70px;
        button{
          color: white!important;
          background-color: #FF9800!important;
        }
      }
			.space-conent{
				height: 2rem;
			}
		}
	}
}

</style>
