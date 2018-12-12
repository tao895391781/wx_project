<template>
	<section id="cashier" v-show='showThis'>
		<div class="go"  @click='gomyCourse' v-if='user.personNum==3?true:false'>
			<p>去我的课程&nbsp;&nbsp;></p>
		</div>
		<header>
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>营·课</div>
			<!-- <div><i class="iconfont">&#xe659;</i></div> -->
		</header>
		<section class="main4">
			<p><span>{{user.id}}</span><span>距离开营：<b>{{timeComputed(user.beginDate)}}</b></span></p>
			<p v-if='user.personNum==3?false:true'><span>{{user.personName}}</span>&nbsp;于<span>{{getCreateUserAndDate(user)}}</span>发起了团课，还差<span>{{3-user.personNum}}</span>人即可以组班成功，接受邀请后可发送此页给朋友或朋友圈邀请好友加入！</p>
			<p v-if='user.personNum==3?true:false'><span>{{user.personName}}</span>&nbsp;于<span>{{getCreateUserAndDate(user)}}</span>发起了团课，<b>已满三人组团成功！</b></p>

			<div class="teacherCode comment" v-if='code'>
					<p>长按识别二维码 添加老师微信<br><span>微信有限制，老师会在三天内通过验证，请耐心等待</span></p>
					<div>
						<img src="../../../../assets/images/shares.png" alt="iiii">
						<p>**老师的微信</p>
						<p>请不要截图分享老师的二维码哦~</p>
					</div>
			</div>

			<p>已加入成员:<span v-if='user.personNum==3?false:true'><i>成班倒计时：</i>{{countTimes}}</span></p>
				<ul>
					<li v-for='(use,index) in user.personList'>
						<img :src="use.headImg" alt="">
						<span>{{use.nickName}}</span>
					</li>
				</ul>
			<p v-show='user.personNum==3?false:true' @click='inviteBuys' class="addClub addSuccess">{{invitedSentance}}</p>
			<p v-show='user.personNum==3?true:false' class="addClub">组团成功</p>
			<div class="main5">
				<div class="myCourseInfo comment">
						<p>我的课程信息</p>
						<div>
							<div>
								<p>已选课程</p>
							</div>
							<ul>
								<li v-for='c in courseInfo1.courseList'>
									<p>{{c.name}}</p>
									<img :src="c.picId" alt="1">
									<p>{{c.beginDate}}-{{c.finishDate}}</p>
								</li>
							</ul>
						</div>
						<div>
							<div>
								<p>开课时间</p>
							</div>
							<p>{{courseInfo1.beginDate}}-{{courseInfo1.finishDate}}</p>

						</div>
				</div>

				<div class="courseIntroduce comment">
					<p>课程介绍</p>
					<div v-html='courseInfo1.content' v-show='courseInfo1.content!=""'>		
					</div>
					<div class="noContent" v-show='courseInfo1.content==""'>
						暂无内容介绍
					</div>
				</div>
			</div>

		</section>
		<!-- <h5>【学习书目】&nbsp;{{commendList.length}}&nbsp; 本</h5>
		<ul class="commendLists">
				<li v-for='(c,index) in commendList'>
					<div>
						<img :src="c.imgSrc" :alt="index">
					</div>
					<div>
						<p>《{{c.bookName}}》</p>
						<p>推荐版本：{{c.version}}</p>
						<p>{{c.thumbUp}} <i class="iconfont" @click='thumbUp(c.thumbUp,index)' :class="{clicks:true}">&#xe668;</i></p>
						<p>建议阅读天数:{{c.adviceReadDay}}</p>
					</div>
					<div>
						<span>立即体验</span>
					</div>
				</li>
			</ul> -->
		<footer v-show='ifInvited'>
			<div>
				<p>应付总额：<span>￥{{user.price}}</span></p>
				<!-- <p><span>原价:￥9.9</span></p> -->
				
			</div>
			<div @click='joinClubAndPay' >
				参加团报
			</div>
		</footer>
	</section>
