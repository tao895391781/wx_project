<template>
	<section id="myThink" v-show='showThis'>
		<ul class="question">
			<li v-for='(q,index) in questions'>
				<input type="radio" :id="index" :name='1' :value='q' :checked='index==0' v-model='question'>
				<label :for="index">{{q}}</label>
			</li>
		</ul>

		<div class="btnMessage" @click='goMessage'>我要留言</div>
		<div class="message">
			<p><span>精选留言</span></p>
			<div v-show='noMessage'>暂无留言</div>
			<ul v-show='!noMessage'>
				<li v-for='(m,index) in message1'>	
					<div class="top">
						<div>
							<img :src="m.headImg" alt="">
						</div>
						<div>
							{{m.nickName}}	<span :class="{thumbUp:date1==m.date}"></span>
						</div>	
					</div>
					<div class="bottom">
						<p>问题：{{m.question}}</p>
						<p>{{m.contentText}}</p>
						<div class="pic" v-if='!m.contentImg==""'>
							<img :src="m.contentImg" alt="" @click='previewPic(m.contentImg)'>
						</div>
						
						<ul v-if='!m.contentAudio==""'>
							<li v-for='v in m.contentAudio.split(",")'>
								<audioContol :src='v'></audioContol>
							</li>
						</ul>
						<p>{{formate(m.date)}}</p>
					</div>
				</li>
				<li v-show='thanFive'  @click='lazyLoadMessage' class="loadMore" :class="{noMore:loadMoreText=='下面没有了'}">{{loadMoreText}}</li>
			</ul>
			
		</div>
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
import audioContol from '../../../../../components/audioControl.vue'
	export default {
		data(){
			return {
				questions:[],
				nickname:'',
				headimg:'',
				wxId:'',
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
				loadMoreText:'加载更多'

			}
		},
		components:{
			audioContol
		},
		methods:{
			formate(str){
				 if (!str) return '';
	            var date = new Date(str)
	            var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
            if (time < 0) {
              return ''
            } else if ((time / 1000 < 30)) {
              return '刚刚'
            } else if (time / 1000 < 60) {
              return parseInt((time / 1000)) + '秒前'
            }
            else if ((time / 60000) < 60) {
              return parseInt((time / 60000)) + '分钟前'
            } else if ((time / 3600000) < 24) {
              return parseInt(time / 3600000) + '小时前'
            } else{
              let d = new Date(str);
              let timeS = d.getFullYear()+'/'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'/'+
            (d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());          
              	return timeS;
            }
		},
			goMessage(){
				this.$router.push({name:'goMessage',query:{id:this.$route.query.id,type:'think'}});
				sessionStorage.setItem('questionSign',this.question)
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
			pauseOter(){
			$('audio').on('play',function(){
				$('audio').not(this).each(function(){
					this.pause();
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
		computed:{
			thanFive(){
				return this.message3.length>5?true:false

			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			let that  = this;
			let id = this.$route.params.id;
			let type = 'think';
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingContentByType/'+id +'/'+ type)
			.then(res=>{
				bus.$emit('closeloading')
				console.log(res.data);
				this.showThis = true;
				if(res.data.flag == false){
					this.showNo = true
					console.log('没内容')
				}else{
					this.questions = res.data.question;
					this.question =  this.questions[0];
					this.message3 = res.data.message.concat();
					console.log(this.message3 )
					this.message = res.data.message;
					this.message1 = res.data.message.splice(0,5);
					console.log(this.message1)
					this.bookname = res.data.bookName;
					this.message1.length==0?this.noMessage=true:this.noMessage = false;
				

				}
			})
		},
	}
</script>
<style lang="less">
	#myThink{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		&>ul{
			width:80%;
			margin:2rem auto;
			li{
					input{
							width:1.4rem;
							height:1.4rem;
							line-height: 1.4rem;
							margin-right: 1.5rem;
						}
						label{
							position: relative;
							left: 1.6rem;
							font-size: 1.3rem;
							margin-left: 2rem;
							display: inline-block;
							width:80%;
							height:1.5rem;
							line-height: 1.5rem;
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
							background-color:#eb3372;
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
			background:#eb3372;
			color:#fff;
			width:60%;
			text-align:center;
			line-height:3.2rem;
			border-radius:20px;
			font-size:1.8rem;
			letter-spacing:2px;
			border:none;
			box-shadow:0 0 7px #eb3372;

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
				background:#f60;
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
				background:#f60;
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
			background:#f2f2f2;
			padding-bottom:3.5rem;
			&>div{
				text-align:center;
				padding-top:4rem;
				font-size:1.5rem;
				color:#555;
			}
			&>p{
					border-bottom:1px solid #e7e9ef;
					height:2rem;
					position:relative;
					&>span{
						display:inline-block;
						line-height:2rem;
						position:absolute;
						padding:0 1rem;
						background:#fff;
						top:1rem;
						left:50%;
						transform:translateX(-50%);
					}
			}
		
		&>ul{
			margin-top: 2rem;;
			li{
				width:95%;
				margin:.2rem auto;
				/* background:#eee; */
				border-radius:5px;
				.top{
					width:100%;
					overflow:hidden;
					display:flex;
					-webkit-display:flex;
					&>div{
						float: left;
						&:first-child{
							width:3rem;
							height:3rem;
							border-radius:50%;
							margin:.5rem;
							&>img{
								width:100%;
								height:100%;
								border-radius:50%;
							}
					}
					&:last-child{
						line-height:4rem;
						flex:1;
						-webkit-flex:1;
						&>span{
							float: right;
							padding-right:2rem;
						}
						.thumbUp{
									color:#F60;
								}
					}

						}
				}
				.bottom{
					margin-left:4rem;
					&>p{
						font-size:1.5rem;
						&:first-child{
							color:#000;
							margin-bottom: .5rem;
						}
						&:nth-child(2){
							color:#666;
							padding:.5rem 0;
							
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
							
						}
					}
				}
			}
			.loadMore{
				text-align:center;
				background:#e91e63;
				color:#fff;
				padding:.6rem 0;
				width:80%;
				margin:.5rem auto;
			}
			.noMore{
				background:#9e9e9e;
			}
		
	}
	}
		
}
.playbg{
			background: #8bc34a;
			i{
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