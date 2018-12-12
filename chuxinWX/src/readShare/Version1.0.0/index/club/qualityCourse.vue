<template>
	<section id="qualityCourse">
		<div class="scrollBlock" v-show='showThis' ref='wrappers'>
			<header ref = 'header'>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div>{{title[$route.params.id-1]}}</div>
				<!-- <div><i class="iconfont">&#xe659;</i></div> -->
			</header>
			<ul class="nav1"  ref='nav1' v-show='showNav1'>
				<li @click='selectBooklists("courseInfo")' :class="{borderB:Gradeindex==0}">课程介绍</li>
				<li @click='selectBooklists("selectBook")' :class="{borderB:Gradeindex==1}">可选书单</li>
			</ul>
		<div ref='wrapper' class="mainBoxer">
			<div class="mainBox" ref='mainBox'>
					<banner1 v-if='showThis' :bannerImg='bannerImg' ref='banner'></banner1>
					<ul class="nav"  ref='nav' v-show='!showNav1'>
						<li @click='selectBooklists("courseInfo")' :class="{borderB:Gradeindex==0}">课程介绍</li>
						<li @click='selectBooklists("selectBook")' :class="{borderB:Gradeindex==1}">可选书单</li>
					</ul>
					<div class="bigBox">
						<div id="courseInfo" ref='courseInfo'>
							<h5>课程介绍</h5>
							<div v-for='(img,index) in imgs' v-if='!havebookInfo'>
								<img :src="img" :alt="index">
							</div>
							<p class="noBookInfo" v-if='havebookInfo'>暂无课程介绍</p>
						</div>

						<div id="selectBookList" ref='selectBookList'>
							<h5>可选书单</h5>
							<div v-for='(b,index) in selectBooklist' @click='selectedBooklist(index,b)' :class="{selected:index==inde,notSelected:index!=inde,campingIds:campingId==b.id}" :index='index'
							v-show='!havebookList'>
								<div>
									<div>
										<p>{{b.stage}}</p>
										<p>推荐年龄：<span>{{b.age}}</span>&nbsp;&nbsp;<span>{{b.grade}}</span></p>
										<p>阅读时段：{{transDate(b.date)}}-{{transDate(b.finishDate)}}</p>
									</div>
									<div>
										<p v-show='index!=inde'>选择</p>
										<p v-show='index==inde'>已选择</p>
									</div>	
								</div>
								<div>
									<p v-for='(book,index) in b.courseList'>	
										<b>{{book.bookName}}</b>
										<span>{{book.beginDate}}-{{book.finishDate}}</span></p>
								</div>		
							</div>
								<p class="noBookInfo" v-if='havebookList'>暂无书单，敬请期待</p>
						</div>
					</div>
			</div>
		</div>
		</div>
			<div v-show='ifSelected' class="bottomFix" >
				<div class="buy" v-show='ifInviteds' >
					<!-- <button @click='immediatelyBuy("GROUP",groupPrice)'>￥<span>{{groupPrice}}</span>/人<b>3人团报</b></button> -->
					<button  @click='immediatelyBuy("SINGLE",price)'><span>优惠价</span><b>￥</b><span class="priceBig">{{price}}</span></button>
				</div>

				<div class="goInviteORseeInfo"  v-show='!ifInviteds' @click='immediatelyBuy("GROUP",clubInfo.groupPrice)' :class="{addClassSucc:addClassSucc,ifupdate:ifupdate}">
					{{invitetext}}
				</div>
		</div>
	</section>	
