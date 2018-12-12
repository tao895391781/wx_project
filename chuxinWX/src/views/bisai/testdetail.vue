<template>
	   
	<div class="testdetail">
		<h4>我的测试详情</h4>
		<div class="totaldetail">
			
			<ul class="singledetail" v-for='(book,index) in datadetail.courseList' :index='index'> 
				<li>《{{book.name}}》</li>
				<li>
					<i class="iconfont">&#xe62b;</i>
					<p class="headtype">&nbsp;&nbsp;常识储备</p>
					<p class="progressA"><span class="cs"></span></p>
					&nbsp;&nbsp;<span class="cstext">{{(book.generalKnowledge*100).toFixed(1)+'%'}}</span>
				</li>
				<li>
					<i class="iconfont">&#xe5be;</i>
					<p class="headtype">&nbsp;&nbsp;文本细读</p>
					<p class="progressA"><span class="xj"></span></p>
					&nbsp;&nbsp;<span class="xjtext">{{(book.textKnowledge*100).toFixed(1)+'%'}}</span>
				</li>
				<li>
					<i class="iconfont">&#xe650;</i>
					<p class="headtype">&nbsp;&nbsp;理解思考</p>
					<p class="progressA"><span class="sk"></span></p>
					&nbsp;&nbsp;<span class="sktext">{{(book.readingComprehension*100).toFixed(1)+'%'}}</span>
				</li>
			</ul>
			
		</div>
		<div class="MyStudyaverage" >
				<p><span></span><span>我的平均成绩</span></p>
				<p><span></span><span>本校年级平均成绩</span></p>
			<div class="MyStudyaverage-detail">	
				<ul class="zhuxingtu nandu">
					<li><span>{{datadetail.gradeList[3].level.toFixed(1)}}</span></li>	
					<li><span>{{datadetail.gradeList[3].gradeLevel.toFixed(1)}}</span></li>
				</ul>
				<ul class="zhuxingtu changshi">
					<li><span>{{datadetail.gradeList[0].generalKnowledgegMyScore.toFixed(1)}}</span></li>
					<li><span>{{datadetail.gradeList[0].generalKnowledgegGradeScore.toFixed(1)}}</span></li>
				</ul>
				<ul class="zhuxingtu xidu">
					<li><span>{{datadetail.gradeList[2].textKnowledgeMyScore.toFixed(1)}}</span></li>
					<li><span>{{datadetail.gradeList[2].textKnowledgeScore.toFixed(1)}}</span></li>
					
				</ul>
				<ul class="zhuxingtu sikao">
					<li><span>{{datadetail.gradeList[1].readingComprehensionMyScore.toFixed(1)}}</span></li>
					<li><span>{{datadetail.gradeList[1].readingComprehensionGradeScore.toFixed(1)}}</span></li>
				</ul>
				
				
			</div>
			<p class="space-bottom"></p>
				<ul class="testType">
					<li>闯关难度</li>
					<li>常识储备</li>
					<li>文本细读</li>
					<li>理解思考</li>
				</ul>

		</div>
		
		<!-- <p class="myGrade" @click='isShow'>{{showtext}}</p> -->
		<p class="clickgoCourse"><a href="https://mp.weixin.qq.com/s/Ea_GkUc22I9r2Jo2jHUGVw">了解百部名著阅读课程，请点击</a></p>
		<p class="chuxinSupport">本活动由北京初心久久教育科技有限公司提供技术及内容支持</p>
		 
	</div>
</template>

