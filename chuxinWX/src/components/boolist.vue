<template>
		<ul class="commendLists">
				<li v-for='(c,index) in clubClassBooklist || gradedBookList || classifyBookList || PreVideobooklists || hotBook'>
					<div>
						<img :src="c.imgSrc" :alt="index">
					</div>
					<div>
						<p>《{{c.bookName}}》</p>
						<p>推荐版本：{{c.version}}</p>
						<p>建议阅读天数:{{c.adviceReadDay}}</p>
					</div>
					<div>
						<p>{{c.number}} <i class="iconfont" @click='thumbUp(c,index)' :class="{clicks:c.flag}">&#xe668;</i></p>
						<span @click='ImmediateExp(c)'>立即体验</span>
					</div>
				<!-- <h5>{{c.campingName}}</h5> -->
				</li>
			</ul>
</template>
<script>
import {bus} from '../bus.js'
	export default{
		props:['clubClassBooklist','gradedBookList','classifyBookList','PreVideobooklists','hotBook'],
		data(){
			return {
				indexBooklist:[],
				clicked:false,
				inde:'-',
				wxId:'',
				isClicks:false,
				
			}
		},
		methods:{
			ImmediateExp(c){
				console.log(c)
				if(this.routeName=='clubClass'){
					this.$router.push({name:'ImmediateExp',params:{id:c.id}});
			
				}else if(this.routeName=='graded'){
					this.$router.push({name:'ImmediateExp',params:{id:c.id}});
			
				}else if(this.routeName=='historyOver'){
					this.$router.push({name:'ImmediateExp',params:{id:c.id}});
			
				}else if(this.routeName=='totalPreReadVideo'){
					this.$router.push({name:'ImmediateExp',params:{id:c.id}});

				}else {
					this.$router.push({name:'ImmediateExp',params:{id:c.id}});

				}
			},
			thumbUp(c,i){
				console.log(c);
				if(!c.flag){
					let postdata = {
						 wxId:this.wxId,
						 courseId:c.id
					}
					c.number = c.number+1;
					this.indexs = i;
					c.flag = true;
					console.log(postdata)
					this.axios.post(this.ip.RESTPATH+'rest/postClickThumbsup',postdata)
					.then(res=>{
						console.log(res.data);

					})

				}else{
					bus.$emit('tip','你已经点过赞了');
				}
			},
		},
		computed:{
			routeName(){
				return this.$route.name;
			},
		},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			// this.wxId = 'o76bqv9jetyLMDUBy6wEcEUmdrOE';
			console.log(this.$route.name);
			if(this.$route.path == '/ShareIndex/readIndex'){
				this.indexBooklist = this.commendBooklist;
			}else if(this.$route.path == '/ShareIndex/readIndex/clubClass'){
				this.commendList = this.$store.state.commendList;
			}else{
				// this.getGradeBooklist();
			}
			

		},
		mounted(){	
			
		},
	}
</script>
<style lang='less'>
		.commendLists{
			width:100%;
			height:auto;
			background:#f1f1f1;
			    margin-top: .2rem;
			li{
				height:10rem;
				width:100%;
				background:#fcfcfc;
				padding-left:.5rem;
				border-top:1px solid rgba(192, 196, 204, 0.16);
				border-bottom:1px solid rgba(192, 196, 204, 0.16);
				position: relative;
				/*margin-top: 1.2rem;*/
				&>div{
					float: left;
					height:100%;
					&:first-child{
						width:25%;
						img{
							display:inline-block;
							width:95%;
							height:95%;
							margin-top: 2%;
						}
					}
					&:nth-child(2){
						width:50%;
						height:80%;
						margin-top: 2rem;
						&>p{
							text-align: left;
							padding:.3rem 0;
							padding-left:1rem;
							font-size:1.3rem;
							i{
								color:#333;
							}
						}
					}
					&:nth-child(3){
						width:25%;
						span{
							padding:.2rem 1rem;
							background:#f60;
							color:#fff;
							border-radius:5px;
							font-size:1.3rem;
							display:inline-block;
							margin-top: 3rem;
						}
						p{
							text-align: center;
							margin-top: 1rem;

						}
						.clicks{
								color:#f60;
							}
					}
				}
				h5{
					position: absolute;
					padding:.2rem 2rem;
					background: red;
					color:#fff;
					left:50%;
					top:-1rem;
					border-radius: 2px;
					transform: translateX(-50%);
				}
			}
			li:not(:first-child){
					margin-top: .2rem;
				}
		}
</style>