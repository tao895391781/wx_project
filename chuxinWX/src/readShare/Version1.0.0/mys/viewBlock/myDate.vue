<template>
	<section id="myDate" v-show = 'showThis'>
		<div class="isHaveDate" v-show='!isHaveDate'>
			<header>
			<p>
				<span>Day {{overReadLength}}</span>
				<span>点击日期进入阅读</span>
			</p>
			<p @click='showOption'>
				<span>{{campingName}}</span>
				<i class="iconfont" v-show='!showOtherTopic &amp;&amp;!isHaveDate'>&#xe614;</i>
				<i class="iconfont" v-show='showOtherTopic &amp;&amp; !isHaveDate'>&#xe664;</i>
				<ul v-show='showOtherTopic'>
					<li v-for='d in filterData' @click='trueSelect(d)'>{{d.campingName}}</li>
				</ul>

			</p>
			<ul>
				<li>
					<span><i class="iconfont">&#xe7ad;</i></span>&nbsp;&nbsp;已完成阅读
				</li>
				<li>
					<span></span>&nbsp;&nbsp;未阅读
				</li>
				<li v-show='false'>阅读历史记录</li>
			</ul>
		</header>
		<div class="datess">
			<Dates :datess='datess' :hadreadDate='hadreadDate' :taskId='taskId'></Dates>
		</div>
		<div class="myReadPlane">
			<p>阅读计划<span>点击书本跳转到对应阅读日期</span></p>
			<ul>
				<li v-for='(i,index) in initData' @click='goPlaneDate(getYear,i.beginDate,i.finishDate,i.dateList,index,i.id)' :class='{selectBookL:ind == index}'>
					<img :src="i.picId" alt="" >	
					<p>{{i.beginDate}}-{{i.finishDate}}</p>
				</li>
			</ul>
		</div>
		
			
		</div>
		<div class="isHaveDate" v-show='isHaveDate'>
			<p class="noBook">暂无阅读日历<br>（您需要购买课程才有阅读日历哦）</p>
			
		</div>
		
	</section>
