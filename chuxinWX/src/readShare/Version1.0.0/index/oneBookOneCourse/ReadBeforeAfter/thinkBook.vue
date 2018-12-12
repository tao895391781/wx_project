<template>
	<section id="thinkBook" v-show='showThis'>
		<p v-show='showNo'>
			暂无视频
		</p>
			<div class="video_play" v-show='!showNo && showVideo'>
				<video-player   ref="videoPlayer" id='videoP' class='video-player-box'
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata = "onPlayerLoadeddata($event)"
                	@timeupdate = "onPlayerTimeupdate($event)"
                	@canplay = "onPlayerCanplay($event)"
                 	@canplaythrough = "onPlayerCanplaythrough($event)"
                	@statechanged = "playerStateChanged($event)"
                	
              >
     			</video-player>
     	</div>
     	<h5></h5>
     	<img :src="contentImg" alt="暂无图片">
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				 playerOptions: {
			        start: 0,
			        playsinline: true,
			        muted: false,
			        language: 'zh-CN',
			        preload: 'auto',
			        playbackRates: [0.7, 1.0],
			        sources: [{
			          type: "video/mp4",
			          src: 'http://resource.wsreading.com:80/file/20160929/0037a3d9-98d1-466f-b64b-3738e82f4aeb/格列佛09.mp4'
			        }],
			        width: document.documentElement.clientWidth,
			        poster: require('../../../../../../static/logoPerson.png'),
			        controlBar: {
			         timeDivider: true,
			         durationDisplay: true,
			         remainingTimeDisplay: false,
			         fullscreenToggle: true  //全屏按钮
			       }
			      },
			      showNo:false,
			      showVideo:false,
			      contentImg:'',
			      showThis:false,


			}
		},
		methods:{
			onPlayerPlay(player) {
		      // console.log('开始播放!', player);
		     
		    },
		    onPlayerPause(player) {
		      // console.log('暂停!', player)
		    },
		    onPlayerEnded(player){
		      // console.log('播放结束！',player);
		    },
		    onPlayerLoadeddata(player){
		    	// console.log('1',player)
		    },
	        onPlayerTimeupdate(player){
	        	// console.log('2',player);
	        	let t1 = parseInt(player.cache_.currentTime);
       			 },
	        onPlayerCanplay(player){
	        	// console.log('3',player)
	        },
	        onPlayerCanplaythrough(player){
	        	// console.log('4',player)
	        },
	        playerStateChanged(player){
        		// console.log(player)
        	// }
        	},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			let id = this.$route.params.id;
			let type = 'video';
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingContentByType/'+id +'/'+ type)
			.then(res=>{
				bus.$emit('closeloading');
				console.log(res.data);
				if(res.data.flag == false){
					this.showNo = true;
					this.showThis = true;
				}else{
					let picAndVideo;
					res.data.contentPic == '' ? picAndVideo = res.data.url:picAndVideo = res.data.url +',' + res.data.contentPic;
					this.axios.get(this.ip.filePath+"rest/download/links?ids="+picAndVideo)
        			.then(res1 => {
        			console.log(res1.data);
        			this.playerOptions.sources[0].src = this.ip.filePath2+res1.data[res.data.url]['href'];
        			console.log(this.playerOptions.sources[0].src);
        			res.data.contentPic != ''?this.contentImg = this.ip.filePath2+res1.data[res.data.contentPic]['href'] : this.contentImg = '';
        			this.showVideo = true;
        			this.showThis = true;
        			});
        	}

			}).catch(err=>{
				console.log(err);
				bus.$emit('showErrs')
			});
		},
	}
</script>
<style lang="less">
	#thinkBook{
		width:100%;
		height:100%;
		h5{
			height:2rem;
			border-bottom:1px solid #eee;
		}
		img{
			min-width:100%;
		}
		p{
			text-align:center;
			padding:4rem 0;
		}
				.video-player{
						width:auto;
    					height: auto;

    					&>span{
    						position: absolute;
    						top:.5rem;
    						left:.5rem;
    						color:#fff;
    						display: inline-block;
    						width:10%;
    						height:2rem;
    						line-height: 2rem;
    						font-size: 2rem;
    						text-align: center;
    						border-radius: 3px;
    						background: rgba(0,0,0,.4);
    					}
					    &>div{
					      width: 100%;
					      height: auto;
					      .vjs-poster{
					        background-size: 50% auto;
     				 }
				      .vjs-big-play-button{
				        width: 1.8em;height: 1.8em!important;
				        line-height: 1.8em!important;
				        border-radius: .9em;
				        position: absolute;
				        left: 0;right: 0;top: 0;bottom: 0;
				        margin: auto!important;

				      }
			      video {
			        position: relative;
			        height: auto;
			      }
    }
  
			}
		
}
</style>