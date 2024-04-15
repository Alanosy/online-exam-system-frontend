import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //     path: '/form',
  //     component: Layout,
  //     children: [
  //       {
  //         path: 'index',
  //         name: 'Form',
  //         component: () => import('@/views/form/index'),
  //         meta: { title: 'Form', icon: 'form' }
  //       }
  //     ]
  //   },

  {
    path: '/', 
    component: Layout,
    children: [{
      path: '/index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/usermanager',
    component: Layout,
    children: [{
      path: '/yonghu',
      name: 'Usermanager',
      component: () => import('@/views/usermanager/yonghu'),
      meta: { title: '用户管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/classmanager',
    component: Layout,
    children: [{
      path: '/classgl',
      name: 'Classmanager',
      component: () => import('@/views/classmanager/classgl'),
      meta: { title: '班级管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/textcenter',
    component: Layout,
    children: [{
      path: '/shijuanzx',
      name: 'Textcenter',
      component: () => import('@/views/textcenter/shijuanzx'),
      meta: { title: '试卷中心', icon: 'dashboard' }
    }]
  },
  {
    path: '/questcenter',
    component: Layout,
    children: [{
      path: '/shuatizx',
      name: 'Questcenter',
      component: () => import('@/views/questcenter/shuatizx'),
      meta: { title: '刷题中心', icon: 'dashboard' }
    }]
  },
  {
    path: '/examrecord',
    component: Layout,
    name: 'Examrecord',
    meta: { title: '考试记录', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/examrecord1',
        name: 'Examrecord1',
        component: () => import('@/views/examrecord/examrecord1'),
        meta: { title: '考试记录', icon: 'table' }
      },
      {
        path: '/questrecord',
        name: 'Examrecord2',
        component: () => import('@/views/examrecord/questrecord'),
        meta: { title: '刷题记录', icon: 'tree' }
      }
    ]
  },
  {
    path: '/wrongbook',
    component: Layout,
    children: [{
      path: '/cuotiben',
      name: 'Wrongbook',
      component: () => import('@/views/wrongbook/cuotiben'),
      meta: { title: '错题本', icon: 'dashboard' }
    }]
  },
  {
    path: '/exammange',
    component: Layout,
    children: [{
      path: '/kaoshigl',
      name: 'Exammange',
      component: () => import('@/views/exammanage/kaoshigl'),
      meta: { title: '考试管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/bankmanage',
    component: Layout,
    children: [{
      path: '/tikugl',
      name: 'Bankmanage',
      component: () => import('@/views/bankmanage/tikugl'),
      meta: { title: '题库管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/message',
    component: Layout,
    children: [{
      path: '/add',
      name: 'Add',
      hidden:true,
      component: () => import('@/views/message/add'),
      meta: { title: '题库管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/questmanage',
    component: Layout,
    children: [{
      path: '/shitigl',
      name: 'Questmanage',
      component: () => import('@/views/questmanage/shitigl'),
      meta: { title: '试题管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/shitiadd',
    component: Layout,
    children: [{
      path: '/news',
      name: 'news',
      hidden:true,
      component: () => import('@/views/shitiadd/news'),
      meta: { title: '试题管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/certificate',
    component: Layout,
    children: [{
      path: '/zhengshugl',
      name: 'Certificate',
      component: () => import('@/views/certificate/zhengshugl'),
      meta: { title: '证书管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/scoreana',
    component: Layout,
    children: [{
      path: 'chengjifx',
      name: 'Scoreana',
      component: () => import('@/views/scoreana/chengjifx'),
      meta: { title: '成绩分析', icon: 'dashboard' }
    }]
  },
  {
    path: '/answermanage',
    component: Layout,
    children: [{
      path: 'dajuangl',
      name: 'Answermanage',
      component: () => import('@/views/answermanage/dajuangl'),
      meta: { title: '答卷管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/notice',
    component: Layout,
    children: [{
      path: 'notice1',
      name: 'Notice',
      component: () => import('@/views/notice/notice1'),
      meta: { title: '公告管理', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
