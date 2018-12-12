<template>
	<section id="readAdd">
		<div id="mainBlock" ref='mainBlock' >
			<p v-show='showP'>点击编辑你的个人海报</p>
			<canvas ref="canvas" v-show='showCanvas' :class='{imgAnimation:showCanvas}' @click='edit'></canvas>
			<img  :src="baseUrl" id="imgShow" v-show='!showCanvas' :class='{imgAnimation:!showCanvas}'>
		</div>
		<p v-show='!showCanvas'><i class="iconfont">&#xe6ed;</i>长按上图保存图片，或发送给朋友</p>
		<div class='selfSet' v-show='showSelfSet'>
			<p  @click='selfSelects'>
				<i class="iconfont">&#xe65b;</i><br>
				<span>自定义</span>
			</p>
			<div class="imgTouch">
				<img :src="im" alt="loading" v-for='(im ,index) in imgs'  @click='selectBg(index,"grow")'>
			</div>
			
		</div>
		<button class="backs" v-show='!showreRedits' :class="{animationBack:!showreRedits}" @click='goBack'>
			返回
		</button>
		<p v-show='!showreRedits' class="reEdit" @click='reRedits'>重新编辑</p>
		<div class="Smain" v-show='showSmain' ref='Smain' :class="{animtion:showSmain}">
			<div>
				<p>选择背景图</p>
				<ul class="Sbgc  common">
					<!-- <li @click='selfSelect'><i class="iconfont">&#xe638;</i></li> -->
					<li v-for='(im ,index) in imgs1' @click='selectBgs(index)'>
						<img :src="im" alt="loading">
					</li>
				</ul>
			</div>
			<div>
				<p>选择文本</p>
				<ul class="Stext common">	
					<li v-for='(t,index) in readCardData.sentence' @click='selectText'>
						<input type="radio" :id="index" :name='1' v-model='content.text' :value='t' :disabled="content.img1==''">
						<label :for="index">{{t}}</label>
					</li>
				</ul>
			</div>
			<div>
				<p>自定义文本</p>
				<ul class="seltText common">		
					<li @click='sign1 = true'><input type="text" v-model='text' placeholder="请输入文字(不得超过28字)" ref='inputs'></li>
				</ul>
			</div>
		</div>
		<div class="btn" v-show='showBtn' :class="{animations:showBtn}" >
			
			<button @click='cancle' v-show='!poster'>取消</button>
			<button @click='preWatch' v-show='!poster'>预览</button>
			<button @click='growPoster("dd")' v-if='poster' class="growposters">生成海报</button>
		</div>
		
		
	</section>
