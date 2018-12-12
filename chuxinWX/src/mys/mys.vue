<template>
<div id="mys">
  <div class="container">
    <header>
    <span>
      <img src="../assets/images/logo.png" >
    </span>
    <span>
      <img src="../assets/images/dollar.png" >
      <b>x{{score}}</b>
    </span>
  </header>
  	<router-view></router-view>
  </div>
  <div id="navbar">
    <ul class="nav-bottom">
      <li @click="gopage('index')" >
        <i class="iconfont">&#xe615;</i>
        <br>
       <span> 首页</span>
      </li>
      <li @click="gopage('mytable')" >
        <i class="iconfont">&#xe70e;</i>
        <br>
        <span>我的课表</span>
      </li>
      <li @click="gopage('homepage')" >
        <i class="iconfont">&#xe5be;</i>
        <br>
        <span>我的作业</span>
      </li>
      <li @click="gopage('personset')" >
        <i class="iconfont">&#xe644;</i>
        <br>
        <span>个人设置</span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>

export default {

  data() {
  	return {
      score:123

  	}
  },
  components:{

  },
  methods: {
    gopage(path) {
      // let pathname=sessionStorage.getItem('sel');
      // if(path=='questionlist' && pathname){
      //   this.$router.push({name:pathname});
      // }else{
        this.$router.push({name:path});
      
    }
  },
  computed: {
    isActive(){
      return this.$route.path.split('/')[2]
    }
  },
  created() {
    console.log(sessionStorage.getItem('i'));
    $(function(){
       $('.nav-bottom').find('li').click(function(){
      $(this).css('color','#2196f3').siblings().css('color','#666')
    })

   
    })
    
      
   

  },
  beforeCreate(){
      if(!sessionStorage.getItem('i')){
        this.$router.push({name:'login'})
      }
  }
}
</script>
<style lang='less' >
@font-face {font-family: 'iconfont';
    src: url('../../static/font/iconfont.eot');
    src: url('../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../static/font/iconfont.woff') format('woff'),
    url('../../static/font/iconfont.ttf') format('truetype'),
    url('../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  #mys{
    width: 100%;
    height: 100%;
    .container{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 56px;
      padding-top:80px;
       header{
      display: -webkit-flex; /* Safari */
      display: flex;
      width: 100%;
      height: 80px;
      padding: 0 20px;
      fles-warp:nowrap;
      flex-direction:row;//主轴的方向
      justify-content:space-between;
      align-items:center;
      position: fixed;
      top:0;
      left:0;
       border-bottom:1px solid #eee;
      span{
        height: 80%;
        display: inherit;
        align-items:center;
        &:nth-child(1){
          width: 35%;
          img{
            height: 100%;
          }
        }
        &:nth-child(2){
          min-width: 20%;
          img{
            width: 30px;
            height: auto;
          }
          b{
            color: #ffc000;
            font-size: 17px;
          }
        }
      }
    }
    }
    #navbar{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 56px;
    width: 100%;
    z-index: 999;
  .nav-bottom{
      width:100%;
      height:100%;
      // display: flex;
      // justify-content: space-around;
      li{
        height:100%;
        margin-top: 0;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 12px;
        line-height: 1.8rem;
        .iconfont{
          font-size: 2rem;
        }
        span{
          display: inline-block;
          text-indent: -.3rem;
        }

      }
    }
    // z-index:-1;
    // .md-bottom-bar{
    //   position: absolute;
    //   bottom:0;
    //   left:0;
    //   z-index: 3
    // }
  }
  }

</style>
