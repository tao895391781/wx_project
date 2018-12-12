<template>
	<section id="goEvaluate" v-show='showThis' :class="{goEvaluate:showThis}">
		<textarea placeholder="留下你的评价吧~" v-model='text'>
		</textarea>
		<h5><i class="iconfont">&#xe6e6;</i>我给在这本书打分</h5>
		<ul>
			<li>
				描述一
				<span v-for='(s,index) in 5' @click='dafen1(index)' :class="{startColor:index1>=index}"><i class="iconfont">&#xe643;</i></span>
				<b>{{descriptText[index1]}}</b>
			</li>
			<li>
				描述二
				<span v-for='(s,index) in 5' @click='dafen2(index)' :class="{startColor:index2>=index}"><i class="iconfont">&#xe643;</i></span>
				<b>{{descriptText[index2]}}</b>
			</li>
			<li>
				描述三
				<span v-for='(s,index) in 5' @click='dafen3(index)' :class="{startColor:index3>=index}"><i class="iconfont">&#xe643;</i></span>
				<b>{{descriptText[index3]}}</b>
			</li>
		</ul>
		<button @click='sendEvaluate'>发布</button>
	</section>
</template>
<script>
	import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				descriptText:['有待改进','一般','比较好','很好','非常好'],
				index1:'a',
				index2:'a',
				index3:'a',
				wxId:'',
				text:'',
				showThis:false

				}
		},
		methods:{
			dafen1(index){
				this.index1 = index;

			},
			dafen2(index){
				this.index2 = index;

			},
			dafen3(index){
				this.index3 = index;
			},
			sendEvaluate(){
				if(this.text == ''){
					bus.$emit('tip','请填写文字')
				}else if(this.index1 == 'a'){
					bus.$emit('tip','请给这本书打星')
				}else{
					let postdata = {
						guideId:this.$route.query.id,
						star:this.index1 +1,
						wxId:this.wxId,
						content:this.text
						}
						console.log(postdata)
					this.axios.post(this.ip.RESTPATH + 'rest/postGuideReadingStar',postdata)
					.then(res=>{
						console.log(res.data)
						bus.$emit('overTips','已发布');
						this.text = '';
						this.index1 = 'a';
						setTimeout(function(){
							this.$router.go(-1)
						}.bind(this),500)

				})
				}
				
			},
		},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.showThis = true;
			$(function(){
				$('body').css({'height':$(window).height()});
			})
		},
	}
</script>
<style lang="less" scoped>
 ::-webkit-input-placeholder {text-align:left;}
@keyframes goEvaluate{
	from{

		-webkit-transform:translateX(-10%);
		transform:translateX(-10%);
		opacity:.9;
	}
	to{
		-webkit-transform:translateX(0);
		transform:translateX(0);
		opacity:1;
	}
}
	#goEvaluate{
		width:100%;
		height:100%;
		textarea{
			width:100%;
			height:30%;
			border-bottom:1px solid #eee;
			text-indent:2em;
			line-height:2rem;
			font-size:1.6rem;
			color:#333;
			padding-top:1rem;
		}
		h5{
			width:90%;
			margin:1rem auto;
			line-height:2.8rem;
			border:1px solid rgba(238, 238, 238, 0.55);
			text-indent:1em;
			i{
				color:#666;
				padding-right:1rem;
			}
		}
		ul{
			width:88%;
			margin:0 auto;
			li{
				height:3rem;
				line-height:3rem;
				span{
					padding:0 .5rem;
					i{
						font-size:2rem;
						color:rgba(158, 158, 158, 0.77);
					}
				}
				.startColor{
					i{
						color:#e91e63;
					}
				}
				b{
					font-weight:400;
					color:#9e9e9e;
				}
			}
		}
		button{
			width:50%;
			margin:6rem 25% 0;
			line-height:2.5rem;
			text-align:center;
			background:#e63062;
			border-radius:20px;
			color:#fff;
			font-size:1.5rem;
			letter-spacing:2px;
		}
	}
	.goEvaluate{
		-webkit-animation: goEvaluate .5s ease forwards;
		animation: goEvaluate .5s ease forwards;
	}
</style>