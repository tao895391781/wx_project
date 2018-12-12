// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeCircleList:[],
    scrollWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log(JSON.parse(wx.getStorageSync('userInfo')))
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          scrollWidth: res.windowWidth + 'px'
        })
      },
    });
    //获取首页我的圈子
 wx.cloud.callFunction({
   name:'getHomeMycircle',
   data:{},
   complete:res=>{
     let nullArr = [].concat(res.result.data);
     let imgIds = [];
     let texti = 12;
     nullArr.forEach(v => {
       if (v.name.length > texti) {
         v.name = v.name.slice(0, texti) + '...';
       }
       imgIds.push(v.bgImg);
     });
     let nullcircle = [].concat(res.result.data);
     wx.cloud.getTempFileURL({
       fileList: imgIds,
       success: res1 => {
         nullcircle.forEach((v, index) => {
           v.bgImg = res1.fileList[index].tempFileURL;
         });
         this.setData({
           homeCircleList: nullcircle
         });
       }
     });
     this.setData({
       homeCircleList: nullArr
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
  // 组件相关函数
  newCircle: function(){
    console.log('新建圈子');
    wx.navigateTo({
      url: '../../pages/home_newCircle/newCircle'
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  textHidden:function(text) {
    let i = 12;
    if(text.length >i){
      return text.Substring(0, i)+'...';
    }else{
      return text;
    }
  },
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