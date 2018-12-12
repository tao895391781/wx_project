<template>
	<section id="studyAddResult" v-show='showThis'>
		<header >
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>阅读小测</div>
		</header>
		<!-- <p v-show='showQ'>你答题正确率为<span>{{total.score}}/{{qstData.length}}</span>,获得<span>{{total.score}}</span>积分</p> -->
		<!-- <div class="sorce" v-show='!showQ'>
			<p>
				你做对了<span>{{qstData.length}}</span>题中的<span>{{total.score}}</span>道，准确率如下：
			</p>
			<p>恭喜您，获得<span>{{total.score}}</span>积分</p>
			<div>
				<img src="../../../../../../assets/images/egg_success.gif" alt="">
			</div>
		</div> -->
		<div class="todayDescript">
			<i class="iconfont">&#xe6a3;</i>
			<p>本次小测已完成</p>
		</div>
		<div class="itemInfo">
			<p>
				<b>第二天</b>
				<span><i>正确率</i>&nbsp;{{trueLv}}</span>
			</p>
			<ul class="result">
				<li v-for='(q,index) in qstData'>
					<span>{{index+1}}</span>
						<br>
						<span>
							<i class="iconfont" v-show='q.isRight'>&#xe6c1;</i>
							<i class="iconfont" v-show='!q.isRight'>&#xe724;</i>
						</span>	
				</li>
		</ul>
			
		</div>
		<p>本次解析</p>
		<div class="showRightQuestion">
			
			<div class="qst-box" v-for="(item,questionindex) in qstData" :indexs='questionindex'>
            <div class="radio-question" v-if="item.formate_cls=='单选'" :class="{radio:false}">
              <h5>
                 {{questionindex+1}}、{{item.name}}(单选)
              </h5>
              <fieldset>
                 <p v-for="(qst,index) in item.questionOption">
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id"  :value="qst.id">
                    	<label :for="'radio'+qst.id" :class="{trueOpt:qst.flag==1,falseOpt:item.questionResult[0]==qst.id}">
           
                    		<i class="opt"           >{{ABC[index]}}</i>
                    		&nbsp;
                    		<span>{{qst.option}}</span>
                    	</label>
                   
                 </p>
              </fieldset>
              <div class="description">
              	<h5>解析：</h5>
              	<p v-if='item.description != null'>{{item.description}}</p>
              	<p v-if='item.description == null'>暂无解析</p>
              </div>
            </div>
            <div class="checkbox-question" v-if="item.formate_cls=='多选'" >
                    <h5>
                      {{questionindex+1}}、{{item.name}}(多选)
                    </h5>
                    <fieldset>
                        <p v-for="(qst,index) in item.questionOption">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value="qst.id">
                        <label :for="'checkbox'+qst.id" :class="{trueOpt:qst.flag==1,falseOpt:isInArray(item.questionResult,qst.id)}">
                    		<i class="opt"           >{{ABC[index]}}</i>
                    		&nbsp;
                    		<span>{{qst.option}}</span>
                        </label>
                        </p>
                    </fieldset>
              <div class="description">
              	<h5>解析：</h5>
              	<p v-if='item.description != null'>{{item.description}}</p>
              	<p v-if='item.description == null'>暂无解析</p>
              </div>
            </div>
			  
			</div>
		</div>
		<div class="whiteSpace" v-show='!showQ'> </div>
		
	<!-- 	<div class="tips">
			温馨提示：点击以上题号，可回看题目结果。
		</div> -->
	</section>
