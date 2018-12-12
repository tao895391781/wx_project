//控制遮罩的显示与隐藏
function controlMaskShow(obj){
    let that = getCurrentPages()[getCurrentPages().length - 1];//获取当前page实例 
    that.setData({
      showMask: obj
    });
};
module.exports = { controlMaskShow: controlMaskShow}