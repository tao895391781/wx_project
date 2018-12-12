<template>
<div class="Msetting">
	<header>
		<md-icon class='md-size-2x' @click.native="goback">reply</md-icon>
		<span >设置</span>
	</header>
	<section>
		<p>
			<span>头像</span>
			<span><img :src="picPath?picPath:defaultPicpath"></span>
		</p>
		<p>
			<span>姓名</span>
			<span>{{info.name}}</span>
		</p>
		<p>
			<span>学校</span>
			<span>{{info.school}}</span>
		</p>
	</section>	
	<p>
		<md-button class="md-raised md-warn" @click.native='logout'>注销</md-button>
	</p>
</div>
</template>
<script>
	import { bus } from '../../../bus.js'
	export default {
	  data() {
	  	return {
	  		info:{},
	  		picPath:"",
	  		defaultPicpath:require('../../../assets/images/defaultAvatar.jpg')
	  	}
	  },
	  methods: {
	  	goback(){
	  		this.$router.go(-1)
	  	},
	  	logout(){
	  		sessionStorage.clear();
	  		this.$router.push({name:'login'})
	  	}
	  },
	  computed:{

	  },
	  beforeCreate:function () {
	    bus.$emit('loading')
	  },
	  created:function () {
	  	var USERID = sessionStorage.getItem('i');
	  	var _this=this;
	  	_this.axios.get(_this.ip.RESTPATH1+'rest/getUserInfobyUserId/'+USERID)
	  	.then(function (res) {
	  		console.log('获取的数据');
	  		console.log(res);
	  		_this.info=res.data;
	  		_this.picPath=res.data.picId ? _this.ip.filePath + res.data.picId:"";
	  		 bus.$emit('closeloading')
	  	})
	  	.catch(function (err) {
	  		console.log(err);
	  	})
	  }
	}
</script>
<style lang='less' >
.Msetting{
	width: 100%;height: 100%;
	header{
		width: 100%;
		height: 10%;
		display: -webkit-flex; /* Safari */
		display: flex;
		align-items:center;
		position: relative;
		box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
		i{
			color:#35b4ca;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto;
		}
		span{
			display: block;
			width: 100%;
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			color: #514848;
		}
	}
	section{
	  height: auto;
	  padding: 20px 30px;
	  p{
  	  	height: 5rem;
  		line-height: 5rem;
  		// overflow: hidden;
  		padding: 0 20px;
  		font-size: 1.7rem;
  		border-bottom: 1px solid #eee;
  		position: relative;

	  	span{
	  		// text-align: left;
	  		display: inline-block;
	  		
	  		
	  		img{
	  			width: 60px;
	  			height: 60px;
	  			border-radius: 50%;
	  			border:1px solid #eee;
	  		}
	  		&:nth-child(1){
	  			float: left;
			
	  		}
	  		&:nth-child(2){
	  			float: right;min-width: 90px;
	  			position: absolute;
	  			bottom:0rem;
	  			right:1rem;
	  			}
	  	}
	  }		
	}
	&>p{
		text-align: center;
		margin-top: 50px;
		button{
			background-color: #FF9800!important;
		}
	}
}
</style>
