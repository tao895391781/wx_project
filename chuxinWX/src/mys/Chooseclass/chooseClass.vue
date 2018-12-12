<template>
	<div id="chooseClass">
		 <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
		<h6>文升阅读课程计划</h6>
		<p >我正在学习的级别：<mark>4</mark>&nbsp;&nbsp;级</p>
		<h6>可选课程(3人开班,6人满班)</h6>
		<div class="chooseLists">
			<div class="coursedetail-a" v-for='i in coursedetail'>
				<p>
					<span>{{i.bookname}}</span>
					<span>邀请</span>
					<span>选课</span>
				</p>
				<ul>
					<li>
						<p>课时</p>
					{{i.classnum}}</li>
					<li>
						<p>开课时间</p>
					{{i.coursedate}}</li>
					<li>
						<p>上课时间</p>
					{{i.coursetime}}</li>
					<li>
						<p>班级已报人数</p>
					{{i.signUppeople}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		data(){
			return {
				coursedetail:[
				{
					bookname:'《小王子》',
					classnum:24,
					coursedate:'2017/12/12',
					coursetime:'每周五晚八点',
					signUppeople:18

				},
				{
					bookname:'《朝花夕拾》',
					classnum:24,
					coursedate:'2017/12/12',
					coursetime:'每周六晚八点',
					signUppeople:18
				},{
					bookname:'《呐喊》',
					classnum:24,
					coursedate:'2017/12/12',
					coursetime:'每周日晚八点',
					signUppeople:18
				},{
					bookname:'《祝福》',
					classnum:24,
					coursedate:'2017/12/12',
					coursetime:'每周二晚十点',
					signUppeople:18
				}
				],
				

			}
		},
		methods:{
			 goback(){
        this.$router.go(-1);
      },
		},
		created(){},

	}
</script>
<style lang="less">
	#chooseClass{
		// margin-bottom: 56px;

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
        p:nth-child(3){
        	text-indent: 1em;
        	margin:.5rem;
        	mark{
        		font-size: 1.8rem;
        		color:#ad7e6a;
        		background: #fff;
        	}
        }
      .chooseLists{
			overflow-y: scroll;  
    		-webkit-overflow-scrolling: touch;
			height:40rem;
      	.coursedetail-a{
      		border:1px solid #eee;
      		margin:0 auto;
      		margin-top: 1rem;
      		width:98%;


      		p{
      			span{
      				display: inline-block;
      				padding:.3rem .5rem;
      				background: #ad7e6a;
      				color:#fff;
      				margin-left: 1rem;
      				margin-top: 1rem;
      				border-radius: 3px;
      				&:nth-child(2),&:nth-child(3){
      					float: right;
      					padding:.3rem 1rem;
      				}
      			}
      		}
      		ul{
      			width:98%;
      			height:10rem;
      			
      			margin:.8rem auto;
      			li{
      				float: left;
      				background: #ffdfc0;
      				margin-top: 0;
      				height:90%;
      				width:25%;
      				// padding:.2rem;
      				border:.1rem solid #FFF;
      				text-align:center;
      				line-height: 10rem;
      				position: relative;
      				p{
      					position: absolute;
      					top:0;
      					left:0;
      					width:100%;
      					height: 2rem;
      					line-height: 2rem;
      					border-bottom: 1px solid #FFF;

      				}

      			}
      		}
      	}
      }

	}
</style>