</template>
<script>
import banner1 from '../../../../components/banner1.vue'
import booklist from '../../../../components/boolist.vue'
import {bus} from '../../../../bus.js'
import {transDate} from '../../../../config.js'
	export default {
		data(){
			return {
				commendList:[],
				selectBuy:true,
				selectBuys:false,
				showSureBuy:false,
				Gradeindex:0,
				indexs:0,
				clubInfo:{},
				width:'',
				bookNum:'',
				grades:'',
				isUpdate:true,
				invitetext:'',
				ifInviteds:false,
				courseId:'',
				ifupdate:false,
				state:'',
				wxId:'',
				showThis:false,
				addClassSucc:false,
				preventClick:true,
				imgs:[],
				bannerImg:[],
				selectBooklist:[],
				h:0,
				inde:-1,
				title:['阅读挑战营','名著导读营课','名著精读营课','名著精读互动课'],
				ifSelected:false,
				groupPrice:0,
				price:0,
				showSelectBooklist:false,
				from:false,
				havebookInfo:false,
				havebookList:false,
				havebookInfo1:false,
				havebookList1:false,
				scroll:'',
				scrollY:0,
				lastY:0,
				showNav1:false,
				ifInnerBody:true,
			}
		},
		methods:{
			transDate:transDate,
			initScroll(){
				this.scroll = new this.BScroll(this.$refs.wrapper,{click:true,disableTouch:false,probeType:3});
			},  
			watchScrollXY(){
				this.scroll.on('scroll',(pos)=>{
					let bodyH = document.body.clientHeight;	
					let bannerH = this.$refs.banner.$el.clientHeight;
					let fixHeight = this.$refs.header.clientHeight + bannerH;
					let lastY = this.$refs.wrappers.clientHeight - document.body.clientHeight;
					let showGrade = this.$refs.wrappers.clientHeight -this.$refs.selectBookList.clientHeight - document.body.clientHeight;
					let selectOffsetTop = this.$refs.selectBookList.getBoundingClientRect().top;
						if(bodyH<selectOffsetTop){
							this.Gradeindex = 0;
						}else{
							this.Gradeindex = 1;
						}	
						if(-pos.y>bannerH){
							this.showNav1 = true;
						}else{
							this.showNav1 = false;
						}
						
					});
				
			},  
			//选择书单
			selectedBooklist(index,b){
				this.inde= index;
				this.ifSelected = true;
				this.groupPrice = b.groupPrice;
				this.price  = b.price;
				this.clubInfo = b;
				this.getClassStatus(this.clubInfo.id,this.wxId,b);

			},
			//自动滚动到指定位置并默认选中
			autoSelectedBooklist(index){
				let selectData = this.selectBooklist[index];
				this.selectedBooklist(index,selectData);

			},
			//滚动到指定位置
			selectBooklists(type){
				let that = this;
				if(type == 'courseInfo'){
					
					this.Gradeindex = 0;
					let el  = this.$refs.header;
					let time = 500;
					this.scroll.scrollToElement(el, time, true,true)
				}else{
					this.ifInnerBody = true;
					this.Gradeindex = 1;
					let el  = this.$refs.selectBookList;
					let time = 500;
					this.scroll.scrollToElement(el, time, true,true);
					}
				},
			classDetail(){
				this.$router.push({name:'buyAndInvite',query:{courseId:this.courseId}})
			},
			//去邀请页面、参加组班
			immediatelyBuy(type,price){
				if(this.ifupdate){
					alert('该营课已停止');
				}else if(this.state=='init'){
					let postData = {
						"campingId":this.clubInfo.id,
						"wxId":this.wxId,
						"type":type,
						"price":price,
						"origin":sessionStorage.getItem('signIds')
					};
					console.log(postData)
					this.axios.post(this.ip.RESTPATH+'rest/generateSingleOrder',postData)
					.then(res=>{
						console.log(res.data);
						if(res.data.orderNum){
							this.$router.push({name:'buyPage',query:{orderNum:res.data.orderNum,type:type}})
						}
					})
				}else if(this.state=='single'){
					this.$router.push({name:'myCourse'})
				}else if(this.state=='groupSuccess'){
					this.$router.push({name:'myCourse'})
				}else if(this.state=='groupRunning'){
					this.$router.push({name:'buyAndInvite',query:{courseId:this.courseId}})
				}	
			},
			goback(){
				this.$router.go(-1);
				// this.$router.push({name:'readIndex'})
			},
			getClassStatus(compainId,wxId,b){
				console.log(b)
				 let time =new Date(b.finishDate).getTime()-new Date().getTime();
				 	this.axios.get(this.ip.RESTPATH+'rest/getCampingIsToBuy/'+compainId+'/'+wxId)
					.then(res=>{
						 if(time<0 && res.data.flag == false ){
						 	this.ifInviteds = false;
						 	this.ifupdate = true;
						 	this.invitetext = '该营课已停止'
						 }else{
						this.ifupdate = false;
						console.log(res.data)
						this.preventClick = false;
						
						if(res.data.flag == false){
							this.ifInviteds = true;
							this.state='init';
						}else if(res.data.flag=='SINGLE'){
							this.ifInviteds = false;
							this.state = 'single';
							this.addClassSucc = false;
							this.invitetext = '已经购买，点击进入我的课程';
						}else if(res.data.flag =='GROUP'){
							if(res.data.status == 'success'){
								this.addClassSucc = true;
								this.ifInviteds = false;
								this.invitetext = '组班成功去我的书架';
								this.state = 'groupSuccess';
								this.courseId = res.data.courseId;
							}else if(res.data.status == 'running'){
								this.addClassSucc = false;
								this.ifInviteds = false;
								this.state = 'groupRunning';
								this.invitetext = '该班还未满三人，去邀请好友？';
								this.courseId = res.data.courseId;
								}
							}
						}
				})	
			},
			//显示其他级别
			selectWay(ways){
				if(ways == 'group'){
					this.selectBuy = true;
					this.selectBuys = false;
				}else{
					this.selectBuy = false;
					this.selectBuys = true;
				}
			},
			timeComputed(str){
				if (!str) return ''
            var date = new Date(str)
            var time =date.getTime()-new Date().getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
            console.log(time)
            if(time<0){
            	console.log('已停止');
            	return -1;
            }else{
            	this.isUpdate = true;
            let dates = new Date(time)
            let Time = dates.getDate()+'天'+(dates.getHours()>10|| dates.getHours()==10?dates.getHours():'0'+dates.getHours())+'时'+(dates.getMinutes()>9?dates.getMinutes():'0'+dates.getMinutes())+'分钟';
              return Time;
            }
            
			},
				campingIdsScroll(){
					this.$nextTick(() => {
	       				let el = $('.campingIds').get(0);
	       				let time = 300;
	       				let offsetX = true;
	       				let offsetY = true;
	       				this.scroll.scrollToElement(el, time, offsetX, offsetY);
	       				let index = el.getAttribute('index');
	       				this.autoSelectedBooklist(index);
	     				 })			
				},
				sequence(a,b){
					if(a>b){
						return 1;
					}else if(a<b){
						return -1;
					}else{
						return 0;
					}
				},
				//获取的书单时间排序
				bubbleSort(array){
				    /*给每个未确定的位置做循环*/
				    if(array.length == 0) return;
				    for(let unfix=array.length-1; unfix>0; unfix--){
				      /*给进度做个记录，比到未确定位置*/
				      for(let i=0; i<unfix;i++){
				        if(array[i].date>array[i+1].date){
				          let temp = array[i];
				          array.splice(i,1,array[i+1]);
				          array.splice(i+1,1,temp);
				        }
				      }
				    }
				    console.log(array)
				    return array;
				 },
				 //具体数单排序
				 booklistSort(array){
				 	if(array.length == 0) return;
				 	 for(let unfix=array.length-1; unfix>0; unfix--){
				      /*给进度做个记录，比到未确定位置*/
				      for(let i=0; i<unfix;i++){
				        if(this.strToNumber(array[i].beginDate)>this.strToNumber(array[i+1].beginDate)){
				          let temp = array[i];
				          array.splice(i,1,array[i+1]);
				          array.splice(i+1,1,temp);
				        }
				      }
				    }
				    return array;
				 },
				 strToNumber(str){
				 	if(str.length == 0) return;
				 	if(str.indexOf('.')<0) return;
				 	return str.replace('.',0);
				 },
				dateSort(arr){
					if(arr.lengthv == 0) return;
					let arrdate = [];
					arr.forEach((v,index)=>{
						arrdate.push(v.date);
					})
					console.log(arrdate.sort(this.sequence))
					return arr.sort(this.sequence);
				},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		watch:{
			from(v){
				let that = this;
				$(function(){
					that.scroll.refresh();
					that.campingIdsScroll();
				})
			},
		},
		computed:{
			campingId(){
				return this.$route.query.Ids;
			},
			bookId(){
				return this.$route.query.ids;
			},
			isHaveBooklist(){
				return this.selectBooklist.length == 0? false : true;
			},
			
		},
		created(){
			this.$parent.isFirst = false;
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			let that = this;
			this.grades = sessionStorage.getItem('grades');
			let campingId = sessionStorage.getItem('IndexId');
			let flag =1;
			let type = this.$route.params.id;
			this.axios.get(this.ip.RESTPATH+'rest/getCampingBookByGrade/'+type)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading');
				this.showThis = true;
				this.showSelectBooklist = true;
				this.selectBooklist = res.data.camping;
				//获取书单按时间排序
				this.selectBooklist.forEach(v=>{
					v.courseList = this.booklistSort(v.courseList);
				})
				
				this.bubbleSort(this.selectBooklist);
				if(res.data.camping.length == 0){
					this.havebookList = true;
				}else if(res.data.centent.length == 0){
					this.havebookInfo = true;
				}
				if(res.data.centent.length==0){
					//为空不操作
					
				}else{
		 			let banner = res.data.broadcastPic;
		 			banner==''?res.data.centent:res.data.centent.unshift(banner)
		 			let cPic = res.data.centent.length == 1 ? res.data.centent:res.data.centent.join(',')
					this.axios.get(this.ip.filePath+"rest/download/links?ids="+cPic)
						.then(function(res1){
								let imgPic = [];
								res.data.centent.forEach(v=>{
								v = that.ip.filePath2+res1.data[v].href
								imgPic.push(v);
							})
								// console.log(imgPic)
								if(banner==''){

									that.imgs = imgPic;	
								}else{
									let newImg = imgPic.concat(that.imgs)
									that.imgs = imgPic.splice(1,imgPic.length);
									that.bannerImg.push(newImg[0])
								}
								if(that.$route.query.from == 'four'){
									that.from = false
								}else{
									that.from = true
									}
						that.$nextTick(()=>{
							that.initScroll();
							that.watchScrollXY()	
						})
						});
				}	
			});
		},
		beforeRouteLeave (to, from, next){
		    next()  
		    this.scroll.off('scroll')
		},
		mounted(){
			

		},
		components:{
			banner1,
			booklist
		},
	}