</template>
<script>
import {bus} from '../../../../../../bus.js'
	export default {
		data(){
			return {
				ABC:['A','B','C','D','E','F'],
				showQ:false,
				qstData:[],
				total:{},
				i:0,
				singlequestionlist:[],
				trueLv:0,
				showThis:false,
				not2:false,

			}
		},
		computed:{
		
		},
		methods:{
			isInArray(arr,value){
   				 for(var i = 0; i < arr.length; i++){
       					 if(value === arr[i]){
           						 return true;
       						 }
    					}	return false;
    			
					},
			goResult(index){
				this.i = index;
				this.showQ = true;
				this.singlequestionlist = [];
				this.singlequestionlist.push(this.qstData[index])

			},
			goback(){
				if(this.$route.query.from == 'qstResult'){
					this.$router.go(-2);
				}else{
					this.$router.go(-1);
				}
				
			},
		},
		beforeRouteLeave (to, from, next){
	  //  		if(this.$route.query.not2 && this.not2){
			// 	this.$router.go(-2);
			// }
	  	next()  
	},
		created(){
			this.$parent.showThis = true;
			let wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id = this.$route.query.id1;
			this.axios.get(this.ip.RESTPATH+'rest/getReadQuestionResult/'+wxId+'/'+id+'/Sign')
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading')
				this.showThis = true;
				this.qstData = res.data[0].questions;
				this.total = res.data[0];
				this.trueLv = parseInt(this.total.score/this.qstData.length*100)  +'%';
				if(!this.$route.query.not2){
					bus.$emit('showTipNext');
				}
				
			});
			let idArr = JSON.parse(sessionStorage.getItem('idArr'));
			console.log(idArr)
			bus.$on('goNext',()=>{
				sessionStorage.setItem('sign','sign3')
				this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id}})
			})
		},

	}
