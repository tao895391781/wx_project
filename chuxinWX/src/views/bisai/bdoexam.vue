<template>
  <div class="bdoexam" >
    <img src="../../assets/images/exambg.jpg" alt="" class="bg">
   
   
    <output-from :question="question" :classIds='classId' :codeId='codeId' :booknames='bookname'></output-from>
  </div>
</template>

<script>

import outputFrom from "../../components/outputForm.vue"
import { mapActions } from 'vuex'
import { bus } from '../../bus.js'

export default {
  data() {
  	return {
      question:'',
      classId:'',
      codeId:'',
      allQuestion:'',
      bookname:'',
   
     
      
    }
  },
  methods: {
    ...mapActions({
      getQData: 'getQData',
      nextQuestion: 'nextQuestion',
      saveAnswers:'saveAnswers',
      nextBook:'nextBook',
      saveShowAsk:'saveShowAsk'
    }),
   
  },
  computed: {
    currentQuestion(){
      return this.$store.state.currentQuestion;
    },
   
  },
  beforeCreate:function(){
    // bus.$emit('loading')
	},
  created:function () {
    this.config();
    if(!sessionStorage.getItem('classcode')){
        this.$router.push({name:'bisai'})
    }else{
      this.question=this.$store.state.currentQuestion;
      console.log(this.$store.state)
      console.log(this.question)
      // console.log(this.$route.params.courseId);
      // console.log(this.$route.params.classId);
      // this.classId=this.$route.params.courseId;
      this.codeId=this.$route.params.classId;
      // this.bookname=this.$route.params.name;
      // console.log(this.bookname)
      console.log(this.$route.params.classId);
      console.log('哈哈哈') 
    }
     
    // }

  },
  components:{
    outputFrom
  },
   beforeRouteLeave (to, from, next){
    console.log('路由跳转清除定时器')
    clearInterval(window.timer);
    clearInterval(window.timer2);
    clearInterval(window.timer3);
    next()
  
   
},
  watch: {
    currentQuestion(val){
      console.log('val============================')
      this.question=val
      console.log(val)
    }
  }
}
</script>

<style lang='less' >
  .bdoexam{
    height: 120%;
    width: 100%;
    // background: url('../../assets/images/exambg.jpg') no-repeat ;
    // background-size: 100% 100%;
    position: relative;
     // background: #fff;
   
    .bg{
      width:100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
    }
  }
 
</style>