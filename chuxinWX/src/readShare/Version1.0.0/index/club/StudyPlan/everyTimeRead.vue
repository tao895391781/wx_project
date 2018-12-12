<template>
	<section id="everyTimeRead">
		<div class="header">
				<header>
					<div @click='goback'><i class="iconfont">&#xe655;</i></div>
					<div>
					</div>
				</header>
		</div>
		<div class="mainBox">
		<div class="ReadDay">
				<p>第{{clubClassBookInfo.node}}次</p>
				<p>《{{clubClassBookInfo.bookName}}》</p>
				<!-- <p>已坚持阅读第<span>{{clubClassBookInfo.day}}</span>&nbsp;天</p> -->
		</div>
		<div class="navBlade">
			<ul>
				<li @click="goView('PreAudio',index1)" :class="{over:audioFinish}" :index='index1'>
					<span ><i class="iconfont">&#xe65a;</i></span> 	
					<!-- <i class="iconfont" v-show='audioFinish'>&#xe62e;</i> -->
					导读微课
					<p>带着问题去阅读</p>
					<p  class='button' v-show='!audioFinish'><i class="iconfont">&#xe65d;</i></p>
					<p  class='button over' v-show='audioFinish'><i class="iconfont">&#xe7ad;</i></p>
				</li>

				<li @click="goView('timeRead',index2)" :class="{over:timeFinish}" :index='index2'>
					<span><i class="iconfont">&#xe6e7;</i></span> 
					<!-- <i class="iconfont" v-show='timeFinish'>&#xe62e;</i> -->
					计时阅读
					<p>翻开书本开始阅读</p>
					<p class='button' v-show='!timeFinish'><i class="iconfont">&#xe65d;</i></p>
					<p class='button over' v-show='timeFinish'><i class="iconfont">&#xe7ad;</i></p>
				</li>

				<li @click="goView('studyAdd',index3,clubClassBookInfo.accumulationIsFinish)" :class="{over:studyAddFinish}" :index='index3'>
					<span><i class="iconfont">&#xe729;</i></span> 
					<!-- <i class="iconfont" v-show='studyAddFinish'>&#xe62e;</i> -->
					阅读小测
					<p>检验效果&nbsp;&nbsp;完成阅读积累</p>
					<p class='button' v-show='!studyAddFinish'><i class="iconfont">&#xe65d;</i></p>
					<p class='button over' v-show='studyAddFinish'><i class="iconfont">&#xe7ad;</i></p>
				</li>

				<li @click="goView('askQuestion1',index4)" :class="{over:questionIsFinish}" :index='index4'>
					<span><i class="iconfont">&#xe661;</i></span>
					<!-- <i class="iconfont" v-show='questionIsFinish'>&#xe62e;</i> -->
					阅读分享
					<p>分享你的阅读思考和收获</p>
					<p class='button' v-show='!questionIsFinish'><i class="iconfont">&#xe65d;</i></p>
					<p class='button over' v-show='questionIsFinish'><i class="iconfont">&#xe7ad;</i></p>
				</li>

			</ul>
			<p @click="goView('readCard',4)" class="shareMyread"> 
				<span>阅读打卡&nbsp;|&nbsp;</span><b>分享我的阅读成就</b>
			</p>
		</div>
	</div>
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				questionList:[],
				clubClassBookInfo:{},
				showThis:false,
				index1:0,
				index2:1,
				index3:2,
				index4:3,
				finishArr:[],
				idArr:{},
				pagekeys:false,

			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			goView(type,i,isFinish){
				let id,id1,id2,timesId,cardId;	
				switch(type){
					case 'PreAudio':
						id1  = this.clubClassBookInfo.audio;
						id = this.$route.query.id;	
					break;
					case 'timeRead':
						id1  = this.clubClassBookInfo.timer;
						id = this.$route.query.id;
					break;
					case 'studyAdd':
						id1  = this.clubClassBookInfo.accumulation;
						id = this.$route.query.id;
					break;
					case 'readCard':
						id1  = this.clubClassBookInfo.readsign;
						id = this.$route.query.id;
						timesId = sessionStorage.getItem('timesId')
					break;
					case 'askQuestion1':
						id1 = this.$route.query.id;
						id = this.$route.query.id;
						cardId = this.clubClassBookInfo.readsign;
					}
						if(i==0){
							this.$router.push({name:type,query:{id:id,id1:id1}})	
						}if(type=='readCard'){
							if(this.finishArr[3] == 'noBegin'){
								bus.$emit('tip','请先完成上一关');
							}else{
								this.$router.push({name:'readCard1',query:{id:id,id1:id1}})
								}
							
						}else{
							if(this.finishArr[i] == 'noBegin' && this.finishArr[i-1] =='noBegin'){
								bus.$emit('tip','请先完成上一关');
								}else{
								if(type == 'askQuestion1'){
										this.$router.push({name:type,query:{id:id,id1:id1,type:'Day'}});
											
									}else if(type=='studyAdd'){
										if(this.clubClassBookInfo.accumulationIsFinish == 'finish'){
											this.$router.push({name:'StudyAddResult',query:{id:id,id1:id1,not2:'not2'}})
												}else{
													this.$router.push({name:type,query:{id:id,id1:id1}})	
												}
										}else{
											this.$router.push({name:type,query:{id:id,id1:id1}})
										}
										
								}
					}		
			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		computed:{
			audioFinish(){
				return this.clubClassBookInfo.audioIsFinish == 'finish'?true:false;
			},
			timeFinish(){
				return this.clubClassBookInfo.timerIsFinish == 'finish'?true:false;
			},
			studyAddFinish(){
				return this.clubClassBookInfo.accumulationIsFinish == 'finish'?true:false;
			},
			askFinish(){
				return this.clubClassBookInfo.accumulationIsFinish == 'finish'?true:false;
			},
			readCardFinish(){
				return this.clubClassBookInfo.readsignIsFinish == 'finish'?true:false;
			},
			questionIsFinish(){
				return this.clubClassBookInfo.questionIsFinish == 'finish'?true:false;
			},
		},
		created(){
			this.$parent.isFirst = false;
			console.log(sessionStorage.getItem('taskFrom'))
			let id = this.$route.query.id;
		  	let idArr = JSON.parse(sessionStorage.getItem('idArr'));
			console.log(idArr);
			let sign = sessionStorage.getItem('sign');
			//返回键处理，解决任务之前跳转按手机物理返回键不能返回到主页面
		  	if(sign){
		  		console.log(sign)
		  		switch(sign){
		  			case 'sign1':
		  			sessionStorage.setItem('sign',false);
		  			this.$router.replace({name:'timeRead',query:{id:id,id1:idArr.timer}});
		  			break;
		  			case 'sign2':
		  			sessionStorage.setItem('sign',false);
		  			this.$router.replace({name:'studyAdd',query:{id:id,id1:idArr.accumulation}});
		  			break;
		  			case 'sign3':
		  			sessionStorage.setItem('sign',false);
		  			this.$router.replace({name:'askQuestion1',query:{id:id,id1:idArr.question,type:'Day'}});
		  			break;
		  			case 'sign4':
		  			sessionStorage.setItem('sign',false)
		  			this.$router.replace({name:'readCard1',query:{id:id,id1:idArr.readCard}})
		  			break;
		  			case 'sign5':
		  			sessionStorage.setItem('sign',false)
		  			this.$router.replace({name:'StudyAddResult',query:{id:id,id1:idArr.accumulation}})
		  			break;
		  			case 'sign6':
		  			sessionStorage.setItem('sign',false)
		  			this.$router.replace({name:'askQuestion1',query:{id:id,id1:idArr.question,type:'Day',cardId:idArr.readCard}});
		  		}
		  	}
			let wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let that = this;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingDayByReadingDayId/'+id+'/'+wxId)
			.then(res=>{
				console.log(res.data);
				this.$parent.showThis = true;
				bus.$emit('closeloading');
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.picId)
					.then(function(res1){
						console.log(res1.data)
						res.data.picId = that.ip.filePath1+res1.data[res.data.picId].href;
						console.log(res.data.picId)
					
				})
					this.clubClassBookInfo = res.data;
					this.questionList = res.data.question;
					// res.data.questionIsFinish = 'noFinish'
					this.finishArr = [res.data.audioIsFinish,res.data.timerIsFinish,res.data.accumulationIsFinish,res.data.questionIsFinish];
					this.idArr = {'audio':res.data.audio,'timer':res.data.timer,'accumulation':res.data.accumulation,'question':this.$route.query.id,'readCard':res.data.readsign};
					console.log(this.finishArr)
					sessionStorage.setItem('studyAdd',res.data.accumulationIsFinish);
					sessionStorage.setItem('idArr',JSON.stringify(this.idArr));
					sessionStorage.setItem('FinishWhich',this.finishArr.join(','))

					console.log(sessionStorage.getItem('FinishWhich'))
			})
		},
	}