</template>
<script>
import { bus } from '../../../../../../bus.js'
	export default{
		data(){
			return {
				showThis:false,
				wxId:'',
				headimg:'',
				nickname:'',
				readCardData:[],
				imgs:[],
				imgs1:[],
				img1:'',
				baseUrl:'',
				showCanvas:true,
				showP:true,
				text:'',
				codes:require('../../../../../../assets/images/shareB2.jpg'),
				sText:'',
				showSmain:false,
				showBtn:false,
				flagC:true,
				content:{
					img:'',
					img1:'',
					text:'',
				},
				imgOnload:false,
				poster:false,
				showSelfset:true,
				showreRedits:true,
				sign1:false,
				b:4,
				share1L:0,
				width:0,
				height:0,
				ifSelf:false,
				descript:'',
				showSelfSet:true,
				bookNum:0,
				bookDay:0,
				bookTime:0,
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//自定义需先选择背景图片
			selectText(){
				if(this.content.img1 == ''){
					bus.$emit('tip','请先选择背景图');

				}else{
					this.sign1 = true;
				}
			},
			selfSelects(){
				this.ifSelf = true;
				this.content.text ='';
				this.showSmain=true;
				this.showBtn = true;
				this.poster=false;
				this.flagC = false;
			},
			cancle(){
				this.showSmain = false;
				this.flagC = true;
				this.showBtn = false;
			},
			growPoster(grow){
					//保存图片
					this.showP = false
					let canvas = this.$refs.canvas;
					let Imgdata = canvas.toDataURL('image/jpeg', 1);
					this.baseUrl = Imgdata;
					this.showBtn = false;
					this.showSelfset = false;
					this.showreRedits = false;
					this.showSmain = false;
					this.showCanvas = false;
					this.showSelfSet = false;
			},
			preWatch(){
				//自定义文本
				if(this.text!=''){
					if(this.text.length>40){
						bus.$emit('tip','自定义文字不能超过40字');
					}else if(this.content.img1==''){
						bus.$emit('tip','请选择背景图');
					}else{
						this.content.text = this.text;
						this.showSelfset = false;
						this.showSmain = false;
						this.poster = true;

					}		
				}else if(this.text=='' && this.content.text!=''){
						// this.content.text = this.text;
						this.showSelfset = false;
						this.showSmain = false;
						this.poster = true;
				}else if(this.text=='' && this.content.text==''){
						bus.$emit('tip','请编辑背景及文本');
				}
				this.text = '';		
			},
			reRedits(){
				this.showCanvas = true;
				if(this.ifSelf){
					this.showSmain  = true;
					this.poster = false;
				}else{
					this.poster = true;
				}
				
				this.showBtn  = true;
				// this.poster = false;
				this.showSelfset = true;
				this.showreRedits = true;
				this.content.text = '';
				this.showSelfSet = true;
			},
			edit(){
				if(this.flagC){
					this.showSmain = true;
					this.showBtn  = true;
					this.flagC = false;
				}else{
					this.showSmain = false;
					this.showBtn  = false;
					this.flagC = true;
				}
			},
			selfSelect(){
				let this_ =this;
				WX.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						console.log(res.localIds)
						let localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						 WX.uploadImage({
				              localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
				              isShowProgressTips: 1, // 默认为1，显示进度提示
				              success: function (res1) {
				              var serverPicId= res1.serverId; // 返回图片的服务器端ID
				               $http.post('postImageByImageId',{
				                        serviceId:serverPicId
				                      })
				               .then(function(res2){ 
				                if(res2.data.result=='fail'){
				                  bus.$emit('closeloading');
				                  bus.$emit('tip','上传失败请重新上传^_^')
				                }else{
				                	var imgId=res2.data.imageId.attachments[0].uuid;
				                 	this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgId)
				                 	.then(function(res5){
				                  	bus.$emit('closeloading');
				                  	console.log(res5)
				                  	this_.img1=this_.ip.filePath2+res5.data[imgId].href;
				                  	console.log(this_.img1)
				                 })
               				 }
               			})
               .catch(function(err){
                console.log(err);
               })
             },
             fail:function(fail){
              	console.log(fail)
            				 }
              			});
					}
				});
			},
			selectBg(index,grow){
				this.ifSelf = false;
				this.content.img1 = '';
				this.content.img = this.imgs[index];
				this.showCanvas = true;
				if(grow == 'grow'){
					this.showBtn = true;
					this.poster = true;
					this.sign1 = false;
				}else{
					this.sign1 = true;
				}
			},
			selectBgs(index){
				this.showCanvas = true;
				this.content.img = '';
				this.content.img1 = this.imgs1[index];
			},
			
			 circleImg(ctx, img, x, y, r) {
			 	 ctx.save();
			 	  var d =2 * r; 
			 	  var cx = x + r;
			 	  var cy = y + r;
			 	  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
			 	  ctx.clip(); 
			 	  ctx.drawImage(img, x, y, d, d);
			 	  ctx.restore(); 
			},
			Rect(x, y, w, h) {
    			return {x:x, y:y, width:w, height:h};
			},
			//canvas 绘制圆角
			drawRoundedRect(rect, r, ctx) {
				let Point = function(x, y){
    				return {x:x, y:y};
				};
			    let ptA = Point(rect.x + r, rect.y);
			    let ptB = Point(rect.x + rect.width, rect.y);
			    let ptC = Point(rect.x + rect.width, rect.y + rect.height);
			    let ptD = Point(rect.x, rect.y + rect.height);
			    let ptE = Point(rect.x, rect.y);
			    ctx.beginPath();  
			    ctx.moveTo(ptA.x, ptA.y);
			    ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
			    ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
			    ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
			    ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
				ctx.fill();
			 	ctx.strokeStyle = "#fff";
			    ctx.stroke();
			},
			//画一条直线
			drawLine(x1,y1,x2,y2,ctx){
				ctx.beginPath();
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);
				ctx.strokeStyle = "#9e9e9e";
				ctx.stroke();
			},
			//毫秒转换成天时分秒
			formatDuring(mss) {
				mss = mss * 1000;
			    let days = parseInt(mss / (1000 * 60 * 60 * 24));
			    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			    let seconds = (mss % (1000 * 60)) / 1000;
			    if(days == 0){
			    	return hours + "时"+ minutes +"分"+ seconds + "秒";
			    }else if(hours == 0){
			    	return minutes +"分"+ seconds +"秒";
			    }else{
			    	return days +"天"+ hours + "时" + minutes + "分" + seconds + " 秒 ";
			    }
			   
		},
	},

		created(){
			this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
			this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.$parent.showThis = true;
			let id = parseInt(this.$route.query.id1);
			let picid = '';
			let share1L = 0;
			this.axios.get(this.ip.RESTPATH+'rest/getReadingSignByReadingSignId/'+id+'?wxId='+this.wxId)
			.then(res=>{
				console.log(res.data)
				this.bookNum = res.data.booknum;
				this.bookDay = res.data.day;
				this.bookTime = this.formatDuring(res.data.totalTime)
				this.descript = '《'+res.data.bookName+'》'+'阅读第'+res.data.node+'天';
				if(res.data.sharePoster1 == null || res.data.sharePoster1 ==''){
					 picid = res.data.sharePoster2;
				}else{
					 picid = res.data.sharePoster1  + ',' +  res.data.sharePoster2;
				}
				
				let PicTotalL = picid.split(',').length;
				if(res.data.sharePoster1 == null || res.data.sharePoster1 ==''){
					 share1L= 0;
				}else{
					 share1L= res.data.sharePoster1.split(',').length;
				}
				
				let Img = [];

				this.axios.get(this.ip.filePath+"rest/download/links?ids="+picid)
        				.then(res2 => {	
        				picid.split(',').forEach(v=>{
        					Img.push(this.ip.filePath2+res2.data[v]['href'])
        				})
        				this.imgs = Img.splice(0,share1L);
        				this.imgs1 = Img;
        				bus.$emit('closeloading');
        				console.log(this.imgs)
        				
        			});
        				this.readCardData = res.data;
        				console.log(this.readCardData)
				})
			let that = this;
			$(function(){
				$('body').css({'height':$(window).height()});
				$('#mainBlock').height($('#mainBlock').width()*16/9)
				let canvas = $('canvas')
				that.width = $('#mainBlock').width() * that.b ;
				that.height = ($('#mainBlock').width()*16) /9 * that.b; 
				canvas.get(0).setAttribute('width',parseInt(that.width));
				canvas.get(0).setAttribute('height',parseInt(that.height));
			});
			//自定义分享此页面
			//分享给朋友的数据
			let AppMessagedata = {
			        title: '阅读海报', // 分享标题
			        desc: '每日分享，查看自己的阅读能力', // 分享描述
			        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			        imgUrl: this.content.img1, // 分享图标
			};
			//分享到朋友圈的数据
			let TimeLineData ={ 
			        title: '阅读海报', // 分享标题
			        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			        imgUrl: '', // 分享图标
			};
			// WX.ready(function () {   
			// //需在用户可能点击分享按钮前就先调用
			//     WX.updateAppMessageShareData(AppMessagedata, function(res) { 
			// 		//这里是回调函数 
			// 	}); 
			//     WX.updateTimelineShareData(TimeLineData, function(res) { 
			// 		//这里是回调函数 
			// 	}); 
			// });
		},
		watch:{
			baseUrl(){
				bus.$emit('closeloading');
			},
			 content: {
             deep: true,
           	 handler: function (news){
           	 	console.log(news)

				bus.$emit('loading')
				let that = this;
				// that.nickname = '小小静文升阅行社aaaaa';
				$(function(){
					//画布放大倍数是使图像清晰
					let canvas = that.$refs.canvas;
					let width = that.width;
					let height = that.height;
					let ctx = canvas.getContext('2d');
					//背景图
					let imgs = new Image();
					//头像
					let headImg = new Image();	
					//二维码
					let code = new Image();
					let textFontWidth = 0;
					let lineWidth = 0;
					let textX = 40;
					let textY =80;
					let textI = 0;
					//头像和昵称的宽度
					let nameAndheadImgWidth = 0;	
					ctx.fillStyle = '#fff';
					ctx.fillRect(0,0,width,height);
					imgs.setAttribute("crossOrigin", "anonymous");
					headImg.setAttribute("crossOrigin", "anonymous");
					code.src = that.codes;	

					headImg.onload=function(){
						// that.circleImg(ctx, headImg,width*.05, height*.58, 25*that.b);
					}
					ctx.save();
					ctx.restore();
						imgs.onload = function(){
							ctx.drawImage(imgs,0,0,width,height);
							ctx.fillStyle = '#fff';
							//描述信息
							ctx.font = "50px '字体','微软雅黑','宋体'";
							ctx.textAlign = 'center';
							//计算昵称的宽度
							//画数据矩形区域
							let rect = that.Rect(width*.05,height*.58,(width) *.9,height *.2);
							that.drawRoundedRect(rect,30,ctx);
							ctx.textAlign = 'left';
							ctx.font = " 50px '字体','微软雅黑','宋体'"; 
							ctx.fillStyle = '#000';	
							ctx.fillText(that.nickname, width*.25, height*.63);
							ctx.textAlign = 'center';
							ctx.font = " 35px '字体','微软雅黑','宋体'";
							ctx.fillStyle = '#666';	
							ctx.fillText('刚刚在[文升阅读]上完成了打卡', width*.51, height*.66);
							that.drawLine(width*.1,height*.68,width*.9,height*.68,ctx);
							//阅读数据
							ctx.fillStyle = '#0a0a0a';	
							ctx.font = " 35px '字体','微软雅黑','宋体'";
							ctx.fillText('累计阅读', width*.2, height*.71);
							ctx.font = " 50px '字体','微软雅黑','宋体'";
							ctx.fillText(`${that.bookDay}天`, width*.2, height*.76);
							ctx.font = " 35px '字体','微软雅黑','宋体'";
							ctx.fillText('累计时长', width*.52, height*.71);
							ctx.font = " 50px '字体','微软雅黑','宋体'";
							ctx.fillText(`${that.bookTime}`, width*.52, height*.76);
							ctx.font = " 35px '字体','微软雅黑','宋体'";
							ctx.fillText('已读完', width*.82, height*.71);
							ctx.font = " 50px '字体','微软雅黑','宋体'";
							ctx.fillText(`${that.bookNum}本`, width*.82, height*.76);

							//画二维码矩形区域
							let rect1 =  that.Rect(width*.05,height*.8,(width) *.9,height *.15);
							ctx.fillStyle = '#fff';
							that.drawRoundedRect(rect1,30,ctx);
							ctx.font = " 40px '字体','微软雅黑','宋体'"; 
							ctx.fillStyle = '#111';
							ctx.fillText('文升阅读', width*.18, height*.835);
							ctx.fillStyle = '#333';
							ctx.fillText('最专业的青少年名著阅读', width*.335, height*.87);
							let rect3 = that.Rect(width*.1,height*.89,(width) *.5,height *.04);
							ctx.fillStyle = '#ff9800';
							that.drawRoundedRect(rect3,30,ctx);
							ctx.font = " 35px '字体','微软雅黑','宋体'"; 
							ctx.fillStyle = '#fff';
							ctx.fillText('长按识别二维码 >', width*.35, height*.92);
							that.circleImg(ctx, headImg, width*.08, height*.6, 12*that.b);
							if(that.sign1){
								ctx.font = " 50px '字体','微软雅黑','宋体'"; 
								ctx.fillStyle = '#fff';	
							for(let i=0;i<news.text.length;i++){
								textFontWidth += ctx.measureText(news.text[i]).width;
							}
							 if (textFontWidth > width - 2* textX*that.b) {
							 	 for (var i = 0; i < news.text.length; i++) {
                					lineWidth += ctx.measureText(news.text[i]).width;
										if(lineWidth > (width - 2*textX*that.b)){
											ctx.textAlign = 'left';
											ctx.fillText(news.text.substring(textI,i),textX*that.b,textY*that.b);
											textY+=25;
											textX+=0;
											lineWidth = 0;
											textI = i;
											console.log(textI)
											// if(textI>17){
											// textX = textX+5;	
											// }
									}
								if(i == news.text.length -1){
									ctx.fillText(news.text.substring(textI,i + 1),textX*that.b,textY*that.b);
								}		
						}
						}else{
							ctx.textAlign = 'center';
							ctx.fillStyle = '#fff';
							ctx.fillText(news.text, width / 2, textY*that.b);
							}
							}
								//画二维码
								ctx.drawImage(code,width*.67,height * .805,55*that.b,55*that.b);
								bus.$emit('closeloading');
						}
						that.imgOnload = true;	
						headImg.src = that.headimg;
						headImg.src+="?date="+new Date();
						if(news.img == ''){
							imgs.src=news.img1+"?date="+new Date();
						}else{
							imgs.src=news.img+"?date="+new Date();
						}
					
			}())
}
			},
		},
		mounted(){
			   
			
		},
		
	}
