<template>
	<section id='discountbuyPage' v-show='showThis'>
		<div class="buyPage1" v-show='!buySuccess'>
		<div class="main2">
			<div class="buyInfo">
			<div>
				<p>{{buyInfo.stage}}</p><br>
				<p>{{buyInfo.grade}}年级
					<span>{{course[buyInfo.readBookThemeId]}}</span>
				</p>
			</div>
				<div>
					<h5>
						<p>书名</p>
						<p>阅读计划</p>
					</h5>
					<ul>
						<li v-for='(d,index) in buyInfoList.courseList'>
							<p><span>《{{d.bookName}}》</span></p>
							<p><span>{{buyInfoList.courseNode[index]}}</span>次</p>
						</li>
					</ul>
					<p>
						<span>{{buyInfoList.day}}天</span>
						|
						<span>{{howBooks}}本书</span>
						|
						<span>阅读{{howTimes}}次</span>
					</p>
				</div>
			</div>
			<div class="message12">
				<div>
					<p>
						<span><b v-show='true'>*</b>手机号</span>
						<input type="number" class='numberBulr' v-model='number' placeholder="请输入手机号">
						<i v-show='showPhone'>{{phoneText}}</i>
						<i class="iconfont" v-show='showPhoneTrue'>&#xe6a3;</i>
					</p>
					<p>
						<span><b v-show='false'>*</b>微信号</span>
						<input type="text" placeholder="请输入微信号(选填)" v-model='wxNum'>
					</p>
					<p>
						<span><b v-show='true'>*</b>姓名</span>
						<input type="text" class="nameBulr" v-model='name' placeholder="请填写姓名">
						<i v-show='showName'>请填写姓名</i>
						<i class="iconfont" v-show='showNameTrue'>&#xe6a3;</i>
					</p>
				</div>
			</div>
		</div>
		<footer class="footer3">
			<button  :class="{disclick:clickDisabled}" @click='freebuy'>
				券后价<span>￥0</span><b>￥{{buyInfo.price}}</b>
			</button>
		</footer>
			
		</div>
		<div class="buyPage2" v-show='buySuccess'>
			<div class="header_3">
				<div class="header_1">
					<i class="iconfont">&#xe7ad;</i>
					<p>恭喜您成功购买</p>
					<h6>{{courseInfo1.name}}</h6>
				</div>
				<div class="header">
					<span>开课时间&nbsp;|</span>{{courseInfo1.beginDate}}
				</div>
				<p class="header_2">
					<i class="iconfont">&#xe750;</i>请添加老师微信，进入专属阅读群
				</p>
			</div>
			<div class="main">
				<div class="teacherCode">
					<p>长按识别二维码 添加老师微信<br>
						<span>微信有限制，老师会在三天内通过验证，请耐心等待</span></p>
					<div>
						<img src="../../../assets/images/teacher_code.jpg" alt="老师的微信">
						<p>小小静老师的微信</p>
						<p class="textS">(请不要截图分享老师的二维码哦)</p>
					</div>
				</div>

				<div class="btn">
					<button  @click='goIndex'>去首页</button>
					<!-- <button  @click='gomyCourse' class="right">进入我的课程</button> -->
				</div>
			</div>
		</div>
		
	</section>
