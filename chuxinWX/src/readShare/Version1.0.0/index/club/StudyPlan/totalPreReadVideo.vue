<template>
	<section id="videoAskquestion" v-show='showThis'>
	<header v-show='showHeader'>
					<div @click='goback'><i class="iconfont">&#xe655;</i></div>
					<div> 《{{totalReadVideo.bookName}}》</div>
	</header>
		<div class="audioPlay" v-show='totalReadVideo.type=="audio"'>
			<audioPlay :audioUrl='totalReadVideo.videoUrl'></audioPlay>	
		</div>
		<div class="video_play" v-show='totalReadVideo.type!="audio"'>
			<div class="video_item" v-show='showvideoitem'><p>请回答下列问题</p></div>
				<video-player   ref="videoPlayer" id='videoP' class='video-player-box'
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
     	<div class="mainBoxs">
	     	<p class="PreReadContent">整书导读及阅读规划</p>
	     	<div class="showPic">
	     		<img :src="totalReadVideo.content" alt="">
	     	</div>
	     	<!-- <p class="PreReadContent classify">经典推荐</p>
	     	<ul class="booklist">
	     		<bookList :PreVideobooklists='PreVideobooklists'></bookList>
	     	</ul> -->
		</div>
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
import bookList from '../../../../../components/boolist.vue'
import audioPlay from '../../../../../components/audioPlay.vue'
import Vue from 'vue'
	export default {
		data(){return {
			data:'',
			nickname:'',
			headimg:'',
			 playerOptions: {
			        start: 0,
			        playsinline: true,
			        muted: false,
			        language: 'zh-CN',
			        preload: 'auto',
			        playbackRates: [0.7, 1.0],
			        sources: [{
			          type: "video/mp4",
			          src: '../../../../../../static/default.mp4',

			        }],
			        width: document.documentElement.clientWidth,
			        poster: require('../../../../../../static/logoPerson.png'),
			        controlBar: {
			         timeDivider: true,
			         durationDisplay: true,
			         remainingTimeDisplay: false,
			         fullscreenToggle: true  //全屏按钮
			       }
			      },
			      ABC:['A','B','C','D','E','F'],
			      isSecond:true,
			      // tarr:[3,10],
			      question:[],
			      selected:[],
			      showT:false,
			      showF:false,
			      showopt:true,
			      showTrueText:'再答一次',
			      falseAnswer:false,
			      showAnswerDiv:false,
			      showAnswerDivs:false,
			      answerTorF:'',
			      chance:0,
			      questionIn:0,
			      selectI:0,
			      showQuestionList:false,
			      showvideoitem:false,
			      videoId:'',
			      showHeader:true,
			      totalReadVideo:{},
			      PreVideobooklists:[],
			      showThis:false,
			      audioUrl:'',
		}},
		methods:{
			immediatelyBuy(){},
			hideHeader(){
				let that  = this;
				setTimeout(function(){
					that.showHeader = true;
				},2000)
				
			},
			tryAgain(){
				let that = this;
				console.log(this.selected[this.selectI])
				if(this.selected[this.selectI].kind=='Radio'){
					this.selected[this.selectI]['optionId'] = '';
					}else if(this.selected[this.selectI].kind=='MultiSelect'){
					this.selected[this.selectI]['optionId'] = [];
				}
				console.log(this.selected[0]['optionId'])
				this.chance++;
				console.log(this.chance)
				this.showAnswerDiv = false;	
				if(this.chance>1){
					this.showT = true;
					this.showF = true;
					if(this.showTrueText == '显示正确答案'){
						setTimeout(function(){
							$('video').get(0).play();
							that.showAnswerDivs = false;
							that.showQuestionList = false;
							that.showvideoitem =false;
						},1000)			
					}
				}

			},
			playVideo(){
				//每次播放初始化下一题的状态
				this.showAnswerDivs = false;
				this.showQuestionList = false;
				this.showvideoitem =false;
				$('video').get(0).play();
			},
			submit(){
					let v = this.selected[this.selectI];
					console.log(v)
						if(v.kind=='MultiSelect'){
								if(v.optionId.sort(function(a,b){return a-b}).join(',')==v.right){
										v.isRight = '1';
										this.showT = true;
										this.showF = true;
										this.showAnswerDivs = true;
										this.answerTorF = '答案正确';
									}else{
										this.showAnswerDiv = true;
										v.isRight = '0';
										this.answerTorF = '答案错误';
										this.falseAnswer = true;
										console.log(this.showAnswerDiv)			
									}
							}else if(v.kind=='Radio'){
								if(v.optionId == v.right){
									console.log('单选答案正确');
									v.isRight = '1';
									this.showT = true;
									this.showF = true;
									this.showAnswerDivs = true;
									this.answerTorF = '答案正确';
								}else{
									this.showAnswerDiv = true;
									v.isRight = '0';
									this.answerTorF = '答案错误';
									this.falseAnswer = true;
									if(this.chance==1){
										this.showTrueText = '显示正确答案';
									}			
							}
						}	
				console.log(this.selected);
			},
			isInArray(arr,value){
   				 for(var i = 0; i < arr.length; i++){
       					 if(value === arr[i]){
           						 return true;
       						 }
    					}
    				return false;
					},
			goback(){
				this.$router.go(-1);
			},
			onPlayerPlay(player) {
		      console.log('开始播放!', player);
		    },
		    onPlayerPause(player) {
		      // console.log('暂停!', player)
		    },
		    onPlayerEnded(player){
		      // console.log('播放结束！',player);
		    },
		    onPlayerLoadeddata(player){
		    	// console.log('1',player)
		    },
	        onPlayerTimeupdate(player){
	        	// console.log('2',player);
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
		components:{
			bookList,
			audioPlay
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		mounted(){

		},
		created(){
			this.$parent.showThis = false;
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			//获取视频答题的题目
			let id = this.$route.query.id;
			console.log(id)
			let that = this;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingGuideByReadingGuideId/'+id)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading')
				this.totalReadVideo = res.data;
				this.PreVideobooklists = res.data.courseList;
				let videoUrl = res.data.videoUrl
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+videoUrl)
        		.then(res1 => {
        			console.log(res1.data);
        			if(res.data.type == 'audio'){
        				res.data.videoUrl = this.ip.filePath2+res1.data[videoUrl]['href'];
        				console.log(res.data.videoUrl)
        			}else{
        				this.playerOptions.sources[0].src = this.ip.filePath2+res1.data[videoUrl]['href'];
        			}
        			
        			this.$parent.showThis = true;
        			this.showThis = true;

        			console.log(this.playerOptions.sources[0].src);
        			});

        		//获取每本书的封面地址
		 			let PicId = [];
		 			
		 			this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.content)
					.then(function(res1){
						 res.data.content = that.ip.filePath2+res1.data[res.data.content].href
					
			})
			})
			
			
		},
	}
