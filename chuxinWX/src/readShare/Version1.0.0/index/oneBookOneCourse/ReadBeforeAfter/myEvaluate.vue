<template>
	<section id="myEvaluate" v-show='showThis'>
		<button @click='goEvaluate'>去评价</button>
		<div class="totalEvaluate">
			<p>-所有评价-</p>
			<p class="noEvaluate" v-show= 'noEvaluate'>暂无评价</p>
			<ul>
				<li v-for='e in evaluate2'>
					<div>
						<p><img :src="e.headImg" alt=""></p>
						<p>{{e.nickName}}</p>
						<p class="star">
							<span v-for='(s,index) in e.star' ><i class="iconfont">&#xe643;</i></span>
						</p>
					</div>
					<div>
						<p class="text">{{e.content}}</p>
					</div>
					<div>
						<p>{{formate(e.date)}}</p>
					</div>
				</li>
				<li @click='loadMore' :class="{noMore:noMore}" v-show='ifNoEvaluate'>{{loadMoreText}}</li>
			</ul>
		</div>

	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				evaluate:[],
				evaluate1:[],
				evaluate2:[],
				loadMoreText:'加载更多',
				noMore:false,
				noEvaluate:false,
				showThis:false
			}
		},
		computed:{
			ifNoEvaluate(){
				this.evaluate1.length == 0?true:false;
			},
			
		},
		methods:{
			loadMore(){
				let nextM = this.evaluate.splice(0,this.evaluate.length);
				console.log(this.evaluate)
				if(this.evaluate2.length == this.evaluate1.length){
					bus.$emit('tip','没有更多了');
					this.loadMoreText = '下面没有了';
					this.noMore = true
				}else{
					this.evaluate2 = [...this.evaluate2,...nextM]
				}
			},
			formate(str){
				 if (!str) return '';
	            var date = new Date(str)
	            var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
            if (time < 0) {
              return ''
            } else if ((time / 1000 < 30)) {
              return '刚刚'
            } else if (time / 1000 < 60) {
              return parseInt((time / 1000)) + '秒前'
            }
            else if ((time / 60000) < 60) {
              return parseInt((time / 60000)) + '分钟前'
            } else if ((time / 3600000) < 24) {
              return parseInt(time / 3600000) + '小时前'
            } else{
              let d = new Date(str);
              let timeS = d.getFullYear()+'/'+((d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1))+'/'+
            (d.getDate()<10?'0'+d.getDate():d.getDate())+'  '+ (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+ (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());          
              	return timeS;
            }
		},
			goEvaluate(){
				this.$router.push({name:'goEvaluate',query:{id:this.$route.query.id}})
			},
		},
		beforeCreate(){
			bus.$emit('looading')
		},
		created(){
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingStar/' + this.$route.query.id)
			.then(res=>{
				bus.$emit('closelooading');
				this.showThis = true;
				console.log(res.data);
				if(res.data.length ==0){
					this.noEvaluate = true;
				}
				this.evaluate = res.data;
				this.evaluate1 = res.data.concat();
				this.evaluate2 = res.data.splice(0,5);
				console.log(this.evaluate2)

			})
		},
	}
</script>
<style lang="less">
	#myEvaluate{
		width:100%;
		height:100%;
		flex:1;
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		&>button{
			background:#e91e63;
			color:#fff;
			width:40%;
			line-height:3rem;
			border-radius:20px;
			margin:3rem 30%;
			letter-spacing:2px;
			font-size:1.5rem;
			box-shadow:0 0 3px #e91e63;
		}
		.totalEvaluate{

			&>p{
				text-align:center;
			}
			.noEvaluate{
				padding:4rem 0;
			}
			ul{
				width:90%;
				margin:1rem auto;
				border:1px solid rgba(238, 238, 238, 0.46);
				padding:1rem;
				border-radius:4px;
				li{
						width:100%;
						border-bottom:1px dashed #eee;
					div{
						overflow:hidden;
						&:first-child{
							width:100%;
							height:3.5rem;
							line-height:3.5rem;
							.star{
								padding-left:1rem;
								i{
									color:#e91e63;
								}
							}
						}
						&:nth-child(2){
							width:100%;
							margin: .5rem 0;
							line-height:2rem;
							text-indent:.5em;
							.text{
								width:100%;
								clear:both;
							}
						}
						&:last-child{
							p{
								color:#9e9e9e;
							}
						}
						p{
							float: left;
							margin-right:.5rem;
							color:#000;
							img{
								width:3rem;
								height:3rem;
								border-radius:50%;
							}
					}
				}
				&:last-child{
					background:#e91e63;	
					width:80%;
					margin:1rem auto;
					text-align:center;
					line-height:2.5rem;
					color:#fff;
					border:none;
					border-radius:3px;
				}

			}
			.noMore{
				background:#9e9e9e!important;
				color:#fff!important;
				}
			
			}
		}
		
}
</style>