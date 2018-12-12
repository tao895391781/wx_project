<template>
	<section id="achievement" ref="wrapper">
		<div class="container">
		<header>
			<div>
				<img :src="headimg" alt="头像">
			</div>
			<div>
				<p>{{nickname}}</p>
				<p>已坚持阅读{{readDay}}天</p>
			</div>
		</header>
		<div class="achiev_descript">
			<ul>
				<li v-for='(d,index) in descriptData'>
					<p>{{d.descriptText}}</p>
					<p>{{d.data}}</p>	
				</li>
			</ul>
		</div>
		<div class="achiev_club"
		 	v-for='c in clubRankingData'
		 	v-show='!c.result.length==0'
		 @click='gopaihang(c.campingid)'
		 	>
			<h4>
				{{c.name}}
				<i class="iconfont">&#xe664;</i>
			</h4>
			<div v-for='(i,index) in c.result' v-show='index<5'>
				<img :src="i.head_img" alt="头像" >
			</div>
			<div class="mys">
				<img :src="headimg" alt="">
			</div>
			<span>
				第{{c.rank}}名
			</span>
		</div>
		<p>阅读时长<span>单位：分钟</span></p>
		<div class="haveTime" v-show='!noTime'>
			<div class="readTimeBar wrapperArea"  :class="{animation:showReadTimebar}">
				<div is='eCharts1' :option='option'></div>
			</div>
		</div>
		<div class="noHaveTime" v-show='noTime'>
			暂无阅读时长
		</div>
		</div>
	</section>
