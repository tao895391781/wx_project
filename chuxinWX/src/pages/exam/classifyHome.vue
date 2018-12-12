<template>
	<div id="classifyHome">
		<section class="head">
			<md-icon class='md-size-2x back' @click.native="goback">reply</md-icon>
			<!-- <div><img :src='imgPath' alt="loading"></div> -->
			<div>《{{bookname}}》</div>
		</section>
		<router-view></router-view>

	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	export default{
		data(){
			return{
				id:'',
				bookname:'',
				imgPath:'',
				finished:''

		}
	},
	methods:{
		goback(){
		this.$router.go(-1)
		// this.$router.push({name:'questionlist'})
	},
		gototal(){
			this.$router.push({name:'totalMark',params:{}})
		},
		 ...mapActions({
		
      getQuestion: 'getQuestion'
    }),
		goDoexam(type){
			if(type=='prepare'){
				console.log('去预习打卡')
				this.getQuestion({id:this.id,type:type,self:this,parent:'previewexam'})
			}else if(type=='reading'){
				console.log('去朗读任务')
				this.getQuestion({id:this.id,type:type,self:this,parent:'previewexam'})

			}else if(type=='classlaterThink'){
				console.log('去课后思考')
				this.getQuestion({id:this.id,type:type,self:this,parent:'previewexam'})

			}else if(type=='totalTest'){
				console.log('去整书测试')
				this.getQuestion({id:this.id,type:type,self:this,parent:'previewexam'})

			}

		}
	},
	computed:{
	},
	created(){
		this.id=this.$route.params.signid;
		this.bookname=this.$store.state.saveItem.name;
		this.imgPath=this.$store.state.saveItem.pic;
		// this.finished=this.$store.state.saveItem.finished
		console.log(this.id)
		console.log(this.bookname)


	},


	}
</script>
<style lang='less'>
	#classifyHome{
		width:100%;
		height:100%;
		// overflow:hidden;
		.head{
			width:100%;
			height:6.5rem;
			background: rgba(0,0,0,.01);
			position: relative;
			.back{
				position: absolute;
				left:0;
				top:0;
				height:100%;
				line-height: 6.5rem;
				width:20%;
				text-align: center;
				color:#26c694;
			}
			div{
				float: left;
				height:100%;
				line-height: 6.5rem;
				text-align: center;
				width:100%;
				font-size: 1.8rem;
				letter-spacing: 2px;
				color:#666;
			
			}
		}
		
	}
</style>