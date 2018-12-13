//去空格
const formatString = function (str) {
  console.log(str)
  if (typeof (str) != "string") {
      console.log('去除回车换行空格失败！参数不是字符串类型');
      return; 
     }
      str = str.replace(/\ +/g, "");
      //去掉空格 
      str = str.replace(/[\r\n]/g, "");//去掉回车换行 
      return str; 
    };
    //取用户信息
    const getUserInfo = function(){
      let userInfo = wx.getStorageSync('userInfo');
      let userInfo_1 = JSON.parse(userInfo);
      userInfo_1.avatarUrl = decodeURIComponent(userInfo_1.avatarUrl);
      return userInfo_1;
    };
module.exports = { formatString: formatString, getUserInfo: getUserInfo}