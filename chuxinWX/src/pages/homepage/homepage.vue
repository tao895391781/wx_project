<template>
<div id="homepage">
	<header>
		<span>
			<img src="../../assets/images/logo.png" >
		</span>
		<span>
			<!-- <img src="../../assets/images/dollar.png" >
			<b>x{{score}}</b> -->
		</span>
	</header>
	<div class="banner">
		<banner-component :imglist="images"></banner-component>
	</div>
	<!-- <div class="banner">

			<img :src="item" v-for="(item,index) in images"  :class="{'enter':index==currentIndex}" v-if="index==currentIndex">
		
	    <p>
	    	<span v-for="(item,index) in images" v-bind:class="{active:index==currentIndex}" @click="switchBanner(index)"></span>
	    </p>
	</div> -->
	<div class="currentExam">
		<div class="nowrite" v-show='ifwrite'>暂无布置作文^_^</div>
		<p class="myatr" v-show='!ifwrite'>我的作文</p>
		<div class="items" v-for="(item,index) in writingItem" @click="godetail(item)" >	
			<p>
				<span>-{{index+1}}-</span>
				<span>《{{item.bookName}}》</span>
			<!-- 	<span></span> -->
			</p>
			<i class="icon iconfont icon-yiwancheng" v-if="item.finished"></i>
		</div>

	</div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { bus } from '../../bus.js'
import bannerComponent from '../../components/banner.vue'
export default {
	data() {
	  	return {
			score:'',
			signExam:"",
			images: [require('../../assets/images/banner-one.jpg'),require('../../assets/images/banner-two.jpg')],
			currentIndex:0,
			interval:'',
			writingItem:'',
	  	}
	  },
	methods: {
	  	godetail(item){
	  		this.$router.push({name:'mywriting',params:{
	  			item:item,
	  		}
	  	})
	  },
	  	switchBanner(index){
	  		clearInterval(this.interval);
	  		this.currentIndex=index;
	  		setTimeout(function () {
	  			this.interval=setInterval(function () {
	  				if(this.currentIndex==0){
	  					this.currentIndex=1;
	  				}else{
	  					this.currentIndex=0;
	  				}
	  			}.bind(this),4000);
	  		}.bind(this),2000)
	  	},
	  	...mapActions({
	  	  getQuestion: 'getQuestion',
	  	  saveItem:'saveItem',
	  	})
	},
	components:{
	  bannerComponent
	},
    beforeCreate:function () {
      bus.$emit('loading')
    },
    computed:{
    	ifwrite(){
    		return this.writingItem.length==0?true:false;
    	}
    },
	created:function () {
		let this_=this;
		let userId=sessionStorage.getItem('i');
		console.log(userId)
		this.axios.get(this.ip.RESTPATH+'rest/getWriteQuestionByUserId/'+userId)
		.then(res=>{
			bus.$emit('closeloading')
			console.log('获取的作文题目')
			console.log(res)
				this.writingItem=res.data;
		})
	}
}
</script>
<style lang='less' >
	#homepage{
		width: 100%;height: 100%;
		header{
			display: -webkit-flex; /* Safari */
			display: flex;
			width: 100%;
			height: 17%;
			padding: 20px 10px;
			fles-warp:nowrap;
			flex-direction:row;//主轴的方向
		    justify-content:space-between;
		    align-items:center;
			span{
				height: 80%;
				display: inherit;
				align-items:center;
				&:nth-child(1){
					width: 35%;
					img{
						height: 100%;
					}
				}
				&:nth-child(2){
					min-width: 20%;
					img{
						width: 30px;
						height: auto;
					}
					b{
						color: #ffc000;
						font-size: 17px;
					}
				}
			}
		}
		.banner{
			width: 100%;
			height:20%;
			position: relative;
			img{
				width: 100%;
				height: 100%;
			}
			img.enter{
				animation:image-enter .8s ;
				animation-timing-function: linear;
				animation-direction:alternate;
				-webkit-animation:image-enter .8s  ; /*Safari and Chrome*/
				-webkit-animation-timing-function: linear;
				-webkit-animation-direction:alternate; /* Safari 和 Chrome */
			}
			p{
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: 0;
				z-index: 99;
				span{
					display: inline-block;;
					width: 15px;
					height: 15px;
					background-color: #c5c0c0;
					border-radius: 7.5px;
					margin-left: 3px;
					cursor: pointer;
					&.active{
						background-color: #2196f3;
					}
				}
			}
			@keyframes image-enter {
				0%{
					opacity: 0;
					width: 0;
				}
				100%{
					opacity: 1;
					width: 100%;
				}
			}
			@-webkit-keyframes image-enter {
				0%{
					opacity: 0;width: 0;
				}
				100%{
					opacity: 1;width: 100%;
				}
			}
		}
		.currentExam{
			height: 63%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			.myatr{
				width: 90%;
				margin: 1rem auto;
				font-size: 1.8rem;
			}
		.nowrite{
			text-align: center;
			width:100%;
			margin-top: 30%;
			font-size: 1.89rem;
			letter-spacing: 2px;
			
	}
			.items{
				width: 90%;
				margin: 1rem auto;
				height: 3rem;
				border-radius: .5rem;
				overflow: hidden;
				border:1px solid #eee;
				background: rgba(0,0,0,.01);
				position: relative;
				p:nth-child(1){
					// background: #f0ebeb;
					height: 3rem;
					text-align: left;
					line-height: 3rem;
					text-indent: 2em;
					font-size: 1.5rem;
					color: #6f6f6f;
					span:nth-child(2){
							margin-left: 2rem;
							display: inline-block;
							text-align: center;
					}
				}
				// p:nth-child(2){
				// 	height:3rem;
				// 	line-height: 3rem;
				// 	span{
				// 		float: left;
				// 		font-size: 1.4rem;
				// 		color: #6f6f6f;
				// 		text-align: center;
				// 	}
				// 	span.active{
				// 		color: red;
				// 	}
				// 	span:nth-child(1){
				// 		width: 20%;

				// 		b{
				// 			border: 1px solid #4bacc6;
				// 			padding: .6rem 1rem;
				// 			border-radius: .4rem;
				// 			font-weight: normal;
				// 		}
				// 	}
				// 	span:nth-child(2){
				// 		width: 60%;
				// 	}
				// 	span:nth-child(3){
				// 		width: 20%;
				// 		font-size: 3rem;
				// 	}
				// }
				i{
				  width: 10px;
				  height: 10px;
				  position: absolute;
				  right: 5rem;top: 6rem;
				  margin: auto;
				  font-size: 5rem;
				  color: red;
				  font-weight: 500;
				  opacity: .3;
				}
			}
		}
	}
</style>