</script>
<style lang='less'>
	#qualityCourse{
		width:100%;
		height:100%;
		position:relative;
		z-index:886;
		background:#f2f2f2;
		display:flex;
		display:-webkit-flex;
		flex-direction: column;
		.scrollBlock{
			flex:1;
			background: #fff;
			display: -webkit-flex;
			display: flex;
			flex-direction: column;
		&>header{
			height:43px;
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
					text-align:left;
					text-indent:1em;
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
		.nav1{
			width:100%;
			height:3.5rem;	
			line-height:3.5rem;	
    		background: rgba(255, 255, 255, 1);
    		border-top:1px solid #eee;
    		display:-webkit-flex;
    		display:flex;
    		justify-content:space-around;

			li{
				width:40%;
				height:100%;
				margin-top: 0;
				line-height:3.5rem;
				text-align: center;
			}
			.borderB{
				border-bottom:1px solid #f60;
				color:#f60;
			}
		}
		.mainBoxer{
			position:relative;
			flex:1;
			overflow: hidden;
		}
		.mainBox{
			background: #fff;
			width:100%;
		}
		.bigBox{
			padding-bottom: 3.5rem;
			&>.noBooklist{
				padding:4rem 0;
				text-align: center;
			}
			
			#courseInfo{
				height:auto;
				.noBookInfo{
					line-height: 14rem;
					text-align: center;
				}
				&>h5{
					line-height: 3rem;
					text-indent: 2em;
					border-bottom:1px solid #ddd;
					font-weight: 500;
					font-size: 1.6rem;
				}
				&>div{
					width:100%;
					height:18rem;
					margin:.5rem auto;

					&>img{
						display: inline-block;
						width:100%;
						height:100%;
					}
				}
			}
			#selectBookList{
				border-top: 1px solid #eee;
				&>h5{
					line-height: 3rem;
					text-indent: 2em;
					font-size: 1.6rem;
					color:#333;
					font-weight: 500;
				}
				&>p{
					text-align: center;
					padding:3rem 0;
				}
				&>div{
					overflow: hidden;
					width:85%;
					margin:0 auto;
					background: #f9f9f9;
					margin-bottom:.5rem;
					border-radius: 7px;
					border:1px solid #eee;
					&:last-child{
						margin-bottom:1rem;
					}
					&>div{
						width:100%;
						overflow: hidden;
						&:first-child{
							background: rgba(72, 95, 204, 0.7098039215686275);
						}
						&:last-child{
							padding:.5rem .5rem;
							&>ul{
								height:2.5rem;
								li{
									width:45%;
									height:100%;
									line-height: 2.5rem;
									float: left;
									margin-top: 0;
									font-size: 1.3rem;
									&:last-child{
										width:40%;
										float: right;
										padding-right: .5rem;
										text-indent: 2em;
									}
								}
							}
							p{
								border-radius: 3px;
								color:#333;
								overflow: hidden;
								line-height: 1.6rem;
								&>span{
									float: right;
									padding-right: .5rem;
									font-size: 1.3rem;
									color:#555;
									display: inline-block;
									width:40%;
									overflow: hidden;
									text-overflow:ellipsis;
									white-space: nowrap;
									text-indent: 2em;
								
										}
										&>b{
											font-size: 1.3rem;
											font-weight: 400;
											display: inline-block;
											width:45%;
											overflow: hidden;
											text-overflow:ellipsis;
											white-space: nowrap;
										}
							}
							.selectB{
									background: #e91e63;
									color:#fff;
									span{
										color:#fff;
									}
								}
						}
						&>div{
							float:left;
							padding:.5rem 0;
							&:first-child{
								width:80%;
								p{
									color:#fff;
									padding:.3rem .5rem;
									font-size:1.2rem;
									&:first-child{
										font-size:1.7rem;
									}
									&:nth-child(2){
										position: relative;
										bottom:-.8rem;
									}
								}
							}
							&:last-child{
								width:20%;
								&>p{
									height:2.8rem;
									margin-top: 1.1rem;
									width:75%;
									background: #fff;
									text-align: center;
									border-radius: 3px;
									line-height: 2.8rem;
									color:#555;
									position: relative;

								}

							}
						}
					}
					
				}
				.selected{
					transition:transform .5s;
					transform: scale(1);
					-webkit-transition:transform .5s;
					-webkit-transform: scale(1);
					box-shadow: 0 0 3px rgba(0,0,0,.25);
				}
				.notSelected{
					transition:transform .5s;
					transform: scale(.95);
					-webkit-transition:transform .5s;
					-webkit-transform: scale(.95);
				}
			}
		}
		.nav{
			width:100%;
			height:3.5rem;	
			line-height:3.5rem;	
    		background: rgba(255, 255, 255, 1);
    		border-top:1px solid #eee;
    		display:-webkit-flex;
    		display:flex;
    		justify-content:space-around;
			li{
				width:40%;
				height:100%;
				margin-top: 0;
				line-height:3.5rem;
				text-align: center;
			}
			.borderB{
				border-bottom:1px solid #f60;
				color:#f60;
			}
		}
		.blank{

		}
		.fixNav{
			position: static;
			top:0;
			left:0;
			z-index: 1003;
		}
		.Stages{
			height:7rem;
			width:100%;
			overflow-x: scroll;  
            overflow-y: hidden; 
            -webkit-overflow-scrolling:touch;
            white-space: nowrap;
			li{
				width:42%;
				height:80%;
				display:inline-block;
				margin-top:.7rem;
				margin-left: 1rem;
				background:#fff;
				border-left:4px solid #ddd;
				p{
					height:50%;
					text-align:center;
					line-height:3rem;
					font-size:1.3rem;
					span{
						/*color:#f60;*/
						font-size:1rem;
					}
				&:first-child{
					border-bottom:1px solid #ddd;
				}
				}
				&:last-child{
					margin-right: 1rem;
				}
			}
			.selectStages{
				border-left-color:#f60;
				p{
					color:#f60;
					span{
						color:#f60;
					}
					&:first-child{
						border-bottom-color:#f60;
				}	
				}
			}
		}
		.clubAndType{
			width:100%;
			height:3rem;
			text-indent:1em;
			background:#fcfcfc;
			color:#f60;
			line-height:3rem;
			margin:.2rem 0;
		}
		.clubbooklist{
			flex:1;
			-webkit-flex:1;
			overflow:scroll;
			display:flex;
			-webkit-display:flex;
			flex-direction: column;
			-webkit-flex-direction: column;
			.preventClick{
			position:fixed;
			width:100%;
			height:47%;
			left:0;
			bottom:0;
			background:rgba(0,0,0,.1);
			z-index:999;
			}

			.clubIntro{
			/* display:flex;
			-webkit-display:flex;
			flex-direction: column;
			-webkit-flex-direction: column; */
			&>p{
				text-indent:1.5rem;
				color:#f60;
				padding:.3rem 0;
				border-bottom:1px solid rgba(220, 223, 230, 0.89);
			}
			.introText{
				flex:1;
				text-indent:2em;
				font-size:1.2rem;
				overflow:scroll;
				-webkit-overflow-scrolling:touch;
			}
			
		}
		}
	}
		.goInviteORseeInfo{
			height:4rem;
			line-height:4rem;
			width:100%;
			border-top: 1px solid rgba(51, 51, 51, 0.26);
			text-align:center;
			color:#333;
			background:#fff;
			font-size:1.6rem;
		}
		.addClassSucc{
			background:#67c23a;
			color:#fff;
		}
		.ifupdate{
					background:#9e9e9e;
					border-right: 1px solid #fff!important;
					color:#fff;
					
				}
		.bottomFix{
			height:4rem;
			position: fixed;
			bottom: 0;
			left: 0;
			width:100%;

		}
		.buy{
				height:4rem;
				background:#fcfcfc;
				border-top: 1px solid #eee;
				
				width:100%;
				
				&>button{
					width:95%;
					margin-left:2.5%;
					border-radius: 50px;
					float: left;
					height:100%;
					border-style:none;
					line-height:4rem;
					outline:none;
					background:transparent;
					background:#e91e63;
					color: #fff;
					border-top: 1px solid #eee;
					&>span{
						font-size:1.7rem;
					}
					.priceBig{
						font-size: 2rem;
						padding-right: .5rem;
						font-weight: 700;
					}
					&>b{
						font-style:normal;
						font-weight:400;
						font-size:1.2rem;
					}
					&:first-child{
						border-right:1px solid rgba(220, 223, 230, 0.89);
					}
					&:nth-child(2){
						border-right:1px solid rgba(220, 223, 230, 0.89);
						color:#666;
						&>span{
							
							&:last-child{
								float:right;
								font-size:1.2rem;
								position:relative;
								bottom:-.5rem;
								right:1rem;
							}
						}
					}
				}
				.selectBuy{
					background:#f60;
				}

			}
	}
</style>