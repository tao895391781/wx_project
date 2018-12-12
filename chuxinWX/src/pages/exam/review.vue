<template>
<div class="exam"  v-if="dataSuccess">
	<header>
		<md-icon class='md-size-2x' @click.native="goback($route.params.type)">reply</md-icon>
		<span >《{{bookname}}》</span>
	</header>
	<div class="review" >
		<div class="review-head">
			<span>已打卡</span><img src="../../assets/images/smile.png" alt="">
		</div>

		<div class="review-con" >
      <div class="review-con_score" :style="{backgroundImage: 'url(' + img + ')'}">
        <span>
          <b>{{score+luckyScore}}</b>
          <b>分</b>
        </span>
      </div>
      <div class="review-con_tip">
        <span>打卡详情</span>
        <span>
          <i></i>
          已完成
        </span>
        <span>
          <i></i>
          未批改
        </span>
        <span>
          <i></i>
          错误
        </span>
        <span>
          <i></i>
          正确
        </span>
      </div>
      <div class="review-con_options">
        <div >
          <p :style="'width:'+width" >
            <span v-for="(item,index) in questionlist" v-bind:class="[{ right:item.isRight}, { wrong:!item.isRight},{ noCorrect:!item.hasOwnProperty('isRight')}]" @click="goDetail(index)">{{index+1}}</span>
          </p>
        </div>
      </div>
		</div>

	</div>
</div>


</template>

<script>
import { mapActions } from 'vuex'

import { bus } from '../../bus.js'
import ip from '../../ip.js'
export default {

  data() {
  	return {
      bookname:'',
      questionlist:'',
      width:'auto',
      img: require('../../assets/images/bg_score.png'),
      dataSuccess:false,
      luckyScore:'',


  	}
  },
  methods:{
    ...mapActions({
      saveLucky:'saveLucky'
    }),
		goback(type){
      if(this.$route.query.to){
       for(var i = 0 ; i < this.$store.state.saveItem.finished.length; i++){
        if (this.$store.state.saveItem.finished[i].name==type) {
           this.$store.state.saveItem.finished[i].finished=true;
        }
      }
        // this.$router.push({name:'questionlist'})
         this.$router.push({name:'classifyPage',params:{signid:this.$route.params.signid,}})
      }else{      
        this.$router.go(-1)
      }
			
		},
    goDetail(index){
      this.$router.push(
        {
          name:'answerdetail',
          params:{
            data:{
            name:this.bookname,
            questions:this.questionlist
          },
          index:index}
        })
    }
  },
	computed: {

	},
  components:{

  },
  created:function(){
    console.log(this.$route.query)
    console.log(this.$route.params)
  //  let typeList={
   
  // };
  //   let type=this.$route.params.type;
  //   typeList[type]=true;
  //   let postdata={
  //     signId:this.$route.params.signid,
  //     typeList,
  //   }
  //   console.log(postdata)
  //   this.saveLucky(postdata)
    var USERID = sessionStorage.getItem('i');
    var _this=this;
    _this.axios.get(_this.ip.RESTPATH+'rest/getSignQuestionResultByUserId/'+USERID+'/'+_this.$route.params.type+'?signId='+_this.$route.params.signid)
    .then(function (res) {
      console.log('获取的回顾题目');
      console.log(res); 
      let arr=[];
      _this.bookname=res.data[0].name;
     _this.luckyScore=res.data[0].luckyScore;
      res.data[0].questions.forEach(function (v) {
          v.imgpath=v.picId?ip.filePath+v.picId:v.picId;
      })
      _this.questionlist=res.data[0].questions;
      _this.width=res.data[0].questions.length*5+'rem';
       // console.log(_this.score)
      _this.score=0;
      _this.questionlist.forEach(function (v,index) {
        if(v.isRight){
          _this.score+=2;  
        }
        if(v.formate_cls=='录音' || v.formate_cls=='图片'){
      
          _this.score+=2;
        }
      })
      console.log(_this.score)

      _this.dataSuccess=true;
      bus.$emit('closeloading');
    })
    .catch(function (err) {
      console.log(err);
    })
  },
  beforeCreate:function () {
    bus.$emit('loading')
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
	.review{
	width: 100%;
	height: 90%;
	.review-head{
		width: 100%;
		height: 15%;
		display: -webkit-flex; /* Safari */
	    display: flex;
	    align-items:center;
	    justify-content:center;
	    background-color: #a3dcde;
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
	.review-con{
		width: 100%;
		height: 85%;
    .review-con_score{
      height: 60%;
      position: relative;
      background: url('../../assets/images/bg_score.png') no-repeat center;
      background-size: 50% ;
      span{
        position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 20%;
          bottom: 0;
          width: 100%;
          height: 58%;
          text-align: center;
          b{
            color: white;
            position: relative;
            top: 40%;}
          b:nth-child(1){
            font-size: 6.5rem;
          }
          b:nth-child(2){
            font-size: 1.5rem;

          }
      }
    }
    .review-con_tip{
      height: 10%;
      border-bottom: 1px solid #939191;
      span{
         display: inline-block;
      }
      span:nth-child(1){
        font-size: 1.4rem;
        font-weight: 600;
        width: 30%;
        box-sizing: border-box;
        text-align: center;
        float: left;
      }
      span:nth-child(n+2){
        font-size: 1rem;color: #636262;
        float: right;
        i{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      span:nth-child(2){
        margin-right: 5%;
        i{background-color:#ced3d3 ;}
      }
      span:nth-child(3){
        i{background-color:#f3a262 ;}
      }
      span:nth-child(4){
                        i{background-color: #e6534c;}
      }
      span:nth-child(5){
        i{background-color: #8ad13a;}
      }
    }
    .review-con_options{
      height: 25%;padding-top:20px;
      div{
        width: 100%;
        height: 4rem;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        p{
          height: 4rem;width: auto;
          span{
            display: inline-block;
            margin-left: 1rem;
            width: 4rem;height: 4rem;border-radius: 50%;
            text-align: center;
            line-height: 4rem;
            font-size: 2rem;
            color: white;
            font-weight: 600;
          }
          span:first-child{
            margin-left: 1rem;
          }
          span.wrong{
            background-color:#e6534c;
          }
          span.right{
            background-color: #8ad13a;
          }
          span.noCorrect{
            background-color: #ced3d3 ;
          }
          span.success{
            background-color: #f3a262;
          }
        }
      }
    }
	}
	}
}
</style>
