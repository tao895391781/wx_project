<template>


	
	<div id="mytable">
		  <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
		  <h6>我的课时</h6>
		  <div class="myclasstime"> 	
		 	<ul>
		 		<li>总课时</li>
		 		<li>24</li>
		 		<li>已选课时</li>
		 		<li>18</li>
		 		<li>已消耗课时</li>
		 		<li>8</li>
		 	</ul>
			</div>
			<p class="chooseClass" @click='goChooseclass'>我要选课</p>
		  <h6>我的课表</h6>


		  <div class="tabledetail">
		  	<div class="tablelist" v-for='(t,index) in table'>
		  		<p  class='date'>
		  			<i class="iconfont dif">&#xe642;</i>
		  			{{t}}
 					<span v-show='spreads' @click='spread'>展开<i class="iconfont">&#xe604;</i></span>
        			<span v-show='retracts' @click='retract'>收起<i class="iconfont">&#xe74b;</i></span>
		  		</p>
		  		<div class="tablebox" v-show='retracts'>
		  			<ul>
		  				<li>课次</li>
		  				<li>日期</li>
		  				<li>时间</li>
		  				<li>课程内容</li>
		  				<li>状态</li>
		  			</ul>
		  		
		  			<ul v-for='i in count' >
		  				<li v-for='st in state'>{{st}}</li>
		  			</ul>
		  		</div>
		  	</div>
		  </div>


	</div>
</template>
<script>
	export default{
	data(){
		return {
			table:['2017年7月','2017年8月','2017年9月','2017年10月'],
				spreads:true,
            	retracts:false,
            	count:[1,1,1,1],
            	state:{
            		times:1,
            		date:'12/08',
            		time:'20:00-22:00',
            		content:'<西游记我我的我的>',
            		zt:'课堂小结'
            	},

		}
	},
	//具体时间课表
	// components:{
	// 	'date-table':{
	// 		template:`

	// 		`,
	// 		data(){
	// 			return {}
	// 		},
	// 		methods:{},
	// 		created(){}

	// 	}

	// },
	// //课表组件
	methods:{
		 goback(){
        this.$router.go(-1);
      },
       spread(){
                this.spreads=false;
                this.retracts=true;   
                  },
            retract(){
                this.spreads=true;
                this.retracts=false;
                
    },
    goChooseclass(){
    	this.$router.push({name:'chooseClass'})
    },
	},
	created(){
		$(function(){

		})
	},
	}
</script>
<style lang='less'>
#mytable{
	width:100%;
	height:100%;

.goback{
      border-bottom:1px solid #eee;
      .iconfont{
        font-size: 18px;
        margin-left: .5rem;
        display: inline-block;
        width:5rem;
      }
    }
    h6{
          border:1px solid #ddd;
          padding:.3rem 1rem;
          margin:0 1rem;
          border-radius: 3px;
          position: relative;
          // font-weight: 400;
          color:#666;
          margin-top: .3rem;
          span{
            position: absolute;
            right:.3rem;
            bottom:0;
            .iconfont{
              font-size: 1rem;
            }       
          }
        }
        .myclasstime{
        	width:100%;
        	ul{
        	width:100%;
        	height:5rem;
        	line-height: 5rem;
        	margin-top: .5rem;
        	margin-left: .2rem;
        	li{
        		width:16%;
        		height:100%;
        		margin-right: .2rem;
        		float: left;
        		margin-top: 0;
        		background: #7dc0ab;
        		border:1px solid #ddd;
        		text-align: center;
        		color:#fff;
        		border-radius: 5px;
        		&:last-child{
        			margin-right: 0;
        		}
        		&:nth-child(5){
        			line-height: 20px;
        			padding-top: 1.1rem;
        		}
        		// &:nth-child(2),&:nth-child(4),&:nth-child(6){
        		// 	background:#7dc0ab;
        		// }

        	}
        }
        }
        .chooseClass{
        	margin: .5rem 0;
        	margin-left: 75%;
        	
        	display:inline-block;
        	// padding:.2rem .8rem;
        	height:25px;
        	line-height: 25px;
        	padding:0 .8rem;
        	background:#7dc0ab;
        	border-radius: 2px;
        	color:#FFF;
        }
        .tabledetail{
			width:94%;
			height:59%;
			background:#fafafa;
			margin:1rem auto;
			border-radius: 5px;
			// overflow:hidden;
			overflow-y: scroll;
			-webkit-overflow-scrolling:touch;
			overflow-scrolling:touch;

			.tablelist{
				width:100%;
				margin:0 auto;
				height:auto;
			.date{
				height:2.5rem;
				line-height: 2.5rem;	
				width:100%;
				background:#7dc0ab;
				margin:.5rem 0;
				border-radius: 3px;
				color: #fff;
				text-indent: .5em;
				position: relative;
				.dif{
					font-size: 1.8rem;
				}
				 span{
            		position: absolute;
            		right:.3rem;
            		bottom:0;
            		font-size: 1.3rem;
            		.iconfont{
              			font-size: 1rem;
              			line-height: 2rem;
            }       
          }
		}
		.tablebox{
			width:100%;	
			border-radius: 3px;
			height:17.5rem;
			ul{
				width:100%;
				height:3.1rem;
				background: #fff;
				margin:.5rem;
				li{
					float: left;
					height:100%;
					margin-top:0 ;
					margin-right: .2rem;
					text-align: center;
					background: pink;
					font-size: 1rem;
					word-wrap: break-word;  
    				word-break: normal; 
    				 line-height: 3rem;
    				 width:12%;
    				 color:#fff;
    				background: #7dc0ab;
					&:first-child{
					
					}
					&:nth-child(2){
					// background: #91abe8;
				
					}
					&:nth-child(3){
					// background: #b4a2d9;
					line-height: 18px;
				
					}
					&:nth-child(4){
					// background: #7dc0ab;
					width:40%;
					}
					&:last-child{
					// background: #f49f9f;
					width:18%;
					}
				}
				&:first-child{
					li:nth-child(3){line-height: 3rem;}
				}
			}

		}
	  }
    }
  }
</style>