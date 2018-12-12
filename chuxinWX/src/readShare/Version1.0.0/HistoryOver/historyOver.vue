<template>
	<section id="historyOver">
		<div class="firstInss" v-show='firstIn'> 
			<i class="iconfont" v-if='showGoBuy || showGoCourse'>&#xe657;</i><br>
			<p v-if='showGoBuy' class="noBuy">你还暂未购买任何课程</p>
			<button  v-if='showGoBuy' class="goBuys" @click='goBuypage'>去购买</button>
			<p v-if='showGoCourse' class="noBuy">暂无正在学习的课程</p>
			<button  v-if='showGoCourse' class="goBuys" @click='goCourse'>去我的课程</button>


	</div>
	</section>
</template>

<script>
import bookList from '../../../components/boolist.vue'
import Vue from 'vue'
import audioPlay from '../../../components/audioPlay.vue'
	export default {
		data(){
			return {
			      classifyBookList:[],
			      firstIn:false,
			      showGoBuy:false,
			      showGoCourse:false,
			}
		},
		methods:{
			goBuypage(){
				this.$router.push({name:'qualityCourse',params:{id:1},query:{from:'four'}})
			},
			goCourse(){
				this.$router.push({name:'myCourse'})
			},
			
		},
		components:{
			bookList,
			audioPlay 
		},
		created(){
			let wxId = JSON.parse(sessionStorage.getItem('u'))['openid']
			this.axios.get(this.ip.RESTPATH+'rest/getHistoryWatchByWXId/'+wxId)
			.then(res=>{
				console.log(res.data);
				sessionStorage.setItem('companidSign_',res.data.campingId)
				if(res.data.flag && res.data.courseId){
					//购买且做过的
					this.showGoBuy = false;
					this.firstIn = false;
					this.$router.push({name:'ImmediateExp',params:{id:res.data.courseId},query:{from:'history'}});
				}else if(res.data.flag && !res.data.courseId){
					this.firstIn = true;
					this.$parent.isFirst = true;	
					this.showGoCourse = true;
					//购买没做过的，去我的课程
				}else{
					//没购买

					this.showGoBuy = true;
					this.firstIn = true;
					this.$parent.isFirst = true;	
				}

			})
		},
	}
</script>
<style lang='less'>
	#historyOver{
		width:100%;
		flex:1;
		-webkit-flex:1;
		background:#f2f2f2;
		overflow: scroll;
		.goback{
			line-height:3rem;
			background: #fff;
			i{
				padding:0 2rem;
				color:#555;
			}
		}
		&>.firstInss{
		height:100%;
		background:#fff;
		overflow: hidden;
		display: flex;
		flex-direction:column;
		-webkit-display: flex;
		-webkit-flex-direction:column;
		text-align: center;
		&>i{
			font-size:10rem;
		    line-height:13rem;
		    color: #ddd;
		}
		&>.noBuy{
			text-align: center;
			padding:0 0 5rem;
			letter-spacing: 1px;
		}
		&>.goBuys{
			width:50%;
			margin-left: 25%;
			background: #67d1de;
		    color: #fff;
		    line-height: 3.5rem;
		    margin-top: 5rem;
		    border-radius: 5px;
		    font-size: 1.8rem;

		}
		.classifyRead{
				font-size:1.4rem;
				text-indent:2em;
				margin-top: .5rem;
				border-left:5px solid #f60;
				padding:.5rem 0;
				background:#fff;
				color:#555;
			}
		&>.classifyList{
			flex:1;
			-webkit-flex:1;
			/*padding-bottom: 43px;*/
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
	}
		footer{
			height:3.5rem;
			.buy{
				height:3.5rem;
				background:#fcfcfc;
				border-top:1px solid #ddd;
				&>button{
					width:50%;
					float: left;
					height:100%;
					border-style:none;
					line-height:3.5rem;
					outline:none;
					background:transparent;
					color:#fff;
					&>span{
						font-size:2rem;
					}
					&>b{
						font-style:normal;
						float: right;
						font-weight:400;
						position: relative;
						right:.5rem;
						bottom:-.5rem;
						font-size:1.2rem;
					}
					&:first-child{
						border-right:1px solid rgba(220, 223, 230, 0.89);
					}
					&:nth-child(2){
						border-right:1px solid rgba(220, 223, 230, 0.89);
						&>span{
							color:#f60;
							&:last-child{
								float: right;
								font-size:1.2rem;
								position:relative;
								bottom:-.5rem;
								right:1rem;
								color:#f60;
							}
						}
					}
				}
				.selectBuy{
					background:#f60;
				}
			}
		}
	}
</style>