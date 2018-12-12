<template>
<div class="exam">
	<header>
		<md-icon class='md-size-2x' @click.native="goback">reply</md-icon>
		<span >《{{getbook.name}}》</span>
	</header>
	<div class="result">
		<div class="result-head">
			<span>已打卡</span><img src="../../assets/images/smile.png" alt="">
		</div>

		<div class="result-con" >

			<div class="result-con_hammer">
				<p v-if="showscore">本次打卡<b>{{score}}</b>积分</p>
				<img src="../../assets/images/egg.png"  v-if="!hammerClicked" alt="egg">
				<img src="../../assets/images/egg_success.gif"   v-if="hammerClicked" alt="successegg">
				<img src="../../assets/images/hammer.gif" class="hammer"  @click="hammerC($route.params.type)" v-if="!hammerClicked" alt="hammer">
			</div>
			<div v-if='false' class="hiteggs">
				您已经砸过蛋了！^-^
			</div>
			
			<p>
				<span>你是第<b>{{$route.params.flag}}</b>个完成打卡的！</span>
				<span>离奖学金又近了一步！</span>
			</p>
		</div>

	</div>
</div>


</template>

<script>

import { mapActions } from 'vuex'
import { bus } from '../../bus.js';
export default {

  data() {
  	return {
  		hammerClicked:false,
  		showscore:false,
  		score:Math.floor(Math.random()*10+1),
  	}
  },
  methods:{
  	...mapActions({
  		saveLucky:'saveLucky'
  	}),
		goback(){
			this.$router.go(-2)
		},
		hammerC(type){
			console.log(type)
			let USERID=sessionStorage.getItem('i');
			//锤子点击事件
			var _this=this;
			_this.hammerClicked=true;
			 console.log('上传预习打卡积分');
			 if(type=='prep'){
			 	var data={
             		userId:USERID,
             		type:'PREPLUCKY',
             		score:this.score,
             		foreignKey:_this.$store.state.currentBook.id
             	}
             }else if(type=='read'){
             	var data={
             		userId:USERID,
             		type:'READLUCKY',
             		score:this.score,
             		foreignKey:_this.$store.state.currentBook.id
             	}
             }else if(type=='think'){
             	var data={
             		userId:USERID,
             		type:'THINKLUCKY',
             		score:this.score,
             		foreignKey:_this.$store.state.currentBook.id
             	}
             }else if(type=='test'){
             	var data={
             		userId:USERID,
             		type:'TESTLUCKY',
             		score:this.score,
             		foreignKey:_this.$store.state.currentBook.id
             	}
             }		 
          		 console.log(data)
          this.axios.post(this.ip.RESTPATH+'rest/point',data)
          .then(sres => {
            console.log(sres);
            console.log('积分上传成功');

            if(sres.data.point==true){
			bus.$emit('tip','您已砸过蛋了')
            }else{
            	setTimeout(function () {
				//切换破裂动画的金蛋gif后600毫秒展示积分
				_this.showscore=true;
				setTimeout(function (){
					_this.$router.push({name:'review',params:{signid:_this.$store.state.currentBook.id,type:_this.$route.params.type},query: { to:true }})
				},1600)
			},600)
            }
        })
			// setTimeout(function () {
			// 	//切换破裂动画的金蛋gif后600毫秒展示积分
			// 	_this.showscore=true;
			// 	setTimeout(function (){
			// 		_this.$router.push({name:'review',params:{signid:_this.$store.state.currentBook.id,type:_this.$route.params.type},query: { to:true }})
			// 	},1600)
			// },600)

		}
  },
	computed:{
		getbook(){
			return this.$store.state.currentBook;
		},
	},
  components:{

  },
  created(){
  	console.log(this.$store.state.currentBook.id)
  	console.log(this.$route.params.type)
  }
}
</script>
<style lang='less' >
.exam{
	width: 100%;
	height: 100%;
	header{
		width: 100%;
		height: 10%;
		display: -webkit-flex; /* Safari */
			display: flex;
			align-items:center;
			position: relative;

		i{
			color:#35b4ca;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto;
		}
		span{
			display: block;
			width: 100%;
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			color: #514848;
		}
	}
	.result{
	width: 100%;
	height: 90%;
	.result-head{
		width: 100%;
		height: 15%;
		display: -webkit-flex; /* Safari */
	    display: flex;
	    align-items:center;
	    justify-content:center;
	    background-color: #91e4e8;
	    background-image:-webkit-linear-gradient(45deg,  rgba(50,200,175,.9),rgba(222, 143, 126, 0.9));
   		background-image:linear-gradient(45deg,rgba(50,200,175,.9),rgba(222, 143, 126, 0.9));
	    span{
			font-size: 18px;
	    }
	    img{
			height: 70%;
			margin-left: 1rem
	    }
	}
	.result-con{
		width: 100%;
		height: 85%;
		position: relative;
.hiteggs{
				position: absolute;
				height:100%;
				width:100%;
				left:0;
				top:40%;
				text-align: center;
				color:#666;
				font-size: 2rem;
			}
		.result-con_hammer{
			height: 60%;
			position: relative;
			
			p{
				position: absolute;
				text-align: center;
				width: 100%;
				font-size: 2.4rem;
				color: #53959d;
				font-weight: 600;
				margin-top: 25px;
				b{
					color: #eb9909;
					font-size: 4rem;
				}	
			}
			img{
				position: absolute;
				top: 0;bottom: 0;left: 0;right: 0;
				margin: auto;
				width: 60%;
			}
			img.hammer{
				width: 30%;
				left: 7rem;
			}
		}
		&>p{
			width: 80%;
			margin: 0 auto;
			text-align: center;
			border:1px solid #eee;
			padding:2rem 0;
			span{
				display: inline-block;
				width: 100%;
				letter-spacing:3px;
				b{
					color: orange;
				}
			}
		}

	}
	}
}
</style>