</template>
<script>
import {bus} from '../../../../bus.js'
import eCharts1 from '../../../../components/echarts.vue'
import {option3} from '../../../../city_data.js'
import BScroll from'better-scroll'
	export default {
		data(){
			return {
				nickname:'',
				headimg:'',
				wxId:'',
				showReadTimebar:false,
				readDay:0,
				timeReading:[],
				noTime:false,
				descriptData:[
				{
					descriptText:'参加营课数',
					data:'1次',
				},{
					descriptText:'完成书本数',
					data:'0本',
				},{
					descriptText:'总阅读时长',
					data:'6小时25分',
				},{
					descriptText:'总答题数量',
					data:'296题',
				},{
					descriptText:'答题正确率',
					data:'86%',
				},{
					descriptText:'阅读分享数',
					data:'6次'
				}
			],
				option:option3,
				clubRankingData:[
				],
			}
		},
		methods:{
			initScroll(){
				let scroll = new this.BScroll(this.$refs.wrapper,{click:true,disableTouch:false,eventPassthrough:'horizontal'});
			},
			gopaihang(companid){
				sessionStorage.setItem('companidSign_',companid);
				this.$router.push({name:'paihang',query:{id:companid}})
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
		transTime(date){
				let dates = date.split('/');
				let D = [dates[0],dates[1]];
				let m=0,d=0;
				if(dates[0]>9){
					m = dates[0];
				}else{
					m = dates[0].split('0')[1]
				}
				if(dates[1]>9){
					d = dates[1];
				}else{
					d = dates[1].split('0')[1]
				}
				let newDate = m+'.'+d;
				return newDate;

			},
		getMaxdate(arr){
				let maxArr = [];
				if(arr.length ==0){
					return false;
				}else{
					return Math.max(...arr);
				}
				
			},
		},
		created(){
			console.log(option3)
			let this_ = this;
			this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
			this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			// this.axios.get('/api/getMyAchiev')
			this.axios.get(this.ip.RESTPATH+'rest/getMyAchievementsByWxId/'+this.wxId)
			.then(res=>{
				console.log(res.data);
				this.readDay = res.data.readingDay;
				this.clubRankingData = res.data.camping;
				this.descriptData[0].data = res.data.campingNum;
				this.descriptData[1].data = res.data.booknum;
				this.descriptData[2].data = this.times(res.data.readingTime).hour+'小时'+ this.times(res.data.readingTime).min+'分钟';
				this.descriptData[3].data = res.data.question;
				this.descriptData[4].data = res.data.question==0?0:(Number(res.data.correct) / Number(res.data.question)* 100).toFixed(1)+'%';
				this.descriptData[5].data = res.data.shareScore;
				if( res.data.timeReading.length == 0){
						this.noTime = true;
						this.showReadTimebar = true;
				}else{
					this.showReadTimebar = true;
					this.noTime = false;
	       			let times = [];
	                let dates = [];
	                   	 res.data.timeReading.forEach(v=>{
	                    	times.push(this_.times(v.time).hour *60+this_.times(v.time).min);
	                    	dates.push(this_.transTime(v.date));        	
	                    })
	                    this.option.xAxis[0].data = dates;
	                    this.option.series[0].data = times;
	                	this.option.xAxis[0].data = dates;
	               		this.option.series[0].data = times;	 
	               		this.option.yAxis[0].max  = this.getMaxdate(times) 
               	} 
               	console.log(this.showReadTimebar)   
       				 this.$nextTick(() => {
              			 	this.initScroll();
           	 	});

			})
		},
		mounted(){
			bus.$on('showbar',()=>{
				this.showReadTimebar= true;
			});

		},
		components:{
			eCharts1
		},
	}
</script>
<style lang="less">
	#achievement{
		width:100%;
		height:100%;
		overflow: hidden;
		.container{

		header{
			display:-webkit-flex;
			display:flex;
			width:90%;
			margin:1.5rem auto;
			div{	
				&:first-child{
					width:4.5rem;
					height:4.5rem;
					margin-left: 2rem;
					img{
						max-width:100%;
						border-radius: 50%;
					}
				}
				&:last-child{
					flex:1;
					p{
						text-indent:1em;
						line-height: 2.2rem;
						color:#9e9e9e;
						font-size:1.3rem;
						&:first-child{
							color: #0a0a0a;
							font-size:1.9rem;
						}
					}
				}
			}

		}
		.achiev_descript{
			width:90%;
			margin:0 auto;
			padding:.5rem 0;
			background: rgba(242, 242, 242, 0.49);
			ul{
				width:100%;
				height:10rem;
				display:-webkit-flex;
				display:flex;
				justify-content:space-around;
				flex-wrap:wrap;
				margin-bottom: 1rem;
				li{
					width: 33.3%;
					height: 5rem;
					margin-top:0;
					&:nth-child(4),	&:nth-child(5),	&:nth-child(6){
						margin-top: .5rem;
					}
					p{
						text-align: center;
						line-height: 2.2rem;
						color: #333;
						font-size: 1.4rem;
						&:first-child{
							color:#9e9e9e;
							font-size: 1.3rem;
						}
					}
				}
			}
		}
	.achiev_club{
			width:90%;
			margin:0 auto;
			border:1px solid #eee;
			padding:1rem 1rem;
			margin-top: 1rem;
			border-radius:5px;
			box-shadow:2px 2px 3px #ccc;
		h4{
			padding-bottom:1.5rem;
			font-size:1.5rem;	
			i{
				float: right;
			}
		}
		div{
			width:2.8rem;
			height:2.8rem;
			display:inline-block;
			margin:0 .3rem;
			img{
				max-width: 100%;
				border-radius:50%;
			}
		}
		.mys{
			border-left: 1px solid #9e9e9e;
			padding-left:1rem;
			margin-left: 1rem;
			width:3.8rem;
			img{
				width:2.8rem;
				height:2.8rem;
				border-radius:50%;
			}
		}
		span{
			position:relative;
			top:.5rem;

		}
	}
	&>p{
			line-height:40px;
			width:80%;
			margin:0 auto;
			padding-top:10px;
			span{
				float: right;
				font-size: 1.2rem;
				color: rgba(158, 158, 158, 0.68);
			}
		}
	.haveTime{
	
	.readTimeBar{
		width:90%;
		margin: 0 auto 2rem;
		height:300px;
		border:1px solid #eee;
		overflow-x: scroll;  
        overflow-y: hidden; 
        -webkit-overflow-scrolling:touch;
        white-space: nowrap;
	}
	.animation{
		-webkit-animation:bar 1s ease forwards;
		animation:bar 1s ease forwards;
	}
	.readTimeBar1{
		width:300px;
		height:300px;
	}
	.readTimeBar2{
		width:300px;
		height:100px;
	}
}
.noHaveTime{
	padding:3rem 0;
	text-align:center;
}
	@media screen and (max-width: 360px){
		html{
			font-size:10px;
		}
    		 .achiev_club{
    				div{
    					width:2rem;
    					height:2rem;
    					display:inline-block;
    					margin:0 .3rem;
    					img{
    						max-width: 100%;
    						border-radius:50%;
    					}
    				}
    				.mys{	
						width:3rem;
			img{
				width:2rem;
				height:2rem;
				border-radius:50%;
			}
		}
    			} 		
}
}
}
	
	@keyframes bar{
		from{
			-webkit-transform:translateY(50%);
			transform:translateY(50%);
		}
		to{
			-webkit-transform:translateY(0);
			transform:translateY(0);
		}
	}
</style>
