// miniprogram/pages/newCircle/newCircle.js
//控制圈子分类选择标签
const ToastFun = require('../../template/showToast/showToast.js')
const showmasks = require('../../template/mask/mask.js')
const userInfo = require('../../config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showCircle:true,
    valueText:'',
    switchColor:'#1aaba8',
    switchCheck:false,
    BtnDisabled:true,
    showNextstep:true,
    bgc:'',
    color:'',
    selectCircleData:[],
    indexs:-1,
    flag:true,
    ctrShowList:[],
    ctrOptionList:[],
    disabled: true,
    showToast: {
      duration:1000,
      isShow:false,
      title:'',
      icon:'',
      mask:false
    },
    showMask:false,
    threeMore:0,
    holdplace:"line-height: 70rpx;font-size: 32rpx",
    selfValueTag:'',
    selfValueTag_1:'',
    showSelfTags:false,
    ifFirstSelfTags:false,
    selectOptions:[],
    showNextsteps: true,
    selectD:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(Object.keys(options).length != 0){
      let options_ = JSON.parse(options.selectdata);
      if (options.type == 'name') {
        this.setData({
          valueText: userInfo.getUserInfo().nickName + '的圈子',
          showNextstep: false,
          BtnDisabled: false,
          selectD: options_
        });
        wx.setNavigationBarTitle({
          title: '修改圈子名称'
        })
      } else if (options.type == 'tags') {
        this.setData({
          showCircle: false,
          showNextsteps: false,
          disabled: false,
          selectD: options_,
          ifFirstSelfTags:true
        });

        wx.showLoading({
          title: '加载中',
        })
        console.log(options_)
        this.getCircle('seting', options_);
    }
    } else {
      this.getCircle('noseting');
    }
   
   
  },
