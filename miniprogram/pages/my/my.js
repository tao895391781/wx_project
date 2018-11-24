// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    scrollHeight:'',
    scrollTop:5,
    myTable:[{
      title:'我的关注',
      icon:'icon-tianchongxing-',
      color:'#1caca9'
    },{
        title: '我的粉丝',
        icon: 'icon-wodefensi',
        color: '#ff5a5e'
    },{
        title: '我的收藏',
        icon: 'icon-wodeshoucang',
        color: '#fdac29'
    },{
        title: '我建的圈子',
        icon: 'icon-liebiao',
        color: '#00ced1'
    },{
        title: '我的金币',
        icon: 'icon-jinbi',
        color: '#fdac29'
    },{
        title: '设置',
        icon: 'icon-shezhi',
        color: '#4f7be4'
      }]

  },
  upper: function () {
    console.log('下拉刷新')
  },
  lower: function(){

  },
  scroll:function(e){
    console.log(e)
  },
  scrolltoupper:function(e){
    console.log(1)
  },
  onPullDownRefresh: function () {
      console.log('下拉刷新')
    // 用户触发了下拉刷新操作

    // 拉取新数据重新渲染界面

    // wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    wx.getSystemInfo({
      success:function(res){
        console.log(res);
        that.setData({
          scrollHeight:res.windowHeight +'px'
        })
      },
    });
    // this.data.userInfo = app.globalData.userInfo;
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // });
    let userInfo = wx.getStorageSync('userInfo');
    let userInfo_1 = JSON.parse(userInfo);
    userInfo_1.avatarUrl = decodeURIComponent(userInfo_1.avatarUrl);
    this.setData({
      userInfo:userInfo_1
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