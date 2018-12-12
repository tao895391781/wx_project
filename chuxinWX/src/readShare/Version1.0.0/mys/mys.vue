<template>
	<section id="myss">
		<div class="personInfor">
			<div>
				<img :src='headimg' alt="loading">
			</div>	
			<div>
				<p>{{nickname}}
				</p>
				<p @click='showBlock("editInfo")'> 查看&amp;编辑个人资料<i class="iconfont">&#xe664;</i></p>
			</div>
		</div>
		
   		<nav>
   			<div @click='showBlock("myCourse")'><i class="iconfont">&#xe63b;</i>&nbsp;我的课程</div>
   			<div @click='showBlock("mySocre")'><i class="iconfont">&#xe649;</i>&nbsp;我的积分</div>
   		</nav>
   		<ul class="myReadcontent">
   			<li @click='showBlock("myDate")'>
   				<div>
   					<p><i class="iconfont">&#xe640;</i>&nbsp;&nbsp;我的阅读日历</p>
   					<p>正在学习的课程</p>
   				</div>
   				<div><i class="iconfont">&#xe775;</i></div>
   			</li>
   			<li class="clickMe">
   				<div>
   					<p><i class="iconfont">&#xe713;</i>&nbsp;&nbsp;阅读提醒设置</p>
   					<p>{{hour}}:{{min}}</p>
   				</div>
   				<div><i class="iconfont">&#xe775;</i></div>
   			</li>
   			<li @click='showBlock("myTeacher")'>
   				<div>
   					<p><i class="iconfont">&#xe637;</i>&nbsp;&nbsp;我的老师</p>
   					<p>查看老师微信联系方式</p>
   				</div>
   				<div><i class="iconfont">&#xe775;</i></div>
   			</li>
   			<li @click='showBlock("commonQst")'>
   				<div>
   					<p><i class="iconfont">&#xe7a6;</i>&nbsp;&nbsp;常见问题</p>
   					<p>使用方法、阅读打卡</p>
   				</div>
   				<div><i class="iconfont">&#xe775;</i></div>
   			</li>
   		</ul>
	</section>
</template>
<script>
import {bus} from '../../../bus.js'
import Picker from 'better-picker'
		export default{
		
				data(){
					return {
						hour:'00',
						min:'00',
						num:0,
						bigBooklist:[],
						singleBooklist:[],
						index:0,
						totalStage:[],
						nickname:'机器人？',
						headimg:'11',
						wxId:'',
						score:{},
						showMyCourse:false,
						myCourse:[],
						data1:[],
       					data2:[{text:'00',value:'00'},{text:'30',value:'30'}],
       					date:[],
					}
				},
				methods:{
					showBlock(name){
						this.$router.push({name:name})		
					},
					getScore(){
						this.axios.get(this.ip.RESTPATH+'rest/getReadScoreByWXId/'+this.wxId)
						.then(res=>{
							console.log(res.data);
							this.score = res.data;
								
							})
					},
					handleChange(value) {
				        console.log(value);
				        this.hour = value[0];
				        this.min = value[1];
				        let postdata ={
				        	wxId:this.wxId,
				        	date:this.hour+':'+this.min,
				        	status:'Begin'
				        }
				        console.log(postdata);
				        this.axios.post(this.ip.RESTPATH+'rest/postStudingTimeTask',postdata)
				        .then(res=>{
				        	console.log(res);
				        	if(res.data.flag == 2){
				        		this.showSucc = true;
				        		setTimeout(function(){
				        			this.showSucc = false;
				        		}.bind(this),1500)
				        		
				        	}
				        })
				      },
				},
				components:{
					Picker
				},
				created(){
					console.log($http)
					this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
					this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
					this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
					//获取定时时间
					console.log(this.ip.RESTPATH+'rest/getTimeTaskByWXId/'+this.wxId)
					this.axios.get(this.ip.RESTPATH+'rest/getTimeTaskByWXId/'+this.wxId)
					.then(res=>{
						console.log(res.data);
						this.date = res.data.date.split(':');
						console.log(this.date);
						this.hour = this.date[0];
						this.min = this.date[1];

					})
					.catch(err=>{
						console.log(err)
						bus.$emit('showErrs')
					})
					for(let i = 1;i<25;i++){
      					 	const obj = {
						          value:(i-1)>9?(i-1):'0'+(i-1),
						          text: (i-1)>9?(i-1):'0'+(i-1),
      							 };
      							 this.data1.push(obj);
      					 }
					this.$parent.isFirst = true;
					let that = this;
					this.getScore();
		      		$(function(){
						$('body').css({'height':$(window).height()});
							var picker = new Picker({
								data: [that.data1, that.data2],
								selectedIndex: [0, 1],
								title: '设置时间提醒'
							});
							// picker.show();
							var nameEl = $('.clickMe');
							picker.on('picker.select', function (selectedVal, selectedIndex) {
								that.hour  = that.data1[selectedIndex[0]].text;
								that.min =  that.data2[selectedIndex[1]].text;
								that.ageValue = that.data1[selectedIndex[0]].value;
								that.gradeValue = that.data2[selectedIndex[1]].value;
								});
								nameEl.on('click', function () {
								picker.show();
							});	
							picker.on('picker.valuechange', function (selectedVal, selectedIndex){
								console.log(selectedVal);
								that.handleChange(selectedVal)
					});	
					})
				},
  			}
