<template>
	<section id="readPosterShare">
		<div class="printTop">
			<canvas id='myCanvas'></canvas>
			<div><img :src="info.headImg" alt="loading"></div>	
			<p>{{info.nickName}}</p>
		</div>
		<img :src="info.picId" alt="">
		<div class="BshareText">
			<div class="shareText">{{info.content}}</div>
		</div>
		<p>《{{info.bookName}}》</p>
		<div class="bigTwocode">
			
		<div class="twocode">
			<img src=".././../../../../../assets/images/shareB2.jpg" alt="">
			<p>
		文升阅读
		</p>
		</div>
		</div>
	</section>
</template>
<script>
	export default{
		data(){
			return {
				bgImg:'',
				img:'',
				info:{},
			}
		},
		methods:{},
		created(){
			let openid =window.location.href.split('?wxId=')[1].split('&')[0];
			let signId =window.location.href.split('&signId=')[1].split('&')[0];
			// let openid = 'o76bqv9jetyLMDUBy6wEcEUmdrOE';
			// let signId = 1;
			console.log(openid);
			console.log(signId)
			this.axios.get(this.ip.RESTPATH+'rest/getReadingShare/'+openid+'/'+signId)
			.then(res=>{
				console.log(res.data);
				this.info = res.data.map;
			});
			$(function(){
			let printTop = $('.printTop').get(0);
			let Height =printTop.offsetHeight;
			let Width = printTop.offsetWidth;
			let point0=[0,0];
			let point1 = [Width,0];
			var c = document.getElementById('myCanvas');
			console.log(c)
			c.setAttribute('width',Width);
			c.setAttribute('height',Height)
    		var content = c.getContext('2d');
   			 //绘制二次方贝塞尔曲线
			    content.strokeStyle ="#fff";
			    content.fillStyle='red';
			    content.beginPath();
			    content.moveTo(0,0);
			    content.quadraticCurveTo(Width/2,Height,Width,0);
			    content.stroke();
		});
		},
	}
</script>
<style lang='less'>
	#readPosterShare{
		width:100%;
		height:100%;
		position: relative;
		overflow: hidden;
		&>.printTop{
			height:auto;
			position: relative;
			/*padding-bottom:2px;*/
			height:10rem;
			width:100%;
			margin:0rem auto 0;
			&>p{
				text-align:center;
				font-size: 1rem;
				color:#fff;
				display:inline-block;
				position:absolute;
				top:1rem;
				left:50%;
				transform:translateX(-50%);
				font-size:1.9rem;
			}
			&>div{
				position: absolute;
				height:6rem;
				width:6rem;
				top:3rem;
				left:50%;
				transform:translateX(-50%);
				border-radius:50%;
				display:inline-block;
				border: 2px solid #fff;
				&>img{
				border-radius:50%;	
				width:100%;
				height:100%;
				}
			}
		}
		&>img{
			width: 100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: -1;
			opacity:.7;

		}
		.BshareText{
			width:84%;
			margin-left: 8%;
			margin-top: 2%;
			min-height: 50%;	
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		.shareText{	
			margin-top: 3rem;
			padding:4rem 1rem;
			border-radius: 5px;
			color:#fff;
			letter-spacing: 2px;
			line-height: 3rem;
			text-align:center;
			font-size:2.4rem;
				}
			}
		&>p{
			text-align:center;
			color:#fff;
			margin-top:1rem;
			font-size: 1.7rem;
			letter-spacing:1px;
		}
		.bigTwocode{
			width:100%;
			position:absolute;
			bottom:0;
			left:0;
		.twocode{
			width:10rem;
			height: 15rem;
			margin:2rem auto;
			&>img{
				width:10rem;
				height:10rem;
			}
			&>p{
				width:10rem;
				margin:.2rem auto;
				text-align: center;
				font-size: 1.4rem;
				color:#fff;
				border-radius:5px;
				}
			}
		}
	}
</style>