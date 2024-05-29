<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-11 14:42:59
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="证书名称">
        <el-input v-model="searchCertificateName" placeholder="证书名称"></el-input>
      </el-form-item>
      <el-form-item label="认证单位">
        <el-input v-model="searchCertificationNuit" placeholder="认证单位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchCertificate">查询</el-button>
        <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

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
      <el-table-column prop="certificateName" label="证书名称" align="center" />
      <el-table-column prop="certificationNuit" label="认证单位" align="center" />

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
            @click="delCertificate(row.id)"
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
        <el-form :model="form">
          <el-form-item label="证书名称" :label-width="formLabelWidth">
            <el-input v-model="form.certificateName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="认证单位" :label-width="formLabelWidth">
            <el-input v-model="form.certificationNuit" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCertificate">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="证书名称" :label-width="formLabelWidth">
              <el-input v-model="form.certificateName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="认证单位" :label-width="formLabelWidth">
              <el-input v-model="form.certificationNuit" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCertificate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  certificatePaging,
  certificateDel,
  certificateAdd,
  certificateUpdate,
} from "@/api/certificate";
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
      searchCertificateName: "",
      searchCertificationNuit: "",
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
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getCertificatePage();
  },
  methods: {
    // 分页查询
    async getCertificatePage(
      pageNum,
      pageSize,
      certificateName = null,
      searchCertificationNuit = null
    ) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
        certificateName: certificateName,
        certificationUnit: searchCertificationNuit,
      };
      const res = await certificatePaging(params);
      this.data = res.data;
    },
    searchCertificate() {
      this.getCertificatePage(
        this.pageNum,
        this.pageSize,
        this.searchCertificateName,
        this.searchCertificationNuit
      );
    },
    updateCertificate() {
      const data = {
        certificateName: this.form.certificateName,
        certificationNuit: this.form.certificationNuit,
      };
      certificateUpdate(this.form.id, data).then((res) => {
        if (res.code) {
          this.getCertificatePage(this.pageNum, this.pageSize);
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
    addCertificate() {
      const data = {
        certificateName: this.form.certificateName,
        certificationNuit: this.form.certificationNuit,
      };
      certificateAdd(data).then((res) => {
        if (res.code) {
          this.getCertificatePage(this.pageNum, this.pageSize);
          this.dialogTableVisible = false;
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        } else {
          this.$message({
            type: "info",
            message: res.msg,
          });
        }
      });
    },
    delCertificate(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          certificateDel(id).then((res) => {
            if (res.code) {
              this.getCertificatePage(this.pageNum, this.pageSize);
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
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getCertificatePage(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getCertificatePage(val, this.pageSize);
    },
    handleClick(row) {
      console.log(row);
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
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
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
