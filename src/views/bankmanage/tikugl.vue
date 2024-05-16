<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-11 16:05:47
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>
    <div style="padding-left: 53px; padding-top: 22px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="题库名称:">
          <el-input v-model="searchTitle" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="searchRepo"
            >查询</el-button
          >
          <el-button type="primary" style="margin-left: 40px" @click="screenInfo()"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- table -->
    <div style="margin: auto; width: 1200px" align="center">
      <el-table :data="data.records" border>
        <el-table-column fixed prop="id" label="序号" align="center" />
        <el-table-column prop="title" label="题库名称" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
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
              @click="delRepo(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <span class="demonstration" />
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    
    <!-- 删除弹框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题库名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRepo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import { repoPaging, repoDel, repoUpdate, repoAdd } from "@/api/repo";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,
      searchTitle: "",
      formInline: {
        user: "",
        region: "",
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      form: {
        title: "",
      },
      formLabelWidth: "120px",
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
    };
  },
  created() {
    this.getRepoPage();
  },
  methods: {
    // 分页查询
    async getRepoPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title };
      const res = await repoPaging(params);
      this.data = res.data;
    },
    // 编辑题库
    updateRepo() {
      repoUpdate(this.form.id, { title: this.form.title })
        .then((res) => {
          if (res.code) {
            this.getRepoPage(this.pageNum, this.pageSize);
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
    delRepo(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          repoDel(row.id).then((res) => {
            if (res.code) {
              this.getRepoPage(this.pageNum, this.pageSize);
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
      this.getRepoPage(this.pageNum, this.pageSize, this.searchTitle);
    },
    screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "Add", query: { zhi: row } });
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getRepoPage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getRepoPage(val, this.pageSize);
    },
    handleClick(row) {
      console.log(row);
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
@/api/repo
