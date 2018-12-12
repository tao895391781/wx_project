<template>
	<section id="ImmediateExp">
			<div class="main1">
				<header>
					<i class="iconfont" @click='goback' v-show='showGoback'>&#xe655;</i>
					《{{clubClassBookInfo.bookName}}》
				</header>
			<div class="mainBox">
			<div class="studyPlan">

				<div class="readTopic"  @click='gototalPreReadVideo(clubClassBookInfo.readingGuide.id,clubClassBookInfo.readingGuide.type)'>
					<div>
						<i class="iconfont">&#xe658;</i>
					</div>
					<div>
						<p>整书导读及阅读规划</p>
						<p>观看导读视频了解阅读重点及计划哦！</p>
					</div>
				</div>
				<div class="mianBox" ref='mianBox'>
					<canvas ref="canvas"></canvas>
					<p class="totalStudyplane">
						<span>整书阅读计划&nbsp;|&nbsp;</span>共{{len}}次</p>
					<ul>
						<li v-for='(r,index) in clubClassBookInfo.readDays' :class="{sumUp:r.type=='summary',begin:r.isFinish=='begin',running:r.isFinish=='running',over:r.isFinish=='finish'}" v-if='r.type=="read"' ref='readLi' @click='goeveryTimeRead(r,index,r.isPay)'>
							<b v-show="r.isFinish=='finish'"><i class="iconfont">&#xe786;</i></b>
							<b v-show="r.isFinish=='begin' ||r.isFinish=='running'"><i class="iconfont">&#xe629;</i></b>
								<span v-show='r.type=="read"'>第{{index+1}}次</span>
								<!-- <p>{{tipTimeOfMouthAndDate(r.beginDate)}}</p> -->
								<!-- <span v-show='r.type=="!summary"' @click='goReadSum(r,index,r.isPay)'>第{{numTozh[r.node]}}次阅读</span> -->
								<!-- <i class="runnings iconfont" v-show="r.isFinish=='running'">&#xe62c;</i>
								<i class="overs iconfont" v-show="r.isFinish=='finish'">&#xe62e;</i> -->
						</li>
				</ul>
				</div>
				<div class="readTest"  @click='gototalTest(clubClassBookInfo.readingTest.isFinish,clubClassBookInfo.readingTest)'>
					<div>
						<i class="iconfont">&#xe729;</i>
					</div>
					<div>
						<p>整书测试</p>
						<p>读完整本书来测一测你的阅读效果吧！</p>
					</div>
				</div>

			</div>
			</div>
		</div>
	</section>
