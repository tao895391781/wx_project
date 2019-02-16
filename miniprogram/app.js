//app.js
App({
  onLaunch: function () {
    let that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log('初始化')
      wx.cloud.init({
        traceUser: true,
      })
    }
        wx.getUserInfo({
          success:function(res){
            console.log(res);
            wx.cloud.callFunction({
              name: 'login',
              complete: res1 => {
                console.log(res1);
                let userInfo = {
                  "nickName": res.userInfo.nickName,
                  "avatarUrl": encodeURIComponent(res.userInfo.avatarUrl),
                  "openid": res1.result.openid
                };
                wx.setStorageSync('userInfo', JSON.stringify(userInfo));
                that.globalData.userInfo = res.userInfo;
              }
            });
          },
        })
    this.globalData = {
      userInfo:{},
      showToast: {
        duration: 1000,
        isShow: false,
        title: '',
        icon: '',
        mask: false
      },
      db:wx.cloud.database()
    }
  }
})
