<template>
<div id="home">
  <div class="container">
  	<router-view></router-view>
  </div>
  <div id="navbar">
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="home" @click.native="gopage('questionlist')" :class="{'md-active': isActive=='questionlist'}">
          阅读任务
      </md-bottom-bar-item>
      <md-bottom-bar-item md-icon="assignment"  @click.native="gopage('homepage')"
      :class="{'md-active': isActive=='homepage' }">
          写作任务
      </md-bottom-bar-item>
      <md-bottom-bar-item md-icon="account_box" @click.native="gopage('myself')"
      :class="{'md-active': isActive=='myself'}">
          我的奖励
      </md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</div>
</template>


<script>

export default {

  data() {
  	return {

  	}
  },
  components:{

  },
  methods: {
    gopage(path) {

      let pathname=sessionStorage.getItem('sel');
      if(path=='questionlist' && pathname){
        this.$router.push({name:pathname});
      }else{
        this.$router.push({name:path});
      }
    }
  },
  computed: {
    isActive(){
      return this.$route.path.split('/')[2]
    }
  },
  created() {

  },
  beforeCreate(){
      if(!sessionStorage.getItem('i')){
        this.$router.push({name:'login'})
      }
  }
}
</script>
<style lang='less' >
  #home{
    width: 100%;
    height: 100%;
    .container{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 56px;
    }
    #navbar{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 56px;
    width: 100%;
    // z-index:-1;
    .md-bottom-bar{
      position: absolute;
      bottom:0;
      left:0;
      z-index: 4;
    }
  }
  }

</style>
