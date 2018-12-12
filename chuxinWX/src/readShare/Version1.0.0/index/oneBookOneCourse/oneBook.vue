<template>
	<section id="OneBook" v-show='showThis'>
		<header>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div v-if='isPay'>一书一课</div>
				<div v-if='!isPay'>会员课程</div>
		</header>
		<div v-show='isPay' class="noPay">
			<p>抢先免费体验</p>
			<ul class="oneBookList">
				<li v-for='b in OneBookData' @click='goOneBookDetail(b.id,b.bookName)'>
				<div>
					<img :src="b.picId" alt="">
				</div>
				<div>
					<p>《&nbsp;{{b.bookName}}&nbsp;》</p>
					<p>建议阅读天数：{{b.readDays}}</p>
					<p>版本号：{{b.version}}</p>
				</div>
				<div>
					<span>
						查看详情
					</span>
				</div>
			</li>	
		</ul>
		<button @click='gohuioyuan'>马上成为会员</button>

		</div>
		<div v-show='!isPay'>
			<ul class="oneBookList" >
			<li v-for='b in OneBookData' @click='goOneBookDetail(b.id,b.bookName)'>
				<div>
					<img :src="b.picId" alt="">
				</div>
				<div>
					<p>《&nbsp;{{b.bookName}}&nbsp;》</p>
					<p>建议阅读天数：{{b.readDays}}</p>
					<p>版本号：{{b.version}}哈哈哈哈哈</p>
				</div>
				<div>
					<span>
						查看详情
					</span>
				</div>
			</li>	
		</ul>
	</div>
	</section>	
</template>
<script>
import {bus}  from '../../../../bus.js'
	export default {
		data(){
			return {
				OneBookData:[],
				showThis:false,
				ifNoBook:false,
				isPay:false,
			}
		},
		methods:{
			gohuioyuan(){
				this.$router.push({name:'huiyuan',params:{id:2}})
			},
			goOneBookDetail(id,name){
				this.$router.push({name:'oneBookDetail',params:{id:id},query:{bookName:name}})
			},
			goback(){
				this.$router.go(-1);
			},
			getOneBookListBook(){
			let thats = this;
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingList/'+this.wxId)
			.then(res=>{
				console.log(res.data);
				this.showThis =true
				bus.$emit('closeloading');
				if(!res.data.isPay){
					this.isPay = true
				}else{
					this.isPay = false
				}
				this.OneBookData = res.data.bookList;
				let PicId = [];
				res.data.bookList.forEach(v=>{
					PicId.push(v.picId);
				})
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
					.then(function(res1){
						res.data.bookList.forEach(v=>{
		 					v.picId= thats.ip.filePath1+res1.data[v.picId].href
		 			});
			});



			})
			.catch(err=>{
				console.log(err)
			})

		},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.getOneBookListBook();

		},
	}
</script>
<style lang="less" scoped>
	#OneBook{
		width:100%;
		height:100%;
		display:flex;
		flex-direction:column;
		header{
			height:43px;
			margin-bottom: 1px;
			border-bottom:1px solid rgba(238, 238, 238, 0.53);
			div{
				display:inline-block;
				background:rgba(255, 255, 255, .87);
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
			}
		}
		.noPay{
			&>p{
				text-align:center;
				padding:.5rem 0;
				color:#f60;
			}
			&>button{
				width:60%;
				margin:1rem 20% 1rem;
				background:#e91e63;
				color:#fff;
				line-height:3rem;
				letter-spacing:1px;
				border-radius:2px;

			}
		}
		.oneBookList{
			flex:1;
			-webkit-overflow-scrolling:touch;
			overflow-y:scroll;
			overflow-x:hidden;
			li{
				width:96%;
				overflow:hidden;
				height:10rem;
				padding:.2rem .4rem;
				margin-top: 0;
				background:rgba(238, 238, 238, 0.46);
				margin:.5rem auto;
				border-radius:5px;
				display:flex;
				div{
					float: left;
					p{
						height:3rem;
						width:100%;
						font-size:1.4rem;
						line-height:3rem;
						text-indent:1em;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
						&:first-child{
							text-indent:.5em;
						}
					}

				}
				&>:first-child{
					width:8rem;
					height:100%;
					overflow:hidden;
					float: left;
					border-radius:3px;
					img{
						width:95%;
						height:95%;
						margin-top: 2%;
						border-radius:3px;
					}
				}
				&>:nth-child(2){
					width:45%;
				}
				&>:last-child{
					margin-right: .7rem;
					flex:1;
					span{
						background:#e91e63;
						color:#fff;
						height:2.2rem;
						line-height:2.2rem;
						width:7rem;
						display:inline-block;
						text-align:center;
						font-size:1.2rem;
						border-radius:3px;
						margin-top: 3.75rem;
					}
				}
			}
		}
	}
</style>
