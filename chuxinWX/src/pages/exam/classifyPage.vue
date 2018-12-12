<template>
	<div id="classifyPage">
	<section class="content">
		<div @click='goDoexam("prep")' :class="{unfinishedQ:iscompleteA}" >预习打卡
			<span v-if='iscompleteA'  :class="{unfinished:iscompleteA}">已完成</span>
			<span v-if='!iscompleteA'>未完成</span>
		</div>
		<div @click='goDoexam("read")' :class="{unfinishedQ:iscompleteB}" >朗读任务
			<span v-if='iscompleteB' :class="{unfinished:iscompleteB}">已完成</span>
			<span v-if='!iscompleteB'>未完成</span>
		</div>
		<div @click='goDoexam("think")' :class="{unfinishedQ:iscompleteC}">课后思考
			<span v-if='iscompleteC' :class="{unfinished:iscompleteC}">已完成</span>
			<span v-if='!iscompleteC'>未完成</span>
		</div>
		<div @click='goDoexam("test")' :class="{unfinishedQ:iscompleteD}" v-if='iscompleteE'>整书测试
			<span v-if='iscompleteD' :class="{unfinished:iscompleteD}">已完成</span>
			<span v-if='!iscompleteD'>未完成</span>
		</div>
		</section>
		<section class="mark"> 
				<p @click='gototal'>本次成绩汇总</p>
		</section>

	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	import { bus } from '../../bus.js'
	export default{
		data(){
			return{
				id:'',
				bookname:'',
				imgPath:''

		}
	},
	methods:{
		gototal(){
			this.$router.push({name:'totalMark',params:{id:this.$route.params.signid}})
		},
		 ...mapActions({
		
      getQuestion: 'getQuestion'
    }),
		goDoexam(type){
			if(type=='prep'){
				console.log('去预习打卡')
				var item= this.$store.state.saveItem.finished;
				var flag=true;
				for(var i = 0 ; i < item.length; i++){
				if (item[i].name=='prep' && item[i].finished==true) {
					console.log('查看回顾')
					this.$router.push({name:'review',params:{signid:this.id,type:type}});
					flag=false;
					break;		
				}
			}
			if(flag){
				console.log('去答题')
			this.getQuestion({id:this.id,type:type,self:this})	
			}			
			}else if(type=='read'){
				var item= this.$store.state.saveItem.finished;
				var flag=true;
				console.log('去朗读任务')
				for(var i = 0 ; i < item.length; i++){
				if (item[i].name=='read' && item[i].finished==true) {
					console.log('查看回顾')
					this.$router.push({name:'review',params:{signid:this.id,type:type}});
					flag=false;
					break;		
				}
			}
			if(flag){
				console.log('去答题')
				this.getQuestion({id:this.id,type:type,self:this})	
			}			
			}else if(type=='think'){
				var item= this.$store.state.saveItem.finished;
				var flag=true;
				console.log('去课后思考')
				for(var i = 0 ; i < item.length; i++){
				if (item[i].name=='think' && item[i].finished==true) {
					console.log('查看回顾')
					this.$router.push({name:'review',params:{signid:this.id,type:type}});
					flag=false;
					break;		
				}
			}
			if(flag){
				console.log('去答题')
				this.getQuestion({id:this.id,type:type,self:this})	
			}		
			}else if(type=='test'){
				var item= this.$store.state.saveItem.finished;
				var flag=true;
				console.log('去整书测试')
				for(var i = 0 ; i < item.length; i++){
				if (item[i].name=='test' && item[i].finished==true) {
					console.log('查看回顾')
					this.$router.push({name:'review',params:{signid:this.id,type:type}});
					flag=false;
					break;	
				}
			}
			if(flag){
				console.log('去答题')
				this.getQuestion({id:this.id,type:type,self:this})	
			}					
		}

		}
	},
	computed:{
		iscompleteA(){
			for(var i = 0 ; i < this.$store.state.saveItem.finished.length; i++){
				if (this.$store.state.saveItem.finished[i].name=='prep') {
					return this.$store.state.saveItem.finished[i].finished
				}
			}
		},
		iscompleteB(){
			 for(var i = 0 ; i < this.$store.state.saveItem.finished.length; i++){
				if (this.$store.state.saveItem.finished[i].name=='read') {
					return this.$store.state.saveItem.finished[i].finished
				}
			}
		},
		iscompleteC(){
			for(var i = 0 ; i < this.$store.state.saveItem.finished.length; i++){
				if (this.$store.state.saveItem.finished[i].name=='think') {
					return this.$store.state.saveItem.finished[i].finished
				}
			}
		},
		iscompleteD(){
			 for(var i = 0 ; i < this.$store.state.saveItem.finished.length; i++){
				if (this.$store.state.saveItem.finished[i].name=='test') {
					return this.$store.state.saveItem.finished[i].finished
				}
			}
		},
		iscompleteE(){
		
				if (this.$store.state.saveItem.type=='last') {
					return true;
				}
			
		},


	},
	created(){
		this.id=this.$route.params.signid;
		console.log(this.$store.state.saveItem)
	
	},
	beforeDestroy(){
		// bus.$off('finished');
	},


	}
</script>
<style lang='less'>
	#classifyPage{
		width:100%;
		height:100%;
		.content{
			-webkit-display:flex;
			display: flex;
			justify-content: space-around;
			 flex-wrap:wrap ;
			width:75%;
			height:55%;
			margin: 3rem auto;
			margin-bottom: 0;
			div{
				width:33.4%;
				height:8rem;
				line-height: 8rem;
				text-align: center;
				background: #5b9bd5;
				border-radius: 10px;
				color:#fff;
				letter-spacing: 2px;
				font-size: 1.8rem;
				position: relative;
				z-index: 99;
				animation: .5s fourblock forwards;
				box-shadow: 3px 3px 3px #ddd;
				.watchback{
					position: absolute;
					width:100%;
					height:100%;
					left:0;
					top:0;
					z-index: 100;
					background: rgba(255,255,255,.3)
				}
				&:first-child{
					background: rgba(255,0,0,.7);
					span{
					background: rgba(255,0,0,.7);
					}
				}
				&:nth-child(2){
					background: rgba(0,128,0,.7);
					span{
					background: rgba(0,128,0,.7);
					}
				}
				&:nth-child(3){
					background: #26c694;
					span{
					background: #26c694;
					}
				}
				&:nth-child(4){
					span{
						background: #5b9bd5;
					}
					}
				span{
					display: inline-block;
					width:60%;
					height:2rem;
					line-height: 2rem;
					position: absolute;
					color:#fff;
					right:-1rem;
					top:-.5rem;
					font-size: 1.5rem;
					background: #61bd9c;
					transform: rotate(45deg);
					-webkit-transform: rotate(20deg);
					z-index: 101;
					border-radius: 4px;
					&.unfinished{
    	    		background:rgba(0,0,0,.3);
    	    		color: #fff;
    	    	}
				}
				&.unfinishedQ{
    	    		background:#eee;
    	    		color: rgba(102,102,102,.4);
    	    	}
				
			}
			
		}
		.mark{
			margin-top: .1rem;

			p{
				box-shadow: 3px 3px 3px #ddd;
				text-align: center;
				width:60%;
				height:3rem;
				line-height: 3rem;
				border-radius: 5px;
				margin:0 auto;
				background: #26c694;
				background: #5b9bd5;
				color:#fff;
				font-size: 1.7rem;
				letter-spacing: 2px;
			}
		}
	}
	@keyframes fourblock {
  50% { transform: scale(.6);
  	opacity: .5;}
  100% { transform: scale(1);
 opacity: 1;}
}
</style>