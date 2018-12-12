<template>
<div id="previewexam">
	<h4><span>阅读打卡</span></h4>
	<div class="con">
		<router-view></router-view>
	</div>
	<md-menu md-direction="top left" md-size="2" >
	  <md-button md-menu-trigger class="md-raised md-primary">{{currentClient}}</md-button>
	  <md-menu-content>
	    <md-menu-item @click.native="change('questionlist')">任务列表</md-menu-item>
	    <md-menu-item @click.native="change('errorreview')">错题本</md-menu-item>
	  </md-menu-content>
	</md-menu>
</div>
</template>
<script>
	export default {
	  data() {
	  	return {

	  	}
	  },
	  methods: {
	  	change(name){
	  		this.$router.push({name:name});
	  		
	  	}
	  },
	  computed:{
	  	currentClient(){
	  		return this.$route.path.split('/')[3]=='questionlist'?'任务列表':'错题本';
	  	}
	  },
	  created:function () {
	  	
	  }
	}
</script>
<style lang='less' >
	#previewexam{
		width: 100%;height: 100%;
		position: relative;
		h4{
			display: -webkit-flex; /* Safari */
		    display: flex;
		    height: 10%;
	    	justify-content:center;
	    	align-items:center;
	    	font-size: 2rem;
		    span{
		    	color:#38baa7;
		    	font-size: 2rem;
		    	font-weight: 600;
		    }
		}
		.con{
			height: 80%;
			overflow: scroll;
			-webkit-overflow-scrolling: touch;
		}
		.md-menu{
			position: absolute;
			bottom: 10px;right: 0;
			.md-button{
				font-size: 1.8rem;
				font-weight: 500;
				opacity: .8;
			}
		}
	}
</style>
