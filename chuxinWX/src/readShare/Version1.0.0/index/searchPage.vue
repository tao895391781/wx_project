<template>
	<section id="searchPage">
		<search></search>
	</section>
</template>
<script>
import search from '../../../components/search.vue'
import booklist from '../../../components/boolist.vue'
	export default{
		data(){
			return {
				hotBook:[],

			}
		},
		methods:{},
		created(){
			this.$parent.isFirst = false;
		},
		components:{
			search,
		},
	}
</script>
<style lang="less">
	#searchPage{
		width:100%;
		height:100%;
		position: relative;
		background:rgba(242, 242, 242, 0.37);
	}
</style>