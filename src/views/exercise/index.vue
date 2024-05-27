<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-05-16 14:39:25
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>
    <div style="padding-left: 53px; padding-top: 22px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="题库名称：      ">
          <el-input v-model="repoTitle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="queryRepo()"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- table -->
    <div style="margin: auto; width: 90%" align="center">
      <el-table :data="data.records" border>
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
    </div>
    <div class="block">
      <span class="demonstration" />
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
      data: null,
      // formInline: {
      //     user: '',
      //     region: ''
      // },
      repoTitle: "",
      // currentPage1: 5,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4,
      // tableData: [{
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     province: '上海',
      //     city: '普陀区',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     zip: 200333
      // }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     province: '上海',
      //     city: '普陀区',
      //     address: '上海市普陀区金沙江路 1517 弄',
      //     zip: 200333
      // }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     province: '上海',
      //     city: '普陀区',
      //     address: '上海市普陀区金沙江路 1519 弄',
      //     zip: 200333
      // },
      // {
      //     date: '',
      //     name: '',
      //     province: '',
      //     city: '',
      //     address: ''

      // },
      // {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     province: '上海',
      //     city: '普陀区',
      //     address: '上海市普陀区金沙江路 1516 弄',
      //     zip: 200333
      // }],
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

<style>
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 5px;
  border: 1px solid #161616;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.el-table--border,
.el-table--group {
  border: 1px solid #161616;
}

.el-table thead {
  color: #333;
  font-weight: 500;
}

.el-table {
  position: relative;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: #333;
}

.el-pagination {
  white-space: nowrap;
  padding: 40px 53px;
  color: #303133;
  font-weight: 700;
}

.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: inline-block;
  font-size: 13px;
  min-width: 35.5px;
  height: 20px;
  line-height: 27px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.el-pagination__total {
  margin-right: 10px;
  font-weight: 800;
  color: #606266;
}

.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  display: inline-block;
  font-size: 10px;
  min-width: 30.5px;
  height: 36px;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.el-pagination__jump {
  margin-left: 24px;
  font-weight: 400;
  color: #333;
}

.el-pager li {
  padding: 0 4px;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 36px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}
</style>
