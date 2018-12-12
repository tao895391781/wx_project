
import axios from 'axios'
import ip from '../ip.js'
axios.defaults.withCredentials = true;

export default{
	post (url,param){
		return axios({
			method:'post',
			url:url,
			baseURL:ip.RESTPATH3+"/wx/",
			data:param,
			timeout:10000
		})
	},
	get (url,param){
		return axios({
			method:'get',
			url:url,
			baseURL:ip.RESTPATH3+"/wx/",
			params:param,
			timeout:10000,
		})
	},
	axios:axios
}