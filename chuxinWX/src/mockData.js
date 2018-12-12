import Mock from 'mockjs'
Mock.setup({ timeout: 1000 })
let Random = Mock.Random;
let club = ['挑战营','精读营课'];
let topic = ['九月我的阅读我做主阅读挑战营','探索世界精读营课']
let data = Mock.mock({
	'data1|10':[{
		bookName:'假话国历险记',
		version:'儿童版',
		thumbUp:345,
		adviceReadDay:123,
		imgSrc:()=>Random.image(),
}],
	'data2|5':[{
		bookName:'爱丽丝梦游仙境',
		version:'青少年版',
		thumbUp:6578,
		adviceReadDay:100,
		imgSrc:()=>Random.image(),
}],
	'data3|20':[{
		bookName:'西游记后传',
		version:'青少年版',
		thumbUp:666,
		adviceReadDay:666,
		imgSrc:()=>Random.image(),
}],
'data4|8':[{
		bookName:'怎么可以吃兔兔',
		version:'卖萌版',
		thumbUp:666,
		adviceReadDay:666,
		imgSrc:()=>Random.image(),
}],
'data5|5':[{
	"topic":'友谊与爱主题名著导读',
	"AdviseAge":'8-10岁',
	"grade":'2-3年级',
	"bookName|3":[{bookname:'友谊与爱',version:'北京出版社'}],
	"readTime":'12:00-14:00'
}],
'data6|4':[{
	"topic":'友谊与爱主题名著导读',
	"booklist|4":[{
		imgSrc:()=>Random.image(),
		"readDate":'6-28-7-04',
		"readProgress":'0/6',
		'bookName':'兔子坡'
	}],
	

}],
'data7|4':[{
	"topic":'和平主题名著导读',
	"booklist|4":[{
		imgSrc:()=>Random.image(),
		"readDate":'6-28-7-04',
		"readProgress":'0/6',
		'bookName':'兔子坡'
	}],
}],
'data8':[{
	"bookName":"水浒传",
	"node":1,
	"picId":"4eae6a9a-f0ae-4193-bfcf-bef9b9ecfdad",
	"watchHistory|10":[
		{
		date:1535270220000,
		"timeLength|654-1003":1
		}
		
		]
	
}],
'data9':{
	'running':{
		"imgSrc":"4eae6a9a-f0ae-4193-bfcf-bef9b9ecfdad",
		"change|1":club,
		"topic|1":topic,
		"bookItem":'共2本书',
		"date":'8.10-8.20'
	},
	'finish':{
		"imgSrc":"4eae6a9a-f0ae-4193-bfcf-bef9b9ecfdad",
		"change|1":club,
		"topic|1":topic,
		"bookItem":'共2本书',
		"date":'8.10-8.20'
	},
	'noBegin':{
		"imgSrc":"4eae6a9a-f0ae-4193-bfcf-bef9b9ecfdad",
		"change|1":club,
		"topic|1":topic,
		"bookItem":'共2本书',
		"date":'8.10-8.20'
	},
},
'data10':{
	dates:[1,2,3,4,56,10,12,122,1223,123,1231,112,111,1,1,11,1,1,1,1,],
	times:[5,10,15,20,30,40,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,11,1]
},
'data11':{
	discountId:1
},
'data12':{
	status:'未领取',
},
'data13':{
	id:'成长的烦恼名著精读营',
	grade:'2-3年级',
	bookName:'长袜子皮皮',
	readDays:123,
	classType:'精读营课',
	price:999,
	bookList:[{
		bookName:'书本一',
		readDays:12,
	},{
		bookName:'书本二',
		readDays:12,
	}]
},
});

Mock.mock('/api/getCommendBookList',(req,res)=>{
	return {
		data:data.data1
	}
});
Mock.mock('/api/getClubBookList',(req,res)=>{
	return {
		data:data.data2
	}
});
Mock.mock('/api/getGradeBookList',(req,res)=>{
	return {
		data:data.data3
	}
}),
Mock.mock('/api/getClubBookListB',(req,res)=>{
	return {
		data:data.data4
	}
}),
Mock.mock('/api/getSelectBookList',(req,res)=>{
	return {
		data:data.data5
	}
}),
Mock.mock('/api/getMyBuyCourse/0',(req,res)=>{
		return {
			data:data.data6
		}
	
}),
Mock.mock('/api/getMyBuyCourse/1',(req,res)=>{
		return {
			data:data.data7
		}
	
})
Mock.mock('/api/getDate','get',data.data8);
Mock.mock('/api/getCourse','get',data.data9);
Mock.mock('/api/getMyAchiev','get',data.data10);
Mock.mock('/api/getDiscountId','post',data.data11);
Mock.mock('/api/getDiscountStatus','get',data.data12);
Mock.mock('/api/getInfoCollectData','get',data.data13);



