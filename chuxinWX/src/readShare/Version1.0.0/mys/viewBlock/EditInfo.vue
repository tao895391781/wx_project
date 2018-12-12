<template>
	<section id="editIntro" v-show='showThis'>
	 <transition name="slide-fade">
		<div class="edits" v-show='showEdit'>
			<p>{{typeText}}</p>
			<input v-show='showName' v-model='nickname'>
			<ul v-show='showSexA'>
				<li :class="{man:isMan}" @click='isMan = true,isWoman = false,sexss="男"'>男</li>
				<li :class="{woman:isWoman}" @click='isWoman = true,isMan = false,sexss="女"'>女</li>
			</ul>
			<div class="selectCitys" v-show='showSelectcity'>
			<select v-model="selectProvince" id="province">
          		<option v-for="p in citydata" :value="p">{{p.name}}</option>
        	 </select><span>&nbsp;&nbsp;{{provin}}</span>
       		 <select v-model="selectCity">
          		<option v-for="c in selectProvince.cities" :value="c">{{c}}</option>
        	</select><span>&nbsp;&nbsp;{{city}}</span>
        </div>
        <p @click='sureSelect'>确定</p>
        <p @click='showEdit = false'>取消</p>
        
		</div>
	  </transition>
		<div class="img">
			<div><img :src="headimg" alt=""></div>
			
		</div>
		<ul>
			<li><p><i class="iconfont one">&#xe67f;</i>&nbsp;&nbsp;昵称</p><span>{{nickname}}</span></li>
			<li @click='showSexB'><p><i class="iconfont two">&#xe633;</i>&nbsp;&nbsp;性别</p><span>{{sexss}}</span></li>
			<li class="clickMe"><p><i class="iconfont three">&#xe674;</i>&nbsp;&nbsp;年龄</p><span>{{selectAge}}</span><i class="iconfont">&#xe664;</i></li>
			<li class="clickMe"><p><i class="iconfont four">&#xe652;</i>&nbsp;&nbsp;年级</p><span>{{selectGrade}}</span><i class="iconfont">&#xe664;</i></li>
			<li @click='showCity'><p><i class="iconfont five">&#xe620;</i>&nbsp;&nbsp;城市</p><span>{{selectProvince.name}}&nbsp;{{selectCity}}</span><i class="iconfont">&#xe664;</i></li>
		</ul>
 	<button @click='submit'>{{changeText}}</button>
	</section>
