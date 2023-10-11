import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: '首页', requireLogin: true },
      component: () => import('./pages/index.vue'),
      redirect: '/login',
      children: [
        {
            path: '/MeetingInfo',
            name: 'MeetingInfo',
            meta: { title: '当前会议简介', requireLogin: true },
            component: () => import('cmpt/visitorManage/meetinginfocolor.vue')
        },
        {
          path: '/MeetingProcess',
          name: 'MeetingProcess',
          meta: { title: '当前会议进程', requireLogin: true },
          component: () => import('cmpt/visitorManage/MeetingProcess.vue')
        },
        {
          path: '/newProcess',
          name: 'newProcess',
          meta: { title: '添加会议进程', requireLogin: true },
          component: () => import('cmpt/visitorManage/newProcess.vue')
        },
        {
          path: '/ParticipantState',
          name: 'ParticipantState',
          meta: { title: '参会人员信息', requireLogin: true },
          component: () => import('cmpt/visitorManage/visitorInfo1.vue')
        },
        {
          path: '/VisitorAppointmentInfo',
          name: 'VisitorAppointmentInfo',
          meta: { title: '会议信息', requireLogin: true },
          component: () => import('cmpt/visitorManage/appointmentInfo.vue')
        },

        {
          path: '/currenttv',
          name: 'currenttv',
          meta: { title: '会议视频', requireLogin: true },
          component: () =>
              import('cmpt/statisticalAnalysis/currenttv.vue')
        },
        {
          path: '/councilRoomAnalysis',
          name: 'councilRoomAnalysis',
          meta: { title: '会议整体分析', requireLogin: true },
          component: () =>
            import('cmpt/statisticalAnalysis/roomAnalysis/councilRoomAnalysis.vue')
        },
        {
          path: '/visitorActionAnalysis',
          name: 'visitorActionAnalysis',
          meta: { title: '参会人员状态分析', requireLogin: true },
          component: () =>
            import('cmpt/statisticalAnalysis/visitorAnalysis/visitorActionAnalysis.vue')
        },
        // 用户管理路由
        {
          path: '/userInfo',
          name: 'userInfo',
          meta: { title: '用户信息', requireLogin: true },
          component: () => import('cmpt/userManage/userInfo.vue')
        },
        // 系统设置路由
        {
          path: '/systemLog',
          name: 'systemLog',
          meta: { title: '系统日志', requireLogin: true },
          component: () => import('cmpt/systemSetting/systemLog.vue')
        },
          {
              path: '/listoryMeeting',
              name: 'listoryMeeting',
              meta: { title: '会情回顾', requireLogin: true },
              component: () => import('cmpt/visitorManage/listorymeeting.vue')
          },
        {
          path: '/ParticipantInvite',
          name: 'ParticipantInvite',
          meta: { title: '会议新建', requireLogin: true },
          component: () => import('cmpt/visitorManage/patiinvite.vue')
        },{
          path: '/aftermeeting',
          name: 'aftermeeting',
          meta: { title: '会后纪要分析' },
          // component: () => import('cmpt/visitorManage/3dforcegraph.vue')
          component: () => import('cmpt/visitorManage/aftermeetingabs.vue')
        },
        {
          path: '/newpati',
          name: 'newpati',
          meta: { title: '新建人员', requireLogin: true },
          component: () => import('cmpt/visitorManage/newpati.vue')
        },
        {
          path: '/download',
          name: 'download',
          meta: { title: '下载pdf以及录像', requireLogin: true },
          component: () => import('cmpt/visitorManage/download.vue')
        },
        {
          path: '/blockchaincertificate',
          name: 'blockchaincertificate',
          meta: { title: '区块链存证', requireLogin: true },
          component: () => import('cmpt/visitorManage/blockchaincertificate.vue')
        },
        {
          path: '/accountsetting',
          name: 'accountsetting',
          meta: { title: '账户设置', requireLogin: true },
          component: () => import('cmpt/visitorManage/accountsetting.vue')
        },
        {
          path: '/Userhelper',
          name: 'Userhelper',
          meta: { title: '用户指南', requireLogin: true },
          component: () => import('cmpt/visitorManage/Userhelper.vue')
        },
        {
          path: '/video',
          name: 'video',
          meta: { title: '音频测试', requireLogin: true },
          component: () => import('cmpt/visitorManage/video.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登陆' },
      component: () => import('./pages/login.vue')
    },
    {
      path: '/test',
      name: 'test',
      meta: { title: '通信测试' },
      component: () => import('./pages/test.vue')
    },
    {
      path: '/testpdf',
      name: 'testpdf',
      meta: { title: 'pdf测试' },
      component: () => import('./pages/testpdf.vue')
    },
    {
      path: '/testchart',
      name: 'testchart',
      meta: { title: 'chart测试' },
      component: () => import('cmpt/visitorManage/speakDesireAnalysis.vue')
    },
    {
      path: '/color',
      name: 'color',
      meta: { title: '会情分析图' },
      // component: () => import('cmpt/visitorManage/3dforcegraph.vue')
      component: () => import('cmpt/visitorManage/bbb.vue')
    },
    {
      path: '/3d',
      name: '3d',
      meta: { title: '网络图' },
      component: () => import('cmpt/visitorManage/3dforcegraph.vue')
      // component: () => import('cmpt/visitorManage/bbb.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('./pages/login.vue')
      // component: () => import('cmpt/visitorManage/bbb.vue')
    }
  ]
});

// router.beforeEach((to, name, next) => {
//   const userInfo = sessionStorage.getItem('userInfo');
//   if (userInfo !== null || !to.meta.requireLogin) {
//     next();
//   } else {
//     next({ name: 'login', params: { path: '/login' } });
//   }
// });

router.afterEach(route => {
  if (route.meta.title) {
    document.title = route.meta.title;
  }
});

export default router;
