<template>
	<section id="goMessage">
		<div is='Message'></div>
	</section>
</template>
<script>
import {bus} from '../../../../../bus.js'
import Message from '../../../../../components/messages.vue'
	export default {
		data(){
			return {

			}
		},
		methods:{},
		created(){
			this.$parent.showThis = true;
		},
		components:{
			Message
		}
	}
</script>
<style lang="less">
	#goMessage{
		width:100%;
		height:100%;
	}
</style>