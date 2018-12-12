import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home/home'

//我的单独独立的组件
import Mys from '@/mys/mys'
import Index from '@/mys/index/index.vue'
import Mytable from '@/mys/mytable/mytable.vue'
import Mywork from '@/mys/mywork/mywork.vue'
import Personset from '@/mys/personset/personset.vue'
import Leveldetail from '@/mys/index/levelDetail.vue'
import Myreport from '@/mys/index/myreport.vue'
import ChooseClass from '@/mys/chooseClass/chooseClass.vue'




//作业系统
import Homepage from '@/pages/homepage/homepage.vue'
import writing from '@/pages/homepage/mywriting.vue'

import PreviewExam from '@/pages/previewexam/previewexam.vue'

import questionList from '@/pages/previewexam/views/questionlist.vue'
import errorReview from '@/pages/previewexam/views/errorreview.vue'
import ClassifyPage from '@/pages/exam/classifyPage.vue'
import ClassifyHome from '@/pages/exam/classifyHome.vue'
import TotalMark from '@/pages/exam/totalMark.vue'
import doExam from '@/pages/exam/doexam.vue'
import reSult from '@/pages/exam/result.vue'
import reView from '@/pages/exam/review.vue'
import answerDetail from '@/pages/exam/answerdetail.vue'


import Myself from '@/pages/myself/myself.vue'
import Mclass from '@/pages/myself/views/class.vue'
import Msignlist from '@/pages/myself/views/signlist.vue'
import Msetting from '@/pages/myself/views/setting.vue'



// 比赛的组件
import Bisai from '@/views/bisai/bhome.vue'
import Share from '@/views/bisai/share.vue'
import bDoexam from '@/views/bisai/bdoexam.vue'
import bResult from '@/views/bisai/bresult.vue'
import bSelectbook from '@/views/bisai/bselectbook.vue'
import bTestdetail from '@/views/bisai/testdetail.vue'

//最后一次修改的阅读分享组件

//分享的页面
import sharePoster from       '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/sharePoster.vue'

import ReadShareIndex from    '@/readShare/Version1.0.0/ShareIndex.vue'

import ReadIndex from         '@/readShare/Version1.0.0/index/readIndex.vue'
import ChangeLevels from      '@/readShare/Version1.0.0/index/changeLevels.vue'
import BannerA from           '@/readShare/Version1.0.0/index/bannerA.vue'
import BannerB from           '@/readShare/Version1.0.0/index/bannerB.vue'
import BannerC from           '@/readShare/Version1.0.0/index/bannerC.vue'
//一书一课
import OneBook from           '@/readShare/Version1.0.0/index/oneBookOneCourse/oneBook.vue'
import OneBookDetail from     '@/readShare/Version1.0.0/index/oneBookOneCourse/oneBookDetail.vue'

import OneView from           '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/readbeforeAfterView.vue'

import Whyread from           '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/whyRead.vue'
import ThinkBook from         '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/ThinkBook.vue'
import withQuest from         '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/withQuest.vue'
import testread  from         '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/testread.vue'
import myThink   from         '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/myThink.vue'
import goMessage from         '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/goMessage.vue'
import myEvaluate  from       '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/myEvaluate.vue'
import goEvaluate  from       '@/readShare/Version1.0.0/index/oneBookOneCourse/ReadBeforeAfter/goEvaluate.vue'

//购买书单
import SearchPage from        '@/readShare/Version1.0.0/index/searchPage.vue'
import qualityCourse from     '@/readShare/Version1.0.0/index/club/qualityCourse.vue'
import huiyuan       from     '@/readShare/Version1.0.0/index/club/huiyuan.vue'
import BuyPage from           '@/readShare/Version1.0.0/index/club/buyPage.vue'
import BuyAndInvite from      '@/readShare/Version1.0.0/index/club/buyAndInvite.vue'

import ImmediateView from     '@/readShare/Version1.0.0/index/club/StudyPlan/ImmediateView.vue'
import ImmediateExp from      '@/readShare/Version1.0.0/index/club/StudyPlan/ImmediateExp.vue'
import TotalPreReadVideo from '@/readShare/Version1.0.0/index/club/StudyPlan/totalPreReadVideo.vue'
import EveryTimeRead from     '@/readShare/Version1.0.0/index/club/StudyPlan/everyTimeRead.vue'

