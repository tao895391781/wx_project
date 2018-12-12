// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database();
exports.main = async (event, context) => {
 return {
   data:await db.collection('find').skip(event.m).limit(10).get(),
   total: await db.collection('find').count()
 };
}