<template>	
	<section id="changeLevels">
		<header>
				<div @click='goback'><i class="iconfont">&#xe655;</i></div>
				<div>更改阅读级别</div>
				<div></div>
		</header>
		<div class="info">
			<div>
				<div>
					<img src="1" alt="">
					<p>tll</p>
				</div>
			</div>
			<div>
				<p>当前阅读级别：<span>一阶&nbsp;&nbsp;&nbsp;{{selectGrade}}&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;<span id="clickMe">更改</span></p>
				<p>确定</p>
			</div>
		</div>
	</section>
</template>
<script>
import Picker from 'better-picker'
	export default {
		data(){
			return {
				data1:[{text:'6岁',value:6},{text:'7岁',value:7},{text:'8岁',value:8},{text:'9岁',value:9},{text:'10岁',value:10},{text:'11岁',value:11},{text:'12岁',value:12},{text:'13岁',value:13},{text:'14岁',value:14},{text:'15岁',value:15},{text:'16岁',value:16},{text:'17岁',value:17},{text:'18岁',value:18},{text:'18岁以上',value:19}],
			    data2:[{text:'一年级',value:1},{text:'二年级',value:2},{text:'三年级',value:3},{text:'四年级',value:4},{text:'五年级',value:5},{text:'六年级',value:6},{text:'七年级',value:7},{text:'八年级',value:8},{text:'九年级',value:9},{text:'十年级',value:10},{text:'十一年级',value:11},{text:'十二年级',value:12},{text:'高中毕业',value:13}],
			    selectAge:'',
			    selectGrade:'三年级',

		}
	},
	methods:{
		goback(){
			this.$router.go(-1);
		},
	},
	created(){
		let that=this;
			$(function(){
			var picker = new Picker({
				data: [that.data1, that.data2],
				selectedIndex: [0, 1],
				title: '选择年龄&年级'
			});
			var nameEl = $('#clickMe').get(0);
			picker.on('picker.select', function (selectedVal, selectedIndex) {
			that.selectAge  = that.data1[selectedIndex[0]].text;
			that.selectGrade =  that.data2[selectedIndex[1]].text;
			that.ageValue = that.data1[selectedIndex[0]].value;
			that.gradeValue = that.data2[selectedIndex[1]].value;
})

picker.on('picker.change', function (index, selectedIndex) {
	console.log(index);
	console.log(selectedIndex);
});

picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
	console.log(selectedVal);
	console.log(selectedIndex);
});
	
	nameEl.addEventListener('click', function () {
	picker.show();
});		
})
	},
	components:{
		Picker
	},
	}
</script>
<style lang='less'>
	#changeLevels{
		width:100%;
		height:100%;
		background: #f2f2f2;
		&>header{
			height:43px;
			margin-bottom: 1px;
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
		.info{
			width:100%;
			height:50%;
			&>div{
				width:100%;
				&:first-child{
					height:40%;
					/*background: red*/
					&>div{
						width:6rem;
						height:8rem;
						margin:2rem auto 0;
						img{
							width:6rem;
							height:6rem;
							display: inline-block;
							border-radius: 50%;
						}
						p{
							text-align: center
						}
					}
				}
				&:last-child{
					&>p{
						span{
							color:#fff;
							&:last-child{
								background: #f44336;
								padding:.2rem 2rem;
								border-radius: 3px;
								line-height: 3rem;

							}
							&:first-child{
								font-size: 1.6rem;
								background:#fff;
								line-height: 3rem;
								padding:.2rem 1rem;
								border-radius: 5px;
								color:#666;
							}
						}
					}
					&>p:first-child{
						text-align:center;
						margin:2rem 0;
						font-size: 1.3rem;
					}
					&>p:last-child{
						text-align:center;
						background: #409eff;
						line-height: 3rem;
						text-indent: 1em;
						color:#fff;
						font-size: 1.8rem;
						width:80%;
						margin:20% auto;
						border-radius: 5px;

					}
				}
			}

		}
	}
</style>