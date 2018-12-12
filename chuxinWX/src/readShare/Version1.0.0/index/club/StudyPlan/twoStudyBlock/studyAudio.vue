<template>
	<section id="studyAudio" v-show= 'showThis'>
		<div class="NoPlay" v-show = 'showNoPlay'>请先回答以下问题</div>
		<h5><i class="iconfont" @click='goback'>&#xe655;</i></h5>
		<div class="audioPlay" v-if='!showAudioOrVideo'>
			<div>
				<div><img :src="studyAudioData.picId" alt="1"></div>	
				<p>《{{studyAudioData.bookName}}》</p>
			</div>
			<div>
				<audioPlay :audioUrl='studyAudioData.videoUrl' v-on:getPlayTime='getPlayTimes'></audioPlay>
			</div>
		</div>
		<div class="video_play" v-if='showAudioOrVideo'>
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
		<h5 class="h5">问题来了</h5>
		<div class="text" v-show='showQ'>
	<section class='QuestionList' v-show='showQuestionList'>
		<div class="qst-box" v-for="(item,questionindex) in question" :indexs='questionindex'>
            <div class="radio-question" v-if="item.type=='Radio'" :class="{radio:false}">
            	<div class="showAnswer" v-show='showAnswerDiv'>
            		<p>
            			<img src="../../../../../../assets/images/deyi.png" v-show='trueAnswer'>
            			<img src="../../../../../../assets/images/nanguo.png" v-show='twoAsk'>
            			<img src="../../../../../../assets/images/yiwen.png" v-show='falseAnswer' ><br>
            			<span>{{tipText}}</span>
            		</p>
            		<p @click='tryAgain'>{{showTrueText}}</p> 
            	</div>
            	<div class="showAnswer" v-show='showAnswerDivs'>
            		<p>
            			<img src="../../../../../../assets/images/deyi.png" v-show='trueAnswer'>
            			<img src="../../../../../../assets/images/nanguo.png" v-show='twoAsk'>
            			<img src="../../../../../../assets/images/yiwen.png" v-show='falseAnswer' ><br>
            			<span>{{tipText}}</span>
            		</p>
            		<p @click='playAudio'>确认</p> 
            	</div>
              <h5>
                 {{selectI+1}}、{{item.content}}(单选)
              </h5>
             <!--   <p v-if="item.imgpath">
                <img :src="item.imgpath" >
               </p> -->
              <fieldset>
                 <p v-for="(qst,index) in item.option">
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id"  :value="qst.id" v-model="selected[selectI]['optionId']">
                    	<label :for="'radio'+qst.id" :class="{trueOpt:qst.score==1 && showT,falseOpt:selected[selectI]['optionId']==qst.id && qst.score==0 && showF}">
                    		<!-- <i class="iconfont showT" v-show='qst.flag==1 && showT'>&#xe613;</i> -->
                    		<!-- <i class="iconfont showF" v-show='showF'>&#xe6bd;</i> -->
                    		<i class="opt"            v-show='showopt'>{{ABC[index]}}</i>
                    		&nbsp;
                    		<span>{{qst.content}}</span>
                    	</label>
                   
                 </p>
              </fieldset>
            </div>
            <div class="checkbox-question" v-if="item.type=='MultiSelect'" :class="{checkBox:false}">
            	<div class="showAnswer" v-show='showAnswerDiv'>
            		<p>
            			<img src="../../../../../../assets/images/deyi.png" v-show='trueAnswer'>
            			<img src="../../../../../../assets/images/nanguo.png" v-show='twoAsk'>
            			<img src="../../../../../../assets/images/yiwen.png" v-show='falseAnswer' ><br>
            			<span>{{tipText}}</span>
            		<p @click='tryAgain'>{{showTrueText}}</p> 
            	</div>
            	<div class="showAnswer" v-show='showAnswerDivs'>
            		<p>
            			<img src="../../../../../../assets/images/deyi.png" v-show='trueAnswer'>
            			<img src="../../../../../../assets/images/nanguo.png" v-show='twoAsk'>
            			<img src="../../../../../../assets/images/yiwen.png" v-show='falseAnswer' ><br>
            			<span>{{tipText}}</span>
            		</p>

            		<p @click='playAudio'>确认</p> 
            	</div>
                    <h5>
                      {{questionindex+1}}、{{item.content}}(多选)
                    </h5>
                    <fieldset>
                        <p v-for="(qst,index) in item.option">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value="qst.id" v-model="selected[selectI]['optionId']">
                        <label :for="'checkbox'+qst.id" :class="{trueOpt:qst.score==1 && showT,falseOpt:isInArray(selected[selectI]['optionId'],qst.id) && qst.score== 0 && showF}">
                         	<!-- <i class="iconfont showT" v-show='showT'>&#xe613;</i>
                    		<i class="iconfont showF" v-show='showF'>&#xe6bd;</i> -->
                    		<i class="opt"            v-show='showopt'>{{ABC[index]}}</i>
                    		&nbsp;
                    		<span>{{qst.content}}</span>
                        </label>
                        </p>
                    </fieldset>
            </div>	  
			</div>
			<p @click='submit'>提交答案</p>
		</section>
		</div>
	</section>
