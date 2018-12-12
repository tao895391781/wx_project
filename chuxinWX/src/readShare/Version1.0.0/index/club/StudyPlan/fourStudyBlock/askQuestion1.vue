<template>
	<section id="askQuestion" v-show='showThis'>
		<header>
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>
				《{{bookname}}》第{{whatDay}}次阅读
			</div>	
		</header>
		<!-- 完成打卡任务不显示任务 -->
		<ul class="question" v-show='!isF'>
			<li v-for='(q,index) in questions' @click='selectedI(index)'>
				<span>任务{{numberToZh_C[index]}}</span>
				<input type="radio" :id="index" :name='1' :value='q' :checked='index==0' v-model='question'>
				<label :for="index">{{q}}</label>
			</li>
		</ul>
		<div class="btnMessage" @click='goMessage' v-show='!isF'>我要分享</div>
		<!-- 完成打卡任务显示成功信息 -->
		<div v-show='isF' class="overTaskSign">
				<div>
					<p>
						<i class="iconfont">&#xe625;</i>
					</p>
					<p>本次阅读任务已完成</p>
					<!-- <button @click='goReadCard'>分享我的阅读成就</button> -->
				</div>	
		</div>


		<div class="paihang" @click='goPaihang'>
			<i class="iconfont">&#xe64b;</i>
			<span>排行榜</span>
			<i class="iconfont right">&#xe664;</i></div>
		<div class="message">
			<p class="cardStatus">分享动态</p>	
			<div v-show='noMessage'>暂无留言</div>
			<ul v-show='!noMessage' class="messs">
				<li v-for='(m,index) in message1'>	
					<div class="top">
						<div>
							<img :src="m.headImg" alt="">
						</div>

						<div>
							{{m.nickName}}<span :class="{thumbUp:date1==m.date}"><i class="iconfont" @click='thumbUp(m)'>&#xe668;{{m.thumbUp}}</i></span>
							<p class="timeColor">{{formate(m.date)}}</p>
						</div>	
					</div>

					<div class="bottom">
						<div is='Message-p' :MessageP ='m.contentText' class="MessageP"></div>

						<div class="pic" v-if='!m.contentImg==""'>
							<img :src="m.contentImg" alt="" @click='previewPic(m.contentImg)'>
						</div>
						
						<ul v-if='!m.contentAudio==""' class="audiosss">
							<li v-for='v in m.contentAudio.split(",")'>
								<audioContol :src='v'></audioContol>
							</li>
						</ul>
						
					</div>
				</li>
				<li @click='lazyLoadMessage' class="loadMore" :class="{noMore:loadMoreText=='下面没有了'}">{{loadMoreText}}</li>
			</ul>
			
		</div>
		<button class="shareReadP" @click='goshareReadP' v-show='isF'>分享我的阅读成就</button>
	</section>
