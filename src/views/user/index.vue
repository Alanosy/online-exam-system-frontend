<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="searchTitle" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <ClassSelect v-model="input1" :isMultiple="false" @change="onClassChange" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUser" style="margin-left: 20px"
            >查询</el-button
          >
          <el-button
            type="primary"
            :title="diaTitle"
            @click="dialogTableVisible = true"
            style="margin-left: 20px"
            >新增</el-button
          >
          <el-button
            type="primary"
            @click="dialogFormVisible = true"
            style="margin-left: 20px"
            >导入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="width: 90%; margin: auto; margin-top: 20px">
      <el-table :data="data.records" border>
        <el-table-column prop="id" label="序号" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="180px" align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="真实姓名"
          align="center"
          width="180px"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
          width="140px"
        >
        </el-table-column>
        <el-table-column prop="gradeName" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="gradeName" label="班级" align="center"> </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-if="role == 'admin'"
              type="text"
              size="small"
              style="font-size: 14px"
              @click="updateRow(row)"
              >编辑</el-button
            >
            <el-button
              v-if="role == 'teacher'"
              type="text"
              size="small"
              style="color: red; font-size: 14px"
              @click="removeUserClass(row)"
              >移除班级</el-button
            >
            <el-button
              v-if="role == 'admin'"
              type="text"
              size="small"
              style="color: red; font-size: 14px"
              @click="delUser(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 导入弹窗 -->
    <el-dialog title="导入" :visible.sync="dialogFormVisible" style="width:800px;margin:auto">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

       <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>

    </el-dialog>

    <!-- 新增弹窗 -->
    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="addForm">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="addForm.userName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="addForm">
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="addForm.realName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="addForm">
            <el-form-item label="身份选择" :label-width="formLabelWidth">
              <el-select v-model="addForm.region" placeholder="请选择身份">
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
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="updateDialogVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="form.realName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 文件上传 -->
    <el-dialog
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      title="上传文件"
      :visible.sync="fileDialogVisible"
    >
      <el-upload
        class="upload-demo"
        drag
        action="xxxxxx"
        multiple
        :limit="1"
        accept=".xlsx, .xls"
        :auto-upload="false"
        :on-remove="handleRemove"
        :on-change="handleFileChange"
        :file-list="fileList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div style="margin-top: 25px; margin-left: 52px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
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
import { userPaging, classAdd } from "@/api/user";
export default {
  components: { ClassSelect },
  data() {
    return {
      role: "",
      pageNum: 1,
      pageSize: 10,
      data: null,
      fileList: [],
      currentPage1: 5,
      updateDialogVisible: false,
      fileDialogVisible: false,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      searchTitle:"",
      input: "",
      input1: "",
      deleteRow: "",
      delVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      page: {
        size: 10,
        current: 1,
      },
      total: 0,
      addForm: {
        userName: "",
        realName: "",
        region: "",
      },
      cancle() {},
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
    this.role = localStorage.getItem("roles");
    this.getUserPage();
  },
  methods: {
    Import() {
      this.dialogFormVisible = true;
    },
    // 分页查询
    async getUserPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await userPaging(params);
      this.data = res.data.records;
      this.page.size = res.data.size;
      this.page.current = res.data.page;
      this.total = res.data.total;
    },
    searchUser(){
      this.getUserPage(this.pageNum,this.pageSize,this.searchTitle)
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList; // 收集文件信息
    },
    // 移除文件处理方法
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.hasFiles = false;
      }
    },
    updateUser() {
      // 修改用户逻辑
    },
    updateRow(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 分页查询
    async getUserPage(pageNum, pageSize, realName = null, gradeId = null) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        realName: realName,
        gradeId: gradeId,
      };
      const res = await userPaging(params);
      this.data = res.data;
    },
    addClass() {
      const data = {
        userName: this.addForm.userName,
        realName: this.addForm.realName,
        roleId: 1,
      };
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
    delUser(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          userDel(row.id).then((res) => {
            if (res.code) {
              this.getUserPage(this.pageNum, this.pageSize);
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
    removeUserClass(row){
      userClassRemove(row.id).then((res)=>{
        if(res.code){
          this.getUserPage(this.pageNum, this.pageSize);
          this.$message({
            type: "success",
            message: "移除成功!",
          });
        }else{
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      })
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
    searchUser() {
      console.log(this.input1);
      this.getUserPage(this.pageNum, this.pageSize, this.input, this.input1);
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
