<template>
<div class="Msignlist">
	<header>
		<md-icon class='md-size-2x' @click.native="goback">reply</md-icon>
		<span >{{this.$route.params.name}}</span>
	</header>
	<section>
		<p v-for="(item,index) in signlist" @click="goreview(item.id)">
			<span>{{index+1}}</span>
			<span>{{item.name}}</span>
			<span>{{item.total}}</span>
		</p>
	</section>	
	
</div>
</template>
<script>
import { bus } from '../../../bus.js'
export default {
  data() {
  	return {
  		signlist:[]
  	}
  },
  methods: {
  	goback(){
  		this.$router.go(-1)
  	},
  	goreview(id){
  		this.$router.push({name:'review',params:{signid:id,parent:'myself'}})
  	}
  },
  computed:{

  },
  beforeCreate:function () {
    bus.$emit('loading')
  },
  created:function () {
  	var USERID = sessionStorage.getItem('i');
  	var _this=this;
  	_this.axios.get(_this.ip.RESTPATH+'rest/getAllSignListByClassId/'+_this.$route.params.signid+'?userId='+USERID)
  	.then(function (res) {
  		console.log('获取的数据');
  		console.log(res);
  		_this.signlist=res.data;
  		bus.$emit('closeloading')
  	})
  	.catch(function (err) {
  		console.log(err);
  	})

  }
}
</script>
<style lang='less' >
.Msignlist{
	width: 100%;height: 100%;
	header{
		width: 100%;
		height: 10%;
		display: -webkit-flex; /* Safari */
		display: flex;
		align-items:center;
		position: relative;
		box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
		i{
			color:#35b4ca;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: auto;
		}
		span{
			display: block;
			width: 100%;
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-size: 20px;
			font-weight: 600;
			color: #514848;
		}
	}
	section{
	  height: 90%;
      overflow-y: scroll;
	  -webkit-overflow-scrolling: touch;
	  p{
	  	padding:.5rem 0 .5rem 0;overflow: hidden;
	  	span{
	  		float: left;
	  		height: 100%;
	  		line-height: 2.5rem;
	  		color: gray;
	  		font-size: 1.4rem;
	  		text-align: center;
	  		
	  	}
	  	span:nth-child(1){
	  		width:8%;margin-left: 2%;
	  		border:2px solid #58b4bf;
	  		border-radius: 8px;	
	  	}
	  	span:nth-child(2){width:75%;}
	  	span:nth-child(3){width:10%;}
	  }
	}
}
</style>