</template>
<script>
import Vue from 'vue'
import {bus} from '../../../../bus.js'
	export default {
		data(){
			return {
				user:{},
				commendList:[],
				createDate:'',
				ifInvited:false,
				isfollow:this.$root.isfollow,
				courseId:'',
				showThis:false,
				invitedSentance:'接受邀请',
				flag:false,
				campingId:'',
				orderNum:'',
				timer1:'', 
				countTimes:'',
				showdjs:true,
				courseId2:'',
				courseInfo1:[],
				code:false,
				ifUpdata:false,

			}
		},
		methods:{
			gomyCourse(){
				bus.$emit('showMyCourse','noT');
			},
			inviteBuys(){
				let that = this
				let wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];	
				if(this.invitedSentance == '邀请好友'){
					//显示分享提示图片
					if(this.ifUpdata){
						bus.$emit('tipClub','过了有效时间，是否重新去开班？');
					}else{
						bus.$emit('share');
						//触发分享接口
						this.config('invited');
					}
					
				}else if(this.invitedSentance == '接受邀请'){
					let postDatas = {
						courseId:this.courseId,
						wxId:wxId,	
					}
					console.log(postDatas);
					this.campingId = decodeURIComponent(this.courseId).split('*')[1]
					console.log(this.campingId)
					console.log(this.courseId)
					this.axios.get(this.ip.RESTPATH + 'rest/getCampingIsFull/'+postDatas.courseId+'/'+postDatas.wxId)
					.then(res=>{
						console.log(res.data);
						if(!res.data.flag){
							console.log(this.user)
							let postData = {
								"campingId":this.campingId,
								"wxId":wxId,
								"type":'GROUP',
								"price":this.user.price
						};
							console.log(postData)
							this.axios.post(this.ip.RESTPATH+'rest/generateSingleOrder',postData)
							.then(res=>{
								this.ifInvited = true;
								console.log(res.data);
								this.orderNum = res.data.orderNum;	
							})

						}else{
							bus.$emit('tipClub','已满三人，是否重新去开班？');
						}
					})
					
				}
			},
			successPayGetInfo(){
				let that = this;
				let  campingId = decodeURIComponent(this.courseId).split('*')[1]
				console.log(campingId)
				this.axios.get(this.ip.RESTPATH+'rest/getCampingInfoByCampingId/'+campingId)
				.then(res=>{
					console.log(res.data);
					this.courseInfo1 = res.data;
					 let imgPath = [];
                	res.data.courseList.forEach(v=>{   
	                  imgPath.push(v.picId)
                });
                this.axios.get(this.ip.filePath+"rest/download/links?ids="+imgPath.join(','))
                .then(res1=>{
                  res.data.courseList.forEach(v1=>{      
                      v1.picId = that.ip.filePath1+res1.data[v1.picId].href;
                  })
                });

				})
			},
			thumbUp(n,i){
				this.m = i;
				console.log(n)	
				this.commendList[i].thumbUp = n+1;	
		},
			goback(){
				this.$router.go(-1);
			},
			joinClubAndPay(){
				//参加团报支付订单
				let postData = {
					orderNum:this.orderNum
				}	
				let wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];	
				let postDatas = {
						courseId:this.courseId,
						wxId:wxId,
						orderNum:this.orderNum
					}	
				console.log(postDatas);
				this.axios.post(this.ip.RESTPATH+'rest/postCampingSingleOrder',postData)
				.then(res=>{
					console.log(res.data);
					let that = this;
					WX.chooseWXPay({
						timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
						package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: res.data.sign, // 支付签名
						success: function (res) {
							// 支付成功后的回调函数
							alert('支付成功');
							that.axios.post(that.ip.RESTPATH + 'rest/postCampingJoinGroupClass',postDatas)
							.then(res=>{
								if(res.data.flag){
									let obj = {
										headImg:res.data.userInfo.headImg,
										nickName:res.data.userInfo.nickName,
										};
									that.user.personList.push(obj);
									that.user.personNum++;
									console.log(that.user.personList);
									if(that.user.personList.length==3){
										that.showdjs = false;
									}else{
										that.ifInvited = false;
										that.invitedSentance = '加入班级成功';
									}
								}
							})
						},
						fail:function(res){
							alert('支付失败');
							alert(res);
							// that.axios.post(that.ip.RESTPATH + 'rest/postCampingJoinGroupClass',postDatas)
							// .then(res=>{
							// 	if(res.data.flag){
							// 		alert('组班成功');
							// 		let obj = {
							// 			headImg:res.data.userInfo.headImg,
							// 			nickName:res.data.userInfo.nickName,
							// 			};
							// 		that.user.personList.push(obj);
							// 		that.user.personNum++;
							// 		console.log(that.user.personList);
							// 		if(that.user.personList.length==3){
							// 			that.showdjs = false;
							// 		}else{
							// 			that.ifInvited = false;
							// 			that.invitedSentance = '加入班级成功';
							// 		}
							// 	}
							// })
						},
						 cencel:function(res){
                    	  alert('cencel pay');
                		 },
						});
				})	
			},
			countTime(time){
				let that = this;
				let nowTime = Date.parse(new Date());//当前时间
				let useTime = 48*60*60*1000;//有效时间
				if(nowTime-time >= useTime){
					bus.$emit('tipClub','过了有效时间，是否重新去开班？');
					this.ifUpdata = true;

				}else{
					this.ifUpdata = false;
					this.timer1 = setTimeout(function(){
						let hour = Math.floor((useTime-(nowTime-time))/3600000);
						let min = Math.floor((useTime-(nowTime-time))%3600000/60000);
						let secs = Math.floor((useTime-(nowTime-time))%3600000%60000/1000);
						that.countTimes = hour+'小时'+min+'分钟'+secs+'秒';
						that.countTime(time);

					},1000);

				}
			},
			IsInArray(arr,val){ 
			　　var testStr=','+arr.join(",")+","; 
			　　return testStr.indexOf(","+val+",")!=-1; 
			}, 
			getCourseIdInfo(){
						this.successPayGetInfo();
						let wxid = JSON.parse(sessionStorage.getItem('u'))['openid'];
						console.log(wxid)
						this.axios.get(this.ip.RESTPATH+'rest/getCampingGroupClassByName/'+this.courseId+'/'+wxid)
							.then(res=>{
								bus.$emit('closeloading');
								this.showThis = true;
								let thats = this;
								console.log(res.data);
								this.user = res.data;
								this.courseId2 = res.data.courseId;
								this.config('invited');
								this.countTime(this.user.createdate);
								this.commendList = res.data.courseList;
								let PicId = [];
						 		this.commendList.forEach(v=>{
						 				PicId.push(v.imgSrc)
						 			});
						 			this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
									.then(function(res1){
										console.log(res1.data);
										console.log(thats.commendList)
										thats.commendList.forEach(v=>{
										 Vue.set(v,'imgSrc',thats.ip.filePath1+res1.data[v.imgSrc].href);
									})
								});
									let wxidArr = [];
									this.user.personList.forEach(v=>{
										if(v.wxId == wxid){
											wxidArr.push(v)
										}
									})
									console.log(wxidArr)
									if(wxidArr.length>0){
										this.ifInvited = false;
									}
									if(this.user.personNum==3){
											if(wxidArr.length == 0){
												bus.$emit('tipClub','已满三人，是否重新去开班？');	
											}else{
												this.code = true;
												bus.$emit('showMyCourse','t');
											}
									}else{
										//判断是否在创建的班级里
										if(wxidArr.length>0){
											console.log('已经加入了班级');
											this.invitedSentance = '邀请好友';
										}
								}	
									
						});
					},
			getCreateUserAndDate(users){
		      let D=new Date(users.createdate);
		      let year = D.getFullYear()+"年";
		      let month = D.getMonth()+1+'月';
		      let date = D.getDate()+'日';
		      let hour = D.getHours()<10 ? "0"+D.getHours()+':' : D.getHours()+':';
		      let minutes = D.getMinutes()<10 ? "0"+D.getMinutes()+':' : D.getMinutes()+':';
		      let seconds = D.getSeconds()<10 ? "0"+D.getSeconds()+':' : D.getSeconds();
		      let createDate=year+month+date+hour+minutes+seconds;
		  	  return createDate;
   			 },
   			 timeComputed(str){
				if (!str) return ''
            	let date = new Date(str)
           	 	let time = date.getTime()-new Date().getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
           		let dates = new Date(time)
              	let Time = dates.getDate()+'天'+(dates.getHours()>10|| dates.getHours()==10?dates.getHours():'0'+dates.getHours())+'时'+(dates.getMinutes()>9?dates.getMinutes():'0'+dates.getMinutes())+'分钟';
              return Time;
			},	
		},
		beforeCreate(){
			
		},
		mounted(){
			//成班倒计时
			
		},
		created(){
			this.$parent.isFirst = false;
			if(window.location.href.indexOf('invited')!=-1 && window.location.href.indexOf('code')!=-1){
				this.courseId = window.location.href.split('&courseId=')[1];
				this.flag = true;
				bus.$emit('loading');

			}else if(window.location.href.indexOf('invited')!=-1 && window.location.href.indexOf('code')==-1){
				let courseIds = window.location.href.split('&courseId=')[1];
				this.flag = false;
				 let url = encodeURIComponent(this.ip.RESTPATH3+'/weixin/index.html#/readIndex/qualityCourse/buyPage/buyAndInvite?ifInvited=invited&courseId='+courseIds);
				 
				 let shareUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d5acc823e35fa92&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				 window.location = shareUrl;
			}else{
				this.courseId = this.$route.query.courseId;
				this.flag = true;
				bus.$emit('loading');
			}
			let that = this;
			console.log(this.courseId);
 			if(this.flag){
				//验证用户是否关注公众号
				  if(sessionStorage.getItem('u')){
				    //存了个人信息不进行操作
				    this.getCourseIdInfo();
				    console.log('存了code')
				    }else if(window.location.href.indexOf('?code=')!=-1){
				    //有code但没有个人信息
				    let href  = window.location.href.split('?code=')[1].split('&')[0];
				    console.log('code:'+href);
				    $http.get('getUserInfo/'+href)
				    .then(res=>{
				      console.log('从邀请页面进来获取的个人信息');
				      console.log(res.data);
				      sessionStorage.setItem('u',JSON.stringify(res.data));
				      console.log(sessionStorage.getItem('u'));
				     	let nickname= JSON.parse(sessionStorage.getItem('u'))['nickname'];
						let headimg = JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
						let wxId    = JSON.parse(sessionStorage.getItem('u'))['openid'];
				      	let postdata={
						age:'0',
						sex:'man',
						wxId:wxId,
						grade:'1',
						headImg:headimg,
						nickName:nickname,
						isFirst:0,	
					}
					console.log(postdata)
					this.axios.post(this.ip.RESTPATH+'rest/postDayShareUserInfoByWxId',postdata)
					.then(res=>{
						console.log('提交首次登陆用户的信息');
						console.log(res.data)
						if(res.data.flag){
							sessionStorage.setItem('grades',res.data.grade);
							sessionStorage.setItem('IndexId',res.data.id);	
							this.getCourseIdInfo();
						}
					});
				      
   					 })
 				}
			}
			bus.$on('goIndex',()=>{
				this.$router.push({name:'readIndex'})
			});
			bus.$on('invited',()=>{
				 let shareUrl = 'http://test.wsreading.com/weixin/index.html?/#/readIndex/qualityCourse/buyPage/buyAndInvite?ifInvited=invited&courseId='+that.courseId2;
				    console.log(shareUrl);
				    WX.onMenuShareAppMessage({
				      title:'邀请参加团报', 
				      desc: '文升致力孩子阅读！—文升',
				      link:  shareUrl,
				      imgUrl:'http://resource.wsreading.com/file/20180207/40e7f817-6ef2-41d1-8528-86ef7c6b461a/sharess.png', 
				    });
				    WX.onMenuShareTimeline({
				      title: '哈哈哈', 
				      link:shareUrl,
				      imgUrl:'http://resource.wsreading.com/file/20180207/40e7f817-6ef2-41d1-8528-86ef7c6b461a/sharess.png', 
				    });
			});
		},

		computed:{
		},
	}
