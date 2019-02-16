// miniprogram/pages/home_newCircle/circleDetail/circleIntro/circleIntro.js
const db = wx.cloud.database();
const ToastFun = require('../../../../../template/showToast/showToast.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaContents:[],
    saveData:[],
    circleId:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    const this_ = this;
    console.log(options);
    this.setData({
      circleId: options.circleId
    });
    //获取添加的圈子介绍信息
    db.collection('all_circle').doc(options.circleId).get()
    .then(res=>{
      console.log(res);
      wx.hideLoading()
      this_.setData({
        mediaContents:res.data.circleIntro
      })
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
  //获取子组件的媒体数据
  getAddDatas: function(data){
      console.log(data.detail);
      this.setData({
        saveData: data.detail
      })

  },
  //保存添加的媒体数据
  saveDatas: function(){
    console.log(this.data.saveData);
    let data = this.data.saveData;
    let data_ = [];
    let ifsaveSuccess = [];
    let this_=  this;
    data.forEach(v=>{
      if(v.content){
        data_.push(v);
      }
    })
    db.collection('all_circle').doc(this.data.circleId).update({
      data: {
        circleIntro: data_
      },
      success(res) {
        console.log(res);
        wx.navigateBack();
      },
    })
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