//阅读四大块
import PreAudio from          '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/PreAudio.vue'
import TimeRead from          '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/timeRead.vue'
import StudyAdd from          '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/studyAdd.vue'
import StudyAddResult from    '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/studyAddResult.vue'
import ReadCard1 from         '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/readCard1.vue'
import AskQuestion1 from      '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/askQuestion1.vue'
import Paihang      from      '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/paihang.vue'
import Message     from       '@/readShare/Version1.0.0/index/club/StudyPlan/fourStudyBlock/message.vue'


//阅读小结两大块
import ReadSum from           '@/readShare/Version1.0.0/index/club/StudyPlan/readSum.vue'
import studyAudio from        '@/readShare/Version1.0.0/index/club/StudyPlan/twoStudyBlock/studyAudio.vue'
import QstAnswer from         '@/readShare/Version1.0.0/index/club/StudyPlan/twoStudyBlock/qstAnswer.vue'
import QstResult from         '@/readShare/Version1.0.0/index/club/StudyPlan/twoStudyBlock/qstResult.vue'





import QstThrought from       '@/readShare/Version1.0.0/index/club/StudyPlan/qstThrought.vue'
import qstThroughtResult from '@/readShare/Version1.0.0/index/club/StudyPlan/qstThroughtResult.vue'

import Graded from            '@/readShare/Version1.0.0/index/graded/graded.vue'

import HistoryOver from       '@/readShare/Version1.0.0/HistoryOver/historyOver.vue'


import Myss from              '@/readShare/Version1.0.0/mys/mys.vue'


import EditIntro from         '@/readShare/Version1.0.0/mys/viewBlock/EditInfo.vue'
import Viewblocks from        '@/readShare/Version1.0.0/mys/viewBlock/viewblock.vue'
import myDate    from         '@/readShare/Version1.0.0/mys/viewBlock/myDate.vue'
import ReadTips  from         '@/readShare/Version1.0.0/mys/viewBlock/readTipSet.vue'
import CommonQst from         '@/readShare/Version1.0.0/mys/viewBlock/commonQst.vue'
import MyTeacher from         '@/readShare/Version1.0.0/mys/viewBlock/myTeacher.vue'
import myCourse from          '@/readShare/Version1.0.0/mys/viewBlock/myCourse.vue'
import clubdetail from          '@/readShare/Version1.0.0/mys/viewBlock/clubdetail.vue'
import mySocre from           '@/readShare/Version1.0.0/mys/viewBlock/mySocre.vue'
import myAchievment from     '@/readShare/Version1.0.0/mys/viewBlock/myAchievment.vue'

//优惠券
import Discount       from '@/readShare/Version1.0.0/discount/discount.vue'
import DiscountManage from '@/readShare/Version1.0.0/discount/discountManage.vue'
import InfoCollect    from '@/readShare/Version1.0.0/discount/InfoCollect.vue'

import Login from             '@/views/login/login'