</template>
<script>
import Dates from '../../../../components/date.vue'
import {bus} from '../../../../bus.js'
	export default{
		data(){
			return {
				showThis:false,
				weeks:['日','一','二','三','四','五','六'],
				getYear:'',
				getMonth:'',
				getDay:'',
				h:0,
				datess:{from:'100',to:'100'},
				dateData:[],
				showOtherTopic:false,
				statusArr:[],
				filterData:[],
				campingName:'',
				flag:true,
				initData:[],
				hadreadDate:[],
				ind:0,
				firstData:{},
				taskId:0,
				overReadLength:0,
			}
		},
		components:{
			Dates
		},
		computed:{
			isHaveDate(){
				return this.dateData.length==0?true:false;
			},
		},
		methods:{
			showOption(){
				if(this.flag){
					this.showOtherTopic = true;
					this.flag = false
				}else{
					this.showOtherTopic = false;
					this.flag = true;
				}	
			},
			trueSelect(d){
				console.log(d);
				sessionStorage.setItem('selectList',JSON.stringify(d));
				this.filterData = [];
				this.statusArr.forEach(v=>{
						if(v.campingName != d.campingName){
							this.filterData.push(v)
						}
					})
				sessionStorage.setItem('campingName',d.campingName)
				this.campingName = d.campingName;
				this.campingName = d.campingName;
				this.firstData = d;
				this.showOtherTopic = false;
				this.initData = d.courseList;
				//切换主题显示对应的日期
				let beginD  = d.courseList[0].beginDate;
				let finishD = d.courseList[0].finishDate;
				let dateL = d.courseList[0].dateList;
				let id =  d.courseList[0].id;
				this.goPlaneDate(this.getYear,beginD,finishD,dateL,0,id);	
			},
			//跳转到相应日期
			goPlaneDate(_year,_month,_day,_dateList,index,id){
				console.log(index)
				this.datess = {};
				// this.hadreadDate =[];
				this.ind= index;
				sessionStorage.setItem('selectIndex',index);
				let _months = _month.toString().split('.')[0];
				let _days   = _month.toString().split('.')[1];
				// console.log(_months);
				let sixCol = [];//等于六行的月份
				for(let i=1;i<13;i++){
					 if(this.getFirstDay(_year,i)==6){
					 		sixCol.push(i);
					 }
				}
				let thanArr = [];//超过选定的月份
				for(let i = 0;i<sixCol.length;i++){
						if(_months>sixCol[i]){
							thanArr.push(sixCol[i]);
						}
				}
				if(thanArr.length==0){
					this.h = $('.dateUl').height()*(_months-1);
				}else{
					let thanH = $('.dateUl')[thanArr[0]-1].clientHeight;
					this.h = $('.dateUl').height() * (_months-1-thanArr.length) + thanH * thanArr.length;
				}
				let liH = $('.dateUl').find('li').height();
				let pH  = $('.dateUl').find('p').height();
				this.h += liH * (Math.floor(_days / 7) -1) + pH;
				let that = this;
				 $('.mainDate').animate({
				    scrollTop:that.h
				  }, 500);//500ms滑动到指定位置
				 this.datess = {from:_month.toString(),to:_day.toString()}
				 this.hadreadDate = _dateList;
				 this.taskId = id;
				 console.log(this.taskId)
				 this.overReadLength = _dateList.length;
				 console.log(this.hadreadDate)
			},
			//判断闰年
			runNian(_year){
				if(_year%400 ==0 || (_year%4 == 0 && _year%100!==0)){
					return true;
				}else{
					return false;
				}
			},
			//获取现在的日期
			getNowDate(){
				let nowDate  = new Date();
				this.getYear  = nowDate.getFullYear();
				this.getMonth = nowDate.getMonth()+1;
				this.getDay   = nowDate.getDate();
				console.log(this.getYear+'/'+this.getMonth+'/'+this.getDay);

			},
			//转换时间格式
			transTime(date){
				let dates = date.split('-');
				// console.log(dates)
				let D = [dates[1],dates[2]];
				let m=0,d=0;
				if(dates[1]>9){
					m = dates[1];
				}else{
					m = dates[1].split('0')[1]
				}
				if(dates[2]>9){
					d = dates[2];
				}else{
					d = dates[2].split('0')[1]
				}
				let newDate = m+'.'+d;
				return newDate;

			},
			//判断每年每月的一号是星期几
			getFirstDay(_year,_month){
				let allDay = 0,Y = _year.toString().slice(2);
				allDay = (Y-1) + Math.floor((Y-1)/4) - Math.floor((Y-1)/100) + Math.floor((Y-1)/400) + 1;
				for ( let i =1; i<_month; i++) {
			        switch (i) {
			            case 1: allDay += 31; break;
			            case 2: 
			                if(this.runNian(_year)) { allDay += 29; }
			                else { allDay += 28; }
			                break;
			            case 3: allDay += 31; break;
			            case 4: allDay += 30; break;
			            case 5: allDay += 31; break;
			            case 6: allDay += 30; break;
			            case 7: allDay += 31; break;
			            case 8: allDay += 31; break;
			            case 9: allDay += 30; break;
			            case 10: allDay += 31; break;
			            case 11: allDay += 30; break;
			            case 12: allDay += 31; break;
			        }
			    }
			    return allDay%7;
			},
			getDateTask(){
				let that = this;
				this.axios.get(this.ip.RESTPATH+'/rest/getStudingDateTaskByWXId/'+this.wxId)
				.then(res=>{
					this.showThis = true;
					bus.$emit('closeloading')
					console.log(res.data);
					this.dateData = res.data;
					if(res.data.length==0){
					
					}else{
					this.dateData.forEach(v=>{
					if(v.status == 'running'){
						this.statusArr.unshift(v);
					}else{
						this.statusArr.push(v)
					}
				});
				if(sessionStorage.getItem('campingName')){
					this.campingName = sessionStorage.getItem('campingName')
				}else{
					this.campingName = this.statusArr[0].campingName;
				}
					this.statusArr.forEach(v=>{
						if(v.campingName != this.campingName){
							this.filterData.push(v)
						}
					})
						this.getSingTopicData(this.dateData);
					}
				})
			},
			//获取每本书的图片和转换时间格式
			getSingTopicData(data){
					console.log(data)
					let that = this;
					let PicId = [];
					 data.forEach(v=>{
		 				v.courseList.forEach(vs=>{
		 					PicId.push(vs.picId)
		 				})	
		 			});
					this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
					.then(function(res1){
						data.forEach(v=>{
		 				v.courseList.forEach(vs=>{
		 					PicId.push(vs.picId);
		 					vs.picId = that.ip.filePath1+res1.data[vs.picId].href;
		 					vs.beginDate = that.transTime(vs.beginDate)
							vs.finishDate = that.transTime(vs.finishDate)
		 				})	
		 			});
					//初始化默认点击第一个
					if(sessionStorage.getItem('selectList')){
						console.log('记录')
						let inde = 0;
						let selectList=JSON.parse(sessionStorage.getItem('selectList'));
						that.initData = selectList.courseList;
						console.log(selectList)
						if(sessionStorage.getItem('selectIndex')){
							inde = parseInt(sessionStorage.getItem('selectIndex'));
							console.log(inde)
						}
						let beginD  = selectList.courseList[inde].beginDate;
						let finishD = selectList.courseList[inde].finishDate;
						let dateL = selectList.courseList[inde].dateList;
						let id =  selectList.courseList[inde].id;
						that.goPlaneDate(that.getYear,beginD,finishD,dateL,inde,id);
					}else{
						console.log('不记录')
						that.initData = that.statusArr[0].courseList;
						let beginD  = that.statusArr[0].courseList[0].beginDate;
						let finishD = that.statusArr[0].courseList[0].finishDate;
						let dateL = that.statusArr[0].courseList[0].dateList;
						let id =  that.statusArr[0].courseList[0].id;
						that.goPlaneDate(that.getYear,beginD,finishD,dateL,0,id);
					}
				});

			},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.$parent.isFirst = false;
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.getNowDate();
			this.getDateTask();
			sessionStorage.getItem('selectIndex')?'':sessionStorage.setItem('selectIndex','');
			sessionStorage.getItem('selectList')?'':sessionStorage.setItem('selectList','');
			sessionStorage.getItem('campingName')?'':sessionStorage.setItem('campingName','')
		},
	}