</script>
<style lang='less' scoped>
	#cashier{
		width:100%;
		height:100%;
		background:rgba(242, 242, 242, 0.28);
		display:flex;
		-webkit-display:flex;
		flex-direction: column;
		-webkit-flex-direction: column;
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
		header{
			height:43px;
			border-bottom:1px solid #eee;
			background: #fff;
			div{
				display:inline-block;
				background:rgba(255, 255, 255, .87);
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
				&:nth-child(3){
					width:20%;
					color:#f60;
				}
			}
		}
		.main4{
			flex:1;
			width:100%;
			background:rgba(242, 242, 242, 0.28);
			padding-bottom: 4.2rem;
			.comment{
				width:84%;
				margin:1rem 8%;
				border:1px solid rgba(221, 221, 221, 0.36);
					&>p{
						height:3rem;
						background: #03a9f4;
						color:#fff;
						display: flex;
		   				align-items: center;
		    			justify-content: space-around;
		    			flex-direction: column;
						span{
							font-size: 1rem;
						}
					}

			}
			.main5{
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
							&>li{
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
			.teacherCode{
				&>p{
					height:5rem;
				}
					&>div{
						margin-top: .5rem;
						&>img{
							width:7rem;
							height:7rem;
							display: inline-block;
							margin-left:50%;
							transform: translateX(-50%);
							-webkit-transform:translateX(-50%);
						}
						&>p{
							text-align: center;
							padding:.5rem 0;

						}
					}
				}
			&>p{
				width:100%;
				margin:0 auto;
				text-indent:1em;
				&:first-child{
					line-height:3rem;
					border-left:4px solid #f60;
					background:#fff;
					margin:.5rem auto;
					overflow:hidden;
					&>span{
						float: left;
						display:inline-block;
						margin-left:2rem;
						font-size:1.2rem;
						&:last-child{
							float: right;
							margin-right: 2rem;
							b{
								color:#f60;
								font-weight:400;
							}
						}
					}
				}
				&:nth-child(2){
					padding:.2rem 1rem;
					font-size:1.2rem;
					line-height: 1.8rem;
					span{
						color:#f60;
					}
					b{
						font-size:1.7rem;
						font-weight:400;
						color:#f60;
					}
				}
				&:nth-child(3){
					font-size:1.4rem;
					padding-left: 1rem;
					span{
						float: right;
						display: inline-block;
						margin-right: 2rem;
						font-size: 1.3rem;
						color:#f60;
						border-bottom:1px solid #f60;
						i{
							font-size: 1.2rem;
							font-style: normal;
						}
					}
				}
				&.addClub{
					width:30%;
					margin:1rem auto 1rem;
					background:#F60;
					color:#fff;
					text-align:center;
					line-height:2.5rem;
					border-radius:5px;
					font-size:1.3rem;

				}
				&.addSuccess{
					background:#67c23a;
				}
			}
				&>ul{
					width:90%;
					margin:1.5rem auto;
					overflow:hidden;
					display:flex;
					-webkit-display:flex;
					justify-content:center;
						li{
							width:4rem;
							height:6rem;
							border-radius:50%;
							margin-top: 0;
							margin:0 .5rem;
							position: relative;
							box-sizing: border-box;
							img{
								display: inline-block;
								width:4rem;
								height:4rem;
								border-radius:50%;
								border:2px solid #fff;
							}
							span{
								position: absolute;
								bottom:0;
								left:0;
								display: inline-block;
								width: 100%;
								height: 2rem;
								text-align: center;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-size:1.2rem;

							}

						}
				}

		}
		&>h5{
			padding:.5rem 0;
			border-left:5px solid #f60;
			background:#fff;
		}
			.commendLists{
			width:100%;
			flex:1;
			-webkit-flex:1;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			background:#f1f1f1;
			margin-top: .2rem;
			li{
				height:10rem;
				width:100%;
				background:#fcfcfc;
				padding-left:.5rem;
				border-top:1px solid rgba(192, 196, 204, 0.16);
				border-bottom:1px solid rgba(192, 196, 204, 0.16);
				&>div{
					float: left;
					height:100%;
					&:first-child{
						width:25%;
						img{
							display:inline-block;
							width:95%;
							height:95%;
						}
					}
					&:nth-child(2){
						width:50%;
						&>p{
							text-align: left;
							padding:.1rem 0;
							padding-left:1rem;
							font-size:1.3rem;
							i{
								color:#333;
							}
							.clicks{
								color:#f60;
							}
						}
					}
					&:nth-child(3){
						width:25%;
						span{
							padding:.2rem 1rem;
							background:#f60;
							color:#fff;
							border-radius:5px;
							font-size:1.3rem;
							display:inline-block;
							margin-top: 4rem;
						}
					}
				}
			}
			li:not(:first-child){
					margin-top: .2rem;
				}
		}
		.booklist{
			flex:1;
			-webkit-flex:1;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
		}
		footer{
			width:100%;
			height:4.2rem;
			background:#fff;
			position: fixed;
			bottom:0;
			left:0;
			div{
				float: left;
				width:65%;
				height:100%;
				p{
				text-align: right;
				height:50%;
				line-height:4.2rem;
				font-size:1.3rem;
				padding-right:1rem;
				span{
					font-size:1.8rem;
					color:#f60;
				}
				/*&:last-child{
					
					span{
						font-size:1.2rem;
						text-decoration:line-through;
					}
				}*/
				}
				&:last-child{
					width:35%;
					text-align:center;
					line-height:4.2rem;
					background:#f60;
					color:#fff;
					
				}
			}
		}
	}
</style>