Vue.use(Router)
export default new Router({

  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name:'discount',
      path:'/discount',
      component:Discount
    },
    {
      name:'discountManage',
      path:'/discountManage',
      component:DiscountManage
    },
    {
      name:'infoCollect',
      path:'/infoCollect',
      component:InfoCollect
    },
    //我的 独立页面 
    {
      name:'mys',
      path:'/mys',
      component:Mys,
      children:[
      {
      name: 'index',
      path: 'index',
      component: Index

    },
    {
      name:'mytable',
      path:'mytable',
      component:Mytable
    },
    {
      name:'mywork',
      path:'mywork',
      component:Mywork
    },
    {
      name:'personset',
      path:'personset',
      component:Personset
    },
    {
      name:'levelDetail',
      path:'levelDetail',
      component:Leveldetail
    },
    {
      name:'myreport',
      path:'myreport',
      component:Myreport
    },
    {
      name:'chooseClass',
      path:'chooseClass',
      component:ChooseClass
    }

      ]
    
    },  
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'homepage',
          path: 'homepage',
          component: Homepage
        },
        {
          name:'mywriting',
          path:'mywriting',
          component: writing
        },
        {
          name: 'previewexam',
          path: 'previewexam',
          component: PreviewExam,
          children: [
            {
              name: 'questionlist',
              path: 'questionlist',
              component: questionList,
              // 打卡列表
             
            },
            {
              name: 'errorreview',
              path: 'errorreview',
              component: errorReview
              //错题本
            }
          ]
        },
        {
          name:'classifyHome',
          path:'classifyHome',
          component:ClassifyHome,
          children:[
          {
            name:'classifyPage',
            path:'classifyPage/:signid',
            component:ClassifyPage
          },
          {
            name:'totalMark',
            path:'totalMark',
            component:TotalMark
          },
           {
          name: 'doexam',
          path: 'doexam/:type/:signid',
          component: doExam,
          //答题
        },
          ]
        },
       

        {
          name: 'result',
          path: 'result/:flag/:score/:type',
          component: reSult,
          //答题结果
        },
        {
          name: 'review',
          path: 'review/:signid/:type',
          component: reView,
          //答题回顾主页
        },
        {
          name: 'answerdetail',
          path: 'answerdetail',
          component: answerDetail
          //答题详细回顾页面
        },
        {
          name: 'myself',
          path: 'myself',
          component: Myself
        },
        {
          name: 'Mclass',
          path: 'myself/class',
          component: Mclass
        },
        {
          name: 'Msignlist',
          path: 'myself/signlist/:signid/:name',
          component: Msignlist
        },
        {
          name: 'Msetting',
          path: 'myself/setting',
          component: Msetting
        }
      ]
    },
    //以下是比赛的
    { 
      name:'bisai',
      path: '/bisai/:id',
      component: Bisai,
      meta: { requiresAuth2: true }
    },
    {
      name:'share',
      path:'/share',
      component:Share,
    },
    {
      name: 'bdoexam',
      path: '/bdoexam/:classId',
      component: bDoexam,
       // meta: { requiresAuth1: true }
    },
    {
      name:'bselectbook',
      path:'/bselectbook/:classcode',
      component:bSelectbook,
      // meta: { requiresAuth3: true }
    },
    {
      name:'btestdetail',
      path:'/btestdetail',
      component:bTestdetail
    },
    {
      name: 'bresult',
      path: '/bresult',
      component: bResult,
      // meta: { requiresAuth: true }
    },
    //以下是阅读分享的
    //阅读分享（最终版本）开始
    {
      name:'sharePoster',
      path:'/sharePoster',
      component:sharePoster
    },
    {
      name:'ShareIndex',
      path:'/',
      component:ReadShareIndex,
      //新版
      children:[
      //首页开始
      {
        name:'readIndex',
        path:'readIndex',
        component:ReadIndex,
      },
      {
          name:'paihang',
          path:'readIndex/paihang',
          component:Paihang
      },
      {
        name:'changeLevels',
        path:'readIndex/changeLevels',
        component:ChangeLevels
      },
      {
        name:'bannerA',
        path:'readIndex/bannerA/:id',
        component:BannerA
      },
      {
        name:'bannerB',
        path:'readIndex/bannerB/:id',
        component:BannerB
      },
      {
        name:'bannerC',
        path:'readIndex/bannerC/:id',
        component:BannerC
      },
      {
        name:'searchPage',
        path:'searchPage',
        component:SearchPage,
      },
      //一书一课
      {
        name:'oneBook',
        path:'readIndex/oneBook',
        component:OneBook
      },
      {
        name:'oneBookDetail',
        path:'readIndex/oneBook/detail/:id',
        component:OneBookDetail
      },
      {
        name:'OneView',
        path:'/readIndex/oneBook/detail/:id',
        component:OneView,
        children:[
          {
            name:'whyRead',
            path:'whyRead',
            component:Whyread
          },
          {
            name:'thinkBook',
            path:'thinkBook',
            component:ThinkBook
          },
           {
            name:'withQuest',
            path:'withQuest',
            component:withQuest
          },
           {
            name:'testread',
            path:'testread',
            component:testread
          },
           {
            name:'myThink',
            path:'myThink',
            component:myThink
          },
           {
            name:'myEvaluate',
            path:'myEvaluate',
            component:myEvaluate
          },
        ],
      },
      {
        name:'goMessage',
        path:'/readIndex/oneBook/detail/:id/myThink/goMessage',
        component:goMessage
      },
      {
        name:'goEvaluate',
        path:'/readIndex/oneBook/detail/:id/myEvaluate/goEvaluate',
        component:goEvaluate
      },
      //营课
      {
        name:'qualityCourse',
        path:'readIndex/qualityCourse/:id',
        component:qualityCourse,
      },
      {
        name:'huiyuan',
        path:'readIndex/huiyuan/:id',
        component:huiyuan
      },
      {
        name:'buyPage',
        path:'readIndex/qualityCourse/:id/buyPage',
        component:BuyPage,
      },
      {
        name:'buyAndInvite',
        path:'readIndex/qualityCourse/buyPage/buyAndInvite',
        component:BuyAndInvite,
      },
      //每本书的内容模块
      {
        name:'immediateView',
        path:'/readIndex/qualityCourse',
        component:ImmediateView,
        children:[
          {
            name:'ImmediateExp',
            path:'ImmediateExp/:id',
            component:ImmediateExp
          },
           {
            name:'totalPreReadVideo',
            path:'ImmediateExp/:id/totalPreReadVideo',
            component:TotalPreReadVideo
          },
          {
            name:'everyTimeRead',
            path:'ImmediateExp/:id/everyTimeread',
            component:EveryTimeRead
          },
          {
            name:'readSum',
            path:'ImmediateExp/:id/readSum',
            component:ReadSum
          },
          {
            name:'studyAudio',
            path:'ImmediateExp/:id/readSum/studyAudio',
            component:studyAudio,
          },
          {
            name:'qstAnswer',
            path:'ImmediateExp/:id/readSum/qstAnswer',
            component:QstAnswer
          },
          {
            name:'qstResult',
            path:'ImmediateExp/:id/readSum/qstResult',
            component:QstResult
          },
          {
            name:'PreAudio',
            path:'ImmediateExp/:id/everyTimeread/PreAudio',
            component:PreAudio
          },
          {
            name:'askQuestion1',
            path:'ImmediateExp/:id/everyTimeread/askQuestion1',
            component:AskQuestion1
         },
         {
          name:'message',
          path:'ImmediateExp/:id/everyTimeread/askQuestion1/message',
          component:Message
         },

          {
            name:'timeRead',
            path:'ImmediateExp/:id/everyTimeread/timeRead',
            component:TimeRead
          },
          {
            name:'studyAdd',
            path:'ImmediateExp/:id/everyTimeread/studyAdd',
            component:StudyAdd
          },
          {
            name:'StudyAddResult',
            path:'ImmediateExp/:id/everyTimeread/studyAddResult',
            component:StudyAddResult
          },
          {
            name:'readCard1',
            path:'ImmediateExp/:id/everyTimeread/readCard1',
            component:ReadCard1
          },
          //阅读总结两大块
          {
            name:'qstThrought',
            path:'ImmediateExp/:id/readSum/qstThrought',
            component:QstThrought
          },
          {
            name:'qstThroughtResult',
            path:'ImmediateExp/:id/readSum/qstThroughtResult',
            component:qstThroughtResult
          },

        ],
      },
      
    
      //分级
      {
        name:'graded',
        path:'readIndex/graded',
        component:Graded,
      },
      //首页结束

      //购买的课程开始
      {
        name:'historyOver',
        path:'historyOver',
        component:HistoryOver

      },

      //购买的课程结束

      //我的..开始
      {
        name:'myss',
        path:'myss',
        component:Myss
      },
      {
        name:'viewblock',
        path:'/myss',
        component:Viewblocks,
        children:[
          {
          name:'myDate',
          path:'myDate',
          component:myDate
          },
          {
            name:'readTips',
            path:'readTips',
            component:ReadTips
          },
          {
            name:'myTeacher',
            path:'myTeacher',
            component:MyTeacher
          },
          {
            name:'myCourse',
            path:'myCourse',
            component:myCourse
          },
          {
            name:'clubdetail',
            path:'clubdetail/:id',
            component:clubdetail,
          },
          {
            name:'myAchievment',
            path:'myAchievment',
            component:myAchievment,
          },
          {
            name:'mySocre',
            path:'mySocre',
            component:mySocre
          },
          {
            name:'commonQst',
            path:'commonQst',
            component:CommonQst
          },
          {
            name:'editInfo',
            path:'editInfo',
            component:EditIntro
          },
        ]
      },

      //我的结束
      ],
    },
   
    //阅读分享结束
    {
       path:'*', redirect: '/ShareIndex'
    },
  ]
})
