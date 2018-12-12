<template>
	<section id="banner1">
		<carousel :indicators="true" :auto="3000">
		    <!-- <div v-for="(i,index) in imgSrc" @click='goAdvise(index)'> -->
		    	<div v-for="(i,index) in imgSrc">
		        <img :src="i" alt="暂时找不到图片" :index='index'>
		    </div>
		</carousel>
	</section>
</template>
<script>
import Carousel from 'vue-m-carousel'
	export default {
		data(){
			return {
					imgSrc:[],
			}
		},
		props:{
			bannerImg:{type:Array}
		},
		methods:{
			// goAdvise(index){
			// 	if(this.imgSrc.length==3){
			// 		console.log('这是首页的banner');
			// 		let path = ['bannerA','bannerB','bannerC'];
			// 		this.$router.push({name:path[index],params:{id:index}})
			// 	}else{
			// 		console.log('这是club的banner')
			// 	}
			// },
		},
		components: {
        Carousel
    },
    watch:{
    	bannerImg:{
    		 deep: true,
           	 handler: function (news){
           	 	console.log(news);
           	 	this.imgSrc = news
           	 }
    	},
    },
		created(){	
			let routeName = this.$route.name;
			if(routeName == 'buyAndInvite'){
				console.log('这是购买邀请页面');
				this.imgSrc = [require('../assets/images/banner-one.jpg')];
			}else if(this.$route.name == 'qualityCourse'){
				console.log('qua');
				console.log(this.imgSrc)
				if(this.bannerImg.length==0){
					this.imgSrc  =  ['111']
				}else{
					this.imgSrc = this.bannerImg
				}
    		 	
    		 }else if(routeName == 'readIndex'){
				console.log('这是首页');
				this.imgSrc =  [require('../assets/images/_01.png'),require('../assets/images/_03.png')];
			}else if(routeName == 'myss'){
				this.imgSrc =  [require('../assets/images/banner-one.jpg'),require('../assets/images/banner-two.jpg'),require('../assets/images/bgstart.jpeg')];
			}
			let that = this;
			$(function(){
				$('.carousel-dot').text('');
				if(that.imgSrc.length == 1){
					$('.carousel-dot').hide();
				}
			});
		},
	}
</script>
<style lang='less'>
	#banner1{
		width:100%;
		height:170px;
		position: relative;
		.carousel-indicators{
			bottom:35px;
		}
		.carousel-dot{
			width:7px;
			height:7px;
			border-radius:50%;
			background: rgba(0,0,0,.05);
		}
		.active{
			background: #fff;
		}
		.carousel-item{
			&>div{
				width:100%;
				height: 100%;
				&>img{
				display:inline-block;
				width:100%;
				height: 100%;
			}
			}
			
		}	
	}
</style>