// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
"use strict";
import Vue from 'vue';
import App from './App'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import ip from './ip.js'
import axios from 'axios'
import { bus } from './bus.js'
import wx from 'weixin-js-sdk'
import http from '../src/service/http.js'
import VueVideoPlayer from 'vue-video-player'
import './assets/reset.css'
import './assets/unite.less'
import './assets/vue-material.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/material-icons.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  {mixin} from './mixins.js'
import BScroll from'better-scroll'
import VueLazyload from 'vue-lazyload'
Vue.mixin(mixin)

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// require('./mockData.js')

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
 Vue.use(ElementUI)
 Vue.use(VueVideoPlayer);
 Vue.use(VueLazyload,{
  lazyComponent: true
})
 let echarts = require('echarts/lib/echarts');
 require('echarts/lib/chart/bar');
// import Mock from 'mockjs'
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.config.devtools = false; //开启调试
Vue.config.silent = false;   //true取消警告


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
console.log(axios.defaults.headers)
// Vue.configs.productionTip = false;
// Vue.configs.devtools = false; //开启调试
// Vue.configs.silent = false;   //true取消警告
Vue.prototype.ip=ip;
Vue.prototype.axios=axios;

//验证是否关注关注
Vue.prototype.isfollow = false;
//全局使用echarts
Vue.prototype.echarts = echarts;
Vue.prototype.BScroll = BScroll;

global.$http = http;
global.$ip = ip;
let { MdSpinner ,MdButton ,MdInput ,MdBottomBar ,MdMenu ,MdIcon ,install} = VueMaterial;
let componentList={
	MdSpinner:MdSpinner,
	MdInput:MdInput,
	MdBottomBar:MdBottomBar,
	MdMenu:MdMenu,
	MdIcon:MdIcon,
	install:install
};

Vue.use(componentList);
//注册主题
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
/* eslint-disable no-new */
//jssdk配置
let getWxinfo =function(str){
let u={
      openid: "o76bqv9jetyLMDUBy6wEcEUmdrOE",
      // openid:'o76bqv76lieFkzYY7FuhndxiZgF8',
      nickname: "tll丶",
      headimgurl:  "http://thirdwx.qlogo.cn/mmopen/vi_32/Xicz47qTAJicfCqEWkbBUy1ict5etUf0B7IMASC1FVaiagon0hxrHfNyrja4313vCu4BIljFfPVYvFeibTEZNiciaiabGA/132"
      }
    sessionStorage.setItem('u',JSON.stringify(u));  
    console.log(sessionStorage.getItem('u'))
    bus.$emit(str);
};

let wxconfigs = function(str){
//   微信网页授权
// 去掉地址中不需要的code等参数
console.log('进入微信授权')
  function s(x){if(x.indexOf('?')!=-1){return x.split('?')[0]+'#'+x.split('#')[1]}else{return x}}
  
  if(sessionStorage.getItem('u')){
    //存了个人信息就不去取个人信息和授权页面
    // bus.$emit('follow');
    console.log('存了个人信息')
  }else if(window.location.search.indexOf('?code=')!=-1 ){
    
    console.log('如果有code并没有个人信息，就去获取个人信息并存sessionstorage');
    console.log('url11111111111111:'+window.location.href.split('?code=')[1].split('&')[0]);
      let href  = window.location.href.split('?code=')[1].split('&')[0];
    $http.get('getUserInfo/'+href)
      .then(function (ires){

        console.log('获取的个人信息');
        console.log(ires);
        sessionStorage.setItem('u',JSON.stringify(ires.data));
        console.log(sessionStorage.getItem('u'))
        var emitmsg = str == 'sessionSuccessStup' ? str  : 'sessionSuccess';
        bus.$emit(emitmsg);

        // $http.get('getUserInfoByOpenId/'+ires.data.openid)
        //   .then(function (res) {
        //     console.log('获取的验证是否关注');
        //     console.log(res);
        //     Vue.prototype.isfollow=Boolean(res.data.subscribe);
        //     bus.$emit('follow');  
        //   })
        //   .catch(function (err) {
        //     console.log(err);
        //     bus.$emit('closeloading');
        //     // bus.$emit("tipmsg",'服务器报错!');
        //   })
        
      })
      .catch(function (err) {
        console.log(err);
        bus.$emit('closeloading');
        // bus.$emit("tipmsg",'服务器报错!');
      })
  }else if(window.location.search.indexOf('?code=')==-1 ){
    console.log('如果没有个人信息也没code就去授权');
    console.log(window.location.href);
    
    var backurl=s(window.location.href);
    console.log(backurl);
    $http.get('getAuthUrlEncode',{
      url:backurl
    })
    .then(function (res) {
      console.log('asd');
      console.log(res);
      window.location=res.data;
    })
    .catch(function (err) {
      console.log(err);
      bus.$emit('closeloading');
      // bus.$emit("tipmsg",'服务器报错！');
          })
       }
    };

    
