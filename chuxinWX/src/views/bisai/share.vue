<template>
	<div class="share">
		<img src="../../assets/images/logo.png" alt="" class="logoS">
		<img src="../../assets/images/topImg.png" alt="" class='rightImg'>
		<div>
			<h2>邀你一起来答题</h2>
			<h2>阅读还能赢红包！</h2>
		</div>
		<div class="centerA">	
			<img src="../../assets/images/centerImg.png" alt="" class="centerImg">
			<p>爱阅读的你,<br>
				一起来挑战！
			</p>
		</div>
	
		<ol class="sixType">
			<li>传统<br>文化</li>
			<li>儿童<br>文学</li>
			<li>中外<br>名著</li>
			<li>文本<br>细读</li>
			<li>常识<br>储备</li>
			<li>知识<br>链接</li>
		</ol>
		<span>关注订阅号&nbsp;“文升阅读”&nbsp;，获取答题码</span>
		<div class="bottomImg">
			
			<img src="../../assets/images/shareB1.png" alt="">
			
			<img src="../../assets/images/shareB2.jpg" alt="">
		</div>
	</div>
</template>
<script>
	
	export default{
			data(){
				return {
					
				}
			},
			methods:{},
			created(){},

	} 
</script>
<style lang='less'>
@font-face {font-family: 'iconfont';
    src: url('../../../static/font/iconfont.eot');
    src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/iconfont.woff') format('woff'),
    url('../../../static/font/iconfont.ttf') format('truetype'),
    url('../../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.share{
		width:100%;
		height: 100%;
		position: relative;
		overflow-x:hidden;
		background:#fff;
		// background: linear-gradient(to top, #ea769f 0%, #f0cd6e 100%);
		z-index: -2;
		.logoS{
			width:30%;
			margin:.3rem;
		}
		.rightImg{
			position: absolute;
			top:-2rem;
			right:1rem;
			display: inline-block;
			width:50%;
			z-index: -1;
		}

		&>div{
			width:100%;
			margin:1rem 0rem 1rem 2rem;
			// padding:2rem 0;
			h2{
				margin-top: 1rem;
				font-size: 2.5rem;
				color:#000;
				font-weight: 550;
				letter-spacing: 2px;
			}
			
		}
		.centerA{
			position: relative;
			left:-4rem;
			top:-1rem;
			margin:0;

		.centerImg{
			// position: absolute;
			display: inline-block;
			
			width: 70%;
		}
		p{
			position: absolute;
			top:6rem;
			left:6rem;
			font-size: 2.4rem;
			font-weight: 700;
			line-height: 2.7rem;
			color:#b50f0f;
			transform:rotate(-5deg);
		}
	}
	ol{
		width:70%;
		height: 9rem;
		margin-top: -6rem;
		float: right;
		display: flex;
		-webkit-display:flex;
		justify-content: space-around;
		flex-wrap: wrap;
		position: relative;
		z-index: 99;
		li{
			width:30%;
			padding:.3rem 0;
			margin-right:.2rem;
			margin-top: .2rem;
			text-align: center;
			border-radius: 5px;
			background:#a14329;
			font-size: 1.5rem;
			color:#fff;
			&:nth-child(1){
				background:#135b6c;}
			&:nth-child(2){
				background:#135b6c;}
			&:nth-child(3){
				background:#135b6c;}

		}
	}
	span{
			position: absolute;
			right:1rem;
			bottom:16rem;
			i{
				color:green;
				animation: jiantou 1s infinite;
				-webkit-animation: jiantou 1s infinite;;
			}
		}
	.bottomImg{
		width:100%;
		height:13rem;
		position: absolute;
		left:0;
		bottom:2.5rem;
		margin:0;
		border-top: 1px solid #eee;
		img{
			display: inline-block;
			width:50%;
			// float: left;
			margin-top: 0rem;
			&:nth-child(2){
				width:40%;
				position: absolute;
				top:0rem;
				right:.5rem;
				margin:0;
			}
		}
		
	}
	@keyframes jiantou{
		from{
			transform:scale(.5);
			-webkit-transform:scale(.5);
		}
		to{
			-webkit-transform:scale(1.2);

			transform:scale(1.2);
		}

	}

	}
</style>