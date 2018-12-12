<template>
	<div class="selectedbox">
		<img src="../../assets/images/exambg.jpg" alt="" class="bg">
		<!-- <p v-show="showOp">选择合适的年级开始挑战吧!</p> -->
<!-- 
	 <transition name="options">	
          <div class="options" v-if="showOp">
            <span v-for="item in options" @click="selGrade(item)"  v-bind:class="{ active: item.value == selected.value }">{{item.text}}</span>
          </div>
      
     </transition> -->
	
	<div class="selected">
		<!-- <img src="../../assets/images/exambg.jpg" alt="" class="bg"> -->
		<div class="beforeAsk" v-show='!showAsks'>
      <p>“读书才能赢”答题赢红包活动规则</p>
      <p>
    


1、答题时间：30分钟。<br>
2、题目范围：分为儿童文学、历史、文化、古文、四大名著、人物传记等8个模块，对应不同书目和题目。<br>
3、答题规则：每个模块需完成5道题目，答对一题积一分，结束后可以点击“继续答题”，活动时间内答题次数不限。<br>
4、如何赢钱：系统根据答题累计正确数排名，每场红包个数不等，分前50名、100名、200名，奖金会以红包的形式发送至微信。<br>
5、分享有奖：结束答题后，可以分享到朋友圈，还有机会获得1元红包！<br>

  </p>
      <p @click='showASkq'>我准备好了,开始答题</p>
    </div>
	<div class="selectbook" v-show='showAsks'>
		
		<!-- <p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p> -->
		<section class="select1">
			<!-- <p class="selectgrade">选择年级</p> -->
			<!-- <p><span @click="show">{{grade}}</span></p> -->
			<p>本场活动于&nbsp;<span>{{time}}</span>&nbsp;结束<br>第<span>1~{{rankTime}}</span>名,<br>
			每人获得&nbsp;<span>{{amount}}</span>&nbsp;元</p>
		</section>
		<section id="show" v-show='lazyload'>
			<div v-for='(d,index) in types' @click='showTypebook(d,$event)'>
				{{d.name}}
			</div>
			<section v-if='bookL' class="bookList" >
					<p>答题范围</p>
					<div class="booklists">
						<p v-for='b in books'>{{b.name}}</p>
						
					</div>
					
					<p @click='goAsks(kind)' :class="{first:isfirst,secord:issecond,third:isthird,four:isfour,five:isfive,six:issix,seven:isseven,eight:iseight}">进入挑战</p>
			</section>
			<section v-if='!bookL' class="select">
				请选择类别挑战
			</section>
			
			
		</section>

		<!-- <section class="bookbox" v-show='showbox'>
			<div v-for='(b,index) in bookpage' class="bookname" @click='goaskQuestion(b)'>
				<img :src="b.picId" alt="loading">
				<p>
					{{b.name}}			
				</p>
			</div>

		</section> -->
	<!-- <section class="howpage" v-show='showbox'>
		<p class="backpage" @click='backpage'>{{backpages}}</p>
		<p>{{num+1}}/{{totalpages}}</p>
		<p class="nextpage" @click='nextpage'>{{nextpages}}</p>
	</section> -->
	<section class="last-selectpage1" v-show='showSelect'>
	<!-- <p v-show='showboxs'>已经是最后一页了，我想尝试其他年级的书目</p> -->
	<!-- <p class="othergrade"  @click="show" v-show='showboxs' >选择其他年级</p> -->
	</section>
         <transition name="options">
          <div class="options" v-if="showOptions">
            <span v-for="item in options" @click="selGrade(item)"  v-bind:class="{ active: item.value == selected.value }">{{item.text}}</span>
          </div>
        </transition>
	</div>
	</div>
	</div>
	</template>

	<script>
	import { mapActions } from 'vuex'
	import { bus } from '../../bus.js'

	export default{

		data(){
			return {
				bookpage:[],
				books:[],
				num:0,
				nextpages:'下一页',
				backpages:'上一页',
				totalpages:'',
				grade:'',
				bookpic:[],
				showSelect:false,
				options:[
        		{text:'一年级',value:1},
        		{text:'二年级',value:2},
        		{text:'三年级',value:3},
        		{text:'四年级',value:4},
        		{text:'五年级',value:5},
        		{text:'六年级',value:6},
        		{text:'七年级',value:7},
        		{text:'八年级',value:8},
        		{text:'九年级',value:9}
      			],
      			selected:{text:'',value: 0},
      			showOptions:false,
      			showbox:true,
      			showboxs:false,
      			code:'',
      			classcodeA:'',
      			bookname:'',
      			showAsk:false,
      			flag:true,
      			courseIdArr:[],
      			arr:[],
      			showGrades:true,
      			divs:[1,2,3,4,5,6,7,8],
      			types:[],
      			books:[],
      			isfirst:false,
      			issecond:false,
      			isthird:false,
      			isfour:false,
      			issix:false,
      			isfive:false,
      			isseven:false,
      			iseight:false,
      			kind:'',
				tyPe:["历    史","文    化","儿童文学(一)","四大名著","人物传记","儿童文学(二)","儿童文学(三)","古   文"],
				bookL:false,
				bookname:'',
				showShow:false,
				lazyload:false,
				showAsks:false,
				amount:'',
				rankTime:'',
				shareTime:'',
				time:'',

			}
		},
		methods:{
			goAsks(kind){
				console.log('去答题')
				console.log(kind)
				let openid=JSON.parse(sessionStorage.getItem('u'))['openid'];
				console.log(openid);
				let codes=sessionStorage.getItem('classcode');
				console.log(codes)
				 // this.axios.get(this.ip.RESTPATH+'rest/getCodeIsValid/'+this.classcode)
				 this.axios.get(this.ip.RESTPATH+'rest/getCodeIsValid/'+codes)
				.then(res=>{
					console.log(res)
					if(res.data.flag==true){
						console.log('去答题')
						// 第一次答题
						this.getQData({
							type:kind,
							classId:this.$route.params.classcode,
							self:this})		
					}else if(res.data.flag=='finish'){
							bus.$emit('tip','活动已经结束!')
					}
					
				})
				
			},
			begin(){
				console.log('开始挑战')
			},
			showTypebook(item){
				this.bookL=true,
				this.bookname=item.name;
					// console.log(item)
					this.books=item.course;
					// console.log(this.books)
      				var el=event.currentTarget;
      				$(el).css('transform','scale(1.2)')
      				$(el).siblings('div').css('transform','scale(1)')
      				this.kind=item;
      				for(var i=0;i<this.tyPe.length;i++){
      					if(this.tyPe[i]==item.name){
      							this.kind=i;
      					}
      				}
      				
					
			},
		...mapActions({
     		 saveShowAsk:'saveShowAsk',
     		 saveOpt:'saveOpt',
     		 bigboxs:'bigboxs'
    }),
	      showASkq(){
      			// this.saveShowAsk({showAsk:true})
      			this.showAsks=true;
    },
		goback(){
        this.$router.go(-1);
      },
			 selGrade(item){
			 	this.saveOpt({showop:false})
			 	sessionStorage.setItem('gradeV',item.value)
			 	this.showGrades=false;
     			this.grade=item.text;
      			this.showboxs=false;
      			this.showbox=true;
      			this.showOptions=false;
      			var this_=this;
      			//根据年级获取对应数据
      			this.axios.get(this.ip.RESTPATH+'rest/getMatchBookToClassByGradeId/'+item.value)
      			.then(res2=>{
      				console.log('开始获取数据');
      				console.log(res2.data);
					this_.books=res2.data;
					this_.num=0;
					this_.totalpages=Math.ceil(this_.books.length/6);
					if(this_.totalpages==1){
					this_.showSelect=true;
					this_.showboxs=true;
				}
					this_.bookpage=this_.books.slice(0,6);
					var imgPath=[];
					this_.books.forEach(function(v){
					// console.log(v.picId)
					imgPath.push(v.picId);			
				})
				console.log('获取数目封面地址');
				var piclist1=[];
				this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgPath.join(','))
				.then(function(res1){
					console.log(res1.data);
					this_.books.forEach(v=>{
						v.picId=this_.ip.filePath1+res1.data[v.picId].href;
						piclist1.push(v)
					})
				})
      			})
      			sessionStorage.setItem('grade',item.text);//存当前年级		
    },
			show(){	
				if(this.flag){
				this.showOptions=true;
				this.showbox=false;
				this.showboxs=false;
				this.flag=false;
			}else if(!this.flag){
				this.showOptions=false;
				this.showbox=true;
				this.showboxs=true;
				this.flag=true;
			}	
		},
			 ...mapActions({
      				 getQData: 'getQData'
    					}),
			goaskQuestion(b){
				if(sessionStorage.getItem('flags')){
					bus.$emit('tip','您已经挑战过了!')
				}else{
				console.log('选择书目挑战')
			//第一次答题
				// alert(this.arr.length)
			// if(this.$store.state.answerStore.length==0){
				if(this.arr.length==0){
				console.log('进入答题页面')
				// let idArr=sessionStorage.getItem('courseId');
				// sessionStorage.setItem('courseId',b.id+','+idArr)
				this.courseIdArr.push(sessionStorage.getItem('courseId'))
				// this.arr=sessionStorage.getItem('courseId').split(',')
				this.getQData({
				courseId:b.id,
				name:b.name,
				classId:this.$route.params.classcode,
				self:this})
			}else{
				// console.log(b.id)
				// var d=this.$store.state.answerStore;
				var d=this.arr;
				var flag = true
					for(var v=0;v<d.length;v++){
						// console.log(d[v])
						 	// console.log(d[v].courseId!=b.id && v<d.length-1)
    						// if(d[v].courseId==b.id){
    							if(d[v]==b.id.toString()){
    						        bus.$emit('tip','本书已挑战')
    						        flag = false
    								break;
    							}  					
    					}
					}
					if (flag) {	
    						this.getQData({
										courseId:b.id,
										classId:this.$route.params.classcode,
										name:b.name,
										self:this})							
					}
				}

				},
			nextpage(){
				this.num++;
				// console.log(this.num)
				console.log(this.totalpages)
				this.bookpage=this.books.slice(6*this.num,6*(this.num+1));
				if(this.num==this.totalpages-1||this.totalpages==1){this.showSelect=true;this.showboxs=true;}
					if(this.totalpages<this.num+1){
						// this.nextpages='最后一页';
						this.num=this.totalpages-1;
						this.bookpage=this.books.slice(6*this.num,6*(this.num+1));
						// console.log('最后一页');
						bus.$emit('tip', '最后一页');
					}
			},
			backpage(){
				this.num--;
				// console.log(this.num)
				this.showboxs=false;
				if(this.num<this.totalpages){this.showSelect=false;}
				this.bookpage=this.books.slice(6*(this.num),6*(this.num+1));
				if(this.num<0){
					this.num=0;
					this.bookpage=this.books.slice(6*this.num,6*(this.num+1));
				}
			},
			getImg(picIds){
				var that=this;
				console.log('获取数目封面地址');
				var piclist1=[];
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+picIds.join(','))
				.then(function(res1){
					picIds.forEach(v=>{
						v=that.ip.filePath1+res1.data[v].href;
						piclist1.push(v)
					})
					that.bookpic=piclist1;
				})
			},
			rotateDiv(){
				console.log('点击')
						var this_=this;
						cR=Math.PI/2-this.rotate;
						timer || (timer=setInterval(this_.rotate,10));

			},
			
		},
		computed:{
			 // showAsks(){
   	// 			return this.$store.state.showAsk;
    // 		},
    		showOp(){
    			return this.$store.state.showOps;
    		},
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			this.config();
			this.$store.state.answerStore=[];
			 if(!sessionStorage.getItem('classcode')){
			 		console.log('没有登陆')
        			this.$router.push({name:'bisai'})
    	}else{
    	// let openid=JSON.parse(sessionStorage.getItem('u'))['openid'];
    	// this.axios.get(this.ip.RESTPATH+'rest/getAnswerIsValid/'+this.$route.params.classcode+'/'+openid)
    	// .then(res=>{
    	// 	console.log(res)
    	// 	if(res.data.flag){
    	// 		sessionStorage.setItem('flags',true)
    	// 	}else{
    	// 		sessionStorage.setItem('flags','');
    	// 	}
    	// })
			this.$store.state.bigbox=true;
			if(sessionStorage.getItem('courseId')){
				console.log('aaa')
				this.arr=sessionStorage.getItem('courseId').split(',');
			}
			// sessionStorage.setItem('courseId','')
			
			this.courseIdArr.push(sessionStorage.getItem('courseId'));
			// $(function(){})
			console.log(this.$route.params.classcode)
			this.code=this.$route.params.classcode;
			var this_=this;
			// 刚开始进来选择年级对应的数据
			// if(sessionStorage.getItem('gradeV')){
			this.axios.get(this.ip.RESTPATH+'rest/getMatchBookToClassByGradeId/'+this.code)
			.then(function(res){
				// this_.books=res.data[0].course;
				// console.log(this_.books)
				bus.$emit('closeloading')
				this_.showShow=true;
				this_.lazyload=true;
				
				console.log('根据班级代码获取的书目数据');
				console.log(res);
				this_.types=res.data.typeList;
				this_.amount=res.data.amount;
				this_.rankTime=res.data.rankTime;
				sessionStorage.setItem('sharetime',res.data.shareTime)
				console.log(sessionStorage.getItem('sharetime'))
				this_.time=res.data.time;
				// this_.books=res.data;
				// this_.grade=sessionStorage.getItem('grade');
				// this_.totalpages=Math.ceil(this_.books.length/6);
				// if(this_.totalpages==1){
				// 	this_.showSelect=true;
				// 	this_.showboxs=true;
				// }


				// this_.bookpage=this_.books.slice(0,6);
				// console.log(this_.bookpage)
				// var imgPath=[];
				// // console.log(this_.books)
				// this_.books.forEach(function(v){
				// 	// console.log(v.picId)
				// 	imgPath.push(v.picId);			
				// })
				// console.log('获取的书目图片地址')
				// var piclist1=[];
				// this_.axios.get(this_.ip.filePath+"rest/download/links?ids="+imgPath.join(','))
				// .then(function(res1){
				// 	this_.books.forEach(v=>{
				// 		v.picId=this_.ip.filePath1+res1.data[v.picId].href;
				// 		piclist1.push(v)
				// 	})
				// })
			})
			//请求结束
			// }				
}
		},
	}
