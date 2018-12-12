<template>
  <div class="bresult" v-if="!allRank">
    <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
    <img src="../../assets/images/sharebg4.png" alt="" class="shareimg" v-show='showimg'>
    <div class="resultCon">
      <p>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i>
    <!--     <i class='iconfont'>&#xe734;</i>
        <i class='iconfont'>&#xe734;</i> -->

      </p>
      <h3>你的阅读闯关成绩 <br><span>{{data.score}}</span></h3>
      <h3>综合排名<br> <span>{{data.ranking}}</span>
      
      </h3>
    </div>
    <p class="pic">
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
         <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
         <i class="iconfont"> &#xe769;</i>
        <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i>
         <i class="iconfont"> &#xe769;</i>
      <!--   <i class="iconfont">&#xe81f;</i>
        <i class="iconfont">&#xe81b;</i> -->

    </p>
    <div class="readstyle">
  
      <p>你的阅读风格是</p>
      <div>
     {{data.comment}}
      </div>
    </div>

    <div class="seeData">
      <p @click='sharecomment'>晒晒我的<br>闯关成绩</p>
      <p @click='testDetail'>查看测试<br>详情</p>
      
    </div>
   <!--  <div class="selshow">
      <span type="button" @click="toshow">邀好友闯关</span>
      <span type="button" @click="getallRank">查看总排名</span>
    </div> -->

    <div class="shareBg" v-if="showShare">
        <img src="../../assets/images/sharebg.png" alt="sharebg" @click="showShare=false">
    </div>
  </div>
  <div class="rank" v-else>
    <!--排名-->
    <div class="selfRank">
      <p>您当前排名为<br/><br/>第{{examResult.flag}}名</p>
    </div>
    <div class="allrank">
      <ul>
        <li v-for="(item,index) in allRank">{{item.phoneNum}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.rank}}名</li>
      </ul>
    </div>
    <div class="selshow">
      <span type="button" @click="toshow">邀好友闯关</span>
    </div>
    <div class="shareBg" v-if="showShare">
        <img src="../../assets/images/sharebg.png" alt="sharebg" @click="showShare=false">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios';
import ip from '../../ip.js'
import { bus } from '../../bus.js'
export default {

  data() {
  	return {
      showShare:false,
      allRank:'',
      name:'',
      code:'',
      data:{},
      showimg:false,
      title:'',
      flag:true,
     
  	}
  },
  methods: {
     goback(){
        this.$router.go(-2); 
      },
    ...mapActions({
               savetitle: 'savetitle'
              }),
    sharecomment(){
      
      this.showimg=!this.showimg;
          var title='我家"'+this.name+'"完成了名著阅读答题闯关,'+'获得'+'"'+this.data.comment+'"'+'阅读称号，你也来试试吧！'
          this.savetitle({
              title:title,
              self:this
              });
          console.log(title)
          this.config()
    },
    testDetail(){
      this.$router.push({name:'btestdetail'})
    },
    toshow(){
      this.showShare=true
    },
    getallRank(){
      let self = this;
      let grade = sessionStorage.getItem('grade')
      axios.get(ip.RESTPATH+'rest/getAllUsersRank',{params:{'grade':grade}})
        .then(function (res) {
          bus.$emit('closeloading')
          console.log(res);
          self.allRank=res.data;
        })
        .catch(function (err) {
          console.log(err);
        })
    },
  
    // redrct () {
    //   var _this = this
    //   this.$router.beforeEach((to, from, next) => {
    //     if (to.matched.some(record => record.meta.requiresAuth1) && from.matched.some(record => record.meta.requiresAuth)) { 
    //         console.log("跳转啊 ")
    //         next({
    //           path: '/bselectbook/'+_this.code
    //         })
    //       }else{
    //         next()
    //       }
    //   })
    // },
  },
  computed:{
    examResult(){
      return this.$store.state.answerResult
    }
  },
  components:{

  },
  beforeCreate:function(){
    bus.$emit('loading')
		  if(!sessionStorage.getItem('u')){
        this.$router.push({name:'bisai'})
      }
	},
  created(){
   if(!sessionStorage.getItem('classcode')){
        console.log('没有登陆')
              this.$router.push({name:'bisai'})
    }
    var that =this;
    // window.history.go(-2);
    // this.redrct()
    console.log(this.$store.state.answerResult)
    console.log(this.$store.state.answerResult.name);
    this.name=this.$store.state.answerResult.name;
    this.code=this.$store.state.answerResult.code;
    console.log('开始获取数')
    this.axios.get(this.ip.RESTPATH+'rest/getReadingMatchQuestionResults?code='+this.code+'&name='+this.name)
    .then(res=>{ 
    console.log('获取分数dse 排名')
    console.log(res)
    if(res.data){
      bus.$emit('closeloading')
       this.data=res.data;
    }
   
    
})

  },
  beforeCreate(){
    bus.$emit('loading')
  },
  mounted(){
    // this.config(title)
  }
}
</script>

