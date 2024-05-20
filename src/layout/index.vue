<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { options } from "runjs";
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import routes from "@/router";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  created() {
    let that = this;
    // options.routes[4].children
    this.menuList = routes.options.routes;
    console.log(this.menuList, "一级菜单");
    // this.rootSubmenuKeys = this.menuList;
    this.roles = window.localStorage.getItem("roles");
    // for( let i = 0; i < this.menuList.length; i++){
    //   // console.log( this.menuList[i].children);
    // }
    this.menuList.forEach((element) => {
      // 1- for 循环一级菜单
      // 2-找出角色 所在的 角色数组(判断某个值在不在 数组中)
      // 3- 然后 所在的数组 visiable 改为true ，其他的改为false
      console.log("===========");
      // element.children.forEach((item) => {

      //   console.log(item);
      // });

      if (
        element.children &&
        element.children[0] &&
        element.children[0].meta &&
        element.children[0].meta.roles
      ) {
        const roleKey = localStorage.getItem("roles");
        let isVisible = false;

        element.children[0].meta.roles.forEach((role) => {
          if (role.startsWith(roleKey)) {
            isVisible = true;
            // 一旦找到匹配项，可以提前结束循环，无需继续检查其他项
            return;
          }
        });

        // 循环结束后根据isVisible的值设置visiable
        element.children[0].meta.visiable = isVisible;
      }
      // if (element.children) {
      //   if (element.children[0].meta.roles) {
      //     element.children[0].meta.roles.forEach((item) => {
      //       if (item.indexOf(localStorage.getItem("roles")) == 0) {
      //         // 存在
      //         element.children[0].meta.visiable = true;
      //         break;
      //       } else {
      //         // 不存在
      //         element.children[0].meta.visiable = false;
      //       }
      //     });
      //   }
      // }
    });
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
