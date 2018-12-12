

import axios from 'axios'
import ip from '../../src/ip.js'

export default {
  //这是阅读分享的
getQuestions({commit},payload){
    console.log(payload);
    payload.self['axios'].get(payload.self['ip'].RESTPATH+'rest/getReadingSummarySignByReadingSignId/' + payload.id)
      .then(function (res) {
        console.log('获取的题目~');
        console.log(payload.type)
        console.log(res);
        res.data[0].questions.forEach(function (v) {
        v.imgpath=v.picId?ip.filePath+v.picId:v.picId;
        })
        console.log('---------------------');
        console.log(res.data[0]);
        commit('GETQUESTION',{data:res.data[0]});
        payload.self.$router.push({name:payload.type,params:{type:payload.type,signid:payload.id}});
      })
      .catch(function (err) {
        console.log(err);
      })
  },
//阅读分享结束
  getQuestion({commit},payload){
    console.log(payload);
    payload.self['axios'].get(payload.self['ip'].RESTPATH+'rest/getSignQuestionByUserId/' + payload.id+'/'+payload.type)
      .then(function (res) {
        console.log('获取的题目~');
        console.log(res);
        res.data[0].questions.forEach(function (v) {
        v.imgpath=v.picId?ip.filePath+v.picId:v.picId;
        })
        console.log('---------------------');
        console.log(res.data[0]);
        commit('GETQUESTION',{data:res.data[0]});
        payload.self.$router.push({name:'doexam',params:{type:payload.type,signid:payload.id}});
      })
      .catch(function (err) {
        console.log(err);
      })
  },
  saveItem({commit},payload){
    console.log(payload)
    commit('SAVE_ITEM',{data:payload})
  },
  saveLucky({commit},payload){
    console.log(payload)
    commit('SAVE_LUCKY',{data:payload})
  },
  //下面是比赛的
  getQData({commit},payload) {
    console.log(payload)
    console.log('asdasdasd');
    let url = ip.RESTPATH+'rest/getReadingMatchQuestionByCourseId/?code='+payload.classId+'&name='+payload.type;
    axios.get(url)
      .then(function (response) {
        console.log('courseid比赛获取的所有题目')
          console.log(response)
        commit('GET_QUESTION',{data:response.data,courseId:payload.classId});
        payload.self.$router.push({name:'bdoexam', params:{classId:payload.classId}})
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  nextQuestion({commit},self){
    console.log('获取下一题');
    commit('NEXT_QUESTION');
  },
  savetitle({commit},self){
    console.log('保存分享的标题')
    console.log(self)
    let title=self.title;
    commit('SAVE_TITLE',{data:title});
  },
  saveShowAsk({commit},payload){
    console.log('存答题前的状态')
    console.log(payload)
    commit('SAVE_SHOWASK',{data:payload});
  },
  saveOpt({commit},payload){
    console.log('只读一次选择年纪')
    console.log(payload)
    commit('SAVE_OPT',{data:payload.showop})
  },
  timeCount({commit},payload){
    console.log(payload)
    commit('TIMECOUNT')
  },
  bigboxs({commit},payload){
    console.log(payload)
    commit('BIGBOX')
  },
  nextBook({commit},self){
    console.log('获取下一本书');
    commit('NEXT_BOOK');
  },
  saveAnswers({commit},self){
    console.log('保存答案');
    
    let answer={
      'code':self.postParams.code,
      'name':self.postParams.name,
      'courseList':self.postParams.courseList,
    };
    console.log(answer)
    // console.log()
    commit('SAVE_RESULT',{data:answer});
  },
  postData({ commit , state},self) {

    let postdata={
      'code':self.postParams.code,
      'name':self.postParams.name,
      'courseList':new Set(self.postParams.courseList),
    }
    console.log('提交的参数');
    console.log(postdata);
    // commit('SAVE_RESULT',{data:postdata});//把结果存起来
    let url = ip.RESTPATH+'rest/postReadingMatchQuestionResults';
    // console.log(postdata);
    axios.post(url,postdata)
      .then(function(res) {
        console.log('获取的结果');
        console.log(res);
        sessionStorage.setItem('flags',res.data.flag)
        // commit('SAVE_FLAG',{data:res.data});//把结果存起来
        if(res.data.flag==true){
          //finished为true代表未答过
          //是第一次提交，直接查看结果
          // self.$router.push('/bresult')
        }else{
          //不是第一次提交，显示提示手机已答题，或查看已提交结果
          // self.showQuery=true;
        }


      })
      .catch(function () {
        console.log(error);
      })
  },



  //以下是每天阅读分享的
  //保存每次
      

}

