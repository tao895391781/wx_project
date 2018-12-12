<template>
	<section id="messages" v-show='showThis'>
		<header>
					<div @click='goback'><i class="iconfont">&#xe655;</i></div>
					<div>
					</div>
				</header>
		<div class="content">
			<p class="questionItem">任务{{numberToZh_C[selectedIndex]}}：{{quseionItem}}</p>
			<textarea id="text" placeholder="写下您今天的阅读思考或收获吧" v-model='Ctext'></textarea>
			<span class="fontSize" :class="{activeSign:thanFont}"><i>{{fontLength}}</i>/{{maxFont}}</span>

			<div class="picture" v-for='i in img1'>
				<img :src="img1" alt="">
				<i class="iconfont" @click='cancleImg'>&#xe653;</i>
			</div>
			<div class="record">
				<ul>
					 <li is='recordVoice' :audioUrl='audioList'></li>    
				</ul>
			</div>

			<button class="addRe addPic" @click='selfSelect'>
			<i class="iconfont">&#xe8a1;</i><br>
			添加图片
			</button>
			<button class="addRe" @click='addRe'>
				<i class="iconfont">&#xe6e4;</i>
				<br>
				添加语音
			</button>
			</div>
		
		<button class="submit" @click='submit'>发布</button>
		<div class="stratRecord" v-show='showRe'>
			<div class="top" @click='hideRe'></div>
			<div class="bottom">
				<p v-show='reing'>点击开始录音</p>
				<p v-show='!reing'>{{timeN}}<span v-show='!sending'>s/60</span>s</p>
				<div class="start" :class="{active:sending}">
					<div v-show='reing' class="playing" @click='playRecord'></div>
					<div v-show='ending' class="pauseing" @click='endRecords'></div>
					<div v-show='sending' class="send" @click='sendRecord'>发送</div>
				</div>
				<p class="prelisten com" v-show='sending' @click='trylisten'>{{preText}}</p>
				<p class="delRecord com" v-show='sending' @click='showcancleRecord = true'>删除</p>
			</div>
		</div>
		<div class="cancleRecord" v-show='showcancleRecord'>
			<div>
				<p>确定取消录音吗？</p>
				<button @click='showcancleRecord = false'>取消</button>
				<button @click='delRecords'>确认</button>
			</div>
		</div>
	</section>
