<template>
<div class="Mclass">
	<header>
		<md-icon class='md-size-2x' @click.native="goback">reply</md-icon>
		<span >我的班级</span>
	</header>
	<section>
		<div v-for="(item,index) in classlist" @click="goSinlist(item)">
			<span>{{item.gradeName}}</span>
			<span>{{item.className}}</span>
		</div>
	</section>	
	
</div>
</template>
<script>
import { bus } from '../../../bus.js'
export default {
  data() {
  	return {
  		classlist:[]
  	}
  },
  methods: {
  	goback(){
  		this.$router.go(-1)
  	},
  	goSinlist(item){
  		this.$router.push({name:'Msignlist',params:{signid:item.id,name:item.className}})
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
  	_this.axios.get(_this.ip.RESTPATH+'rest/getAllClassesByUserId/'+USERID)
  	.then(function (res) {
  		console.log('获取的数据');
  		console.log(res);
  		_this.classlist=res.data;
  		bus.$emit('closeloading')
  	})
  	.catch(function (err) {
  		console.log(err);
  	})

  }
}
</script>
<style lang='less' >
.Mclass{
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
	  div{
	  	height: 5rem;
		line-height: 5rem;
		overflow: hidden;
		padding: 0 20px;
		background: #dbeef4;
		box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
		margin-top: 5px;
		span{

			&:nth-child(1){float: left;}
			&:nth-child(2){float: right;}
		}
	  }
	}
}
</style>