</template>
<script>	
	import {bus} from '../../../../../bus.js'
 	export default {
		data(){
			return {
				selectBuy:true,
				selectBuys:false,
				clubClassBookInfo:{},
				showThis:false,
				ifGuidefree:false,
				numTozh:{1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十'},
				days:1,
				readLength:0,
				showThis:false,
				testFinish:false,
				ifTestfree:false,
				data1:true,
				showGoback:true,
				ctx:{},
				len:0,
				isPay_1:false,
				showBack:true,
			}
		},
		mounted(){
		},
		methods:{
			gototalTest(finish,r){
				console.log(r)
				if(this.isPay_1){
					if(this.clubClassBookInfo.readDays[this.clubClassBookInfo.readDays.length-1].isFinish =='finish'){
							if(finish == 'finish'){
								this.$router.push({name:'qstThroughtResult',query:{id:this.clubClassBookInfo.readingTest.id,not2:'not2'}})
							}else{
								this.$router.push({name:'qstThrought',query:{id:this.clubClassBookInfo.readingTest.id,id1:this.clubClassBookInfo.readingTest.id}})
								}	
					}else{
						bus.$emit('tip','请先完成前面的阅读');
					}
				}else if(!this.isPay_1){
					if(r.type == 'pay'){
						bus.$emit('tip','请先购买')	
					}else{
						if(finish == 'finish'){
								this.$router.push({name:'qstThroughtResult',query:{id:this.clubClassBookInfo.readingTest.id,not2:'not2'}})
							}else{
								this.$router.push({name:'qstThrought',query:{id:this.clubClassBookInfo.readingTest.id,id1:this.clubClassBookInfo.readingTest.id}})
								}	
					}	
				}
			},
			goback(){
				// if(this.$route.query.date == 'date' || this.$route.query.from == 'course'){
					this.$router.go(-1);
				// }else if(this.$route.query.from == 'myCourse'){
				// 	this.$router.push({name:'readIndex',query:{from:'myCourse'}});
				// }else if(this.$route.query.from == 'myCourse1'){
				// 	this.$router.push({name:'myss',query:{from:'myCourse'}});
				// }else{
				// 	this.$router.push({name:'readIndex'});
				// }
			},
			// goReadSum(r,index,type){
			// 	if(this.$parent.showFooter && r.isPay == 'pay'){
			// 		bus.$emit('tip','请先购买')
			// 	}else if(!this.$parent.showFooter || r.isPay=='free'){
			// 		if(r.isFinish == 'begin' && this.clubClassBookInfo.readDays[index-1].isFinish!='finish' && index>0){
			// 			bus.$emit('tip','请先完成前面的阅读')
			// 		}else{
			// 			this.$router.push({name:'readSum',query:{id:r.id}})
			// 		}	
			// 	}
				
			// },
			gototalPreReadVideo(id,type){
				console.log(type);
				console.log(this.$parent.showFooter);
				if(this.isPay_1){
					this.$router.push({name:'totalPreReadVideo',query:{id:id}})
				}else{
					if(type == 'pay'){
						bus.$emit('tip','请先购买')
						}else if(type=='free'){
							this.$router.push({name:'totalPreReadVideo',query:{id:id}})
					}
				}	
			},
			//显示月日
			tipTimeOfMouthAndDate(str){
				if(str.indexOf('-')>0){
					str = str.replace(/-/g, "/");
				}else{
					str = str.replace(/-/g, "/");
				}
				let date  = str.slice(0,10).split('/');
				let one,two;
				if(date[1].charAt(0) == '0'){
					one = date[1].substr(1,date[1].length-1);
				}else{
					one =  date[1];
				}
				if(date[2].charAt(0) == '0'){
					two = date[2].substr(1,date[2].length-1);
				}else{
					two =  date[2];
				}
				return one+'.'+ two;
			},
			//时间字符串转换
			timeStringTransform(str){
				if(str.indexOf('-')>0){
					str = str.replace(/-/g, "/");
				}else{
					str = str.replace(/-/g, "/");
				}
				let date  = str.slice(0,10).split('/');
				return date;
			},
			//获取当前时间
			getNowTime(){
				let date = new Date();
				let Y = date.getFullYear();
			    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
			    let D = date.getDate();
				return [Y,M,D];
			},
			//判断是否到达阅读任务时间
			ifOnTime(nowT,beginT){
				if(nowT[0]>beginT[0]){
					return true;
				}else if(nowT[0] == beginT[0]){
					if(nowT[1] > beginT[1]){
						return true;
					}else if(nowT[1]  ==  beginT[1]){
						if(nowT[2] > beginT[2] || nowT[2] == beginT[2]){
							return true;
						}else{
							return false;
						}
					}else{
						return false;
					}
				}else{
					return false;
				}
			},
			goeveryTimeRead(r,index,type){
				console.log(this.isPay_1);
				console.log(r.beginDate)
				// r.beginDate = '2018-11-1T00:00:00Z';
				console.log('2019-05-06'.replace(/-/g, "/"))
				if(this.ifOnTime(this.getNowTime(),this.timeStringTransform(r.beginDate))){
				if(!this.isPay_1){
					if(r.isPay == 'pay'){
						bus.$emit('tip','请先购买')
					}else if(r.isPay=='free'){
						if(index>0){
						if(r.isFinish == 'begin' && this.clubClassBookInfo.readDays[index-1].isFinish!='finish'){
							bus.$emit('tip','请先完成前面的阅读')	
							}else{
								sessionStorage.setItem('timesId',this.$route.params.id)
								this.$router.push({name:'everyTimeRead',query:{id:r.id,courseId:this.$route.params.id}})
								}
				}else{	
					sessionStorage.setItem('timesId',this.$route.params.id)	
					this.$router.push({name:'everyTimeRead',query:{id:r.id}})
					}
				}
				}else if( this.isPay_1){
					if(index>0){
						if(r.isFinish == 'begin' && this.clubClassBookInfo.readDays[index-1].isFinish!='finish'){
							bus.$emit('tip','请先完成前面的阅读')	
							}else{
								sessionStorage.setItem('timesId',this.$route.params.id)
								this.$router.push({name:'everyTimeRead',query:{id:r.id,courseId:this.$route.params.id}})
								
								}
				}else{	
					sessionStorage.setItem('timesId',this.$route.params.id)	
					this.$router.push({name:'everyTimeRead',query:{id:r.id}})
					}
				}
			}else{
					bus.$emit('tip','还未到时间')
			}
				
			},
			//计算超过一个循环的纵坐标
			canvasTop(i,LastY){
				if(Math.floor(i/6)>0){
					return Math.floor(i/6) * LastY + 20;
				}else{
					return Math.floor(i/6) * LastY;
				}	
			},
			//去最后一个点的坐标
			getLastPointY(arr){
				if(!arr.length){
					return false;
				}else{
					let str = arr[arr.length-1];
					console.log(Number(str.split(',')[1].split(')')[0]) + 40)
					return {
						x:Number(str.split(',')[0].split('(')[1]),
						y:Number(str.split(',')[1].split(')')[0]) + 40
					};
				}
			},
		},
		beforeRouteLeave (to, from, next){
   				this.$parent.$parent._data.isFirst = false;
   		 next()  
		},
		beforeCreate(){
			bus.$emit('loading');
		},
		computed:{		
			maxLength(){
				return this.clubClassBookInfo.readDays.length;
			},
			watchshowfooter(){
				return this.$parent.showFooter;
			},
		},
		watch:{
			data1(news){
				console.log(news);
				if(!news){
						this.ifGuidefree = false;
						this.ifTestfree = false;
					}else{
						this.ifGuidefree = res.data.readingGuide.type == 'free';
						this.ifTestfree =  res.data.readingTest.type == 'free';
					}
			},
			readLength(newValue){
				this.$nextTick(function () {
				console.log(newValue);
				this.len = newValue;
				// newValue =11;
				let a=110;
				let b=60;
				//变量
				let m=0;
				let n=0;
				let X = [];
				let Y = [];
				let LastY = 300;
				let LineMoveTo = [];
	        	let mianBox = this.$refs.mianBox;
	        	let documentW = window.getComputedStyle(document.body).width;
				let mianBoxW = window.getComputedStyle(mianBox).width;
				let canvas = this.$refs.canvas;
				this.ctx =canvas.getContext('2d');	
				console.log(mianBoxW);
				if(mianBoxW.indexOf('px') < 0){
					canvas.width = parseInt(documentW) * parseInt(mianBoxW) / 100;
				}else{
					canvas.width = parseInt(mianBoxW);
				}
				 function CooDin(x,y){
					this.x = x;
					this.y = y;
					
				};
				let this_ = this;
				function moveTo(x,y){
					return `this_.ctx.moveTo(${x},${y})`;
				};
				function lineTo(x,y){
					return `this_.ctx.lineTo(${x},${y})`;
				};
				let x1,x2,x3,x4,x5,x6;
				for(let i = 1;i<newValue+1;i++){
					switch(i % 6){
						case 1:
						 x1 = [new CooDin(a*0,b) ];
						break;
						case 2:
						 x2 = [new CooDin(a*1,b)];
						break;
						case 3:
						 x3 = [new CooDin(a*1,b*2),new CooDin(a*2,b*2)];
						break;
						case 4:
						 x4 = [new CooDin(a*2,b*4),new CooDin(a*1,b*4)];
						case 5:
						 x5 = [new CooDin(a*1,LastY)];
						break;
						case 0:
						 x6 = [new CooDin(a*0,LastY)];
						break;

					}
				}
				for(let i = 0;i<newValue;i++){
					switch(i % 6){
						case 0:
						LineMoveTo.push(lineTo(x1[0].x,x1[0].y + this.canvasTop(i,LastY)));
						break;
						case 1:
						LineMoveTo.push(lineTo(x2[0].x,x2[0].y + this.canvasTop(i,LastY)));
						break;
						case 2:
						LineMoveTo.push(lineTo(x3[0].x,x3[0].y + this.canvasTop(i,LastY)));
						LineMoveTo.push(lineTo(x3[1].x,x3[1].y + this.canvasTop(i,LastY)));
						break;
						case 3:
						LineMoveTo.push(lineTo(x4[0].x,x4[0].y + this.canvasTop(i,LastY)));
						LineMoveTo.push(lineTo(x4[1].x,x4[1].y + this.canvasTop(i,LastY)));
						break;
						case 4:
						LineMoveTo.push(lineTo(x5[0].x,x5[0].y + this.canvasTop(i,LastY)));
						break;
						case 5:
						LineMoveTo.push(lineTo(x6[0].x,x6[0].y + this.canvasTop(i,LastY)));
						break;
					}
					
				}
				console.log(LineMoveTo)
				let mainBoxH = this_.getLastPointY(LineMoveTo).y + 20;
				canvas.height = parseInt(mainBoxH);
				function Line(){
					this_.ctx.lineWidth = 3;
					this_.ctx.strokeStyle="#ddd";
					this_.ctx.beginPath();
					this_.ctx.moveTo(0,0)
					for(let i = 0;i<LineMoveTo.length;i++){
						eval(LineMoveTo[i])
					}
					this_.ctx.lineTo(this_.getLastPointY(LineMoveTo).x,this_.getLastPointY(LineMoveTo).y + 20)
					this_.ctx.stroke();	
					this_.ctx.closePath();
				}
				Line();
				
       			let readLi = this.$refs.readLi;
				for(let i=0;i<readLi.length;i++){
					switch(i % 6){
						case 0:
						readLi[i].style.left =  -25 + 'px';
						readLi[i].style.top =  40+ this.canvasTop(i,LastY)+'px';
						break;
						case 1:
						readLi[i].style.left =  a-35 + 'px';
						readLi[i].style.top =  55+this.canvasTop(i,LastY)+ 'px';
						break;
						case 2:
						readLi[i].style.left =  a*2-45 + 'px';
						readLi[i].style.top =  b*2-25+this.canvasTop(i,LastY)+ 'px';
						break;
						case 3:
						readLi[i].style.left =  a*2-45 + 'px';
						readLi[i].style.top =  b*3+15+this.canvasTop(i,LastY)+ 'px';
						break;
						case 4:
						readLi[i].style.left = a -35 + 'px';
						readLi[i].style.top = b*3+55+this.canvasTop(i,LastY)+ 'px';
						break;
						case 5:
						readLi[i].style.left =  -25 + 'px';
						readLi[i].style.top = b*4+35+this.canvasTop(i,LastY)+ 'px';
						break;
						}
					}
				})				
			},
		},
		created(){
			this.$parent.$parent._data.isFirst = false;
			sessionStorage.setItem('courseIdSign1',this.$route.params.id);
			sessionStorage.setItem('taskFrom',this.$route.query.from);
			this.data1 = this.$parent.showFooter;	
			let wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id = this.$route.params.id;
			let that = this;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingPlanByWxIdAndCourseId/'+id+'/'+wxId)
			.then(res=>{
				console.log(res.data);
				this.isPay_1 = res.data.isPay;
					let picId = res.data.picId + ','+ res.data.contentPic;
		 			this.axios.get(this.ip.filePath+"rest/download/links?ids="+picId)
					.then(function(res1){
						console.log(res1.data)
						res.data.picId = that.ip.filePath1+res1.data[res.data.picId].href;
						res.data.contentPic = that.ip.filePath2+res1.data[res.data.contentPic].href;
						bus.$emit('closeloading');
						if(that.$route.query.from=='history'){
							that.$parent.$parent._data.isFirst = true;
							that.showGoback = false;
						}else{
							that.$parent.$parent._data.isFirst = false;
						}
							that.$parent.showThis = true;		
				})
					this.clubClassBookInfo = res.data;
					this.readLength = res.data.readDays.length;
					if(!this.$parent.showFooter){
						this.ifGuidefree = false;
						this.ifTestfree = false;
					}else{
						this.ifGuidefree = res.data.readingGuide.type == 'free';
						this.ifTestfree =  res.data.readingTest.type == 'free';
					}
					
					this.testFinish  = res.data.readingTest.isFinish=='finish';

			})
			.catch(err=>{
				console.log(err);
				bus.$emit('showErrs');
			})
		},
	}
</script>
<style lang='less' scoped>
	#ImmediateExp{
		width:100%;
		background:#fff;
		flex:1;
		-webkit-flex:1;
		overflow: hidden;
		&>.main1{
			height:100%;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
				&>header{
					height:3.5rem;
					color:#666;
					position: relative;
					line-height:3.5rem;
					text-align: center;
					background: #fff;
					i{
						position: absolute;
						left:1em;
						top:0;
						}
					}
				.mainBox{
					width:100%;
					.studyContent{
					width:100%;
					margin:.2rem 0 0;
					background: #fff;
					&>p{
						width:100%;
						padding:1.2rem 2%;
						margin:.2rem 0;
						border-bottom:.2rem solid #eee;
						color:#555;
						&>i{
							float: right;
						}
						.clicks{
								color:#f60;
							}
						span{
							color:#f60;
						}
					}
					h5{
							color:#f60;
							line-height: 3rem;
							padding-left: 2%;
						}
				}
				.studyPlan{
					margin-top: .2rem;
					height:auto;
					flex:1;
					-webkit-flex:1;
					display: flex;
					flex-direction: column;
					-webkit-display: flex;
					-webkit-flex-direction: column;
					background: #fff;
					position: relative;
				
				}
				.mianBox{
					width:75%;
					margin:0 auto;
					margin-left: 21%;
					position: relative;
					canvas{
					margin:0 auto;
				}
				.totalStudyplane{
					position: absolute;
					left:0px;
					top:3px;
					color: #9e9e9e;
					border-bottom: 1px solid rgba(158, 158, 158, 0.52);
					padding-bottom: 1px;
					font-size: 1.2rem;
					text-indent:1em;
					&>span{
						color: #0a0a0a;
					}
				}
				ul{
					width:100%;
					margin-bottom: 1rem;
					flex:1;
					-webkit-flex:1;
					position: absolute;
					left:0;
					top:0;
					li{
						width:5.5rem;
						height: 5.5rem;
						text-align:center;
						margin-top: 0;
						background:#4bc4c5;
						line-height: 2rem;
						border-radius:10px;
						font-size:1.3rem;
						color:#fff;
						position: absolute;
						left:0;
						top:0;
						box-shadow: 2px 2px 2px #ccc;
						letter-spacing: 1px;
						&>i{
							position:absolute;
							display:inline-block;
							z-index:999;
							height:3rem;
							line-height:3rem;
							top:1.25rem;
							left:1.1rem;
							font-size:3.5rem;
							font-style:normal;
							color:#646b7a;
						}
						.runnings{
							color:#795548;
						}
						.overs{
							 color:#e91e63; 
						}
						&>span{
							display: inline-block;
							position: relative;
							top:.8rem;
						}
						&>b{
							position: relative;
							top:1rem;
							padding:0 1rem;
							font-size: 1.2rem;
							i{
								font-size: 2.2rem;	
							}
						}
						.free{
							position: absolute;
						    right: -4rem;
						    top: -.3rem;
						    height: 3.5rem;
						    width: 3.5rem;
						}
						p{
							position: absolute;
							top:4rem;
							left:0;
							width:100%;
							text-align: center;
							font-size: 1rem;
							transform: scale(.9);
							color: #fff	;
						}
						.arriveTime{
							/*color: #5dca61;*/
						}
					}
					&>.total{
						background:#f60;
						}
					&>.sumUp{
						background:#158a9b;
					}
					&>.begin{
						background: #e6e5e5;
					}
					&>.running{
						background:#409eff;
						border-color: #fff;
					}
					&>.over{
						background: #5dca61;
						border-color: #fff;
					}
				}

				}
				.readTopic,.readTest{
					width:90%;
					margin: 1rem auto 0;
					overflow: hidden;
					display: -webkit-flex;
					display: flex;
					box-shadow: 2px 2px 2px #ccc;
					border:1px solid #eee;
					border-radius: 3px;
					div{
						display: inline-block;
						height:6.5rem;
						overflow: hidden;
						&:first-child{
							width:8rem;
							text-align: center;
							background: #f9aea8;
							line-height: 6rem;
							color:#fff;
							i{
								font-size:5rem;
								line-height: 6.5rem;
							}
						}
						&:last-child{
							margin-left: .7rem;
							flex:1;
							margin:0 1rem;
							p{
								text-align: left;
								color:rgba(158, 158, 158, 0.7803921568627451);
								font-size: 1rem;
								margin-top: .2rem;
								padding-bottom: .2rem;

								&:first-child{
									color:#000;
									font-size: 1.3rem;
									border-bottom:1px dashed #9e9e9e;
									padding-top: 1rem;
								}
							}
						}
					}
				}
				.readTest{
					margin:0 auto 1rem;
					div{
						&:first-child{
							background: #9199d6;
						}
					}
					
				}
			}
		}
	}
	@media screen and (max-width: 360px){

	}
</style>