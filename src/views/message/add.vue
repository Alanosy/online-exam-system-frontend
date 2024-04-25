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
import { tikugl } from "@/api/tikugl";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },

  data() {
    return {
      sizeForm: {
        title: "",
        region: "",
        type: [],
      },
    };
  },
  methods: {
    onSubmit() {
      tikugl(this.sizeForm)
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
