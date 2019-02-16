const db = wx.cloud.database();
//添加数据
function addData(name,data){
  db.collection('add_mediaData').add({
    data: {

    },
    success(res) {
      console.log(res)
    },
  },
  )
};