<template>
	<div class="discountManage">
		<img src="../../../assets/images/Nbg1.png" alt="">	
		<header>设置优惠券</header>
		<div class="bigBox">
			<div class="select">
				<div>选择营课：</div>
				<el-select v-model="className" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.stage"
				      :value="item.stage"
				      @click.native='selectClass(item.groupPrice,item.id)'>
			    	</el-option>
	  			</el-select>
			</div>
			<div class="select">
				<div>选择数量：</div>
				<el-select v-model="numvalue" placeholder="请选择">
				    <el-option
				      v-for="item in nums"
				      :key="item.id"
				      :label="item"
				      :value="item">
			    	</el-option>
	  			</el-select>
			</div>
			<div class="select">
				<div>营课价格：</div>
				<div class="price">￥{{pricevalue}}</div>
			</div>
		</div>
		<el-button type="primary" :loading="showLoading" @click.native='birthDiscount'>{{btnText}}</el-button>
		<transition name="el-fade-in-linear">
		<div class="comfirmBox" v-show='showComfirm'>
				<div class="comfirm" v-show='showBtn'>
					<div class="text">
						<h4>是否生成优惠券?</h4>
						<p>营课名称:<span>{{className}}</span></p>
						<p>生成数量:<span>{{numvalue}}</span></p>
						<p>营课价格:<span>{{pricevalue}}</span></p>
					</div>
					<div class="btn"><button @click='cancle'>取消</button><button @click='sure'>确定</button></div>
				</div>
				<img src="../../../assets/images/sharebg4.png" alt="" v-show='showImg' @click='imgClick'>
		
		</div>
			</transition>
	</div>
</template>

<script>
import {bus} from '../../../bus.js';
import { Message } from 'element-ui';
// require('../../../mockData.js')
	export default {
		data(){
			return {
				wxId:'',
				nickName:'',
				headImg:'',
				options:[{
					className:'文升阅读亲子阅读1',
					campingId:1,
					groupPrice:568
				},{
					className:'文升阅读亲子阅读2',
					campingId:2,
					groupPrice:987
				},{
					className:'文升阅读亲子阅读3',
					campingId:3,
					groupPrice:234
				},{
					className:'文升阅读亲子阅读4',
					campingId:4,
					groupPrice:345
				}],
				nums:1,
				className:'',
				numvalue:1,
				pricevalue:0,
				campingId:'',
				btnText:'生成优惠券',
				showLoading:false,
				showComfirm:false,
				firstClick:true,
				showBtn:false,
				showImg:false,
				shareUrl:'',
			}
		},
		methods:{
			imgClick(){
				this.showComfirm = false;
				this.showBtn = false;
				this.showImg = false;
				Message.closeAll();

			},
			cancle(){
				this.showComfirm = false;
			},
			sure(){
				this.showComfirm = false;
				this.showLoading = true;
				this.btnText = '正在生成...';
				let postdata = {campingId:this.campingId};
				console.log(postdata);
				this.axios.post(this.ip.RESTPATH3 + '/wsdiscount/discount/creatDiscount',postdata)
				.then(res=>{
					console.log(res.data);
					let qianzui = 'http://localhost:8087';
					let line = 'http://test.wsreading.com/weixin/index.html?';
					let discountId = res.data;
					this.shareUrl = qianzui + '/#/discount?campingId='+this.campingId+'&discountId='+discountId;
					this.showComfirm = true;
					this.showBtn = false;
					this.showImg = true;
					this.showLoading = false;
					this.btnText = '生成优惠券';
					Message.success({
						message:'生成优惠券成功！',
						duration:0,
					});
					console.log(this.shareUrl);
					//自定义分享链接
					let that = this;
					WX.ready(function () {   //需在用户可能点击分享按钮前就先调用
			   		 	WX.updateAppMessageShareData({ 
			        	title: that.className, // 分享标题
			        	desc: '点击即可领取优惠吗，先到先得.', // 分享描述
			        	link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			        	imgUrl: that.shareUrl, // 分享图标
			        	success: function () {
			          // 设置成功
			        }
			});
				})

			}).catch(err=>{
				console.log(err)
			});
			},
			selectClass(price,id){
				console.log('选择');
				this.pricevalue = price;
				this.campingId = id;
			},
			getUserInfo(){
				this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
				this.nickName = JSON.parse(sessionStorage.getItem('u'))['nickname'];
				this.headImg = JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
				console.log(this.wxId);
				this.axios.get(this.ip.RESTPATH+'rest/getReadPersonInfoByWXId/'+this.wxId)
				.then(res=>{
					console.log(res.data)
				})
			},
			//生成优惠券
			birthDiscount(){
				if(this.firstClick){
					console.log('点击生成优惠券');
					if(this.className == ''){
						bus.$emit('tip','请填写营课名称');
					}else{
						this.showComfirm = true;
						this.showImg = false;
						this.showBtn = true;
					}
				}
				
			},
		},
		created(){
			// this.config();
			this.axios.get(this.ip.RESTPATH3+'/wsdiscount/discount/queryAllCampingForChoose')
			.then(res=>{
				console.log(res.data);
				this.options = res.data;
			})
			// bus.$on('sessionSuccessStup',()=>{
			// 	this.getUserInfo();
			// });
			// if(sessionStorage.getItem('u')){
			// 	this.getUserInfo()
			// }else{
			// 	this.getWxinfo('sessionSuccessStup');
			// 	 // this.configs('sessionSuccessStup');
			// };



		},
		mounted(){
			// console.log(document.body);
			// document.body.create
		},
	}

</script>
<style lang="less" scoped>

	.discountManage{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		.comfirmBox{
			width:100%;
			height:100%;
			position: fixed;
			left:0;
			top:0;
			background: rgba(0,0,0,.2);
			img{
				width:100%;
				height:100%;
				position: absolute;
				left:0;
				top:0;
			}
		}
		.comfirm{
			position: absolute;
			width:80%;
			height:18rem;
			background: #fff;
			left:10%;
			top:25%;
			border-radius: 5px;
			box-shadow: 0 0 4px #ddd;
			display: -webkit-flex;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.text{
				margin-bottom: 2.5rem;
				h4{
					line-height:3.5rem;
					text-align: center;
					color: #000;
				}
				p{
					width: 80%;
					margin:.8rem 10%;
					font-size: 1.7rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					span{
						color: #000;
						font-size: 1.7rem;
						padding-left: 1em;
					}
				}

			}
			.btn{
				flex:1;
				display: -webkit-flex;
				display: flex;
				align-items: bottom;
				border-top: 1px solid #eee;
				button{
					width: 50%;
					line-height: 3.5rem;
					color:#409EFF;
					font-size: 1.8rem;
					&:first-child{
						border-right:1px solid #eee;	
						color: #333;
					}
				}
			}
		}
		header{
			line-height: 4rem;
			text-align: center;
			font-size: 2rem;
			letter-spacing: 2px;
		}
		&>img{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top:0;
			z-index: -1;
		}
		.bigBox{
			width: 80%;
			margin: 4rem 10%;
		}
		.select{
			display: -webkit-flex;
			display: flex;
			align-items: center;
			margin: 1rem 0;
			color: #353232;
			.price{
				height: 40px;
				line-height: 40px;
				width:10rem;	
				border:1px solid #fff;
				border-radius: 5px;
				padding-left:15px;
				color: #353232
			}
		}
		.el-button--primary{
			width: 80%;
			margin: 4rem 10%;
			font-size: 1.8rem;
			letter-spacing: 1.5px;
			border-radius: .5rem;	
		}
		.el-button.is-loading:before{
			background: transparent;
		}
	}
</style>