</script>
<style lang="less">
	#studyAddResult{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		-webkit-display:flex;
		-webkit-flex-direction:column;
		background:#fcfcfc;
		padding-bottom: 2.8rem;
		&>p{
			text-align:center;
			letter-spacing:1px;
			background:#fff;
			line-height:3.5rem;
			margin:.2rem auto;
			width:100%;
			span{
				display:inline-block;
				margin:0 .2rem;
				color:#f60;
			}
		}
		header{
				height:3.3rem;
				color:#555;
				width:100%;
				z-index:999;
				background:#fff;
					div{
						display:inline-block;
						float: left;
						height:100%;
						
						line-height:3.3rem;
						
							&:first-child{
								width:20%;
								text-indent:1em;
								text-align:left;
							}
							&:nth-child(2){
								width:60%;
								text-align:center;
							}
							&:nth-child(3){
								width:20%;
								
							}
						}
					}
			.todayDescript{
				margin-bottom:1rem;
				p{
					text-align:center;
				}
				i{
					display:inline-block;
					width:4rem;
					height:4rem;
					text-align:center;
					font-size:3rem;
					line-height:4rem;
					border-radius:50%;
					margin:1rem 0 1rem 50%;
					margin-top: 1rem;
					transform:translateX(-50%);
					background:#4caf50;
					color:#fff;
				}
			}
			.itemInfo{
				background:#f2f2f2;
				width:90%;
			    margin-left: 5%;
			    padding:1rem 0;
				&>p{
					b{
						float: left;
						padding-left:2em;
					}
					span{
						float: right;
						padding-right:2em;
						font-size: 1.5rem;
						i{
							font-size: 1.3rem;
							font-style:normal;
						}
					}
				}
				 &>ul{
			      	height: 5rem;
					width:100%;
					padding:0 2em 1rem;
			      	overflow-x:auto;
			      	overflow-y: hidden;
			      	-webkit-overflow-scrolling:touch;
			      	white-space: nowrap;
			      	border-radius: 5px;
			      	li{
			      		height: 100%;
			      		display: inline-block;
			      		margin-top: .1rem;
			      		width:4rem;
			      		padding-top: .5rem;
			      		border-right:1px solid rgba(238,238,238,.3);
						span{
							display: inline-block;
							width:100%;
							text-align: center;
							font-size: 1rem;
							color:#0a0a0a;
							font-size:1.5rem;
							padding-bottom:.5rem;
						i{
							font-size: 2.3rem;
							color:red;	
							&:first-child{
								color:#17ea26;
							}
						}
					}
      	}
      	.answerS{
      		background: rgba(235, 238, 245, 0.69);
      	}
      }
			}
		.sorce{
			p{
				text-align:center;
				margin:2rem 0;
				font-size:1.7rem;
				&:first-child{
				margin-top:3rem ;
				}
				span{
					color:#f60;
					font-size:2rem;
					display:inline-block;
					margin:0 .3rem;
				}
			}
			&>div{
				width:13rem;
				height:13rem;
				margin:1rem auto;
				img{
					min-width:100%;
				
				}
			}
		}
		.showRightQuestion{
			width:100%;
			flex:1;
			-webkit-flex:1;
			 border-bottom:1px solid #ddd;
			 background: #f2f2f2;
			 padding:1rem 0;
			.qst-box{
			width: 95%;
			padding: 2rem;
			margin: 0 auto 1rem;
			height: auto;
         	border-radius: 6px;
         	background: rgba(255, 254, 254, 0.8);
			  &>div{
			    width: 100%;
			    height: auto;
			    h5{
			      width: 100%;
			      min-height: 25px;
			      line-height: 25px;
			      font-size: 16px;
			    }
			    &>p{
			    	padding: 0 2%;
			    	margin: 10px 0;
			    	img{
			    		width: 100%;
			    		height: auto;
			    		margin: 0 auto;
			    	}
			    }

			    fieldset{
			      	width: 100%;
			      	height: auto;
			      	margin-top: .5rem;
			      	overflow: hidden;
            	 	border-radius: 3px;
            		 border-color:transparent;
            		 border:1px solid #eee;
			      p{
			        width: 100%;
			        min-height: 2rem;
			        overflow: hidden;
			        margin-top: 1rem;
			        label{
			        	display: inline-block;
			        	margin-right: 1rem;
			  			padding:.2rem .5rem;
			  			border-radius: 3px;
			        	i{
			        		font-style: normal;
			        		font-size: 1.4rem;
			        		&:last-child{
			        			display: inline-block;
			        			width:1.7rem;
			        			height: 1.7rem;
			        			background: #fd6e20;
			        			color:#fff;
			        			border-radius: 50%;
			        			text-align: center;
			        			line-height: 1.7rem;
			        		}
			        	}
			        }
			        input{
			          font-size: 1.2rem;
			          float: left;
			          width: 5%;
			          display: none;
			          opacity:0;-webkit-appearance:none;
			        }
			        input[type=checkbox]:checked+label,input[type=radio]:checked+label{
					  background: #409eff;
					  color:#fff;
			        }
			   
			       .falseOpt{
						background:red!important;
					 	color:#fff;
			       }
			       .trueOpt{
			       		background:#22bb2e!important;
					 	color:#fff;
			       }
			       .selectQ{
			       		background:#409eff!important;
					 	color:#fff;
			       }

			      }
			     	 textarea{
				        width: 100%;
				        min-height: 12rem;
				        font-size: 14px;
				        resize: vertical;
				        background: transparent;
	              		border-radius: 5px;
	               		margin-top:5px;
	              		border-color:rgba(156, 160, 164, 0.21);
	               		-webkit-appearance:none;
			      }
			    }
			   .description{
			   	margin-top: 1rem;
			   	padding:1rem;
			   	border:1px solid #eee;
			   	&>:last-child{
			   		text-indent:1em;
			   		font-size:1rem;
			   	}
			   } 
			  }
			}

		}
		.whiteSpace{
			width:100%;
			height:15rem;
			background:#fcfcfc;
			flex:1;
			-webkit-flex:1;

		}
		 &>ul{
	      	width:100%;
			padding:0 2em 1rem;
			display:flex;
			flex-wrap:wrap;
	      	border-radius: 5px;

      	li{
      		height: 100%;
      		display: inline-block;
      		margin-top: .1rem;
      		width:20%;
      		padding-top: .5rem;
      		border-right:1px solid rgba(238,238,238,.3);
		span{
			display: inline-block;
			width:100%;
			text-align: center;
			font-size: 1rem;
			i{
				font-size: 2.3rem;
				color:red;	
				&:first-child{
					color:#17ea26;
				}
			}
		}
      	}
      	.answerS{
      		background: rgba(235, 238, 245, 0.69);
      	}
      }
		.tips{
			border-left:5px solid #f60;
			padding:1rem 0;
			text-indent:1em;
			background:#fff;
			margin:.5rem 0;
			font-size:1.3rem;
			margin-top: 5rem;
		}
	}
</style>