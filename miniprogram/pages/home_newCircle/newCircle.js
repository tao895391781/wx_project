// miniprogram/pages/newCircle/newCircle.js
//控制圈子分类选择标签
const ToastFun = require('../../template/showToast.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showCircle:false,
    valueText:'',
    switchColor:'#1aaba8',
    switchCheck:false,
    BtnDisabled:true,
    bgc:'',
    color:'',
    selectCircleData:[],
    indexs:-1,
    flag:true,
    ctrShowList:[],
    ctrOptionList:[],
    disabled: false,
    showToast: {
      duration:1000,
      isShow:false,
      title:'',
      icon:'',
      mask:false
    },
    threeMore:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getSelectCircle',
      data: {},
      complete: res => {
        console.log(this)
        console.log(res.result.data)
        this.setData({
          selectCircleData: res.result.data
        });
        let arrFlag = [];
        this.data.selectCircleData.forEach(v=>{
          arrFlag.push(v.ctrShow)
        });
        this.setData({
          ctrShowList: arrFlag
        });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 控制 新建圈子的下的标签显示与隐藏
  showOption:function(event){
    let index = event.currentTarget.dataset.index;
    let ctrShowlist = [].concat(this.data.selectCircleData)
    if (!this.data.selectCircleData[index].ctrShow){
      ctrShowlist.map(v=> {
        v.ctrShow = false;
      });
      ctrShowlist[index].ctrShow = true;
      console.log(ctrShowlist)
      this.setData({
        selectCircleData: ctrShowlist
      });
    }else{
      ctrShowlist.map(v =>v.ctrShow = false);
      this.setData({
        selectCircleData: ctrShowlist
      });
    };
  },
  checkOption:function(e){
    let index = e.currentTarget.dataset.index;
    let indexs = e.currentTarget.dataset.indexs;
    let thisIndex = 'selectCircleData['+index+'].options['+indexs+'].flag';
    let that = this;
    let i = this.data.threeMore;
    if (!this.data.selectCircleData[index].options[indexs].flag) {
        if (this.data.threeMore>2){
          this.setData({
            'showToast.title': '最多只能选择三个标签'
          })
          ToastFun.showToast(this.data.showToast);
        }else{  
          i++;
          this.setData({
            [thisIndex]: true,
            threeMore:i
          });
        }
    }else{
      i--
      this.setData({
        [thisIndex]: false,
        threeMore: i
      });
    };
    console.log(this.data.selectCircleData);
  },
  filterselectOpt:function(lists){
      

  },
  nextStep:function(){
    console.log('下一步');
    this.setData({
      showCircle:false
    });
    wx.cloud.callFunction({
      name:'getSelectCircle',
      data:{},
      complete:res=>{
        console.log(this)
        this.setData({
          selectCircleData:res.result.data
        })
      }
    });
  },
  inputValues:function(e){
    console.log(e.detail.value);
    if (e.detail.value !=''){
      this.setData({
        BtnDisabled:false,
        bgc:'#1aaba8',
        color: '#fff'
      }); 
    }else{
      this.setData({
        BtnDisabled: true
      }); 
    }
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    this.setData({
      switchCheck: e.detail.value
    }); 
  },
  // 选完标签进行下一步
  nextStep: function(){

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