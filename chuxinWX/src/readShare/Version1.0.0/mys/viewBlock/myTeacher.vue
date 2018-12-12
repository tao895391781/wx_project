<template>
	<section id="myTeacher">
		<div class="myTeacher sameStyle">
   				<div>
   					<p>老师微信信息</p>
   					<div>
   						<img src="../../../../assets/images/teacher_code.jpg" alt="">
   					</div>
   					<p class="teacher_name">小小静老师</p>
   				</div>
   				<div>
   						提示：由于微信对加人有限制，可能会出现老师收不到好友请求的情况，如在24小时内老师还未通过好友申请，你可以隔天再发送一次吗？<i class="iconfont">&#xe630;</i>
   				</div>
   			</div>
		
	</section>
</template>
<script>
	export default{
		data(){
			return {

			}
		},
		methods:{},
		created(){},

	}
</script>
<style lang='less'>
#myTeacher{
	width:100%;
	height:100%;
	.myTeacher{
			&>div{
					margin:2rem auto 0;
				&>p{
					text-align: center;
					&:first-child{
						font-size:1.8rem;
						margin-bottom: .5rem;
						letter-spacing: 2px;
						font-weight: 700;
					}
				}
				&>div{
					width:15rem;
					height:15rem;
					margin: .3rem auto;
					border:1px solid rgba(158, 158, 158, 0.27);
					border-radius:10px;
					overflow: hidden;
					&>img{
						width:100%;
						height:100%;
					}
				}
				.teacher_name{
					font-size:1.6rem;
				}
				&:last-child{
					width:80%;
					font-size:1.4rem;
					line-height: 2rem;
					i{
						font-size:2rem;
						color:#795548;
					}
				}
			}
		}

}
	
</style>