<script>
import { bus } from '../../bus.js'
	export default {
		data(){
			return {
				showdetail:true,
				datadetail:{},
				name:'',
				code:'',

			}
		},
		
		methods:{
			isShow(){
						
			},
		},
		created(){

			sessionStorage.setItem('saveState','')
			this.name=this.$store.state.answerResult.name;
  			this.code=this.$store.state.answerResult.code;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingMatchQuestionResultsDetails?code='+this.code+'&name='+'tll')
			.then(res=>{
				console.log('获取详情')
				console.log(res.data);
				if(res.data){
					bus.$emit('closeloading')

				this.datadetail=res.data;
				var singlebook=this.datadetail.courseList;
				var gradedetail=this.datadetail.gradeList;
				
				// console.log(this.datadetail.courseList.length)
				$(function(){
					//我的测试详情
				for(var j=0;j<singlebook.length;j++){
					var cswidth=singlebook[j].generalKnowledge;
					var xjwidth=singlebook[j].textKnowledge;
					var skwidth=singlebook[j].readingComprehension;
					console.log(cswidth)
					console.log(xjwidth)
					console.log(skwidth)
					var widtha=$('.progressA').width()
					console.log(widtha)
					$('.totaldetail').find('.singledetail').eq(j).find('.cs').css('width',singlebook[j].generalKnowledge*widtha+'px');
					$('.totaldetail').find('.singledetail').eq(j).find('.xj').css('width',singlebook[j].textKnowledge*widtha+'px');
					$('.totaldetail').find('.singledetail').eq(j).find('.sk').css('width',singlebook[j].readingComprehension*widtha+'px');	
					// $('.totaldetail').find('.singledetail').eq(j).find('.sktext').text(singlebook[j].readingComprehension*100+'%')	
				}
				//我在年级的测试详情
				
					var heighta=30;
					$('.MyStudyaverage-detail').find('.nandu li').eq(0).css({'background':'#649dce','height':(gradedetail[3].level*heighta/5)})
					$('.MyStudyaverage-detail').find('.nandu li').eq(0).find('span').css('bottom',gradedetail[3].level*heighta/5)
					$('.MyStudyaverage-detail').find('.nandu li').eq(1).css({'background':'#ed7d31','height':gradedetail[3].gradeLevel*heighta/5})
					$('.MyStudyaverage-detail').find('.nandu li').eq(1).find('span').css('bottom',gradedetail[3].gradeLevel*heighta/5)

					$('.MyStudyaverage-detail').find('.changshi li').eq(0).css({'background':'#649dce','height':gradedetail[0].generalKnowledgegMyScore*heighta/5})
					$('.MyStudyaverage-detail').find('.changshi li').eq(0).find('span').css('bottom',gradedetail[0].generalKnowledgegMyScore*heighta/5)
					$('.MyStudyaverage-detail').find('.changshi li').eq(1).css({'background':'#ed7d31','height':gradedetail[0].generalKnowledgegGradeScore*heighta/5})
					$('.MyStudyaverage-detail').find('.changshi li').eq(1).find('span').css('bottom',gradedetail[0].generalKnowledgegGradeScore*heighta/5)





					$('.MyStudyaverage-detail').find('.xidu li').eq(0).css({'background':'#649dce','height':gradedetail[2].textKnowledgeMyScore*heighta/5})
					$('.MyStudyaverage-detail').find('.xidu li').eq(0).find('span').css('bottom',gradedetail[2].textKnowledgeMyScore*heighta/5)
					$('.MyStudyaverage-detail').find('.xidu li').eq(1).css({'background':'#ed7d31','height':gradedetail[2].textKnowledgeScore*heighta/5})
					$('.MyStudyaverage-detail').find('.xidu li').eq(1).find('span').css('bottom',gradedetail[2].textKnowledgeScore*heighta/5)


					$('.MyStudyaverage-detail').find('.sikao li').eq(0).css({'background':'#649dce','height':gradedetail[1].readingComprehensionMyScore*heighta/5})
					$('.MyStudyaverage-detail').find('.sikao li').eq(0).find('span').css('bottom',gradedetail[1].readingComprehensionMyScore*heighta/5)
					$('.MyStudyaverage-detail').find('.sikao li').eq(1).css({'background':'#ed7d31','height':gradedetail[1].readingComprehensionGradeScore*heighta/5})
					$('.MyStudyaverage-detail').find('.sikao li').eq(1).find('span').css('bottom',gradedetail[1].readingComprehensionGradeScore*heighta/5)
				})
			}else{
				console.log('未获取到数据')
			}
				
			})
			

		},
		beforeCreate(){
			bus.$emit('loading')
		},

	}

