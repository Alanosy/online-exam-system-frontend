<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-06 11:57:34
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div style="margin-top: 30px">
    <div style="padding-left: 53px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="考试名称">
          <el-input v-model="input"></el-input>
        </el-form-item>

        <!-- <el-form-item label="考试时间" style="margin-left: 15px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="searchExam"
            >查询</el-button
          >
          <el-button type="primary" style="margin-left: 40px" @click="screenInfo()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- table -->
    <div style="margin: auto; width: 80%" align="center">
      <el-table :data="data.records" border>
        <el-table-column fixed prop="id" label="序号" align="center" />
        <el-table-column prop="title" label="试卷名称" align="center" />
        <el-table-column prop="examDuration" label="考试时间" align="center" />
        <el-table-column prop="maxCount" label="最多切屏次数" align="center" />
        <el-table-column prop="grossScore" label="总分" align="center" />
        <el-table-column prop="passedScore" label="及格分" align="center" />
        <el-table-column prop="radioCount" label="单选题数量" align="center" />
        <el-table-column prop="multiCount" label="多选题数量" align="center" />
        <el-table-column prop="judgeCount" label="判断题数量" align="center" />
        <el-table-column prop="saqCount" label="简答题数量" align="center" />
        <el-table-column prop="startTime" label="开始时间" align="center" />
        <el-table-column prop="endTime" label="结束时间" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              style="font-size: 14px"
              @click="updateRow(row)"
              >查看详情</el-button
            >
            <el-button
              type="text"
              size="small"
              style="color: red; font-size: 14px"
              @click="delExam(row)"
              >删除</el-button
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
    <el-dialog title="查看详情" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号  " :label-width="formLabelWidth">
              <el-input v-model="form.date" :disabled="true"> </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="试卷名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="考试时间" :label-width="formLabelWidth">
              <el-input v-model="form.province" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="考试班级" :label-width="formLabelWidth">
              <el-input v-model="form.city" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="总分" :label-width="formLabelWidth">
              <el-input v-model="form.address" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="及格分" :label-width="formLabelWidth">
              <el-input v-model="form.zip" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { examPaging, repoAdd, repoUpdate, examDel } from "@/api/exam";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,
      input: "",
      formInline: {
        user: "",
        region: "",
        date1: "",
        date2: "",
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "110px",
    };
  },
  created() {
    this.getExamPage();
  },
  methods: {
    delExam(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          examDel(row.id).then((res) => {
            if (res.code) {
              this.getExamPage(this.pageNum, this.pageSize);
              this.tableData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "info",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页查询
    async getExamPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await examPaging(params);
      this.data = res.data;
    },
    searchExam() {
      this.getExamPage(this.pageNum, this.pageSize, this.input);
    },
    onSubmit() {
      console.log("submit!");
    },
    screenInfo(row) {
      console.info("=====", row);
      this.$router.push({ name: "ksAdd", query: { zhi: row } });
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getExamPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getExamPage(val, this.pageSize);
    },
  },
  computed: {
    tables() {
      //在你的数据表格中定义tabels
      const input = this.input;
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
};
</script>
<style>
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
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
