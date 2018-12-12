<template>
	<section id='search' v-show='showSearchs'>
		<!-- <img src="../assets/images/Nbg1.png" alt=""> -->
	<p class="boxSearch">
		<i class="iconfont" @click='goback'>&#xe655;</i>
		<input type="text" id="searchB" v-model='name' placeholder="请输入书名查找">
		<i class="cancle" @click='search'>搜索</i>
	</p>
	<h5 v-show='searching'>历史搜索</h5>
	<p v-show='showNoHistory' class="noHistory">暂无搜索记录</p>
	<ul class="searchRecord" v-show='searching'>
		<li v-for='b in history' @click='goHistBook(b)'>{{b.bookName|| b}}</li>
	</ul>
	<p class="delHistory" @click='delHistory' v-show='showHistory'>清除记录<i class="iconfont">&#xe7b1;</i></p>
	<ul class="booklists" v-show='ifInput'>
		<li v-for='b in booklists' @click='goHotBooks(b)'>{{b.bookName}}
			<i class="iconfont">&#xe775;</i>
		</li>
	</ul>
	
		<h5>热门书籍</h5>
		<div class="hotBook">
			<ul>
				<li v-for='b in hotBook' @click='goHotBook(b)'>{{b.bookName}}</li>
			</ul>
		</div>
	<div v-show='noBooks' class="boxBooks">
		<i class="iconfont" @click='noBooks=false,name="",searching=true,showHistory=true'>&#xe627;</i>
				<p>{{nobookName}}</p>
					<div class="rightBook  nobook">
						<p>{{nobookName}}&nbsp;&nbsp;未在文升阅读的精读课程体系之内，敬请期待！</p>
					</div>
				</div>
	</section>