</template>
<script>
import Picker from 'better-picker'
import {citydata,data1,data2} from '../../../../city_data.js'
import {bus} from '../../../../bus.js'
	export default {
		data(){
			return {
				options: [{
		          value: '选项1',
		          label: '男'
		        }, {
		          value: '选项2',
		          label: '女'
		        }],
		        value: '',
		        selectProvince:{},
        		selectCity:'',
        		citydata:citydata,
		        selectGrade:'选择年级',
				selectAge:'选择年龄',
		        data1:data1,
			    data2:data2,
			    showSelectcity:false,
			    f:true,
			    sexss:'',
			    nickname:'',
			    showName:true,
			    showSexA:false,
			    typeText:'',
			    showEdit:false,
			    isMan:true,
			    isWoman:false,
			    headimg:'',
			    wxId:'',
			    changeText:'确认修改',
			    showThis:false,
			}
		},
		computed:{
			provin(){
				if(this.selectProvince.name=='北京'|| this.selectProvince.name=='上海'|| this.selectProvince.name=='天津'|| this.selectProvince.name=='重庆'){
					return '市'
				}else{
					return '省'
				}
			},
			city(){
				if( this.selectProvince.name=='北京'|| this.selectProvince.name=='上海'|| this.selectProvince.name=='天津'|| this.selectProvince.name=='重庆'){
					return '区'
				}else{
					return '市'
				}
			},
	
		},
		methods:{
			sureSelect(){
				this.showEdit = false;
				
			},
			submit(){
				if(this.nickname == ''){
					bus.$emit('tip','姓名不能为空')			
				}else if(this.sexss == '选择性别'){
					bus.$emit('tip','性别不能为空')
				}else if(this.selectAge=='选择年龄'){
					bus.$emit('tip','请填写年龄和年级')
				}else{
				let grade;
				this.data2.forEach(v=>{
					if(v.text == this.selectGrade ){
							grade = v.value;
					}
				})
				let postdata = {
					wxId:this.wxId,
					nickName:this.nickname,
					sex:this.sexss=='男'?'man':'woman',
					age:parseInt(this.selectAge),
					grade:grade,
					city:this.selectProvince.name+','+this.selectCity
				};
				console.log(postdata);
				bus.$emit('submithuimu','正在提交中...')
				
				this.axios.post(this.ip.RESTPATH+'rest/postReadPersonInfoByWXId',postdata)
				.then(res=>{
					console.log(res.data);
					if(res.data.flag){
						bus.$emit('closesubmithuimu','已修改');
					}
				})
				
			}
			},
			showNames(){
				this.showEdit = true;
				this.showName = true;
				this.showSexA = false;
			    this.showSelectcity = false;
			    this.typeText = '输入姓名';
			},
			showSexB(){
				this.showEdit = true;
				this.showName = false;
				this.showSexA = true;
			    this.showSelectcity = false;
			    this.typeText = '选择性别';

			},
			showCity(){
				this.showEdit = true;
				this.showName = false;
				this.showSexA = false;
			    this.showSelectcity = true;
			    this.typeText = '选择城市';


			},
			showSex(){
				if(this.f){
						this.showSexs = true;
						this.f = false;
					}else{
						this.showSexs = false;
						this.f = true;
					}
			
			},
			showSelectCitys(){
				this.showSelectcity = true;
			},
			goback(){
				this.$router.go(-1);
			},
			 show: function(){
        		this.$refs['picker'].show();
    			},
   			 select: function(){
        			console.log(arguments)
    		},
		},
		beforeCreate(){
			bus.$emit('loading');
		},
		created(){
			this.nickname=JSON.parse(sessionStorage.getItem('u'))['nickname'];
			this.headimg =JSON.parse(sessionStorage.getItem('u'))['headimgurl'];
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			console.log(citydata)
			this.$parent.isFirst = false;
			let that=this;
			console.log('http://www.wsreading.com/course/'+'rest/getReadPersonInfoByWXId/'+this.wxId)
			this.axios.get(this.ip.RESTPATH+'rest/getReadPersonInfoByWXId/'+this.wxId)
			.then(res=>{
				console.log(res.data);
				bus.$emit('closeloading');
				this.showThis = true;
				this.sexss = res.data.sex == 'Man'?'男':'女';
				this.isMan = res.data.sex == 'Man'?true:false;
				this.isWoman = res.data.sex == 'Man'?false:true;
				this.selectAge =  res.data.age+'岁';
				if(res.data.city == ''){
					this.selectProvince.name = '';
					this.selectCity = '';
				}else{
					this.selectProvince.name = res.data.city.split(',')[0]+'\n'+res.data.city.split(',')[1];
						
				}
				console.log(this.selectProvince.name)
				this.data2.forEach(v=>{
					if(v.value == res.data.grade ){
							this.selectGrade = v.text;
					}
				});

			

			})
			$(function(){
				$('body').css({'height':$(window).height()});
				$('#province').change(function(){
					// that.selectCity='';
					})
					var picker = new Picker({
						data: [that.data1, that.data2],
						selectedIndex: [0, 1],
						title: '选择年龄&年级'
					});
					var nameEl = $('.clickMe');
					picker.on('picker.select', function (selectedVal, selectedIndex) {
						that.selectAge  = that.data1[selectedIndex[0]].text;
						that.selectGrade =  that.data2[selectedIndex[1]].text;
						that.ageValue = that.data1[selectedIndex[0]].value;
						that.gradeValue = that.data2[selectedIndex[1]].value;
						});
						nameEl.on('click', function () {
						picker.show();
					});		
			})

		},
		components:{
			Picker,
		
		}
	}
