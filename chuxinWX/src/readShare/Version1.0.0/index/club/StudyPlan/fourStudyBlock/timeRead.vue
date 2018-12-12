<template>
	<section id="timeRead" v-show='showThis' >
		<div class="cancleRecord" v-show='showCancle'>
			<p>今日累计阅读:{{times(toDayTotalTime).hour}}小时{{times(toDayTotalTime).min}}分钟</p>
			<button @click='showCancle=false'>取消</button>
			<button @click='sureEndRecord'>确定</button>
			
		</div>
		<h5><i class="iconfont" @click='goback'>&#xe655;</i>
			<span>《{{timeReadData.bookName}}》</span>
		</h5>
		<div class="video">
			<p v-show='startRead'>
			开始计时</p>
			<p v-show='startRead' class="showcircle">
				<img src='../../../../../../assets/images/timer1.jpg' alt="" class="img"><span>{{showTimes}}</span></p>
			<p v-show='endRead'>阅读时长<span>{{transTime(timenum)}}</span></p>
		
		</div>	
		<div class="totalReadtime" v-show='!startRead'>
			<p>累计阅读</p>
		
			{{times(totalTime).hour}}小时{{times(totalTime).min}}分钟
			
			
		</div>
		<p  @click='overReads' :class="{two:twoState,three:threeState}" class="overRead" v-show='showPlayStatus'> 
			<i class="iconfont" v-show='status.play'>&#xe83e;</i>
			<i class="iconfont" v-show='status.pause'>&#xe669;</i>
		</p>
		<p class="beginTime">{{timeText}}</p>
		<p class="playStatus" v-show='!showPlayStatus'>
			<span @click='end'><i class="iconfont" v-show='status.end'>&#xe6e5;</i><br>结束</span>
			<span @click='goOn'><i class="iconfont" v-show='status.play'>&#xe83e;</i><br>继续</span>	
		</p>
		<p class="readT"><span>阅读时长</span><span>单位：分钟</span></p>
		<div id="chartss" class="wrapperArea">
			<div id="chartss1" ref='charts' style='height:300px'></div>
		</div>
	</section>
</template>

