<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
<<<<<<< HEAD
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-04-22 13:33:46
=======
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-04-22 15:39:01
>>>>>>> df0c2629310ba6631c75604b63936287a66226fb
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>
    <div style="padding-left: 53px; padding-top: 22px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="题库名称:">
          <el-input v-model="input" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="onSubmit"
            >查询</el-button>
          <el-button
            type="primary"
            style="margin-left: 40px"
            @click="screenInfo()"
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
        <el-table-column prop="realName" label="创建人" align="center" />
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
              @click="open(row)"
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
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row>
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
import { repoPagin, repoDel, repoUpdate } from "@/api/tikugl";

export default {
  data() {
    return {
      input: "",
      formInline: {
        user: "",
        region: "",
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formInline: {
        user: "",
        region: "",
      },
      dialogVisible: false,
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        id: "",
        userId: "",
        createTIme: "",
        realName: "",
      },
      pageNum: 1,
      pageSize: 10,
      data: null,
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getRepo();
  },
  methods: {
    async getRepo(pageNum, pageSize, title) {
      const params = { pageNum: pageNum, pageSize: pageSize };
      const res = await repoPagin(params);
      this.data = res.data;
      console.log("我获得了api的返回");
      console.log(res);
    },
    updateRepo() {
      const data = {
        title: this.form.title,
      };
      repoUpdate(this.form.id , data)
        .then(() => {
          this.getRepo()
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    },
    open(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          repoDel(row.id).then(() => {
            this.getRepo();
            this.$message({
              type: "success",
              message: "删除成功!",
            }).catch(() => {
              this.$message({
                type: "info",
                message: "删除失败",
              });
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {
      this.getRepo(this.pageNum,this.pageSize,this.input)
      console.log("submit!");
    },
    screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "Add", query: { zhi: row } });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRepo(this.pageNum, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getRepo(val, this.pageSize);
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
