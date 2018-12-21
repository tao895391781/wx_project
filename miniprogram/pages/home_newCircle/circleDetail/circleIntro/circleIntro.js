// miniprogram/pages/home_newCircle/circleDetail/circleIntro/circleIntro.js
const db = wx.cloud.database();
const ToastFun = require('../../../../template/showToast/showToast.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaContents:[],
    saveData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let ifsaveSuccess = [];
    let data_ = [];
    let this_=  this;
    data.forEach(v=>{
      if(v.type == 'record' && v.content){
        data_.push(1);
        db.collection('add_mediaData').add({
          data: {
            type: v.type,
            content: v.content,
            duration:v.duration
          },
          success(res) {
            console.log(res);
            this_.checkSuccess(ifsaveSuccess, data_)
          },
        })
      }else{
        if (v.content){
          data_.push(1);
          db.collection('add_mediaData').add({
            data: {
              type: v.type,
              content: v.content
            },
            success(res) {
              console.log(res);
              this_.checkSuccess(ifsaveSuccess, data_)
            },
          })
        }
      }
    });
    if(data_.length == 0){
      wx.redirectTo({
        url: "../../../../pages/home_newCircle/circleDetail/cicleDetail",
      })
    }
   
  },
  checkSuccess: function(arr,arr1){
    arr.push(1);
    if (arr.length == arr1.length) {
      console.log('保存成功');
      app.globalData.showToast.title = '保存成功'
      console.log(app.globalData.showToast)
      ToastFun.showToast(app.globalData.showToast);
      wx.redirectTo({
        url: "../../../../pages/home_newCircle/circleDetail/cicleDetail",
      })
    }
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