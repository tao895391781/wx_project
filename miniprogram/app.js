//app.js
App({
  onLaunch: function () {
    let that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.login({
      success(res) {
        console.log(res)
        wx.getUserInfo({
          success:function(res){
            console.log(res);
            let userInfo = {
              "nickName":res.userInfo.nickName,
              "avatarUrl": encodeURIComponent(res.userInfo.avatarUrl)
            }
            wx.setStorageSync('userInfo', JSON.stringify(userInfo));
            that.globalData.userInfo = res.userInfo;
          },
        })
      }
    })
    this.globalData = {
      userInfo:{},
    }
  }
})
