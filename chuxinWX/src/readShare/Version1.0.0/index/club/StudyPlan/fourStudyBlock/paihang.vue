<template>
	<section id="paihang" v-show='showThis'>
		<header>
			<div class="left">
				<img :src="paihangData.picId" alt="1">
			</div>
			<div class="right">
				<p>打卡排行榜</p>
				<h5>第{{paihangData.nowTime}}天&nbsp;|&nbsp;共{{paihangData.totalTime}}天</h5>
				<p>{{paihangData.personNum}}人参与&nbsp;&nbsp;{{paihangData.totalTime1}}次打卡</p>
			</div>
		</header>
		<div class="mycard">
			<div class="img">
				<img :src="headimg" alt="">
			</div>
			<div class="name">
				<p>{{nickname}}</p>
				<p>{{ifSign}}</p>
			</div>
		</div>
		<p v-show='ifNopaihang' class="noPaihang">暂无排行</p>
		<ul>
			<li v-for='(p,index) in paihangData.rank' v-show='!ifNopaihang'>
				<p>
					<i class="iconfont" v-show='index == 0'>&#xe644;</i>
					<i class="iconfont" v-show='index == 1'>&#xe677;</i>
					<i class="iconfont" v-show='index == 2'>&#xe645;</i>
					<span v-show='index > 2'>{{index+1}}</span>
				</p>
				<p>
					<img :src="p.imgSrc" alt="">
					<span>{{p.nickName}}</span>
				</p>
				<p>
					<span>{{p.sort}}</span>次
				</p>
			</li>
		</ul>
	</section>
	
</template>
<script>
import {bus} from '../../../../../../bus.js'
	export default{
		data(){
			return {
				paihangData:{},
				wxId:'',
				headimg:'',
				nickname:'',
				ifSign:'暂未打卡',
				showThis:false,
				ifNopaihang:false,

			}
		},
		methods:{},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			let thats = this;
			this.$parent.showThis = true;
			// let courseId = sessionStorage.getItem('courseIdSign1');
			this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
			this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			let companId = sessionStorage.getItem('companidSign_');
			console.log(companId)
			this.axios.get(this.ip.RESTPATH+'rest/getSignRankByCamping/'+ companId+'?wxId='+this.wxId)
			.then(res=>{
				console.log(res.data);
				this.showThis = true;
				bus.$emit('closeloading');
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.picId)
				.then(res1=>{
					console.log(res1)
					res.data.picId = thats.ip.filePath1+res1.data[res.data.picId ].href
				})
				this.paihangData = res.data;
				!res.data.isFinish?this.ifSign = '暂未打卡' :this.ifSign = '第'+res.data.paiming+'名|  '+'已打卡'+res.data.time+'次';
				this.paihangData.rank.length == 0 ? this.ifNopaihang = true : this.ifNopaihang  = false;
			})
		},
	}
</script>
<style lang='less'>
#paihang{
		width:100%;
		height:100%;
		display: -webkit-flex;
		display: flex;
		flex-direction: column;
		header{
			height:12rem;
			overflow: hidden;
			display: flex;
			display: -webkit-flex;
			background-image: linear-gradient(to right bottom,rgba(191, 228, 160, 0.36),rgba(61, 212, 185, 0.3803921568627451),rgba(252, 192, 16, 0.47843137254901963));
			background-image:-webkit-linear-gradient(to right bottom,rgba(191, 228, 160, 0.36),rgba(61, 212, 185, 0.3803921568627451),rgba(252, 192, 16, 0.47843137254901963));

			div{
				float: left;
			}
			.left{
				width:30%;
				height:50%;
				margin:3rem 2rem;
				img{
					width:5rem;
					height:6rem;
					border-radius: 3px;
				}
			}
			.right{
				flex:1;
				h5{
					color:#505050;
					font-size:1.4rem;
				}
				p{
					line-height: 2.5rem;
					font-size:1.2rem;
					color:#505050;
					&:first-child{
						margin-top:2.5rem;
						margin-bottom: .5rem;
						font-size:1.9rem;
					}
				}
			}
		}
		.mycard{
			height:7rem;
			width:90%;
			position: relative;
			top:-2rem;
			left:5%;
			border-radius: 5px;
			background: #fff;
			box-shadow:0 0 5px #ddd;
			div{
				float: left;
			}
			.img{
				width:4rem;
				height:4rem;
				border-radius: 50%;
				overflow: hidden;
				margin:1.5rem 1rem;
				img{
					width:100%;
					height:100%;
				}
			}
			.name{
				p{
					line-height: 2.5rem;
					color:#9e9e9e;
					&:first-child{
						margin-top:1rem;
						font-size:1.8rem;
						color:#000;
					}
				}
			}
		}
		.noPaihang{
			padding:2rem 0 ;
			text-align: center;
		}
		ul{
			width:95%;
			margin:0 auto;
			flex:1;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
			li{
				height: 5.5rem;
				overflow: hidden;
				border-bottom:1px solid rgba(158, 158, 158, 0.2);
				display: flex;
				margin-top: 0;
				p{
					float: left;
					height:100%;
					line-height: 5.5rem;
					img{
						width:3rem;
						height:3rem;
						margin-top: 1.25rem;
						display: inline-block;
						border-radius: 50%;
					}
					&:first-child{
						width:5rem;
						text-align: center;
						i{
							font-size:3rem;
							color:#f0c010;
						}
					}
					&:nth-child(2){
						flex:1;
						display: flex;
						span{
							display: inline-block;
							flex:1;
							text-align: left;	
							text-indent: 2em;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
					&:last-child{
						float: right;
						width:4rem;
						text-align: center;
						color:#eb3372;
						span{
							font-weight: 700;
							font-size: 1.8rem;
						}
					}
				}	
			}
		}
	}
	
</style>