</script>
<style lang='less'>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
::-webkit-input-placeholder { color:#c0c4cd;font-size: 1.3rem;padding-left: 4rem}
:-ms-input-placeholder { color:#c0c4cd;font-size: 1.3rem;padding-left: 4rem} /* Internet Explorer 10+ */
	#editIntro{
		width:100%;
		height:100%;
		background: #f2f2f2;
		.edits{
			position: fixed;
			width:100%;
			height:100%;
			left:0;
			top:0;
			background: rgba(255, 255, 255, 0.77);
			z-index: 1000;
			&>p{
				line-height: 3.3rem;
				text-align:center;
				background: #fff;
				width: 50%;
				margin-left: 25%;
				background: #73859f;
				color:#fff;
				margin-top: 1rem;
				border-radius: 5px;

			}
			&>p:first-child{
				line-height: 3.3rem;
				text-align:center;
				background: #fff;
				color:#666;

			}
			&>input{
				width:50%;
				height: 3.3rem;
				line-height: 3.3rem;
				text-align: center;
				display: inline-block;
				margin:30% 25%;
				outline: none;
				border-style: none;
				border:1px solid #73859f;
				color:#73859f;
			}
			&>ul{
				width:80%;
				margin:30% auto;
				display: flex;
				justify-content: space-around;
				li{
					width:40%;
					margin-top: 0;
					height: 5rem;
					line-height: 5rem;
					border-radius: 5px;
					background: rgba(48, 49, 51, 0.39);
					text-align: center;
					color:#fff;
				}
				.man{
					background: #409eff;
				}
				.woman{
					background: #ff8ac7;
				}
			}
		}
		header{
			height:43px;
			border-bottom:1px solid #eee;
			background: #fff;
			div{
				display:inline-block;
				background:rgba(255, 255, 255, .87);
				float: left;
				height:100%;
				text-align:center;
				line-height:43px;
				color:#333;
				&:first-child{
					width:20%;
				}
				&:nth-child(2){
					width:60%;	
				}
				&:nth-child(3){
					width:20%;
					color:#f60;
				}
			}
		}
		&>div{
			height:10rem;
			background: #fff;
			overflow: hidden;
			div{
				width:5rem;
				height:5rem;
				border-radius: 50%;
				margin:2.5rem auto 0;
				img{
				display: inline-block;
				width:5rem;
				height: 5rem;
				border-radius: 50%;
			}
			}
			

		}
		&>ul{
			margin-top: 1rem;
			width:100%;
			li{
				height: 4rem;
				line-height: 4rem;
				margin-top: 0;
				background: #fff;
				font-size: 1.3rem;
				text-indent: 2em;
				border-bottom:1px solid #eee;
				position: relative;
				&>i{
					display: inline-block;
					float: right;
					margin-right: 2rem;
					color:#ccc;
				}
				p{
					display: inline-block;
					width:30%;
					line-height: 4rem;
					margin-left: -2rem;
					&>i{
					line-height: 4rem;
					font-size: 1.5rem;
					}
					.one{color:#975d89;}
					.two{color:#409eff;}
					.three{color:#67c23a;}
					.four{color:#73859f;}
					.five{color:#ff00a1;}

				}
				&>span{
					display: inline-block;
					height:100%;
					text-indent: 0;
					padding-left: 5rem;

				}
				&:last-child{
					margin-top: .5rem;
					border-style: none;
				}
			}
		}
		.selectCitys{
			width:70%;
			height:12rem;
			margin:4rem auto;
			position: relative;
			border-radius-top: 8px;
			border-radius-right: 8px;
			/*overflow:hidden;*/
			select{
				width:80%;
				height:3rem;
				margin:.2rem 1rem;
				padding-left: 13%;
				border-style: none;
				outline: none;
				appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none; 
				border:1px solid #73859f;
			}

			&>p{
				width:100%;
				margin:0 auto;
				line-height: 3rem;
				text-align: center;
				position: absolute;
				bottom:0;
				left:0rem;
				/*border:1px solid #eee;*/
				background: #73859f;
				color:#fff;
				

			}
		}
		&>button{
			width:80%;
			margin-left: 10%;
			line-height: 3rem;
			background: #409eff;
			color:#fff;
			margin-top: 5rem;
			border-radius: 5px;
		}
	}
</style>