<style lang='less' >
@font-face {font-family: 'iconfont';
    src: url('../../../static/font/iconfont.eot');
    src: url('../../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../../static/font/iconfont.woff') format('woff'),
    url('../../../static/font/iconfont.ttf') format('truetype'),
    url('../../../static/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .bresult{
    height: 100%;
    width: 100%;
    // background: url('../../assets/images/doexam-bg.jpg') no-repeat ;
    // background-size: 100% 100%;
    background: linear-gradient(to top, #13274c 0%,#3499d1 100%);
    overflow: hidden;
    position: relative;
     .goback{
    .iconfont{
      height:30px;
      font-size: 25px;
      line-height: 30px;
      margin-left:1%;
      margin-top: 5px;
      color:#fff;
    }
  }
    .shareimg{
      position: absolute;
      width:80%;
      height:50%;
      left:12%;
      top:0;
      // background: rgba(255,255,255,.5)
    }
    .resultCon{
        margin-top: 5rem;
        p{
          text-align: center;
          .iconfont{
            font-size: 30px;
            color:#fff;
          }
        }
        h3{
         margin:0 auto;
          margin-top:1.3rem;
          text-align: center;
          font-size: 22px;
          color: rgba(255,255,255,1);
          letter-spacing: 2px;
          width:70%;
          &:nth-child(2){
            // text-indent: 4em
          }

          span{
            color:#fff;
            font-size: 30px;
            margin-top: 1.3rem;
            display: inline-block;
          }
        }
    }
    .pic{
    text-align: center;
    font-size: 30px;
    color:#fff;
    margin-top: 1rem;
    .iconfont{
      font-size: 20px;
      color:#16d8bb;
    }
  }
    .readstyle{
      height:23%;
      width:80%;
      margin: 5rem auto;
      margin-top: .5rem;
      font-size: 22px;
      overflow:hidden;
      position: relative;
      border:1px dashed #fff;
      border-radius: 9px;
      p{
        text-align: center;
        color:#fafafa;
        margin-top: 1rem;
      }
      div{
        height:70%;
        width: 100%;
        font-size: 35px;
        margin-top: 4rem;
        text-align: center;
        color:#fff;
        letter-spacing: 2px;
        animation:mymove 1.5s forwards;
        -webkit-animation:mymove 1.5s forwards; /* Safari 和 Chrome */
      }
    }
    .seeData{
      width:100%;
      height:25%;
      display: flex;
      justify-content: space-around;
      p{
        color:#fff;
        font-size: 16px;
        height:50px;
        line-height: 24px;
        width: 120px;
        // padding:0 1rem;
        text-align: center;
        background:#3a74a6;
        color:#fff;
        letter-spacing: 2px;
        border-radius: 5px;

      }
    }
    .selshow{
      overflow: hidden;
      height: 60px;
      margin-top: 5rem;
      span{
        float: left;
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        margin: 0 1.5%;
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 5px #653104;
        color: #653104;
        font-weight: 600;

        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 0.2s ease;
        &:active{
          top:5px;
          box-shadow: 0px 0px #123456;
        }
        &:first-child{margin-left: 20%;}
      }
    }
    .shareBg{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;left: 0;
      background-color: rgba(10, 10, 10, 0.89);
      img{
        width: 90%;
        height: 60%;
        margin-left: 5%;
      }
    }
  }
  .rank{
    width: 100%;
    height: 100%;
    // background: url('../../assets/images/doexam-bg.jpg') no-repeat ;
    background-size: 100% 100%;
    .selfRank{
      height: 20%;
      width: 100%;
      position: relative;

      p{
        position: absolute;
        bottom: 10px;
        left: 0;
        right:0;
        color: #bf7016;
        font-size: 25px;
        text-align: center;

      }
    }
    .allrank{
      height: 50%;
      overflow: scroll;
			-webkit-overflow-scrolling: touch;
      padding: 0 2rem;
      ul{
        li{
          text-align: center;
          color: #bf7016;
          font-size: 20px;
        }
      }
    }
    .shareBg{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;left: 0;
      background-color: rgba(10, 10, 10, 0.89);
      img{
        width: 90%;
        height: 60%;
        margin-left: 5%;
      }
    }
    .selshow{
      overflow: hidden;
      height: 60px;
      margin-top: 2rem;
      span{
        float: left;
        height: 40px;
        line-height: 40px;
        width: 30%;
        text-align: center;
        background: #bf7016;
        font-size: 20px;
        font-weight: 500;
        /*margin: 0 1.5%;*/
        margin-left: 35%;
        cursor: pointer;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 5px #653104;
        color: #653104;
        font-weight: 600;

        /* so nobody selects the inside text on button */
        user-select: none;

        /* Smoothing out hover using css3 transitions, if not, the pressed button effect looks a bit hard */
        transition: all 0.2s ease;
        &:active{
          top:5px;
          box-shadow: 0px 0px #123456;
        }
      }
    }
  }
  @keyframes mymove{
    from{opacity: 0; 
            transform: scale(0);
            -webkit-transform:scale(0);
            -ms-transform: scale(0);
          }
    to{opacity: 1; 
          transform: scale(1);
        -webkit-transform:scale(1) ;  
        -ms-transform:scale(1);
      }
  }
</style>