</template>
<script>
import {bus} from '../../../../../../bus.js'
import recordVoice from '../../../../../../components/recordVoice.vue'
import {getTotalTime} from '../../../../../../config.js'
import audioContol from '../../../../../../components/audioControl.vue'
	export default {
		data(){
			return {
				nickname:'',
				headimg:'',
				wxId:'',
				questions:[],
				flag:true,
				texts:'',
				message:[],
				message1:[],
				message3:[],
				messageN:0,
				date1:'',
				showThis:false,
				bookname:'',
				noMessage:false,
				recordFlag:true,
				question:'',
				totalTimes:[],
				timeN:0,
				timer1:0,
				transP:false,
				recorder:false,
				querys:{
					Summary:'readSum',
					Day:'everyTimeRead'
				},
				numberToZh_C:['一','二','三','四','五','六'],
				loadMoreText:'加载更多',
				selectedIndex:0,
				openText:'',
				openFlag:false,
				opens:'展开',
				isF:false,
				bookImg:'',
				whatDay:'',
				clickIndex:-1,
			}
		},
		methods:{
			goshareReadP(){
				let id = this.$route.query.id;
				let idArr = JSON.parse(sessionStorage.getItem('idArr'));
				this.$router.replace({name:'readCard1',query:{id:id,id1:idArr.readCard}})
			},
			goReadCard(){
				bus.$emit('goNext_1')
			},
			selectedI(i){
				this.selectedIndex = i;
			},
			goPaihang(){
				this.$router.push({name:'paihang',query:{id:this.$route.query.id}})
			},
			goMessage(){
				// sessionStorage.setItem('ifMessageFirst','no');
				// let arr = ['finish','finish','finish','nofinish']
				// sessionStorage.setItem('FinishWhich',arr.join(','));


				this.$router.push({name:'message',query:{type:this.$route.query.type,id1:this.$route.query.id1,id:this.$route.query.id,cardId:this.$route.query.cardId}});
				sessionStorage.setItem('questionSign',this.question);
				sessionStorage.setItem('selectedIndex',this.selectedIndex)
			},
			thumbUp(m){
				let flag = true;
				let postdata1 = {
						messageId:m.id,
						wxId:this.wxId
				};
				if(this.date1 == m.date){
					bus.$emit('tip','你已经点过赞了')
				}else{
					console.log(postdata1)
					 m.thumbUp+=1;
					this.axios.post(this.ip.RESTPATH+'rest/postMessageThumbsup',postdata1)
					.then(res=>{
						console.log(res.data);
						this.date1 = m.date;
					})
				}
				
			},
			goback(){
				this.$router.go(-1);
			},
			formate(str){
				 if (!str) return '';
	            var date = new Date(str)
	            var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
              let d = new Date(str);
              let timeS = d.getFullYear()+'-'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'-'+
            (d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());          
              	return timeS;
		},
		previewPic(src){
          console.log(src);
          let srcList  = [];
          srcList.push(src);
              WX.previewImage({
                current: src, // 当前显示图片的http链接
                urls: srcList// 需要预览的图片http链接列表
                })

        },
		pauseOter(){
			$('audio').on('play',function(){
				$('audio').not(this).each(function(){
					// this.pause();
					this.load();
					$(this).siblings('.control').removeClass('playbg');
		            $(this).siblings('.control').find('.i3').removeClass('i1');
					$(this).siblings('.control').find('.i2').removeClass('i4');
				})
				if(this.played){
					$(this).siblings('.control').addClass('playbg');
		            $(this).siblings('.control').find('.i3').addClass('i1');
					$(this).siblings('.control').find('.i2').addClass('i4');
					}
				});
			},
			lazyLoadMessage(){
				let nextM = this.message.splice(0,this.message.length);

				if(this.message1.length == this.message3.length){
					bus.$emit('tip','没有更多了')
					this.loadMoreText = '下面没有了'
				}else{
						this.message1 = [...this.message1,...nextM];
				}

			},
		},
		components: {
			recordVoice,
			audioContol,
			'Message-p':{
      			template:`
      				<div>
      					<p>{{clip(MessageP).text}}</p>
							<p class='showOpen'  v-show='showD'>
								<span v-show = 'open' @click='openP'>展开</span>
								<span v-show = '!open' @click='closeP'>收起</span>
						</p>
      				</div>
      			`,
      			data(){
      				return {
      					open:true,

      				}
      			},
      			props:['MessageP'],
      			methods:{
      				openP(){
      					this.open = false;
      				},
      				closeP(){
      					this.open = true;
      				},
      				clip(text,open){
      					if(text == null || text == ''){
      						return {
									text:text,
								};
      					};
      					if(text.length>58){
      						if(!this.open){
      							return {
									text:text,
								};
      						}else{
								return {
									text:text.substring(0,58)+'...',
									}
      						}
								return {
									text:text.substring(0,58)+'...',
									}
							}else{
								return {
									text:text,
								};
							}
      				},
      			},
      			computed:{
      				showD(){
      					if(this.MessageP == null || this.MessageP == ''){
      						return false;
      					}	
      						if(this.MessageP.length > 58){
      							return true;
      						}else{
      							return false;
      						}	
      				},
      			},
      			created(){},
      		},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		computed:{
			noText(){
				return this.kind=='message'?(this.texts==''?true:false):(this.audioList.length==0?true:false);
			},
		},
		watch:{
			message:{
			 deep: true,
           	 handler: function (news){
                this.$nextTick(function () {
					this.pauseOter()
				})   
			}
		}
	},
		created(){
			let finishArr  = sessionStorage.getItem('FinishWhich').split(',');
			console.log(finishArr)
			if(finishArr[3] == 'finish'){
				this.isF = true;
			}else{
				this.isF = false;
			}
			console.log(this.isF)
			this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
			this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			$(function(){
				$('body').css({'height':$(window).height()});
			});
			let id1 = this.$route.query.id1;
			this.axios.get(this.ip.RESTPATH+'rest/getMyAnswerAndMessage/'+id1+'/'+this.$route.query.type)
			.then(res=>{
				console.log(res.data);
				this.$parent.showThis = true;
				this.showThis = true;
				bus.$emit('closeloading')
				this.questions  = res.data.question;
				this.question =  this.questions[0];
				this.message3 = res.data.message.concat();
				console.log(this.message3 )
				this.message = res.data.message;
				this.message1 = res.data.message.splice(0,5);
				console.log(this.message1)
				this.bookname = res.data.bookName;
				this.message1.length==0?this.noMessage=true:this.noMessage = false;	
				this.whatDay = res.data.day;
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.picId)
				.then(res1=>{
					
					this.bookImg = this.ip.filePath1+res1.data[res.data.picId].href;
					console.log(this.bookImg)

				})
			});
			let idArr = JSON.parse(sessionStorage.getItem('idArr'));
			console.log(idArr)
			let id = this.$route.query.id;
			bus.$on('goNext_1',()=>{
				sessionStorage.setItem('sign','sign4')
				this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id}})
			});
		this.config();
		},
		mounted(){
		},
	}
