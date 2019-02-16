// miniprogram/pages/settingPage/changeHeadImg/changeheadImg.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleId:'XCMkYsDR1TiNHHza',
    headImg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length!=0){
      console.log(options);
      this.setData({
        circleId:options.circleId,
      });
      wx.setStorageSync('changeImg', '')
    }

  },
  loadImg: function(){
    console.log('上传图片');
    let this_ = this;
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        console.log(chooseResult)
        wx.navigateTo({
          url: '../clipImg/clipImg?imgurl=' + chooseResult.tempFilePaths[0] + '&circleId=' + this_.data.circleId
        });
        return ;
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'changeBgImg/loadbgImg' + this_.data.circleId,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res);
            return;
            db.collection('all_circle').doc(this_.data.circleId).update({
              data:{
                headImg: res.fileID
              },
              success:res=>{
                console.log('修改成功');
                // wx.navigateBack();
              }
            })
          },
        })
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
    console.log(this.data.circleId);
    if (wx.getStorageSync('changeImg')){
      this.setData({
        headImg: decodeURIComponent(wx.getStorageSync('changeImg'))
      });
      setTimeout(()=>{
        wx.navigateBack()
      },1000)
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