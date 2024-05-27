<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="真实姓名">
          <el-input v-model="searchRealName" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <ClassSelect v-model="searchClassName" :isMultiple="false" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchUser" style="margin-left: 20px"
            >查询</el-button
          >
          <el-button
            type="primary"
            @click="dialogTableVisible = true"
            style="margin-left: 20px"
            >新增</el-button
          >
          <el-button
            type="primary"
            @click="fileDialogVisible = true"
            style="margin-left: 20px"
            >导入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="width: 80%; margin: auto; margin-top: 20px">
      <el-table :data="data.records" border>
        <el-table-column prop="id" label="序号" align="center" >
        </el-table-column>
        <el-table-column prop="userName" label="用户名"align="center">
        </el-table-column>
        <el-table-column prop="realName" label="真实姓名" align="center" >
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center" >
        </el-table-column>
        <el-table-column prop="gradeName" label="班级" align="center"> </el-table-column>
        <el-table-column prop="gradeName" label="班级" align="center"> </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <!-- <el-button
              v-if="role == 'admin'"
              type="text"
              size="small"
              style="font-size: 14px"
              @click="updateRow(row)"
              >编辑</el-button
            > -->
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
    <el-dialog
      title="导入"
      :visible.sync="dialogInportVisible"
      style="width: 800px; margin: auto"
    >
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInportVisible = false">取 消</el-button>
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
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <!-- <el-dialog title="编辑" :visible.sync="updateDialogVisible">
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
    </el-dialog> -->
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
  </div>
</template>

<script>
import ClassSelect from "@/components/ClassSelect";
import { userPaging, classAdd, userDel, userImport } from "@/api/user";
import { userClassRemove } from "@/api/class_";
export default {
  components: { ClassSelect },
  data() {
    return {
      searchRealName: "",
      searchClassName: "",
      role: "",
      pageNum: 1,
      diaTitle:"新增",
      pageSize: 10,
      data: {records:{}},
      fileList: [],
      dialogTableVisible: false,
      dialogInportVisible: false,
      fileDialogVisible: false,
      addForm: {
        userName: "",
        realName: "",
        region: "",
      },
      form: {
        gradeName: "",
      },
      formLabelWidth: "110px",
      // updateDialogVisible: false,
    };
  },
  created() {
    // 获取用户角色
    this.role = localStorage.getItem("roles");
    // 获取分页数据
    this.getUserPage();
  },
  methods: {
    // 分页查询
    async getUserPage(pageNum, pageSize, realName = null, gradeId = null) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        realName: realName,
        gradeId: gradeId,
      };
      console.log("params", params);
      const res = await userPaging(params);
      this.data = res.data;
    },
    // 搜索功能
    searchUser() {
      console.log(this.searchRealName, this.searchClassName);
      this.getUserPage(
        this.pageNum,
        this.pageSize,
        this.searchRealName,
        this.searchClassName
      );
    },
    // 设置每页多少条逻辑
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserPage(this.pageNum, val);
    },
    // 设置当前页逻辑
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUserPage(val, this.pageSize);
    },
    // 添加用户逻辑
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
    // 上传文件逻辑
    importUser() {
      if (this.fileList.length > 0) {
        const formData = new FormData(); // 创建FormData对象
        formData.append("file", this.fileList[0].raw); // 添加文件到formData
        userImport(formData)
          .then((response) => {
            this.getUserPage(this.pageNum, this.pageSize);
            console.log(response.data);
            this.$message.success("文件上传成功！");
            this.fileDialogVisible = false; // 关闭对话框
            // 可以在这里处理成功后的逻辑，如刷新数据等
          })
          .catch((error) => {
            console.error("文件上传失败：", error);
            this.$message.error("文件上传失败！");
          });
      } else {
        this.$message.warning("请选择文件后再上传！");
      }
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
    // 移除用户班级
    removeUserClass(row) {
      userClassRemove(row.id).then((res) => {
        if (res.code) {
          this.getUserPage(this.pageNum, this.pageSize);
          this.$message({
            type: "success",
            message: "移除成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    // updateUser() {
    //   // 修改用户逻辑
    // },
    // updateRow(row) {
    //   this.dialogFormVisible = true;
    //   this.form = row;
    // },
    // 删除用户
  },
  computed: {
    // tables() {
    //   //在你的数据表格中定义tabels
    //   const input = this.input;
    //   const input1 = this.input1;
    //   if (input) {
    //     // console.log("input输入的搜索内容：" + this.input)
    //     return this.tableData.filter((data) => {
    //       console.log("object:" + Object.keys(data));
    //       return Object.keys(data).some((key) => {
    //         return String(data[key]).toLowerCase().indexOf(input) > -1;
    //       });
    //     });
    //   }
    //   if (input1) {
    //     // console.log("input输入的搜索内容：" + this.input)
    //     return this.tableData.filter((data) => {
    //       console.log("object:" + Object.keys(data));
    //       return Object.keys(data).some((key) => {
    //         return String(data[key]).toLowerCase().indexOf(input1) > -1;
    //       });
    //     });
    //   }
    //   return this.tableData;
    // },
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