</script>

<style lang='less'>
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
				.first{background: rgba(177, 131, 68, 0.74);}
      			.secord{background: rgba(202, 54, 54, 1);}
      			.third{background:rgba(53, 165, 35, 1);}
      			.four{background:rgba(178, 202, 66, 1);}
      			.six{background: rgba(49, 73, 169, 1);}
      			.five{background: rgba(74, 177, 173, 1);}
      			.seven{background: rgba(140, 78, 179, 1);}
      			.eight{background: rgba(192, 192, 192, 1);}
     @keyframes beforeShow
 	 {
  	0%{
  		
    	opacity: 0;
    	transform: scale(0);
  }
  	100%{
    	
    	opacity: 1;
    	transform: scale(1);

   }
  }
   @keyframes types{
      from{
      	transform: scale(.5);opacity: .5;
      	-webkit-transform: scale(.5);}
      to{transform: scale(1);opacity: 1;
      	-webkit-transform: scale(1);}
    }
  .selectedbox{
  	width:100%;
	height:100%;
	// background: url('../../assets/images/exambg.jpg') no-repeat;
	// background-size: cover;
	  .bg{
			display: inline-block;
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: -1;
			}
			 &>p{
        	text-align: center;
        	  color:#d2d2d2;
        	  // margin-top: 3rem;
        	  position: relative;
        	  top:20%;
        	  left:0;
        	  font-size: 2.2rem;
        	  letter-spacing: 3px;
        }
	.options{
        width: 242px;
        height: 242px;
        border-radius: 8px;
        position: fixed;
        left: 0;right: 0;top: 0;bottom:0;
        margin: auto;
        z-index: 99;
        // overflow: hidden;
        /*border: 1px solid gray;*/
        cursor: pointer;
      
        span{
          float: left;
          width: 80px;
          height: 80px;
          // background-color: rgb(247, 243, 241);
          background: #1e365f;
          line-height: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color:#d2d2d2;
          letter-spacing: 2px;
          &.active{
            background-color: #FF9800;
            color: #fff;
          }
          &:nth-of-type(1){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-of-type(2){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-of-type(3){border-bottom:1px solid gray;}
          &:nth-of-type(4){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-of-type(5){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-of-type(6){border-bottom:1px solid gray;}
          &:nth-of-type(7){border-right:1px solid gray;}
          &:nth-of-type(8){border-right:1px solid gray;}
          &:nth-of-type(9){}
        }

      }
  }
    .selected{
    	width:100%;
		height:100%;
	.beforeAsk{
      position: fixed;
      width:96%;
      height:90%;
      left:2%;
      top:2%;
      background: rgba(0,0,0,.3);
      border-radius: 10px;
      animation: beforeShow 1s ease-out forwards;
      z-index: 999;
      p{
        // text-align: center;
        color:#d2e5ff;
        margin:1.5rem 1.5rem;
        // text-indent: 1em;

        &:first-child{
            font-size: 1.6rem;
            color:#ff2b46;
            text-align: center;
            font-weight: 700;
        }
        &:nth-child(2){
          font-size: 1.6rem;
          line-height: 2.3rem;
          letter-spacing: 2px;
        }
        &:last-child{
          margin:8% auto 0;
          text-align: center;
            width:65%;
            height:3rem;
            line-height: 3rem;
            border-radius: 5px;
            letter-spacing: 2px;
            background:  #366d9d;
            font-size: 1.6rem;
        }
      } 
    }
    .bg{
			display: inline-block;
			width:100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: -1;
			}
    }
	.selectbook{
		width:100%;
		height:100%;
		position: relative;
		.goback{
			color:#fff;
			margin-left: 1rem;
			padding-top: 1rem;
			i{
			font-size: 25px;
			}
		}
		.select1{
			width:100%;
			// height:10%;
			position: relative;
			overflow:hidden;
			// border-radius: 5px;
			p{
				width:95%;
				// height:100%;
				position: relative;
			    height:auto;
			    line-height: 35px;
				text-align: center;
				letter-spacing: 3px;
				background: #9d364b;
				border-radius: 8px;
				margin:0 auto;
				color:#fff;
				font-size: 1.8rem;
				margin-top: .5rem;
				span{
					color:#e6caca;
					font-size: 2.2rem;
				}
				
			}
		}
		#show{
			width:98%;
			// height:10rem;
			margin:0 auto;
			// background: #eee;
			margin-top: 1rem;
			position: relative;
			animation: types .8s forwards;
			display: flex;
			flex-wrap: wrap;
			
			
			.bookList{
				margin: 1rem auto;
				width:90%;
				border:1px solid  rgba(238, 238, 238, 0.41);
				border-radius: 5px;
				max-height: 22rem;
				
    			border-radius: 20px;
				.booklists{
					
				overflow-y: scroll;  
    			-webkit-overflow-scrolling: touch;
    			overflow-scrolling:touch;
				max-height: 10rem;
				
					p{
						color:#e0e0e0;
					font-size: 1.8rem;
					text-align: center;
					margin: .5rem;
					margin-bottom: 0;
					
					width:auto;
					}
				}
				&>p{
					color:#e0e0e0;
					font-size: 1.8rem;
					text-align: center;
					// margin: 1rem;
					margin-bottom: 0;
					// padding-bottom: 1rem;
					// border-bottom: 1px solid #eee;
					width:auto;
					&:first-child{
					width:40%;
					background: #366D9D;
					margin: 1rem auto 1rem;
					padding:.5rem 0;
					border-radius: 5px;
					color:#fff;
					font-size: 2rem;

					}

					&:last-child{
					background:#366D9D;
					margin: 1rem auto 1rem;
					width:45%;
					font-size: 2rem;
					padding:.5rem 0;
					border-radius: 5px;
					letter-spacing: 2px;
					color:#fff;
					// transition:.5s;
					&:active{
						transform: scale(1.2);
						-webkit-transform:scale(1.2);
					}
				}
				}
				
			}
			.select{
				width:90%;
				height:15rem;
				margin:1rem auto 0;
				line-height: 15rem;
				border-radius: 30px 0 30px 0;
				color:#fff;
				text-align: center;
				font-size: 2rem;
				border:1px solid  rgba(238, 238, 238, 0.41);
			}
			&>div{
				width:28%;
				height: 4.8rem;
				line-height: 5rem;
				border-radius: 30px 0 30px 0;
				text-align: center;
				color:#fff;
				font-size: 1.6rem;
				z-index: 99;
				margin:.5rem 2.5%;
				transition: .3s;
				-webkit-transition:.3s;
				&>div{
				width:10rem;
				height: 10rem;
				position: absolute;
				display: none;
				transition: .5s;
				z-index: 1000;
					&>p{
				position: absolute;
				width: 10rem;
				height: 8rem;
				line-height: 2rem;
				left:0rem;
				top:0rem;
				color:#fff;
				border-radius: 5px;
				border:1px solid #fff;
				background: green;
				z-index: 1000;
			
				&>span{
					display: inline-block;
					width:100%;
					font-size: 1.2rem;
					line-height: 1.4rem;
					color:rgba(255,255,255,.5);;
					text-align: center;

				}
			}
			
				}

				img{
					position: absolute;
					width:100%;
					height: 100%;
					left:0;
					top:0;
					z-index: -1;
				}
				// &::before{
				// 	content:'';
				// 	position: absolute;
				// 	width:100%;
				// 	height:100%;
				// 	left:0;
				// 	top:0;
					
				// }
				&:nth-of-type(1){
					top:0;
					left:0;
					background: rgba(177, 131, 68, 0.74);
					// transform: scale(1.2);
					&:active{
						background: rgba(177, 131, 68, 1);
					}
					&>div{
					top:10rem;
					left:10rem;
					background: rgba(177, 131, 68, 1);
					}
				}
				&:nth-of-type(2){
					top:0;
					left:10rem;
					background: rgba(202, 54, 54, 0.72);
					&:active{
						background: rgba(202, 54, 54, 1);
					}
					&>div{
					top:10rem;
					left:0;
					}
				}
				&:nth-of-type(3){
					top:0;
					right: 0;
					background: rgba(53, 165, 35, 0.67);
					&:active{
						background:rgba(53, 165, 35, 1);
					}
					&>div{
						top:10rem;
						left:-10rem;
					}
				}
				&:nth-of-type(4){
					left:0;
					top:10rem;
					background: rgba(178, 202, 66, 0.61);
					&:active{
						background:rgba(178, 202, 66, 1);
					}
					&>div{
				left:10rem;
				top:0;
					}
				}
				&:nth-of-type(5){
					right:0rem;
					bottom:10rem;
					background: rgba(74, 177, 173, 0.55);
					&:active{
						background: rgba(74, 177, 173, 1);
					}
					&>div{
				left:-10rem;
				top:0;
					}
				}
				&:nth-of-type(6){
					left:0;
					bottom:0;
					background: rgba(49, 73, 169, 0.62);
					&:active{
						background: rgba(49, 73, 169, 1);
					}
					&>div{
						top:-10rem;
						left:10rem;
					}
				}
				&:nth-of-type(7){
					left:10rem;
					bottom:0;
					background: rgba(140, 78, 179, 0.58);
					&:active{
							background: rgba(140, 78, 179, 1);
					}
					&>div{
						top:-10rem;
						left:0;
					}
				}
				&:nth-of-type(8){
					right:0;
					bottom:0;
					background: rgba(192, 192, 192, 0.58);
					&:active{
						background: rgba(192, 192, 192, 1);
					}
					&>div{
					top:-10rem;
					left:-10rem;
					}

				}
				span{
					color:#fff;
				}
			}


		}
		.bookbox{
			width:98%;
			margin:0 auto;
			height:62%;
			// background:#fff;
			border-radius: 10px;
			display: flex;
			justify-content: space-around;
			flex-wrap:wrap;
			.bookname{
				width: 32%;
				height:48%;
				// background: #eee;
				border:1px solid #366d9d;
				margin-top: 5px;
				img{
					display: inline-block;
					width:94%;
					height:77%;
					margin-left: 3%;
					margin-top: 3px;
					border:1px solid #366d9d;
				}
				p{
					width:94%;
					height:20%;
					margin-left: 3%;
					margin-top: 3px;
					font-size: 12px;
						text-align: center;
						color:#fff;
					// span{
					// 	display: inline-block;
					// 	width:100%;
						
					// }
				}

			}
			
		}
		.howpage{
			height:30px;
			display: flex;
			justify-content: center;
			margin-top: 1rem;
			p{
			text-align: center;
			color:#e0e0e0;
			height:30px;
			line-height: 30px;
			margin:0 1rem;
			}
			.nextpage,.backpage{
			background: #366d9d;
			color:#fff;
			width:25%;
			border-radius: 5px;

		}
		}
		.last-selectpage1{
			margin-top: .3rem;
			p{
			text-align: center;	
			color:rgba(255,255,255,.8);
			letter-spacing: 2px;
			&:first-child{
					font-size: 12px;
			}
			}
			
		}
		.othergrade{
			width:35%;
			height: 30px;
			line-height: 30px;
			text-align: center;
			background: ;
			color:#fff;
			margin:.3rem auto;
			border-radius: 3px;
			background: #366d9d;
		}
		.options{
        width: 242px;
        height: 242px;
        border-radius: 8px;
        position: fixed;
        left: 0;right: 0;top: 0;bottom: 0;
        margin: auto;
        z-index: 99;
        overflow: hidden;
        /*border: 1px solid gray;*/
        cursor: pointer;
        span{
          float: left;
          width: 80px;
          height: 80px;
          // background-color: rgb(247, 243, 241);
          background: #1e365f;
          line-height: 80px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color:#d2d2d2;
          letter-spacing: 2px;
          &.active{
            background-color: #FF9800;
            color: #fff;
          }
          &:nth-child(1){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(2){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(3){border-bottom:1px solid gray;}
          &:nth-child(4){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(5){border-right:1px solid gray;border-bottom:1px solid gray;}
          &:nth-child(6){border-bottom:1px solid gray;}
          &:nth-child(7){border-right:1px solid gray;}
          &:nth-child(8){border-right:1px solid gray;}
          &:nth-child(9){}
        }

      }
		
	}
</style>