<template>
	<section id="askquestion">
		<div class="progress">
			<p ref='progress' class="common">
				<span class="common" :class="{colorChange:itemIndex>0}">{{itemIndex}}/{{questionlists.length}}</span>
			</p>
			
		</div>
		 <div class="qst-box" v-for="(item,indexs) in questionlist" >
		 	<!-- <div class="answerStatus" v-show='showAns'>
				<p v-show='trueAn' :class="{questOut:trueAn}">答案正确<br>
					<img src="../assets/images/deyi.png">
				</p>
				<p v-show='falseAn' :class="{questOut:falseAn}">答案错误<br>
					<img src="../assets/images/nanguo.png">
				</p>
			</div> -->
       
            <div class="radio-question comment" v-if="item.formate_cls=='单选'" v-show='indexs == nextIndex' :class="{questOut:indexs == nextIndex}">
              <h5>
                 <!-- {{indexs+1}}、 -->
                 {{item.name}}(单选)
              </h5>
       
              <fieldset>
                 <p v-for="(qst,index) in item.questionOption" :class="{trueCss:selected[indexs].right==qst.id &amp;&amp; showAns,falseCss:selected[indexs].answer == qst.id  &amp;&amp; showAns}" >
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id" :value = "qst.id" v-model="selected[indexs]['answer']">
                    <label :for="'radio'+qst.id" :class="{changeFont:countFontWidth(qst.option)}">
                    	<span>
                    		  {{ABC[index]}}. {{qst.option}}
                    	</span>
               
                    </label>
                 </p>
              </fieldset>
            </div>
            <div class="checkbox-question comment" v-if="item.formate_cls=='多选'" v-show='indexs == nextIndex' :class="{questOut:indexs == nextIndex}">
                    <h5>
                      <!-- {{indexs+1}}、 -->
                      {{item.name}}(多选)
                    </h5>
                  
                    <fieldset>
                        <p v-for="(qst,index) in item.questionOption" :class="{trueCss:isInArray(selected[indexs].right,qst.id) &amp;&amp; showAns,falseCsss:isInArray(selected[indexs].answer,qst.id)&amp;&amp; showAns}">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value ="qst.id" v-model="selected[indexs]['answer']">
                        <label :for="'checkbox'+qst.id" :class="{changeFont:countFontWidth(qst.option)}">
                         <span>
                         	{{ABC[index]}}.{{qst.option}}
                         </span>
                        </label>
                        </p>
                    </fieldset>
            </div>
      </div>
		<button @click='nextQuest' :disabled='showAns || showTotal' :class="{disable:showAns || showTotal}">下一题</button>
		<!-- <button @click='watchTotal' v-show='ifLastQuestion &amp;&amp;showTotal ' class="wacthTotal">查看结果</button> -->
	</section>
