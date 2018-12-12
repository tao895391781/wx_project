<template>
	<section id="studyAccumulation" v-show='showThis'>
		<h5><i class="iconfont" @click='goback'>&#xe655;</i>阅读小测</h5>
	
		<!-- <div class="studyAdd">
			<div>
				<div><img :src="studyAddData.picId" alt="1"></div>	
				<p>《{{studyAddData.bookName}}》</p>
			</div>
		</div> -->
		
		 <div class="doexam">
  
   	 	<div is='Askquestion':questionlist='studyAddData.questions'></div>

  		</div>
		
		
	</section>
</template>
<script>
import {bus} from '../../../../../../bus.js'
import Askquestion from '../../../../../../components/askquestion.vue'
	export default{
		data(){
			return {
				studyAddData:{},
				wxId:'',
				isAdd:'我已经积累？',
				showThis:false,
				ABC:['A','B','C','D','E','F'],
				selected:[],
				trueSub:false


			}
		},
		components:{
			Askquestion
		},
		methods:{
			goback(){
				this.$router.go(-1);
					// this.$router.push({name:'everyTimeRead',query:{id:this.$route.query.id}})
			},
		},
		computed:{
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			let that = this;
			this.$parent.showThis = false;
			this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
			let id1 = this.$route.query.id1;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingAccumulationByAccumulationId/'+id1)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading');
				this.$parent.showThis = true;
				this.showThis = true;
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.picId)
        				.then(res2 => {	
        					console.log(res2.data)
        				res.data.picId = this.ip.filePath1+res2.data[res.data.picId]['href'];
        		});
        				this.studyAddData = res.data;
        				 let rightResult = [];
				         const typeMap={
				          '常识':'GeneralKnowledge',
				          '文本知识':'TextKnowledge',
				          '阅读理解':'ReadingComprehension'
				        };
				      this.studyAddData.questions.forEach((v,index)=>{
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

			})
			let idArr = JSON.parse(sessionStorage.getItem('idArr'));
			console.log(idArr)
			let id = this.$route.query.id;
			console.log(id)
			bus.$on('goNext',()=>{
				sessionStorage.setItem('sign','sign3')
				this.$router.replace({name:'everyTimeRead',query:{id:this.$route.query.id}})
			})
			
		},
	}