</script>
<style lang='less'>
	#everyTimeRead{
		width:100%;
		height:100%;
		background:#fff;
		display:flex;
		flex-direction:column;
		display: -webkit-flex;
		-webkit-flex-direction:column;
		overflow:hidden;
		.header{
				/*height:11rem;
				background-image:-webkit-linear-gradient(to bottom right, #529eff, #62c4d8, #e9622a);
			background-image:linear-gradient(to bottom right, #529eff, #62c4d8, #e9622a);*/
				header{
					height:3.6rem;
					color:#222;
					div{
						display:inline-block;
						/* background:rgba(255, 255, 255, .87); */
						float: left;
						height:100%;
						text-align:center;
						line-height:3.6rem;
						color:#222;
						font-size:2rem;
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
						height:8.4rem;
						&>p{
							line-height:4.5rem;
							text-align: left;
							color:#fff;
							font-size: 1.7rem;
							margin: 3rem 0 0 2rem;

						}
						&>img{
							    width: 61%;
   							 	height: 90%;
    							margin-top: .7rem;
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
			.ReadDay{
				width:68%;
				margin:0rem auto 0;
				color:#9e9e9e;
				p{
					text-align:center;
					padding:.6rem 0;
					width:80%;
					margin:0 auto;
					font-size: 1.6rem;
					letter-spacing: 2px;
					color:#333;
					span{
						/*font-size: 2rem;*/

					}
					&:first-child{
						border-bottom:1px dashed #333;
						font-size: 2rem;
						font-weight: 600;
						color:#000;
					}
				}
			}
			.navBlade{
				width:70%;
				margin:0 auto;
				padding:.4rem;
				ul{
					width:100%;
					border-right:2px solid rgba(158, 158, 158, 0.47);
					li{
						width:100%;
						padding:.4rem 0;
						border-radius:5px;
						text-align:left;
						font-size:1.7rem;
						text-indent: 3rem;
						letter-spacing: 1px;
						color:#000;
						position: relative;
						margin:2.5rem 0;
						p{
							font-size:1.3rem;
							text-align: left;
							text-indent: 3rem;
							color:rgba(158, 158, 158, 0.77);
						}
						.button{
							position: absolute;
							width:5rem;
							height: 5rem;
							text-align: center;
							line-height: 5rem;
							border-radius: 50%;
							background: #9e9e9e;
							right:-2.5rem;
							top:50%;
							color:#fff;
							text-indent: 0;
							transform: translateY(-50%);
							box-shadow: 1px 1px 2px #ddd;
							border:1px solid #eee;
							i{
								color:#fff;
								font-size: 3rem;
							}
						}
						.over{
							background: #fff;
							i{
								color:#09f898;
							}
							
						}
						&>span{
							position: absolute;
							left: -1.5rem;
							top:50%;
							transform: translateY(-50%);
							display: inline-block;
							width:3rem;
							height:3rem;
							text-align: center;
							text-indent: 0;
							i{
								font-size: 2.8rem;
								line-height: 3rem;
							}

						}
						.overs{
							background: #03a9f4;
							color:#fff;
						}
						
						&:last-child{
							span{
							i{
									color:#fb9183;
								}
						}
					}
						&:first-child{
							span{
								i{
									color:#f59db8;
								}
							}
						}
						&:nth-child(2){
							span{
								i{
									color:#4ac8da;
								}
							}
						}
						&:nth-child(3){
							span{
								i{
									color:#acb2ee;
								}
							}
						}
					}
					&>.over{
						/*background: #1ec3d6;*/
					}
				}
				.shareMyread{
					width:100%;
					text-align: center;
					line-height: 2.8rem;
					border-radius: 5px;
					/*background:#5fbecb;*/
					color:#5fbecb;
					font-size:1.6rem;
					margin-top: 6rem;
					letter-spacing: 1px;
					border:1px solid #ddd;
					span{
						font-size: 1.6rem;
					}
					b{
						font-size: 1.3rem;
						color:rgba(102, 102, 102, 0.65);
						font-weight: normal;
					}
				}
			}
			.questionBlade{
				width:85%;
				margin:2rem auto;
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