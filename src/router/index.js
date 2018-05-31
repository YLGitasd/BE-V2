import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        require(['@/components/Home.vue'], resolve)
      }
    },
    {
      path: '/user/:type',
      name: 'User',
      component: function (resolve) {
        require(['@/components/User.vue'], resolve)
      },
      props: true
    },
    {
      path: '/fullviews',
      name: 'StoreViews',
      component: function (resolve) {
        require(['@/components/page/Fullviews.vue'], resolve)
      },
      meta:{keepAlive:true}
    },
    {
      path: '/product',
      name: 'ProductTrend',
      component: function (resolve) {
        require(['@/components/page/Product.vue'], resolve)
      }
    },
    {
      path: '/world',
      name: 'ProductWorld',
      component: function (resolve) {
        require(['@/components/page/World.vue'], resolve)
      }
    },
    {
      path: '/property',
      name: 'ProductProperty',
      component: function (resolve) {
        require(['@/components/page/Property.vue'], resolve)
      }
    },
    {
      path: '/property-deal',
      name: 'ProductPropertyDeal',
      component: function (resolve) {
        require(['@/components/page/PropertyDeal.vue'], resolve)
      }
    },
    {
      path: '/weekport',
      name: 'WeekportTrend',
      component: function (resolve) {
        require(['@/components/page/Weekport.vue'], resolve)
      }
    },
    {
      path: '/tool-box',
      name: 'ToolBox',
      component: function (resolve) {
        require(['@/components/page/ToolBox.vue'], resolve)
      }
    },
    {
      path: '*',
      redirect: '/user/login'
    }
  ]
})
