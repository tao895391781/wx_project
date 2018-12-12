<template>
	<section id='newReadPrint' v-show='showThis' ref='wrapper'>
		<div class="firstIns" v-if='secordIn'>
			<div class="printTop">
				<img :src="headimg" alt="loading" @click='goRouter("myss")'>
				<p @click='goRouter("myss")'>
					<span>{{nickname}}</span><br>
					<span> {{grades1}}年级</span>
				</p>
				<p class="changeLevels" @click='goRouter("myDate")'><span>阅读<br>日历</span><span><i class="iconfont">&#xe640;</i></span></p>	 
			</div>
			<banner1></banner1>
			<div class="clubAndType" :class='{fixThis:fixThis}'>
				<div @click = 'goRouter("myCourse")'>
					<p><i class="iconfont">&#xe63b;</i></p>
					<span>我的课程</span>
				</div>
				<div @click='goZhibo'>
					<p><i class="iconfont">&#xe66d;</i></p>
					<span>直播间</span>
				</div>
				<div @click='goRouter("myAchievment")'>
					<p><i class="iconfont">&#xe662;</i></p>
					<span>我的成就</span>
				</div>
			</div>
			<div class="scrollInfo">
				<p>文升头条</p>|
				<p class="scrollInfoText"><span v-for='s in scrollInfo' @click='windowOpen(s.src)'>{{s.title}}</span></p>
			</div>
			<p class="blank"></p>
			<p class="qualityCourse">
				精品课程
			</p>
			<section class="ClassCourseType">
				<div class="commons left">
					<div @click='goClubClass(3)'>
						<span>名著阅读营课</span>
						<p><i class="iconfont">1</i>月阅读<i class="iconfont">2</i>本书</p>
					</div>
				</div>
				<div class="commons right">
					<div @click='goClubClass(1)'>
						<span>阅读督导挑战营</span>
						<p><i>1</i>周阅读<i>1</i>本书</p>
					</div>
				</div>
			</section>
			<p class="blank"></p>
			<p class="qualityCourse">
				热门营·课
			</p>
			<div class="indexbooklist">
				<p v-show='nobook'>暂无课程</p>
				<ul class="commendListss" v-show='!nobook'>
				<li v-for='(c,index) in commendList' @click='goRouter("qualityCourse",c)'>
					<div>
						<lazy-component>
							<img :src="c.picId" :alt="index" srcset="" class='mini-cover'>
						</lazy-component>
					</div>
					<div>
						<p>{{c.stage}}</p>
						<p>{{c.grade}}</p>
						<p>{{transDate(c.beginDate)}}-{{transDate(c.finishDate)}}</p>
					</div>
				</li>
			</ul>
			</div>
		</div>
		<div class="secordIns" v-show='firstIn'>
			<img src="../../../assets/images/Nbg1.png" alt="loading">
			<img src="../../../assets/images/logo.png" alt="">
			<p>选择以下信息</p>
			<div class="sexSelect left" @click='sureSex("man")' :class="{sureManSex:showMFontIcon}"><img src="../../../assets/images/man.png" alt="111"><p>我是男生</p><i class="iconfont" v-show='showMFontIcon' :class="{fontIcon:showMFontIcon}">&#xe625;</i></div>
			<div class="sexSelect right" @click='sureSex("woman")' :class="{sureWomanSex:showWFontIcon}"><img src="../../../assets/images/woman.png" alt="222"><p>我是女生</p><i class="iconfont" v-show='showWFontIcon' :class="{fontIcon:showWFontIcon}">&#xe625;</i></div>
			<ul id="clickMe">
				<li>{{selectAge}}
					<i class="iconfont">&#xe775;</i>
				</li>
				<li>{{selectGrade}}
					<i class="iconfont">&#xe775;</i>
				</li>
			</ul>
			<p class="beginRead" @click='BeginRead'>开启阅读之旅</p>

		</div>	
	</section>
