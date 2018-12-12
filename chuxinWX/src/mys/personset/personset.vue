<template>
	<section id="personset">
		<h6>个人设置</h6>
		<form action="">
		<p>
			<span>姓名</span>
			<input type="text"></p>
            <i class="iconfont">&#xe72b;</i>
		<p>
			<span>性别</span>
			<select v-model='selectedSex'>
				<option disabled value="">请选择</option>
				<option value="男">男</option>
				<option value="女">女</option>		
			</select>
			<span>{{selectedSex}}</span>
		</p>
		<p>
			<span>联系电话</span>
			<input type="number">
		</p>
		<p>
			<span>在读年级</span>
			<select  v-model='selectedGrade'>
				<option disabled value="">请选择</option>
				<option v-for='g in studentGrade'>{{g}}</option>
			</select>

			
			<span>{{selectedGrade}}</span>

		</p>
		<p>
			<span>学校类别</span>
			<select v-model='selected'>
				<option disabled value="">请选择</option>
				<option v-for="option in schoolType">{{option}}</option>
			</select>
			<span>{{selected}}</span
		</p>
		<p>
			<span>联系邮箱</span>
			<input type="text">
		</p>
		</form>
	</section>
</template>
<script>
	export default{
		data(){
			return {
				selected:'',
				selectedSex:'',
				selectedGrade:'',
				schoolType:['公立学校','国际学校','其他类型'],
				studentGrade:['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级']

			}
		},
		methods:{},
		created(){},

	}
</script>

<style lang="less">
	#personset{
		h6{
          border:1px solid #ddd;
         height:2.3rem;
         line-height: 2.3rem;
          margin:0 1rem;
          border-radius: 3px;
          position: relative;
         text-indent: 1em;
          color:#666;
          margin-top: .3rem;
          font-size: 1.6rem;

        }
        form{
        	margin-top: 1rem;
        	width:100%;
        	height: 35rem;
        	position: relative;
        	p{
        		border-bottom: 1px solid #eee;
        		color:#666;
                width:98%;
                margin:0 1%;
                font-size: 16px;
                // padding:2rem 0;
                // height:5rem;
        		span{
        			display: inline-block;
        			height: 100%;
                    line-height: 5rem;
        			font-size: 1.6rem;
        		    margin-left: 1rem;
        			text-align: center;
        		}
        		input{
        			display: inline-block;
        			border-style: none;
					color:#fff;
                    float: right;
        			// background: #7dc0ab;
        			border-bottom: 1px solid #fff;
        			&:focus { outline: none; }  

        		}
        		select{
					// width:80px;
        			margin-left:1rem;
        			text-align: center;
        			color:#fff;
        			background: #7dc0ab;
        			border-style: none; 
        			letter-spacing: .1rem;
        			&:focus { 
        				outline: none;
        				border-style: none; 

        			}  
        		}
        	// &:first-child{
        	// 	top:0;
        	// 	left:12.5rem;
        	// }
        	// &:nth-child(2){
        	// 	left:.2rem;
        	// 	top:12.5rem;
        	// }
        	// &:nth-child(3){
        	// 	bottom:0;
        	// 	left:5rem;
        	// }
        	// &:nth-child(4){
        	// 	bottom:0;
        	// 	left:20rem;
        	// 	select{
        	// 	margin-left: .6rem;	
        	// 	}
        		
        	// }
        	// &:nth-child(5){
        	// 	top:12.5rem;
        	// 	right:.2rem;

        	// }
        	// &:last-child{
        	// 	top:12.5rem;
        	// 	left:12.5rem;
        	// }
        	}
        	
        }

	}
</style>