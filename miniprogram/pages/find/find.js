// miniprogram/pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    circular:true,
    interval:5000,
    duration:500,
    imgUrls: [],
    findblock:[{
        title:'推荐',
        icon:'icon-tuijian',
      color:'#69b1fe'
    },{
        title: '外语',
        icon: 'icon-ab',
        color: '#fd5557'
      },{
        title: '阅读',
        icon: 'icon-yuedu',
        color: '#46dddd'
      },{
        title: '生活',
        icon: 'icon-shenghuo-',
        color: '#ffbb50'
      },{
        title: '教育',
        icon: 'icon-jiaoyu',
        color: '#9a7cff'
      },{
        title: '亲子幼教',
        icon: 'icon-qinzi',
        color: '#ffbb50'
      },{
        title: '艺术兴趣',
        icon: 'icon-yishu',
        color: '#69b1fe'
      },{
        title: '变美',
        icon: 'icon-meizhuang',
        color: '#9a7cff'
      },{
        title: '运动',
        icon: 'icon-yundong',
        color: '#fd5557'
      },{
        title: '职场',
        icon: 'icon-gongzuozhichang',
        color: '#46dddd'
      }],
      circleList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取发现页面--banner图
    wx.cloud.getTempFileURL({
      fileList: ['cloud://depend-efd532.6465-depend-efd532/imgs/t012bbb99f4f21b995b.jpg',
        'cloud://depend-efd532.6465-depend-efd532/imgs/t01e0f8cb0db66541a8.jpg',
        'cloud://depend-efd532.6465-depend-efd532/imgs/t011a5fa7f7b30dc506.jpg',
      ],
      success: res => {
        // fileList 是一个有如下结构的对象数组
        // [{
        //    fileID: 'cloud://xxx.png', // 文件 ID
        //    tempFileURL: '', // 临时文件网络链接
        //    maxAge: 120 * 60 * 1000, // 有效期
        // }]
        console.log(res.fileList);
        let urlList = [];
        res.fileList.forEach((v,index)=>{
          urlList.push(v.tempFileURL);
          this.setData({
            imgUrls: urlList
          })
        });
      },
      fail: console.error
    });
    //获取发现页--圈子列表
    const db = wx.cloud.database();
    db.collection('find').limit(10).get().then(res=>{
      console.log(res);
      this.setData({
        circleList:res.data
      })
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