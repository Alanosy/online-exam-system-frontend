<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-06 12:06:39
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="公告标题">
        <el-input v-model="searchTitle" placeholder="公告标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="试题类型" style="margin-left:28px">
          <el-input v-model="input1" placeholder="试题类型"></el-input>
        </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="searchNotice">查询</el-button>
        <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
        <!-- <el-button type="primary" style="margin-left: 40px" @click="daoru"
            >导入</el-button
          > -->
      </el-form-item>
    </el-form>

    <!--弹窗 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- table -->

    <el-table
      :data="data.records"
      border
      fit
      highlight-current-row
      :header-cell-style="{
        background: '#f2f3f4',
        color: '#555',
        'font-weight': 'bold',
        'line-height': '32px',
      }"
    >
      <el-table-column fixed prop="id" label="序号" align="center" />
      <el-table-column prop="title" label="公告标题" align="center" />
      <el-table-column prop="content" label="内容" align="center" />
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
            @click="delNotice(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
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

    <!--新增弹窗-->

    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="公告标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" :label-width="formLabelWidth" w>
              <quill-editor
                ref="myQuillEditor"
                v-model="abcd"
                :options="editorOption"
                class="my-quill-editor"
              ></quill-editor>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="公告标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.content"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateNotice()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { noticePaging, noticeAdd, noticeDel, noticeUpdate } from "@/api/notice";
export default {
  data() {
    return {
      content: "",
      editorOption: {
        // 占位配置
        placeholder: "请输入...",
        height: "300px",
        modules: {
          // 配置工具栏
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
              [{ script: "sub" }, { script: "super" }], // 上标/下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              ["link", "image", "video"], // 链接、图片、视频
              [{ align: [] }], // 添加居中按钮
              [{ color: [] }], // 文字颜色按钮
            ],
          },
          // 更改插入的图片大小
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
      },
      pageNum: 1,
      pageSize: 10,
      data: {},
      searchTitle: "",
      input1: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      abcd: "",
      dialogVisible: false,

      formInline: {
        user: "",
        region: "",
      },
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        content: "",
        title: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getNoticePage();
  },
  methods: {
    // 分页查询
    async getNoticePage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await noticePaging(params);
      this.data = res.data;
    },
    updateNotice() {
      const data = { title: this.form.title, content: this.form.content };
      noticeUpdate(this.form.id, data).then((res) => {
        if (res.code) {
          this.getNoticePage(this.pageNum, this.pageSize);
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
      });
    },
    searchNotice() {
      this.getNoticePage(this.pageNum, this.pageSize, this.searchTitle);
    },
    delNotice(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning",
        center: true,
      }).then(() => {
        noticeDel(id).then((res) => {
          if (res.code) {
            this.getNoticePage(this.pageNum, this.pageSize);
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
      });
    },

    addNotice() {
      const data = { title: this.form.title, content: this.abcd };
      noticeAdd(data).then((res) => {
        if (res.code) {
          this.getNoticePage(this.pageNum, this.pageSize);
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
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getNoticePage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getNoticePage(val, this.pageSize);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
/* 编辑器高度及背景色 */
::v-deep .ql-editor {
  min-height: 300px;

  background-color: #fff;
}
.my-quill-editor {
  width: 40em;
  height: 30em;
}
</style>
