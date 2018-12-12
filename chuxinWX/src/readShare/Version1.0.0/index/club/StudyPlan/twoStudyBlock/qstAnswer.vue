<template>
<div id="qstAnswer" v-show='showThis'>
		<header >
			<div @click='goback'><i class="iconfont">&#xe655;</i></div>
			<div>答题闯关</div>
		</header>
  <div is='Askquestion':questionlist='questionlist'></div>


</div>
</template>
<script>
import { bus } from '../../../../../../bus.js';
import { mapActions } from 'vuex'
import Askquestion from '../../../../../../components/askquestion.vue'
export default {
  data() {
  	return {
	 	  progresWidth:-100,
		  clicked:false,
	    num:0,
	    showText:true,
	    selectItem:0,
	    nameLength:'',
	    noqst:false,
	    trueSub:false,
      questionlist:[],
      selected:[],
      showThis:false,
      wxId:'',
  	}
  },    
  methods:{
  	goback(){
  		this.$router.go(-1);
  	},
  	...mapActions({
      			getQuestions: 'getQuestions'
   			 }),
   back(){
     this.selectItem--;
     if(this.selectItem<0){
           this.selectItem=0;
     }
     console.log(this.$refs.backs)
   },
	getprogress(){
		this.$nextTick(function () {
        var h=document.getElementById("form-box").scrollHeight;
        var w = document.getElementById("form-box").offsetHeight
        var t=document.getElementById("form-box").scrollTop;
        this.progresWidth=Math.floor(t/(h-w)*10000)/100-100;
      })
	}
  },
  beforeRouteLeave(to,from,next){
      bus.$emit('closesubmithuimu')
    next();
  },
  computed:{
  },
  mounted(){	
//     document.getElementById("form-box").addEventListener('scroll', this.getprogress);
//     $("textarea").focus(function(){
//  		 $('#navbar').hide()
// 	});
//     $("textarea").blur(function(){
//     $('#navbar').show()
// });

  },
  beforeCreate(){
    bus.$emit('loading');
  },
  created(){
    this.$parent.showThis = false;
    this.wxId =  JSON.parse(sessionStorage.getItem('u'))['openid'];
    let id = this.$route.query.id;
      this.axios.get(this.ip.RESTPATH+'rest/getReadingSummarySignByReadingSignId/'+ id)
      .then(res=>{
        bus.$emit('closeloading');
        this.$parent.showThis = true;
        this.showThis = true;
        this.questionlist = res.data[0].questions;
      })
  },
    components:{

    //上传图片组件

    'Mypic':{
      template:`
      <div>
        <ul class='piclists'>
           <li v-for='(p,index) in piclist' :index='index' >
              <img :src='p' alt="loading" @click='previewPic(index,$event)'>
            <i @click.stop='deletes(index)' class='iconfont'>&#xe633;</i>
           </li> 
        </ul>
        <button @click='uploadpic'>上传图片</button>

      </div>

      `,
      data(){
        return {
            piclist:[],
            picitem:[],
          
        }
      },
      methods:{
       deletes(index){   
        var Index=$(this.$el).parent().attr('index');
        this.piclist.splice(index,1);
        this.picitem.splice(index,1);
        this.selected=this.$store.state.rightResult;
        this.selected[Index]['answer']=this.picitem;
        console.log(this.selected[Index]['answer'])
},   
        previewPic(index){
          console.log(event.target)
          var tar=event.target
          console.log('当前预览图片的地址');
          var imgSrc= tar.getAttribute('src')
          console.log(imgSrc)
                WX.previewImage({
                   current: imgSrc, // 当前显示图片的http链接
                    urls: this.piclist // 需要预览的图片http链接列表
                })
        }, 
        uploadpic(){
          if(this.piclist.length>=4){
            bus.$emit('tip','图片已达上限^_^')
          }else{
          //拍照或从手机选择图片
          var this_=this;
          WX.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
                bus.$emit('loading');
            var localIds = res.localIds[0].toString();// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log('成功选取图片shujju');
            console.log(res);
              WX.uploadImage({
              localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res1) {
              console.log('获取到的上传图片id')
              console.log(res1)
              var serverPicId= res1.serverId; // 返回图片的服务器端ID
               $http.post('postImageByImageId',{
                        serviceId:serverPicId
                      })
               .then(function(res2){
                console.log("图片%%%…………返回的数据")
                console.log(res2);
                console.log(res2.data.result)
                if(res2.data.result=='fail'){
                  console.log('上传失败')
                  bus.$emit('closeloading');
                  bus.$emit('tip','上传失败请重新上传^_^')
                }else{
                  console.log(res2.data.imageId.attachments[0].uuid)
                   var imgId=res2.data.imageId.attachments[0].uuid;
                console.log(imgId)
                 this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgId)
                 .then(function(res5){
                  bus.$emit('closeloading');
                  console.log(res5)
                  var pictureUrl=this_.ip.filePath1+res5.data[imgId].href;
                  this_.piclist.push(pictureUrl);
                  this_.picitem.push(imgId);
                  var index=this_.$el.parentNode.getAttribute('index');
                  console.log(index)
                  this_.selected=this_.$store.state.rightResult;
                  this_.selected[index]['answer']=this_.picitem;
                  console.log(this_.selected[index]['answer']);

                 })
                }
               })
               .catch(function(err){
                console.log(err);
               })
             },
             fail:function(fail){
              console.log(fail)
             		}
            	  });
        	 	}
          });
        }
     },
 },
      created(){
        this.config();
        }
      },
       Askquestion,
  },
 

}
</script>
<style lang='less'>
   @keyframes subBox{
    from{
      opacity: 0;
      transform: scale(0);
    }
    to{
      opacity: 1;
      transform: scale(1)
    }
   }