</script>
<style lang="less" scoped>
@keyframes showSmain{
		from{
			bottom:-100%;	
		}
		to{
			bottom:5rem;
		}
}
@keyframes showBtn{
		from{
			bottom:-100%;	
		}
		to{
			bottom:0;
		}
}
@keyframes imgAnimation{
	from {
		opacity:.5;
		-webkit-transform:scale(.5);
		transform:scale(.5);
	}
	to{
		opacity:1;
		-webkit-transform:scale(1);
		transform:scale(1);

	}
}
::-webkit-input-placeholder { color:rgba(0,0,0,.3);font-size: 1.3rem;text-align: left;text-indent:1em;}
	#readAdd{
		width:100%;
		height:100%;
		position: relative;
		z-index: 998;
		-webkit-display:flex;
		display: flex;
		overflow:hidden;
		flex-direction: column;
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
		#mainBlock{
			width:60%;
			/* height:396px; */
			margin:1rem auto;
			color:#666;
			background:#fff;
			border:1px solid rgba(238, 238, 238, 0.55);
			border-radius:4px;
			overflow:hidden;
			position: relative;
			p{
				position:absolute;
				top:40%;
				width:100%;
				left:0;
				text-align:center;
			}
			.imgAnimation{
				-webkit-animation:imgAnimation .5s ease forwards;
				animation:imgAnimation .5s ease forwards;
			}
		}
		.selfSet{
			width:80%;
			overflow-x:auto;
			overflow-y: hidden;
			-webkit-overflow-scrolling:touch;
			white-space: nowrap;
      		border:1px solid #eee;
      		height:9rem;
      		position:relative;
      		/* top:-2rem; */
      		margin:0 auto;
      		display:flex;
			p{
				width:8rem;
				height:8rem;
				float: left;
				margin: .5rem 0 0 .5rem;
				box-shadow:0 0 3px #ddd;
				text-align:center;
				overflow:hidden;
				i{
					font-size:3rem;
					line-height:4rem;
					}
					span{
						line-height:3rem;
					}
			}
			.imgTouch{
				float: left;
				height:8rem;
				margin-top: .5rem;
      			flex:1;
				img{	
					width:8rem;
					height:8rem;
					margin-left: .5rem;
				}
			}
			

		}
		&>.reEdit{
			width:50%;
			margin:0 auto;
			border:1px solid #ddd;
			box-shadow: 2px 2px 2px #eee;
			color:#e91e63;
			border-radius:4px;
			position:fixed;
			left:25%;
			bottom:1rem;
			letter-spacing:2px;
		}
		&>.backs{
			width:50%;
			margin-left: 25%;
			height: 3rem;
			margin-top: 1.5rem;
			border-radius:15px;
			border:1px solid #eee;
			box-shadow: 2px 2px 2px #ccc;
			letter-spacing:2px;
			color: #666;
			opacity:0;
		}
		&>p{
			text-align:center;
			width:70%;
			margin:.5rem auto;
			line-height:2.7rem;
			color:#666;
			i{
				font-size:2.5rem;			}
			}
			
			
		
		.Smain{
			position:fixed;
			bottom:5rem;
			left:0;
			width:100%;
			background:#fff;
			box-shadow:1px -2px 2px #eee;
			overflow:hidden;
			
			div{
				&:first-child{
					p{
					line-height:5rem;
				}
			}
				&:nth-child(2){
					p{
					line-height:10rem;
				}
			}
				&:nth-child(3){
					p{
					line-height:4rem;
					height:4rem;
					margin:.4rem 0;
				}
			}
				&>p{
					width:22%;
					height:100%;
					display:inline-block;
					float: left;
					text-align:center;
				}
				.common{
					width:70%;
					float: left;
					margin:.4rem 0;
					
			}


		&>.Sbgc{
			height:5rem;
			z-index:1004;
			overflow-x:auto;
      		overflow-y: hidden;
      		-webkit-overflow-scrolling:touch;
      		white-space: nowrap;
			li{
				height:100%;
				width:5rem;
				display:inline-block;
				margin-top: 0;
				margin-right: .5rem;
				position: relative;
				top:0;
				border:1px solid rgba(238, 238, 238, 0.45);
				img{
					display:inline-block;
					width:5rem;
					height:5rem;
				}
			}
		}
		.Stext{
			height:10rem;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			li{
				width:100%;
				input{
							width:1.4rem;
							height:1.4rem;
							line-height: 1.4rem;
							margin-right: 1.5rem;
						}
						label{
							position: relative;
							left: 1.6rem;
							font-size: 1.3rem;
							margin-left: 2rem;
							display: inline-block;
							width:80%;
							height:1.5rem;
							line-height: 1.5rem;
						}
						input[type='radio'] + label::before{
							content:"";
							color:#666;
							display: inline-block;
							vertical-align: middle;
							font-size:1.4rem;
							width:1.5rem;
							height:1.5rem;
							border-radius: 50%;
							border:1px solid #666;
							line-height: 1.4rem;
							position: absolute;
							top:0;
							left:-2.4rem;
							margin-right:auto;
							margin-left: auto;
						}
						input[type="radio"]:checked + label::before{
							content:"\a0";
							background-color:rgba(96, 98, 102, 0.82);
							background-clip:content-box;
							padding:.2rem;
							text-align: center;
							border-radius: 50%;
						}
						input[type="radio"]{
							position: absolute;
							clip:rect(0,0,0,0);
						}
			}
		}
		.seltText{
			height:4rem;

			li{
				width:100%;
				height:100%;
				input{
					width:100%;
					height:100%;
					outline:none;
					border:1px solid #eee;
					text-indent:1em;
				}
			}
		}
	}
	}
	.btn{
			width:100%;
			height:4rem;
			position:absolute;
			left:0;
			bottom:0;
			box-shadow:2px -2px 1px #eee;
			&>button{
				width:50%;
				float: left;
				height:4rem;
				text-align:center;
				background:#fff;
				color:#666;
				padding:0;
				font-size:1.7rem;
				letter-spacing:2px;
				&:last-child{
					background:#e91e63;
					color:#fff;
				}
			}
			.growposters{
				width:100%;
				/* background:#e91e63; */
			}
		}
		.animations{
				-webkit-animation:showBtn .7s ease forwards;
				animation:showBtn .7s ease forwards;
			}
	.animtion{
		-webkit-animation:showSmain .7s ease forwards;
		animation:showSmain .7s ease forwards;

	}
	.animationBack{
		-webkit-animation:backs  .7s ease 3s forwards;
		animation:backs  .7s ease 3s forwards;
	}

}
@keyframes backs{
	from{
		opacity: 0;
		-webkit-transform:scale(.5);
		transform: scale(.5);
	}
	to{
		opacity: 1;
		-webkit-transform:scale(1);
		transform: scale(1);
	}
}
</style>