</script>
<style lang='less'>
	#videoAskquestion{
		width:100%;
		height:100%;
		z-index:1000;
		position:relative;
		/*background:#f2f2f2;*/
		display:flex;
		flex-direction:column;
		-webkit-display:flex;
		-webkit-flex-direction:column;
		overflow:hidden;
		header{
				height:3.6rem;
				color:#555;
				width:100%;
				z-index:999;
				background:#fff;
					div{
						display:inline-block;
						/* background:rgba(255, 255, 255, .87); */
						float: left;
						height:100%;
						text-align:center;
						line-height:3.6rem;
						
							&:first-child{
								width:20%;
								text-align: left;
								text-indent:1em;
							}
							&:nth-child(2){
								width:60%;	
							}
							&:nth-child(3){
								width:20%;
								
							}
						}
					}
		.printTop{
			height:15%;
			position: relative;
			&>p{
				display: inline-block;
				height:4rem;
				margin:2rem 0;
				font-size: 1rem;
				color:#854836;
			&>span{
				display: inline-block;
				float: left;
				&:last-child{
				width:6rem;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				}
			}
			}
			&>span{
				display: inline-block;
				width: 7rem;
				line-height: 8rem;
				text-indent: .5em;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				float: left;
			}
			&>img{
				float: left;
				display: inline-block;
				height:4rem;
				width:4rem;
				border-radius: 50%;
				margin:2rem .5rem 2rem 1rem;
				border:1px solid #fefefe;
			}
			&>div{
				height:65%;
				width:5rem;
				float: right;
				margin:1rem .5rem;
				position: relative;
				&>img{
				position: absolute;
				width:100%;
				height:100%;
				left:0;
				top:0;
				}
				&>span{
				position: absolute;
				display: inline-block;
				width:100%;
				top:.2rem;
				left:0;
				text-align: center;

				}
			}
		}
		&>p{
			text-align: center;
			color:#9e9e9e;
			margin-bottom: 1rem;
		}
		.audioPlay{

			width:100%;
			height:30%;
			&>p{
				text-align: center;
				color:#9e9e9e;
				position: relative;
				top:-2rem;
			}
			
				
		}
		.video_play{
		position: relative;
		z-index:888;
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
		.bookPreVideo{
			background:#fff;
			padding:1.3rem 0;
			font-size:1.3rem;
			text-indent:2em;
			&>i{
				float:right;
				padding-right: 2rem;
			}
		}
		.mainBoxs{
			flex:1;
			-webkit-flex:1;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			margin-top: .5rem;
				.PreReadContent{
				border-left:5px solid #f60;
				padding:.8rem 0;
				background:#fff;
				font-size:1.3rem;
				text-indent:1em;
				}
				.booklist{
					overflow: scroll;
					-webkit-overflow-scrolling:touch;
				}
				.classify{
					margin:0;
				}
				.showPic{
					min-height:12rem;
					background: #f2f2f2;
					margin:.3rem 0;
					font-size:1.3rem;
					
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
		.QuestionList{
			max-height: 50%;
			width: 90%;
			margin:0 auto;
			margin-top: 1rem;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			.radio{
				background: #ff842f;
			}
			.checkBox{
				background: rgba(82, 206, 193, 0.7);
			}
			.text{
				background: #2bacfb;
			}
			.qst-box{
			width: 100%;
			padding: .5rem;
			margin: 1rem auto;
			height: auto;
         	border-radius: 6px;
         	background: rgba(255, 254, 254, 0.8);
			  &>div{
			    width: 100%;
			    height: auto;
			    position: relative;
			    .showAnswer{
			    	position: absolute;
			    	width:50%;
			    	height:10rem;
			    	background: #64cdaa;
			    	left:25%;
			    	top:3rem;
			    	border-radius: 6px;
			    	p{
			    		width:100%;
			    		text-align: center;
			    		// height:50%;
			    		line-height: 4rem;
			    		color:#fff;
			    		border-top: 1px solid rgba(238, 238, 238, 0.34);
			    		&:first-child{
			    			height:6rem;
			    			line-height: 6rem;
			    		}
			    	}
			    }
			    
			    .falseAnswer{
			    	background: red;
			    }
			    h5{
			      width: 100%;
			      min-height: 25px;
			      line-height: 25px;
			      font-size: 16px;
			    }
			    &>p{
			    	padding: 0 2%;
			    	margin: 10px 0;
			    	img{
			    		width: 100%;
			    		height: auto;
			    		margin: 0 auto;
			    	}
			    }

			    fieldset{
			      	width: 100%;
			      	height: auto;
			      	margin-top: .5rem;
			      	overflow: hidden;
            	 	border-radius: 3px;
            		 border-color:transparent;
			      p{
			        width: 100%;
			        min-height: 2rem;
			        overflow: hidden;
			        margin-top: .5rem;
			        label{
			        	display: inline-block;
			        	margin-right: 1rem;
			  			padding:.2rem .5rem;
			  			border-radius: 3px;
			        	i{
			        		font-style: normal;
			        		font-size: 1.4rem;
			        		&:last-child{
			        			display: inline-block;
			        			width:1.7rem;
			        			height: 1.7rem;
			        			background: #fd6e20;
			        			color:#fff;
			        			border-radius: 50%;
			        			text-align: center;
			        			line-height: 1.7rem;
			        		}
			        	}
			        }
			        input{
			          font-size: 1.2rem;
			          float: left;
			          width: 5%;
			          display: none;
			          opacity:0;-webkit-appearance:none;
			        }
			        input[type=checkbox]:checked+label,input[type=radio]:checked+label{
					  background: #409eff;
					  color:#fff;
			        }
			       .trueOpt{
			       		background:#22bb2e!important;
					 	color:#fff;
			       }
			       .falseOpt{
						background:red!important;
					 	color:#fff;
			       }

			      }
			     	 textarea{
				        width: 100%;
				        min-height: 12rem;
				        font-size: 14px;
				        resize: vertical;
				        background: transparent;
	              		border-radius: 5px;
	               		margin-top:5px;
	              		border-color:rgba(156, 160, 164, 0.21);
	               		-webkit-appearance:none;
			      }
			    }
			  }
			}
			&>p{
		        text-align: center;
		        width:60%;
		        padding:.8rem;
		        background: #24ccaa;
		        margin: 50px auto;
		        color: #fff;
		        font-size: 1.6rem;
		        letter-spacing: 2px;
		        border-radius: 6px;
        	button{
         		color: white!important;
         		background-color: #FF9800!important;
        }
		}

      }
	}

</style>