<template>
<div id="login">
	<div class="logo">
		<img :src="img"  >
	</div>
	<form novalidate @submit.stop.prevent="submit">
		<md-input-container md-inline>
		    <label>请输入账号</label>
		    <md-input v-model="account"></md-input>
		</md-input-container>
		<md-input-container md-inline >
		    <label>请输入密码</label>
		    <md-input v-model="password" type="password"></md-input>
		</md-input-container>
	</form>
	<p>
		<md-button class="md-raised md-warn" @click.native='login'>登录</md-button>
	</p>
	<div class="appinfo">
		<p>经典名著阅读辅导</p>
		<p>@ 文升网课</p>
	</div>
</div>
</template>
<script>

import { bus } from '../../bus.js'
export default {

  data() {
  	return {
		password:'',
		account:'',
		imga:require('../../assets/images/logo.png'),
		imgb:require('../../assets/images/logonanyang.png'),
		imgc:require('../../assets/images/logozhuozhou.png')
  	}
  },
  methods: {

	login() {
		let self = this;
		self.axios({
			method: 'POST',
			url: self.ip.casPath,
			data: 'username=' + self.account + '&password=' + self.password,
				headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
				}
		})
		.then(function(data) {
			console.log("获取TGT成功");
			console.log(data);
			var location = "";
			var pattern = /.+action="(.*)"\smethod.+/;
			if (pattern.test(data.data)) {
					location = RegExp.$1;
					console.log("获取ST的URL：" + location);
					return self.axios({
							url: location,
							method: 'POST',
							data: 'service=' + self.ip.servicePath,
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
							}
					})
			}
		})
			.then(function(data){
				if (data) {
						console.log("获取ST成功");
						console.log(data);
						var st = data.data;
						console.log("验证ST的URL：" + 'http://test.wsreading.com:80/login/cas' + "?ticket=" + st);
						return self.axios({
								url: self.ip.servicePath + "?ticket=" + st,
								method: 'GET'
						})
				}
			})
				.then(function(res){
					if (res) {
						console.log("验证ST成功：");
						console.log(res.data);
						sessionStorage.setItem('i',res.data.id);
						sessionStorage.setItem('fn',res.data.fullname);
							self.$router.push({name:'questionlist'});	
					}
				})
				.catch(function(error){
					console.log(error);
					bus.$emit('tip', '登录名或密码错误')
				});
	}
  },
  computed: {
  	img(){
  		if(!this.$route.query.from){
  			return this.imga
  		}else if(this.$route.query.from=="nanyang"){
  			return this.imgb
  		}else if(this.$route.query.from=="zhuozhou"){
  			return this.imgc
  		}
  	}
  },
  created(){
  	// console.log(this.$route.params.whatPath)
  }

}
</script>
<style lang='less' scoped>
	#login{
		width: 100%;
		height: 100%;
		background: url('../../assets/images/login_bg.jpg') no-repeat ;
		background-size: 100% 100%;
		overflow: hidden;
		.logo{
			width: 100%;
			margin:100px 0 50px 0;
			img{
				margin-left: 15%;
				width: 70%;
			}
		}
		.md-input-container{
			width: 64%;
			margin-left: 18%;
			
		}
		&>p{
			text-align: center;
			margin-top: 50px;
			button{
				background-color: #FF9800;
			}
		}
		.appinfo{
			margin-top: 20px;
			p{
			  color: #205868;
			  text-align: center;
			  font-size: 1.5rem;
			  padding: 0;
			  margin: .4rem 0 0 0;
			}
		}
	}
</style>
