<template>
	<section id="oneBookDetail" v-show='showThis' :class="{showThisAnimation:showThis}">
		<header>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div>《&nbsp;{{$route.query.bookName}}&nbsp;》</div>
		</header>
		<div class="beforeRead common">
			<div>
				<span>
					阅<br>读<br>前
				</span>
				</div>
			<div>
				<p @click='goView("whyRead")'><i class="iconfont left">&#xe642;</i>为什么要读这本书<i class="iconfont right">&#xe775;</i></p>
				<p @click='goView("thinkBook")'><i class="iconfont left">&#xe66e;</i>五分钟了解这本书<i class="iconfont right">&#xe775;</i></p>
				<p @click='goView("withQuest")'><i class="iconfont left">&#xe636;</i>带着问题去阅读<i class="iconfont right">&#xe775;</i></p>
			</div>
		</div>
		<div class="afterRead common">
			<div>
				<span>阅<br>读<br>后</span>
			</div>
			<div>
				<p @click='goView("testread")'><i class="iconfont left">&#xe667;</i>测测我的阅读效果<i class="iconfont right">&#xe775;</i></p>
				<p @click='goView("myThink")'><i class="iconfont left">&#xe656;</i>我的思考与回答<i class="iconfont right">&#xe775;</i></p>
				<p @click='goView("myEvaluate")'><i class="iconfont left">&#xe7c4;</i>我来评价这本书<i class="iconfont right">&#xe775;</i></p>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		data(){
			return {
				showThis:false,

			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			goView(name){
				this.$router.push({name:name,query:{id:this.$route.params.id}})
			},
		},
		created(){
			this.showThis = true;
		},

	}
</script>
<style lang="less" scoped>
@keyframes showThis{
	from{
		-webkit-transform:translateX(-10%);
		transform:translateX(-10%);
		opacity:.5;
	}
	to{
		-webkit-transform:translateX(0);
		transform:translateX(0);
		opacity:1;
	}
}
.showThisAnimation{
	-webkit-animation:showThis .5s ease forwards;
	animation:showThis .5s ease forwards;
}
	#oneBookDetail{
		width:100%;
		height:100%;
			header{
			height:43px;
			margin-bottom: 1px;
			border-bottom:1px solid #eee;
			div{
				display:inline-block;
				background:rgba(255, 255, 255, .87);
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
			}
		}
	.common{
		overflow:hidden;
		width:90%;
		margin:1rem auto;
		display:flex;
		padding:.5rem;
		border:1px solid #eee;
		margin-bottom: 3rem;
		div{
			float: left;
			height:14.5rem;
			p{
				line-height:3.5rem;
				height:3.5rem;
				margin:1rem;
				width:80%;
				border-radius:3px;
				font-size:1.6rem;
				color:#887f7f;
				background:#fff;
				.left{
					display:inline-block;
					height:100%;
					line-height:3.5rem;
					font-size:2rem;
					padding:0 1rem;
				}
				.right{
					float: right;
					padding-right:.7rem;
					color:rgba(85, 85, 85, 0.48);
				}
			}
			&:first-child{
				width:3.5rem;
				line-height:1.8rem;
				text-align:center;
				border:1px solid #eee;
				border-radius:3px;
				position:relative;
				background:#fff;
				color:#666;
				font-size:1.7rem;
				span{
					display:inline-block;
					position:absolute;
					top: 50%;
					width:100%;
					left:0;
					transform:translateY(-50%);
				}
			}
			&:last-child{
				flex:1;
				p{
					&:first-child{
						border:1px solid rgba(233, 30, 99, 0.39);
						.left{
							color:#e91e63;
						}
					}
					&:nth-child(2){
						border:1px solid rgba(233, 30, 99, 0.39);
						.left{
							color:#e91e63;
						}
					}
					&:nth-child(3){
						border:1px solid rgba(233, 30, 99, 0.39);
						.left{
							color:#e91e63;
							}
						}
					} 
				}
			}
		}
	}
</style>