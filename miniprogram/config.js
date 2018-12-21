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
    // 向上/向下移动
    const moveTopOrmoveBottom = function(newarr,index,direction){
      if(direction == 'top'){
        newarr[index - 1] = newarr.splice(index, 1, newarr[index - 1])[0];
        return newarr;
      } else if (direction == 'bottom'){
        newarr[index + 1] = newarr.splice(index, 1, newarr[index + 1])[0];
      }
    };
    //秒转换成分秒
    const timeTransform = function(time){
        let min = Math.floor(time / 60 % 60);
        let sec = Math.floor(time % 60);
        return (min > 9 ? min : '0' + min ) + ':' + (sec > 9 ? sec : '0' + sec)
    }; 
module.exports = { formatString, getUserInfo, moveTopOrmoveBottom, timeTransform}