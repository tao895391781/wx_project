<template>
	<section id="readbeforeAfterView">
		<header>
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>{{title[$route.name]}}</div>
		</header>
		<router-view></router-view>
	</section>
</template>
<script>
	export default {
		data(){
			return {
				title:{
					whyRead:'为什么读这本书',
					thinkBook:'五分钟了解这本书',
					withQuest:'带着问题去阅读',
					testread:'测测我的阅读效果',
					myThink:'我的思考与回答',
					myEvaluate:'发表评价'
				}

			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
		},
		created(){},
	}
</script>
<style lang="less">
	#readbeforeAfterView{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		header{
			height:43px;
			margin-bottom: 1px;
			border-bottom:1px solid #eee;
			div{
				display:inline-block;
				background:rgba(255, 255, 255, .87);
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
			}
		}
}
</style>