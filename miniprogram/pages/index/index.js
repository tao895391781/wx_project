// miniprogram/pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //云函数
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test              result: ', res)
      }
    });
    //判断用户是否授权
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']){
          console.log('用户授权成功');
          wx.switchTab({
            url: '../../pages/home/home'
          })
        }else{
          wx.openSetting({
            success(res) {
              console.log(res.authSetting);
              if (res.authSetting['scope.userInfo']) {
              }
            },
          })
        }
      }
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

  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
      wx.switchTab({
        url: '../../pages/home/home'
      })
    }
})