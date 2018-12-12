import {bus} from './bus.js'
const mixin = {
	beforeRouteLeave (to, from, next){
		// console.log('离开路由')
	   bus.$emit('closeloading');
	   bus.$emit('hideTipNext');
	   bus.$emit('closeTipsStatus');
	   bus.$emit('closesubmithuimus')
	   bus.$emit('hidetips1');
	   bus.$emit('hideErrs')
	   next()  
	},
	created(){
		
	},
}
export {mixin}