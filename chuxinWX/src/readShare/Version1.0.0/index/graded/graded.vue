<template>
	<section id='graded' v-show='showThis'>
		<header>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div>分级</div>
				<div>
					<!-- <i class="iconfont">&#xe659;</i> -->
				</div>
		</header>
		<nav>
			<ul>
				<li @click='showTypeBooklist(0)' :class="{active:inde==0}"><i class="iconfont">&#xe64e;</i><br>文学</li>
				<li @click='showTypeBooklist(1)' :class="{active:inde==1}"><i class="iconfont">&#xe623;</i><br>古文</li>
				<li @click='showTypeBooklist(2)' :class="{active:inde==2}"><i class="iconfont">&#xe60a;</i><br>历史</li>
				<li @click='showTypeBooklist(3)' :class="{active:inde==3}"><i class="iconfont">&#xe607;</i><br>哲学</li>
				<li @click='showTypeBooklist(4)' :class="{active:inde==4}"><i class="iconfont">&#xe678;</i><br>科学</li>
				<li @click='showTypeBooklist(5)' :class="{active:inde==5}"><i class="iconfont">&#xe676;</i><br>其他</li>
			</ul>
		</nav>
		<ul class="levels">
			<li v-for='(l,index) in levels' @click='showLevelsBooklist(index)' :class="{active:index==indexs}">
				<span>{{l.level}} </span><br>
				<span>{{l.grade}}</span>
			</li>
		</ul>
		<div class="gradeBooklist">
			<p v-show='!ifNoBook'>该级别下暂无书本</p>
			<booklist :gradedBookList='gradedBookList'  v-show='ifNoBook'></booklist>	
		</div>
		
	</section>
</template>
<script>
import booklist from '../../../../components/boolist.vue'
import Vue from 'vue'
import {bus} from '../../../../bus.js'
	export default {
		data(){
			return {
				levels:[{
					level:'预备级',
					grade:'1-2年级'
				},{
					level:'一阶',
					grade:'3-4年级'		
				},{
					level:'二阶',
					grade:'5-6年级'
				},{
					level:'三阶',
					grade:'7-9年级'
				},{
					level:'四阶',
					grade:'10-12年级'
				}],
				indexs:1,
				inde:0,
				width:'',
				gradedBookList:[],
				categoryId:1,
				levelsId:1,
				showThis:false,
				ifNoBook:true,
				wxId:'',


			}
		},
		methods:{
			goback(){
				this.$router.go(-1);
			},
			showLevelsBooklist(index){
				this.indexs = index;
				sessionStorage.setItem('indexs',index);
				// $('.levels').scrollLeft(this.width*(index)/2);
				switch(index)
				{
					case 0:
					this.levelsId = 5;
					break;
					case 1:
					this.levelsId = 1;
					break;
					case 2:
					this.levelsId = 2;
					break;
					case 3:
					this.levelsId = 3;
					break;
					case 4:
					this.levelsId = 4;
					break;
				};
				let levelsId = this.levelsId;
				let categoryId = this.categoryId;
				sessionStorage.setItem('levelsId',this.levelsId);
				sessionStorage.setItem('categoryId',this.categoryId);
				console.log(this.categoryId+'/'+this.levelsId)
				this.getLevelsBookListBook(categoryId,levelsId);

			},
			showTypeBooklist(num){
				this.inde = num;
				sessionStorage.setItem('inde',num);
				switch(num)
				{
					case 0:
					this.categoryId = 1;
					break;
					case 1:
					this.categoryId = 11;
					break;
					case 2:
					this.categoryId = 4;
					break;
					case 3:
					this.categoryId = 7;
					break;
					case 4:
					this.categoryId = 10;
					break;
					case 5:
					this.categoryId = 12;
					break;
				};
				let levelsId = this.levelsId;
				let categoryId = this.categoryId
				sessionStorage.setItem('levelsId',this.levelsId);
				sessionStorage.setItem('categoryId',this.categoryId);
				this.getLevelsBookListBook(categoryId,levelsId);
				
		},
		getLevelsBookListBook(categoryId,levelsId){
			this.axios.get(this.ip.RESTPATH+'rest/getLevelsBooksByLevelsIdAndCategoryId/'+categoryId+'/'+levelsId)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading');
				this.showThis = true;
				if(res.data==0){
					this.gradedBookList  = res.data;
					this.ifNoBook = false;
				}else{
					this.ifNoBook = true;
					this.gradedBookList = res.data;
				let thats = this;
				let PicId = [];
				let dianzan =[];
		 			res.data.forEach(v=>{
		 				console.log(v)
		 				PicId.push(v.imgSrc)
		 				dianzan.push(v.id)
		 			});


		 			console.log(dianzan)
		 			this.axios.get(this.ip.RESTPATH+'rest/getCourseIsToThumbsup/'+dianzan.join(',')+'/'+this.wxId)
		 			.then(res2=>{
		 				console.log(res2.data);
		 					res.data.forEach(v1=>{
		 					console.log(v1)
		 					Vue.set(v1, 'flag', res2.data[v1.id]['flag']);
		 					Vue.set(v1, 'number', res2.data[v1.id]['number'])
		 				})
		 				
		 				console.log(res.data)
		 			})
		 			this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
					.then(function(res1){
						console.log(res1.data)
					res.data.forEach(v=>{
						 Vue.set(v,'imgSrc',thats.ip.filePath1+res1.data[v.imgSrc].href);
					})
					console.log(res.data)

				});

				}
				this.gradedBookList = res.data;
				console.log(this.gradedBookList)

			})
			.catch(err=>{
				console.log(err)
			})

		},
	},
	beforeCreate(){
		bus.$emit('loading');
	},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			// this.wxId = 'o76bqv9jetyLMDUBy6wEcEUmdrOE';
			this.inde = sessionStorage.getItem('inde')?sessionStorage.getItem('inde'):this.inde;
			this.indexs = sessionStorage.getItem('indexs')?sessionStorage.getItem('indexs'):this.indexs;
			let that = this;
			$(function(){
				that.width = $('.levels').find('li').width();
			});
			// let levelsId = this.levelsId;
			// let categoryId = this.categoryId;
			let levelsId = sessionStorage.getItem('levelsId')?sessionStorage.getItem('levelsId'):this.levelsId;
			let categoryId = sessionStorage.getItem('categoryId')?sessionStorage.getItem('categoryId'):this.categoryId;
			this.getLevelsBookListBook(categoryId,levelsId);
		},
		
		components:{
			booklist,
		},

	}
