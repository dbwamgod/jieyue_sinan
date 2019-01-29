import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login');
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home');
const Web = r => require.ensure([], () => r(require('@/pages/web')), 'Web');
const Msite = r => require.ensure([], () => r(require('@/pages/Msite')), 'Msite');
const Performance = r => require.ensure([], () => r(require('@/pages/performance/index')), 'Performance');
const Fox = r => require.ensure([], () => r(require('@/pages/performance/children/fox')), 'Fox');
const Prince = r => require.ensure([], () => r(require('@/pages/performance/children/prince')), 'Prince');
const Rose = r => require.ensure([], () => r(require('@/pages/performance/children/rose')), 'Rose');
const Loan = r => require.ensure([], () => r(require('@/pages/performance/children/loan')), 'Loan');
const riskData = r => require.ensure([], () => r(require('@/pages/riskData')), 'riskData');
const Personnal = r => require.ensure([], () => r(require('@/pages/Personnal')), 'Personnal');
const Personaldetail = r => require.ensure([], () => r(require('@/pages/Personaldetail')), 'Personaldetail');
const PersonalAbout = r => require.ensure([], () => r(require('@/pages/PersonalAbout')), 'PersonalAbout');
const GuidePage = r => require.ensure([], () => r(require('@/pages/GuidePage')), 'GuidePage');
const BrokenNetwork = r => require.ensure([], () => r(require('@/pages/BrokenNetwork')), 'BrokenNetwork');
// const xqPerformance = r => require.ensure([], () => r(require('@/pages/xqPerformance')), 'xqPerformance');
const news = r => require.ensure([], () => r(require('@/pages/news/news')), 'news');
const newList = r => require.ensure([], () => r(require('@/pages/news/newList')), 'newList');
const newRemind = r => require.ensure([], () => r(require('@/pages/news/newRemind')), 'newRemind');
const newNotice = r => require.ensure([], () => r(require('@/pages/news/newNotice')), 'newNotice');
const detail = r => require.ensure([], () => r(require('@/pages/news/detail')), 'detail');
const FindPassword = r => require.ensure([], () => r(require('@/pages/pwds/FindPassword')), 'FindPassword');
const ResetPassword = r => require.ensure([], () => r(require('@/pages/pwds/ResetPassword')), 'ResetPassword');
const Setting = r => require.ensure([], () => r(require('@/pages/set/Setting')), 'Setting');
const ModifyLoginPwd = r => require.ensure([], () => r(require('@/pages/set/ModifyLoginPwd')), 'ModifyLoginPwd');
/**
 * 向前金服实时战报
 */
import XQhome from '@/xqpages/route';

Vue.use(Router)

import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

export default new Router({
  // mode:'history',
  routes: [
    {
      path:'web',
      name:'web',
      component:Web,
      children:[
        {
          path:'/home',
          component:Home,
          children:[
            {
              path:'/home/msite',
              component:Msite,
              meta:{
                showHeader:true,
                showFooter:true
              }
            },
            {
              path:'/home/performance',
              component:Performance,
              redirect:'/home/performance/fox',
              meta:{
                showHeader:true,
                showFooter:true
              },
              children:[
                {
                  path:'/home/performance/fox',
                  component:Fox,
                  meta:{
                    showHeader:true,
                    showFooter:true
                  }
                },
                {
                  path:'/home/performance/prince',
                  component:Prince,
                  meta:{
                    showHeader:true,
                    showFooter:true
                  }
                },
                {
                  path:'/home/performance/rose',
                  component:Rose,
                  meta:{
                    showHeader:true,
                    showFooter:true
                  }
                },
                {
                  path:'/home/performance/loan',
                  component:Loan,
                  meta:{
                    showHeader:true,
                    showFooter:true
                  }
                }
              ]
            },
            {
              path:'/home/riskData',
              component:riskData,
              meta:{
                showHeader:true,
                showFooter:true
              }
            },
            // {
            //   path:'/home/timebattle',
            //   component:TimeBattle,
            //   meta:{
            //     showHeader:false,
            //     showFooter:true
            //   }
            // },

            // {
            //   path:'/home/xqPerformance',
            //   component:xqPerformance,
            //   meta:{
            //     showHeader:false,
            //     showFooter:true
            //   }
            // },
            {
              path:'/home/personnal',
              component:Personnal,
              meta:{
                showHeader:false,
                showFooter:true
              }
            },
            {
              path:'/home/personaldetail',
              component:Personaldetail,
              meta:{
                showHeader:false,
                showFooter:false
              }
            },
            {
              path:'/home/personalAbout',
              component:PersonalAbout,
              meta:{
                showHeader:false,
                showFooter:false
              }
            },
            {
              path:'/home/setting',
              component:Setting,
              meta:{
                showHeader:false,
                showFooter:false
              }
            },
          ]
        },
      ]
    },
    {
      path:'/news',
      component:news,
      meta:{
        keepAlive:false,
      },
      children:[
        {
          path:'/news/newList',
          component:newList,
          meta:{
            keepAlive:false,
          }
        },
        {
          path:'/news/newRemind',
          component:newRemind,
          meta:{
            keepAlive:false,
          }
        },
        {
          path:'/news/newNotice',
          component:newNotice,
          meta:{
            keepAlive:false,
          }
        },
        {
          name:'detail',
          path:'/news/detail',
          component:detail,
          meta:{
            keepAlive:false,
          }
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/findpassword',
      component:FindPassword,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/resetpassword',
      component:ResetPassword
    },
    {
      path:'/guidePage',
      component:GuidePage
    },
    {
      path:'/brokennetwork',
      component:BrokenNetwork
    },
    {
      path:'/home/modifyloginpwd',
      component:ModifyLoginPwd,
      meta:{
        showHeader:false,
        showFooter:false
      }
    },
    {
      path:'/',
      redirect : '/login'
    },
    ...XQhome,
  ]
})

