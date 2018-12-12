<template>
	<section id="huiyuan">
			<header>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div>一书一课</div>
				<!-- <div><i class="iconfont">&#xe659;</i></div> -->
			</header>
			<div class="mainBox">
				<ul v-show='!ifNoCentent'>
					<li v-for=' c in contentImg'>
						<img :src="c" alt="loading">
					</li>
				</ul>
				<p v-show='ifNoCentent'>
					抱歉，暂无内容
				</p>
			</div>
			<div class="buy" v-show='!isPay'>
				<button>个人购买<span>{{price}}元/月</span></button>
				<button @click='buyHuiyuan' :disabled = 'disclick' :class="{notClick:disclick}">立即购买</button>
			</div>
			<p class="nowExper" @click='gohuiCourse'>
				立即体验
			</p>

	</section>	
</template>
<script>
import {bus} from '../../../../bus.js'
import Vue from 'vue'
	export default {
		data(){
			return {
				showThis:false,
				ifNoCentent:false,
				contentImg:[],
				disclick:false,
				price:0,
				isPay:true,
			}
		},
		methods:{
			gohuiCourse(){
				this.$router.push({name:'oneBook'})
			},
			buyHuiyuan(){
				bus.$emit('loading');
				this.disclick = true;
				let that = this;
				this.axios.post(this.ip.RESTPATH  + 'rest/postGuideReadMember',{wxId:this.wxId})
				.then(res=>{
						console.log(res.data);
						bus.$emit('closeloading')
						// this.$router.push({name:'oneBook'})
						WX.chooseWXPay({
						timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.data.sign, // 支付签名
						success: function (res) {
						// 支付成功后的回调函数
						// alert('支付成功');
						that.$router.push({name:'oneBook'})

						},
						fail:function(res){
							alert('支付失败');
							alert(res);
							that.disclick = false;
							that.$router.push({name:'oneBook'})
						},
						 cencel:function(res){
                    	  alert('cencel pay');
                    	  that.disclick = false;
                		 },
						});
				})
			},
			goback(){
				this.$router.go(-1)
			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		watch:{
		},
		computed:{

		},
		created(){
			this.config();
			this.$parent.isFirst = false;
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			let that = this;
			let type = this.$route.params.id;
			console.log(type)
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadCamping/'+this.wxId+'/'+type)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading')
				this.isPay = res.data.isPay;
				this.price = res.data.price;
				if(res.data.centent.length == 0){
					this.ifNoCentent = true;
				}else{
					this.ifNoCentent = false;
					this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.centent.join(','))
					.then(res1=>{
						console.log(res1.data);
						res.data.centent.forEach(v=>{
								v = that.ip.filePath2+res1.data[v].href
								that.contentImg.push(v);
							})
						console.log(that.contentImg)
					})
				}
			})
			
		},
		beforeRouteLeave (to, from, next){
			//离开当前页面移除滚动事件
		   	$('body').get(0).removeEventListener('scroll',this.scrolls,true);
		   	$('body').get(0).removeEventListener('scroll',this.navScroll,true);
		    next()  
		},
		mounted(){
			

		},
		components:{
		},
	}
</script>
<style lang='less'>
	#huiyuan{
		width:100%;
		height:100%;
		position:relative;
		z-index:886;
		background:#f2f2f2;
		overflow:hidden;
		display:flex;
		-webkit-display:flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		&>header{
			height:43px;
			background:rgba(255, 255, 255, .87);
			margin-bottom: .5rem;
			div{
				display:inline-block;
				float: left;
				height:100%;
				text-align:center;
				line-height:43px;
				color:#333;
				&:first-child{
					width:20%;
					text-align:left;
					text-indent:1em;
				}
				&:nth-child(2){
					width:60%;	
				}
				&:nth-child(3){
					width:20%;
					color:#f60;
				}
			}
		}
		.mainBox{
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			flex:1;
			ul{
				width:100%;
				li{
					img{
					    max-width: 100%;
    					max-height: 100%;
					}
				}
			}
			&>p{
				padding:4rem 0;
				text-align: center;
				font-size: 1.8rem;
				letter-spacing: 2px;
			}

		}
		.buy{
			height: 3.5rem;
			button{
				width:60%;
				float: left;
				height:100%;
				font-size: 1.5rem;
				span{
					color:#f60;
					font-size: 1.6rem;
				}
				&:last-child{
					background: #f60;
					color:#fff;
					width:40%;
				}
			}
			.notClick{
				background: #9e9e9e!important;
				color:#fff!important;
			}
			
		}
		.nowExper{
			position: fixed;
			bottom:20%;
			right:1rem;
			width:5rem;
			height:5rem;
			font-size:1rem;
			border-radius: 50%;
			background: #795548;
			color:#fff;
			text-align: center;
			line-height: 5rem;
			border:1px solid #fff;
		}
		}
</style>