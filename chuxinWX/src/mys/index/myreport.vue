<template>
<div id="myreport">
<p class="goback"><i class="iconfont" @click='goback'>&#x3434;</i></p>
	我的今晚我经常都
</div>	

</template>

<script>
	export default{
		data(){
			return {

			}
		},
		methods:{
			 goback(){
        this.$router.go(-1);
      },

		}
	}

</script>
<style lang='less'>
#myreport{
	.goback{
      border-bottom:1px solid #eee;
      .iconfont{
        font-size: 18px;
        margin-left: .5rem;
        display: inline-block;
        width:5rem;
      }
    }
     h6{
          border:1px solid #ddd;
          padding:.3rem 1rem;
          margin:0 1rem;
          border-radius: 3px;
          position: relative;
          // font-weight: 400;
          margin-top: .3rem;
          span{
            position: absolute;
            right:.3rem;
            bottom:0;
            .iconfont{
              font-size: 1rem;
            }
           
          }

        }
}

	
</style>