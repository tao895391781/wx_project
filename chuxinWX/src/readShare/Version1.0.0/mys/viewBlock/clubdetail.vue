<template>
	<section id="clubdetail" v-show='showThis'>
		<div class="banner">
			<img :src="detailData.broadcastPic" alt="banner图片">
		</div>
		<div class="topic">
			<h4>{{detailData.name}}</h4>
			<p>
				<span>{{detailData.campingbeginDate}}-{{detailData.campingfinishDate}}</span>
				<span>共{{detailData.number}}本书</span>
			</p>
		</div>
		<ul>
			<li v-for='b in detailData.courseList' @click='Beginstudy(b.id,getNowTime(b.beginDate))'>
					<div class="left">
						<img :src="b.picId" :alt="b.name">
					</div>
					<div class="middle">
						<p>《{{b.name}}》</p>
						<p>阅读时段:{{b.beginDate}}-{{b.finishDate}}</p>
						<p>阅读进度:{{b.process}}</p>
					</div>
					<div class="right">
						<span v-if='getNowTime(b.beginDate)' :class="{beginStudy:getNowTime(b.beginDate)}">开始学习</span>
						<span v-if='!getNowTime(b.beginDate)' :class="{nobeginStudy:!getNowTime(b.beginDate)}">尚未开始</span>
					</div>
			</li>
		</ul>
	</section>
</template>
<script>
import {bus} from '../../../../bus.js'
	export default {
		data(){
			return{
				detailData:{},
				showThis:false,
				}
			},
		methods:{
			Beginstudy(id,iffinish){
				console.log(iffinish);
				if(!iffinish){
					bus.$emit('showtips1','尚未开始')
				}else{
					let companid = this.$route.params.id;
					this.$router.push({name:'ImmediateExp',params:{id:id},query:{from:'course'}});
				}	
			},
			getNowTime(t){
				let nowT = new Date();
				let m = nowT.getMonth()+1;
				let d = nowT.getDate();
				let nT = (m>9?m:'0'+m) + '-'+(d>9?d:'0'+d);
				if(nT>=t){
					//开始
					return true;
				}else{
					return false;
				}
			}
		},
		created(){
			console.log(sessionStorage.getItem('companidSign_'))
			this.getNowTime();
			let id = this.$route.params.id;
			let thats = this;
			this.axios.get(this.ip.RESTPATH+'rest/getCampingCourseByCampingId/'+id)
			.then(res=>{
				console.log(res.data);
				this.showThis = true;
				this.detailData = res.data.result;
				let imgPath = [];
				res.data.result.courseList.forEach(v=>{
					imgPath.push(v.picId);
				})
				let bordImg = res.data.result;
				if(bordImg.broadcastPic){
					imgPath.push(bordImg.broadcastPic)
				}
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+imgPath.join(','))
				.then(res1=>{
					if(bordImg.broadcastPic){
						bordImg.broadcastPic =  thats.ip.filePath2+res1.data[bordImg.broadcastPic].href;
					}				
					res.data.result.courseList.forEach(v=>{
						v.picId =  thats.ip.filePath1+res1.data[v.picId].href
					})
				})
			})
		},
		}
</script>
<style lang="less">
	#clubdetail{
		width:100%;
		flex:1;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		.banner{
			width:100%;
			min-height:10rem;
		}
		.topic{
			border-bottom:.4rem solid #f2f2f2;
			h4{
				text-indent:2em;
				color:#111;
				font-size:1.5rem;
				line-height: 3rem;
			}
			p{
				line-height:3rem;
				span{
					padding-left:3rem;
				}
			}
		}
		ul{
			li{
				display: -webkit-flex;
				display:flex;
				border-bottom:.3rem solid #f2f2f2;
				div{
					display:inline-block;
					margin: 1rem 0;
				}
				.left{
					width:6rem;
					height:7rem;
					margin:1rem;
					position: relative;
					img{
						width:100%;
						height:100%;
						border-radius:3px;
					}
				}
				.right{
					margin-right: 1rem;
					height:7rem;
					span{
						line-height:7rem;
						padding:.7rem 1.5rem;
						border-radius:3px;
						color:#fff;
					}	
					.beginStudy{
						background:#2196f3;
					}	
					.nobeginStudy{
						background:#9e9e9e;
					}
				}
				.middle{
					flex:1;
					p{
						line-height:2.2rem;
						color:#9e9e9e;
						&:first-child{
							position:relative;
							top:-.2rem;
							color:#111;
						}
					}
				}
			}
		}
	}
</style>