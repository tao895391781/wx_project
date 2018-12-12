<template>
	<section id="testread" v-show='showThis'>
		 <div class="qst-box" v-for="(item,indexs) in questionlist" >
		 	<div class="answerStatus" v-show='showAns'>
				<p v-show='trueAn' :class="{questOut:trueAn}">答案正确<br>
					<img src="../../../../../assets/images/deyi.png">
				</p>
				<p v-show='falseAn' :class="{questOut:falseAn}">答案错误<br>
					<img src="../../../../../assets/images/nanguo.png">
				</p>
			</div>
       
            <div class="radio-question comment" v-if="item.formate_cls=='单选'" v-show='indexs == nextIndex' :class="{questOut:indexs == nextIndex}">
              <h5>
                 {{indexs+1}}、{{item.name}}(单选)
              </h5>
       
              <fieldset>
                 <p v-for="(qst,index) in item.questionOption" :class="{trueCss:selected[indexs].right==qst.id &amp;&amp; showAns}" >
                    <input type="radio" :name="'radio'+item.id" :id="'radio'+qst.id" :value = "qst.id" v-model="selected[indexs]['answer']">
                    <label :for="'radio'+qst.id">
                 {{ABC[index]}}、{{qst.option}}
                    </label>
                 </p>
              </fieldset>
            </div>
            <div class="checkbox-question comment" v-if="item.formate_cls=='多选'" v-show='indexs == nextIndex' :class="{questOut:indexs == nextIndex}">
                    <h5>
                      {{indexs+1}}、{{item.name}}(多选)
                    </h5>
                  
                    <fieldset>
                        <p v-for="(qst,index) in item.questionOption" :class="{trueCss:isInArray(selected[indexs].right,qst.id) &amp;&amp; showAns}">
                        <input type="checkbox" :name="'checkbox'+item.id" :id="'checkbox'+qst.id" :value ="qst.id" v-model="selected[indexs]['answer']">
                        <label :for="'checkbox'+qst.id">
                         {{ABC[index]}}、{{qst.option}}
                        </label>
                        </p>
                    </fieldset>
            </div>
      </div>
		<button @click='nextQuest' :disabled='showAns || showTotal' :class="{disable:showAns || showTotal}">下一题</button>
		<button @click='watchTotal' v-show='ifLastQuestion &amp;&amp; showTotal' class="wacthTotal">查看结果</button>
		<div class="lastResulrBox" v-show='showlastResult'>
			<div class="lastResult" :class="{animationlastResult:showlastResult}">
				<p>
					你本次测试正确率为
					<br>
					{{result.length}}/{{selected.length}}

				</p>
				<button @click='back'>退出</button>
				<button class="beginTest" @click='beginTest'>在测一次</button>
			</div>
		</div>
		
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				questionlist:[],
				questionlists:[],
				ABC:['A','B','C','D','E','F'],
				nextIndex:0,
				selected:[],
				showAns:false,
				trueAn:false,
				falseAn:false,
				showTotal:false,
				result:[],
				showlastResult:false,
				showThis:false,
			}
		},
		watch:{
			
		},
		computed:{
			ifLastQuestion(){
				return this.nextIndex == this.questionlist.length-1?true:false;
			},
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			beginTest(){
				this.showlastResult = false;
				location.reload();
				
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
			      signId:parseInt(this.$route.query.id),
			      questionResult:this.selected,
			      type:this.whatType1[this.$route.name],
			    };
    			console.log(postdata)
    			this.axios.post(this.ip.RESTPATH+'rest/postReadQuestionResult',postdata)
    			.then(res=>{
			      console.log(res.data);
			      if(res.data.flag){
			        let postdata1 = {
			           wxId:this.wxId,
			           type:this.whatType2[this.$route.name],
			           readingId:this.$route.query.id,
			           readingDayId:this.$route.query.id1,
			           isFinish:true,
           			   testId :this.$route.query.id,		
			        };
			        console.log(postdata1)
			        this.axios.post(this.ip.RESTPATH+'rest/'+this.whatRoute[this.$route.name],postdata1)
			        .then(res=>{
			        	console.log(res.data)
			        	this.showTotal = true;
			        	if(this.$route.name=='studyAdd'){
			        		bus.$emit('showTipNext');
			        	}
			           
			        })
			      }
			    })
			},
			//查看总览

			watchTotal(){
			  //变量
			 console.log(this.selected);
			 this.selected.forEach(v=>{
			 	if(v.isRight=='1'){
			 	this.result.push(v);
			 	}
			 })
			 this.showlastResult = true;
			},
			//下一题
			nextQuest(){
			
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
                }else{
                  v.isRight = '0';
                  this.falseAn = true;
              }
            	}
            	if(this.nextIndex == this.questionlist.length-1){
            		bus.$emit('tip','已经是最后一题了')
							this.showTotal = true;
						}
            	setTimeout(function(){	
						if(this.nextIndex == this.questionlist.length-1){
							
							this.showAns = true;
						}else{
							this.nextIndex++;
							this.showAns = false;

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
		      this.questionlist.forEach((v,index)=>{
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
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id1 = this.$route.query.id;
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingQuestion/'+id1)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading')
				this.showThis = true;
				this.questionlist = res.data[0].questions;
				this.addAnswer();

			})
			
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
	#testread{
		width:100%;
		height:auto;
		margin-top: 2rem;
		flex:1;
		.lastResulrBox{
			position:fixed;
			width:100%;
        	height:100%;
        	left:0%;
        	top:0%;
        	background:rgba(0,0,0,.5);
        	z-index:1010;
		
        .lastResult{
        	position:absolute;
        	width:90%;
        	height:12rem;
        	left:5%;
        	top:30%;
        	background:#fff;
        	color:#222;
        	border-radius:5px;
        	overflow:hidden;
        	p{
        		line-height:4rem;
        		font-size:1.6rem;
        		text-align:center;
        	}
        	button{
        		width:50%;
        		height:4rem;
        		line-height:4rem;
        		border:none;
        		background:#fff;
        		border-top:1px solid #eee;
        		color:#333;
        		float: left;
        		border-left:1px solid #eee;  
				font-size:1.7rem;
				box-sizing:border-box;
				outline:none;
        	}
        	.beginTest{
        		color:#e91e63;
        	}
        } 
        .animationlastResult{
        	-webkit-animation:questOut .5s ease forwards;
        	animation:questOut .5s ease forwards;
        }
    }
		.qst-box{
        width: 100%;
        padding: 0 2rem;
        margin: 1rem 0;
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
				overflow:hidden;
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
						background: #65d14e;
   						color: #fff;
					}
					&:last-child{
						background:rgba(158, 158, 158, 0.49019607843137253);
    					color: #c76363;
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
		&>button{
			width:50%;
			height:2.8rem;
			margin-top: 10%;
			margin-left: 25%;
			background: #4caf50;
			color:#fff;
			border-radius: 2px;
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