</script>
<style lang="less">

@keyframes timeN{
	from{
		top:0;
		}to{
		top:-100%;
		}
}
@keyframes recorder{
	from{
		bottom:-3.5rem;
	}
	to{
		bottom:0;
	}
}

	#askQuestion{
		width:100%;
		height:100%;
		display: -webkit-flex;
		display:flex;
		flex-direction:column;
		-webkit-flex-direction:column;
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		padding-bottom: 3.8rem;
		&>.shareReadP{
			position: fixed;
			left:0;
			bottom:0;
			width: 100%;
			height: 53px;
			background: #62cc6b;
			color: #fff;
			font-size: 1.5rem;
			letter-spacing: 2px;
			box-shadow: -2px -2px 3px #ddd;

		}
		header{
			height:4rem;
			div{
				height:100%;
				float: left;
				line-height:4rem;
				&:first-child{
					width:15%;
					line-height:4rem;
					text-indent:1em;
				}
				&:nth-child(2){
					width:85%;
					text-align:center;
					transform:translateX(-7%);
				}
				&>p{
					line-height:2rem;
					&:first-child{
						margin-top: 1rem;
					}
					
				}

			}
		}
		.overTaskSign{
			width:80%;
			margin:0 auto;
			background: #fff;
			box-shadow:2px 2px 2px #ddd;
			
			&>:first-child{
				overflow: hidden;
				
			}
			&>:first-child{
					p{
						text-align:center;
						margin:3rem 0 1rem;
						i{
							color:#4ccb6b;
							font-size:4rem;
						}
						&:nth-child(2){
							color: #4ccb6b;
							font-size: 1.7rem;
							margin-top: 2rem;
						}
					}
					button{
						width:50%;
						line-height: 2.8rem;
						border:1px solid rgba(233, 98, 42, 0.4);
						border-radius:3px;
						color:#666;
						margin-left: 25%;
						margin-bottom: 1.5rem;
						font-size:1.3rem;
						-webkit-animation:scale_1 1.5s ease infinite;
						animation:scale_1 1.5s ease infinite;
						letter-spacing:1px;
					}	
				}
		}
		
		&>ul{
			width:80%;
			margin:2rem 5% 2rem 15%;
			li{
				position: relative;
				&>span{
					position:absolute;
					left:-3rem;
					top:0;
				}
					input{
							width:1.4rem;
							height:1.4rem;
							line-height: 1.4rem;
							margin-right: 1.5rem;
						}
						label{
							position: relative;
							left: 1.6rem;
							font-size: 1.5rem;
							margin-left: 2rem;
							display: inline-block;
							width:80%;
							height:1.6rem;
							line-height: 1.6rem;
						}
						input[type='radio'] + label::before{
							content:"";
							color:#666;
							display: inline-block;
							vertical-align: middle;
							font-size:1.4rem;
							width:1.5rem;
							height:1.5rem;
							border-radius: 50%;
							border:1px solid #ddd;
							line-height: 1.4rem;
							position: absolute;
							top:0;
							left:-2.4rem;
							margin-right:auto;
							margin-left: auto;
						}
						input[type="radio"]:checked + label::before{
							content:"\a0";
							background-color:#e91e63;
							background-clip:content-box;
							padding:.2rem;
							text-align: center;
							border-radius: 50%;
						}
						input[type="radio"]{
							position: absolute;
							clip:rect(0,0,0,0);
						}
			}
		}
		.btnMessage{
			margin:4rem auto;
			background:#e91e63;
			color:#fff;
			border-radius:20px;
			padding:1rem 6rem;
			font-size:1.8rem;
			letter-spacing:2px;
			outline:none;
			border:none;
			box-shadow:0 0 7px #eb3372;

		}
		.paihang{
			line-height:4rem;
			text-align:center;
			margin-top: 2rem;
			font-size:1.3rem;
			color: #9e9e9e;
			span{
				color:#e91e63;
				font-size:1.5rem;
			}
			i{
				
				padding: 0 1rem;
				color: #e91e63;

			}
			.right{
				float: right;
				color:#666;
			}
		}
		.text{
			width:100%;
			margin-top: 1rem;
			/* overflow:hidden; */
			.startRecordBtn{
				width:100%;
				height:3.5rem;
				position:fixed;
				bottom:0;
				left:0;
				z-index:1000;
			.startRecording{
                	background-color:#fff;
                	text-align: center;
                	line-height: 3.5rem;
                	color:#e91e63;
                	font-size:1.5rem;
                	box-shadow:2px -3px 2px #eee;
                	position: relative;
                	&>span{
                		display:inline-block;
                		width:0;
                		height:100%;
                		background:#fff;
                		margin:0 .1rem;
                	}
                	p{
                		width:0;
                		height:100%;
                		position:absolute;
                		left:0;
                		top:0;
                		background:#4caf50;
                		text-align:center;
                		color:#fff;
                	}
                	.transP{
                		-webkit-animation: timeN 1s ease forwards;
                		animation: timeN 1s ease forwards;
                	}
                }
                
			
            }
            .recorder{
            	-webkit-animation: recorder .6s ease forwards;
            	animation: recorder .6s ease forwards;
            	
            }
			&>button{
				margin-left: 65%;
				margin-bottom: .5rem;
				padding:.3rem 1.5rem;
				background:#e91e63;
				color:#fff;
				border-radius:3px;
			}
			.record{
				width:86%;
				height:14rem;
				margin:0 7%;
				border:1px solid #ddd;
				border-radius:5px;
                
			}
			textarea{
				width:80%;
				height:10rem;
				margin:0 10%;
				border:1px solid #ddd;
				border-radius:5px;
				display:block;
			
				line-height:2rem;
				font-size:1.8rem;
			}
			&>p{
				text-align:center;
				line-height:3.3rem;
				background:#e91e63;
				width:80%;
				color:#fff;
				border-radius:3px;
				margin:1.5rem auto;
			}
			.noText{
				background:#ddd;
			}

		}
		.message{
			flex:1;
			-webkit-flex:1;
			background:#fff;
			padding-bottom:3.5rem;
			&>div{
				text-align:center;
				padding-top:4rem;
				font-size:1.5rem;
				color:#555;
			}
			&>.cardStatus{
					border-left:2px solid #4ccb6b;
					line-height:2rem;
					position:relative;
					text-indent:1em;
					margin-top: .1rem;
					color:#4ccb6b;
					font-size:1.7rem;
			}
		
		&>ul{
			margin-top: 2rem;;
			li{
				width:95%;
				margin:.5rem auto;
				/* background:#eee; */
				padding:1rem;
				border-bottom:1px dashed #fff;
				border-radius:5px;
				.top{
					width:100%;
					overflow:hidden;
					display:flex;
					-webkit-display:flex;
					&>div{
						float: left;
						&:first-child{
							width:4rem;
							height:4rem;
							border-radius:50%;
							margin:.5rem;
							&>img{
								width:100%;
								height:100%;
								border-radius:50%;
							}
					}
					.timeColor{
						color: rgba(102, 102, 102, 0.49);
						font-size:1.1rem;
					}
					&:last-child{
						line-height:2rem;
						flex:1;
						-webkit-flex:1;
						&>span{
							float: right;
							padding-right:2rem;
						}
						.thumbUp{
									color:#e91e63;
								}
					}

						}
				}
				.bottom{
					margin-left:4rem;
					margin-top: .6rem;
					.MessageP{
					&>p{
						font-size:1.5rem;
						color:#0a0a0a;
						
					}
					.showOpen{
						padding:0;
						span{
							color:#9e9e9e;
						}
					}
				}
					.pic{
						width:15rem;
						height:18rem;
						&>img{
							width:100%;
							height:100%;	
					}
					}
					
					&>ul{
						li{
							border:none;
							padding:0;
							
						}
					}

				}
			}
			.loadMore{
				text-align:center;
				border:1px solid #ddd;
				color:#e91e63;
				padding:.4rem 0;
				width:60%;
				margin:.5rem auto;
			
			}
			.noMore{
				
			}
		}
	}
	}
	.playbg{
			background: #8bc34a;
			i{
				color:#fff;
			}
			span{
				color:#fff;
			}
		}
		.i1{
			display: none;
		}
		.i2{
			display: none;
		}	
		.i4{
			display: block;
		}			

</style>