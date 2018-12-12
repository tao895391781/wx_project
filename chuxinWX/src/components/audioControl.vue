<template>
	<section id="audioControl">
		<audio :src="src" ref='audio'></audio>
		<p class="control" ref='control' @click='paly'>
				<i class="iconfont i3">&#xe6de;</i>
				<i class="iconfont i2" >&#xe684;</i>
			<span v-show='isIos'>{{parseInt(totalTime)+"''"}}</span>
		</p>
	</section>
</template>
<script>
import {OtherPause} from '../config.js'
	export default {
		data(){
			return {
				totalTime:0,
				changePlayColor:false,
				isIos:false,
				showthis:true

			}
		},
		props:['src'],
		methods:{
			paly(){
				let vid = this.$refs.audio;
				if(vid.paused){
					vid.play();
					this.isIos = true;
				}else{
					vid.pause();
					$('audio').siblings('.control').removeClass('playbg');
					$('audio').siblings('.control').find('.i3').removeClass('i1');
		        	$('audio').siblings('.control').find('.i2').removeClass('i4');
				}
			

			},
			pauseOters(){
				let vid = this.$refs.audio;
				if(vid.paused){
					vid.play();
					this.flag = false
				}else{
					vid.pause();
					this.flag = true
				}

			},
			audioEnded(){
				let vid = this.$refs.audio;
				vid.currentTime = 0;
				this.flag = false
				$('audio').siblings('.control').removeClass('playbg');
				$('audio').siblings('.control').find('.i3').removeClass('i1');
		        $('audio').siblings('.control').find('.i2').removeClass('i4');
			},
				
		},
		created(){
			var u = navigator.userAgent;
          	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          	if(isiOS){
          		console.log('ios终端');
          		this.isIos = false;
          	}else{
          		console.log('android终端');
          		this.isIos = true;
          	}
			},
		watch:{
			totalTime(news){
				this.totalTime = news;
			},
			src(){
				if(this.src){
				let vid = this.$refs.audio;
				let this_ = this;
				vid.addEventListener("canplay",function(){
				this_.totalTime = this.duration;
				// let width = 0;
				// width = (this.duration)/(60*20)
				// this_.$refs.control.style.width = (40+width*100)+'%';
				})
				}
			},
		},
		beforeRouteLeave(to,from,next){
			
			next();
		},
		mounted(){
			let vid = this.$refs.audio;
			let this_ = this;
			vid.addEventListener("canplay",function(){
			this_.totalTime = this.duration;
			// let width = 0;
			// width = (this.duration)/(60*20)
			// this_.$refs.control.style.width = (40+width*100)+'%';
			})
			vid.addEventListener('ended',this.audioEnded,false);
		},
	}
</script>
<style lang='less'>
#audioControl{
	width:100%;
	padding:.5rem 0;
	.control{
			width: 80%;
			height: 3.5rem;
			position:relative;
			padding:.2rem auto;
			background: #fff;
			border-radius: 4px;
			line-height: 3.5rem;
			background: #f2f2f2;
			border:1px solid #fff;
			b{
				display: inline-block;
				width:3rem;
				height:3rem;
				background: red;
				border-radius: 50%;
			}
			i{
				position:absolute;
				left:.5rem;
				top:0;
				color:#e91e63;
				
			}
			span { 
				display:inline-block;
				width:3rem;
				height:100%;
				top:0;
				right:0rem;
				line-height:3.5rem;
				position:absolute;
				color:#9e9e9e;
			}						
		}
		.playbg{
			background: #8bc34a;
			i{
				color:#fff;
			}
			span{
				color:#fff;
			}
		}		
		.i1{
			display: none;
		}
		.i2{
			display: none;
		}	
		.i4{
			display: block;
		}	
		.changePlayColor{
			-webkit-animation: changePlayColor 1s ease infinite;
			animation: changePlayColor 1s ease infinite;
		}

}
@keyframes changePlayColor{
	0%{
		color:rgba(255,255,255,.3);
	}
	50%{
		color:rgba(255,255,255,.6);
	}
	100%{
		color:rgba(255,255,255,1);
	}
}

</style>