</script>
<style lang="less">
@font-face {font-family: 'iconfont';
    src: url('../../../static/font/iconfont.eot');
    src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/iconfont.woff') format('woff'),
    url('../../../static/font/iconfont.ttf') format('truetype'),
    url('../../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.testdetail{
		width:100%;
		height:100%;
		// background: url('../../assets/images/exambg.jpg');
		background: rgba(255,255,255,.6);
		overflow:scroll;
			-webkit-overflow-scrolling: touch;
		 // background: linear-gradient(to top, #13274c 0%,#3499d1 100%);
		// overflow:hidden;
		.MyStudyaverage{
			height:70%;
			margin-bottom: 2rem;
			// border:1px solid red;
			p{
					height:45px;
					width:85%;
					margin:0 auto;
					font-size: 12px;

					// background: red;
					// line-height: 45px;
					span{
						display: inline-block;
						width:20px;
						height:20px;
						float: right;


					}
					&:first-child{
						margin-bottom: 10px;
						position: relative;
						top:10px;

						span{
							&:first-child{
								border-radius: 6px;
							background: #5b9bd5;	
							}
							&:nth-child(2){
								width:50%;
							position: relative;
							text-align: right;
							bottom:0;
							right:2%;

							}

							
						}
					}
					&:nth-child(2){
						span{
							&:first-child{
								border-radius: 6px;
							background: #ed7d31;	
							}
							&:nth-child(2){
								width:70%;
								position: relative;
								bottom:0;
								right:2%;
								text-align: right;
							}

							
						}
					}
				}
				// &>ul{
				// 	li{
				// 		float: left;
				// 	}
				// }
				.space-bottom{
					width:90%;
					height: 15px;
					// background: pink;
					background: #649dce;
					margin:0 auto;
					border-radius: 5px;
				}
				.testType{
					width:90%;
					margin:0 auto;
					display: flex;
					justify-content: space-around;
					// margin-left: 7%;
					li{
						width:20%;
						margin-top: 8px;
						// padding:.4rem 1rem;
						background: #5b9bd5;
						text-align: center;
						border-radius: 5px;
						height: 28px;
						width:70px;
						line-height: 28px;
						color:#fff;
					}

				}
			.MyStudyaverage-detail{
				width:80%;
				height: 55%;
				// margin-left:7%;
				margin:0 auto;
				// margin-top: 2rem;
				display: flex;
				-webkit-display:flex;
				justify-content: space-around;
				
				ul.zhuxingtu{
					width:15%;
					float: left;
					// background: #eee;
					position: relative;
					// bottom:-.4rem;
					li{
						width:50%;
						// height:50%;
						float: left;
						position: absolute;
						bottom:0;
						 // border-radius: 6px 6px 0 0;
						&:first-child{
							left:0%;

							
						}
						&:nth-child(2){
							right:0%;
							
						}
						span{
							display: inline-block;
							// width:100%;
							position: absolute;
							left:0;		
							text-align: center;
							color:#666;
					}
				}
				}
			}
		}
		h4{
			color:#fff;
			height:2.5rem;
			width: 90%;
			margin:2rem auto;
			line-height: 2.5rem;
			text-indent: 1.5em;
			// background: #3a74a6;
				background: #5b9bd5;
			// padding:.2rem;
			font-size: 14px;
			border-radius: 4px;
		}
		
		.totaldetail{
			color:#fff;
			height:auto;
			// overflow:scroll;
			// -webkit-overflow-scrolling: touch;
			margin-bottom: 1rem;
			
			ul.singledetail{
				width:90%;
				margin:1rem auto; 
				li{
					height: 28px;
					line-height:28px;
					border-bottom:1px solid rgba(0,0,0,.09);
					&:first-child{
						padding:.5rem 2rem;
						// background: #3a74a6;
						background: #649dcf;
						display: inline;
						text-align: center;
						color:#fff;
						margin-left: 0rem;
						border-radius: 4px;
						margin-top: 1rem;
					}

					&>p{	
						
						color: #3a74a6;
						height: 100%;
						display: inline-block;		
						// float: left;		
				}
				.iconfont{
					color: #77a6ce;
				}
				.headtype{
							// background: #fff;
						}
				.progressA{
					height: 1.2rem;
					width:50%;
					background: #eee;
					margin-left:1rem;
					margin-top: .3rem;
					border-radius: 5px;
					position: relative;
					span{
					display: inline-block;
					position: absolute;
					height:100%;
					border-radius: 5px;
					// background: #3a74a6;
					background: #5c9ad6;
					left:0;
					top:0;
					}
				}
			}
		}
}
		.myGrade{
			width:70%;
					margin-left:15%;
					text-align: center;
					background: #3a74a6;
					color:#fff;
					height:25px;
					line-height: 25px;
					border-radius: 4px;


		}
		.clickgoCourse{
				margin-top: 1rem;
				width:100%;
				margin-bottom: 1.5rem;
				height:33px;
				position: relative;
				bottom:1rem;
				a{
					display: inline-block;
					width:70%;
					height:100%;
					margin-left:15%;
					text-align: center;
					// background: #3a74a6;
					background:  #649dcf;
					color:#fff;
					// height:25px;
					line-height: 33px;
					border-radius: 5px;

				}
		}
		.chuxinSupport{
			// margin-top: 2rem;
			color:#333;
			// text-align:justify;
			// width:90%;
			font-size: 12px;
			text-align: center;
			margin:auto;
		}
}  

	
</style>