</script>
<style lang='less' scoped>
@keyframes subBox{
    from{
      opacity: 0;
      transform: scale(0);
    }
    to{
      opacity: 1;
      transform: scale(1)
    }
   }
	#studyAccumulation{
		width:100%;
		height:100%;
		background:#f2f2f2;
		display: flex;
		-webkit-display:flex;
		flex-direction:column;
		-webkit-flex-direction:column;
		position: relative;
		.sureSunmit{
   position: fixed;
    width:70%;
    height:12rem;
    left:15%;
    top:30%;
    background: #fff;
    border-radius: 6px; 
    color:#fff;
    z-index: 999;
    box-shadow:0 0 5px #eee;
    animation: subBox .3s forwards;
    p{
      text-align: center;
      height:6rem;
      line-height: 6rem;
      font-size: 1.8rem;
      letter-spacing: 3px;
      color:#333;
    }
    ul{
      width:100%;
      height:4rem;
      margin-top: 2rem;
      border-top: 1px solid #eee;
      li{
        float: left;
        width:50%;
        height: 100%;
        margin-top: 0;
        color:#666; 
        line-height: 4rem;
        font-size: 2rem;
        button{
          width:100%;
          height:100%;
          line-height: 4rem;
          border-style: none;
          font-size: 1.8rem;
          color:#666;
          text-align: center;
          background: #fff;
        }
        &:nth-child(2){
          border-left: 1px solid #eee;
          button{
           color:#1892e9; 
          }   
        }
      }
    }
  }
		&>h5{
			line-height:3rem;
			text-align: center;
			position: relative;
			border-bottom: 1px solid rgba(158, 158, 158, 0.07);
			i{
				padding:0 1rem;
				color:#555;
				position: absolute;
				left:0;
				top:0;
			}
		}
			.doexam{
				width: 100%;
				flex:1;
				padding-bottom: 3rem;
				background: #f2f2f2;
		.dec{
			width: 100%;
			height: auto;
			text-indent: 2em;
			position: relative;
      		font-size: 16px;
			// overflow-y: scroll;
			// -webkit-overflow-scrolling: touch;
			.progress{
				width: 100%;
				height: 4px;
				position: absolute;
				bottom: 0;
				overflow: hidden;
				z-index: 99;
				div{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					bottom: 0;
					left: -100%;
					background-color: #2196f3;
					transition: all .4s cubic-bezier(.25,.8,.25,1);
				}
			}
		}
		#form-box{
			width: 100%;
			height: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
        .noqst{
          font-size: 1.8rem;
          text-align: center;
          width: 100%;
          margin-top: 8rem;
         }
			.qst-box{
			  width: 100%;
			  padding: 0 1rem;
			  margin: 1rem 0;
			  /*height: 100%;*/
        border-radius: 3px;
        
          .preTest{
         text-align: center;
         width:40%;
         margin:2rem auto;
         height:5rem;
         line-height: 2rem;
         border-radius:5px;
         background: #5b9bd5;
         color:#fff;
         letter-spacing: 2px;
         font-size: 1.7rem;
         }
		 }
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
             	border-color: #eee;
             	background: #fff;
			      p{
			        width: 100%;
			        min-height: 2rem;
			        overflow: hidden;
			        margin-top: .5rem;
			        input{
			          font-size: 1.2rem;
			          float: left;
			          width: 5%;
			          display: none;
			          opacity:0;-webkit-appearance:none;
			        }
			        label{
			          font-size: 1.4rem;
			          float: left;
			          width: 95%;
			          margin-left: 3%;
			          padding-left: 10%;
			          padding-right: 5%;
			          position: relative;
			        }
			        input+label:before{
			          display: inline-block;
			          width: 18px;
			          height: 18px;
			          margin-right: 8px;
			          content: '';
			          color: #fff;
			          border: 1px solid #dce4e6;
			          background-color: #f3f6f8;
			          border-radius: 3px;
			          position: absolute;
			          top: 0;
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
			          text-align: center;
			          border-color: #31b968;
			        }

			      }
			      textarea{
			        width: 100%;
			        min-height: 12rem;
			        font-size: 14px;
			        resize: vertical;
               // border:1px solid #cceff5;background:#fafcfd;
               margin-top:5px;
               border-color:#eee;
               -webkit-appearance:none;
			      }
			    }
			  }
			  &>p{
		        text-align: center;
		        margin-top: 50px;
        /*margin-bottom: 70px;*/
        button{
          color: white!important;
          background-color: #409eff!important;
        }
      }
			}
		}
	
		.studyAdd{
		width:100%;
		height:25%;
		/* border-bottom:1px solid #ccc; */
		div{
		width:100%;
		&:first-child{
			&>div{
				width:7rem;
				height:8rem;
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
			&>p{
				font-size:1.3rem;
				text-indent:10px;
				border-left:5px solid #f60;
				padding:.5rem 0;
				background:#fff;
		}
		.sentenceAdd{
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			flex:1;
			-webkit-flex:1;
			margin-top: .3rem;
			&>.text{
				p{
				font-size: 1.3rem;
				margin-left: 15px;
				text-align: left;
				padding-right: 1em;
			}
			}
			&>.over{
			width:40%;
			height:2.5rem;
			margin:2rem auto;
			&>button{
			width:100%;
			height:100%;
			text-align:center;
			border-radius: 5px;
			color:#fff;
			background: #f60;
			border-style: none;
			outline: none;
		}
		.isFinish{
			background: #70c844;
		}
		}
			
		}
		
		
	}
</style>