</template>
<script>
import {bus} from '../../../bus.js'
	export default {
		data(){
			return {
				buyInfo:{},
				buyInfoList:{},
				showThis:false,
				buySuccess:false,
				courseInfo1:[],
				haveContent:false,
				contentSrc:'',
				number:'',
				name:'',
				wxNum:'',
				showName:false,
				showPhone:false,
				truePhone:false,
				trueName:false,
				phoneText:'手机号码格式错误',
				showPhoneTrue:false,
				showNameTrue: false,
				course:['','挑战营课','','精读营课',],
				howTimes:0,
				howBooks:0,
				wxId:'',

			}
		},
		computed:{
			clickDisabled(){
				if(this.truePhone && this.trueName){
					return false;
				}else{
					return true;
				}
				
			},
		},
		mounted(){
			let this_= this;
			$(function(){
				$('.numberBulr').blur(function(){
					this_.checkPhone(this_.number);
				});
				$('.numberBulr').focus(function(){
					this_.showPhone = false;
				});
				$('.numberBulr').bind('input propertychange', function(){
					// this_.checkPhone(this_.number);
				});
				$('.nameBulr').blur(function(){
					if(this_.name == ''){
						this_.showName = true;
						this_.trueName = false;
					}else{
						this_.showName = false;
					}
				});
				$('.nameBulr').focus(function(){
					this_.showName = false;
				});
				$('.nameBulr').bind('input propertychange', function(){
					if(this_.name != ''){
						this_.trueName = true;
					}else{
						this_.trueName = false;
						}	
			});
		})
	},
		methods:{
			//正则检测电话号码规范
			checkPhone(phone){ 
				if(phone == ''){
					this.phoneText = '手机号码不能为空';
		        	this.showPhone = true;  
		        	this.truePhone = false;
				}else{
					if(!(/^1[34578]\d{9}$/.test(phone))){ 
			        	this.phoneText = '手机号码格式错误';
			        	this.showPhone = true;  
			        	this.truePhone = false;
		   	 		}else{
		   	 			this.showPhone = false;  
		   	 			this.truePhone = true;
		   	 		}
				}
			},
			goIndex(){
				this.$router.push({name:'readIndex'});
			},
			successPayGetInfo(){
				let that = this;
				let campingId = this.buyInfo.campingId;
				console.log(campingId)
				this.axios.get(this.ip.RESTPATH+'rest/getCampingInfoBycampingId/'+campingId)
				.then(res=>{
					console.log(res.data);
					this.courseInfo1 = res.data;
					 let imgPath = [];
                	res.data.courseList.forEach(v=>{   
	                  imgPath.push(v.picId)
                });
                if(res.data.content == '' || res.data.content == null){
                	this.haveContent = true;
                }else{
                	imgPath.unshift(res.data.content);
                }
     
				})
			},
			gobuyAndInvite(){
				let orderNum = this.$route.query.orderNum;
				let postData = {
					orderNum:orderNum,
					phoneNum:this.number,
					userName:this.name,
					wxNum:this.wxNum,
				}
			},
			freebuy(){
				if(this.number == '' || this.name ==''){
					bus.$emit('tip','请填写手机号或者姓名')
				}else{
					console.log('免费购买');
					this.buySuccess = true;
				}
			},
		},
		beforeCreate(){
			bus.$emit('loading');
		},
		created(){
			 this.$parent.isFirst = false;
			$(function(){
				$('body').css({'height':$(window).height()});
			})
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			console.log(this.wxId);
			this.campingId = window.location.href.split('?campingId=')[1].split('&discountId=')[0];
			this.axios.get(this.ip.RESTPATH3 + '/wsdiscount/order/showWithDiscount' + '/' + this.campingId)
			.then(res=>{
				bus.$emit('closeloading')
				console.log(res.data);
				this.buyInfo = res.data.camping;
				this.buyInfoList = res.data;
				this.howBooks = res.data.courseList.length;
				let times = 0;
				res.data.courseNode.forEach(v=>{
					times += Number(v);
				})
				this.howTimes = times;
				// this.successPayGetInfo();
				this.showThis = true;
			})
		},
	}
