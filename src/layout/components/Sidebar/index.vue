<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-03-04 10:53:12
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-04-01 11:57:16
 * @FilePath: \com-project\src\layout\components\Sidebar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },

  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      console.log('this.$router.options.routes', this.$router.options.routes)
      const menuList = this.$router.options.routes

      const roleKey = localStorage.getItem('roles')

      menuList.forEach((element) => {
        if (element.meta && element.meta.roles) {
          let isVisible = false
          element.meta.roles.forEach((role) => {
            if (role.startsWith(roleKey)) {
              isVisible = true
              // 一旦找到匹配项，可以提前结束循环，无需继续检查其他项
              return
            }
          })
          element.meta.visible = isVisible
        }
      })
      console.log('menuList', menuList)
      return menuList
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
