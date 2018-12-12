<template>
<div id="myself" v-if='showbox'>
	<transition name="slide-fade">
		<section class="myschoolship" v-show='schoolship'>
			<!-- <i class="iconfont" @click='schoolship=false'>&#xe633;</i> -->
			<p>奖学金适用于报名缴费时冲抵相应金额学费,奖学金不兑现不退费；
			</p>
		</section>
	</transition>
	<transition name="slide-fade">
		<section v-show='aboutschoolship' class="myschoolship">
			<!-- <i class="iconfont" @click='aboutschoolship=false'>&#xe633;</i> -->
			<p>活动暂未开启,敬请期待！</p>
		</section>
	</transition>
	<header>
		<div class="head_portrait" @change="uploadAvatar">
			<div>
				<img :src="picPath?picPath:defaultPicpath">	
			</div>
			<input type="file" >
		</div>
		<p class="fname" @click="gosetting">{{fullname}}</p>
	</header>
	<section>
		<p class="myreward">你坚持学习了&nbsp;<span>{{total.times}}</span>&nbsp;天</p>
		<p class="myreward">提交了&nbsp;<span>{{total.readTimes}}</span>&nbsp;次阅读任务<span>&nbsp;{{total.writeTimes}}&nbsp;</span>次写作任务</p>
		<p class="myreward">你的作业总积分为 &nbsp;<span>{{total.score}}</span>&nbsp;分</p>
		<p class="myreward">你的幸运总积分为 &nbsp;<span>{{total.lunckScores}}</span> &nbsp;分</p>
		<p class="myreward">你累计获得的奖励&nbsp;<span>{{money}}</span>&nbsp;元</p>
	</section>	
	<div class="img">
		<div class="img1">
			<img src="../../../static/ooo.jpg" alt="loading">
			<p>文升阅读奖学金<br>
				<span>{{money}}￥</span>
			</p>
		</div>	
		<div class="img1">
			<img src="../../../static/ooo.jpg" alt="loading">
			<p>文升阅读课时<br>
					&nbsp;&nbsp;<span>暂未开放！</span>&nbsp;&nbsp;<br>
					<!-- 课时 -->
			</p>
		</div>
	</div>
	<div class="about">
		<p @click='showschoolship'>关于奖学金</p>
		<p @click='aboutschoolships'>关于奖励课时</p>
	</div>
	
</div>
</template>
<script>
	import { bus } from '../../bus.js';
	export default {
	  data() {
	  	return {
	  		score:0,
	  		picPath:'',
	  		defaultPicpath:require('../../assets/images/defaultAvatar.jpg'),
	  		fullname:'匿名用户',
	  		total:'',
	  		showbox:false,
	  		flag:true,
	  		flags:true,
	  		schoolship:false,

	  		aboutschoolship:false,
	  	}
	  },
	  computed:{
	  	money(){
	  		return Math.floor((this.total.score+this.total.lunckScores)/10)*5
	  	}
	  },
	  methods: {
	  	aboutschoolships(){
	  	
	  		this.schoolship=false;
	  		
	  		
	  		if(this.flag){
					this.aboutschoolship=true;
					this.flag=false;
				} else if(!this.flag){
					this.aboutschoolship=false;
					this.flag=true;
				}
	  	},
	  	showschoolship(){
	  		
	  			this.aboutschoolship=false;
	  		
	  			if(this.flags){
					this.schoolship=true;
					this.flags=false;
				} else if(!this.flags){
					this.schoolship=false;
					this.flags=true;
				}
	  	},
	  	goclass(){
	  		this.$router.push({name:'Mclass'})
	  	},
	  	gosetting(){
	  		this.$router.push({name:'Msetting'})
	  	},
	  	uploadAvatar(e){
	  		var _this=this;
	  		var USERID = sessionStorage.getItem('i');

	  		bus.$emit('loading')

	  		let file = e.target.files[0]; 
	  	    let param = new FormData(); //创建form对象
	   	    param.append('file',file,file.name);//通过append向form对象添加数据
	   	    console.log('objobjobj');
	  		console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
	  		let config = {
              headers:{'Content-Type':'multipart/form-data'}
	         };
	  		_this.axios.post(_this.ip.filePath+'rest/upload',param,config)
	  		.then(function(res){    
	  		    console.log('第一次上传成功的返回值');
	  		    console.log(res);
	  		    _this.axios({
	  		        method:'get',
	  		        url:res.headers.location
	  		    })
	  		    .then(function(res){
	  		        var picId=res.data.attachments[0].createDate.substr(0,10).split('-').join('')+'/'+res.data.attachments[0].uuid+'/'+res.data.attachments[0].attaName;
	  		      
	  		        _this.axios({                 
	  		            method:'post',
	  		            url:_this.ip.RESTPATH1+'rest/postPicByUserId',
	  		            data:{
	  		                'userId':USERID,
	  		                'picId':picId
	  		            }
	  		        })
	  		        .then(function(res){
	  		        	if(res.data.flag){
	  		        		//图片上传成功
	  		        		_this.picPath=_this.ip.filePath+picId
	  		        		bus.$emit('closeloading');
	  		        	}
	  		        })
	  		        .catch(function(err){console.log('报错3');})
	  		    })
	  		    .catch(function(err){
	  		        console.log('报错2');
	  		    })
	  		})
	  		.catch(function(err){console.log('报错1');})
	  	}
	  },
	  created:function () {
	  	const USERID = sessionStorage.getItem('i');
	  	var _this=this;
	  	_this.fullname=sessionStorage.getItem('fn')?sessionStorage.getItem('fn'):'匿名用户';
	  	_this.axios.get(_this.ip.RESTPATH+'rest/getSignPoint/'+USERID)
	  		.then(function (res) {
	  			//获取积分和头像路径
	  			console.log('obj');
	  			console.log(res);
	  			_this.score=res.data[0].score;

	  			_this.picPath = res.data[0].pic ? _this.ip.filePath+res.data[0].pic:'';
	  		})
	  		.catch(function (err) {
	  			console.log(err);
	  		});
	  		this.axios.get(this.ip.RESTPATH+'/rest/getSignScoreDetailsByUserId/'+USERID)
	  		.then(res=>{
	  			console.log('获取的统计分数');
	  			console.log(res)
	  			_this.total=res.data;
	  			bus.$emit('closeloading');
	  			_this.showbox=true;

	  		})
	  },
	   beforeCreate() {
   		bus.$emit('loading')
  }
	}
