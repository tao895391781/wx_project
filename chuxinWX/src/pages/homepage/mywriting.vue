<template>
	<div id="mywriting">		
		<section class="head">
			<md-icon class='md-size-2x back' @click.native="goback">reply</md-icon>
			<!-- <div><img :src='picIds' alt="loading"></div> -->
			<div>《{{bookname}}》</div>
		</section>
		<section class="content">
			<p>写作任务</p>
			<p>题目：{{name}}</p>
			<p>任务说明文案</p>
			<p>请提交word 文件至作文邮箱:<br><span>{{email}}</span><br>老师将在收到作文一周后批改反馈</p>
			<p @click='submit' :class="{grey:showcompelte}">{{submits}}</p>
			<p @click='watchWrite'>查看作文批改</p>
		</section>
		 <transition name="slide-fade">
		<div v-show='showWatch' class="showWatch">
			<!-- <i class="iconfont" @click='showWatch=false'>&#xe633;</i> -->
			<div>{{comment}}</div>	
		</div>
	</transition>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				bookname:'',
				picIds:'',
				name:'',
				email:'chuxinwangke@163.com',
				showWatch:false,
				flag:true,
				submits:'提交作文',
				change:false,
				showcompelte:false,
				comment:'',

			}
		},
		methods:{
			watchWrite(){
				console.log('查看作文批改');
				if(this.flag){
					this.showWatch=true;
					this.flag=false;
				} else if(!this.flag){
					this.showWatch=false;
					this.flag=true;
				}
				
			},
			submit(){
				if(this.showcompelte){
					return false;
				}else{


				let this_=this;
				let USERID=sessionStorage.getItem('i');
				let data={
             		userId:USERID,
             		type:'WRITE',
             		score:0,
             		foreignKey:this.$route.params.item.signId
				};
				 this.axios.post(this.ip.RESTPATH+'rest/point',data)
				 .then(res=>{
				 			console.log(res)

				 }) 
				 const typeMap={
     					'常识':'GeneralKnowledge',
      					'文本知识':'TextKnowledge',
      					'阅读理解':'ReadingComprehension'
   						 };
				 let postdata={
					userId:USERID.toString(),
					signId:this.$route.params.item.signId.toString(),
					questionResult:[],
       				type:'write',
					};		
				  postdata.questionResult[0]={
          				textAnswer:'11',
          				id:this.$route.params.item.id.toString(),
          				type:typeMap[this.$route.params.item.content_cls],
          				kind:'write',
          			};
          			console.log(postdata)
          			this.axios.post(this.ip.RESTPATH+'rest/postSignQuestioinResultByUserId',postdata)
          			.then(res=>{
          				console.log('提交的作文答案')
          				console.log(res)
          				this_.submits='已提交';
          				this_.change=true;
          				this_.showcompelte=true;
          			})

        				
				}
			},
			goback(){
				this.$router.go(-1)
	},
		},
		created(){
			console.log(this.$route.params.item)
				let this_=this;
				this.bookname=this.$route.params.item.bookName;
				this.name=this.$route.params.item.name;
				var picIdss=this.$route.params.item.picId;
				this.showcompelte=this.$route.params.item.flag;
				this.comment=this.$route.params.item.comment;
				if(this.showcompelte){
					this.submits='已提交';
					this.showcompelte=true;
				}
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+picIdss).
				then(res=>{
					console.log('获得的图片地址')
					// console.log(res.data)
					for(var v in res.data){
						console.log(v)
						this_.picIds=this_.ip.filePath1+res.data[v]['href'];
						console.log(this_.picIds)
					}
				})
		},
		// computed:{
		// 	showcompelte(){
		// 		return this.$route.params.item.flag;
		// 	}
		// }
	}
</script>
<style lang='less'>
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
#mywriting{
	.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, .5);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
		.head{
			width:100%;
			height:6.5rem;
			background: rgba(0,0,0,.01);
			// margin-bottom: 6.5rem;
			.back{
				float: left;
				height:100%;
				line-height: 6.5rem;
				width:28%;
				text-align: center;
				color:#26c694;
			}
			div{
				float: left;
				height:100%;
				line-height: 6.5rem;
				text-align: center;
				&:nth-child(2){
					width:50%;
					font-size: 1.8rem;
					letter-spacing: 2px;

					img{
						display: inline-block;
						width:100%;
						height:100%;
					}
				}
				&:nth-child(3){
					width:50%;
					text-align: center;
					letter-spacing: 2px;
					font-size: 1.8rem;
				}
			}
		}
		.content{
			p{
					padding:.6rem ;
					font-size: 1.7rem;
					border-radius: 5px;
					text-align: center;
					
				&:first-child{
					background: #5b9bd5;
					color:#fff;
					width:50%;
					margin:1.5rem auto 1rem;
					font-size: 2rem;
					// text-align: center;
					letter-spacing: 2px;
					
				}
				&:nth-child(2){
					width:95%;
					background: rgba(0,0,0,.008);
					margin:0 auto;
				}
				&:nth-child(3){

					width:95%;
					background: rgba(0,0,0,.008);
					margin:1rem auto .3rem;
				}
				&:nth-child(4){
					width:95%;
					background: rgba(0,0,0,.008);
					margin:0 auto;
					line-height: 2.4rem;
					span{
						color:#ad9292;
						font-size: 2rem;
					}
				}

				&:nth-child(5),&:last-child{
					background: #26c694;
					color:#fff;
					width:50%;
					margin:3rem auto;
					font-size: 1.8rem;
					text-align: center;
					letter-spacing: 2px;	
				}
				&.grey{
				background:#eee;
				color:#999;
			}
				


			}



		}
		.showWatch{
			position: fixed;
			width:90%;
			height:50%;
			left:5%;
			top:7rem;
			background:#eee;
			border-radius: 8px;
			.iconfont{
				float: right;
				margin:1rem;
				font-size: 2rem;
				color:#975f5f;
			}
			div{
				position: absolute;
				width:80%;
				height:90%;
				margin:5% 10%;
				text-align: center;
			}
		}
}

	
</style>