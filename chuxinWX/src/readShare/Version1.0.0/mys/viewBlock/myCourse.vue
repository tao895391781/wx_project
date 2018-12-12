<template>
	<section id="myCourse" v-show='showThis'>
        	<div class="mysBuyCourse">
                <section class="mainContent" v-if='!hasCourse'>
                  <ul>
                    <li v-for='c in myCourse' @click='goDetail(c.id,c.isFinish)'>
                      <h6 :class="{finish:c.isFinish == 'finish',
                      			   running:c.isFinish == 'running',
                      			   begin:c.isFinish == 'begin'}">{{finishStatus[c.isFinish]}}</h6>
                      <div class="box">
                      		<div class="left">
                      			<img :src="c.picId" alt="">
                      		</div>
                      		<div class="right">
                      			<p>
                      				<span class="themn">{{wahtClub[c.theme-1]}}</span>
                      				{{c.name}}
                      			</p>
                      			<p>
                      				<span class="bookDate">共{{c.number}}本书</span>
                      				<span class="bookDate">{{c.beginDate}}-{{c.finishDate}}</span>
                      			</p>
                      		</div>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="noCourse" v-if='hasCourse'>
                	<i class="iconfont">&#xe657;</i><br>
                	<p>{{courseText}}</p>
                	<button @click='goIndex'>营课报名</button>
                </section>
              </div>
		
	</section>
</template>
<script>
import {bus} from '../../../../bus.js'
import Vue from 'vue'
	export default{
		data(){
			return {
				index:0,
				myCourse:[],
				myCourse1:[],
				courseText:'没有参加营课赶快来参加吧',
				flag:true,
				showThis:false,
				finishStatus:{
					'running':'正在进行',
					'finish':'已完成',
					'begin':'尚未开始'
				},
				wahtClub:['挑战营','','精读营课'],

			}
		},
		computed:{
			hasCourse(){
				if(this.flag){
						return this.myCourse === false ? true:false
					}
			},
		},
		methods:{
			goDetail(id,iffinish){
				if(iffinish == 'begin'){
					bus.$emit('showtips1','营课尚未开始')
				}else{
					//存储session保存compainid任务模块要用到
					sessionStorage.setItem('companidSign_',id)
					this.$router.push({name:'clubdetail',params:{id:id}});
				}
				
			

			},
			goIndex(){
				this.$router.push({name:'readIndex'})
			},
			getMyBuyCoursess(){
	            let  that = this;
	            // this.axios.get('/api/getCourse')
	            console.log(this.ip.RESTPATH+'rest/getCampingBookByWXId/'+this.wxId)
	            this.axios.get(this.ip.RESTPATH+'rest/getCampingBookByWXId/'+this.wxId)
	              .then(res=>{
	              	console.log(res.data)
	                this.showMyCourse = true;
	                bus.$emit('closeloading')
	                this.showThis = true;
	                this.myCourse = this.sorts(res.data);
	                console.log(this.myCourse)
	                if(res.data.length!=0){
	                let imgPath = [];
	                res.data.forEach(v=>{
	                  imgPath.push(v.picId)
	              
	                });
	                console.log(imgPath)
	                this.axios.get(this.ip.filePath+"rest/download/links?ids="+imgPath.join(','))
	                .then(res1=>{
	                	console.log(res1.data)
	                  res.data.forEach((v2,index,arr)=>{
	  
	                      v2.picId =  that.ip.filePath2+res1.data[v2.picId].href;
	               
	                  })
	                });

	              }
	            });
			},
			sorts(arr){
				let arr1 = [];
				if(arr.length === 0){
					return false;
				}else{
					for(let i =0;i<arr.length;i++){
						if(arr[i].isFinish == 'running'){
							arr1.unshift(arr[i]);
						}else if(arr[i].isFinish == 'finish'){
							arr1.push(arr[i]);
						}else{
							arr1.push(arr[i])
						}
					}
				}
				return arr1;
			},
			goTaskPage(id){
				console.log(event)
				console.log(this.$route.path)
				if(this.$route.path == '/readIndex'){
					this.$router.push({name:'ImmediateExp',params:{id:id},query:{from:'myCourse'}});
				}else{
					this.$router.push({name:'ImmediateExp',params:{id:id},query:{from:'myCourse1'}});
				}
				
			},
			changeShowMyCourses(){
						this.index = 0;
						bus.$emit('ShowMyCoursesChanged')
					},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			this.getMyBuyCoursess();
		},
	}
</script>
<style lang="less">
	#myCourse{
		width:100%;
		flex:1;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
		  .mysBuyCourse{
		      width:100%;
		      background:#f2f2f2;
		      h5{
		        height: 3.5rem;
		        line-height: 3.5rem;
		        font-size: 2rem;
		        border-bottom:1px solid #f2f2f2;
		        text-align: center;
		        position: relative;
		        i{
		          font-weight: 700;
		          font-size: 2rem;
		          padding:0 1rem 0;
		          position: absolute;
		          right:1rem;
		          top:0;
		        }
		      }
		   
		      .mainContent{
		        border-radius: 5px;
		        ul{
		          width:100%;
		          height: 100%;
		          li{
		          	   background:#fff;
		          	   margin-top: 0;
		          	   margin-bottom: .4rem;
		          	   box-shadow: 2px 2px 2px #ccc;
		            h6{
		              line-height: 3rem;
		              font-size: 1.5rem;
		              text-indent:1em;
		            }
		            .finish{
		            	color:#f34b4b;
		            }
		            .running{
		            	color:#03a9f4;
		            }
		            .begin{
		            	color:#9e9e9e;
		            }
		            .box{
		            	width:100%;
		            	overflow:hidden;
		            	padding:.2rem 0 .7rem;
		       
		            	div{
		            		float: left;
		            		height:100%;
		            	}
		            	.left{
		            		width:5rem;
		            		height:6rem;
		            		margin:0 1em;
		            		overflow:hidden;
		            		border-radius:3px;
		            		img{
		            			width:100%;
		            			height:100%;
		            		}
		            	}
		            	.right{
		        			margin-left: 1rem;
		            		height:6rem;
							width:60%;
		            		p{
		            			width:100%;
		            			line-height:3rem;
		            			color:#000;
		            			font-size:1.3rem;
		            			white-space:nowrap;
		            			overflow:hidden;
		            			text-overflow:ellipsis;
		            			&:first-child{
		            				position:relative;
		            				top:-.3rem;
		            			}
		            			.themn{
		            				padding:.1rem 1rem;
		            				font-size:1rem;
		            				color:#f34b4b;
		            				border:1px solid #f34b4b;
		            				border-radius:8px;
		            			}
		            			.bookDate{
		            				color:#9e9e9e;
		            				font-size:1.4rem;
		            			}
		            		}

		            	}
		            }
		          }
		        }
		      }
		      .noCourse{
		      	text-align:center;
		      	flex:1;
		      	font-size: 1.8rem;
		      	background: #fff;
		      	i{
		      		font-size:10rem;
		      		line-height:13rem;
		      		color: #ddd;
		      	}
		      	button{
		      		background: #67d1de;
		      		color: #fff;
		      		padding: 1rem 5rem;
		      		margin-top: 5rem;
		      		border-radius:5px;
		      		font-size:1.8rem;
		      	}
		      }
		    }
		  
	}
</style>