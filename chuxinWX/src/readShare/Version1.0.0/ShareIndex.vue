<template>	
	<section id="Sharehome">
		<router-view></router-view>
		<ul class="bottomNav" v-show='isFirst' id="bottomNav">
			<li :class="{cColor:currentPath == 'readIndex'}" @click="goView('readIndex')">
				<i class="iconfont">&#xe61e;</i><br>首页
			</li>
			<li :class="{cColor:currentPath == 'ImmediateExp'||currentPath == 'historyOver'}" @click="goView('historyOver')">
				<i class="iconfont">&#xe6ca;</i><br>
				正在学习	
			</li>
			<li :class="{cColor:currentPath == 'myss'}" @click="goView('myss')">
				<i class="iconfont">&#xe67f;</i><br>
				我的
			</li>
		</ul>

	</section>
</template>
<script>
import { bus } from '../../bus.js'

	export default {
		provide () {
    	return {
     	 reload: this.reload
  		 }
	  },
		data(){
			return {
				tabPosition: 'top',
				isChanges:0,
				index1:1,
				index2:2,
				isFirst:false,	
				openids:'',
				nicknames:'',
				headimgs:''	,
				height:'',
				isRouterAlive: true,
				centerImg:require('../../assets/images/shares.png'),
				isBigger:false,
			}
		},
		methods:{
			goView(path){	
					this.$router.push({name:path})
					// if(path == 'myss'){
					// 	this.$router.push({name:'oneBook'})
					// }
			},
		},
		created(){
			console.log(this.$route.name);
		},
		watch:{

		},
		mounted(){
			
		},
		computed:{
			currentPath(){
				return this.$route.name;
			},
		}

	}
</script>
<style lang='less'>
	@font-face {font-family: 'iconfont';
    src: url('../../../static/fonttask/iconfont.eot');
    src: url('../../../static/fonttask/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/fonttask/iconfont.woff') format('woff'),
    url('../../../static/fonttask/iconfont.ttf') format('truetype'),
}
.iconfont{
    font-family:"iconfont";
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
#Sharehome{
	width:100%;
	height:100%;
	display:-webkit-flex;
	display:flex;
	flex-direction: column;
	overflow: hidden;
	.cColor{
	color: #22ccdb!important;
	}
	.noBgc{
		background: #fff;
	}

	.bottomNav{
		width:100%;
		z-index: 40;
		height:43px;
		/*overflow: hidden;*/
		background: #fff;
		/*border-top:1px solid #eee;*/
		li{
			height: 100%;
			float: left;
			margin:0;
			width:33.3%;
			text-align: center;
			box-sizing: border-box;
			/*border-top: 1px solid #eee;*/
			letter-spacing: 1.5px;
			font-size: 1rem;
			&:nth-child(2){
				span{
					height:40px;
					width:40px;
					display: inline-block;
					background: rgba(0,0,0,.2);
					border-radius: 50%;
					border:4px solid rgba(255,255,255,.87);
					position: relative;
					transform: scale(1.2);
					top:-.6rem;
					&>img{
						display: inline-block;
						border-radius: 50%;
						width:100%;
						height:100%;
						opacity: .8;
					}
					&>i{
						position: absolute;
						left:.2rem;
						display: inline-block;
						width:100%;
						height:100%;
						line-height: 35px;
						margin-top: 0;
						z-index: 999;
						border-radius: 50%;
					}
				}
				
			
			}
			i{
				display: inline-block;
				position: relative;
				top:.2rem;
				font-size: 1.8rem;
			}
		}
		

	}

}

	
</style>