<template>
	<section id="readSum">
		<div class="header">
				<header>
					<div @click='goback'><i class="iconfont">&#xe655;</i></div>
					<div></div>
					<!-- <div><i class="iconfont">&#xe659;</i></div> -->
				</header>
				<div class="fl">
					<p>《{{readSumBookInfo.name}}》</p>
				</div>
				<div class="fl">
					<img :src="readSumBookInfo.picId" alt="1">
				</div>
		</div>
		<div class="mainBox">
		<div class="ReadDay">
				<p>第{{readSumBookInfo.node}}天</p>
				<p>你已经坚持阅读学习{{readSumBookInfo.day}}天</p>
		</div>
		<div class="navBlade">
			<ul>
				<li @click="goView('studyAudio',0)" :class="{over:audioIsFinish}"><span>Step.1</span> &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont" v-show='audioIsFinish'>&#xe62e;</i>音频学习</li>
				<li @click="goView('qstAnswer',1,readSumBookInfo.levelsIsFinish)" :class="{over:levelsIsFinish}"><span>Step.2</span> &nbsp;&nbsp;&nbsp;&nbsp;	<i class="iconfont" v-show='levelsIsFinish'>&#xe62e;</i>答题闯关</li>
				<li @click="goView('askQuestion1',2)" :class="{over:questionIsFinish}"><span>Step.3</span> &nbsp;&nbsp;&nbsp;&nbsp;	<i class="iconfont" v-show='questionIsFinish'>&#xe62e;</i>任务打卡</li>

			</ul>
		</div>
	</div>
	</section>
</template>
<script>
	import { mapActions } from 'vuex'
	import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				questionList:[],
				readSumBookInfo:{},
				showThis:false,
				finishArr:[],

			}
		},
		methods:{
			...mapActions({
      			getQuestions: 'getQuestions'
   			 }),
			goback(){
				this.$router.push({name:'ImmediateExp',params:{id:this.$route.params.id}});
			},
			immediatelyBuy(){},
			goView(type,i,finish){
				if(i == 0){
					this.$router.push({name:type,query:{id:this.readSumBookInfo.audio,id1:this.$route.query.id,id2:this.readSumBookInfo.levels}});
				}else{
					if(this.finishArr[i] == 'noBegin' && this.finishArr[i-1] == 'noBegin'){
						bus.$emit('tip','请先完成上一关')
					}else{
						 if(type=='qstAnswer'){
								if(finish == 'finish'){
									this.$router.push({name:'qstResult',query:{id:this.readSumBookInfo.levels,not2:'not2'}})
									}else{
										this.$router.push({name:type,query:{id:this.readSumBookInfo.levels,id1:this.$route.query.id}});
									}
								
									}else if(type == 'askQuestion1'){
								this.$router.push({name:type,query:{id:this.$route.query.id,id1:this.$route.query.id,type:'Summary'}})
								}
					}
				}
					
					
			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		computed:{
			audioIsFinish(){
				return this.readSumBookInfo.audioIsFinish=='finish'?true:false;
			},
			levelsIsFinish(){
				return this.readSumBookInfo.levelsIsFinish=='finish'?true:false;
			},
			questionIsFinish(){
				return this.readSumBookInfo.questionIsFinish=='finish'?true:false;
			},
			
		},
		created(){
			let wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			// let wxId = 'o76bqv9jetyLMDUBy6wEcEUmdrOE';
			let readingSummaryId = this.$route.query.id;
			let that =this;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingSummaryByReadingSummaryId/'+readingSummaryId+'/'+wxId)
			.then(res=>{
				bus.$emit('closeloading');
				this.$parent.showThis = true;
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.picId)
					.then(function(res1){
						console.log(res1.data)
						res.data.picId = that.ip.filePath1+res1.data[res.data.picId].href;
						console.log(res.data.picId)
					
				})
					this.readSumBookInfo = res.data;
					this.questionList = res.data.question;
					console.log(res.data);
					this.finishArr = [res.data.audioIsFinish,res.data.levelsIsFinish,res.data.questionIsFinish];
					console.log(this.finishArr)

			})
		},
	}