</template>
<script>
import {bus} from '../../../bus.js'
import banner1 from '../../../components/banner1.vue'
import Picker from 'better-picker'
import {data1} from '../../../city_data.js'
import {data2} from '../../../city_data.js'
import {options} from '../../../city_data.js'
import {transDate} from '../../../config.js'
	export default{
		data(){
			return {
				selectGrade:'选择年级',
				selectAge:'选择年??',
				showMFontIcon:false,
				showWFontIcon:false,
		 		fixThis:false,
		 		name:'',
		 		id:'',
		 		headimg:'11',
		 		nickname:'tll',
		 		options:options ,
			    value: '',
			    label:'',
			    wxId:'',
			    firstIn:true,
			    secordIn:false,
			    gradess:'',
			    showThis:false,
			    data1:data1,
			    data2:data2,
			    sex:'',
			    ageValue:'',
			    gradeValue:'',
			    commendList:[],
			    flag:false,
			    m:'',
			    imgSrcs:[],
			    levels:'',
			    grades1:'',
			    indexs:'-',
			    nobook:true,
			    scrollInfo:[
			    {
			    "title":"阅读不停|文升阅读2018秋季VIP小班名著阅读课程招生了！",
				"src":"https://mp.weixin.qq.com/s/w-mQmy09cfQ9DavhXZZwAg"
				},{
				"title":"文升阅读的优质导师们，你想Pick谁?",
				"src":"https://mp.weixin.qq.com/s/krgaOadhKzSfX2SNWh6OWQ",
				},
				{
				"title":"如何通过阅读四大名著，获得辩证思维能力？",
				"src":"https://mp.weixin.qq.com/s/JhhKizM3RRz9D50itaT0_g"
				},
			    ],
			    timeoutIndex:1,
			    timer2:'',
			    timer3:'',
			    showMyCourse:false,
				index:0,
				myCourse:[],
				myCourse1:[],
				ind:0,
				scrollI:0,
				scroll:{},
				
			}
					
	},
	watch:{
		'commendList':{
			 	deep:true,
                handler:function(newValue,oldValue){
                	console.log(this.scroll);
                	this.scroll.refresh();
                }
		},
	},
	methods:{
		transDate:transDate,
		goZhibo(){
			window.open('https://m.qlchat.com/wechat/page/live/2000001334158009','_blank')
		},
		windowOpen(src){
			window.open(src, '_blank');
		},
		goRouter(name,c){
			if(name === 'qualityCourse'){
				this.$router.push({name:'qualityCourse',params:{id:c.type},query:{Ids:c.id}});
			}else{
				this.$router.push({name:name})
			}
		},
		goMyBuyCourse(){
			this.$router.push({name:'myCourse'})
		},
		
		sureSex(sex){
			if(sex=='man'){
				this.showMFontIcon = true;
				this.showWFontIcon = false;
				this.sex = 'man';
			}else{
				this.showMFontIcon = false;
				this.showWFontIcon = true;
				this.sex = 'woman';
			}
		},
		//去??页面
		goClubClass(index){
			this.$router.push({name:'qualityCourse',params:{id:index},query:{from:'four'}})
		},
		goHuiyaun(index){
			this.$router.push({name:'huiyuan',params:{id:index}})
		},
		selected(){
			sessionStorage.setItem('grades',parseInt(this.label));
			},
		BeginRead(){					
			if(this.sex==''){
					bus.$emit('tip','请选择性别');
				} else if(this.selectGrade=='选择年级' || this.selectAge=='选择年??'){
					bus.$emit('tip','请选择年级或年??');
				}else{
					let postdata={
						age:this.ageValue.toString(),
						sex:this.sex,
						wxId:this.wxId,
						grade:this.gradeValue.toString(),
						headImg:this.headimg,
						nickName:this.nickname,
						isFirst:1,
					}
					this.axios.post(this.ip.RESTPATH+'rest/postDayShareUserInfoByWxId',postdata)
					.then(res=>{
						if(res.data.flag){
							bus.$emit('loading');
							this.getInfo();
							this.firstIn=false;
							this.secordIn=true;
						}
					})	
				}
			},  
		initScroll(){
			if (Object.keys(this.scroll).length == 0){ 
				console.log('create scroll')
				this.scroll = new this.BScroll(this.$refs.wrapper,{click:true,disableTouch:false});
			}else{
				console.log('refrash scroll');
				console.log(this.scroll)
				this.scroll.refresh();
			}
			
		},  

		getBookInfo(){
			//获取首页推荐书?列表
				let thats = this;
				let id = sessionStorage.getItem('IndexId');
				console.log(id)
		 		this.axios.get(this.ip.RESTPATH+'rest/getAllReadingPlanBookByGrade?gradeId='+id)
		 		.then(res=>{
		 			//获取每本书的封面地址
		 			let PicId = [];
		 			console.log(res)
		 			if(res.data.length == 0){
		 				this.nobook = true;
		 			}else{
		 				this.nobook = false;
		 				
		 				}
		 			res.data.forEach(v=>{		
		 				PicId.push(v.picId)
		 			});
		 			this.axios.get(this.ip.filePath+"rest/download/links?ids="+PicId.join(','))
					.then(function(res1){
						console.log(res1.data);
						res.data.forEach(v=>{
		 					v.picId = thats.ip.filePath2+res1.data[v.picId].href;
		 				});	
					
           	 		thats.commendList = res.data;	
				});
					thats.$nextTick(() => {
              			thats.initScroll();
           	 		});
		 		})
		},
		//从首页地址截取区别商??的参数
		getBusinessName(){
			return window.location.href.split('?name=')[1]
		},
		//更新用户数?
		upUserData(wxId,name,headimg){
			let updata = {
				"wxId":wxId,
				"nickName":name,
				"headImg":headimg
			}
			console.log(updata)
			console.log(this.ip.RESTPATH+'rest/updateUserHeadImgAndNickName')
			this.axios.post(this.ip.RESTPATH+'rest/updateUserHeadImgAndNickName',updata)
			.then(res=>{
				console.log('更新数?成功')
			})
		},
		//获取首页信息
		getInfo(){
				let name = this.getBusinessName();
				//首页保存不同商??的标识id；
				console.log('商??参数是:' + name)
				sessionStorage.setItem('signIds',name);
				console.log(sessionStorage)
				this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
				this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
				this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
				// this.upUserData(this.wxId,this.nickname,this.headimg);
				this.axios.get(this.ip.RESTPATH+'rest/getUserInfoIsExist/'+this.wxId)
				.then(res=>{
					console.log(res.data)
					bus.$emit('closeloading');
					if(res.data.flag){
						sessionStorage.setItem('grades',res.data.grade);
						sessionStorage.setItem('IndexId',res.data.id);
						this.levels = res.data.levels;
						this.grades1 = res.data.grade;
		 				this.showThis=true;
		 				this.firstIn=false;
						this.secordIn=true;
						this.$parent.isFirst = true;
						this.getBookInfo();
						this.scrollInfos();
						this.$nextTick(() => {
              				this.initScroll();
           	 			});
					}else{
						bus.$emit('closeloading');
						this.showThis=true;
						this.firstIn=true;
						this.secordIn=false;
						this.$parent.isFirst = false;
					}
				})
				if(this.$route.query.from == 'myCourse'){
					this.goRouter("myCourse");
				}	
			},
			scrollInfos(){
				let that = this;
				this.timer3 =  setTimeout(function(){
					let $span =  $('.scrollInfoText').find('span');
					let h = $span.height();
					$('.scrollInfoText').get(0).style.top = - h * that.scrollI +'px';
					$('.scrollInfoText').get(0).style.transition = 'all 1s';
					that.scrollI++;
					if(h* that.scrollI > $span.length * h){
						$('.scrollInfoText').get(0).style.top = 0; 
						$('.scrollInfoText').get(0).style.transition = '';
						that.scrollI = 0;
						}
					that.scrollInfos();
					},3000)
				},	
	},
	beforeCreate(){
		bus.$emit('loading');
		this.$parent.isFirst = false;
	},
	computed:{
	},
	beforeRouteLeave (to, from, next){
	   	this.$parent.isFirst = false;
	   	clearTimeout(this.timer2);
	   	clearTimeout(this.timer3);
	    next()  
	},
	created(){
		bus.$on('sessionSuccessStup',()=>{
			this.getInfo();
		});
		if (sessionStorage.getItem('u')){
				this.getInfo()
			}else{
				console.log('没存session');
				//先存??假数?数?调试
				this.getWxinfo('sessionSuccessStup');
				 // this.configs('sessionSuccessStup');
			};
			let that=this;
			$(function(){
			let picker = new Picker({
				data: [that.data1, that.data2],
				selectedIndex: [0, 1],
				title: '选择年??&年级'
			});
			let nameEl = $('#clickMe').get(0);
			picker.on('picker.select', function (selectedVal, selectedIndex) {
				that.selectAge  = that.data1[selectedIndex[0]].text;
				that.selectGrade =  that.data2[selectedIndex[1]].text;
				that.ageValue = that.data1[selectedIndex[0]].value;
				that.gradeValue = that.data2[selectedIndex[1]].value;
			})
				nameEl.addEventListener('click', function () {
				picker.show();
			});		
			});
			
		},
	components:{
		banner1,   
 		 },
	mounted(){
		
	},
}
</script>
<style lang='less' scoped>
    ::-webkit-input-placeholder { color:rgba(0,0,0,.8);font-size: 1.5rem;text-align: center;}
	:-ms-input-placeholder { color:rgba(0,0,0,.8);font-size: 1.5rem;text-align: center;} /* Internet Explorer 10+ */
	#newReadPrint{
		width:100%;
		flex:1;
		overflow: hidden;
		.firstIns{
			width:100%;
			background:#fff;
			&>img{
			width: 100%;
			height:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: -1;
			opacity:.8;

		}
			&>.printTop{
			height:4rem;
			position: relative;
			padding-bottom:2px;
			width:100%;
			background:#fcfcfc;
			&>img{
				display:inline-block;
				width:3rem;
				height:3rem;
				margin:.5rem 0 .5rem 1rem;
				float: left;
				border-radius:50%;
			}
			&>p{
				color:#854836;
				float: left;
				height:3rem;
				margin-top: .1rem;
				font-size:1.6rem;
				margin-left: .5rem;
				span{
					font-size:1rem;
					line-height: 1rem;
				}
			}
			.changeLevels{
				float: right;
				height:3rem;
				width:7rem;
				margin:.5rem 1rem;
				border-radius:6px;
				color:#fff;
				font-size:1.3rem;
				&>span{
					display: inline-block;
					color:#4dc5d3;
					float: right;
					line-height: 1.3rem;
					margin-top: .2rem;
					i{
						font-size:2.5rem;
					}
					&:last-child{
						line-height:2.5rem;
						margin-right: .5rem;
						margin-top: 0;
					}
					
				}
			}
		}
		.clubAndType{
			width:100%;
			padding:0 5%;
			background:#fff;
			overflow: hidden;
			position: relative;
			div{
				width:33.3%;
				height:7rem;
				text-align:center;
				border-radius:5px;
				float: left;
				margin: .5rem 0;
				p{
					color:#666;
					letter-spacing:2px;
					width:4rem;
					height:4rem;
					background:#f2f2f2;
					margin-left: 50%;
					border-radius:10px;
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%);
					line-height: 4rem;
					i{
					font-size:2.5rem;			
					text-align: center;
					line-height: 4rem;
					color:#fff;
					position: relative;
					top:0;
					left:2px;
					}
				}
				
				span{
					font-size:1.2rem;
					margin-top: .3rem;
					display: block;
					color:#666;
					transform:scale(.9);
				}
				&:first-child{
					p{
						background-image:linear-gradient(to bottom,#6b83f8,#c2a0fc);
					}
					
				}
				&:nth-child(2){

					p{
						background-image:linear-gradient(to bottom,#f98faf,#ca9ff5);
					}
				}
				&:last-child{
					p{
						background-image:linear-gradient(to bottom,#ff6f87,#ffce9c);
					}

				}	
					}
		}
		.scrollInfo{
			height:3rem;
			line-height: 3rem;
			color:#ddd;
			background: #fff;
			/*margin:.1rem 0;*/
			border:1px solid #f2f2f2;
			position: relative;
			overflow: hidden;
			margin-bottom: .3rem;
			border-bottom-width:0;
			&>p{
				float:left;
				line-height: 3rem;
				text-align: center;
				&:first-child{
					width:20%;
					font-size: 1.2rem;
					/*border-right: 1px solid #f2f2f2;*/
					/*font-style: italic;*/
					color:#e91e63;
					font-weight: 700;
					/*transform-style: preserve-3d;
					animation: rotates 6s linear infinite;*/
				}

				&:last-child{
					width:80%;
					position: absolute;
					top:0;
					left:20%;
					&>span{
						display: block;
						width:90%;
						height:100%;
						font-size:1rem;
						text-indent: 1em;
						white-space: nowrap;
						overflow:hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.scrollInfoText{
				overflow: scroll;
				position: relative;
			}
		}
		.blank{
			background: #f2f2f2;
			height: .35rem;
		}
		.qualityCourse{
			font-size: 1.2rem;
			color:#666;
			background: #fff;
			line-height: 3.5rem;
			text-indent: 2em;
			position: relative;
			&>i{
				float: right;
				padding-right: 2rem;
			}
		}

		.ClassCourseType{
    			background: #fff;
    			position: relative;
    			overflow: hidden;
    			margin-bottom: 1rem;
    			.commons{
    				float: left;
    				height:9rem;
    				width:43%;
    				div{
    					position: relative;
    					span{
    						color:#fff;
    						position: absolute;
    						letter-spacing: 1px;
    						font-size: 1.6rem;
    					}
    					p{
    						color:#fff;
    						position: absolute;
    						letter-spacing: 1px;
    					}
    				}
    			}
    			.left{
    				margin-left: 4.7%;
					
    				&>:first-child{	
    					border-radius: 10px;
    					height:100%;
    					background-image:-webkit-linear-gradient(top left, #e96785, #e87a92);
	    					background-image:linear-gradient(to bottom right, #e96785, #e87a92);
  
						span{
							left:1rem;
							top:1.5rem;

						}
						p:nth-child(2){
								bottom:1.5rem;
								left:1.5rem;
								letter-spacing: 2px;
								color: #f5ecec;
								i{
									font-size: 2.5rem;
									position: relative;
									top:.2rem;
								}
						}
						p:nth-child(3){
								bottom:.5rem;
								left:2rem;
								font-size: 1.6rem;
						}
    				}
    			}
    			.right{
    				margin-left: 4.6%;
    				div{
    					width:100%;
    					height:100%;
    					border-radius: 10px;
    					&:first-child{
    					 background-image:-webkit-linear-gradient(top left, #249786, #25a3bf);
    					 background-image:linear-gradient(to bottom right, #249786, #25a3bf);
    						   span{
    						  		top:1.5rem;
    						    	left:1rem;
    						 }

    						 p{
    						 	bottom:1.5rem;
    						 	right:1rem;
    						 	color: #f5ecec;
    						 	i{
    						 		font-style:normal;
    						 		font-size: 2.5rem;
    						 		position: relative;
    						 		top:.5rem;
    						 	}
    						 }
    					
    					}			
    					&:nth-child(2){	
    						background-image:linear-gradient(to bottom right,#6d75b8,#8592e4);
    						margin-top: 6%;
    						span{
    							right:1rem;
    							top:1rem;
    						}
    						p{
    							bottom:1rem;
    							right:0;
    							width:5rem;
    							background: yellow;
    							color:#666;
    							text-align: center;
    							box-shadow: 0 2px 4px #ddd;
    						}
    					}
    				}

    			}

		}
		.indexbooklist{
			width:100%;
			position: relative;	
			padding-bottom: 1rem;
			&>p{
				text-align: center;
				padding:2rem 0;
			}
			.commendListss{
			width:100%;
			/*height:100%;*/
			background:#f1f1f1;

			li{
				height:8rem;
				width:100%;
				background:#fff;
				padding-left:.5rem;
				margin-top: 0;
				&>div{
					float: left;
					height:100%;
					&>p{
						margin-top: 1rem;
						font-size:1.3rem;
						color:#333;
						overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
						&:nth-child(2),&:last-child{
							color:#333;
							margin-top: .5rem;
							line-height: 2rem;
						}
						&:last-child{
							color: #e91e63;
						}
					}
					&:first-child{
						width:40%;
						display: flex;
						justify-content: space-around;
						img{
							display:inline-block;
							width:90%;
							height:80%;
							margin-top: 5%;
							margin-right: 4%;
						}
					}
					&:nth-child(2){
						width:60%;
						
					}
				}
			}
			li:not(:first-child){
					border-top: .2rem solid #f2f2f2;  
				}
		}
		}
		}
		.secordIns{
			width:100%;
			height:100%;
			position:relative;
			z-index:60;
			&>img{
				&:first-child{
					width:100%;
					height:100%;
					position: absolute;
					left:0;
					top:0;
					z-index:-1;
				}
				&:nth-child(2){
					width:36%;
					height:4rem;
					margin-left: 32%;
					margin-top: 20%;
				}
			}	
			&>p{
				text-align:center;
				color:#fff;
				margin-top: 2rem;
				font-size:1.6rem;
				letter-spacing:2px;
			}
			.sexSelect{
				width:32%;
				height:6rem;
				background:#f2f2f2;
				display:inline-block;
				border-radius:5px;
				margin-top: 2rem;
				position: relative;
				&>i{
					position:absolute;
					bottom:-.5rem;
					right:1rem;
					font-size:2rem;
				}
				.fontIcon{
					color:#3eff34;

				}
				&>img{
					display:inline-block;
					width:4rem;
					height:4rem;
					margin-top: 1rem;
				}
				&>p{
					float: right;
					height:100%;
					line-height:6rem;
					font-size:1.3rem;
					padding-right:1rem;
				}
			}
			.sureManSex{
				background:#4796ff;
				&>p{
					color:#fff;
				}
			}
			.sureWomanSex{
				background:#fd6cc5;
				&>p{
					color:#fff;
				}
			}
			.left{
				float: left;
				margin-left: 14%;
				}
			.right{
				float: right;
				margin-right: 14%;
				}
				#clickMe{
					
					width:55%;
					margin:0 auto;
					margin-top: 35%;
					li{
						height:4rem;
						width:100%;
						text-align:center;
						line-height:4rem;
						color:#fff;
						font-size:2rem;
						margin-top: 2rem;
						background:#516d95;
						border-radius:5px;
						position: relative;
						letter-spacing:2px;
						&>i{
							position: absolute;
							right:1rem;
							top:0;
							opacity:.3;
						}

					}
				}
				.beginRead{
					width:60%;
					margin:8rem auto 0;
					font-size:1.8rem;
					padding:.7rem 1.5rem;
					border-radius:2rem;
					background:#f60;
				}
			}
		}
</style>