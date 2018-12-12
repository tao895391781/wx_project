<template>
	<section id="viewblock">
		<header>
				<div @click='gobacks'><i class="iconfont">&#xe655;</i></div>
				<div>{{title[$route.name]}}</div>
			</header>
		<router-view></router-view>		
	</section>
</template>
<script>
	export default{
		data(){
			return {
				title:{	editInfo:'编辑个人资料',
						myDate:'我的阅读日历',
						readTips:'阅读提醒设置',
						myTeacher:'我的老师',
						commonQst:'常见问题',
						myCourse:'我的课程',
						mySocre:'我的积分',
						myAchievment:'我的阅读成就',
						clubdetail:'营课详情'
					},

			}
		},
		methods:{
			gobacks(){
				this.$router.go(-1);
			},
		},
		created(){
			this.$parent.isFirst = false;
			
		},

	}
</script>
<style lang='less'>
#viewblock{
	width:100%;
	height:100%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	&>header{
			height:43px;
			background:rgba(255, 255, 255, .87);
			border-bottom:1px solid #eee;
			div{
				display:inline-block;
				float: left;
				height:100%;
				text-align:center;
				line-height:43px;
				color:#333;
				&:first-child{
					width:20%;
					text-align:left;
					text-indent:1em;
				}
				&:nth-child(2){
					width:60%;	
				}
				&:nth-child(3){
					width:20%;
					color:#f60;
				}
			}
		}
}
	
</style>