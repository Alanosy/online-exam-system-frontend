<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属题库" style="margin-left: 28px">
          <el-input v-model="input" placeholder="输入题库"></el-input>
        </el-form-item>
        <el-form-item label="题库类型" style="margin-left: 20px">
          <el-input v-model="input1" placeholder="输入类型"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 20px"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="screenInfo()" style="margin-left: 10px"
            >新增</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 10px"
            >导入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="width: 95%; margin: auto; margin-top: 20px;margin">
      <el-table :data="data.records" border>
        <el-table-column prop="id" label="序号" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="content" label="题干" width="300px" align="center">
        </el-table-column>
        <el-table-column prop="quType" label="题目类型" width="180px" align="center">
        </el-table-column>
        <el-table-column prop="repoTitle" label="所属题库" width="180px" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="250px" align="center">
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
              @click="delQu(row)"
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
    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题干" :label-width="formLabelWidth">
              <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="所属题库" :label-width="formLabelWidth">
              <el-input v-model="form.repoTitle" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateQu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quPaging, quAdd, quDel, quUpdate } from "@/api/question";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,
      input: "",
      input1: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input: "",
      input1: "",
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
      formLabelWidth: "110px",
    };
  },
  created() {
    this.getQuPage();
  },
  methods: {
    // 分页查询
    async getQuPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await quPaging(params);
      this.data = res.data;
    },
    // 编辑题库
    updateQu() {
      quUpdate(this.form.id, { title: this.form.title })
        .then((res) => {
          if (res.code) {
            this.getQuPage(this.pageNum, this.pageSize);
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
    // 删除题库
    delQu(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          quDel(row.id).then((res) => {
            if (res.code) {
              this.getQuPage(this.pageNum, this.pageSize);
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
    searchRepo() {
      this.getQuPage(this.pageNum, this.pageSize, this.searchTitle);
    },
    onSubmit() {
      console.log("submit!");
    },
    screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "news", query: { zhi: row } });
    },

    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getQuPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getQuPage(val, this.pageSize);
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
.el-table--border,
.el-table--group {
  border: 1px solid #b3b3b3;
}
.bj {
  margin-top: 40px;
  margin-left: 30px;
}
.el-table__body-wrapper::-webkit-scrollbar {
	width: 0;
}
</style>
