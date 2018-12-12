<template>
	<div class="discount">
		<div class="circle">
			<div></div>	
		</div>
		<div class="circle circle_1">
			<div></div>	
		</div>
		<div class="hr">
			<hr v-for='h in hrlist'>
		</div>
		<div class="point">
		</div>
		<div class="zhuzi">	
		</div>
		<div class="zhuzi zhuzi_1">	
		</div>
		<div class="block" v-show='showThis'>
			<div class="content_1">
					{{valid}}
			</div>
			<div class="content">
				<div class="header">
					<div class="img">
						<img src="../../../assets/images/shares.png" alt="">
					</div>
					<span>文升阅读</span>
				</div>
				<div class="discountInfo" v-show='showDiscountInfo'>
					<b class="left point"></b>
					<b class="right point"></b>
					<p>￥<span>{{courseInfo.groupPrice}}</span></p>
					<p class="botText">仅适用:<i>{{courseInfo.stage}}</i></p>
				</div>
				<div class="discountInfo" v-show='!showDiscountInfo'>
					<b class="left point"></b>
					<b class="right point"></b>
					<p class="receiveOver"><i class="iconfont">&#xe625;</i>{{receiveText}}</p>
				</div>
				
			</div>
			<div class='ellipse'></div>
			<div class="bottom">
				<div class='ellipse_1'></div>
				<button @click='getDiscount' v-show='showRecevive'>{{receive}} <span v-show='showcount'>({{counts}})</span></button>
			</div>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../bus.js'
// require('../../../mockData.js')
	export default {
		data(){
			return {
				price:498,
				courseInfo:{},
				courseName:'文升百步金典亲子阅读',
				wxId:'',
				nickName:'',
				headImg:'',
				receive:'马上领取',
				showRecevive:true,
				showDiscountInfo:true,
				receiveText:'',
				valid:'永久有效',
				showThis:false,
				hrlist:15,
				campingId:'',
				discountId:'',
				counts:0,
				showcount:false,
				timer:0,
			}
		},
		methods:{
			getDiscount(){
				console.log('领取成功');
				this.receive = '正在跳转至课程...';
				this.showcount = true;
				this.timeCount();
			},
			timeCount(){
				this.timer = setTimeout(()=>{
					this.counts++;
					this.timeCount();
					console.log(this.counts)
					if(this.counts == 3){
						clearTimeout(this.timer);
						this.$router.push({name:'infoCollect',query:{campingId:this.campingId,discountId:this.discountId,openId:this.wxId}});
					}
				},1000);
			},
			getUserInfo(){
				this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
				this.nickName = JSON.parse(sessionStorage.getItem('u'))['nickname'];
				this.headImg = JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
				let href = window.location.href;
				let idArr = href.split('?campingId=')[1].split('&discountId=');
				this.campingId = idArr[0];
				this.discountId = idArr[1];
				this.axios.get(this.ip.RESTPATH3 + '/wsdiscount/discount/QueryCampingById'+ '/' + this.campingId)
				.then(res=>{
					console.log(res.data);
					this.courseInfo = res.data;
					// if(res.data.status == '未领取'){
					// 	this.receive = '马上领取';
					// 	this.valid = '永久有效';
					// }else if(res.data.status == '已领取'){
					// 	this.receive = '点击跳转到营课';
					// 	this.showRecevive = true;
					// 	this.showDiscountInfo = false;
					// 	this.receiveText = '已领取';
					// 	this.valid = '';
					// }else if(res.data.status == '他人领取'){
					// 	this.showRecevive = false;
					// 	this.showDiscountInfo = false;
					// 	this.receiveText = '已被领光';
					// 	this.valid = '';
					// }
					this.showThis = true;
				});
				//判断是否是新老用户
				let postdata =  {
					"sex": "Man",
					"headimgurl": this.headImg,
					"nickname": this.nickName,
					"wxId": this.wxId,
					"discountId": this.discountId,
					"campingId": this.campingId,
					};
				console.log(postdata)
				this.axios.post(this.ip.RESTPATH3 + '/wsdiscount/users/isOldUser',postdata)
				.then(res=>{
					console.log(res.data)
				})
			},
		},
		created(){
			bus.$on('sessionSuccessStup',()=>{
				this.getUserInfo();
			});
			if(sessionStorage.getItem('u')){
				this.getUserInfo()
			}else{
				this.getWxinfo('sessionSuccessStup');
				 // this.configs('sessionSuccessStup');
			};

		},
		mounted(){
				let title = document.getElementsByTagName('title')[0];
				title.innerHTML = '优惠码领取'
		},
	}