</template>
<script>
import {bus} from '../bus.js'
import Vue from 'vue'
	export default{
		data(){
			return {
				history:[],
				name:'',
				ifInput:false,
				showText:true,
				searching:true,
				arr:[],
				arrs:[],
				hotBook:[],
				booklists:[],
				noBooks:false,
				bookName:'',
				nobookName:'',
				showNoHistory:true,
				flag:false,
				showHistory:false,
				showSearchs:false,
		}
	},
		methods:{
			delHistory(){
				this.history =[];
				localStorage.setItem('history','');
				this.showNoHistory=true;
				this.showHistory=false;
			},
			goback(){
				this.$router.go(-1);
			},
			search(){
				if(this.name==''){
						bus.$emit('tip','请输入书名');	
					}else{
						if(this.booklists==''){
							this.noBooks = true;
							this.nobookName =this.name;
							let flag = true;
								if(localStorage.getItem('history')){
									let newArr = JSON.parse(localStorage.getItem('history'));
									for(let i = 0;i<newArr.length;i++){
										if(newArr[i]==this.nobookName){
											flag = false;
											return;
										}
									}
									if(flag){
										console.log(newArr.length);
											if(newArr.length>7){
												newArr.pop();
												}
												newArr.unshift(this.nobookName);
									}
										let newArrs = new Set(newArr);
										localStorage.setItem('history',JSON.stringify(newArrs));
										this.history = JSON.parse(localStorage.getItem('history'));
											console.log(this.history)
										}else{
											let arr=[];
											arr.push(this.nobookName)
											localStorage.setItem('history',JSON.stringify(arr));
											this.history = JSON.parse(localStorage.getItem('history'));

											
										}
											}else{
												this.noBooks =false;
												}
											}
			},
			goHistBook(b){
				if(b.id){
						this.$router.push({name:'ImmediateExp',params:{id:b.id}});
						sessionStorage.setItem('bookInfo',JSON.stringify(b));	
				}else{
					this.noBooks = true;
					this.nobookName = b;
				}	

			},
				goHotBook(b){
						this.$router.push({name:'ImmediateExp',params:{id:b.id}});
			},
			goHotBooks(b){
				console.log(b)
					this.nobookName =b;
					console.log(this.nobookName)
					let flag = true;
								if(localStorage.getItem('history')){
									let newArr = JSON.parse(localStorage.getItem('history'));
									console.log(newArr)
									for(let i = 0;i<newArr.length;i++){
										if(newArr[i].id==this.nobookName.id){
											flag = false;
										this.$router.push({name:'ImmediateExp',params:{id:b.id}});	
											return;
										}
									}
									if(flag){
										console.log(newArr.length);
											if(newArr.length>7){
												newArr.pop();
												}
												newArr.unshift(this.nobookName);
									}
										let newArrs = new Set(newArr);
										localStorage.setItem('history',JSON.stringify(newArrs));
										this.history = JSON.parse(localStorage.getItem('history'));
										console.log(this.history)
										}else{
											let arr=[];
											arr.push(this.nobookName)
											localStorage.setItem('history',JSON.stringify(arr));
											this.history = JSON.parse(localStorage.getItem('history'));	
											this.$router.push({name:'ImmediateExp',params:{id:b.id}});		
										}
			},
			getHotBook(){
				//获取热门书籍
				let that = this;
				this.axios.get(this.ip.RESTPATH+'/rest/getHotBooks')
						.then(res=>{
							console.log(res.data);
							bus.$emit('closeloading');
							this.showSearchs = true;
							this.hotBook = res.data;
							let PicId = [];
							res.data.forEach(v=>{
								PicId.push(v.picId)
							})
							this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
							.then(function(res1){
							console.log(res1.data)
								res.data.forEach(v=>{
								v.picId = that.ip.filePath1+res1.data[v.picId].href
								})
								console.log(res.data)
							});
						})
			},
			goPlane(b){
				console.log(b.picId)
				let that = this
				console.log('获取的书目图片地址')	
							this.axios.get(this.ip.filePath+"rest/download/links?ids="+b.picId)
							.then(function(res1){
								Vue.set(b,'picId',that.ip.filePath1+res1.data[b.picId].href);				
								console.log(b)
								sessionStorage.setItem('bookInfo',JSON.stringify(b));
								let flag = true;
								if(localStorage.getItem('history')){
									let newArr = JSON.parse(localStorage.getItem('history'));
									for(let i=0;i<newArr.length;i++){
										if(newArr[i].id==b.id){
											flag = false;
											return ;
										}
									}
									if(flag){
											if(newArr.length>7){
											newArr.pop();
											}
										newArr.unshift(b);
									}
									const newArrs = new Set(newArr);
									console.log(newArrs)
									localStorage.setItem('history',JSON.stringify(newArrs))
								}else{
									let arr=[];
									arr.push(b)
									localStorage.setItem('history',JSON.stringify(arr))
								}
											this.$router.push({name:'ImmediateExp',params:{id:b.id}});
							})
			},
			Trim(str){ 
  					return str.replace(/(^\s*)|(\s*$)/g, ""); 

				},	
		},
		beforeCreate(){
			bus.$emit('loading');
		},
		created(){
			let that = this;
			this.getHotBook();
			if(localStorage.getItem('history')){
				this.history = JSON.parse(localStorage.getItem('history'));
				if(this.history.length>0){
				this.showNoHistory = false;
				this.showHistory = true;

			}
			}
			
			$(function(){
				$('#searchB').focus(function(){
					that.showText = false;	
				})
				$(document).on('input propertychange','#searchB',function (e) {
					console.log(that.name.length)
					//去搜索名字中的空格
					let reg =/\s/;
					if(reg.test(that.name)){
							bus.$emit('tip','不能输入空格');
							that.name = that.Trim(that.name);
							
					}else{
					if(that.name.length>0){
						that.showNoHistory = false;
						that.showHistory = false;
						that.ifInput = true;
						that.showText = false;
						that.searching = false;
						// console.log(that.name)
						that.axios.get(that.ip.RESTPATH+'rest/getBookByName/?condition='+that.name)
						.then(res=>{
							console.log(res.data);
							that.booklists = res.data;

						})
					}else{
						that.showHistory = true;
						that.ifInput = false;
						that.showText = true;
						that.searching = true;
						that.noBooks =false;
					}
				}
				})
			})
		},
		computed:{
	},
	}
