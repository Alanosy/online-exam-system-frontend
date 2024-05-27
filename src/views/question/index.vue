<template>
  <div>
    <!-- form -->
    <div class="bj">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="试题名称" style="margin-left: 28px">
          <el-input v-model="searchName" placeholder="输入试题名称"></el-input>
        </el-form-item>
        <el-form-item label="所属题库" style="margin-left: 28px">
          <repo-select
               style="margin-bottom:10px"
               v-model="selectedRepoSingleSearch" 
               @change="handleRepoChangeSingle"
              />
        </el-form-item>
        <el-form-item label="题库类型" style="margin-left: 20px">
          <el-select v-model="selValue" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchQu" style="margin-left: 20px"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="screenInfo()" style="margin-left: 10px"
            >新增</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fileDialogVisible = true" style="margin-left: 10px"
            >导入</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 文件上传 -->
    <el-dialog
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      title="上传文件"
      :visible.sync="fileDialogVisible"
    >
    <!-- v-model="scope.row.repoId" -->
    <!-- @change="repoChange($event, scope.row)" -->
    请选择题库：
    <repo-select
               style="margin-bottom:10px"
               v-model="selectedRepoSingle" 
               @change="handleRepoChangeSingle"
              />
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
        <el-button type="primary" @click="importQu">确 定</el-button>
      </div>
    </el-dialog>
    <!-- table -->
    <div style="width: 80%; margin: auto; margin-top: 20px;margin">
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
        :current-page="data.current"
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
import { quPaging, quAdd, quDel, quUpdate,importQue } from "@/api/question";
import RepoSelect from "@/components/RepoSelect";

export default {
  components: { RepoSelect},
  data() {
    return {
      options: [{
          value: null,
          label: '全部类型'
        },{
          value: 1,
          label: '单选题'
        }, {
          value: 2,
          label: '多选题'
        }, {
          value: 3,
          label: '判断题'
        }, {
          value: 4,
          label: '简答题'
        }, ],
        selValue: '',
        searchName:'',
      pageNum: 1,
      pageSize: 10,
      data: null,
      fileDialogVisible:false,

      selectedRepoSingle: '',
      selectedRepoSingleSearch:'',
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
      hasFiles:null,
      fileList:null,
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
    handleRepoChangeSingle(repo) {
      console.log('单选题库变化:', repo);
      // 这里可以进一步处理repo对象，比如更新UI或发送网络请求等
    },
    importQu(){
      if (this.fileList.length > 0 && this.selectedRepoSingle !="") {
        const formData = new FormData(); // 创建FormData对象
        formData.append("file", this.fileList[0].raw); // 添加文件到formData
        importQue(this.selectedRepoSingle,formData)
          .then((response) => {
            this.getQuPage(this.pageNum, this.pageSize);
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
    // 分页查询
    async getQuPage(pageNum, pageSize, content = null,repoId=null,type=null) {
      const params = { pageNum: pageNum, pageSize: pageSize, content:content,repoId:repoId,type:type };
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
    searchQu() {
      this.getQuPage(this.pageNum, this.pageSize, this.searchName,this.selectedRepoSingleSearch,this.selValue);
    },

    screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "news", query: { zhi: row } });
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
  margin-left: 30px;
}
.el-table__body-wrapper::-webkit-scrollbar {
	width: 0;
}
</style>