</script>
<style lang='less'>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all 0s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  /*transform: translateX(10px);*/
  opacity: 0;
}
@keyframes threeBlock{
	from{
		height:0;
	}
	to{
		height:70%;
	}
}
@keyframes setSucc{
	from{
		opacity:0;
	}
	to{
		opacity:1;
	}
}
	#myss{
		width:100%;
		height:100%;
		-webkit-overflow-scrolling: touch;
		overflow:scroll;
		position: relative;
		background: #fcfcfc;
		display: flex;
		flex-direction: column;
		-webkit-display: flex;
		-webkit-flex-direction: column;
		.myCourse{
			position: fixed;
			left:0;
			top:0;
			width:100%;
			height:100%;
			background: rgba(0,0,0,.25);
			z-index: 1004;
		}
		.threeBlock{
			position: fixed;
			width:90%;
			height:70%;
			left:5%;
			top:10%;
			background: #ddd;
			-webkit-animation: threeBlock 1s ease forwards;
			-o-animation: threeBlock 1s ease forwards;
			animation: threeBlock 1s ease forwards;
			overflow: hidden;
			&>p{
				height:3.5rem;
				line-height: 3.5rem;
				position: relative;
				text-align: center;
				font-size: 1.7rem;
				i{
					display: inline-block;
					position: absolute;
					right:1.5rem;
					top:0;
					font-size: 1.8rem;
				}
			}
			.sameStyle{
				
		}

		}
		.big{
			height:12rem;
			width:100%;
		}
		&>img{
			position: fixed;
			width: 100%;
			height: 100%;
			left:0;
			top:0;
			z-index: -1;
		}
		.personInfor{
			width:100%;
			height:10rem;
			background:#fefefe;
			&>div{
				height:100%;
				float: left;
				&:first-child{
					width:30%;
					img{
						display: inline-block;
						width:5.6rem;
						height:5.6rem;
						border-radius: 50%;
						border:1px solid #eee;
						margin: 1.2rem;
						margin-top: 2.3rem;
					}
				}
				&:last-child{
					width:70%;

					p{
						color:#888;
						&:first-child{
							margin-top:2.3rem;
							line-height: 3rem;
							font-size: 2rem;
							color:#222;
							span{
								float: right;
								font-size: 1.7rem;
								display: inline-block;
								margin-right: 2rem;
								color:#f60;
							}
						}
						&:last-child{
							line-height: 3rem;
							font-size: 1.3rem;

							i{
								float: right;
								display: inline-block;
								margin-right: 2rem;
								font-size: 2.2rem;
								color:#999;
							}
						}
					}
				}
			}	
		}
		nav{
			width:100%;
			background: #fff;
			margin: .5rem 0;
			&>div{
				display: inline-block;
				float:left;
				width:50%;
				height:5rem;
				line-height: 5rem;
				text-align: center;
				i{
					color:rgba(233, 30, 99, 0.59);
				}
				&:last-child{
					i{
						color:#ffc107;
					}
				}
			}
		}
		.myReadcontent{
			background: #fcfcfc;
			li{
				margin:.5rem 0;
				overflow: hidden;
				background: #fff;
				padding:.8rem 0;
				&>div{
					display: inline-block;
					float:left;
					&>p{
						line-height: 2.5rem;
						text-indent: 3rem;
						font-size: 1.4rem;
						color:#333;

						&>i{
							color:red;
							font-size:2.2rem;
						}
						&:last-child{
							color:rgba(158, 158, 158, 0.65);
							font-size: 1.2rem;
						}

					}

					&:first-child{
						width:70%;
					}
					&:last-child{
						width:30%;
						line-height: 5rem;
						text-align: center;
					}
				}
				&:first-child{
					p{
						i{
							color:#2196f3;
						}
					}
				}
				&:nth-child(2){
					p{
						i{
							color:#ff5722;
						}
					}
				}
				&:nth-child(3){
					p{
						i{
							color:#009688;
						}
					}
				}
				&:last-child{
					p{
						i{
							color:#cddc39;
						}
					}

				}

			}

		}
}
</style>