</script>
<style lang='less'>
	#search{
		width:100%;
		height:auto;
		position:relative;
		overflow:hidden;
		background:rgba(242, 242, 242, 0);
		::-webkit-input-placeholder { color:rgba(0,0,0,.5);font-size: 1.4rem;text-indent:1em;text-align: left;line-height:2.5rem;}
		&>img{
			width:100%;
			display: inline-block;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: -1;
		}
		.boxSearch{
			width:100%;
			height:3.3rem;
			margin-left: 2%;
			margin-top: .8rem;
			display:inline-block;
			position:relative;
			input{
				width:60%;
				height:100%;
				border-radius:3px;
				outline:none;
				line-height:3.3rem;
				text-indent:1em;
				font-size:1.4rem;
				outline-color: invert ;  
			    outline-style: none ;  
			    outline-width: 0px ;  
			    border: none ;  
			    border-style: none ;  
			    text-shadow: none ;  
			    -webkit-appearance: none ;  
			    -webkit-user-select: text ;  
			    outline-color: transparent ;  
			    box-shadow: none;  
				border: 1px solid #DBDBDB;

			}
		&>:first-child{
			display:inline-block;
			width:5rem;
			text-indent: .5rem;
			color:#777;
			font-size: 1.7rem;
		}
		.icont{
			position: absolute;
			display:inline-block;
			height:100%;
			line-height:2.5rem;
			right:22%;
			top:0;
		}
		span{
			position:absolute;
			display:inline-block;
			height:100%;
			line-height:2.5rem;
			left:2em;
			font-size:1.4rem;
			top:0;
			color:rgba(0, 0, 0, 0.36);
		}
		.cancle{
			display:inline-block;
			font-style:normal;
			margin-left: 2rem;
			color:#777;
		}
		}
		.noHistory{
			text-align:center;
			color:#666;
			font-size:1.3rem;
		}
		h5{
			margin-left: 1rem;
			font-size:1.3rem;
			margin-top: 2rem;
			display:inline-block;
			padding:.4rem 2rem;
			background:#fff;
			color:#555;
			border:1px solid #eee;
			border-left:5px solid #f60;
		}
	.searchRecord{
		width:100%;
		padding:0 1rem;
		max-height:10rem;
		margin-top: .5rem;
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		display:flex;
		flex-wrap:wrap;
		/* justify-content:space-around; */
		-webkit-display:flex;
		-webkit-flex-wrap:wrap;
		/* -webkit-justify-content:space-around; */
		li{
			margin-top: 0;
			background:#73859f;
			color:#fff;
			padding:.3em 1rem;
			margin-top: .8rem;
			border-radius:5px;
			font-size:1.3rem;
			margin-right: 1rem;

		}
	}
	.delHistory{
		text-align: right;
		color:rgba(0, 0, 0, 0.52);
		margin:.5rem 2rem 0 0;
		font-size:1.2rem;
		i{
			font-size:1.2rem;
		}
	}
	.booklists{
		max-height:50%;
		width:100%;
		padding:1rem .5rem 0;
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		li{
			padding:.5rem 0;
			border-bottom:1px solid #eee;
			color:#333;
			text-indent: 2em;
			i{
				float: right;
				margin-right: 1rem;
			}
		}

	}
	.hotBook{
		width:95%;
		margin:0 auto;
		ul{
		width:100%;
		max-height:20rem;
		margin-top: .5rem;
		/*display:flex;
		flex-wrap:wrap;
		-webkit-display:flex;
		-webkit-flex-wrap:wrap;*/
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		li{
			margin-top: 0;
			background:#73859f;
			color:#fff;
			padding:.3em 1rem;
			margin-top: 1rem;
			border-radius:5px;
			font-size:1.3rem;
			margin-right: 1rem;
			letter-spacing:1px;
			display: inline-block;
		}
		}
	}
	.boxBooks{
			height: 35%;
			width:80%;
			margin-top:0;
			position:fixed;
			overflow:hidden;
			z-index: 1;
			top:15%;
			left:10%;
			background: #73859f;
			border:1px solid #eee;
			border-radius: 10px;
			&>i{
				position: absolute;
				right:1rem;
				top:1rem;
				color:#fff;
				font-size:2rem;
			}
			&>p{
				width:60%;
				position: absolute;
				top:0;
				left:20%;
				text-align: center;
				height:2.6rem;
				line-height: 2.6rem;
				z-index: 888;
				/*background: #c5a971;*/
				color:#fff;
				font-size: 1.7rem;
				letter-spacing: 1px;
				border-radius: 10px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			&>img{
				position: absolute;
				width:100%;
				height: 100%;
				left:0;
				top:0;
				z-index: -1;
			}
			&>div{
				float: left;
				height:90%;
				margin-top: 10%;
			}
			.rightBook{		
				width:100%;
				p{
					margin-top: 3rem;
					color:#fff;
					line-height: 3rem;
					text-align:center;
					padding:0 3rem;
					font-size: 1.7rem;
				}
			}
		}

	}
</style>