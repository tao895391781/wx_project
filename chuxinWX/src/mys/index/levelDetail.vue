<template>
	<div id="leveldetail">
    <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
		<div class="read-level">
      			<h6>我的文升阅读级别</h6>
      			<p>文升四级 &nbsp;&nbsp;&nbsp;文升五级</p>
      			<div class="study-progress">文升级别学习进程:<p class="energy"><span class="energy-progress"></span></p></div>
      			<div class="total-study">累计阅读学习量:128万字</div>
      			<ul>
      				<li v-for='i in levelmount'>
      					
      				</li>
      			</ul>
      			<p class="num"><span v-for='i in levelmount'></span></p>
      			<p class="level-intro">文升级别说明</p>
    	</div>
    	<div class="read-report">
    		<h6>我的文升阅读级别报告
 			
    		</h6>
    		<ul>
    			<li v-for='li in readreport' @click='myreport'>
    				<img src="../../../static/ooo.jpg" alt="">
    	    		<p>发布日期:</p>
    	    		<span>文升阅读<br>级别报告</span>
    			</li>
    		</ul>

    	</div>
	</div>
</template>


<script>
	
	export default{
		data(){
			return {
				levelmount:[1,1,1,1,1,1,1,1,1,1],
				readreport:[1,1,1,1,1,1,1,1,1],
				spreads:true,
            	retracts:false,
			}
		},
		methods:{
      goback(){
        this.$router.go(-1);
      },
			myreport(){
				this.$router.push({name:'myreport'})
			},
			 

		},
		created(){
			$(function(){
				for(let i=0;i<10;i++){
					// console.log(i)
				$('.read-level').find('ul li').eq(i).css({'position':'absolute','left':i*30+'px'})
				$('.read-level').find('ul li').eq(i).css('height',i*15+20+'px')
				$('.read-level').find('.num').find('span').eq(i).text(i+1);
	
			}
			$('.read-level').find('ul li:lt(8):gt(4)').css('background',' #269d67').text('已读级别');
			$('.read-level').find('ul li').eq(7).text('在读级别').css('background',' #269d67');
			$('.read-level').find('ul li').eq(5).text('入学级别').css('background',' #269d67');
			
			
			});

		},

	}
</script>

<style lang="less">
	#leveldetail{
		 width: 100%;
		 height: 100%;
    overflow: scroll;
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
          	font-weight: 400;
          	margin:.2rem;  
          	 span{
            position: absolute;
            right:.3rem;
            bottom:0;
            .iconfont{
              font-size: 1rem;
            }
           
          }        }
    	 .read-level{	 	
        	height:61%;
        	width:100%;
        	border-bottom:1px solid #eee;
        	position: relative;
        	margin-bottom: .3rem;
        	.num{
        		width:90%;
        		margin:0 auto;
        		height:1rem;
        		span{
        			display: inline-block;
        			width:1.5rem;
        			margin-right: 1rem;
        		}
        	}
        	ul{
        		width:90%;
        		height:13rem;
        		background:rgba(200,200,200,.1);
        		position: relative;
        		margin:0 auto;
        		li{
        		position: absolute;
        		bottom: 0;
        		float: left;	
        		margin-top: 0;
        		margin:0 1.8rem;
        		background: #ddd;
        		width:1.5rem;
        		height:5rem;
        		border-radius: 3px 3px 0 0;
        		font-size: 1rem;
        		writing-mode:tb;
        		color:#fff;
        		letter-spacing: .2rem;
        		padding-top:1rem;
        		span{
        			position: absolute;
        			bottom:-1rem;
        			left:0;
        			display: inline-block;
        			width:100%;
        			writing-mode:lr;
        			height:1rem;
        			color:#666;
        		}
        		}	
        	}
        	.level-intro{
        		display: inline-block;
        		font-size: 1.2rem;
        		padding:.2rem .5rem;
        		float: right;
        		background: #269d67;
        		color:#fff;
        		margin-top: 1rem;
        		margin-right: 4rem;
        		border-radius: 3px;

        	}
         
        p{
            text-align: center;
            font-size: 1rem;         
          }
       .energy{
          position: relative;
          height:4px;
          display: inline-block;
          border-radius: 3px;
          width:50%;
          background: #eee;
          margin-bottom: .2rem;
          margin-left: .5rem;
          .energy-progress{
            position: absolute;
            left:0;
            top:0;
            height:4px;
            width:40%;
            border-radius: 3px;
            background:#ce3232;

          }

        }
        div{
          padding:.1rem;
          text-indent: 1em;
          color:#666;
          font-size: 14px;
        }
      }
      .read-report{
      	width:100%;
      	height:30%;
      	overflow:hidden;
		ul{
			width:90%;
			background: rgba(200,200,200,.09);
			height:100%;
			margin:0 auto;
			display: flex;
          	flex-wrap:wrap;
          	justify-content:space-around;
          	padding-bottom: 3rem;
          	// margin-bottom: 1rem;
          	overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			li{
				width:40%;
				height:7rem;
				background-color: green;
				margin-top: .3rem;
				margin-bottom: 3rem;
				position: relative;
				img{
					display: inline-block;
					height:100%;
					width:100%;
					margin:0 auto;
				}
				p{
					text-indent: 1em;
					margin-top: .4rem;
				}
				span{
					position: absolute;
					left:0;
					bottom:0;
					right:0;
					top:0;
					margin:auto;
					display: inline-block;
					width:40%;
					height:50%;
					font-size: 12px;
					color:#b17272;

				}

			}
		}
      }
	}
</style>