</script>
<style lang='less' >
#myself{
	width: 100%;height: 100%;
	.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
	.myschoolship{
		position: fixed;
		width:90%;
		height:57%;
		left:5%;
		top:8%;
		font-size: 1.7rem;
		border-radius: 10px;
		background: #fff;
		text-align: center;
		z-index: 999;
		.iconfont{
			float: right;
				margin:1rem;
				font-size: 2rem;
				color:#975f5f;
		}
		p{
			margin-top: 5rem;
			padding:0 1rem;
			letter-spacing: 3px;
			line-height: 2rem;
		}
	}
	header{
		width: 100%;
		height:7rem;
		background: rgba(50,200,175,.9);
		background-image:-webkit-linear-gradient(45deg,  rgba(50,200,175,.9),rgba(222, 143, 126, 0.9));
		background-image:linear-gradient(45deg,rgba(50,200,175,.9),rgba(222, 143, 126, 0.9));
		.head_portrait{
			float: right;
			height: 100%;
			width:50%;
			position: relative;
			div{
				// float: right;
				border-radius: 50%;
				width: 60px;height: 60px;
				overflow: hidden;
				position: absolute;
				left: 0;right: 0;top: 0;bottom: 0;margin:auto;
				border:1px solid rgba(50,200,175,.9);
				img{
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;right: 0;
					z-index:99;
					border-radius:50%;
				}
			}
			input{
				position: absolute;
				width: 100%;
				height: 100%;
				top:0;left: 0;
				z-index:99;opacity: 0;
			}
		}
		.fname{
			float:  left;
			line-height: 7rem;
			height: 100%;
			width:40%;
			text-align: center;
			color: black;
			font-size: 1.8rem;
			font-weight: 600;
			color:rgba(0,0,0,.3);
			letter-spacing: 3px;
		}
		.achievement{
			height: 20%;
			overflow: hidden;
			position: relative;
			span{
				margin-left: 15%;height: 100%;			
				img{
					height: 100%;
					vertical-align: middle;
				}
				b{
					font-size: 2rem;
					color: #ffc000;
					letter-spacing: .2rem;
					vertical-align: middle;
				}
			}
			span:nth-child(1){float: left;margin-left: 20px;}
			span:nth-child(2){position:absolute;right: 20px;bottom:0;height: 70%;}
		}
	}
	section{
		width:90%;
		margin:1rem auto;
		background: rgba(0,0,0,.01);
		border-radius: 8px;
		box-shadow: 1px 1px 5px 4px #ddd;
		.myreward{
			width:90%;
			margin:.6rem auto;
			color:#333;
			font-size: 1.4rem;
			text-indent: .5em;
			padding:.6rem 0;
			border-bottom: 1px solid #eee;
			span{
				color:#8f6565;
				font-size: 1.6rem;
			}
		}
		

	}	
	.img{
			width:90%;
			height:10rem;
			margin: 1.3rem auto 0;
			display: flex;
			-webkit-display:flex;
			justify-content: space-around;
			.img1{
				width:48%;
				height:100%;
				position: relative;
				img{
				display: inline-block;
				width:100%;	
			}
			p{
				position: absolute;
				font-size: 1.4rem;
				line-height: 2rem;
				width: 100%;
				top:25%;
				left:0;
				text-align: center;
				span{
					color:#a94242;
				}
			}
		}
			
		}
		.about{
			width:90%;
			margin: 3.5rem auto 0;
			display: flex;
			-webkit-display:flex;
			justify-content: space-around;
			p{
				width:35%;
				height: 3.2rem;
				line-height: 3.2rem;
				text-align: center;
				background: #5b9bd5;
				color:#fff;
				border-radius: 5px;
				letter-spacing: 1.5px;

			}
		}
}
</style>
