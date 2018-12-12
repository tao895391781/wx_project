<template>
	<ul class="bottomNav" id="bottomNav">
		<li :class="{cColor:currentPath == 'readIndex'}" @click="goView('readIndex')"  class="css1216dfcbfc1ccce"><i class="iconfont">&#xe61e;</i><br>首页</li>
		<li :class="{cColor:currentPath == 'haveBuy'}" @click="goView('haveBuy')" class="css1216e1502b1ccce"><i class="iconfont">&#xe60e;</i><br>已购</li>
		<li :class="{cColor:currentPath == 'myss'}" @click="goView('myss')" class="css1216e263031ccce" ><i class="iconfont">&#xe67a;</i><br>我的</li>
	</ul>
</template>
<script>
	export default{
		methods:{
			goView(path){	
				this.$router.push({name:path})
			},
			
		},
		computed:{
			currentPath(){
				return this.$route.name;
			},
		},
	}
</script>