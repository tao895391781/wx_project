//自定义audio播放组件 created by tll at 2018/12/20
const Fn = require('../../config.js')
Component({
  properties: {
    audioData:{
      type:Object,
      value:''
    },
  },
  data:{
    showPlayAudio:true,
    currentTimes: '00:00',
    duration:'',
    progressWidth:'',
    audioContext:{},
  },
  methods:{
    //播放/暂停音频文件
    playAudio: function(){
      this.data.audioContext.src = this.data.audioData.content;
      //暂停
      if (this.data.showPlayAudio) {
        this.data.audioContext.play();
        this.setData({
          showPlayAudio: false
        })
      } else {
        //播放
        this.setData({
          showPlayAudio: true
        });
        this.data.audioContext.pause();
      }
    },
  },
  attached: function(){
    let this_ = this;
    this.setData({
      audioContext: wx.createInnerAudioContext(),
    });
    console.log(this.data.audioContext)
    // 监听音频播放时间更新事件
    this.data.audioContext.onTimeUpdate(() => {
      let currentTime = this_.data.audioContext.currentTime;
      let duration = this_.data.audioContext.duration;
      console.log(currentTime)
      console.log(this_.data.audioContext.duration)
      this_.setData({
        currentTimes: Fn.timeTransform(Math.floor(currentTime)),
        progressWidth: Math.floor(currentTime) / Math.floor(duration) * 100 +'%'
      })
    });
     // 监听音频播放结束事件
    this.data.audioContext.onEnded(()=>{
      console.log('播放结束');
      setTimeout(()=>{
        this_.setData({
          showPlayAudio: true,
          currentTimes: '00:00'
        })
      },500)
    }); 
  },
})