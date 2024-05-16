<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="input" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="input1" placeholder="输入班级"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 20px"
            >查询</el-button
          >
          <el-button
            type="primary"
            :title="diaTitle"
            @click="dialogTableVisible = true"
            style="margin-left: 20px"
            >新增</el-button
          >
          <el-button type="primary" @click="onSubmit" style="margin-left: 20px"
            >导入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="width: 90%; margin: auto; margin-top: 20px">
      <el-table :data="data" border>
        <el-table-column prop="id" label="序号" align="center" width="120px">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180px"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="realName"
          label="真实姓名"
          align="center"
          width="180px"
        >
        </el-table-column>
        <el-table-column prop="gradeName" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button
              type="text"
              size="small"
              style="color: red; font-size: 14px"
              @click="open"
              >移除班级</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="addForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.userName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="addForm">
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.realName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
          <el-col :span="12">
         <el-form :model="addForm">
            <el-form-item label="身份选择" :label-width="formLabelWidth">
              <el-select v-model="addForm.region" placeholder="请选择身份" >
                  <el-option label="学生" value="shang"></el-option>
                   <el-option label="教师" value="shanghai"></el-option>
                    <el-option label="管理员" value="beijing"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
          </el-col>
     
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div style="margin-top: 25px; margin-left: 52px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <!-- 删除弹框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userPaging,classAdd } from "@/api/user";
export default {
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
      deleteRow:"",
      delVisible:false,
      formInline: {
        user: "",
        region: "",
      },
      page: {
        size: 10,
        current: 1
      },
      total: 0,
      addForm: {
        userName:"",
        realName:"",
        region:""
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
        gradeName: "",
      },
      formLabelWidth: "110px",
    };
  },
  created() {
    this.getUserPage();
  },
  methods: {
   
    // 分页查询
    async getUserPage(pageNum, pageSize, realName = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, realName: realName };
      const res = await userPaging(params);
      this.data = res.data.records;
      this.page.size = res.data.size
      this.page.current = res.data.page
      this.total = res.data.total
    },
    onSubmit() {
      console.log("submit!");
    },
    addClass() {
      const data = { userName: this.addForm.userName,
                     realName: this.addForm.realName,
                     roleId: 1};
      classAdd(data).then((res) => {
        if (res.code) {
          this.getUserPage(this.pageNum, this.pageSize);
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
    open(index) {
      this.$confirm("此操作将永久删除此班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.tableData.splice(index, 1);
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
  margin-left: 61px;
}
</style>
