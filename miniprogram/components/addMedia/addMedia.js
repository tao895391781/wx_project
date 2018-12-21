const Fn = require('../../config.js')
const RecorderManager = wx.getRecorderManager();
const ToastFun = require('../../template/showToast/showToast.js');
const app = getApp();
Component({
  options:{
    multipleSlots: true
  },

  properties:{
    mediaContents:{
      type:Array,
      value:'',
      observer:function(newV,oldV){
        // 子组件传递给父组件的数据
        this.triggerEvent('getAddDatas', this.data.mediaContents,{})
      },
    }
  },
  data:{
    mediaLength:0,
    setTimes:'00:00',
    showPlay:true,
    showRecording:false,
    timer:0,
    count:0,
    stopTime:true,
    timePointAnimation:{},
    showPlayAudio:true,
    ifPause:false,
    ifhandleCloseRecord:true,
  },
  methods:{
    addMediaContent: function(e){
      let this_ = this;
      switch (e.currentTarget.dataset.type){
        case 'text':
          console.log('添加文字');
          this.addtypes_(e.currentTarget.dataset.type,this.data.textValue)
          break;
        case 'img':
          console.log('添加图片');
          wx.chooseImage({
            count:1,
            success: function(res){
              console.log(res)
              const tempFilePaths = res.tempFilePaths[0];
              this_.addtypes_(e.currentTarget.dataset.type, tempFilePaths)
            }
          })
          break;
        case 'record':
          console.log('添加录音');
          this.setData({
            showRecording: true,
            stopTime:true,
            count:0,
          })
          RecorderManager.start({
            format: 'mp3',
            duration:240000 
          });
          this.countRecordTime();
          break;
        case 'video':
          console.log('添加视频');
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
              console.log(res);
              this_.addtypes_('video', res.tempFilePath);
            }
          })
          break;
      };
    },
    addtypes_:function(type,value,duration){
      let mediaContents_ = [].concat(this.data.mediaContents);
      if(type == 'record'){
          mediaContents_.push({
            type: type,
            content: value,
            duration: Fn.timeTransform(duration),
          })
      }else{
          mediaContents_.push({
            type: type,
            content: value
          })
      }
      this.setData({
        mediaContents: mediaContents_,
        mediaLength: mediaContents_.length
      })
      console.log(this.data.mediaContents)
    },
    //删除指定模块
    deleteIntro: function(e){
      let index = e.currentTarget.dataset.index;
      console.log(index);
      let arr = [].concat(this.data.mediaContents);
      arr.splice(index,1);
      this.setData({
        mediaContents:arr,
        mediaLength: arr.length
      })
      console.log(this.data.mediaContents)
    },
    // 向上移
    moveToTop: function(e){
      let index = e.currentTarget.dataset.index;
      console.log(index);
      if(index == 0 ) return;
      console.log('向上移')
      let newarr = [].concat(this.data.mediaContents);
      Fn.moveTopOrmoveBottom(newarr,index,'top');
      this.setData({
        mediaContents: newarr
      })
      console.log(this.data.mediaContents);
    },
    // 向下移
    moveToBottom: function(e){
      let index = e.currentTarget.dataset.index;
      console.log(index);
      if (index == this.data.mediaLength-1) return;
      console.log('向下移');
      let newarr = [].concat(this.data.mediaContents);
      Fn.moveTopOrmoveBottom(newarr, index,'bottom');
      console.log(newarr)
      this.setData({
        mediaContents: newarr
      })
    },
    textBlur: function(e){
      console.log(e);
      let index = e.currentTarget.dataset.index;
      let arr_index = `mediaContents[${index}].content`;
      this.setData({
        [arr_index]: e.detail.value
      });
      console.log(this.data.mediaContents)
    },
    //录音的播放和暂停
    pauseRecord:function(e){
      console.log(e.currentTarget.dataset.status);
        if(e.currentTarget.dataset.status == 'pause'){
            RecorderManager.pause();
            this.setData({
              showPlay: false,
              stopTime: false
            });
        } else if (e.currentTarget.dataset.status == 'play'){
            RecorderManager.resume();
            this.setData({
            showPlay: true,
            stopTime:true
          });
          this.countRecordTime();
        }
    },
    //计算录音的时间
    countRecordTime:function(){
      setTimeout(function(){
        if (this.data.stopTime){
          this.countRecordTime();
        } else{
          return;
        }
        let n = this.data.count;
        n++;
        this.setData({
          count: n,
          setTimes: Fn.timeTransform(n)
        });
        // this.createAnimation();
      }.bind(this),1000) 
    },
    // 关闭录音
    closeRecord: function(c){
      RecorderManager.stop();
      this.setData({
        showRecording: false,
        stopTime: false,
        setTimes: Fn.timeTransform(0),
        showPlay:true,
      });
      if(c == 'over'){
        this.setData({
          ifhandleCloseRecord:true
        })
      }else{
        this.setData({
          ifhandleCloseRecord: false
        })
      }

    },
    // 完成/停止录音
    completeRecord: function(){
      if(this.data.count < 2){
          app.globalData.showToast.title = '录音时长不少于2s';
          ToastFun.showToast(app.globalData.showToast);
      }else{
          let this_ = this;
          console.log(this.data.ifPause);
          //解决录音暂停时获取的录音时长异常问题
          RecorderManager.resume();
          setTimeout(() => RecorderManager.stop(), 50);
          this.closeRecord('over');
      }
    },
    createAnimation: function(even){
      const Animations = wx.createAnimation({
        duration:500,
        timingFunction: 'ease',
      });
      if(even == 'even'){
        Animations.scale(.5).step({ duration: 500 }).scale(1).step({ duration: 500 });
      }else{
        Animations.scale(1).step({ duration: 500 }).scale(.5).step({ duration: 500 });
      }
  
      this.setData({
        timePointAnimation: Animations.export()
      })
    },
  },
  attached: function () {
    let this_ = this;
    // 录音停止事件
    RecorderManager.onStop(function (res) {
      console.log(res);
      this_.setData({
        showRecording: false,
        stopTime: false,
        setTimes: Fn.timeTransform(0),
        showPlay: true,
      });
      if (this_.data.ifhandleCloseRecord){
        this_.addtypes_('record', res.tempFilePath, Math.floor(res.duration / 1000));
      }else{
        console.log('关闭录音不添加')
      }
      
    });
    // 录音暂停事件
    RecorderManager.onPause(function(){
      console.log('录音暂停');
      this_.setData({
        ifPause:true
      })
    })
    
  },
})