</script>
<style lang="less">
	.discount{
		width: 100%;
		height: 100%;
		background: #fbd033;
		overflow: hidden;
		.circle{
			width:14rem;
			height: 14rem;
			border-radius: 50%;
			border:1px solid #f9bc2d;
			position: absolute;
			left:-5rem;
			top:3rem;
			div{
				width:12rem;
				height: 12rem;
				margin:1rem;
				border-radius: 50%;
				background: #f9bc2d;
			}
		}
		.circle_1{
			width:3rem;
			height:3rem;
			left:50%;
			top:90%;
			div{
				width:2.4rem;
				height:2.4rem;
				margin:.3rem;
			}
		}
		.hr{
			position: absolute;
			bottom:-3rem;
			right:2rem;
			height:10rem;
			width: 10rem;
			border-radius: 50%;
			overflow: hidden;
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
			hr{
				background: #f9bc2d;
				border:none;
				height: 3px;
				width:12rem;
				margin:.5rem 0;
			}
		}
		.point{
			position: absolute;
			width:3rem;
			height: 3rem;
			border-radius: 50%;
			background: #f9bc2d;
			right:-1.5rem;
			bottom:10rem;
		}
		.zhuzi{
			width: 4rem;
			height:6rem;
			background: #f9bc2d;
			position: absolute;
			border-radius: 3rem;
			right: 5%;
			bottom:42%;
			-webkit-transform: rotate(60deg);
			transform: rotate(60deg);
		}
		.zhuzi_1{
			right:85%;
			bottom:30%;
		}
		.block{
			width:24rem;
			height:32rem;
			margin: 10rem auto;
			background: #fe5047;
			position: relative;
			border-radius: 0 0 1.5rem 1.5rem;
			box-shadow: 0 0 5px #191919;
			.content_1{
					width:22rem;
					height:6rem;
					border-radius:50%;
					background: #fefff8;
					position: absolute;
					left:1rem;
					top: 13rem;
					z-index: 12;
					text-align: center;
					color: #8a5a65;
					font-size: 1.8rem;
					font-weight: 600;
				}
			.content{
				width:22rem;
				height:26rem;
				margin:0 auto;
				background: #fefff8;
				z-index: 10;
				position: absolute;
				top:0;
				left:1rem;
				border-radius: 5px;
				box-shadow:  0 0 4px #9e8e8e;
				.header{
					line-height: 25px;
					margin: 10px;
					font-size: 1.2rem;
					.img{
						width: 25px;
						height:25px;
						display: inline-block;
						overflow: hidden;
						vertical-align: top;
						border-radius: 50%;
						img{
							width: 100%;
						}
					}
				}
				.discountInfo{
					margin-top: 2.5rem;
					position: relative;
					height: 6rem;
					border-bottom:1px dashed rgba(158, 158, 158, 0.38);
					.point{
						display: block;
						width:1.6rem;
						height:1.6rem;
						border-radius: 50%;
						background: #fe5047;
						position: absolute;
						bottom:-.8rem;
					}
					.left{
						left:-.8rem;
					}
					.right{
						right:-.8rem;
					}
					p{
						text-align: center;
						color: #f44756;
						margin:.5rem 0;
						span{
							font-size: 3.5rem;
						}
					}
					.receiveOver{
						font-size: 3rem;
						color: #9e9e9e;
						i{
							font-size: 3rem;
							padding-right: 1rem;
						}
					}
					.botText{
						color: #ea7d83;
						font-size: 1.4rem;
						padding-bottom: 1.5rem;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						letter-spacing: 1px;
						i{
							font-style: normal;
							font-weight: 700;
						}
					}
				}
			}
			.ellipse{
				width: 24rem;
				height: 6rem;
				background: #fe5047;
				border-radius:50%;
				position: absolute;
				left:0;
				top:-3rem;
				z-index: 9;
			}
			.bottom{
				position: absolute;
				height: 16rem;
				width: 100%;
				left: 0;
				bottom: 0;
				background: #f92c26;
				z-index: 11;
				overflow: hidden;
				border-radius: 0 0 1.5rem 1.5rem;
				.ellipse_1{
					width: 24rem;
					height: 6rem;
					background: #fe5047;
					border-radius:50%;
					position: absolute;
					left:0;
					top:-3rem;
					z-index: 8;
				}
				button{
					width:90%;
					margin-left: 5%;
					line-height: 3.5rem;
					border-radius: 3rem;
					margin-top: 6rem;
					color: #804709;
					font-weight: 600;
					font-size: 1.8rem;
					background: #fdd128;
					letter-spacing: 1px;
				}
			}
		}
	}
</style>