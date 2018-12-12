<template>
	<section id="PreAudio">
		<h5><i class="iconfont" @click='goback'>&#xe655;</i></h5>
		<div class="audioPlay" v-if= 'showAudio'>
			<div>
				<!-- <div><img :src="preAudiodata.picId" alt="1"></div>	 -->
				<p>《{{preAudiodata.bookName}}》导读微课</p>
			</div>
			<div>
				<audioPlay :audioUrl='audioUrl' v-on:getPlayTime='getPlayTimes'></audioPlay>
			</div>
		</div>

		<div class="video_play" v-if='showVideo'>
				<video-player   ref="videoPlayer" id='videoP'
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata = "onPlayerLoadeddata($event)"
                	@timeupdate = "onPlayerTimeupdate($event)"
                	@canplay = "onPlayerCanplay($event)"
                 	@canplaythrough = "onPlayerCanplaythrough($event)"
                	@statechanged = "playerStateChanged($event)"
                	
              >
     			</video-player>
     	</div>
     	<h5 class="h5">导读微课</h5>
		<div class="text">
			<img :src="preAudiodata.content" alt="">

		</div>
	</section>
</template>

<script>
import {bus} from '../../../../../../bus.js'
import audioPlay from '../../../../../../components/audioPlay.vue'
	export default {
		data(){
			return {
					wxId:'',
					flag:true,
					totalTime:0,
					playTime:0,
					ifplay:true,
					playerOptions: {
			        // component options
			        start: 0,
			        playsinline: true,
			        // videojs options
			        muted: false,
			        language: 'zh-CN',
			        preload: 'auto', 
			        playbackRates: [0.7, 1.0],
			        sources: [{
			          type: "video/mp4",
			          src: '../../../../../../static/default.mp4'
			        }],
			        
			        poster: require('../../../../../../../static/logoPerson.png'),
			        controlBar: {
			         timeDivider: true,
			         durationDisplay: true,
			         remainingTimeDisplay: false,
			         fullscreenToggle: true  //全屏按钮
			       }
			      },
			      showAudio:false,
			      showVideo:false,
			      preAudiodata:{},
			      audioUrl:'',
			      showThis:false,
			      posStart:'',
			      posEnd:'',
			      posMove:'',
			      flags:true,
			      flag1:true,
			      overOneTime:true,
			}
		},
		components:{
			audioPlay
		},
		methods:{
			getPlayTimes(data){
				console.log(data);
				if(data[2]>0){
				if(data[2]-data[0]<2){
					if(this.flags){
						console.log('任务完成');
						let postdata = {
								wxId:this.wxId,
								readingId:this.$route.query.id1,
								readingDayId:this.$route.query.id,
								type:'audio',
								isFinish:true,
								compainId:sessionStorage.getItem('companidSign_'),
						};
						console.log(postdata)
						if(this.flag1){
							this.axios.post(this.ip.RESTPATH+'rest/postReadingDayResult',postdata)
							.then(res=>{
								console.log(res.data);
								bus.$emit('showTipNext');
								this.flags = false;
								this.flag1 = false;
						})
						}
						
						

					}
					
				}else{
					console.log('任务没完成')
				}
				}
			},
			taskOvers(){
				console.log('任务完成');
						let postdata = {
								wxId:this.wxId,
								readingId:this.$route.query.id1,
								readingDayId:this.$route.query.id,
								type:'audio',
								isFinish:true,
								compainId:sessionStorage.getItem('companidSign_'),
						};
						console.log(postdata)
						if(this.flag1){
							this.axios.post(this.ip.RESTPATH+'rest/postReadingDayResult',postdata)
							.then(res=>{
								console.log(res.data);
								bus.$emit('showTipNext');
								this.flags = false;
								this.flag1 = false;
						})
						}
			},
			goback(){
				this.$router.go(-1);
				// this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id}})
			},
			//视频
			onPlayerPlay(player) {
		      // console.log('开始播放!', player);
		     
		    },
		    onPlayerPause(player) {
		      // console.log('暂停!', player)
		    },
		    onPlayerEnded(player){
		      console.log('播放结束！',player);
		      // this.taskOvers();
		    },
		    onPlayerLoadeddata(player){
		    	// console.log('1',player)
		    },
	        onPlayerTimeupdate(player){
	        	// console.log('2',player);
	        	let t1 = parseInt(player.cache_.currentTime);
	        	let cT = player.cache_.currentTime;
	        	let dT = player.cache_.duration
	        	if(cT > parseInt(dT-10) && this.overOneTime){
	        		console.log('任务完成');
	        		this.taskOvers();
	        		this.overOneTime = false;
	        	}
       			
	        	},
	        onPlayerCanplay(player){
	        	// console.log('3',player)
	        },
	        onPlayerCanplaythrough(player){
	        	// console.log('4',player)
	        },
	        playerStateChanged(player){
        		// console.log(player)
        	// }
        	},

		},
    beforeCreate(){
    	bus.$emit('loading');
    },
		created(){
			sessionStorage.setItem('back','isIn');
			console.log(sessionStorage.getItem('companidSign_'))
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id = this.$route.query.id1;
			let that = this;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingDayAndAudiobyAudioId/'+id)
			.then(res=>{
				console.log(res.data);
					this.$parent.showThis = true;
				   bus.$emit('closeloading')
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.content)
					.then(function(res1){
						console.log(res1.data)
						res.data.content = that.ip.filePath2+res1.data[res.data.content].href;
						console.log(res.data.content);
					
				});

				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.videoUrl)
        			.then(res2 => {	
        				console.log(res2.data);
        				if(res.data.type == 'audio'){
							this.audioUrl = this.ip.filePath2+res2.data[res.data.videoUrl]['href'];
							this.showVideo = false;
							this.showAudio =true;

        				}else{
        					this.playerOptions.sources[0].src = this.ip.filePath2+res2.data[res.data.videoUrl]['href'];
        					console.log(this.playerOptions.sources[0].src)
        					this.showAudio = false;
        					this.showVideo = true;
        				}		
        		});
					this.preAudiodata = res.data;
					console.log(this.preAudiodata)
			})

	
			
		},
		mounted(){
			
			let id = this.$route.query.id;
			bus.$on('goNext',()=>{
				sessionStorage.setItem('sign','sign1')
				this.$router.replace({name:'everyTimeRead',query:{id:this.$route.query.id
				}})
				// this.$router.push({name:'timeRead',query:{id:id,id1:idArr.timer,go:-1}})
			})
			
		},
	}