</script>
<style lang="less" scoped>
	#myDate{
		width:100%;
		flex:1;
		overflow: scroll;
		.isHaveDate{
		width:100%;
		height:100%;
		&>.noBook{
			padding:4rem 0;
			text-align:center;
		}
		header{
			
			padding-bottom:.5rem;
			h5{
				text-indent:1em;
				padding:.5rem 0;
			}
			p{	
				text-indent:1em;
				
				&:nth-child(1){
					overflow:hidden;
					span{
						display:inline-block;
						width:60%;
						float: left;
						padding:1rem 0;
						font-size:1.5rem;
						&:first-child{
							width:22%;
							
						}
						&:nth-child(2){
							font-size:1.5rem;
							color:#e91e63;
						}
					}
				}
				&:nth-child(2){
					color: #72afa6;
					height: 2.5rem;
					line-height: 2.5rem;
					width: 70%;
					font-size: 1.5rem;
					position:relative;
					&>span{
						display: inline-block;
						width: 80%;
						text-indent: 0;
						white-space: nowrap;
						overflow:hidden;
						text-overflow: ellipsis;
					}
			
					&>i{
						line-height: 2.5rem;
						display: inline-block;
						white-space: nowrap;
						overflow:hidden;
						text-overflow: ellipsis;
					}
					&>ul{
						position:absolute;
						width:100%;
						height:auto;
						left:0;
						top:2.5rem;
						z-index:1005;
						background:#7db7ad;
						color:#fff;
						margin-left: 1.5em;;
						border-radius:3px;
						animation: showOptionli .3s forwards;
						-webkit-animation: showOptionli .3s forwards;
						li{
							margin-top:.2rem;
							width:100%;
							height:3rem;
							line-height:3rem;
							text-indent:.5em;
							white-space: nowrap;
							overflow:hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
			&>ul{
				overflow:hidden;
				li{
					float: left;
					margin-top: 0;
					width:35%;
					height:2.8rem;
					line-height:2.8rem;
					overflow:hidden;
					padding-left:1.6rem;
					span{
						display:inline-block;
						width:1.8rem;
						height:1.8rem;
						border-radius:50%;
						background:#9e9e9e;
						position:relative;
						top:.5rem;
						i{
							line-height:1.8rem;
							position:absolute;
							color:#fff;
							text-align:center;
							width:100%;
							font-size:1.4rem;
						}

					}
					&:first-child{
						span{
						background:#8bc34a;
						}
					}
					&:nth-child(2){
						width:30%;
					}
					&:last-child{
						width:30%;
					}

				}
			}
		}
		&>.datess{
			height:50%;
			background:rgba(238, 238, 238, 0.47);
			/* display:flex;
			flex-direction:column; */
			&>ul{
				border-bottom:1px solid #ddd;
				overflow:hidden;
				padding:.5rem 0;
				li{
					float: left;
					margin-top: 0;
					width:14%;
					text-align:center;
				}
			}
		.mainDate{
			width:100%;
			flex:1;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			&>ul{
				overflow:hidden;
				&>p{
					text-align: right;
					height:4rem;
					line-height:4rem;
					padding-right:2rem;
					font-size:1.6rem;
				}
				li{
					float: left;
					margin-top: 0;
					width:14%;
					text-align:center;
					height:3.5rem;
					line-height:3.5rem;
					&>span{
						display:inline-block;
						width:3rem;
						height:3rem;
						border-radius:50%;
						/* border:2px solid #009688; */
						position:relative;
						top:.25rem;
						line-height:3rem;
					}

				}
			}
		}


		}
		.myReadPlane{
			&>p{
				color:#111;
				font-size:1.7rem;
				padding:1rem 0;
				text-indent:1em;
				span{
					float: right;
					color:#9e9e9e;
					padding-right:1em;
					font-size:1.5rem;
				}
			}
			ul{
				
				width:100%;
				overflow-x: scroll;  
           	 	overflow-y: scroll; 
           		-webkit-overflow-scrolling:touch;
           		white-space: nowrap;
				li{
					width:7rem;
					display:inline-block;
					margin-top: 0;
					text-align:center;
					margin:1rem;
					position:relative;
					-webkit-transition:transform .5s;
					transition:transform .5s;
					&>img{
						width:100%;
						height:7rem;
						opacity:.9;
						border-radius: 3px;
					}
					p{
						line-height:2rem;
						margin-top: .5rem;
					}
				}
				.selectBookL{
					transform:scale(1.15);
					-webkit-transform:scale(1.15);
					opacity:1;
					}
				}
			}
		}
	}
	@keyframes showOptionli{
		from{
			opacity:0;
		}to{
			opacity:1
		}
	}
</style>