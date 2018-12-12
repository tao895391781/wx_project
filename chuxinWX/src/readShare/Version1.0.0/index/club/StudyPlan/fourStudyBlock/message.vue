<template>
	<section id="message">
		<div is='Message'></div>
	</section>
</template>
<script>
import {bus} from '../../../../../../bus.js'
import Message from '../../../../../../components/messages.vue'
	export default {
		data(){
			return {

			}
		},
		methods:{},
		
		created(){
			this.$parent.showThis = true;
		},
		beforeRouteEnter (to, from, next) {
		  next(vm => {
		   let finish = sessionStorage.getItem('FinishWhich').split(',');
		   console.log(finish);
		   let isFirst = sessionStorage.getItem('ifMessageFirst');
		   if(finish[3] == 'finish' && isFirst == 'isFirst'){
		   	vm.$router.go(-2);
		   }else if(finish[3] == 'finish' ){
		   	vm.$router.go(-1);
		   	}
		  })
		},
		components:{
			Message
		}
	}
</script>
<style lang="less">
	#message{
		width:100%;
		height:100%;
	}
</style>