</template>
<script>
import {bus} from '../bus.js'
	export default {
		data(){
			return {
				questionlists:[],
				ABC:['A','B','C','D','E','F'],
				nextIndex:0,
				selected:[],
				showAns:false,
				trueAn:false,
				falseAn:false,
				showTotal:false,
				whatRoute:{
					studyAdd:'postReadingDayResult',
				   	qstAnswer:'postReadingSummaryResult',
				   	qstThrought:'postReadingTest'
				},
				whatType1:{
					studyAdd:'Sign',
				   	qstAnswer:'Test'
				},
				whatType2:{
					studyAdd:'accumulation',
				   	qstAnswer:'sign',
				   	qstThrought:'Test'
				},
				whatMainPage:{
					studyAdd:'everyTimeRead',
				   	qstAnswer:'readSum',
				   	qstThrought:'ImmediateExp'
				},
				whatResult:{
					studyAdd:'StudyAddResult',
				   	qstAnswer:'qstResult',
				   	qstThrought:'qstThroughtResult'
				},
				itemIndex:0,
				totalNum:0,
				trueNum:0,

				
			}
		},
		watch:{
			questionlist(newV){
				console.log(newV);
				this.totalNum = newV.length;
				this.questionlists = newV;
				this.addAnswer();
			},
			nextIndex(newV){
				console.log(newV);
				this.$refs.progress.style.width = (newV / this.questionlists.length) * 100 +'%';
			},
		},
		props:['questionlist'],
		computed:{
			ifLastQuestion(){
				return this.nextIndex == this.questionlists.length-1?true:false;
			},
			itemLength(){
				return this.questionlists.length;
			},

		},
		methods:{
			countFontWidth(f){
				let l = f.length;
				if(l>15){
					return true;
				}else{
					return false;
				}
			},
			isArray(o){
				return Object.prototype.toString.call(o)=='[object Array]';
			},
			isInArray(arr,value){
				if(!this.isArray(arr)){
					arr = arr.split(',')
				}
   				 for(var i = 0; i < arr.length; i++){
       					 if(value == arr[i]){
           						 return true;
       						 }
    					} return false;
    				
					},
			oneItemInArray(arr1,arr2){
				arr2 = arr2.split(',')
				for(let i = 0;i<arr1.length;i++){
					for(let j = 0;j<arr2.length;j++){
						if(arr1[i] == arr2[j]){
							return true;
						}
					}
				}return false;

			},
			//提交答案
			submit(){
				this.selected.forEach(v=>{
				      if(v.kind=='MultiSelect'){
				        v.answer = v.answer.join(',');
				      }
				      if(v.kind == 'Radio'){
				        v.answer = v.answer.toString();
				      }
   				 });
			    let postdata = {
			      wxId:this.wxId,
			      signId:parseInt(this.$route.query.id1),
			      questionResult:this.selected,
			      type:this.whatType1[this.$route.name],
			      totalNum:this.totalNum,
			      trueNum:this.trueNum,

			    };
    			console.log(postdata)
    			this.axios.post(this.ip.RESTPATH+'rest/postReadQuestionResult',postdata)
    			.then(res=>{
			      console.log(res.data);
			      if(res.data.flag){
			        let postdata1 = {
			           wxId:this.wxId,
			           type:this.whatType2[this.$route.name],
			           readingId:this.$route.query.id1,
			           readingDayId:this.$route.query.id,
			           isFinish:true,
           			   testId :this.$route.query.id,	
           			   compainId:sessionStorage.getItem('companidSign_'),
			        };
			        console.log(postdata1)
			        console.log(this.ip.RESTPATH+'rest/'+this.whatRoute[this.$route.name])
			        this.axios.post(this.ip.RESTPATH+'rest/'+this.whatRoute[this.$route.name],postdata1)
			        .then(res=>{
			        	console.log(res.data)
			        	this.showTotal = true;
			        	if(this.$route.name=='studyAdd'){
			        		setTimeout(function(){
			        			bus.$emit('goNext')
			        			}.bind(this),1500)
			        	}else if(this.$route.name=='qstThrought'){
			        		setTimeout(function(){
			        			 this.$router.push({name:this.whatResult[this.$route.name],query:{id:this.$route.query.id}});
			        		}.bind(this),1500)
			        		 

			        	}
			           
			        })
			      }
			    })
			},
			//查看总览

			watchTotal(){
			  //变量
			   this.$router.push({name:this.whatResult[this.$route.name],query:{id:this.$route.query.id}});
			},
			//下一题
			nextQuest(){
				console.log(this.selected)
				if(this.selected[this.nextIndex]['answer'].length == ''){
					bus.$emit('tip','请选择答案')
				}else{
					this.tureOrfalse(this.selected[this.nextIndex]);	
				}
					
			},
			//判断答案正确
			tureOrfalse(v){
				this.showAns = true;
				this.trueAn = false;
			 	this.falseAn = false;
				if(v.kind=='MultiSelect'){
                	if(v.answer.sort(function(a,b){return a-b}).join(',')==v.right){
                  		console.log('多选答案正确');
                    	v.isRight = '1';
                    	this.trueAn = true;
                    	this.trueNum++;
                 		 }else{
		                    v.isRight = '0';
		                    console.log('错误')
		                    this.falseAn = true;
                  }
            }else if(v.kind=='Radio'){
                if(v.answer == v.right){
                  console.log('单选答案正确');
                  v.isRight = '1';
                  this.trueAn = true;
                  this.trueNum++;
                }else{
                  v.isRight = '0';
                  this.falseAn = true;
              }
            	}
            	if(this.nextIndex == this.questionlists.length-1){
            		bus.$emit('tip','已经是最后一题了')
            		this.$refs.progress.style.width = ((this.nextIndex+1) / this.questionlists.length) * 100 +'%';
            		this.itemIndex++;
							this.submit()
						}
            	setTimeout(function(){	
						if(this.nextIndex == this.questionlists.length-1){	
							this.showAns = true;
						}else{
							this.nextIndex++;
							this.showAns = false;
							this.$refs.progress.style.width = (this.nextIndex / this.questionlists.length) * 100 +'%';
							this.$refs.progress.style.transition = 'all 1s ease'

							this.itemIndex = this.nextIndex

						}
					}.bind(this),1500)
			},
			addAnswer(){
				let rightResult = [];
		        const typeMap={
		          '常识':'GeneralKnowledge',
		          '文本知识':'TextKnowledge',
		          '阅读理解':'ReadingComprehension'
		        };
		      this.questionlists.forEach((v,index)=>{
		        console.log(v)
		        if(v.formate_cls=="多选"){
		        let right=[];
		        for(var i=0;i<v.questionOption.length;i++){
		          if(v.questionOption[i].flag) right.push(v.questionOption[i]['id'].toString());
		        }
		        rightResult[index]={
		          answer:[],
		          right:right.join(','),
		          id:v.id,
		          type:typeMap[v.content_cls],
		          kind:'MultiSelect',
		          isRight:'',
		        };
		      }else if(v.formate_cls=="单选"){
		        let right='';
		        for(var j=0;j<v.questionOption.length;j++){
		          if(v.questionOption[j].flag) right+=v.questionOption[j]['id'].toString();
		        }
		        rightResult[index]={
		          answer:[],
		          right:right,
		          id:v.id,
		          type:typeMap[v.content_cls],
		          kind:'Radio',
		          isRight:'',
		        };
		      }else if(v.formate_cls=="图片"){
		        rightResult[index]={
		          answer:'',
		          id:v.id,
		          type:typeMap[v.content_cls],
		          kind:'Image'
		        };
		      }
		    });
		      this.selected = rightResult;
		      console.log(this.selected)
			},
		},
		created(){
			console.log(this.whatType2[this.$route.name])
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			if(this.$route.name=='studyAdd'){	
			        	let id = this.$route.query.id;
						bus.$on('goNext',()=>{
						sessionStorage.setItem('sign','sign5')
						this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id
									}})
								})

			        	}
			           
			
		},

	}