//获取圈子信息
getCircle: function(sets,options){
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
      this.data.selectCircleData.forEach(v => {
        arrFlag.push(v.ctrShow)
      });
      this.setData({
        ctrShowList: arrFlag
      });
      wx.hideLoading();
      if(sets == 'seting'){
        console.log(options)
        this.setCirclrtype(options);
      }
    }
  });
},
//初始化改变圈子标签的数据
setCirclrtype: function(options){
  let circleType = options.circleTag;
  let selectList = [].concat(this.data.selectCircleData);
  let threeMore = [];
  circleType.forEach(v=>{
    if(v.title == '自定义'){
      threeMore.push(v);
      this.setData({
        selfValueTag: v.options
      })
    }
    selectList.forEach(v1=>{
      if(v.title == v1.title){
          v.options.forEach(v2=>{
            v1.options.forEach(v3=>{
              if(v2 == v3.value){
                v3.flag = true;
                threeMore.push(v3)
              }
            })
          })
        }
    })
  })

    console.log(threeMore)
    this.setData({
        selectCircleData: selectList,
        threeMore: threeMore.length
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
  // 控制 新建圈子的下的标签显示与隐藏
  showOption:function(event){
    let index = event.currentTarget.dataset.index;
    let ctrShowlist = [].concat(this.data.selectCircleData);
      if (!this.data.selectCircleData[index].ctrShow) {
        ctrShowlist.map(v => {
          v.ctrShow = false;
        });
        ctrShowlist[index].ctrShow = true;
        console.log(ctrShowlist)
        this.setData({
          selectCircleData: ctrShowlist
        });
      } else {
        ctrShowlist.map(v => v.ctrShow = false);
        this.setData({
          selectCircleData: ctrShowlist
        });
      };
  },
  //自定义标签点击
  selfOptionTags: function(){
    console.log('这是自定义标签');
    console.log(this.data.threeMore);
    if (this.data.threeMore > 2 && this.data.selfValueTag.length == 0) {
      this.setData({
        'showToast.title': '最多只能选择三个标签'
      });
      ToastFun.showToast(this.data.showToast);
    }else{
      showmasks.controlMaskShow(true);
      this.setData({
        showSelfTags: true
      });
    }
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
        };
    }else{
      i--
      this.setData({
        [thisIndex]: false,
        threeMore: i
      });
    };
    this.checIfkDisabled();

  },
  checIfkDisabled:function(){
    if (this.data.threeMore == 0) {
      this.setData({
        disabled: true
      })
    } else {
      this.setData({
        disabled: false
      })
    }
  },
  nextStep:function(){
    this.setData({
      showCircle:false
    });
    wx.cloud.callFunction({
      name:'getSelectCircle',
      data:{},
      complete:res=>{
        this.setData({
          selectCircleData:res.result.data,
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '选择圈子标签'//页面标题为路由参数
    })
  },
  inputValues:function(e){
    console.log(e.detail.value)
    if (e.detail.value !=''){
      this.setData({
        BtnDisabled:false,
        bgc:'#1aaba8',
        color: '#fff',
        valueText:e.detail.value
      }); 
    }else{
      this.setData({
        BtnDisabled: true,
        bgc: '#f1f1f1',
        color: '#dadada',
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
  nextSteps: function(e){
    console.log('选完标签下一步');
    let selectOpt = [];
    let arr = this.data.selectCircleData
    for (let i = 0; i < arr.length;i++){
        for(let j = 0;j<arr[i].options.length;j++){
          if (arr[i].options[j].flag){
            let options = []; 
            options.push(arr[i].options[j].value);
            if (selectOpt.length == 0){
              selectOpt.push({
                title: arr[i].title,
                options: options
              });
            }else{
              selectOpt.forEach(v => {
                if (v.title == arr[i].title) {
                  v.options.push(...options);
                } else {
                  selectOpt.push({
                    title: arr[i].title,
                    options: options
                  });
                }
              }) 
            }
            continue;
          }
        }
   };
    if (this.data.selfValueTag!=''){
      selectOpt.push({
        title:'自定义',
        options: [this.data.selfValueTag]
      }) 
    }
      let submitData = {
        circleName: this.data.valueText,
        circleTag: selectOpt,
        ifPrivate:this.data.switchCheck
      };
    console.log(submitData);
    let selectData = {
      title: this.data.valueText,
      circleTag: selectOpt
    }
    console.log(this.data.selectD);
    console.log(e.target.dataset.next)
    if(e.target.dataset.next == 'next'){
      if (Object.keys(this.data.selectD).length != 0){
        selectData.circleTag = this.data.selectD.circleTag;
      }
        console.log(selectData);
         wx.redirectTo({
      url: '../../pages/home_newCircle/circleDetail/cicleDetail?selectData=' + JSON.stringify(selectData)
    });
    } else if (e.target.dataset.next == 'save'){
      if (Object.keys(this.data.selectD).length != 0) {
        selectData.title = this.data.selectD.title;
      }
      console.log(selectData)
      wx.redirectTo({
        url: '../../pages/home_newCircle/circleDetail/cicleDetail?selectData=' + JSON.stringify(selectData)
      });
    }

  },
  //改变圈子标签后保存
  saveSteps: function(){

  },
  //绑定input的值
  bindKeyInput: function(e){
    this.setData({
      selfValueTag_1: e.detail.value,
    })
  },
  sureSelf: function(e){
    let that = this;
    if (e.target.dataset.values) {
        console.log('确定');
        let j = this.data.threeMore;
        if (this.data.selfValueTag_1.length > 0) {
          if(!this.data.ifFirstSelfTags){
            j++;
          }
          this.setData({
            threeMore: j,
            ifFirstSelfTags:true,
            selfValueTag: that.data.selfValueTag_1

          });
        } else{
            console.log('取消');
            if (this.data.ifFirstSelfTags){
              j--;
              this.setData({
                threeMore: j,
                selfValueTag: '',
              });
            }
        }
      }
    showmasks.controlMaskShow(false);
    this.setData({
      showSelfTags: false
    });
    this.checIfkDisabled();
    console.log(this.data.selfValueTag)
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