<template>
<div class="questionlist">
    <section v-for="(item,index) in questionlist">
    	<div>
        <img :src="item.imgPath" alt='loading'>
      </div>
    	<div>
    		<span>{{item.name}}</span>
    	</div>
    	<div>
    		<span @click="goDoexam(item)" v-if="!item.finished" class="finished">进入答题</span>
    		<span @click="goDoexam(item)" v-if="item.finished" class="unfinished">查看回顾</span>
    	</div>
    	<span class="serialnumber">{{index+1}}</span>
      <i class="icon iconfont icon-yiwancheng" v-if="item.finished"></i>
    </section>
    <div>

    </div>
</div>
</template>


<script>


import { mapActions } from 'vuex'
import { bus } from '../../../bus.js'

export default {

  data() {
  	return {
      questionlist:[],
      finisheds:false,
  	}
  },
  methods: {
    goDoexam(item) {
      console.log(item)
      this.saveItem({
              name:item.bookName,
              pic:item.imgPath,
              finished:item.finishedList,
              type:item.type,
      })
      this.$router.push({name:'classifyPage',
            params:{
              signid:item.id,

        }
      })
    },
    // goReview(item){
    //   this.$router.push({name:'review',params:{signid:item.id,parent:'previewexam'}})
    // },
    ...mapActions({
      getQuestion: 'getQuestion',
      saveItem:'saveItem'
    })
  },
  components: {

  },
  computed:{
    // finisheds(){
    //   for(var i =0;i<this.questionlist.length;i++){
    //     console.log(this.questionlist[i])
    //     for(var j=0;j<this.questionlist[i].finishedList.length;j++){
          
    //       if(this.questionlist[i].finishedList[j].finished==false){
    //         return false;
    //     }
    //     }
        
    //   }

    // },
  },
  created:function () {
    sessionStorage.setItem('sel','questionlist')
    let _this = this;
    let qlist = [];
    let USERID = sessionStorage.getItem('i');
    _this.axios.get(_this.ip.RESTPATH+'rest/getSignListByUserId', {
        params: {
          userId: USERID
        }
      })
      .then(function (res) {
        console.log('获取到的数据');
        console.log(res);
        qlist = res.data;
        let picIds = [];
        qlist.forEach(function (v) {
          if(v.picId){
            picIds.push(v.picId)
          }
        })
        return _this.axios.get(_this.ip.filePath+"rest/download/links?ids="+picIds.join(','))

        // function addImgPath(qlist) {

        // }
        // addImgPath(res.data);
      })
      .then(function (ires) {
        console.log('获取的图片地址');
        console.log(ires);
        qlist.forEach(function (v) {
          v.imgPath=_this.ip.filePath1+ires.data[v.picId]['href'];
        })
        _this.questionlist=qlist;

//          for(var i=0;i<_this.questionlist.length;i++){
//              console.log(_this.questionlist[i])
//             for(var j=0; j<_this.questionlist[i].finishedList.length;j++){
//               console.log(_this.questionlist[i].finishedList[j])
//                if(_this.questionlist[i].finishedList[j].finished==false){
//                 console.log(_this.questionlist[i].finished)
//                 _this.questionlist[i].finished=false;
//                }
//                else{
//                 _this.questionlist[i].finished=true;
//                }
//             }
       
// }
        bus.$emit('closeloading');
      })
      .catch(function (err) {
        console.log(err);
      })

     
  },
  beforeCreate() {
    bus.$emit('loading')
  }
}
</script>
<style lang='less'>
	.questionlist{
		width: 100%;
		section{
		  display: -webkit-flex; /* Safari */
	    display: flex;
	    position: relative;
	    height: 6rem;
	    align-items:flex-end;
	    width: 95%;
	    margin: 0 auto;
	    margin-top: 5px;
	    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
	    padding: 0 10px 0 10px;
      border-radius:5px;

	    div{
    		display: -webkit-flex; /* Safari */
    	    display: flex;
    	    flex-wrap:wrap;
    	    align-items:center;
    	    height: 100%;
    	    span{
    	    	width: 100%;
    	    	text-align: center;
    	    	font-size: 12px;
    	    }
          &:nth-child(1){
            width: 20%;
            height: 100%;
            img{
              height: 80%;
              width: auto;
            }
          }
    	    &:nth-child(2){
    	    	width: 50%;
    	    }
    	    &:nth-child(3){
    	    	width: 30%;
    	    	justify-content:flex-end;
    	    	padding-right: 10px;
            height: 60%;
            span.finished{
              width: auto;
              background: #38baa7;
              border-radius: 3px;
              padding: 2px 10px;
              color: #fff;

            }
    	    	span.unfinished{
    	    		width: auto;
    	    		background:#ea5223 ;
    	    		border-radius: 3px;
    	    		padding: 2px 10px;
    	    		color: #fff;
    	    	}
    	    }
	    }
	    .serialnumber{
	    	width: 25px;
	    	height: 25px;
	    	position: absolute;
	    	font-size: 13px;
	    	top: 0;right: 0;
	    	color: #FFF;
	    	line-height: 25px;
	    	text-align: center;
	    	background-color: #507384;
	    	border-radius: 15px;
	      -webkit-border-radius: 15px;
	    }
      i{
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;right: 0;top: 0;bottom: 0;
        margin: auto;
        font-size: 5rem;
        color: red;
        font-weight: 500;
        opacity: .3;
      }
		}
	}
</style>