</template>
<script>
import recordVoice from './recordVoice.vue'
import {bus} from '../bus.js'
	export default {
		data(){
			return {
				wxId:'',
				maxFont:400,
				Ctext:'',
				showThis:false,
				showRe:false,
				audioList:[/*{src:"http://test.wsreading.com:9010/file/20180726/68e690ad-ee4b-4f35-811e-7910f949d940/test.mp3",flag:false,currentTime:0,"totalTate":0,TotalTime:30},{src:'http://up.mcyt.net/?down/47444.mp3',flag:false,currentTime:0,"totalTate":0,TotalTime:40}*/],
				timeN:0,
				timer1:0,
				recordFlag:false,
				audioHref:'',
				ending:false,
				reing:true,
				sending:false,
				playRecordHref:'',
				showcancleRecord:false,
				preText:'试听',
				img1:[
				/*'https://goss.veer.com/creative/vcg/veer/800water/veer-157724300.jpg'*/
				],
				content:'',
				content1:'',
				content2:'',
				flag:true,
				localId:'',
				ComplocalId:'',
				autoOrhander:false,
				ifRecord:false,
				quseionItem:sessionStorage.getItem('questionSign'),
				selectedIndex:sessionStorage.getItem('selectedIndex'),
				numberToZh_C:['一','二','三','四','五','六'],
			}
		},
		computed:{
			fontLength(){
				return this.Ctext.length;
			},
			thanFont(){
				return this.Ctext.length>this.maxFont?true:false
			},
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
				cancleImg(){
					this.img1 = [];
				},
				submit(){
					if((this.Ctext == '' && this.audioList.length == 0 && this.img1.length == 0  )){
						bus.$emit('tip','留言不能为空')
					}else if(this.thanFont){
						bus.$emit('tip','文字留言字数超过'+this.maxFont+'个')
					}else if(this.$route.query.type=='Day' || this.$route.query.type =='Summary'){
						bus.$emit('submithuimu','正在提交..');
						let audioArr = [];
							if(this.kind =='audio'){
								this.audioList.forEach(v=>{
								audioArr.push(v.src)
								})
							}
							let audioList = [];	
							this.audioList.forEach(v=>{
								audioList.push(v.src)
							})
						let postdata = {
						type:this.$route.query.type,
						readingId:this.$route.query.id1,
						wxId: this.wxId,
						contentText:this.Ctext,
						contentAudio:audioList.join(','),
						contentImg:this.img1.join(','),
						question:sessionStorage.getItem('questionSign'),
					};
				console.log(postdata)
				this.axios.post(this.ip.RESTPATH+'rest/postMyAnswerAndMessage',postdata)
				.then(res=>{
					console.log(res.data);
					if(res.data.flag){	
					this.audioList = [];
					this.Ctext = '';
					this.img1 = [];
					bus.$emit('closesubmithuimu','提交成功')
					if(this.$route.query.type == 'Day'){
						let postdata1 = {
						 wxId:this.wxId,
						 readingId:this.$route.query.id1,
						 readingDayId:this.$route.query.id,
						 type:'question',
						 isFinish:true,
						 compainId:sessionStorage.getItem('companidSign_'),
					};
					console.log(postdata1);
					this.axios.post(this.ip.RESTPATH+'rest/postReadingDayResult',postdata1)
					.then(res=>{
						console.log(res.data);
						bus.$emit('goNexts');
						let arr = sessionStorage.getItem('FinishWhich').split(',');
						arr[3] = 'finish';
						sessionStorage.setItem('ifMessageFirst','isFirst');
						sessionStorage.setItem('FinishWhich',arr.join(','));
					})
				}else if(this.$route.query.type == 'Summary'){
					let postdata1 = {
				           wxId:this.wxId,
				           type:'question',
				           readingId:this.$route.query.id,
				           readingDayId:this.$route.query.id1,
				           isFinish:true,
				           compainId:sessionStorage.getItem('companidSign_'),
				        };
				        console.log(postdata1)
				        this.axios.post(this.ip.RESTPATH+'rest/postReadingSummaryResult',postdata1)
						.then(res=>{
							console.log(res.data);
							bus.$emit('showOverTask');
						})

						}
					}	
				})
				}else if(this.$route.query.type == 'think'){
					//我的思考与回答
					bus.$emit('submithuimu','正在提交..');
					let audioList = [];	
							this.audioList.forEach(v=>{
								audioList.push(v.src)
							})
					let postdata2 = {
						guideReadId:this.$route.query.id,
						wxId: this.wxId,
						contentText:this.Ctext,
						contentAudio:audioList.join(','),
						contentImg:this.img1.join(','),
						question:sessionStorage.getItem('questionSign'),

					};
					console.log(postdata2)
					this.axios.post(this.ip.RESTPATH+'rest/postGuideReadingMessage',postdata2)
					.then(res=>{
						console.log(res.data)
						bus.$emit('closesubmithuimu','提交成功');
						this.Ctext = '';
					})
				}	
			},
			//添加图片
			selfSelect(){
				if(this.img1.length >0){
					bus.$emit('tip','最多只能上传一张图片')
				}else{
					let this_ =this;
					WX.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						console.log(res.localIds)
						let localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						 WX.uploadImage({
				              localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
				              isShowProgressTips: 1, // 默认为1，显示进度提示
				              success: function (res1) {
				              var serverPicId= res1.serverId; // 返回图片的服务器端ID
				               $http.post('postImageByImageId',{
				                        serviceId:serverPicId
				                      })
				               .then(function(res2){ 
				                if(res2.data.result=='fail'){
				                  bus.$emit('closeloading');
				                  bus.$emit('tip','上传失败请重新上传^_^')
				                }else{
				                	let imgId=res2.data.imageId.attachments[0].uuid;
				                 	this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgId)
				                 	.then(function(res5){
				                  	bus.$emit('closeloading');
				                  	this_.img1.push(this_.ip.filePath2+res5.data[imgId].href);
				                  	console.log(this_.img1)
				                 })
               				 }
               			})
	               	.catch(function(err){
	                console.log(err);
              		})
             		},
             		fail:function(fail){
              			console.log(fail)
            					}
              				});
						}
					});
				}
			},
			//添加语音
			addRe(){
				this.showRe = true;
				this.timeN = 0;
				this.reing = true;
				this.ending = false;
				this.sending = false;
				this.autoOrhander = false;
				clearTimeout(this.timer1);
			},
			//试听
			trylisten(){
				let this_ = this;
				if(this.flag){	
					this.preText = '暂停';
					WX.playVoice({
						localId:this_.playRecordHref
					 	// 需要播放的音频的本地ID，由stopRecord接口获得
					});
					this_.flag = false;
					WX.ready(function(){
						WX.onVoicePlayEnd({
							success: function (res) {
							let localId = res.localId; // 返回音频的本地ID
							this_.flag = true;
							this_.preText = '试听';
							}
						});	
					})
					
				}else{
					this_.preText = '试听';
					WX.pauseVoice({
						localId: this_.playRecordHref
						// 需要暂停的音频的本地ID，由stopRecord接口获得
						});
					this_.flag = true;	
				}
				
			},
			//删除刚录音
			delRecords(){
				let this_ = this;
				this.playRecordHref = '';
				this.showcancleRecord = false;
				this.showRe = false;
				WX.stopVoice({
				localId: this_.playRecordHref
				 // 需要停止的音频的本地ID，由stopRecord接口获得
				});
				WX.stopRecord({
				success: function (res){
					}
			})
			},
			//发送录音
			sendRecord(){
				let this_ = this;
				if(this.autoOrhander){
					this.upRecordToserver(this.ComplocalId);
				}else{
					this.upRecordToserver(this.localId);
				}
				this.showRe = false;
				WX.stopVoice({
				localId: this_.playRecordHref
				 // 需要停止的音频的本地ID，由stopRecord接口获得
				});
			},
			setTimeouts(){
				this.timer1 = setTimeout(function(){
				this.timeN++;
				this.setTimeouts();
				}.bind(this),1000)
			},
			//开始录音
			playRecord(){
				if(this.audioList.length>1){
					bus.$emit('tip','录音最多两条哦')
				}else{
					this.reing = false;
					this.ending = true;
					this.sending = false;
					this.timeN = 0;
					let this_  =this;
				    // bus.$emit('stopRecording');
					WX.startRecord({
						success: function (res){
							this_.setTimeouts();
							this_.ifRecord = true;	
						}
					});
					this.recordAutoEnd();
				}
			},
			endRecords(){
				if(this.timeN<3){
					bus.$emit('tip','录音时间过短')
				}else{
					this.sending = true;
					this.reing = false;
					this.ending = false;
					this.endRecord()
					}
			},
			//结束录音
				endRecord(){
					clearTimeout(this.timer1)
					this.recordFlag = true;
					let _this=this;
					WX.stopRecord({
						success: function (res){
							_this.sending = true;
							_this.reing = false;
							_this.ending = false;
							_this.playRecordHref = res.localId;
							_this.localId = res.localId;
					}
				});
			},
				//上传录音到服务器
				upRecordToserver(localIds){
					let _this  = this;
					WX.uploadVoice({
							localId: localIds, // 需要上传的音频的本地ID，由stopRecord接口获得
							isShowProgressTips: 1, // 默认为1，显示进度提示
							success: function (res) {
								let serverId = res.serverId; // 返回音频的服务器端ID
								$http.post('postVoiceByVoiceId',{
                        			serviceId:serverId
                      			})
                      			.then(function(res2){
                        			let RecordId=res2.data.voiceId.attachments[0].uuid;
                        			//获取录音音频地址
                        			if(RecordId){
                          				// alert('开始请求获取音频地址');
                        				_this.axios.get(_this.ip.filePath+"rest/download/links?ids="+RecordId)
                                	    .then(function(res3){
                                	    	bus.$emit('closeloading')
                        					_this.audioHref=_this.ip.filePath2+res3.data[RecordId]['href'];
                        					_this.audioList.push( {"src":_this.audioHref,"totalTate":0,"flag":true,"currentTime":0,'TotalTime':_this.timeN});
                                	    })
                                	    .catch(err=>{
                                	        console.log(err)
                               		    });
                             	   }
                       	        })
                     		    .catch(err=>{
                       		    	 console.log(err)
                  			    });
							}
						});
			},
			//录音60s自动结束
			recordAutoEnd(){
				let that = this;
					WX.ready(function(){
		 				console.log('执行录音过时操作')
		 				WX.onVoiceRecordEnd({
						// 录音时间超过一分钟没有停止的时候会执行 complete 回调
						complete: function (res) {
							that.autoOrhander = true;
							that.sending = true;
							that.reing = false;
							that.ending = false;
							clearTimeout(that.timer1);
							that.timeN = 60;
							that.playRecordHref = res.localId;
							that.ComplocalId = res.localId;
					}
				});
		 	});	
		},
			hideRe(){
				this.showcancleRecord = true;
			},
		},
		beforeDestroy() {
			let this_ = this;
			clearTimeout(this.timer1)
			if(this_.ifRecord){
				WX.stopRecord({
					success: function (res){
					console.log('离开路由停止录音')
					}
				})
				WX.stopVoice({
					localId: this_.playRecordHref
					// 需要停止的音频的本地ID，由stopRecord接口获得
				});
			}
		},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.showThis  = true;
			$(function(){
				$('body').css({'height':$(window).height()});
			})

			bus.$on('goNexts',()=>{
				sessionStorage.setItem('sign','sign6')
				this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id
					}})
			})
		this.config();
		},
		components:{
			recordVoice
		}
	}
