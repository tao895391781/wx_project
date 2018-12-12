<template>
	<section id="bannerA">
		<header>
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>banner2</div>
		</header>
	</section>
</template>
<script>
	export default {
		data(){
			return {

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
	#bannerA{
		width:100%;
		height:100%;
		&>header{
			height:43px;
				background:rgba(255, 255, 255, .87);
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