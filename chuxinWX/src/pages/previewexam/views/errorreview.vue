<template>
<div class="errorreview">
  <section v-for="item in classlist" @click="goDetail(item)">
    <div>
      <img src="../../../assets/images/leaf.png" alt="">
    </div>
    <div>{{item.name}}</div>
    <div>{{item.questions.length}}</div>
  </section>
</div>
</template>


<script>

import { bus } from '../../../bus.js'

export default {

  data() {
  	return {
      classlist:''
  	}
  },
  methods:{
    goDetail(item){
      if(item.questions.length<=0){
        alert('暂无题目');
        return false;
      }
      this.$router.push({name:'answerdetail',params:{data:item,index:0}})
    }
  },
  components:{

  },
  beforeCreate:function () {
    bus.$emit('loading')
  },
  created:function () {
    sessionStorage.setItem('sel','errorreview')
    var _this = this;
    var USERID = sessionStorage.getItem('i');
    _this.axios.get(_this.ip.RESTPATH+'rest/getErrorQuestionsByUserId', {
		    params: {
		      userId: USERID
		    }
		  })
      .then(function (res) {
        console.log('获取的班级数据');
        console.log(res);
        _this.classlist=res.data;
        bus.$emit('closeloading')
      })
      .catch(function (err) {
        console.log(err);
      })
  },
  
}
</script>
<style lang='less' >
.errorreview{
  width: 100%;
  section{
    height: 6rem;
    width: 95%;
    margin: 0 auto;
    margin-top: 5px;
    position: relative;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    padding: 0 10px 0 10px;
    div{
      height: 100%;
      float: left;
      line-height: 6rem;
      &:nth-child(1){
        width: 25%;
        img{
          height: 60%;
        }
      }
      &:nth-child(2){
        width: 60%;

      }
      &:nth-child(3){
        width: 15%;
      }
    }
  }
}
</style>
