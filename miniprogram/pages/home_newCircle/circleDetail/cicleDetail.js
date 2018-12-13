// miniprogram/pages/home_newCircle/circleDetail/cicleDetail.js
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleInfo:{},
    headImg:'',
    userInfo:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(options)
    options = {
      selectData:'{"title":"我的第一个圈子","circleTag":[{"title":"外语","options":["英语","韩语"]},{"title":"阅读","options":["读书"]}]}'
    } 
    if (Object.keys(options).length != 0){
      let opt = JSON.parse(options.selectData);
      this.setData({
        circleInfo: opt
      });
      console.log(this.data.circleInfo);
    }
    //获取头图
    const db = wx.cloud.database();
    db.collection('headImg').limit(1).get().then(res=>{
      console.log(res);
      wx.cloud.getTempFileURL({
        fileList:[res.data[0].imgId]
      })
      .then(res1=>{
        console.log(res1);
        that.setData({
          headImg: res1.fileList[0].tempFileURL
        })
      })

    }).catch(err=>{
      console.log(err)
    });
    const userInfo = config.getUserInfo();
    this.setData({
      userInfo: userInfo
    })
    console.log(this.data.userInfo)

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