</template>

<script>
import audioPlay from '../../../../../../components/audioPlay.vue'
import {bus} from '../../../../../../bus.js'
	export default {
		data(){
			return {
					type:'',
					wxId:'',
					flag:true,
					totalTime:0,
					playTime:0,
					ifplay:true,
					ABC:['A','B','C','D','E','F'],
			        isSecond:true,
			        question:[],
			        selected:[],
			        showT:false,
			        showF:false,
			        showopt:true,
			        showTrueText:'再答一次',
			        falseAnswer:false,
			        trueAnswer:false,
			        twoAsk:false,
			        showAnswerDiv:false,
			        showAnswerDivs:false,
			        answerTorF:'',
			        chance:0,
			        questionIn:0,
			        selectI:0,
			        showQuestionList:true,
			        showvideoitem:false,
			        studyAudioData:{},
			        audioUrl:'',
			        playTimes:'',
			        position:[],
			        position1:[1,2,3],
			        showQ:false,
			        showNoPlay:false,
			        flags:true,
			        showAudioOrVideo:false,
			        playerOptions: {
			        // component options
			        start: 0,
			        playsinline: true,
			        // videojs options
			        muted: false,
			        language: 'zh-CN',
			        playbackRates: [0.7, 1.0],
			        sources: [{
			          type: "video/mp4",
			          src: ''
			        }],
			        
			        poster: require('../../../../../../../static/logoPerson.png'),
			        controlBar: {
			         timeDivider: true,
			         durationDisplay: true,
			         remainingTimeDisplay: false,
			         fullscreenToggle: true  //全屏按钮
			       }
			      },
			      showThis:false,
			      tipText:'',
			}
		},
		components:{audioPlay},
		methods:{
			onPlayerPlay(player) {
		      // console.log('开始播放!', player);
		     
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
	        	console.log('2',player);
	        	let t1 = parseInt(player.cache_.currentTime);
	        	this.position1.forEach((v,index)=>{
	        		if(t1==v && this.isSecond !== t1){
	        			this.isSecond  =  t1;
		        		$('video').get(0).pause();
		        		// bus.$emit('pause');
		        		this.showQ = true;
		        		console.log('显示第'+index+'道题')
		        		this.showNoPlay = true;
		        		//退出全屏
		        		// player.exitFullscreen();
		        		// console.log(player.exitFullscreen)
		        		//到规定时间显示题目/初始化这一题的状态 
		        		this.chance=0;
		        		console.log(this.chance)
		        		this.selectI = index;
		        		this.question = [];
		        		console.log(index)
		        		this.question.push(this.studyAudioData.questions[index])
		        		console.log(this.question)
		        		this.showT = false;
						this.showF = false;
						console.log(this.selected)
		        		if(this.selected[index].kind=='Radio'){
							this.selected[index]['optionId'] = '';
								}else if(this.selected[index].kind=='MultiSelect'){
									this.selected[index]['optionId'] = [];
										}
		        		this.showvideoitem =true;
	        			}
	        		})

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

			getPlayTimes(data){
				console.log(data)
				if(data){
					this.playTimes = data[0];
						if(data[2]-data[0]<3){
							if(this.flags){
						console.log('任务完成');
						let postdata = {
								wxId:this.wxId,
								readingId:this.$route.query.id,
								readingDayId:this.$route.query.id1,
								type:'audio',
								isFinish:true
						};
						console.log(postdata)
						this.axios.post(this.ip.RESTPATH+'rest/postReadingSummaryResult',postdata)
						.then(res=>{
							console.log(res.data);
							bus.$emit('showTipNext');
						})
						this.flags = false;
					}	
				}else{
					console.log('任务没完成')
				}
				}
				let t1 = this.playTimes;
	        	this.position.forEach((v,index)=>{
	        		if(t1==v && this.isSecond !== t1){
	        			this.isSecond  =  t1;
	        			
	        				$('audio').get(0).pause();
		        			bus.$emit('pause');
	        			
		        		this.showQ = true;
		        		console.log('显示第'+index+'道题')
		        		this.showNoPlay = true;
		        		//退出全屏
		        		// player.exitFullscreen();
		        		// console.log(player.exitFullscreen)
		        		//到规定时间显示题目/初始化这一题的状态 
		        		this.chance=0;
		        		console.log(this.chance)
		        		this.selectI = index;
		        		this.question = [];
		        		console.log(index)
		        		this.question.push(this.studyAudioData.questions[index])
		        		console.log(this.question)
		        		this.showT = false;
						this.showF = false;
						console.log(this.selected)
		        		if(this.selected[index].kind=='Radio'){
							this.selected[index]['optionId'] = '';
								}else if(this.selected[index].kind=='MultiSelect'){
									this.selected[index]['optionId'] = [];
										}
		        		this.showvideoitem =true;
	        			}
	        		})

			},
			immediatelyBuy(){

			},
			isInArray(arr,value){
   				 for(var i = 0; i < arr.length; i++){
       					 if(value === arr[i]){
           						 return true;
       						 }
    					}
    				return false;
					},
			tryAgain(){
				this.falseAnswer = false;
			    this.trueAnswer = false;
			    this.twoAsk = false;
			    this.tipText='';
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
				this.twoAsk = true;	
				this.tipText = '答错了';
				if(this.chance>1){
					this.showT = true;
					this.showF = true;
					if(this.showTrueText == '你没机会了，显示答案'){
						setTimeout(function(){
							if(that.type=='audio'){
								$('audio').get(0).play();
								bus.$emit('player');
			       				
							}else{
								$('video').get(0).play();
							}
							that.showNoPlay = false;
								that.showAnswerDivs = false;
								that.showvideoitem =false;
							
						},1000)			
					}
				}
			},
			playAudio(){
				if(this.type == 'audio'){
					$('audio').get(0).play();
			        bus.$emit('player');
			  		this.showAnswerDivs = false;
			        this.showNoPlay = false;
				}else{
					$('video').get(0).play();
					this.showAnswerDivs = false;
			        this.showNoPlay = false;
				}
				

			},
			goback(){
				this.$router.go(-1);
			},
			submit(){
				this.falseAnswer = false;
			    this.trueAnswer = false;
			    this.twoAsk = false;
			    this.tipText='';
			    console.log(this.chance)
				let v = this.selected[this.selectI];
					console.log(v)
						if(v.kind=='MultiSelect'){
							console.log('多选')
								if(v.optionId.sort(function(a,b){return a-b}).join(',')==v.right){
										v.isRight = '1';
										this.showT = true;
										this.showF = true;
										this.showAnswerDivs = true;
										this.trueAnswer = true;
										this.tipText = '恭喜你答对了';
										this.answerTorF = '答案正确';
									}else{
										this.showAnswerDiv = true;
										v.isRight = '0';
										this.answerTorF = '答案错误';
										this.falseAnswer = true;
										this.tipText = '答错了';
										this.showTrueText = '再答一次';
										console.log(this.showAnswerDiv)
										if(this.chance==1){
											this.falseAnswer = false;
											this.twoAsk = true;
											this.tipText = '下次继续努力';
											this.showTrueText = '你没机会了，显示答案';
										}else{
											this.twoAsk = false;
											this.falseAnswer = true;
										}	
									}
							}else if(v.kind=='Radio'){
								console.log('单选')
								if(v.optionId == v.right){
									console.log('单选答案正确');
									v.isRight = '1';
									this.showT = true;
									this.showF = true;
									this.showAnswerDivs = true;
									this.answerTorF = '答案正确';
									this.trueAnswer = true;
									this.tipText = '恭喜你答对了';
								}else{
									console.log('错误')
									this.showAnswerDiv = true;
									v.isRight = '0';
									this.answerTorF = '答案错误';
									this.falseAnswer = true;
									this.showTrueText = '再答一次';
									this.tipText = '答错了';
									if(this.chance==1){
										this.falseAnswer = false;
										this.twoAsk = true;
										console.log(this.chance);
										this.tipText = '下次继续努力';
										this.showTrueText = '你没机会了，显示答案';
									}else{
										this.twoAsk = false;
										this.falseAnswer = true;
									}		
							}
						}
				console.log(this.selected);
			},
			
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.$parent.showThis = false;
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			// this.wxId = 'o76bqv9jetyLMDUBy6wEcEUmdrOE';
			this.getPlayTimes();
			let that = this;
			let id = this.$route.query.id;
			console.log(id)
			this.axios.get(this.ip.RESTPATH+'rest/getReadingSummaryVideoByReadingVideoId/'+id)
			.then(res=>{
				bus.$emit('closeloading')
				this.$parent.showThis = true;
				this.showThis = true;
				console.log(res.data);
				this.type = res.data.type;
				if(res.data.type == 'audio'){
					this.showAudioOrVideo = false;
				}else{
					this.showAudioOrVideo = true;
				}
				res.data.questions.forEach(v=>{
					this.position.push(v.position);
				})
				console.log(this.position)
				let picAndAudio = res.data.picId+','+res.data.videoUrl;
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+picAndAudio)
					.then(function(res1){
						console.log(res1.data)
						res.data.picId = that.ip.filePath1+res1.data[res.data.picId].href;
						res.data.videoUrl = that.ip.filePath2+res1.data[res.data.videoUrl].href;
					
				})
					this.studyAudioData = res.data
					this.question.push(res.data.questions[0]);

					console.log(this.studyAudioData)
				
				console.log(this.question)
				let rightResult=[];
				res.data.questions.forEach((v,index)=>{
				   if(v.type =='MultiSelect'){
					let right = [];
					for (let i =0;i<v.option.length;i++){
							if(v.option[i].score==1){
								right.push(v.option[i]['id'].toString())
								}
							}
							 rightResult[index] = {
							 	kind:'MultiSelect',
							 	isRight:'',
							 	id:v.id,
							 	optionId:[],
							 	right:right.sort(function(a,b){return a-b}).join(','),
							 }
							 console.log(index+'多选正确答案和选择的答案')
							 console.log(rightResult);
						}else if(v.type =='Radio'){
							let right='';
							for(let i=0;i<v.option.length;i++){
								if(v.option[i].score==1){
									right+=v.option[i]['id'].toString();
								}	
							}
							rightResult[index] = {
								kind:'Radio',
							 	isRight:'',
							 	id:v.id,
							 	optionId:'',
							 	right:right,
							}
							console.log(index+'单选正确答案和选择的答案')
							 console.log(rightResult);
						}else if(v.type =='写作'){
								rightResult[index] = {
									kind:'Text',
									optionId:'',
									id:v.id,
								}
						}
				})
			this.selected = rightResult;
			console.log(this.selected )
			
			})
			let id1 = this.$route.query.id1;
			let id2 =this.$route.query.id2;
			bus.$on('goNext',()=>{
				this.$router.push({name:'qstAnswer',query:{id:id2,id1:id1}})
			})
			
				
			
			
		},
	}
