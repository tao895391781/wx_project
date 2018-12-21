// miniprogram/pages/home_newCircle/circleDetail/cicleDetail.js
const config = require('../../../config.js');
const ToastFun = require('../../../template/showToast/showToast.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleInfo:{},
    headImg:'',
    userInfo:{},
    circleType:[],
    changeCircle:{},
    circleTypelength:0,
    showToast: {
      duration: 1000,
      isShow: false,
      title: '',
      icon: '',
      mask: false
    },
    selectData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(options);
    options.selectData = JSON.parse(options.selectData);
    this.setData({
      selectData: options.selectData
    })
    if (Object.keys(options).length != 0){
      let opt = options.selectData;
      if(options.newName){
        opt.title = options.newName;
        this.setData({
          'showToast.title': '修改成功'
        });
        ToastFun.showToast(this.data.showToast);
      }
      this.setData({
        circleInfo: opt,
        changeCircle:opt.circleTag
      });
      console.log(this.data.circleInfo);
      let circleTyleList = [];
      if (options.selectCircleTag){

      }
      this.data.circleInfo.circleTag.forEach(v=>{
        circleTyleList.push(...v.options)
      });
      this.setData({
        circleType: circleTyleList,
        circleTypelength: circleTyleList.length
      });
      console.log(this.data.circleTypelength)
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
    if(userInfo.nickName.length > 2){
      userInfo.nickName = userInfo.nickName.substring(0,2)+'...'
    }
    this.setData({
      userInfo: userInfo
    })
    console.log(this.data.userInfo)

  },
  // 改变圈子的名字 / 类型
  changeCircleName: function(e){
    console.log(e.currentTarget.dataset)
    let that = this;
    wx.redirectTo({
      url: "../../../pages/home_newCircle/newCircle?selectdata=" + JSON.stringify(that.data.selectData) + '&type='+
        e.currentTarget.dataset.type
    })
  },
  //去编辑圈子介绍页
  goCircleIntroPage:function(){
    console.log('去编辑圈子介绍页')
    wx.navigateTo({
      url: "../../../pages/home_newCircle/circleDetail/circleIntro/circleIntro"
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