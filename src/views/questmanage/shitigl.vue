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
          <el-button
            type="primary"
            @click="screenInfo()"
            style="margin-left: 10px"
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
    <div style="width: 90%; margin: auto; margin-top: 20px">
      <el-table :data="tables" border>
        <el-table-column prop="date" label="序号" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="name" label="题干" width="180px" align="center">
        </el-table-column>
        <el-table-column prop="count" label="题目类型" align="center">
        </el-table-column>
        <el-table-column
          prop="class"
          label="所属题库"
          align="center"
          width="150px"
        >
        </el-table-column>
        <el-table-column prop="time" label="创建时间" align="center">
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
              @click="open"
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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号  " :label-width="formLabelWidth">
              <el-input v-model="form.date" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="班级口令" :label-width="formLabelWidth">
              <el-input v-model="form.count" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="班级   " :label-width="formLabelWidth">
              <el-input v-model="form.class" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="注册时间" :label-width="formLabelWidth">
              <el-input v-model="form.time" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      input1: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input: "",
      input1:"",
      tableData: [
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
        },
      ],
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
  methods: {
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
.el-table--border,
.el-table--group {
  border: 1px solid #b3b3b3;
}
.bj {
  margin-top: 40px;
  margin-left: 30px;
}
</style>
