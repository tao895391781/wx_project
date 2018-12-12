<template>
<div class="totalMark" v-if='showTotal'>
		<h4>本次成绩汇总</h4>
		<div class="mysorce">
			<p>预习打卡:&nbsp;
			<span>{{pre}}</span>&nbsp;分
		</p>
			<p>朗读任务:&nbsp;
				<span>{{read}}</span>&nbsp;分
			
			</p>
			<p>课后思考:&nbsp;
			<span>{{think}}</span>&nbsp;分
			</p>
			<p v-if='iscompleteE'>整书测试:&nbsp;
			<span>{{thisscore}}</span>&nbsp;分
			</p>
		</div>
		<div class="beizhu">
			注：N/A表示你需要稍稍等待老师给你打分哦
		</div>
		<div class="img">	
			<i class="iconfont">&#xe602;</i>
			<i class="iconfont">&#xe63e;</i>
			<i class="iconfont">&#xe602;</i>
			<i class="iconfont">&#xe63e;</i>
			<i class="iconfont">&#xe602;</i>
			<i class="iconfont">&#xe63e;</i>
		       </div>
		<div class="mytotalsorce">
			<p>
				本次作业共获得&nbsp;<span>{{totalscore}}</span>&nbsp;分	
			</p>
			<p>
				本次幸运砸蛋得&nbsp;<span>{{luckyscore}}</span>&nbsp;分	
			</p>
			<p>
				为我的奖学金贡献了&nbsp;<span>{{myschoolship}}</span>&nbsp;元！	
			</p>
		</div>
		
</div>
</template>
<script>
import { bus } from '../../bus.js';
	export default{
		data(){
			return {
				pre:'',
				read:'',
				think:'',
				thisscore:'',
				luckyscore:'',
				showTotal:false,
				
				// myschoolship:'',
			}
		},
		methods:{},
		created(){
			var userId=sessionStorage.getItem('i');
			var signId=this.$route.params.id;
			var type=this.$store.state.saveItem.type;
			console.log(userId)
			console.log(signId)
			console.log(type)
			this.axios.get(this.ip.RESTPATH+"rest/getSignExamByUserIdAndSignId/"+userId+'/'+signId+'/'+type)
			.then(res=>{
				bus.$emit('closeloading')
				this.showTotal=true;
				console.log(res)
				this.pre=res.data.prep;
				this.read=res.data.read;
				this.think=res.data.think;
				this.thisscore=res.data.test;
				this.luckyscore=res.data.lucky;
			})

		},
		computed:{
				myschoolship(){
					return Math.floor((this.pre+this.read+this.think+this.thisscore+this.luckyscore)/10)*5;
				},
				totalscore(){
					return (this.pre+this.read+this.think+this.thisscore+this.luckyscore);
				},
				iscompleteE(){
		
				if (this.$store.state.saveItem.type=='last') {
					return true;
				}
			
		},
		},
		beforeCreate(){
			bus.$emit('loading')
			console.log('组件创建之前')
		}

	}
</script>
<style lang='less'>
@font-face {font-family: 'iconfont';
    src: url('../../../static/font/iconfont.eot');
    src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/iconfont.woff') format('woff'),
    url('../../../static/font/iconfont.ttf') format('truetype'),
    url('../../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}

	.totalMark{
		letter-spacing: 2px;
		h4{
			background: #5b9bd5;
			width:80%;
			margin:1rem auto;
			color:#fff;
			// text-align: center;
			padding:1rem;
			border-radius: 5px;
			text-indent: .5em;
		
		}
		.mysorce{
			width:80%;
			margin:1.5rem auto;
			background: #5b9bd5;
			// background:rgba(0, 0, 0, 0.01);
			overflow:hidden;
			border-radius: 6px;
			text-indent: 1em;
		
		p{
				color:#fff;
				margin: .8rem;
				font-size: 1.8rem;
				 
		}
		}
		.beizhu{
			width:80%;
			margin:3rem auto;
		}
		.mytotalsorce{
			width:80%;
			margin:1.5rem auto 3rem;
			overflow:hidden;
			background: #5b9bd5;
			border-radius: 5px;
			background:rgba(0, 0, 0, 0.01);
			box-shadow: 1px 1px 3px 3px #eee;
			p{
				
				font-size: 1.7rem;
				margin:1rem 0;
				text-indent: .6em;
			}

		}
		.img{
			width:100%;
			text-align: center;
			margin: auto;
			.iconfont{
				font-size: 4rem;
				color: #cec33b;
			}
		}
	}
</style>