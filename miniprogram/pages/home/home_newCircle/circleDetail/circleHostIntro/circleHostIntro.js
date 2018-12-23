// miniprogram/pages/home/home_newCircle/circleDetail/circleHostIntro/circleHostIntro.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleId:'',
    maxtext:50,
    inputLength:0,
    introText:'',
    wxNumber:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      if(Object.keys(options).length !=0){
        this.setData({
          circleId:options.circleId
        })
      };
  },
  inputIntroOver: function(e){
    this.setData({
      inputLength: e.detail.value.length,
      introText: e.detail.value
    })
  },
  inputwxOver: function(e){
    this.setData({
      wxNumber: e.detail.value
    })   
  },
  // 保存圈主信息
  saveCircleIntro:function(){
    let data = {
      introText: this.data.introText,
      wxNumber: this.data.wxNumber
    };
    console.log(data);
    db.collection('all_circle').doc(this.data.circleId).update({
      data: {
        circleHostIntro: data
      },
      success(res) {
        console.log(res);
        wx.navigateBack();
      },
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