</script>
<style lang='less'>
	#studyAudio{
		width:100%;
		display:flex;
		flex-direction:column;
		-webkit-display:flex;
		-webkit-flex-direction:column;
		background:#f2f2f2;
		flex:1;
		&>.NoPlay{
			position: fixed;
			width:100%;
			height:35%;
			left:0;
			top:3rem;
			background: rgba(0,0,0,.4);
			z-index: 1001;
			color:#fff;
			text-align: center;
			line-height: 233px;
		}
		&>h5{
			line-height:3rem;
			i{
				padding:0 1rem;
				color:#555;
			}
		}
		.audioPlay{
		width:100%;
		height:40%;
		border-bottom: 1px solid #eee;
		position: relative;
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
					}
				}
		&:last-child{
			width:100%;
			height:50%;
			.controls{
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
						background:#fff;
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
					}
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
		&>.h5{
				font-size:1.2rem;
				text-indent:2em;
				border-left:5px solid #f60;
				padding:.5rem 0;
				background:#fff;
			}
		.text{
			flex:1;
			-webkit-flex:1;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			.QuestionList{
			width: 90%;
			margin:0 auto;
			margin-top: 1rem;
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
			    	height:11rem;
			    	background: rgba(115, 133, 159, 0.71);
			    	left:25%;
			    	top:3rem;
			    	border-radius: 6px;
			    	p{
			    		width:100%;
			    		text-align: center;
			    		line-height: 3rem;
			    		color:#fff;
			    		border-top: 1px solid rgba(238, 238, 238, 0.34);
			    		&:first-child{
			    			height:8rem;
			    			/*line-height: 6rem;*/
			    		}
			    		&>img{
			    			display: inline-block;
			    			width:4.5rem;
			    			height:4.5rem;
			    			margin-top: .5rem;
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
		        background: #529eff;
		        margin: 30px auto;
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