</script>
<style lang='less'>
	#readSum{
		width:100%;
		height:100%;
		background:#fff;
		display:flex;
		flex-direction:column;
		-webkit-display:flex;
		-webkit-flex-direction:column;
		overflow:hidden;
		.header{
				height:12rem;
				background-image:-webkit-linear-gradient(to bottom right, #529eff, #62c4d8, #e9622a);
			background-image:linear-gradient(to bottom right, #529eff, #62c4d8, #e9622a);
				header{
					border-bottom:1px solid rgba(204, 204, 204, 0.25);
					height:3rem;
					color:#fff;
					div{
						display:inline-block;
						/* background:rgba(255, 255, 255, .87); */
						float: left;
						height:100%;
						text-align:center;
						line-height:3rem;
						color:#fff;
							&:first-child{
								width:20%;
								text-align: left;
								text-indent: 1em;
							}
							&:nth-child(2){
								width:60%;	
							}
							&:nth-child(3){
								width:20%;
								color:#fff;
							}
						}
					}
					.fl{
						float: left;
						width:70%;
						height:8.5rem;
						position: relative;
						&>p{
							margin: 3rem 0 0 2rem;
							line-height:4.5rem;
							text-align: left;
							color:#fff;
							font-size: 1.7rem;
						}
						&>img{
							 width: 68%;
   							 	height: 90%;
    							margin-top: 1.8rem;
    							display: inline-block;
    							margin-left: 20%;

						}
						&:last-child{
							width:30%;
						}
					}
				}
		.mainBox{
			flex:1;
			-webkit-flex:1;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			margin-top: 3rem;
			.ReadDay{
				width:68%;
				margin:2rem auto 0;
				background:#f2f2f2;
				p{
					text-align:center;
					padding:.5rem 0;
					color:#0a0a0a;
					width:80%;
					margin:0 auto;
					&:first-child{
						border-bottom:1px solid #eaede6;
					}
				}
			}
			.navBlade{
				width:68%;
				margin:0 auto;
				ul{
					width:100%;
					display:flex;	
					justify-content:space-around;
					flex-wrap:wrap;
					-webkit-display:flex;
					-webkit-flex-wrap:wrap;
					-webkit-justify-content:space-around;	
					li{
						margin-top:1rem;
						width:100%;
						padding:1rem 0;
						background: #bfbfbf;
						border-radius:8px;
						text-align:center;
						font-size:1.3rem;
						color:#fff;
						border:2px solid #fff;
						position: relative;
						&>span{
							position: absolute;
							left:1rem;
							top:0;
							padding:1rem 0;
						}
						&>i{
							position: absolute;
							font-size: 3.5rem;
							top:1.5rem;
							left:1.5rem;
							color:rgba(255, 0, 0, 0.44);
						}
					}
					.over{
						background: #1ec3d6;
					}
				}
			}
			.questionBlade{
				width:85%;
				margin:4rem auto 0;
				ul{
					width:100%;
					height:100%;
					padding:1rem;
					border:2px solid #dcdfe6;
					border-radius:10px;
					li{
						font-size:1.3rem;
						&:last-child{
							padding:1rem;
							span{
							color:#f60;
							float: right;
							text-decoration:underline;
							}
						}
					}
				}
			}
		}
		footer{
			height:3.5rem;
			.buy{
				height:3.5rem;
				background:#fcfcfc;
				border-top:1px solid #ddd;
				&>button{
					width:50%;
					float: left;
					height:100%;
					border-style:none;
					line-height:3.5rem;
					outline:none;
					background:transparent;
					color:#fff;
					&>span{
						font-size:2rem;
					}
					&>b{
						font-style:normal;
						float: right;
						font-weight:400;
						position: relative;
						right:.5rem;
						bottom:-.5rem;
						font-size:1.2rem;
					}
					&:first-child{
						border-right:1px solid rgba(220, 223, 230, 0.89);
					}
					&:nth-child(2){
						border-right:1px solid rgba(220, 223, 230, 0.89);
						&>span{
							color:#f60;
							&:last-child{
								float: right;
								font-size:1.2rem;
								position:relative;
								bottom:-.5rem;
								right:1rem;
								color:#f60;
							}
						}
					}
				}
				.selectBuy{
					background:#f60;
				}
			}
		}
	}
</style>