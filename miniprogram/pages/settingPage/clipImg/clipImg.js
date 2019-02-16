// miniprogram/pages/settingPage/clipImg/clipImg.js
const ctx = wx.createCanvasContext('myCanvas')
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleId:'XCMkYsDR1TiNHHza',
    imgurl:'',
    viewNum:9,
    imgW:'',
    rectMoveW:0,
    imgH:'',
    byClear:1,
    cutW:0,
    cutH:0,
    lineH:0,
    cutLeftX:0,
    cutLefty:0,
    pageX:0,
    pageY:0,
    pageX_: 0,
    pageY_: 0,
    left:0,
    top:0,
    lastLeft:0,
    lastTop:0,
    canvasboxRight:0,
    canvasboxBottom: 0,
    moveboxRight:0,
    moveboxBottom:0,
    moveboxHeight:0,
    moveboxWidth:0,
    canvasmarginL:0,
    scaleValue:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length ==0) return;
    this.setData({
      circleId: options.circleId
    });
    let that = this;
      this.setData({
        imgurl:options.imgurl
      });
      let width = 0;
      let height = 0;
      let dw = 0;
      let dh = 0;
      let scale = 1;
      let ifWgtH = true;
      wx.getImageInfo({
        src: options.imgurl,
        success:res=>{
          console.log(res);
           wx.getSystemInfo({
            success:res1=>{
              console.log(res1)
              if (res.width > res.height || res.width == res.height){
                console.log('图片宽比高长');
                ifWgtH = true;
                width = res1.screenWidth;
                height = res.height * res1.screenWidth / res.width;
                ctx.drawImage(options.imgurl, 0, 0, width, height);
              }else{
                console.log('图片高比宽长');
                ifWgtH = false;
                if (res.height > res1.windowHeight || res.height == res1.windowHeight){
                  height = res1.windowHeight * .91;
                  width = res.width * res1.windowHeight * .91 / res.height;
                }else{
                    height = res.height * res1.screenWidth / res.width;
                    width = res1.screenWidth;
                   if (height > res1.windowHeight * .91) {
                      height = res1.windowHeight * .91;
                      width = res1.windowHeight * .91 * width / height
                  }
                  if(width > res1.screenWidth){
                    width = res1.screenWidth;
                    height = res1.windowHeight * .91 * height / width
                  }
                }
 
              }
              ctx.drawImage(options.imgurl, 0, 0, width, height);
              ctx.draw(); 
              that.setData({
                cutW: width,
                cutH: width / 2,
                imgW: width * 2,
                imgH: height * 2,
                rectMoveW: width * 2,
              });   
            }
          })
        }
      });
  },
  // 确定裁剪图片
  clipImg:function(){
    let this_ = this;
    let clipOpt = {
        x:this.data.cutLeftX,
        y: this.data.cutLeftY,
        width:this.data.cutW,
        height:this.data.cutH,
        destWidth: this.data.cutW,
        destHeight: this.data.cutH,
        canvasId: 'myCanvas',
        quality:1,
        success:res=>{
          console.log(res);
          db.collection('all_circle').doc(this_.circleId).update({
            data: {
              headImg: res.tempFilePath
            },
            success: res1=> {
              console.log('修改成功');
              console.log(res.tempFilePath)
              wx.setStorageSync('changeImg', encodeURIComponent(res.tempFilePath));
              wx.navigateBack();
            }

          })
        }
       
    };
    wx.canvasToTempFilePath(clipOpt, this);
  },
  // 取消裁剪
  cancleClip:function(){},
  // 完成裁剪
  overClip:function(){
      console.log('开始裁剪');
      this.clipImg();
  },
  touch:function(e){
    console.log(e)
      this.setData({
       cutLeftX: e.detail.x,
        cutLeftY: e.detail.y,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})