<template>
       <section id="audioRecord">
	        <div ref="audio" v-for='(item,index) in audioList1' >
		 		<audio  :src="item.src" ref='aud'>
		   		</audio>	
	      		<div id="control">
	      		  <!--  <img src="../assets/iconfont/record1.svg"  @click="play(index)" v-show="item.flag" class="img2"/>
	      		   <img src="../assets/iconfont/record.svg"  @click="pause(index)" v-show="!item.flag" class="img1" /> -->
	      		   <!-- <div id="psg">
	      		   		<p class="plays"></p>
	      		   		<p class="buffered"> </p>
	      		   		<p class="Noplays"></p>
	      		   </div> -->
					<p @click="play(index)" v-show="item.flag">
						<span>
							<i class="iconfont">&#xe6de;</i>
						</span>
						点击收听
					</p>
					<p @click="pause(index)" v-show="!item.flag">
						<span>
							<i class="iconfont">&#xe684;</i>
						</span>
						正在收听
					</p>
	      		   <span>{{item.TotalTime}}s</span>
	      		  <i class="iconfont img3" @click="deleteRecord(index)" >&#xe653;</i>
	      		</div>
			</div>
	</section>
</template>
<script>

import {bus} from '../bus.js'
	export default {
		data(){
			return {
					position: 0,
					isIos:true,
					indexs:-1,
			}
		},
		props:['audioUrl','index'],
		methods:{
			deleteRecord(index){
				this.$refs.audio[this.position].children[0].pause();
				// this.$refs.audio[this.position].children[0].currentTime = 0;
				// this.$refs.audio[this.position].children[1].children[2].children[1].style.width = 0 + '%';
    //             this.$refs.audio[this.position].children[1].children[2].children[0].style.width = 0 + '%';
                this.$refs.audio[this.position].children[0].removeEventListener('timeupdate',this.updateProgress,false);
                this.$refs.audio[this.position].children[0].removeEventListener('ended',this.audioEnded,false);
				this.audioUrl[this.position].flag = true;
				this.position = 0
                this.audioUrl.splice(index,1)
			},
			pause(index){
                 this.$refs.audio[index].children[0].pause();
                 this.audioUrl[index].flag = true
			},
			play(index){
				this.isIos = true;
				this.indexs = index;
				if (index != this.position) {
					this.$refs.audio[this.position].children[0].pause()
					this.audioUrl[this.position].flag = true	
				}
				// this.$refs.audio[this.position].children[1].children[2].children[1].style.width = 0 + '%';
    //             this.$refs.audio[this.position].children[1].children[2].children[0].style.width = 0 + '%';
				this.$refs.audio[this.position].children[0].removeEventListener('timeupdate',this.updateProgress,false);
                this.$refs.audio[this.position].children[0].removeEventListener('ended',this.audioEnded,false);
				
				this.audioUrl[index].flag = false
			    this.position = index;
				this.$refs.audio[index].children[0].play()
                this.$refs.audio[index].children[0].addEventListener('timeupdate',this.updateProgress,false);
                this.$refs.audio[index].children[0].addEventListener('ended',this.audioEnded,false);
			},
            //将秒转化成时分秒的形式
			transTime(s){
	            // let min = Math.floor(s/60) % 60;
	            let sec = Math.floor(s % 60);
	            return (sec>9?sec:sec);
			},
			//更新播放条
			updateProgress(){
			    let value =  Math.round((Math.round(this.$refs.audio[this.position].children[0].currentTime) / Math.round(this.audioUrl[this.position].totalTate) * 100), 0)
				// this.audioUrl[this.position].currentTime = this.$refs.audio[this.position].children[0].currentTime
				// this.$refs.audio[this.position].children[1].children[2].children[0].style.width =  value * 1 + '%';
				// let buffered, percent;
				// this.$refs.audio[this.position].children[0].readyState == 4 && (buffered = this.$refs.audio[this.position].children[0].buffered.end(0));
				// this.$refs.audio[this.position].children[0].readyState == 4 && (percent = Math.round(buffered / this.audioUrl[this.position].totalTate * 100) + '%');
    //             this.$refs.audio[this.position].children[1].children[2].children[1].style.width = percent;
			},
			//播放完成
			audioEnded(){
		  	  	let audio =this.$refs.audio[this.position].children[0];
				audio.pause();
				this.$refs.audio[this.position].children[0].currentTime = 0;
				this.audioUrl[this.position].flag = true
				this.$refs.audio[this.position].children[0].removeEventListener('timeupdate',this.updateProgress,false);
                this.$refs.audio[this.position].children[0].removeEventListener('ended',this.audioEnded,false);  
		    },
		    iosOrAndroid(){
		    	var u = navigator.userAgent;
	          	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	          	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	          	if(isiOS){
	          		console.log('ios终端');
	          		return false;
	          	}else{
	          		console.log('android终端');
	          		return true;
	          	}
		    },
			    
		},
		mounted (){
            bus.$on('stopRecording',()=>{
				this.pause(this.position);
			});
			// let vid = this.$refs.aud;
			// console.log(vid);
			// vid.addEventListener('play',function(){
			// 	vid.forEach(v=>{
			// 		if(v.paused){
			// 			v.play();
			// 		}
			// 	})
			// })

		},
		computed: {
			audioList1 : function(){
				console.log(11)
				if(this.audioUrl.length != 0){
				this.$nextTick(function () {
					var _this = this
					for (let i=0; i < this.audioUrl.length; i++) {
						this.$refs.audio[i].children[0].oncanplay= function () {
						_this.audioUrl[i].totalTate = this.duration;
						_this.audioUrl[i].id = i;
						_this.audioUrl[i].flag = true;
						_this.audioUrl[i].currentTime = 0;
                    	}
				    }
				})
				return this.audioUrl
			}
		}
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
	}
</script>
<style lang='less'>
	#audioRecord {
		margin-top: 1rem;
		width: 100%;
		/*height: 20%;*/
		#control {
			width:85%;
		    height:3.5rem;
		    margin:0 auto .5rem;
            background: #eee;
            position: relative;
            border-radius: 3px;
            .img2 {
            	width:2rem;
            	height: 2rem;
            }
            .img1 {
            	width:2rem;
            	height:2rem;
            }
			#psg{
				width: 50%;
				height: .2rem;
				position:relative;
				margin-left: .8rem;
				margin-top: .8rem;
				p { 
					display:inline-block;
					position:absolute;
					background:rgba(0, 0, 0, 0.06);
				}
				.Noplays {
					display: inline-block;
					width: 100%;
					height:.2rem;
					z-index: 20;
				}
				.plays{
					display: inline-block;
					background:#f60;
					height:.2rem;
					width:0;
					z-index:999;
				}
				.buffered{
					display: inline-block;
					width: 0;
					height:.2rem;
					background-color: #ddd;
					z-index: 888;
				}
			}
			&>span{
			    margin-left: .5rem;
			    font-size: 1.4rem;
			    line-height: 3.5rem;
			    float: right;
			    margin-right: 1.5rem;
			}
			&>p{
				line-height: 3rem;
				font-size: 1.4rem;
				position: absolute;
				width:100%;
				height:100%;
				left:0;
				top:0;
				span{
					display: inline-block;
					width:2.5rem;
					height:2.5rem;
					margin:.4rem 1rem;
					background: #e91e63;
					border-radius: 50%;
					line-height: 2.5rem;
					text-align: center;
					color:#fff;
					i{
						font-size: 1.4rem;
					}
				}
			}
			.img3 {
				position: absolute;
            	width:2rem;
            	height:2rem;
            	right:-1rem;
            	top:-1rem;
            	font-size: 2rem;
            	color:#9e9e9e;
           }
			
		}
	}

</style>