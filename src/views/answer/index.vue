<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-05-20 10:09:42
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div style="margin-top: 30px">
    <div style="padding-left: 53px">
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属题库" style="margin-left: 28px">
          <el-input v-model="input" placeholder="所属题库"></el-input>
        </el-form-item>
        <el-form-item label="试题类型" style="margin-left: 28px">
          <el-input v-model="input1" placeholder="试题类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form> -->
    </div>

    <!-- table -->
    <div style="margin: auto; width: 1200px" align="center">
      <el-table :data="data.records" border>
        <el-table-column fixed prop="examId" label="序号" align="center" />
        <el-table-column prop="examTitle" label="题干" align="center" />
        <el-table-column prop="classSize" label="总人数" align="center" />
        <el-table-column prop="numberOfApplicants" label="待阅卷人数" align="center" />
        <el-table-column prop="correctedPaper" label="已阅卷人数" align="center" />

        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              style="font-size: 14px"
              @click="updateRow(row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              style="color: red; font-size: 14px"
              @click="open"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              style="font-size: 14px"
              @click="screenInfo(row)"
              >查看详情</el-button
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
    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号" :label-width="formLabelWidth">
              <el-input v-model="form.date" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题干" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题目类型" :label-width="formLabelWidth">
              <el-input v-model="form.province" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="所属题库" :label-width="formLabelWidth">
              <el-input v-model="form.city" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { answerExamPging } from "@/api/answer";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,

      formInline: {
        user: "",
        region: "",
      },
      input: "",
      input1: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      formInline: {
        user: "",
        region: "",
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
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
      formLabelWidth: "120px",
    };
  },
  created(){
    this.getAnswerPage()
  },
  methods: {
    getAnswerPage(pageNum, pageSize) {
      const params = { pageNum: pageNum, pageSize: pageSize};
      answerExamPging(params).then((res) => {
        this.data = res.data;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getAnswerPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getAnswerPage(val, this.pageSize);
    },
    screenInfo(row) {
      console.info("=====", row);
      localStorage.setItem("answer_examId", row.examId);
      this.$router.push({ name: "Ansck", query: { zhi: row } });
    },
    open(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning",
        center: true,
      });
      this.tableData
        .splice(index, 1)
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
  },
  computed: {
    tables() {
      //在你的数据表格中定义tabels
      const input = this.input;
      const input1 = this.input1;
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      if (input1) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input1) > -1;
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
  border-radius: 18px;
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