</script>
<style lang="less" scoped>
@keyframes showThis{
	from{
		opacity:.7;
		transform:translateX(-5%);
	}
	to{
		opacity:1;
		transform:translateX(0);
	}
}
@keyframes showRe{
	from{
		bottom:-.5rem;	
	}
	to{
		bottom:0;
	}
}
::-webkit-input-placeholder { color:rgba(0,0,0,.5);font-size: 2rem;text-align: left;}
	#messages{
		width:100%;
		height:100%;
		position:relative;
		-webkit-animation:showThis .5s ease forwards;
		animation:showThis .5s ease forwards;
		display:flex;
		flex-direction:column;
		background:#fff;
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
		.content{
			flex:1;
			.questionItem{
				padding:1rem 2rem;
				width:90%;
				margin:.5rem auto;
				background:#fcfcfc;
			}
		}
		#text{
			width:100%;
			height:30%;
			outline:none;
			border:none;
			font-size:1.6rem;
			line-height:2rem;
			text-indent:2.5em;
			padding-top:1rem;
			color:#222;
			letter-spacing:1px;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
		}
		input-placeholder { color:rgba(0,0,0,.3);font-size: 1.3rem;}
	 	::-webkit-input-placeholder { color:rgba(0,0,0,.3);font-size: 1.3rem;}
	 	.fontSize{
	 		float: right;
	 		color:#666;
	 		i{
	 			color:#222;
	 			font-style:normal;
	 		}
	 	}
	 	.activeSign{
	 		i{
	 			color:red;
	 		}
	 	}
	 	.picture{
	 		width:6rem;
	 		height:6rem;
	 		background:#fff;
	 		margin-left:7.5%;
	 		position:relative;
	 		i{
			position: absolute;
			right:-1rem;
			top:-1rem;
			color:#9e9e9e;
			font-size:1.8rem;
	 		}
	 		img{
	 			width:100%;
	 			height:100%;
	 		}
	 	}
	 	.record{
	 		padding-top:1.7rem;
	 	}
	 	.addRe{
	 		height:7rem;
	 		width:7rem;
	 		margin: 1rem 0 0 .7rem;
	 		background:rgba(238, 238, 238, 0.65);
	 		color:#444;
	 		text-align:center;
	 		border-radius:3px;
	 		font-size:1.2rem;
	 		color:#555;
	 		i{
	 			color:#444;
	 		}
	 	}
	 	.addPic{
			margin-left: 7.5%;
	 	}
	 	.submit{
	 		width:100%;
	 		background:#e91e63;
	 		color:#fff;
	 		height:53px;
	 		letter-spacing:2px;
	 	}
	 	.stratRecord{
	 		position:fixed;
	 		bottom:0;
	 		left:0;
	 		width:100%;
	 		height:100%;
	 		background:rgba(0,0,0,.34);
	 		display:flex;
	 		flex-direction:column;
	 		-webkit-animation:showRe .5s ease forwards;
	 		animation:showRe .5s ease forwards;
	 		.top{
				flex:1;
	 		}
	 		.bottom{
	 			height:30%;
	 			background:#fff;
	 			p{
	 				text-align:center;
	 				padding:1.5rem 0;
	 				color:#111;
	 			}
	 		.com{
	 			height:7rem;
	 			width:7rem;
	 			padding:0;
	 			-webkit-transform:translateY(-7rem);
	 			transform:translateY(-7rem);
	 			line-height:7rem;
	 			}
	 		.prelisten{
	 			float: left;
	 			margin-left: 3rem;
	 			color:#44d54a;
	 		}
	 		.delRecord{
	 			float: right;
	 			margin-right: 3rem;
	 		}
			.start{
				height:7rem;
				width:7rem;
				-webkit-border-radius:50%;
				border-radius:50%;
				margin:0 auto;
				box-sizing:border-box;
				border:1px solid #db2764;
				.playing{
					height:100%;
					width:100%;
					-webkit-border-radius:50%;
					border-radius:50%;
					background:#db2764;
					-webkit-transform:scale(.85);
					transform:scale(.85);
				}
				.pauseing{
					height:7rem;
					width:7rem;
					background:#db2764;
					-webkit-transform:scale(.4);
					transform:scale(.4);
					border-radius:5px;
				}
				.send{
					height:100%;
					width:100%;
					background:#44d54a;
					color:#fff;
					border-radius:50%;
					line-height:7rem;
					text-align:center;
				}
			}
			.active{
				border:none;
			}
	 		}
	 	}
	 	.cancleRecord{
	 		position:fixed;
	 		width:100%;
	 		height:100%;
	 		left:0;
	 		top:0;
	 		background:rgba(0,0,0,.25);
	 		z-index:1000;
	 		div{
	 			position:absolute;
	 			width:80%;
	 			height:13rem;
	 			left:10%;
	 			top:35%;
	 			background:#fff;
	 			border-radius:5px;
	 			overflow:hidden;
	 			p{
				line-height:8rem;
				text-align:center;
				border:1px solid #eee;
				letter-spacing:1px;
				color:#111;
	 			}
	 			button{
	 				width:50%;
	 				float: left;
	 				height:5rem;
	 				font-size:1.7rem;
	 				background:transparent;
	 				color:#666;
	 			}
	 			&>:last-child{
						color:#db2764;
						border-left:1px solid #eee;
	 				}
	 		}
	 	}
	}
</style>