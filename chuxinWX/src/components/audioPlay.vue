<template>
	<section id="audioPlay">
		<div>
			<audio ref="audio" id="audio">
				<source :src="audioUrl" type="audio/mpeg">
			</audio>
			<div class="controls">	
				<div id="pgs">
					<span>{{transTime(playTime)}}</span>
					<p class="plays"><span id='drag'></span></p>
					<p class="buffered"></p>
					<p class="Noplays"></p>
					<span>{{transTime(totalTime)}}</span>
				</div>
				<div>
					<button @click='reloadAudio'><i class="iconfont">&#xe615;</i></button>
					<button @click='Play' id="player">
						<i class="iconfont" v-show='ifplay'>&#xe739;</i>
						<i class="iconfont" v-show='!ifplay'>&#xe64f;</i>
					</button>
					<button @click='endAudio'><i class="iconfont">&#xe616;</i></button>
				</div>
			</div>
			<p class="clickBegin" v-show='ifplay'>点击开始</p>
		</div>
	</section>
</template>
<script>
import {bus} from '../bus.js'
	export default{
		data(){
			return {
				flag:true,
				totalTime:0,
				playTime:0,
				ifplay:true,
			    showAudioOrVideo:false,
			    preAudiodata:{},
			    showThis:false,
			    posStart:'',
			    posEnd:'',
			    posMove:'',
			    ifPlayEnd:false,
			    clickEnd:false,
			}
		},
		props:['audioUrl'],
		methods:{
			sendPlayTime(time){
				console.log(time)
				this.$emit('getPlayTime',[time,this.ifplay,this.totalTime]);
				if(time>0){
					bus.$emit('closeTipsStatus');
				}
			},
			Play(){

				console.log(this.$refs.audio.paused)
				if(this.flag){
					if(this.clickEnd){
						this.$refs.audio.currentTime = 0;
						this.playTime = this.$refs.audio.currentTime ;	
						$('#pgs').find('.plays').css('width', 0);
				}
					this.$refs.audio.load();
					this.$refs.audio.play();
					console.log(this.$refs.audio.played)
					this.flag = false;
					this.ifplay = false;
					bus.$emit('showTipsStatus','正在加载...')
				}else{
					this.$refs.audio.pause();
					this.flag = true;
					this.ifplay = true;	
				}	
			},
			reloadAudio(){
				this.$refs.audio.currentTime = 0;
				this.flag = true;
				this.$refs.audio.pause();
				this.ifplay = true;
				
			},
			endAudio(){
				this.$refs.audio.currentTime = this.totalTime;
				console.log(this.$refs.audio.paused)
				setTimeout(function(){
					this.$refs.audio.currentTime  = 0;
					this.$refs.audio.pause()
				}.bind(this),1000)
				
				this.clickEnd = true;
				this.ifplay = true;
				this.flag = true;
			
			},
			transTime(s){
				let hour = Math.floor(s/3600);
	            let min = Math.floor(s/60) % 60;
	            let sec = Math.floor(s % 60);
	            if(hour==0){
	            	return (min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }else{
	            	return (hour>9?hour:'0'+hour)+':'+(min>9?min:'0'+min)+':'+(sec>9?sec:'0'+sec);
	            }	
			},
			audioEnded(){
		  	  			let audio =this.$refs.audio;
		  	  			audio.currentTime = 0;
				   		audio.pause();
				   		console.log('播放完了')
				   		this.flag = true;
				   		this.ifplay = true;	
				   		this.ifPlayEnd = true;	    
		    			},
		   	 updateProgress(){
						console.log('更新')
						let audio  = this.$refs.audio;
						let value = Math.round((Math.floor(audio.currentTime) / (Math.round(audio.duration))* 100), 0);
		    			this.playTime =Math.floor(audio.currentTime);
		     			$('#pgs').find('.plays').css('width', value * 1 + '%');
		     			this.sendPlayTime(this.playTime);
		     			let buffered, percent;
						// 已缓冲部分
						audio.readyState == 4 && (buffered = audio.buffered.end(0));
						// 已缓冲百分百
						audio.readyState == 4 && (percent = Math.round(buffered / audio.duration * 100) + '%');
						$('#pgs').find('.buffered').css('width',percent );
						console.log(percent);
						}
		},
		watch: {
     	 	audioUrl(newUrl) {
     	 		console.log(newUrl)
       	 		this.$refs.audio.src = newUrl
      			}
    		},
    		beforeRouteLeave (to, from, next){
 			this.$refs.audio.removeEventListener('ended',this.audioEnded,false);
			this.$refs.audio.removeEventListener('timeupdate',this.updateProgress,false);

	    	next()  
	},
		created(){
			bus.$on('player',()=>{
				this.flag = false;
				this.ifplay = false;
			});
			bus.$on('pause',()=>{
				this.flag = true;
				this.ifplay = true;
			})
				},	
			mounted(){
					this.$refs.audio.addEventListener('ended',this.audioEnded,true);
					let that =this;
			$(function(){
				//监听点击到特定位置播放事件
				$('#pgs').on('click',function(event){
					let clickW = event.offsetX;
					let w = $('#pgs').width();
					that.$refs.audio.currentTime = that.totalTime * clickW / w;
					console.log(that.$refs.audio.currentTime);
					that.$refs.audio.play();
					that.ifplay = false;
					that.flag = false;
					});
					//拖动播放
					$('#drag').on('touchstart',function(e){
						that.posStart = event.touches[0].pageX;
						});
					$('#drag').on('touchmove',function(event){
						that.posMove = event.targetTouches[0].pageX;
						});
					$('#drag').on('touchend',function(event){
						that.posEnd = event.changedTouches[0].pageX;
						let l = parseInt(that.posEnd - that.posStart);
						that.$refs.audio.currentTime += l;
						that.$refs.audio.play();
						that.ifplay = false;
						that.flag = false;
						});
					$('#audio').on("loadedmetadata",function(){

						that.totalTime  = this.duration;
						this.currentTime = .5;
						console.log(this.duration)
						});
					$('#player').click(function(){
						$('#audio').get(0).addEventListener('ended',that.audioEnded,false);
						$('#audio').get(0).addEventListener('timeupdate',that.updateProgress,false);
					})
					$('#pgs').click(function(){
						$('#audio').get(0).addEventListener('ended',that.audioEnded,false);
						$('#audio').get(0).addEventListener('timeupdate',that.updateProgress,false);
					})
					
			
					});

				},
			}
</script>
<style lang="less">
	#audioPlay{
		width:100%;
		height:100%;
		.clickBegin{
			text-align: center;
			margin-top: 1rem;
		}
			.controls{
				margin-top: 1rem;
				&>div{
					width:100%;
					/*margin-top: 1rem;*/
					display:inline-block;
					&:first-child{
					width:60%;
					margin-left:20%;
					position:relative;
					height:2rem;
					&>p{
						display:inline-block;
						position:absolute;
						background:rgba(0, 0, 0, 0.06);
						height:.2rem;
						border-radius:3px;
						width:100%;
						left:0;
						top:0.9rem;		
					}
					.plays{
						background:#f60;
						width:0;
						z-index:999;

						span{
							display:inline-block;
							width:12px;
							height:12px;
							border-radius:50%;
							background:#f60;
							position:absolute;
							right:-10px;
							top:-5px;
						}
					}
					.buffered{
						width:0;
						background:#ddd;
						z-index: 888;
						}
					&>span{
						display:inline-block;
						position:absolute;
						width:3rem;
						text-align:center;
						line-height:2rem;
						top:0;
						font-size:1.3rem;
						&:first-of-type{
							left:-4rem;
							}
						&:last-of-type{
							right:-4rem;
							}
						}
					}
					&:last-child{
						display:-webkit-flex;
						display:flex;
						justify-content:center;
						margin-top: 1rem;
						button{
							width:20%;
							background:transparent;

							i{
								font-size:2rem;
								color:#409eff;
							}
							&:nth-child(2){
								i{
									font-size:3rem;
										}	
									}
								}

							}

						}	
		}
	}
</style>