/*
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-04-15 08:52:51
 * @FilePath: \vue-admin-template\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    meta: { requireAuth: true },
    children: [{
      path: '/index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard', visible: true }
    }]
  },

  {
    path: '/usermanager',
    component: Layout,
    children: [{
      path: '/yonghu',
      name: 'Usermanager',
      component: () => import('@/views/user/index'),
      meta: { title: '用户管理', icon: 'dashboard', visible: true, roles: ['teacher', 'admin'] }
    }]
  },
  {
    path: '/myself',
    component: Layout,
    children: [{
      path: '/myself',
      name: 'myself',
      hidden: true,
      component: () => import('@/views/user/myself'),
      meta: { title: '个人中心', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/changemima',
    component: Layout,
    children: [{
      path: '/changemima',
      name: 'changemima',
      hidden: true,
      component: () => import('@/views/user/updatePassword.vue'),
      meta: { title: '修改密码', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/classmanager',
    component: Layout,
    children: [{
      path: '/classgl',
      name: 'Classmanager',
      component: () => import('@/views/class/index'),
      meta: { title: '班级管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/textcenter',
    component: Layout,
    children: [{
      path: '/shijuanzx',
      name: 'Textcenter',
      component: () => import('@/views/exam/student/index'),
      meta: { title: '试卷中心', visible: true, roles: ['admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/zhunbeikaoshi',
    component: Layout,
    children: [{
      path: '/text',
      name: 'text',
      hidden: true,
      component: () => import('@/views/exam/examInformation.vue'),
      meta: { title: '准备考试', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/startkaoshi',
    name: 'start',
    hidden: true,
    component: () => import('@/views/exam/index.vue'),
    meta: { title: '开始考试', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    // children: [{
    //   path: '/start',
    //   name: 'start',
    //   hidden:true,
    //   component: () => import('@/views/kaishiks/start'),
    //   meta: { title: '开始考试', icon: 'dashboard' }
    // }]
  },
  {
    path: '/questcenter',
    component: Layout,
    children: [{
      path: '/shuatizx',
      name: 'Questcenter',
      component: () => import('@/views/exercise/index'),
      meta: { title: '刷题中心', visible: true, roles: ['admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/shuati',
    name: 'shua',
    hidden: true,
    component: () => import('@/views/exercise/shuati.vue'),
    meta: { title: '开始刷题', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }

  },

  {
    path: '/examrecord',
    component: Layout,
    name: 'Examrecord',
    meta: { title: '考试记录', icon: 'el-icon-s-help', visible: true, roles: ['admin', 'student'], requireAuth: true },
    children: [
      {
        path: '/examrecord1',
        name: 'Examrecord1',
        component: () => import('@/views/record/exam/index.vue'),
        meta: { title: '考试记录', visible: true, roles: ['admin', 'student'], icon: 'table' }
      },
      {
        path: '/questrecord',
        name: 'Examrecord2',
        component: () => import('@/views/record/exercise/index.vue'),
        meta: { title: '刷题记录', visible: true, roles: ['admin', 'student'], icon: 'tree' }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    children: [{
      path: '/newk',
      name: 'Newk',
      hidden: true,
      component: () => import('@/views/record/exam/newk'),
      meta: { title: '试题查看', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/exam1',
    component: Layout,
    children: [{
      path: '/newk1',
      name: 'Newk1',
      hidden: true,
      component: () => import('@/views/record/exercise/newk'),
      meta: { title: '刷题查看', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/wrongbook',
    component: Layout,
    children: [{
      path: '/cuotiben',
      name: 'Wrongbook',
      component: () => import('@/views/userbook/index'),
      meta: { title: '错题本', visible: true, roles: ['admin', 'student'], icon: 'dashboard' }
    }]
  },
  {
    path: '/chongshua',
    name: 'Chongshua',
    hidden: true,
    component: () => import('@/views/userbook/chongshua.vue'),
    meta: { title: '重刷', visible: true, roles: ['teacher', 'admin', 'student'], icon: 'dashboard' }

  },
  {
    path: '/exammange',
    component: Layout,
    children: [{
      path: '/kaoshigl',
      name: 'Exammange',
      component: () => import('@/views/exam/teacher/index'),
      meta: { title: '考试管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/kaoshiAdd',
    component: Layout,
    children: [{
      path: '/ksAdd',
      name: 'ksAdd',
      hidden: true,
      component: () => import('@/views/exam/examAdd'),
      meta: { title: '考试添加', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/bankmanage',
    component: Layout,
    children: [{
      path: '/tikugl',
      name: 'Bankmanage',
      component: () => import('@/views/repo/index'),
      meta: { title: '题库管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/questmanage',
    component: Layout,
    children: [{
      path: '/shitigl',
      name: 'Questmanage',
      component: () => import('@/views/question/index'),
      meta: { title: '试题管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/shitiadd',
    component: Layout,
    children: [{
      path: '/news',
      name: 'news',
      hidden: true,
      component: () => import('@/views/question/add.vue'),
      meta: { title: '试题添加', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/certificate',
    component: Layout,
    children: [{
      path: '/zhengshugl',
      name: 'Certificate',
      component: () => import('@/views/certificate/zhengshugl'),
      meta: { title: '证书管理', visible: true, roles: ['admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/mycertificate',
    component: Layout,
    children: [{
      path: '/myCertificates',
      name: 'Myc',
      component: () => import('@/views/certificate/myCertificates'),
      meta: { title: '我的证书', icon: 'dashboard', visible: true, roles: ['admin', 'student'] }
    }]
  },

  {
    path: '/scoreana',
    component: Layout,
    children: [{
      path: 'chengjifx',
      name: 'Scoreana',
      component: () => import('@/views/score/index'),
      meta: { title: '成绩分析', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/detail',
    component: Layout,
    children: [{
      path: 'userscore',
      name: 'UserScore',
      hidden: true,
      component: () => import('@/views/score/detail'),
      meta: { title: '用户成绩', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/answermanage',
    component: Layout,
    children: [{
      path: 'dajuangl',
      name: 'Answermanage',
      component: () => import('@/views/answer/index'),
      meta: { title: '阅卷管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/answer',
    component: Layout,
    children: [{
      path: '/answerck',
      name: 'Ansck',
      hidden: true,
      component: () => import('@/views/answer/answerck'),
      meta: { title: '答卷查看', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },
  {
    path: '/makeTest',
    component: Layout,
    children: [{
      path: '/makeTest',
      name: 'make',
      hidden: true,
      component: () => import('@/views/answer/makeTest'),
      meta: { title: '批改试卷', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },

  {
    path: '/notice',
    component: Layout,
    children: [{
      path: 'notice1',
      name: 'Notice',
      component: () => import('@/views/notice/notice'),
      meta: { title: '公告管理', visible: true, roles: ['teacher', 'admin'], icon: 'dashboard' }
    }]
  },

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
