<template>
	<section id="ImmediateView"  v-show='showThis'>
	<router-view></router-view>
		<!-- <div v-show='showFooter' class="footer">
			<div class="buy">
				<button :class="{selectBuy:selectBuys}" @click='immediatelyBuy'>价格:￥{{price}}<span>立即购买</span></button>
			</div>
		</div> -->
	</section>
</template>
<script>	
	import { mapActions } from 'vuex'
	import {bus} from '../../../../../bus.js'
 	export default {
		data(){
			return {
				selectBuy:true,
				selectBuys:false,
				price:'',
				showThis:false,
				ifGuidefree:false,
				showFooter:true,
				showPaddingB:false,
				wxId:'',
				showThis1:true,
				id:'',

			}
		},
		watch:{
			showFooter(news){
				console.log(news);
				this.$children[0].data1 = news;
				console.log(this.$children[0].data1)
			},
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			immediatelyBuy(){
				let postdata = {
					courseId:this.id,
					wxId:this.wxId,
					price:this.price,
					type:'SINGLE'
				};
				console.log(postdata);
				//生成订单号
				this.axios.post(this.ip.RESTPATH+'rest/generateSingleBookOrder',postdata)
				.then(res1=>{
					console.log(res1.data);
   					// bus.$emit('submithuimu','正在提交订单...');
					//确认订单
					this.axios.post(this.ip.RESTPATH+'rest/postSingleBookOrder',{orderNum:res1.data.orderNum})
					.then(res=>{
						console.log(res.data);
						let that = this;
						// bus.$emit('closesubmithuimu','..');
						WX.chooseWXPay({
						timestamp: res.data.timeStamp, 
						// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.data.sign, // 支付签名
						success: function (res) {
						// 支付成功后的回调函数
							// alert('支付成功');
							// bus.$emit('closesubmithuimu','已付款');
							that.showFooter = false;
						},
						fail:function(res){
							// bus.$emit('closesubmithuimu','付款失败');
							alert('支付失败');
							alert(res);
						},
						 cencel:function(res){
                    	  alert('cencel pay');
                		 },
						});
					})

				})
			},
		},
		computed:{
			
		},
		created(){

			this.config();
			this.$parent.isFirst = false;
			console.log(this.$route.query);
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.id = this.$route.params.id;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingPlanByWxIdAndCourseId/'+this.id+'/'+this.wxId)
			.then(res=>{
					this.showFooter = !res.data.isPay;
					this.showPaddingB = !res.data.isPay;
					this.price =  res.data.price;
			})
			
		},
	}
</script>
<style lang='less' scoped>
	#ImmediateView{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		display: -webkit-flex;
		-webkit-flex-direction:column;
		background:#fcfcfc;
		overflow:scroll;
		-webkit-overflow-scrolling: touch;
		&>.footer{
			width:100%;
			background: #fefcfc;
			height:3.8rem;
			&>.buy{
				height:3.8rem;
				background:#fcfcfc;
				border-top:1px solid #ddd;
				&>button{
					width:100%;
					line-height: 3.8rem;
					color:#F60;
					background: #fff;
					font-size: 1.7rem;
					padding:0;
					&>span{
						float:right;
						padding: 0 2rem;
						line-height: 3.8rem;
						background: #f60;
						color:#fff;
						font-size: 1.4rem;
					}

				}
				.selectBuy{
					background:#f60;
				}
			}
		}
	}
</style>