</script>
<style lang='less' scoped>
@keyframes questOut{
	from{
		-webkit-transform: scale(.95);
		transform: scale(.95);
		opacity:.95;
	}
	to{
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity:1;
	}
}
@keyframes questIn{
	from{
		-webkit-transform: scale(1);
		transform: scale(1);
		opacity:1;
	}
	to{
		-webkit-transform: scale(.7);
		transform: scale(.7);
		opacity:.7;
		
	}
}
@keyframes wacthTotal{
	from {
		margin-top: 4rem;
		opacity: .5;
	}
	to{
		margin-top: 1rem;
		opacity: 1;
	}
}
	#askquestion{
		width:100%;
		height:auto;
		/*margin-top: 3rem;*/
		.progress{
			background: #fff;
			width:50%;
			margin:1rem auto 0;
			height:2rem;
			border-radius:20px;
			position: relative;
			overflow: hidden;
			.common{
				position: absolute;
				left:0;
				top:0;
				height: 100%;
			}
			p{
				width: 2%;
				background: #8bc34a;
				span{
					width:100%;
					text-align: center;
					line-height:2rem;
					color:#9e9e9e;

			}
			.colorChange{
				color:#fff;
			}
			}
		}
		.qst-box{
        width: 100%;
        padding: 0 1rem;
        margin: 1rem 0;
        /*height: 100%;*/
        border-radius: 3px;
        
          
       .answerStatus{
				position: fixed;
				width:70%;
				height:6rem;
				top:3.3rem;
				left:15%;
				z-index: 1000;
				background: #fff;
				/*box-shadow: 0 0 3px #ddd;*/
				border-radius: 5px;
				p{
					width:100%;
					height: 100%;
					line-height: 2.7rem;
					text-align: center;
					border-radius: 5px;
					font-size: 2rem;
					img{
						width:2.5rem;
						height:2.5rem;
					}
					&:first-child{
						background:#fff;
						color:#4caf50;
					}
					&:last-child{
						background: #fff;
						color:red;
					}
				}
			}
        .comment{
          width: 100%;
          height: auto;
          h5{
            width: 100%;
            min-height: 25px;
            line-height: 25px;
            font-size: 16px;
            text-align:center;
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
            border-color: #eee;
            padding:0;
            p{
              width: 100%;
              min-height: 2rem;
              overflow: hidden;
              margin-top: .5rem;
              padding:.4rem 0;
             input{
		                font-size: 1.2rem;
		                float: left;
		                width: 5%;
		                display: none;
		                opacity:0;-webkit-appearance:none;
              		}
					label{
		                font-size: 1.6rem;
		                float: left;
		                width: 90%;
		                margin-left: 5%;
		                border-radius: 4px;
		                /*padding:.3rem 0;*/
		                text-align:center;
		                height:4.5rem;
		                /*line-height: 4.5rem;*/
		                background: #fff;
		                color:#888;
		                position: relative;
		                font-size:1.5rem;
		                span{
		                	display: inline-block;
		                	max-height: 90%;
		                	width:80%;
		                	position: absolute;
		                	top:50%;
		                	left:50%;
		                	transform: translate(-50%,-50%);
		                }
              		}
              		.changeFont{
              			font-size:1.2rem;
              		}
	              	/*input+label:before{
		                display: inline-block;
		                width: 20px;
		                height: 20px;
		                margin-right: 8px;
		                content: '';
		                color: #fff;
		                border: 1px solid #dce4e6;
		                background-color: #f3f6f8;
		                border-radius: 3px;
		                position: absolute;
		                top: .3rem;
		                left: 0;
	              	}*/
		            /*input[type=radio]+label:before {
		                border-radius: 50%;
		              }
		            input[type=checkbox]+label:before {
		                border-radius: 3px;
		              }*/
		            input[type=checkbox]:checked+label,input[type=radio]:checked+label{
		                /*content:'\2713';*/
		                color:#fff;
		                background-color: #9e9e9e;
		                border:2px solid #fff;
              				}
            }
     
              		.falseCss{
              			label{
							background: red!important;
		              		color:#fff;
		              		border:2px solid #fff;
						}
						input+label:before{
							display: none;
								}
              		}
              		.falseCsss{
              			label{
							background: red!important;
		              		color:#fff;
		              		border:2px solid #fff;
						}
						input+label:before{
							display: none;
								}
              		}
              		.trueCss{
					label{
						background: #47d04c!important;
		              	color:#fff;
		              	border:2px solid #fff;
						}
						input+label:before{
							display: none;
								}
              		}
            textarea{
              width: 100%;
              min-height: 12rem;
              font-size: 14px;
              resize: vertical;
          
               margin-top:5px;
               border-color:#eee;
               -webkit-appearance:none;
            }
          }
        }
      }
		.qsts{
			width:85%;
			margin:2rem auto;
			
			ul{
				li{
					h5{
						font-size: 1.6rem;
						color:#000;
						background: #fff;
						padding: 1rem;
			}
			&>div{
				margin-top: 1rem;
				padding: 1rem .5rem;
				p{
					margin:.7rem 0;
					padding:.2rem 0;
					overflow: hidden;
					input{
		                font-size: 1.2rem;
		                float: left;
		                width: 5%;
		                display: none;
		                opacity:0;-webkit-appearance:none;
              		}
					label{
		                font-size: 1.6rem;
		                float: left;
		                width: 95%;
		                padding:.3rem 0;
		                margin-left: 3%;
		                padding-left: 10%;
		                padding-right: 5%;
		                position: relative;
              		}
	              	input+label:before{
		                display: inline-block;
		                width: 20px;
		                height: 20px;

		                margin-right: 8px;
		                /*padding:.3rem 0;*/
		                content: '';
		                color: #fff;
		                border: 1px solid #dce4e6;
		                background-color: #f3f6f8;
		                border-radius: 3px;
		                position: absolute;
		                top: .3rem;
		                left: 0;
	              	}
		            input[type=radio]+label:before {
		                border-radius: 50%;
		              }
		            input[type=checkbox]+label:before {
		                border-radius: 3px;
		              }
		            input[type=checkbox]:checked+label:before,input[type=radio]:checked+label:before{
		                content:'\2713';
		                color:#fff;
		                background-color: #31b968;
		                font-size:16px;
		                line-height: 20px;
		                text-align: center;
		                border-color: #31b968;
              				}
              		
						}
						.trueCss{
							label{
								background: #47d04c;
		              			color:#fff;
		              			border-radius: 3px;
							}
								input+label:before{
									display: none;
								}			
              			}
					}
				}
			}	
		}
		button{
			width:40%;
			height:2.8rem;
			margin-top: 10%;
			margin-left: 30%;
			background: #e91e63;
			color:#fff;
			border-radius: 20px;
			letter-spacing: 2px;
		}
		.wacthTotal{
			margin-top: 1rem;
			-webkit-animation: wacthTotal .6s ease forwards;
			animation: wacthTotal .6s ease forwards;
		}
		.disable{
			background: #9e9e9e;
		}
}
	
				.questOut{
					-webkit-animation:questOut .5s ease forwards;
					animation:questOut .5s ease forwards;
				}
				.questIn{
					-webkit-animation:questIn .5s ease forwards;
					animation:questIn .5s ease forwards;
				}
</style>