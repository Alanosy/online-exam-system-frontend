<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-05-16 14:39:25
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="题库名称：      ">
        <el-input v-model="repoTitle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryRepo()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->

    <el-table
      :data="data.records"
      border
      fit
      highlight-current-row
      :header-cell-style="{
        background: '#f2f3f4',
        color: '#555',
        'font-weight': 'bold',
        'line-height': '32px',
      }"
    >
      <el-table-column fixed prop="id" label="序号" align="center" />
      <el-table-column prop="repoTitle" label="题库标题" align="center" />
      <el-table-column prop="totalCount" label="试题总数" align="center" />
      <el-table-column prop="exerciseCount" label="已练习题数" align="center" />
      <!-- <el-table-column prop="address" label="判断题数量" align="center" />
                <el-table-column prop="zip" label="简答题数量" align="center" /> -->
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="screenInfo(row.id, row.repoTitle)"
            >开始刷题</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { exercisePaging } from "@/api/exercise";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      repoTitle: "",

      // formInline: {
      //     user: '',
      //     region: ''
      // },
      dialogTableVisible: false,
      dialogFormVisible: false,
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      formLabelWidth: "120px",
    };
  },

  created() {
    this.getExercisePage();
  },
  methods: {
    queryRepo() {
      this.getExercisePage(this.pageNum, this.pageSize, this.repoTitle);
    },
    // 分页查询
    async getExercisePage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await exercisePaging(params);
      this.data = res.data;
    },
    screenInfo(id, repoTitle) {
      console.info("=====", id, repoTitle);
      this.$router.push({ name: "shua", query: { repoId: id, repoTitle: repoTitle } });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      this.getExercisePage(this.pageNum, val, this.title);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getExercisePage(val, this.pageSize, this.title);
      console.log(`当前页: ${val}`);
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style></style>