//验证用户是否关注公众号
  let ifFollow = function(){
  if(sessionStorage.getItem('u')){
    //存了个人信息不进行操作
    Vue.prototype.isfollow = true;
    bus.$emit('follow');
    }else if(window.location.href.indexOf('?code=')!=-1){
    let href  = window.location.href.split('?code=')[1].split('&')[0];
    console.log('code:'+href);
    $http.get('getUserInfo/'+href)
    .then(res=>{
      console.log('从邀请页面进来获取的个人信息');
      console.log(res.data);
      sessionStorage.setItem('u',JSON.stringify(res.data));
      console.log(sessionStorage.getItem('u'));
        })
      }
  };

  let wxconfig = function (str,courseId,bookid){
  console.log('进入微信配置');
  function s(x){if(x.indexOf('?')!=-1){return x.split('?')[0]+'#'+x.split('#')[1]}else{return x}}
  console.log(window.location.href.split('#')[0])
  $http.get('jsApiTicket',{
    url:window.location.href.split('#')[0]
  }).then(function(res){
    console.log('获取的配置信息');
    console.log(res);
    wx.config({
       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
       appId: res.data.appId, // 必填，公众号的唯一标识
       timestamp: res.data.timestamp, // 必填，生成签名的时间戳
       nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
       signature: res.data.signature,// 必填，签名，见附录1
       jsApiList: [
       'startRecord','stopRecord','onVoiceRecordEnd',
       'playVoice','pauseVoice','stopVoice','onVoicePlayEnd',
       'translateVoice','uploadVoice',
       'chooseImage','uploadImage','downloadImage','getLocalImgData',
       'previewImage','updateTimelineShareData','updateAppMessageShareData','chooseWXPay'], //要使用的js接口
    })

  }).catch(function(err){
    console.log("(999999"+err); 
  })
  ///分享给朋友
  console.log($ip.RESTPATH3+'/weixin/index.html#/bisai')
  console.log(this.$store.state.shareTitle)
  var titles=this.$store.state.shareTitle;
  var ids=sessionStorage.getItem('ids');//存储的参数
  var title=this.$store.state.shareTitle;
  wx.ready(function(){
    global.WX=wx;
    if(str=='invited'){
      bus.$emit('invited');
    }else if(str=='newsharepage'){
      console.log('分享海报')
       bus.$emit('sharePosterA');

    }else if(str == 'askq'){
      console.log('分享')
      wx.updateAppMessageShareData({
      title:titles, 
      desc: '答题瓜分奖金，微信红包派送！—文升，引导阅读',
      link: ids==1?'http://www.wsreading.com/wensheng.jpg':'http://www.wsreading.com/yuanzhou.jpg', 
      imgUrl:'http://resource.wsreading.com/file/20180207/40e7f817-6ef2-41d1-8528-86ef7c6b461a/sharess.png', 
      success: function () {
      console.log('分享success')
      let openid=JSON.parse(sessionStorage.getItem('u'))['openid'];
      let code=sessionStorage.getItem('classcode');
      axios.post($ip.RESTPATH+'rest/postShareTimeByOpenIdAndCode',{
        name:openid,
        code:code,
        })
      .then(res=>{
        console.log(res)
        })
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
    });
     //分享到朋友圈
     wx.updateTimelineShareData({
      title: titles, 
      link: ids==1?'http://www.wsreading.com/wensheng.jpg':'http://www.wsreading.com/yuanzhou.jpg', 
      imgUrl:'http://resource.wsreading.com/file/20180207/40e7f817-6ef2-41d1-8528-86ef7c6b461a/sharess.png', 
      fail: function (res) {
        alert(JSON.stringify(res));
      },
       success: function () {
      let openid=JSON.parse(sessionStorage.getItem('u'))['openid'];
      let code=sessionStorage.getItem('classcode');
      axios.post($ip.RESTPATH+'rest/postShareTimeByOpenIdAndCode',{
        name:openid,
        code:code,
      })
      .then(res=>{
        console.log(res)
      })
        console.log('分享success')
    // 用户确认分享后执行的回调函数
},
    });

wx.hideMenuItems({
      // menuList:['menuItem:copyUrl']
    });
}  
    global.WX=wx;
  });
  wx.error(function(res){
    console.log(res)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
}
Vue.prototype.config = wxconfig;
Vue.prototype.configs = wxconfigs;
// Vue.prototype.requestTimeout = requestTimeout;
Vue.prototype.ifFollows = ifFollow;
Vue.prototype.getWxinfo = getWxinfo;
// Vue.configs.productionTip = false;
// Vue.configs.devtools = false;
Vue.config.productionTip = false;
Vue.config.devtools = false;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