#qstAnswer{
	width: 100%;
	overflow:scroll;
  flex:1;
  -webkit-flex:1;

		header{
				height:3.3rem;
				color:#555;
				width:100%;
				z-index:999;
				background:#fff;
					div{
						display:inline-block;
						/* background:rgba(255, 255, 255, .87); */
						float: left;
						height:100%;
						text-align:center;
						line-height:3.3rem;
						
							&:first-child{
								width:20%;
                text-align: left;
                text-indent: 1em;
							}
							&:nth-child(2){
								width:60%;	
							}
							&:nth-child(3){
								width:20%;
								
							}
						}
					}
  .subBox{
   position: fixed;
   width:100%;
   height:100%;
   background: rgba(0,0,0,.1);
   z-index: 999;
  
.sureSunmit{
   position: absolute;
    width:70%;
    height:12rem;
    left:15%;
    top:30%;
    background: #fff;
    border-radius: 6px; 
    color:#fff;
    z-index: 999;
    animation: subBox .3s forwards;
    p{
      text-align: center;
      height:6rem;
      line-height: 6rem;
      font-size: 2rem;
      letter-spacing: 3px;
      color:#333;
    }
    ul{
      width:100%;
      height:4rem;
      margin-top: 2rem;
      border-top: 1px solid #eee;
      li{
        float: left;
        width:50%;
        height: 100%;
        margin-top: 0;
        color:#666; 
        line-height: 4rem;
        font-size: 2rem;
        button{
          width:100%;
          height:100%;
          line-height: 4rem;
          border-style: none;
          font-size: 2rem;
          color:#666;
          text-align: center;
          background: #fff;
        }
        &:nth-child(2){
          border-left: 1px solid #eee;
          button{
           color:#1892e9; 
          }
          
          
        }
      }
    }
  }
  }
	
	.doexam{
		width: 100%;
		height: 100%;
		.dec{
			width: 100%;
			height: auto;
			text-indent: 2em;
			position: relative;
      font-size: 16px;
			// overflow-y: scroll;
			// -webkit-overflow-scrolling: touch;
			.progress{
				width: 100%;
				height: 4px;
				position: absolute;
				bottom: 0;
				overflow: hidden;
				z-index: 99;
				div{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					bottom: 0;
					left: -100%;
					background-color: #2196f3;
					transition: all .4s cubic-bezier(.25,.8,.25,1);
				}
			}
		}
		#form-box{
			width: 100%;
			height: 100%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
        .noqst{
          font-size: 1.8rem;
          text-align: center;
          width: 100%;
          margin-top: 8rem;
         }
			.qst-box{
			  width: 100%;
			  padding: 0 1rem;
			  margin: 1rem 0;
			  /*height: 100%;*/
        border-radius: 3px;
        
          .preTest{
         text-align: center;
         width:40%;
         margin:2rem auto;
         height:5rem;
         line-height: 2rem;
         border-radius:5px;
         background: #5b9bd5;
         color:#fff;
         letter-spacing: 2px;
         font-size: 1.7rem;
         }
			 .uploadpic{
			    	.answer{
			    		width:100%;
			    		height:auto;
			    		border:1px solid #eee;
              background:rgba(0,0,0,.005);
              border-radius: 3px;

                .uppic{
                  width:100%;

                button{
                  margin-top: 3rem ;
                margin-bottom: .2rem;
                margin-left: 68%;
                padding:.2rem .5rem;
                text-align: center;
                background: #5db8f5;
                color:#fff;
                letter-spacing: .15em;
                border-style: none;
                border-radius: 5px;
                font-size: 1.4rem;
                }
                .piclists{
                width:90%;
                 display:flex;
                -moz-display:flex;
                -webkit-display:flex;
                flex-wrap: wrap;     
                margin:0 auto;
                margin-top: .1rem;
                  li{
                  background:  #cceff5;
                  height: 11.5rem;
                  width:11.5rem;
                  margin: .2rem;
                  border:1px solid #ddd;
                  overflow:hidden;
                  position: relative;
                  img{
                    display: inline-block;
                   width:100%;
                   height:100%;
                  }
                  i{
                    position: absolute;
                    top:.1rem;
                    right:.1rem;
                    color:#fff;
                   
                   padding:.2rem .3rem;
                        
                    text-align: center;
                    z-index: 999;
                    background: rgba(0,0,0,.2);
                    border-radius: 3px;
                  }

                  }

                }
               }
			    		.ul{
                position: relative;
                .startAsk{
                  // margin:0 auto;
                margin-top: 3rem ;
                margin-bottom: .2rem;
                padding:.2rem 1rem;
              
                margin-left: 67%;
                text-align: center;
                background: #5db8f5;
                color:#fff;
                letter-spacing: .15em;
                border-style: none;
                border-radius: 5px;
                font-size: 1.4rem;
              }
                  
                // }
  			     .li{
			    				background: #d9f4fe;
			    				height: 2rem;
			    				width:60%;
			    				margin: 0 2rem;
                  border-radius: 3px;
                  position: relative;
                  .del{
                      color:rgba(0,0,0,.2);
                      position: absolute;
                      left:78%;
                      top:0;
                      height:100%;
                      font-size: 1rem;
                      line-height: 2rem;
                      z-index: 999;
                      opacity: 1;

                    }
			    				 .Audio{
                    position: relative; 
                    height:100%;
                    width: 100%; 
                    margin: .5rem auto;
                    overflow:hidden;
                    
                        .play-pause{
                          margin:0 .45rem;
                          width:2rem;
                          height:100%;
                          position:relative;
                          border-style: none;
                          background: #d9f4fe;
                        .icon-play{
                          position: absolute;
                          left:0;
                          top:.1rem;
                          width: 100%; 
                          height: 100%;
                          display: block; 
                          color: #11b7f5; 
                          line-height: 2rem;
                          opacity: 1;
                          font-size: 1.6rem;}
                        .icon-pause{
                          position: absolute;
                          left:0;
                          top:.1rem;
                          width: 100%;
                          height: 100%; 
                          display: block; 
                          color: #11b7f5;
                          line-height: 2rem;
                          opacity: 1;
                          font-size: 1.6rem;}
                        }
                        .controls{position: absolute;
                                  right:1.5rem;
                                  top:.1rem;
                                  width: 6rem; 
                                  height: 100%;
                                  padding: 0;
                                  text-align: center;
                                span{color: #b3b5b7; 
                                    font-size: 12px; 
                                    width: 34px;
                                    // display: inline-block;
                                  }
                           }
                        .pgs{
                          width: 40%; 
                          position: absolute;
                          top:0.92rem;
                          left:1rem;
                          background-color: #11b7f5;
                          height: 2px;
                          margin-left: 1.5rem;
                          overflow:hidden;
                        .pgs-play{ 
                          height: 2px; 
                          background-color: #fff; 
                          z-index: 1;
                  }
                }
              }	    				
			    	}
			    }		  		
			 }
		 }
			  &>div{
			    width: 100%;
			    height: auto;
			    h5{
			      width: 100%;
			      min-height: 25px;
			      line-height: 25px;
			      font-size: 16px;
			    }
			    &>p{
			    	padding: 0 2%;
			    	margin: 10px 0;
			    	img{
			    		width: 100%;
			    		height: auto;
			    		margin: 0 auto;
			    	}
			    }

			    fieldset{
			      width: 100%;
			      height: auto;
			      margin-top: .5rem;
			      overflow: hidden;
             // border:1px solid #cceff5;
             // background:#fafcfd;
             border-radius: 3px;
             border-color: #eee;
			      p{
			        width: 100%;
			        min-height: 2rem;
			        overflow: hidden;
			        margin-top: .5rem;
			        input{
			          font-size: 1.2rem;
			          float: left;
			          width: 5%;
			          display: none;
			          opacity:0;-webkit-appearance:none;
			        }
			        label{
			          font-size: 1.4rem;
			          float: left;
			          width: 95%;
			          margin-left: 3%;
			          padding-left: 10%;
			          padding-right: 5%;
			          position: relative;
			        }
			        input+label:before{
			          display: inline-block;
			          width: 18px;
			          height: 18px;
			          margin-right: 8px;
			          content: '';
			          color: #fff;
			          border: 1px solid #dce4e6;
			          background-color: #f3f6f8;
			          border-radius: 3px;
			          position: absolute;
			          top: 0;
			          left: 0;
			        }
			        input[type=radio]+label:before {
			            border-radius: 50%;
			        }
			        input[type=checkbox]+label:before {
			            border-radius: 3px;
			        }
			        input[type=checkbox]:checked+label:before,input[type=radio]:checked+label:before{
			          content:'\2713';
			          color:#fff;
			          background-color: #31b968;
			          font-size:16px;
			          text-align: center;
			          border-color: #31b968;
			        }

			      }
			      textarea{
			        width: 100%;
			        min-height: 12rem;
			        font-size: 14px;
			        resize: vertical;
               // border:1px solid #cceff5;background:#fafcfd;
               margin-top:5px;
               border-color:#eee;
               -webkit-appearance:none;
			      }
			    }
			  }
			}
		&>p{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 70px;
        button{
          color: white!important;
          background-color: #409eff!important;
        }
      }
			.space-conent{
				height: 2rem;
			}
		}
	}
}

</style>
