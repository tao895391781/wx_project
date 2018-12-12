const GETQUESTION = 'GETQUESTION';//获取待回答的题目，并设置当前选择的书籍

//以下是比赛用的
const GET_QUESTION = 'GET_QUESTION' //取题目
const NEXT_QUESTION = 'NEXT_QUESTION' //跳到下一题
const SAVE_RESULT = 'SAVE_RESULT' //保存结果
const NEXT_BOOK = 'NEXT_BOOK' //下一本书
const SAVE_TITLE = 'SAVE_TITLE'//保存分享标题
const SAVE_ITEM='SAVE_ITEM'
const SAVE_LUCKY='SAVE_LUCKY'
const SAVE_SHOWASK='SAVE_SHOWASK'
const TIMECOUNT='TIMECOUNT'
const SAVE_OPT='SAVE_OPT'
const BIGBOX='BIGBOX'
// 每日阅读分享的
const GETCLUBBOOKLIST= 'GETCLUBBOOKLIST'//获取首页每日分享的题目
export default {
//每日阅读分享的
//首页的书列表
[GETCLUBBOOKLIST](state,payload){
  console.log(payload)
  state.commendList = payload.data;
},




  [GETQUESTION](state,payload){

    state.rightResult=[];
    state.prepare=[];
    state.reading=[];
    state.imgItem=[];
    state.questionList=payload.data.questions;
    sessionStorage.setItem('questionRead',JSON.stringify(payload.data.questions));
    state.questionList = JSON.parse(sessionStorage.getItem('questionRead'))
    console.log('这是什么')
    console.log(payload.data)
    state.currentBook={
      name:payload.data.name,
      id:payload.data.id,
      description:payload.data.description,

    }
    const typeMap={
      '常识':'GeneralKnowledge',
      '文本知识':'TextKnowledge',
      '阅读理解':'ReadingComprehension'
    };
   
    //把正确答案和待提交的答案处理好
    payload.data.questions.forEach(function (v,index){
      //预习打卡
    if(v.formate_cls=="多选"){
        let right=[];
        for(var i=0;i<v.questionOption.length;i++){
          if(v.questionOption[i].flag) right.push(v.questionOption[i]['id'].toString());
        }
        state.rightResult[index]={
          answer:[],
          right:right.join(','),
          id:v.id,
          type:typeMap[v.content_cls],
          kind:'MultiSelect'
        };
      }else if(v.formate_cls=="单选"){
        let right='';
        for(var j=0;j<v.questionOption.length;j++){
          if(v.questionOption[j].flag) right+=v.questionOption[j]['id'].toString();
        }
        state.rightResult[index]={
          answer:[],
          right:right,
          id:v.id,
          type:typeMap[v.content_cls],
          kind:'Radio'
        };
      }else if(v.formate_cls=="录音"){
        state.rightResult[index]={
          answer:'',
          id:v.id,
          type:typeMap[v.content_cls],
          kind:'Record'
        };

}else if(v.formate_cls=="图片"){
        state.rightResult[index]={
          answer:'',
          id:v.id,
          type:typeMap[v.content_cls],
          kind:'Image'
        };
}else state.rightResult[index]={
          answer:'',
          id:v.id,
          type:typeMap[v.content_cls],
          kind:'Text'
        };

    })
    console.log(state.rightResult)
  },
  [SAVE_ITEM](state,payload){
    console.log(payload)
    state.saveItem={
      pic:payload.data.pic,
      name:payload.data.name,
      finished:payload.data.finished,
      type:payload.data.type,
    }
  },
  [GET_QUESTION](state,payload) {
    state.currentIndex=0;
    state.currentCourseId=0;
     const answerMap={
      '0':'A',
      '1':'B',
      '2':'C',
      '3':'D',
      '4':'E',
      '5':'F',
    };
    state.bquestionlist=[{
      type:'contactInfo'
    }];

    state.saveAnswer=[
{
  courseId: state.courseId,
  questionList:[],
}
    ];
   
    state.bquestionlist=payload.data.concat(state.bquestionlist);
    console.log( state.bquestionlist)
    state.currentQuestion=state.bquestionlist[state.currentIndex];
    state.courseId=payload.courseId; 


    console.log(state.courseId)

    console.log('hahahhahaha ')
    console.log(state.currentQuestion)
   state.bquestionlist.forEach(function (v,index){
            if(v.type=='Radio'){
               let right='';
               let trueAnswer='';
              for(var j=0;j<v.optionList.length;j++){
                if(v.optionList[j].score==1){
                 trueAnswer=answerMap[j.toString()];
                  console.log(v.optionList[j].id)
                 right+=(v.optionList[j].id);
                } 
               }
              state.saveAnswer[state.currentCourseId].questionList[index]={
                answer:'',
                questionId:v.id,
                type:v.kind,
                right:right,
                kind:'Radio',
                trueAnswer:trueAnswer,
              }

            }else if(v.type=='MultiSelect'){
              let right=[];
              let trueAnswer=[];
              for(var j =0;j<v.optionList.length;j++){
                if(v.optionList[j].score==1){
                  trueAnswer.push(answerMap[j.toString()]);
                  console.log(v.optionList[j].id)
                 right.push(v.optionList[j].id);
                 right.sort(function (a,b) {return a - b }).join(',')
                }
              }
              state.saveAnswer[state.currentCourseId].questionList[index]={
                answer:[],
                questionId:v.id,
                type:v.kind,
                right:right,
                kind:'MultiSelect',
                trueAnswer:trueAnswer,
              }

            }       
     })
            console.log(state.saveAnswer)
  },
  [NEXT_QUESTION](state,payload) {
    if(state.currentIndex==state.bquestionlist.length-1){
      return false;
    }
    state.currentIndex++;
    state.currentQuestion=state.bquestionlist[state.currentIndex];
  },
  [SAVE_TITLE](state,payload){
    state.shareTitle=payload.data;
    console.log(state.shareTitle)
  },
  [SAVE_OPT](state,payload){
    state.showOps=payload.data;
    console.log(state.showOPs)
  },
  //保存砸蛋的动作
  [SAVE_LUCKY](state,payload){
    state.saveLucky=payload.data;
    console.log(state.saveLucky)
  },
  [SAVE_SHOWASK](state,payload){
    console.log(payload)
    state.showAsk=payload.data.showAsk;
    console.log(state.showAsk)
  },
  [BIGBOX](state,payload){
    console.log(payload)
    state.bigbox=payload;
  },
  [TIMECOUNT](state,payload){
    console.log(payload)
    setInterval(function(){
        state.timeCount--;
    },1000)
  },
  [NEXT_BOOK](state,payload){
    state.currentCourseId++;
    console.log(state.currentCourseId)
  },
  [SAVE_RESULT](state,payload){
    console.log('保存答案---------------')
    state.answerResult=payload.data;
    console.log(state.answerResult)
    state.answerStore.push(state.answerResult.courseList[0]); 
  }
}