<script>
import {bus} from '../../../../../../bus.js'
import {option2} from '../../../../../../city_data.js'
import BScroll from'better-scroll'
	export default {
		data(){
			return {
					flag:1,
					totalTime:0,
					playTime:0,
					ifplay:true,
					timeReadData:{},
					wxId:'',
					videoSrc:'http://resource.wsreading.com:80/file/20180615/2a9c38ec-b70e-462d-817b-83c9ce22cf72/timer3.mp4',
					timeText:'',
					ifPlay:false,
					showThis:false,
					oneState:false,
					twoState:false,
					threeState:false,
					startTime:'',
					endTime:'',
					nowTime:'',
					overTime:'',
					startRead:false,
					endRead:false,
					timeout:'',
					timenum:0,
					showTimes:'',
					timer1:'',
					flags:true,
					betweenTime:0,
					b:0,
					num:0,
					showCancle:false,
					status:{
						play:true,
						pause:false,
						end:false
					},
					showPlayStatus:true,
					nowDate:'',
					toDayTotalTime:0,
					readHour:0,
					readMin:0,
					ifNotimeLength:false,
					ifNextFinish:false,
					timeData:[],
					myChart:null,
					option:option2,
      
			}
		},
		methods:{
			overReads(){
				if(this.flag ==1){
					this.timenum=0;
					this.startRead = true;
					this.endRead = false;
					this.nowTime = Date.parse(new Date());
					console.log(this.nowTime)
					  let d = new Date(Date.parse(new Date()));
					this.startTime = d.getFullYear()+'/'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'/'+
	           	 	(d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());          
	             	this.timeText = '暂停';
	             	this.flag =2;
	             	this.status.play = false;
	             	this.status.pause = true;
	             	this.setTimeouts();
	             	
				}else if(this.flag ==2){
					this.showPlayStatus = false;
					this.status.play = true;
	             	this.status.end = true;
	             	clearTimeout(this.timer1);
             }
			},
			goOn(){
				this.showPlayStatus =true;
				this.status.play = false;
				this.status.pause = true;
				this.setTimeouts()
			},
			end(){
				let min = Math.round((this.timenum*1000)%3600000/60/1000);
					if(min<3){
						bus.$emit('tip','每次阅读不小于3分钟')
						this.goOn();
					}else{
					console.log(this.timenum);
					this.toDayTotalTime += this.timenum;
					this.showCancle = true;
					}
				
			},
			sureEndRecord(){
				this.showPlayStatus =true;
				this.status.play = true;
				this.status.pause = false;
				this.showCancle = false
					clearTimeout(this.timer1);
	             	this.endRead = true;
	             	this.overTime =  Date.parse(new Date());
	             	 let d = new Date(Date.parse(new Date()));
	             	this.endTime = d.getFullYear()+'/'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'/'+
	           	 	(d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());   
	           	 	this.flag =1; 
	           	 	let postdata = {
						 wxId:this.wxId,
						 timerId:this.$route.query.id1,
						 time:this.timenum,
					};
					console.log(postdata);
					this.axios.post(this.ip.RESTPATH+'rest/postTimerReadingResult',postdata)
					.then(res=>{
							this.getTimeread();
							this.timeText = '开始计时'
							let postdatas = {
								wxId:this.wxId,
								readingId:this.$route.query.id1,
								readingDayId:this.$route.query.id,
								type:'timer',
								isFinish:true,
								compainId:sessionStorage.getItem('companidSign_'),
							};
							console.log(postdatas)
							this.axios.post(this.ip.RESTPATH+'rest/postReadingDayResult',postdatas)
							.then(res=>{
								console.log(res.data);
								bus.$emit('showTipNext');
						})
					})
			},
			setTimeouts(){
				let that = this;
            	 this.timer1 = setTimeout(function(){
             			that.timenum++;
             			let hour = Math.floor((that.timenum*1000)/3600/1000);
						let min = Math.floor((that.timenum*1000)%3600000/60/1000);
						let secs = Math.floor((that.timenum*1000)%3600000%60000/1000);
						that.showTimes= (hour<10?'0'+hour:hour)+':'+(min<10?'0'+min:min)+':'+(secs<10?'0'+secs:secs);
						that.setTimeouts();	
						
             			
             },1000)

			},
			transTime(s){
				let hour = Math.floor(s/3600);
	            let min = Math.floor(s/60) % 60;
	            let sec = Math.floor(s % 60);
	            if(hour==0){
	            	return (min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }else{
	            	return (hour>9?hour:'0'+hour)+':'+(min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }	
			},
			formate(str){
				 if (!str) return '';
	            var date = new Date(str)
	            var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
           
              let d = new Date(str);
              let timeS = d.getFullYear()+'/'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'/'+
           	 (d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());          
             
              return timeS;
            
		},
			times(time){
				let times = time*1000;
				let nowTime = Date.parse(new Date());//当前时间
				let hour = Math.floor(times/3600000);
				let min = Math.floor(times%3600000/60000);
				let secs = Math.floor(times%3600000%60000/1000);
				if(hour==0){
					if(secs>0){
						min++;
					}
					
				}else{
					if(secs>0){
						min++;
					}
					
				}
				return 	{
					hour:hour,
					min:min
				};
			},
			timeDate(str){
				 	 if (!str) return '';
		            var d= new Date(str);
		            let time = (d.getMonth()+1)+'/'+
		            d.getDate();
		              return time;	
		},
			goback(){
				this.$router.go(-1);
				// this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id}})
			},
			Play(){
				if(this.flag){
					this.$refs.audio.play();
					this.flag = false;
					this.ifplay = false;
				}else{
					this.$refs.audio.pause();
					this.flag = true;
					this.ifplay = true;	
				}
				
			},
			reloadAudio(){
				this.$refs.audio.currentTime = 0;
				this.$refs.audio.pause();
				this.ifplay = true;
				this.flag = true;
			},
			endAudio(){
				this.$refs.audio.currentTime = this.$refs.audio.duration;
				this.$refs.audio.pause();
				this.ifplay = true;
			},
			transTime(s){
				let hour = Math.floor(s/3600);
	            let min = Math.floor(s/60) % 60;
	            let sec = Math.floor(s % 60);
	            if(hour==0){
	            	return (min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }else{
	            	return (hour>9?hour:'0'+hour)+':'+(min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }	
			},
			//息屏时间
			visibility(){
					if(document.visibilityState == 'hidden'){
						this.b = Date.now();
					}else{
						let betweenMs = Date.now()-this.b;
						let betweens = Math.floor(betweenMs / 1000);
						this.num = betweens;
						this.timenum+=this.num;
					}
				},
			getNowMouthAndDate(t){
				let nowTime = new Date();
				let m = nowTime.getMonth()+1;
				let d = nowTime.getDate() ;
				let now = m+'/'+d;
				if(t === now){
					return '今天'
				}else{
					return t
				}	
			},
			getNowMouthAndDate1(t){
				let nowTime = new Date();
				let m = nowTime.getMonth()+1;
				let d = nowTime.getDate() ;
				let now = m+'/'+d;
				let thatTime = new Date(t);
				let thatm = thatTime.getMonth()+1;
				let thatd = thatTime.getDate() ;
				let thatnow = thatm+'/'+thatd;
				if(thatnow === now){
					return '今天'
				}else{
					return t
				}	
			},
			getMaxdate(arr){
				let maxArr = [];
				if(arr.length ==0){
					return false;
				}else{
					return Math.max(...arr);
				}
				
			},
			getTimeread(){
				let id1 = this.$route.query.id1;
				this.axios.get(this.ip.RESTPATH+'rest/getReadingDayAndTimeReadingByTimeReadingId/'+id1+'/'+this.wxId)
				.then(res=>{
				console.log(res.data);
				this.timeData = res.data.watchHistory;
				this.$refs.charts.style.width =  this.timeData.length * 45 + 'px';
				
				this.totalTime = 0;
				this.timeData.forEach(v=>{
        			this.totalTime+=v.timeLength;	
        				});
				
				if(this.timeReadData.watchHistory.length == 0){
							this.ifNotimeLength = false;
						}else{
							this.ifNotimeLength = true;
						}
			})
			},
			getCharts(){
				let this_ = this;
				let times = [];
                let dates = [];
                console.log(this.timeData)
                   	 this.timeData.forEach(v=>{
                    	times.push(this_.times(v.timeLength).hour *60+this_.times(v.timeLength).min);
                    	dates.push(this_.timeDate(v.date));        	
                    })
                    this.option.xAxis[0].data = dates;
                    this.option.series[0].data = times;
                    console.log(dates)
                    if( dates.length == 1){
                    	this.$refs.charts.style.width =  this.timeData.length * 55 + 'px';
                    	
                    }else{
                    	
                    	this.$refs.charts.style.width =  this.timeData.length * 45 + 'px';
                    }
                    
   					this.myChart = this.echarts.init($('#chartss1').get(0));

   					console.log(this.option)
                    this.myChart.setOption(this.option);
			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		computed:{
			totalTimes(){
				return (this.overTime-this.nowTime)/1000;
			},
			timeDatas(){
				return this.timeReadData.watchHistory;
			},
		},
		beforeRouteLeave (to, from, next){
		   	clearTimeout(this.timer1);
		   	$(document).get(0).removeEventListener('visibilitychange',this.visibility)
		    next()  
},
		watch:{
			 'timeData':{
			 	deep:true,
                handler:function(newValue,oldValue){
                	this.myChart = this.echarts.init($('#chartss1').get(0));
                	console.log(oldValue)
                	console.log(newValue);
                		console.log(this.option);
                		this.timeData = newValue;
                		this.getCharts();  	
                	let this_ = this;
                	let times = [];
                	let dates = [];
                   	newValue.forEach(v=>{
                    	times.push(this_.times(v.timeLength).hour * 60+this_.times(v.timeLength).min);
                    	dates.push(this_.getNowMouthAndDate(this_.timeDate(v.date)));	
                    })
                	 	this_.myChart.setOption({
                	 	xAxis:[{
                    		data: dates,   
                    	}],
                    	series:[{
				            data: times
				            }],
				        yAxis:[{
				        	max:this_.getMaxdate(times)
				        }]
                	 });
                	 // bus.$emit('scrollArea_1')
                },   
            }
		},
		mounted(){
			bus.$on('scrollArea_1',()=>{
				this.$nextTick(() => {
				let wrapper = document.querySelector('.wrapperArea')
				let scroll = new BScroll(wrapper,{click:true,disableTouch:false})
				})	
			})
		},
		created(){
			this.ifNextFinish = sessionStorage.getItem('FinishWhich').split(',')[2];
			console.log(this.ifNextFinish)
			this.$parent.showThis = false;
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id1 = this.$route.query.id1;
			// this.axios.get('/api/getDate')
			this.axios.get(this.ip.RESTPATH+'rest/getReadingDayAndTimeReadingByTimeReadingId/'+id1+'/'+this.wxId)
			.then(res=>{
				console.log(res.data);
				this.timeReadData = res.data;
				this.timeData = this.timeReadData.watchHistory;
				if(this.timeReadData.watchHistory == 0){
					this.timeData = [{
						date:Date.parse(new Date()),
						timeLength:0
					}];
				}
				console.log(this.$refs.charts)
				
					this.axios.get(this.ip.filePath+"rest/download/links?ids="+this.timeReadData.picId)
        				.then(res2 => {	
	        				this.timeReadData.picId = this.ip.filePath1+res2.data[this.timeReadData.picId]['href'];
	        				bus.$emit('closeloading');
							this.showThis = true;
							this.$parent.showThis = true;
        				});
        				
        					//获取现在时间
						this.nowDate = Date.parse(new Date());
						let dateArr = [];
						if(this.timeReadData.watchHistory.length == 0){
							this.ifNotimeLength = false;
						}else{
							this.ifNotimeLength = true;
						}
        				this.timeReadData.watchHistory.forEach(v=>{
        					this.totalTime+=v.timeLength;
        					if(this.timeDate(v.date) == this.timeDate(this.nowDate)){
        						dateArr.push(v.timeLength)
        					}
        					
        				});
        				if(dateArr.length == 0 && this.timeReadData.watchHistory.length != 0 ){
        					this.timeData.unshift({
								date:Date.parse(new Date()),
								timeLength:0
        					})
        				}
        				dateArr.forEach(v=>{
        					this.toDayTotalTime += v;
        				})
        				this.timeText = '开始计时';
        				this.getCharts();
			});
			let that = this;
			$(function(){
				$('#video1').on('onloadedmetadata',function(){
					that.totalTime = this.duration;
				});
				$(document).get(0).addEventListener('visibilitychange',that.visibility)

			})
			let idArr = JSON.parse(sessionStorage.getItem('idArr'));
			let id = this.$route.query.id;
			bus.$on('goNext',()=>{
				if(this.ifNextFinish == 'finish'){
					sessionStorage.setItem('sign','sign5');
				}else{
					sessionStorage.setItem('sign','sign2');
				}
				this.$router.replace({name:'everyTimeRead',query:{id:this.$route.query.id}})
			})

			
		},
	}
</script>
<style lang='less' scoped>
@-webkit-keyframes time {
	from {
		-webkit-transform: rotate(0deg);
		
	}to{
		-webkit-transform: rotate(360deg);
	
	}
}
@keyframes time {
	from {
		transform: rotate(0deg);
		
	}to{
		transform: rotate(360deg);
		
	}
}

	#timeRead{
		width:100%;
		height:100%;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
		background:#f2f2f2;
		padding-bottom: 3.5rem;
		.cancleRecord{
			position: fixed;
			width:76%;
			left:12%;
			top:30%;
			height:10rem;
			background: #fff;
			border:1px solid #eee;
			margin-bottom: 1rem;
			border-radius:5px;
			z-index:1000;
			&>p{
				line-height: 6rem;
				text-align: center;
				font-size: 1.5rem;
				letter-spacing: 1px;
			}
			&>button{
				width:50%;
				float:left;
				line-height: 4rem;
				background: transparent;
				border-style: none;
				border-right:1px solid #eee;
				border-top: 1px solid #eee;
				color:#555;
			}
		}
		&>.ifCancle{
			position: fixed;
			width:70%;
			left:15%;
			top:20%;
			height:15rem;
			background: red;
		}
		&>h5{
			line-height:3rem;
			position: relative;
			text-align: center;
			font-size: 16px;
			i{
				color:#555;
				position: absolute;
				left:1.5rem;
				top:0;
			}
		}
		&>.audioPlay{
		width:100%;
		padding-bottom: 1rem;
		border-bottom:1px solid #eee;
		div{
		width:100%;
		&:first-child{
			&>div{
				width:4rem;
				height:5rem; 
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
			}
		}
		.totalReadtime{
			text-align: center;
			padding: 1rem 0;
			font-size:2.5rem;
			line-height: 3rem;
			p{
				color:#9e9e9e;
				font-size:1.3rem;
			}

		}
		&>.overRead{
				text-align:center;
				width:5.4rem;
				height:5.4rem;
				line-height:5.4rem;
				margin:.5rem auto 1rem;
				color:#fff;
				border-radius:50%;
				position: relative;
				&>span{
					display: inline-block;
					width:100%;
					position: absolute;
					bottom:-3rem;
					right:0;
					line-height: 3rem;
					color:#333;
				}
				&>i{
					font-size: 5.4rem;
					color:#e91e63;
					display: inline-block;
					width:100%;
					height:5.4rem;
				
			}
		}
		&>.beginTime{
			text-align: center;
			margin:.5rem 0 0;
		}
		&>.playStatus{
			width: 50%;
			height: 6rem;
			margin: .5rem auto 4rem;
			display: flex;
			justify-content: space-around;
			&>span{
				text-align: center;
				i{
					font-size: 5.5rem;
					color:#e91e63;
					display: inline-block;
					width:6rem;
					height:100%;
					line-height: 6rem;
					text-align:center;	
			}
				&:last-child{
					i{
						font-size:5.5rem;
						color:#4caf50;
					}
						
					}
				}
		}

			.two{
				background:#f60;
			}
			.three{
				background: #67c23a;
			}
		.video{
			/*min-height:14rem;*/
			width:80%;
			margin:.5rem auto 0;

			&>p{
				line-height:2rem;
				text-align: center;
				line-height: 2.5rem;
				&>span{
					color:#f60;
					font-size: 1.6rem;
				}
			}
			video{
				width:100%;	
			}
			div{
				width:100%;	
				height:100%;
				line-height: 10rem;
				text-align:center;
				font-size: 1.7rem;

			}
			&>.showcircle{
				width:9rem;
				height:9rem;
				border-radius: 50%;
				margin:0 auto;
				line-height: 9rem;
				border:4px solid #fff;
				text-align: center;
				position: relative;
				overflow: hidden;
				z-index: 999;
				&>i{
					position: absolute;
					text-align: center;
					color:#f60;
					left:0;
					top:0;
					font-size: 4rem;
					display: inline-block;
					width:100%;
					height:100%;
					opacity: .4;
				}
				&>img{
					position: absolute;
					width:100%;
					height:100%;
					display: inline-block;
					border-radius: 50%;
					left:0;
					top:0;
					opacity: .7;
					z-index: -1;
					-webkit-animation: time 6s linear infinite;
					animation: time 6s linear infinite;
				}
				&>span{
					color:#fff;
					font-size: 1.5rem;
					letter-spacing: 2px;
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
		&>.readT{
           		overflow: hidden;
           		margin:1rem 0;
           		span{
           			&:first-child{
           				float:left;
           				padding-left: 2rem;
           				color:#000;
           			}
           			&:last-child{
           				float:right;
           				padding-right: 2rem;
           				color:rgba(158, 158, 158, 0.68);
           			}
           		}
           	}
		#chartss{
			width:90%;
			margin:5rem auto 4rem;
			/*height:400px;*/
			overflow-x: scroll;  
           	overflow-y: hidden; 
           	-webkit-overflow-scrolling:touch;
           	white-space: nowrap;
           	border:1px solid rgba(220, 220, 220, 0.55);
           	padding-bottom: .5rem;
    
           	#chartss1{
           		/*width:100%;*/
           		height:400px;
           	}
		}
		.noTime{
			padding:2rem 0;
			text-align: center;
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