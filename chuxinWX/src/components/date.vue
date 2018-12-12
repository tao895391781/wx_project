<template>
	<section id="date">
		<div class="dates">
			<ul>
				<li v-for='w in weeks'>{{w}}</li>	
			</ul>
			<div class="mainDate">
				<ul v-for='m in 12' class='dateUl'>
					<p>{{getYear}}年{{m>9?m:('0'+m)}}月</p>
					<li v-for='nulls in getFirstDay(getYear,m)'>{{''}}</li>
					<li v-for='d in getMonthsDays(getYear,m)' >
						<span 
						:class="{sDate:isBlock(m,d,'block').flag,isDateover:isBlock(m,d,'blocks').flag,isNotDateover:isBlock(m,d,'blocks').flags}" @click='goTaskpage(m,d,taskId)' >
						{{d>9?d:('0'+d)}}
						<!-- <i class="iconfont" v-show="isBlock(m,d,'blocks').flag">&#xe7ad;</i> -->
						</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return {
				weeks:['日','一','二','三','四','五','六'],
				getYear:'',
				getMonth:'',
				getDay:'',
				readPlaneDate:[{from:10.28,to:11.5},{from:9.1,to:10.1}],
				isBlocks:false,


			}
		},
		props:['datess','hadreadDate','taskId'],
		watch:{
			'hadreadDate':{
				deep:true,
				handler:function(newV,oldV){
					console.log(newV)
				},
			},
		},
		methods:{
			//去任务页面
			goTaskpage(m,d,id){
				if(this.datess.from.split('.')[0]  == this.datess.to.split('.')[0]){
					if((m == this.datess.from.split('.')[0] && m == this.datess.to.split('.')[0] && d>=this.datess.from.split('.')[1] && d<=this.datess.to.split('.')[1])){
						this.$router.push({name:'ImmediateExp',params:{id:id},query:{date:'date'}});
					}
				}else{
							if((m>this.datess.from.split('.')[0] && this.datess.to.split('.')[0]>m) || (m==this.datess.from.split('.')[0]?d>=this.datess.from.split('.')[1]:'') || (m == this.datess.to.split('.')[0]?this.datess.to.split('.')[1]>=d:'')){
								this.$router.push({name:'ImmediateExp',params:{id:id},query:{date:'date'}});
							}
						}	
			},
			//判断日期区间&&判断当天任务是否已完成
			isBlock(m,d,style){
				let status = {flag:false,flags:false};
				if(this.datess.from.split('.')[0]  == this.datess.to.split('.')[0]){
					if((m == this.datess.from.split('.')[0] && m == this.datess.to.split('.')[0] && d>=this.datess.from.split('.')[1] && d<=this.datess.to.split('.')[1])){
						if(style=='block'){
								status.flag = true;
							}else{
								if(this.hadreadDate.length==0){
									// console.log('没有完成时间');
									status.flag = false;
									status.flags = true;
								}else{
								this.hadreadDate.forEach((v,index,arr)=>{
									if(this.transTime(v.date).split('.')[1]==d && this.transTime(v.date).split('.')[0]==m){
										status.flag = true;
									}
									if((this.transTime(arr[arr.length-1].date).split('.')[1]<d && this.transTime(v.date).split('.')[0] == m) || m>this.transTime(arr[arr.length-1].date).split('.')[0]){
										status.flags = true;
										}
									})
								}
							}
						}
						}else{
							if((m>this.datess.from.split('.')[0] && this.datess.to.split('.')[0]>m) || (m==this.datess.from.split('.')[0]?d>=this.datess.from.split('.')[1]:'') || (m == this.datess.to.split('.')[0]?this.datess.to.split('.')[1]>=d:'')){
								if(style=='block'){
										status.flag = true;
									}else{
										if(this.hadreadDate.length==0){
											status.flag = false;
											status.flags = true;
										}else{
											this.hadreadDate.forEach((v,index,arr)=>{
											if(this.transTime(v.date).split('.')[1]==d && this.transTime(v.date).split('.')[0]==m){
												status.flag = true;
											}
											if(this.transTime(arr[arr.length-1].date).split('.')[1]<d && this.transTime(v.date).split('.')[0] == m || this.transTime(arr[arr.length-1].date).split('.')[0]<m){
												status.flags = true;
												}
											})
										}
									}
								}
							}
				return status;
			},
			//转换时间
			transTime(t){
				let time = new Date(t);
				let day = time.getDate();
				let month = time.getMonth()+1;
				// console.log(month+'.'+day)
				return month+'.'+day;
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

			getMonthsDays(_year,_month,_day,firstDay){
				let monthDay = 0;
				switch(_month){
					case 1:monthDay = 31;break;
					case 2:this.runNian(_year)?monthDay=29:monthDay=28;break;
					case 3: monthDay = 31; break;
			        case 4: monthDay = 30; break;
			        case 5: monthDay = 31; break;
			        case 6: monthDay = 30; break;
			        case 7: monthDay = 31; break;
			        case 8: monthDay = 31; break;
			        case 9: monthDay = 30; break;
			        case 10: monthDay = 31; break;
			        case 11: monthDay = 30; break;
			        case 12: monthDay = 31; break;
				}
				return monthDay;

			},
		},
		created(){
			this.getNowDate();
			this.getFirstDay(this.getYear,this.getMonth);


		},
	}
</script>
<style lang="less">
	#date{
		width:100%;
		height:100%;
		&>.dates{
			height:100%;
			background:rgba(158, 158, 158, 0);
			display:flex;
			flex-direction:column;
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
					height:3.6rem;
					line-height:3.5rem;
					margin-bottom: .3rem;
					&>span{
						display:inline-block;
						width:3.3rem;
						height:3.3rem;
						border-radius:50%;
						position:relative;
						top:.1rem;
						line-height:3.3rem;
						}
						.sDate{
						border:1px solid #fff;
						background:#d85c53;
						color:#fff;
					}
					.isDateover{
						background:#8bc34a;
						color:#fff;
						border:1px solid #fff;
					}
					.isNotDateover{
						background:#9e9e9e;
						color:#fff;
					}
					}
				}
			}
		}
	}
</style>