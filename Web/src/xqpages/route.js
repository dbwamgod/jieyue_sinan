/*
 * @Author: xixi
 * @Date: 2018-06-01 17:36:06
 * @Last Modified by:   xixi
 * @Last Modified time: 2018-06-04 17:36:06
 */

const index = r => require.ensure([], () => r(require('@/xqpages/index')), 'index');
const home = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/TimeBattle')), 'home');
const today = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/children/Today')), 'today');
const month = r => require.ensure([], () => r(require('@/xqpages/pages/timeBattle/children/Month')), 'month');
const achievement = r => require.ensure([], () => r(require('@/xqpages/pages/achievement/index')), 'achievement');
const lendPlanList = r => require.ensure([], () => r(require('@/xqpages/pages/lendPlanList/index')), 'lendPlanList');



const cityList = r => require.ensure([], () => r(require('@/xqpages/components/cityList/index')), 'cityList');
const cityListPrice = r => require.ensure([], () => r(require('@/xqpages/components/cityListPrice/index')), 'cityListPrice');
const cityListTime = r => require.ensure([], () => r(require('@/xqpages/components/cityListTime/index')), 'cityListTime');

const plutocratList = r => require.ensure([], () => r(require('@/xqpages/components/plutocratList/index')), 'plutocratList');
const plutocratListPrice = r => require.ensure([], () => r(require('@/xqpages/components/plutocratListPrice/index')), 'plutocratListPrice');
const plutocratListTime = r => require.ensure([], () => r(require('@/xqpages/components/plutocratListTime/index')), 'plutocratListTime');

const loanPlanList = r => require.ensure([], () => r(require('@/xqpages/components/loanPlanList/index')), 'loanPlanList');
const loanPlanListToday = r => require.ensure([], () => r(require('@/xqpages/components/loanPlanListToday/index')), 'loanPlanListToday');
const loanPlanListMonth = r => require.ensure([], () => r(require('@/xqpages/components/loanPlanListMonth/index')), 'loanPlanListMonth');


export default [{
  path: '/timeBattle',
  name: 'timeBattle',
  component: index,
  children: [
    {
      path: '/timeBattle/index',
      redirect:'/timeBattle/index/today',
      component: home,
      meta:{
            showHeader:false,
            showFooter:true
          },

      children:[
        {
          path:'/timeBattle/index/today',
          component:today,
          meta:{
            showHeader:false,
            showFooter:true
          }
        },
        {
          path:'/timeBattle/index/month',
          component:month,
          meta:{
            showHeader:false,
            showFooter:true
          }
        },
      ]
    },
    {
      path: '/timeBattle/achievement',
      component: achievement,
      meta:{
        showHeader:false,
        showFooter:true
      }
    },
    {
      path: '/timeBattle/lendPlanList',
      component: lendPlanList,
      meta:{
        showHeader:false,
        showFooter:true
      }
    },
    {
      path: '/cityList',
      component: cityList,
      children:[
        {
          path: '/cityList/price',
          component: cityListPrice,
        },
        {
          path: '/cityList/time',
          component: cityListTime,
        },
      ]
    },
    {
      path: '/plutocratList',
      component: plutocratList,
      children:[
        {
          path: '/plutocratList/price',
          component: plutocratListPrice,
        },
        {
          path: '/plutocratList/time',
          component: plutocratListTime,
        },
      ]
    },
    {
      path: '/loanPlanList',
      component: loanPlanList,
      children:[
        {
          path: '/loanPlanList/today',
          component: loanPlanListToday,
        },
        {
          path: '/loanPlanList/month',
          component: loanPlanListMonth,
        },
      ]
    },

  ],
}];