</script>
<style lang='less'>
	#graded{
		width:100%;
		height:100%;
		background:#f2f2f2;
		display:flex;
		-webkit-display:flex;
		flex-direction: column;
		-webkit-flex-direction: column; 
		&>header{
			height:43px;
			margin-bottom: 1px;
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
				&:nth-child(3){
					width:20%;
					color:#f60;
				}
			}
		}
		nav{
			width:100%;
			background:#fff;

			ul{
				width:100%;
				height:100%;
				display:flex;
    			justify-content:space-around;
    			-webkit-display:flex;
    			-webkit-justify-content:space-around;
				li{
					width:15%;
					margin-top: 0;
					text-align:center;
					padding:.8rem 0;
					font-size:1.2rem;
					color:rgba(0,0,0,.5);
					/* &>i{
						font-size:1.7rem;
						color:#73859f;
					}
					&:nth-child(2){
						i{
						color:#409eff;
						}
					}
					&:nth-child(3){
						i{
						color:#e41313;	
						}
					}
					&:nth-child(4){
						i{
						color:#febc38;	
						}
					}
					&:nth-child(5){
						i{
						color:#ec0eec;	
						}
					}
					&:last-child{
						i{
						color:#73859f;
						}
					} */
				}
				&>.active{
					color:#f60;
					border-bottom:1px solid #f60;
				}
			}
		}
		.levels{
			height:5rem;
    		overflow-x: scroll;  
            overflow-y: hidden; 
            -webkit-overflow-scrolling:touch;
            white-space: nowrap;	
            background:#fff;
            margin:.1rem 0 ;
    		li{
    			margin-top: 0;
    			width:20%;
    			display:inline-block;
    			height:100%;
    			text-align:center;
    			font-size:1.2rem;
    			span{
    				display: inline-block;
    				margin-top: .5rem;
    			}
    		}
    		&>.active{
					color:#f60;
					border-bottom:1px solid #f60;
				}
		}
		.gradeBooklist{
			flex:1;
			-webkit-flex:1;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
			&>p{
				text-align: center;
				margin-top: 20%;
			}
		}
		
	}
	
</style>