</script>
<style lang='less'>
	#PreAudio{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		-webkit-display:flex;
		-webkit-flex-direction:column;
		background:#f2f2f2;
		overflow: hidden;
		padding-bottom: 3.5rem;
		&>h5{
			line-height:3rem;
			background: #fff;
			i{
				padding-left: 1rem;
				color:#555;
			}
		}
		.audioPlay{
		width:100%;
		height:30%;
		background: #fff;
		&>div{
		width:100%;
		&:first-child{
			&>div{
				width:7rem;
				height:8rem;
				margin:0 auto .5rem;
				&>img{
					display:inline-block;
					width:100%;
					height:100%;
					}
				}
				&>p{
					text-align:center;
					color:#0a0a0a;
					font-size:1.6rem;
					}
				}
		&:last-child{
			width:100%;
			height:50%;
			&>p{
				text-align: center;
				color:#9e9e9e;
				position: relative;
				top:-2rem;
			}
			/*.controls{
				margin-top: 1rem;
				&>div{
					width:100%;
					margin-top: 1rem;
					display:inline-block;
					&:first-child{
					width:60%;
					margin-left:20%;
					position:relative;
					height:2rem;
					&>p{
						display:inline-block;
						position:absolute;
						background:rgba(0, 0, 0, 0.06);
						height:.2rem;
						border-radius:3px;
						width:100%;
						left:0;
						top:0.9rem;		
					}
					.plays{
						background:#f60;
						width:0;
						z-index:999;

						span{
							display:inline-block;
							width:12px;
							height:12px;
							border-radius:50%;
							background:#f60;
							position:absolute;
							right:-10px;
							top:-5px;
						}
					}
					.buffered{
						width:0;
						background:#ddd;
						z-index: 888;
						}
					&>span{
						display:inline-block;
						position:absolute;
						width:3rem;
						text-align:center;
						line-height:2rem;
						top:0;
						font-size:1.3rem;
						&:first-of-type{
							left:-4rem;
							}
						&:last-of-type{
							right:-4rem;
							}
						}
					}
					&:last-child{
						display:flex;
						justify-content:center;
						button{
							width:20%;
							background:transparent;
							i{
								font-size:2rem;
								color:#409eff;
							}
							&:nth-child(2){
								i{
									font-size:3rem;
										}	
									}
								}
							}
						}	
					}*/
				}
			}
		}
			.video_play{
				position: relative;
				z-index:999;
			.video_item{
				position: absolute;
				width:100%;
				height:100%;
				left:0;
				top:0;
				z-index: 999;
				background: rgba(96, 98, 102, 0.73);
           		p{
           			position: absolute;
           			left:0;
           			top:50%;
           			transform: translateY(-50%);
           			width:100%;
           			height:2rem;
           			line-height: 2rem;
					color:#fff;
					text-align: center;
					letter-spacing: 2px;
					font-size: 1.8rem;
					font-family: 'FZShuTi';	
           		}
			}
				.video-player{
						// position: absolute;	
						// left:0;
						// top:0;
						width:auto;
    					height: auto;
    					// z-index: 888;
    					&>span{
    						position: absolute;
    						top:.5rem;
    						left:.5rem;
    						color:#fff;
    						display: inline-block;
    						width:10%;
    						height:2rem;
    						line-height: 2rem;
    						font-size: 2rem;
    						text-align: center;
    						border-radius: 3px;
    						background: rgba(0,0,0,.4);
    					}
					    &>div{
					      width: 100%;
					      height: auto;
					      .vjs-poster{
					        background-size: 50% auto;
     				 }
				      .vjs-big-play-button{
				        width: 1.8em;height: 1.8em!important;
				        line-height: 1.8em!important;
				        border-radius: .9em;
				        position: absolute;
				        left: 0;right: 0;top: 0;bottom: 0;
				        margin: auto!important;

				      }
			      video {
			        position: relative;
			        height: auto;
			      }
    }
  
			}
		}
		.h5{
				font-size:1.2rem;
				text-indent:2em;
				margin-top: .5rem;
				border-left:5px solid #e91e63;
				padding:.5rem 0;
				background:#fff;
				border-bottom:1px solid rgba(158, 158, 158, 0.11);
			}
		.text{
			flex:1;
			-webkit-flex:1;
			/*padding:1rem;*/
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
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