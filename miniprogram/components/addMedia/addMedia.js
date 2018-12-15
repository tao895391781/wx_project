Component({
  options:{
    multipleSlots: true
  },

  properties:{

  },
  data:{
    mediaContents:[
      {
        type:'text',
        content:'111'
      }

    ],
    setTimes:'00:53',
    showPlay:true,
    showRecording:false,
  },
  methods:{
    addMediaContent: function(e){
      let this_ = this;
      switch (e.currentTarget.dataset.type){
        case 'text':
          console.log('添加文字');
          this.addtypes_(e.currentTarget.dataset.type,1)
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
          })
          const RecorderManager =  wx.getRecorderManager();
          RecorderManager.start();
          break;
        case 'video':
          console.log('添加视频');
          break;
      }
    },
    addtypes_:function(type,value){
      let mediaContents_ = [].concat(this.data.mediaContents);
      mediaContents_.push({
        type: type,
        content: value
      })
      this.setData({
        mediaContents: mediaContents_
      })
      console.log(this.data.mediaContents)
    },

    
  },
})