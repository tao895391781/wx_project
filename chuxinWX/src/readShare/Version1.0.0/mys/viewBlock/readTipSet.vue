<template>
	<section id="readTips">
		<div class="setReadTip">
				<p class="p">
					<button class="clickMe" :disabled="disableds">{{hour}}:{{min}}</button>
					<el-switch
					  v-model="value2"
					  active-color="#13ce66"
					  inactive-color="#ff4949"
					  @change='beginTime'
					  >
					</el-switch>
				</p>
				<p class="setSuccess" v-show='showSucc'>设置成功<i class="iconfont">&#xe6a3;</i></p>
				<p class="setSuccess" v-show='openTip'>{{openText}}</i></p>
		</div>
		
	</section>
</template>
<script>
import Picker from 'better-picker'
	export default{
		data(){
			return {
					hour:'00',
					min:'00',
					sp:':',
				    selectedOptions: [],
				    selectedOptions2: [],
				    showSucc:false,
				    value1: true,
       				value2: true,
       			    disableds:false,
       			    openTip:false,
       				data1:[],
       				data2:[{text:'00',value:'00'},{text:'30',value:'30'}],
       				openText:'已打开阅读提醒',

			}
		},
		components:{
			Picker
		},
		computed:{
		},
		methods:{
			beginTime(value){
						console.log(value);
						this.openTip = true;
						value?this.openText ='已打开阅读提醒':this.openText ='已关闭阅读提醒';
						setTimeout(function(){
							this.openTip = false;
						}.bind(this),1000)
						this.disableds = !value;
						 let postdata ={
				        	wxId:this.wxId,
				        	date:this.hour+':'+this.min,
				        	status:'Stop'
				        }
				        console.log(postdata);
				        this.axios.post(this.ip.RESTPATH+'rest/postStudingTimeTask',postdata)
				        .then(res=>{
				        	console.log(res)
				        })

					},
			handleChange(value) {
				        console.log(value);
				        this.hour = value[0];
				        this.min = value[1];
				        let postdata ={
				        	wxId:this.wxId,
				        	date:this.hour+':'+this.min,
				        	status:'Begin'
				        }
				        console.log(postdata);
				        this.axios.post(this.ip.RESTPATH+'rest/postStudingTimeTask',postdata)
				        .then(res=>{
				        	console.log(res);
				        	if(res.data.flag == 2){
				        		this.showSucc = true;
				        		setTimeout(function(){
				        			this.showSucc = false;
				        		}.bind(this),1500)
				        		
				        	}
				        })
				      },
		},
		created(){
			this.wxId = JSON.parse(sessionStorage.getItem('u'))['openid'];
			for(let i = 1;i<25;i++){
      					 	const obj = {
						          value:(i-1)>9?(i-1):'0'+(i-1),
						          text: (i-1)>9?(i-1):'0'+(i-1),
      							 };
      							 this.data1.push(obj);
      					 }
      		let that =this;	 
      		$(function(){
				$('body').css({'height':$(window).height()});
				
					var picker = new Picker({
						data: [that.data1, that.data2],
						selectedIndex: [0, 1],
						title: '设置时间提醒'
					});
					picker.show();
					var nameEl = $('.clickMe');
					picker.on('picker.select', function (selectedVal, selectedIndex) {
						that.hour  = that.data1[selectedIndex[0]].text;
						that.min =  that.data2[selectedIndex[1]].text;
						that.ageValue = that.data1[selectedIndex[0]].value;
						that.gradeValue = that.data2[selectedIndex[1]].value;
						});
						nameEl.on('click', function () {
						picker.show();
					});	
					picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
						console.log(selectedVal);
						that.handleChange(selectedVal)
			});	
			})
		},

	}
</script>
<style lang='less'>
#readTips{
	width:100%;
	flex:1;
	.setReadTip{
		margin-top: 2rem;
			&>.block{
				margin: 1rem 1rem 0;
			}
			.setSuccess{
				text-align: center;
				font-size: 1.8rem;
				margin-top: 4rem;
				-webkit-animation: setSucc 1s ease forwards;
				-o-animation: setSucc 1s ease forwards;
				animation: setSucc 1s ease forwards;
				i{
					color:#8bc34a;
				}
			}
			&>.p{
				text-indent: 1em;
				font-size: 1.7rem;
				height:40px;
				line-height: 20px;
				position: relative;
				div{
					position: absolute;
					top:10px;
					right:30%;
				}
			}
			button{
				width:40%;
				line-height: 40px;
				background:#eee;
				position: absolute;
				top:0;
				left:10%;
				z-index: 1001;
				border-radius: 5px;
				font-size: 1.8rem;
			}

		}

}
	
</style>