</script>
<style lang='less' scoped>
	#discountbuyPage{
		width:100%;
		height:100%;
		background:#f2f2f2;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		&>.go{
			position: fixed;
			top:1rem;
			right:1rem;
			z-index: 1000;
			p{
				background: red;
				color:#fff;
				border-radius: 2px;
				padding:.2rem;
				border:1px solid #fff;
			}

		}
		&>header{
			height:43px;
			border-bottom:1px solid #eee;
			background:rgba(255, 255, 255, .87);
			div{
				display:inline-block;
				float: left;
				height:100%;
				text-align:center;
				line-height:43px;
				color:#333;
				&:first-child{
					width:20%;
					text-align: left;
					text-indent: 1em;
				}
				&:nth-child(2){
					width:60%;	
				}
			}
		}
		.buyPage1{
			width:100%;
			flex:1;
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
		&>.main2{
			border-bottom:1px solid #eee;
			margin-bottom:.1rem;
			background:#f2f2f2;
			flex:1;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			&>.buyInfo{
				width:95%;
				margin:1rem auto 0;
				background:#fff;
				border-radius: 4px;
				padding: 1rem 0;
				&>div{
					&:first-child{
						width:80%;
						margin: 0 auto;
						padding: .5rem 0;
						padding-bottom: 1rem;
						border-bottom:1px dashed #9e9e9e;
						p{
							text-align: center;
							font-size:1.5rem;
							color: #333;
							line-height: 2rem;
							height:2rem;
							span{
								height:1.6rem;
								margin:.2rem;
								display: inline-block;
								/*vertical-align: center;*/
								line-height: 1.6rem;
								padding:0 .4rem;
								box-sizing: border-box;
								border:1px solid red;
								border-radius: 10px;
								color:red;
								font-size: 1rem;
								position: relative;
								top:-.1rem;
								}
							}
						}
					&:last-child{
						width:100%;
						flex:1;
						display:flex;
						display:-webkit-flex;
						flex-direction: column;
					&>h5{
						height:2rem;
						color:#111;
						overflow: hidden;
						margin: 1rem 0;
						p{
							color:#9e9e9e;
							float: left;
							width: 50%;
							text-align: center;
							height:100%;
						}
					}
					&>p{
						text-align: center;
						margin: 1rem 0 0;
						font-size: 1.6rem;
						color: #9e9e9e;
						span{
							color: #e91e63;
						}
					}
					&>ul{
						flex:1;
						overflow:scroll;
						-webkit-overflow-scrolling:touch;
						li{
							font-size:1.3rem;
							height:2rem;
							line-height: 2rem;
							overflow: hidden;
							p{
								width: 50%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								float: left;
								text-align: center;
								color: #333;
							}
						}
					}
				}
			}
		}
			.message12{
				background: #fff;
				width: 95%;
				margin: 2rem auto 0;
				border-radius: 3px;
				padding: 1rem 0;
				&>div{
					width: 100%;
					&:first-child{
						p{
							margin:.5rem 0;
							height:3rem;
							line-height: 3rem;
							span{
								display:inline-block;
								width: 4.5em;
								text-align: right;
								color:#0a0a0a;
							}
							input{
								width:47%;
								line-height: 2.2rem;
								height: 2.2rem;
								background: transparent;
								text-indent: .5em;
								border-radius: 3px;
								-webkit-appearance: none;
							    border: 1px solid #dcdfe6;
							    -webkit-box-sizing: border-box;
							    box-sizing: border-box;
							    color: #606266;
							    display: inline-block;
							    font-size: inherit;
							    outline: 0;
							    padding: 0 15px;
							}
							::-webkit-input-placeholder { color:#ddd;font-size: 1.2rem;text-align: left;}
							i{
								font-size: 1rem;
								font-style: normal;
								color: #e01414;
							
							}
						}
						p:first-child{
								input{
									letter-spacing: 2px;
								}
							}
					}
					&:last-child{
						
					}
				}
				
			}
		}
		.footer3{
			width:100%;
			height:4.2rem;
			margin-bottom: 1.5rem;
				button{
					width:90%;
					margin-left: 5%;
					border-radius: 2rem;
					height:100%;
					background: #e91e63;
					color:#fff;	
					height: 100%;
					line-height: 4.2rem;
					font-size: 1.8rem;
					span{
						font-size:3rem;
						padding:0 .5rem;
					}
					b{
						text-decoration: line-through;
						font-weight: 400;
					}
					}
					.disclick{
						background: #9e9e9e;
					}
		}
	}
	.buyPage2{
		width:100%;
		flex:1;
		background: #fff;
		overflow: scroll;
		.header{
			height:3rem;
			color: #57c15b;
			width:60%;
			margin:0 auto;
			line-height: 3rem;
			/*background: #4cc3c7;*/
			text-align: center;
			position: relative;
			border-radius: 3px;
			span{
				position: absolute;
				left:1rem;
				top:0;
				color: #333;
			}
		}
		.header_3{
			width:90%;
			margin: .5rem auto;
			border-radius: 6px;
			box-shadow: 2px 2px 2px #ccc;
		}
		.header_1{
			text-align: center;
			color:#8dfb0d;
			padding:1rem 0;
			i{
				font-size: 2rem;
			}
			h6{
				color: #0a0a0a;
				font-size: 1.4rem;
			}
			p{
				color: #222;
				font-size: 1.7rem;
				line-height: 2rem;
			}
		}
		.header_2{
			text-align: center;
			line-height: 3rem;
			font-size: 1.3rem;
			color: #9e9e9e;
			i{
				color:#666;
			}
		}
		.main{
				&>div{
					width:90%;
					margin:1rem auto;
					border:1px solid #ddd;
					border-radius: 7px;
					overflow: hidden;
					&>p{
						height:4rem;
						background: #57c15b;
						color:#fff;
						display: flex;
		   				align-items: center;
		    			justify-content: space-around;
		    			flex-direction: column;

					}
				}
				.teacherCode{
					p{
						span{
							font-size: 1rem;
						}
					}
					&>div{
						margin-top: .5rem;
						&>img{
							width:9rem;
							height:9rem;
							display: inline-block;
							margin-left:50%;
							transform: translateX(-50%);
							-webkit-transform:translateX(-50%);
						}
						&>p{
							text-align: center;
							padding:.5rem 0;

						}
						.textS{
							font-size: 1.1rem;
						}
					}
				}
				.btn{
					border-radius: 0;
					border: none;
					width:100%;
					margin-top: 5rem;
					height:6rem;
					display: -webkit-flex;
					display: flex;
					justify-content: space-around;
					button{
						line-height: 3rem;
						height:3rem;
						padding:0 5rem;
						border-radius: 15px;
						box-shadow: 0 0 2px #9e9e9e;
						color: #ef5aa1;;
						border:1px solid rgba(238, 238, 238, 0.24);	
					}
				}
				.myCourseInfo{
					&>div{
						overflow: hidden;
						margin-bottom: .5rem;
						&>div{
							float: left;
							width:35%;
							p{
								width:80%;
								line-height: 3.2rem;
								background: #8bc34a;
								color:#fff;
								text-align: center;
								margin:1rem auto;
							}
						}
						&>ul{
							float: left;
							width:65%;
							margin-top: 1rem;
							overflow: hidden;
							li{
								float: left;
								margin:0 0 .5rem;
								width:45%;
								margin-right: 2%;
								&>img{
									width:4.5rem;
									height:4.5rem;
									display: inline-block;
									margin-left: 50%;
									transform: translateX(-50%);
									-webkit-transform: translateX(-50%);
								}
								&>p{
									font-size: 1rem;
									text-align: center;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
								}
							}
						}
						&:last-child{
							&>p{
								width:60%;
								margin-left: 35%;
								line-height: 3.2rem;
								background: #8bc34a;
								color:#fff;
								text-align: center;
								margin-top: 1rem;
						}
						
					}
					}

				}
				.courseIntroduce{
					.noContent{
						padding:4rem;
						text-align: center;
					}
					div{
						padding:.5rem 1rem;
					}
				}
			}
	}		
}
</style>