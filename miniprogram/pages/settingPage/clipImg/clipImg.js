// miniprogram/pages/settingPage/clipImg/clipImg.js
const ctx = wx.createCanvasContext('myCanvas')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.imgurl = "http://tmp/wxce803e6ed61ee6fa.o6zAJs-tK-7EjM2sT1f8TrVrIUXc.x5LMHzhAYM4a1944e2f1a3856b9066edfef5fb7cd9ef.PNG"
      if(Object.keys(options).length == 0) return;
      this.setData({
        imgurl:options.imgurl
      });
      let width = 0;
      let height = 0;
      let dw = 0;
      let dh = 0;
      wx.getImageInfo({
        src: options.imgurl,
        success:res=>{
          console.log(res);
           wx.getSystemInfo({
            success:res1=>{
              console.log(res1)
              let ifShu = res.height / res.width;
              if (ifShu > 1) {
                console.log('图片是竖着的');
                height = res1.screenHeight * .9;
                width = res.width * (res1.screenHeight *.9 / res.height);
              } else {
                console.log('图片是横着的')
              }
              ctx.drawImage(options.imgurl, 0, 0,width,height)
              ctx.draw()
            }
          })
        }
      });

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