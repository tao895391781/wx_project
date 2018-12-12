<template>
<div id="index">
  <section class="containers">
    <div class="read-level">
      <h6>我的文升阅读级别</h6>
      <p>文升四级 &nbsp;&nbsp;&nbsp;文升五级</p>
      <div class="study-progress">文升级别学习进程:<p class="energy"><span class="energy-progress"></span></p></div>
      <div class="total-study">累计阅读学习量:128万字</div>
      <p class="levelDetail" @click='levelDetail'>级别详情</p>
    </div>
    <div is='reading'></div>
    <div is='complete'></div>
    <div is='next'></div>
  </section>
  
</div>
</template>
<script>
import { mapActions } from 'vuex'
import { bus } from '../../bus.js'
export default {
  data() {
      return {
      score:'',
      signExam:"",
      images: [require('../../assets/images/banner-one.jpg'),require('../../assets/images/banner-two.jpg')],
      currentIndex:0,
      interval:'',
      spreads:true,
      retracts:false,
      }
    },
    //在读级别阅读项目组件
    components:{
      'reading':{
        template:`
        <div class="reading read-common">
        <h6>在读级别阅读书目
        <span v-show='spreads' @click='spread'>展开<i class="iconfont">&#xe604;</i></span>
        <span v-show='retracts' @click='retract'>收起<i class="iconfont">&#xe74b;</i></span>
      </h6>
      <ul>
        <li v-for='item in items'><img src="" alt="loading"><span>正在进行中...</span></li>
      </ul>
    </div>
        `,
        data(){
          return{
            items:[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            spreads:true,
            retracts:false,
          }
        },
        methods:{
           spread(){
            this.spreads=false;
            this.retracts=true;
            var height=$('.reading').find('ul').height();
            $('.reading').find('ul').css({'height':height*2,'overflow':'scroll'})
    },
    retract(){
      this.spreads=true;
      this.retracts=false;
      var height=$('.reading').find('ul').height();
      $('.reading').find('ul').css({'height':height/2,'overflow':'hidden'});
    },
        },
        created(){
        },
      },
       //已完成级别阅读书目组件 
       'complete':{
        template:`
        <div class="complete-read read-common">
        <h6>已完成级别阅读书目
        <span v-show='spreads' @click='spread'>展开<i class="iconfont">&#xe604;</i></span>
        <span v-show='retracts' @click='retract'>收起<i class="iconfont">&#xe74b;</i></span>
      </h6>
      <ul>
        <li v-for='item in items'><img src="" alt="loading"><span>正在进行中...</span></li>
      </ul>
    </div>
        `,
        data(){
          return{
            items:[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            spreads:true,
            retracts:false,
          }
        },
        methods:{
          spread(){
              this.spreads=false;
              this.retracts=true;
              var height=$('.complete-read').find('ul').height();
              $('.complete-read').find('ul').css({'height':height*2,'overflow':'scroll'})
    },
          retract(){
            this.spreads=true;
            this.retracts=false;
            var height=$('.complete-read').find('ul').height();
            $('.complete-read').find('ul').css({'height':height/2,'overflow':'hidden'});
    },
  },
        created(){},
      },
      //下一级阅读数目组件
      'next':{
        template:`
        <div class="next-read read-common">
        <h6>下一级别阅读书目
        <span v-show='spreads' @click='spread'>展开<i class="iconfont">&#xe604;</i></span>
        <span v-show='retracts' @click='retract'>收起<i class="iconfont">&#xe74b;</i></span>
      </h6>
      <ul>
        <li v-for='item in items'><img src="" alt="loading"><span>正在进行中...</span></li>
      </ul>
    </div>
        `,
        data(){
          return{
            items:[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            spreads:true,
            retracts:false,
          }
        },
        methods:{
            spread(){
                this.spreads=false;
                this.retracts=true;
                var height=$('.next-read').find('ul').height();
                $('.next-read').find('ul').css({'height':height*2,'overflow':'scroll'})
                  },
            retract(){
                this.spreads=true;
                this.retracts=false;
                var height=$('.next-read').find('ul').height();
                $('.next-read').find('ul').css({'height':height/2,'overflow':'hidden'});
    },

        },
        created(){
        },
      }
    },
  

    //主组件
  methods: {
    levelDetail(){
      this.$router.push({name:'levelDetail'});
    },
   
    },
    created(){
      $(function(){

      })
    },
    
     
}
</script>
<style lang='less' >
  #index{
    width: 100%;height: 100%;
    overflow: scroll;
   
    .containers{  
      height:100%;  
      overflow-y: scroll;  
    -webkit-overflow-scrolling: touch;
      h6{
          border:1px solid #ddd;
          padding:.3rem 1rem;
          margin:0 1rem;
          border-radius: 3px;
          position: relative;
          // font-weight: 400;
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
      .read-level{
        height:21%;
        width:100%;
        // border-bottom:1px solid #eee;
        position: relative; 
        // margin-bottom: .3rem;
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
          padding:.5rem;
          text-indent: 1em;
          color:#666;
          font-size: 14px;
        }
        .levelDetail{
          position: absolute;
          bottom:.2rem;
          right:.1rem;
          padding:.1rem .7rem;
          background: #da7c69cf;
          border-radius: 3px;
          font-size: 12px;

        }
      }
      .read-common{
        height:auto;
        width:100%;
        background: rgba(200,200,200,.2);
        overflow:hidden;
        border-radius: 5px;
        ul{
          height:9rem;
          width:100%;
          margin-top:.5rem;
          display: flex;
          flex-wrap:wrap;
          // overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          overflow-scrolling:touch;
          li{
            margin:.5rem;
            margin-bottom: 5px;
            height:8rem;
            width:21%;
            border:1px solid #ddd; 
            margin-top:.4rem;
            img{
              display: inline-block;
              height:80%;
              width:80%;
              margin-left:.5rem;
            }
            span{
              font-size: 12px;
            }
          }
        }
      }
    }
    
  }
</style>
