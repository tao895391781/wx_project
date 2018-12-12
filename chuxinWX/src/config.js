//时间排序函数 参数（数组）
export const transDate = function(str){
				if(!str) return 0;
				let nowDate  = new Date(str);
				let getYear  = nowDate.getFullYear();
				let getMonth = nowDate.getMonth()+1;
				let getDay   = nowDate.getDate();
				return getYear+'.'+(getMonth>9?getMonth:('0'+getMonth))+'.'+(getDay>9?getDay:('0'+getDay));
					};