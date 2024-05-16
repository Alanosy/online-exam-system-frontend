<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="班级" style="margin-left: 28px">
          <el-input v-model="formInline.searchTitle" placeholder="输入班级名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="searchExam"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            :title="diaTitle"
            type="primary"
            @click="dialogTableVisible = true"
            style="margin-left: 10px"
          >
            新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="width: 90%; margin: auto; margin-top: 20px">
      <el-table :data="data.records" border>
        <el-table-column prop="id" label="序号" align="center" width="180px">
        </el-table-column>
        <el-table-column prop="gradeName" label="班级名称" width="500px" align="center">
        </el-table-column>
        <el-table-column prop="code" label="班级口令" width="600px" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
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
              @click="delClass(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div style="margin-top: 25px; margin-left: 52px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
      >
      </el-pagination>
    </div>
    <!--新增弹窗-->

    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible">
      <el-row>
        <el-form :model="addForm">
          <el-form-item label="班级名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.gradeName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="form.gradeName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { classPaging, classDel, classUpdate, classAdd } from "@/api/class_";
export default {
  created() {
    this.getClassPage();
  },
  methods: {
    // 分页查询
    async getClassPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await classPaging(params);
      this.data = res.data;
    },
    addClass() {
      const data = { gradeName: this.addForm.gradeName };
      classAdd(data).then((res) => {
        if (res.code) {
          this.getClassPage(this.pageNum, this.pageSize);
          this.dialogTableVisible = false;
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    delClass(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
          classDel(row.id).then((res) => {
            if (res.code) {
              this.getClassPage(this.pageNum, this.pageSize);
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
    updateClass(){
      classUpdate(this.form.id, { gradeName: this.form.gradeName })
        .then((res) => {
          if (res.code) {
            this.getClassPage(this.pageNum, this.pageSize);
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "编辑成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: res.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消编辑",
          });
        });
    },
    searchExam() {
      this.getExamPage(this.pageNum, this.pageSize, this.searchTitle);
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getClassPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getClassPage(val, this.pageSize);
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input: "",
      input1: "",
      addForm: {
        gradeName: "",
      },
      formInline: {
        searchTitle: "",
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      dialogTableVisible: false,
      dialogFormVisible: false,

      form: {
        gradeName:""
      },
      formLabelWidth: "110px",
    };
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
.el-table--border,
.el-table--group {
  border: 1px solid #b3b3b3;
}

.bj {
  margin-top: 40px;
  margin-left: 30px;
}
</style>
