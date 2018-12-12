<template>
	<section id="echarts3" ref='charts'>
	</section>
</template>
<script>
import {bus} from '../bus.js'
	export default{
		data(){
			return {
				flag:false,
			}
		},
		props:{     
		 	option:{type:Object},
  		},
  		watch:{
  			option:{
  				deep:true,
                handler:function(newValue,oldValue){
                	console.log(newValue);
                	this.getCharts();
                }
  			},
  		},
		methods:{
			getCharts(){
				 this.$nextTick(function () {
				 	this.$refs.charts.style.width = this.option.series[0].data.length * 40 + 'px';
        			let myChart = this.echarts.init(this.$refs.charts);
					console.log(this.option)
					myChart.setOption(this.option);
     			})
			},
		},
		created(){
		},
		mounted(){

		},
	}
</script>
<style lang="less">
	#echarts3{
		width:100%;
		height:100%;
	}
</style>