<template>
	<section id="withQuest">
		<p v-show='showNo'>暂无内容</p>
		<ul v-show='!showNo'>
			<li v-for='i in imgPic'>
				<img :src="i" alt="">
			</li>
		</ul>
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
	export default {
		data(){
			return {
				showNo:false,
				imgPic:[],

			}
		},
		methods:{
		},
		beforeCreate(){
			bus.$emit('loading')
		},
		created(){
			let that  = this;
			let id = this.$route.params.id;
			let type = 'questionImage';
			this.axios.get(this.ip.RESTPATH+'rest/getGuideReadingContentByType/'+id +'/'+ type)
			.then(res=>{
				bus.$emit('closeloading')
				console.log(res.data);
				if(res.data.flag == false){
					this.showNo = true
					console.log('没内容')
				}else{
				this.axios.get(this.ip.filePath+"rest/download/links?ids="+res.data.join(','))
				.then(res1=>{
					console.log(res1.data);
					let imgPic = [];
						res.data.forEach(v=>{
						v = that.ip.filePath2+res1.data[v].href
						imgPic.push(v);
							})
						this.imgPic = imgPic;
						console.log(this.imgPic)
					})
				}
			})
		},
	}
</script>
<style lang="less">
	#withQuest{
		width:100%;
		height:100%;
		flex:1;
		-webkit-overflow-scrolling: touch;
		overflow: scroll;
		p{
			padding:4rem 0;
			text-align:center;
		}
		
}
</style>