<!--
 * @Author: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @Date: 2024-04-22 13:32:40
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-05-09 15:59:36
 * @FilePath: \vue-admin-template\src\views\message\add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="zqb">
    <div class="qb">
      <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
        <div class="zt">题库名称</div>

        <div class="kk">
          <el-input
            placeholder="请输入内容"
            style="width: 500px; height: 50px"
            v-model="sizeForm.title"
            clearable
          >
          </el-input>
        </div>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { repoAdd } from "@/api/repo";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },

  data() {
    return {
      title:"",
      sizeForm: {
        title: "",
        region: "",
        type: [],
      },
    };
  },
  methods: {
    onSubmit() {
      repoAdd(this.sizeForm)
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.$router.push({name: "Bankmanage"});
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.zqb {
  width: 100%;
  height: 800px;
  padding: 50px 0 0 0;
}
.qb {
  width: 1000px;
  height: 300px;
  padding: 50px 0 0 0;
  background-color: antiquewhite;
  margin: auto;
}
.zt {
  font-size: 20px;
  padding: 0 0 10px 100px;
}
.el-input__inner {
  height: 500px;
}
.kk {
  padding: 10px 0 10px 100px;
}
</style>
@/api/repo